import {AppDataSource} from "../data-source";
import {Wallet} from "../entity/wallet";
import transactionService from "./transactionService";

class WalletService {
    private walletRepository;
    constructor(){
        this.walletRepository = AppDataSource.getRepository(Wallet)
    }


    getAll = async (idUser) =>{
        return await this.walletRepository.find({
            where:{ user: { id: idUser }}
        })
    }

    getOne = async (id) =>{
        return await this.walletRepository.findOne({
            where:{id:id}
        })
    }

    create = async (newWallet)=>{
        await this.walletRepository.save(newWallet);
    }

    update = async (id,newWallet)=>{
        await this.walletRepository.update({id:id},newWallet);
    }

    remove = async (id) =>{
        await transactionService.removeAll(id)
        await this.walletRepository.delete(id)
    }

    updateTotal = async (id,newtotal) =>{

        console.log('run total update');

        await this.walletRepository.update(id,{total:newtotal});


    }

    getTotalOfWallet = async (walletId) =>{
        let sql = `select total from wallet where id = ${walletId}`
        let totalOfWallet = await this.walletRepository.query(sql);
        return totalOfWallet[0].total
    }


}

export default new WalletService();