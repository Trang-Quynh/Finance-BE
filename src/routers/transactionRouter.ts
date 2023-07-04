import { Router } from "express";
import transactionController from "../controllers/transactionController";

const TransactionRouter = Router();


TransactionRouter.get('/:id',transactionController.getAllTransaction)
TransactionRouter.get('/one/:id',transactionController.getOneTransaction)
TransactionRouter.post('/:id',transactionController.addTransaction)
TransactionRouter.put('/:id',transactionController.updateOneTransaction)
TransactionRouter.delete('/:id',transactionController.deleteTransaction)

export default TransactionRouter;