import {Request, Response} from "express";
import WalletService from "../services/walletService";
import jwtDecode from 'jwt-decode';

// export const getToken = async (req:Request, res:Response) =>{
//     const decodedToken = await jwtDecode(req.headers.authorization);
//     return decodedToken["userId"];
// }

class WalletController {
    constructor() {}

    getAll = async (req: Request, res: Response) => {
        let idUser = req['decode'].userId;
        console.log(idUser)
        let allWallet = await WalletService.getAll(idUser);
        res.status(200).json(allWallet);
    }

    getOne = async (req: Request, res: Response) => {
        let id = req.query.id;
        let wallet = await WalletService.getOne(id);
        res.status(200).json(wallet);
    }

    create = async (req: Request, res: Response) => {
        let idUser = req['decode'].userId;
        req.body.user = idUser;
        await WalletService.create(req.body)
        res.status(204).json({message: "create wallet success"});
    }

    update = async (req: Request, res: Response) => {
        let id = req.query.id;
        console.log(req.body, id);
        
        await WalletService.update(id, req.body)
        res.status(204).json({message: "update wallet success"});
    }

    remove = async (req: Request, res: Response) => {
        let id = req.query.id;
        await WalletService.remove(id);
        res.status(204).json({message: "delete wallet success"});
    }
}

export default new WalletController()