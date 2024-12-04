import { asyncHandler } from "../utils/acyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const registerUser = asyncHandler(async (req, res) => {
  const { fullname, email, username, password } = req.body;

  if (
    [fullname, username, email, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All field is required");
  }
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (existedUser) {
    throw new ApiError(409, "already exist");
  }
  // const avatarLocalPath = req.files?.avatar[0]?.path;
  // const coverLocalPath = req.files?.coverImage?.[0]?.path;
  const avatarLocalPath = req.files?.avatar?.[0]?.path.replace(/\\/g, "/");
  const coverLocalPath = req.files?.coverImage?.[0]?.path.replace(/\\/g, "/");

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is missing");
  }
  let avatar;

  try {
    // avatar = await uploadOnCloudinary(avatarLocalPath);
    console.log("Uploaded avatar", avatar);
  } catch (error) {
    console.log("error", error);
    throw new ApiError(500, "Failed to upload avatar");
  }

  let coverImage;
  try {
    // coverImage = await uploadOnCloudinary(coverLocalPath);
    console.log("uploaded cover image", coverImage);
  } catch (error) {
    console.log("error", error);
    throw new ApiError(500, "Failed to upload cover Image");
  }
  try {
    const user = await User.create({
      fullname,
      avatar: avatar.url,
      coverImage: coverImage?.url || "",
      email,
      password,
      username: username.toLowerCase(),
    });
    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );
    if (!createdUser) {
      throw new ApiError(500, "Something went wrong while registering  user");
    }
    return res
      .status(201)
      .json(new ApiResponse(200, createdUser, "User registered successfully"));
  } catch (error) {
    console.log("User Creation failed");
    if (avatar) {
      await deleteFromCloudinary(avatar.public_id);
    }
    if (coverImage) {
      await deleteFromCloudinary(coverImage.public_id);
    }
    throw new ApiError(
      500,
      "Something went wrong while registering user and image,cover Image were deleted"
    );
  }
});

export { registerUser,loging };
