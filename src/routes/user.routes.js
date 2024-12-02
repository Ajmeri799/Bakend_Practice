import { Router } from "express";
import { registerUser } from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.middlewares.js";
const router = Router();
router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  (req, res, next) => {
    console.log("Files received:", req.files);
    console.log("Body received:", req.body);
    next();
  },
  registerUser
);

export default router;
