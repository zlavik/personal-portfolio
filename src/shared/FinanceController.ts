/* eslint-disable @typescript-eslint/no-explicit-any */
import { Allow, BackendMethod, remult } from "remult";
import bcrypt from 'bcrypt';
import { User } from "./dbSchema";


export class FinanceController {
  @BackendMethod({ allowed: true })
  static async register(username: string, password: string) {
    const userRepo = remult.repo(User);
    
    // Check if the username is already taken
    const existingUser = await userRepo.findOne({ where: { username: username } });
    if (existingUser) {
      throw new Error("Username already exists");
    }

    if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password)) {
      throw Error("Password must be at least 8 characters and include a digit, a lowercase letter, and an uppercase letter");
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user entity
    const newUser = new User();
    newUser.username = username;
    newUser.password = hashedPassword;

    // Save the new user to the database
    await userRepo.insert(newUser);

    return newUser;
  }
  @BackendMethod({ allowed: Allow.authenticated })
  static async updatePassword(userId: string, newPassword: string) {
    const userRepo = remult.repo(User);
    const user = await userRepo.findId(userId);
    if (user) {
      user.password = newPassword;
      await userRepo.save(user);
    } else {
      throw new Error("User not found");
    }
  }

  @BackendMethod({ allowed: true })
  static async doesPasswordMatch(userId: string, password: string) {
    const userRepo = remult.repo(User);
    const user = await userRepo.findId(userId);
    if (user) {
      return await bcrypt.compare(password, user.password);
    } else {
      throw new Error("User not found");
    }
  }

  @BackendMethod({ allowed: Allow.authenticated })
  static async addUserTransaction(transaction: any, id: string) {
    const userRepo = remult.repo(User);
    const { amount, category, description, transactionType, is_income, date } = transaction;
    const newTransaction = {
      amount: amount,
      category: category,
      description: description,
      transactionType: transactionType,
      is_income: is_income,
      date: date,
    };
    const user = await userRepo.findFirst({id: id});
    const addedTransaction = await userRepo.relations(user).transactions.insert(newTransaction)
    return addedTransaction;
  }


  @BackendMethod({ allowed: Allow.authenticated })
  static async importTransactions(transactions: any, id: string) {
    const userRepo = remult.repo(User);
    const user = await userRepo.findFirst({id: id});

    const result = transactions.map(async (transaction:any) => {
      const newTransaction = {
        amount: transaction.amount,
        category: transaction.category,
        description: transaction.description,
        transactionType: transaction.transactionType,
        is_income: transaction.category.includes("Income") || transaction.category.includes("Paycheck") ? true : false,
        date: transaction.date,
      };
      return await userRepo.relations(user).transactions.insert(newTransaction)
    });
    return result;
  }
}