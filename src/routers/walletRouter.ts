import {Router} from "express";
import WalletController from "../controllers/walletController";

const walletRouter = Router();
walletRouter.get('/',WalletController.getAll)
walletRouter.get('/one',WalletController.getOne)
walletRouter.post('/',WalletController.create)
walletRouter.put('/',WalletController.update)
walletRouter.delete('/',WalletController.remove)


export default walletRouter