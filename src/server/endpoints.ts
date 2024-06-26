/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Router } from "express";
import { remult } from "remult";
import bcrypt from 'bcrypt';
import { api } from "./api";
import { Transaction, User } from "../shared/dbSchema";
import { FinanceController } from "../shared/FinanceController";

export const router = Router();
router.use(express.json());

router.post("/api/register", api.withRemult, async (req, res) => {
  const userRepo = remult.repo(User);
  try {
    const { newUsername, newPassword } = req.body;
    const existingUser = await userRepo.findOne({ where: { username: newUsername } });

    if (existingUser) {
      throw new Error("Username is taken.");
    }
    if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(newPassword)) {
      throw Error("Password must be at least 8 characters and include a digit, a lowercase letter, and an uppercase letter");
    }
        // Hash the password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const newUser = new User();

    // Create a new user entity
    newUser.username = newUsername;
    newUser.password = hashedPassword;

    // Save the new user to the database
    await userRepo.insert(newUser);
    const user = await userRepo.findOne({ where: { username: newUsername } });

    req.session!["user"] = {id: user.id, name: user.username};
    res.status(201).json("Success");
  } catch (error: any) {
    res.status(409).json(error.message);
  }
});

router.delete("/api/deleteTransaction/:transactionId", api.withRemult, async (req, res) => {
  const transactionRepo = remult.repo(Transaction);
  try {
    await transactionRepo.delete(req.params.transactionId);
    res.status(200).json("Transaction deleted successfully");
  } catch (error) {
    res.status(400).json("Error deleting transaction");
  }
}); 

router.post("/api/signIn", api.withRemult, async (req, res) => {
const userRepo = remult.repo(User);
  try {
    const { username, password } = req.body;
    const user = await userRepo.findOne({ where: { username: username } });
    if (user) {
      if (await bcrypt.compare(password, user.password)) {
        req.session!["user"] = {id: user.id, name: user.username};
        const currentUser = req.session!['user']
        res.status(201).json(currentUser);
      } else {
        res.status(401).json("Invalid username or password");
      }
    } else {
      throw new Error("Invalid username or password");
    }
  } catch (error) {
    res.status(401).json("Invalid username or password");
  }
});

router.get("/api/loadUserTransaction", api.withRemult, async (req, res) => {
  const userRepo = remult.repo(User);
  try {
    const user = await userRepo.findFirst({id: req.session!["user"].id});
    const loadedTransactions = await userRepo.relations(user).transactions.find({
      orderBy: { date:"desc" }
    })

    res.json(loadedTransactions);
  } catch (error) {
    res.status(401).json("Invalid username or password");
  }
});

router.post("/api/deleteAccount", api.withRemult, async (req, res) => {
  const transactionRepo = remult.repo(Transaction)
  const userRepo = remult.repo(User);
  const user = await userRepo.findFirst({id: req.session!["user"].id});
  const loadedTransactions = await userRepo.relations(user).transactions.find()

    try {
      loadedTransactions.forEach(async (transaction: any) => {
        await transactionRepo.delete({transactionId:transaction.transactionId})
      });
      await userRepo.delete({
        id: req.session!["user"].id,
      });
      req.session!['user'] = null;
      res.json("Successfully deleted account");
    } catch (error) {
      res.status(401).json("could not delete");
    }
  });

// router.post("/api/deleteAllTasks", api.withRemult, async (req, res) => {
//   const userRepo = remult.repo(User);
//   const transactionRepo = remult.repo(Transaction);
//   try {
//     const deletedUser = await userRepo.delete({
//       id: req.session!["user"].id,
//     });
//     await transactionRepo.delete({
//       userId: req.session!["user"].id,
//     });
//     req.session!['user'] = null;
//     res.json(deletedUser);
//   } catch (error) {
//     res.status(401).json("could not delete");
//   }
// })

router.post("/api/addUserTransaction", api.withRemult, async (req, res) => {
  try {
    await FinanceController.addUserTransaction(req.body, req.session!["user"].id)
    res.status(201).json("Successfully added a transaction");
  } catch (error: any) {
    res.status(409).json(error.message);
  }
});

router.post("/api/importTransactions", api.withRemult, async (req, res) => {
  try {
    await FinanceController.importTransactions(req.body, req.session!["user"].id)
    res.status(201).json("Successfully imported csv file");
  } catch (error: any) {
    res.status(409).json(error.message);
  }
});

router.post("/api/signOut", (req, res) => {
  req.session!['user'] = null;
  res.json("ok")
});

router.get("/api/currentUser", (req, res) => {
  const currentUser = req.session!['user']
  res.json(currentUser);
});