// routes/route.ts
import express from "express";
import userRouter from "./userRoutes";
import formularyRouter from "./formularyRoutes"
import questionRouter from "./questionRoutes"
import choiceRouter from "./choiceRoutes";

const router = express.Router();

router.use("/user", userRouter);
router.use("/formulary", formularyRouter);
router.use("/question", questionRouter);
router.use("/choice", choiceRouter);
export default router;
