import { Request,Response } from "express";
import transactionService from "../services/transactionService";
import walletService from "../services/walletService";
import categoryService from "../services/categoryService";
// import { getToken } from "./walletController";
class TransactionController {
    private transactionService;
    private walletService;
    private categoryService;

    constructor(){
        this.transactionService = transactionService;
        this.walletService = walletService
        this.categoryService = categoryService
    }

    getAllTransaction= async (req:Request,res:Response)=>{
        let idWallet = req.params.id
        let transactions = await transactionService.getAllTransactionService(idWallet)
        res.status(200).json(transactions)
    }

    getOneTransaction= async (req:Request,res:Response)=>{
        let id = req.params.id
        let transaction = await transactionService.getOneTransactionService(id)
        res.status(200).json(transaction)
    }
    addTransaction = async (req:Request,res:Response)=>{
        let userId = req['decode'].userId;
        let walletId = req.params.id;
        let transaction = req.body;
        transaction.wallet = walletId
        let totalExpense = +await this.transactionService.getTotalExpense(walletId, userId);
        let wallet = await this.walletService.getOne(walletId);
        let category = await this.categoryService.getOne(transaction.category);
        let total = wallet.total;
        let newTotal;
        let newTrans={}

        if(category.transactionType == 'expense'){
            let newTotalExpense = totalExpense + transaction.amount;
            if(newTotalExpense > total){
                res.status(200).json({message: "You can not go over your wallet limit"})
            }else{
                newTrans= await transactionService.addTransactionService(transaction);
                newTotal = total - transaction.amount;
                await this.walletService.updateTotal(walletId, newTotal)
                res.status(200).json(newTrans)
            }
        }else{
            newTrans = await transactionService.addTransactionService(transaction);
            newTotal = total + transaction.amount;
            await this.walletService.updateTotal(walletId,  newTotal)
            res.status(200).json(newTrans)
        }
    }
    updateOneTransaction = async (req:Request,res:Response)=>{
        let transactionId = req.params.id
        let userId = req['decode'].userId;
        let updateTransaction = req.body
        let oldTransaction = await this.transactionService.getOneTransactionService(transactionId)
        //Khong duoc doi wallet id
        let walletId = updateTransaction.wallet;
        //Tinh tong expense cua vi
        let totalExpense = await this.transactionService.getTotalExpense(walletId, userId)
        let categoryId = updateTransaction.categoryId
        let category = await this.categoryService.getOne(categoryId)
        let wallet = await this.walletService.getOne(walletId);
        let total = wallet.total
        let newTotal;
        let newtrans= {}


        console.log(totalExpense,updateTransaction.amount);

        if(category.transactionType == 'expense'){
            let newTotalExpense = totalExpense - oldTransaction.amount + updateTransaction.amount;
            if(newTotalExpense > total){
                res.status(200).json({message: "You can not go over your wallet limit"})
            }else{
                newtrans= await this.transactionService.updateOneTransactionService(transactionId, updateTransaction)
                // Cập nhật lại total cho wallet
                newTotal = wallet.total - oldTransaction.amount + updateTransaction.amount

                console.log(wallet.total, oldTransaction.amount,updateTransaction.amount , newTotal);

                await this.walletService.updateTotal(walletId, newTotal)
                res.status(200).json(newtrans)
            }
        }else{
            newtrans= await this.transactionService.updateOneTransactionService(transactionId, updateTransaction)
            newTotal = wallet.total - oldTransaction.amount + updateTransaction.amount

            console.log(wallet.total, oldTransaction.amount, updateTransaction.amount , newTotal);

            await this.walletService.updateTotal(walletId,  newTotal)
            res.status(200).json(newtrans)
        }
    }


    deleteTransaction = async (req:Request,res:Response)=>{
        let id = req.params.id
        await this.transactionService.deleteTransactionService(id)
        res.status(200).json({message: "delete transaction success !!"})
    }


    // Tổng thu và chi của từng ví
    getTotalIncomeAndExpenseOfOneWallet = async (req:Request,res:Response)=>{
        let id = req.params.id;
        let totalIncomeAndExpenseOfOneWallet = await this.transactionService. getTotalIncomeAndExpenseOfOneWalletService(id);
        res.status(200).json(totalIncomeAndExpenseOfOneWallet);
    }

    //Tổng thu và chi total
    getTotalIncomeAndExpense = async (req:Request,res:Response)=>{
        let userId = req['decode'].userId;
        let totalIncomeAndExpense= await this.transactionService.getTotalIncomeAndExpenseService(userId);
        res.status(200).json(totalIncomeAndExpense);
    }

    //Tổng thu và chi theo từng tháng của năm
    getTotalIncomeAndExpenseByMonth = async (req:Request,res:Response)=>{
        let year = req.query.year
        let userId = req['decode'].userId;
        // let userId = 1
        let newData = [];
        await this.transactionService.getTotalIncomeAndExpenseByMonthService(year, userId).then(
            (data)=>{
                for (let i = 1; i < 13; i++) {
                    let found = false;
                    for (let j = 0; j < data.length; j++) {
                        let month = +data[j].month_year.substring(0,2);
                        if (month === i) {
                            newData.push({
                                "month": i,
                                "totalIncome": data[j].totalIncome,
                                "totalExpense": data[j].totalExpense
                            });
                            found = true;
                            break;
                        }
                    }
                    //if (found === false)
                    if (!found) {
                        newData.push({
                            "month": i,
                            "totalIncome": 0,
                            "totalExpense": 0
                        });
                    }
                }
            }
        );
        res.status(200).json(newData);
    }

    // Tổng thu và chi theo từng ví

    getTotalIncomeAndExpenseByEachWallet = async (req:Request,res:Response)=>{

        let userId = req['decode'].userId;
        let totalIncomeAndExpenseByWallet = await this.transactionService.getTotalIncomeAndExpenseByEachWalletService(userId)
        res.status(200).json(totalIncomeAndExpenseByWallet);
    }
    //Tim kiem trong khoang ngay
    getTransactionBetweenTwoDates = async (req:Request,res:Response)=>{
        let userId = req['decode'].userId;
        let startDate = req.query.startDate;
        let endDate = req.query.endDate;
        let transactionsBetweenTwoDates = await this.transactionService.getTransactionBetweenTwoDatesService(userId, startDate, endDate);
        res.status(200).json(transactionsBetweenTwoDates);
    }

    //Tim kiem theo note cua transaction
    getTransactionByNote = async (req:Request,res:Response)=>{
        let userId = req['decode'].userId;
        let note = req.query.note
        let transactionsByNote = await this.transactionService.getTransactionByNoteService(userId, note);
        res.status(200).json(transactionsByNote);
    }

    //Tim kiem theo category
    getTransactionByCategory = async (req:Request,res:Response)=>{
        let userId = req['decode'].userId;
        let categoryId = req.params.id;
        let transactions = await this.transactionService.getTransactionByCategoryService(userId, categoryId)
        res.status(200).json(transactions);
    }


    //Tim kiem theo wallet
    getTransactionByWallet = async (req:Request,res:Response)=>{
        let userId = req['decode'].userId;
        let walletId = req.params.id;
        let transactions = await this.transactionService.getTransactionByWalletService(userId, walletId)
        res.status(200).json(transactions);
    }



}
export default new TransactionController()