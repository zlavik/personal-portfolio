import { Allow, BackendMethod, remult } from "remult";
import { Transaction } from "./dbSchema";

export class TransactionController {

  @BackendMethod({allowed: Allow.authenticated})
  static async addTransaction(newTransactionData: object) {
    const taskRepo = remult.repo(Transaction);
    const newTransaction = new Transaction();
    newTransaction.amount = newTransactionData.amount;
    newTransaction.category = newTransactionData.category;
    newTransaction.description = newTransactionData.description;
    newTransaction.is_income = newTransactionData.is_income;
    newTransaction.date = newTransactionData.date;
    newTransaction.user = newTransactionData.user;
    await taskRepo.insert(newTransaction);
    return newTransaction;
  }

  @BackendMethod({allowed: Allow.authenticated})
  static async loadTransactions(userId: number) {
    const taskRepo = remult.repo(Transaction);
    const loadedTransaction = taskRepo.find({  include: {
      user: true,
    },});
    return loadedTransaction;
  }

  @BackendMethod({allowed: Allow.authenticated})
  static async setAllCompleted(completed: boolean) {
    const taskRepo = remult.repo(Task);
    for (const task of await taskRepo.find()) {
      await taskRepo.save({...task, completed});
    }
  }

}