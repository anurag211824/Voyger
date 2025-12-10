import { asyncHandler } from "../utility/asyncHandler.js";
import { ApiError } from "../utility/apiError.js";
import { User } from "../models/user.js";
import { ApiResponse } from "../utility/apiResponse.js";
import { uploadOnCloudinary } from "../utility/cloudinary.js";

const generateAccessAndRefereshTokens = async (userId) => {
  try {
   
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found with the provided ID");
    }

    // Generate tokens
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    // Save refresh token to user
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    console.error("Error in generateAccessAndRefereshTokens:", error);
    console.error("Error stack:", error.stack);
    throw new ApiError(
      500,
      `Something went wrong while generating refresh and access token: ${error.message}`
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  // 1. Get user details from frontend
  const { fullName, userName, email, phone, password, avatar, gender } =
    req.body;
  //   console.log({ fullName, userName, email, phone, gender, password, avatar });

  // 2. Validation - Empty Fields
  const userDetails = [fullName, userName, email, password, gender];
  if (userDetails.some((details) => details?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }
  // 3. Check if user already exists
  const existedUser = await User.findOne({
    $or: [{ userName }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }
  // 4. Check for images
  const avatarImageLocalPath = req.file.path;
  if (!avatarImageLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  // 5. Upload to Cloudinary
  const uploadResponse = await uploadOnCloudinary(avatarImageLocalPath);
  if (!uploadResponse) {
    throw new ApiError(400, "Avatar upload failed");
  }
  // 6. Create User in DB
  const user = await User.create({
    fullName,
    userName: userName.toLowerCase(),
    email,
    password,
    phone,
    gender,
    avatar: uploadResponse.url,
  });
  // 7. Check User Creation
  const createdUser = await User.findById(user._id).select("-password");

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while creating user");
  }

  // 8. Generate Tokens
  const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
    user._id
  );

  // 9. Send Response
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(201)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});
const loginUser = asyncHandler(async (req, res) => {
  // 1. Get user details from frontend
  const { userName, email, password } = req.body;
  const userDetails = [userName, email, password];
  // 2. Validation - Empty Fields
  if (userDetails.some((details) => details?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }
  // 3. Find the user in database
  const user = await User.findOne({
    $or: [{ email }, { userName }],
  });
  if (!user) {
    throw new ApiError(404, "User does not exist");
  }
  // 4. Match password
  const isValidPassword = await user.isPasswordCorrect(password);
  if (!isValidPassword) {
    throw new ApiError(401, "Invalid user credentials");
  }
  // 5. Create tokens
  const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
    user._id
  );
  // 6. Send User after login
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, accessToken, refreshToken },
        "User logged In Successfully"
      )
    );
});
const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "User fetched successfully"));
});
export { registerUser, loginUser, getCurrentUser };
