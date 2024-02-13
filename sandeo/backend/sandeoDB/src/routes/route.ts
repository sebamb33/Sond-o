// routes/route.ts
import express from "express";
import userRouter from "./userRoutes";
import formularyRouter from "./formularyRoutes"
const router = express.Router();

router.use("/user", userRouter);
router.use("/formulary", formularyRouter);
export default router;
