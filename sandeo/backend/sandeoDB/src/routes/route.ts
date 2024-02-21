// routes/route.ts
import express from "express";
import userRouter from "./userRoutes";
import formularyRouter from "./formularyRoutes"
import questionRouter from "./questionRoutes"

const router = express.Router();

router.use("/user", userRouter);
router.use("/formulary", formularyRouter);
router.use("/question", questionRouter);
export default router;
