import { AppDataSource } from "../data-source";
import { Transaction } from "../entity/transaction";
import walletService from "./walletService";

class TransactionService {
  private transactionRepository;
  constructor() {
    this.transactionRepository = AppDataSource.getRepository(Transaction);
  }

  removeAllByCate = async (id) => {
    await this.transactionRepository.delete({
      category : {id:id }
    });
  };

  removeAll = async (id) => {
    await this.transactionRepository.delete({
      wallet : {id:id }
    });
  };
  addTransactionService = async (transaction) => {
    let newTransaction = await this.transactionRepository.save(transaction);
    return newTransaction;
  };
  deleteTransactionService = async (id) => {
    await this.transactionRepository.delete({ id: id });
  };
  getOneTransactionService = async (id) => {
    let transaction = await this.transactionRepository.findOne({
      relations: {
        category: true,
        wallet: true,
      },
      where: {
        id: id,
      },
    });
    return transaction;
  };

  getAllTransactionService = async (idWallet) => {
    let transactions = await this.transactionRepository.find({
      relations: {
        category: true
      },
      where: {
        wallet: {id: idWallet},
      },
    });
    return transactions;
  };

  updateOneTransactionService = async (id, updateTransaction) => {
    let newTransaction= await this.transactionRepository.update({ id: id }, updateTransaction);
    return newTransaction
  };

  //Tổng thu và chi của từng ví
  getTotalIncomeAndExpenseOfOneWalletService = async (id) => {
    let sql = `select sum(case when category.transactionType = 'income' then transaction.amount else 0 end ) as totalIncome, sum(case when category.transactionType = 'expense' then transaction.amount else 0 end) as totalExpense from transaction inner join wallet on transaction.walletId = wallet.id inner join category on transaction.categoryId = category.id where wallet.id = ${id}`;
    let totalIncomeAndExpenseOfOneWallet =
        await this.transactionRepository.query(sql);
    return totalIncomeAndExpenseOfOneWallet[0];
  };

  //Tổng thu và chi total
  getTotalIncomeAndExpenseService = async (userId) => {
    let sql = `select sum(case when category.transactionType = 'income' then transaction.amount else 0 end ) as totalIncome, sum(case when category.transactionType = 'expense' then transaction.amount else 0 end) as totalExpense from transaction inner join wallet on transaction.walletId = wallet.id inner join category on transaction.categoryId = category.id where wallet.userId = ${userId}`;
    let totalIncomeAndExpense = await this.transactionRepository.query(sql);
    return totalIncomeAndExpense[0];
  };

  //Tổng thu và chi theo từng tháng của năm
  getTotalIncomeAndExpenseByMonthService = async (year, userId) => {
    let sql = `select date_format(transaction.date, '%m%Y') as month_year, sum(case when category.transactionType = 'income' then transaction.amount else 0 end) as totalIncome, sum(case when category.transactionType = 'expense' then transaction.amount else 0 end) as totalExpense from transaction inner join wallet on transaction.walletId = wallet.id inner join category on transaction.categoryId = category.id where YEAR(transaction.date) = ${year} and wallet.userId = ${userId} group by month_year order by month_year`;
    let totalIncomeAndExpenseByMonth = await this.transactionRepository.query(
        sql
    );
    return totalIncomeAndExpenseByMonth;
  };

  // Tổng thu và chi theo từng ví
  getTotalIncomeAndExpenseByEachWalletService = async (userId) => {
    let sql = `select wallet.name, sum(case when category.transactionType = 'income' then transaction.amount else 0 end) as income, sum(case when category.transactionType = 'expense' then transaction.amount else 0 end) as expense from transaction inner join wallet on transaction.walletId = wallet.id inner join category on transaction.categoryId = category.id where wallet.userId = ${userId} group by wallet.id`;
    let totalIncomeAndExpenseByEachWallet =
        await this.transactionRepository.query(sql);
    return totalIncomeAndExpenseByEachWallet;
  };

  // Tìm kiếm transaction theo khoảng ngày

  getTransactionBetweenTwoDatesService = async (userId, startDate, endDate) => {
    let sql = `SELECT * FROM transaction INNER JOIN category ON transaction.categoryId = category.id INNER JOIN wallet ON transaction.walletId = wallet.id WHERE (transaction.date BETWEEN ${startDate} AND ${endDate}) AND wallet.userId = ${userId}`;
    let transactions = await this.transactionRepository.query(sql);
    return transactions;
  };

  //Tìm kiếm transaction theo note
  getTransactionByNoteService = async (userId, note) => {
    let sql =
        "SELECT * FROM transaction INNER JOIN category ON transaction.categoryId = category.id INNER JOIN wallet ON transaction.walletId = wallet.id WHERE transaction.note LIKE ? AND wallet.userId = ?";
    let transactions = await this.transactionRepository.query(sql, [
      `%${note}%`,
      userId,
    ]);
    return transactions;
  };

  //Tim kiem theo category

  getTransactionByCategoryService = async (userId, categoryId) => {
    let sql = `SELECT * FROM transaction INNER JOIN category ON transaction.categoryId = category.id INNER JOIN wallet ON transaction.walletId = wallet.id WHERE category.id = ${categoryId} AND wallet.userId = ${userId}`;
    let transactions = await this.transactionRepository.query(sql);
    return transactions;
  };

  //Tim kiem theo wallet

  getTransactionByWalletService = async (userId, walletId) => {
    let sql = `SELECT * FROM transaction INNER JOIN category ON transaction.categoryId = category.id INNER JOIN wallet ON transaction.walletId = wallet.id WHERE wallet.id = ${walletId} AND wallet.userId = ${userId}`;
    let transactions = await this.transactionRepository.query(sql);
    return transactions;
  };

  //limit check
  getTotalExpense = async (walletId, userId) => {
    let sql = `select sum(amount) as totalExpense from transaction inner join category on transaction.categoryId = category.id inner join wallet on transaction.walletId = wallet.id where walletId = ${walletId} and category.transactionType = 'expense'`;
    let totalExpense = await this.transactionRepository.query(sql);
    return totalExpense[0].totalExpense;
  };
}

export default new TransactionService();