import dotenv from "dotenv";
dotenv.config();
import { asyncHandler } from "../utility/asyncHandler.js";
import jwt from "jsonwebtoken"
import { User } from "../models/user.js";
import { ApiError } from "../utility/apiError.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
  // 1. Get the token
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", ""); // Note: space after Bearer

  if (!token) {
    throw new ApiError(401, "Unauthorized request");
  }

  try {
    // 2. Verify the token
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // 3. Find the user
    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }

    req.user = user;
    next();
    
  } catch (error) {
    // 4. Catch specific JWT errors and throw ApiError instead
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});