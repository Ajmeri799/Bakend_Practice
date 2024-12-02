import dotenv from "dotenv";
import { app } from "./app.js";
import connectDB from "./db/index.js";

dotenv.config({
  path: "./.env",
});
const PORT = process.env.PORT;
// app.listen(PORT, () => {
//   console.log(`server is runnig on the port ${PORT}`);
// });
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server is runnig on the port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("errOR", err);
  });
