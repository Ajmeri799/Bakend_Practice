import { asyncHandler } from "../utils/acyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const healthcheckRouter = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, "OK", "Health check passed"));
});
export default healthcheckRouter;
