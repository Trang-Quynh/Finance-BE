import {Router} from "express";
const homeRouter = Router();
import transactionController from "../controllers/transactionController";
import walletController from "../controllers/walletController";

homeRouter.get('/wallets',walletController.getAll);
homeRouter.get('/wallets/:id',walletController.getOne);
homeRouter.get('/income-expenditure-comparison/total', transactionController.getTotalIncomeAndExpense);
homeRouter.get('/income-expenditure-comparison/monthly', transactionController.getTotalIncomeAndExpenseByMonth);
homeRouter.get('/income-expenditure-comparison/by-wallet', transactionController.getTotalIncomeAndExpenseByEachWallet);
homeRouter.post('/',walletController.create)





export default homeRouter;
