import { Router } from "express";
import categoryRouter from "./categoryRouter";
import userRouter from "./userRouter";
import walletRouter from "./walletRouter";
import homeRouter from "./homeRouter";
import TransactionRouter from "./transactionRouter";
import {auth} from "../middlewares/auth";
const router = Router();
router.use('/auth', userRouter);
router.use(auth)
router.use("/category", categoryRouter);
router.use('/wallet', walletRouter);
router.use('/home', homeRouter)
router.use('/transaction', TransactionRouter)

export default router;
