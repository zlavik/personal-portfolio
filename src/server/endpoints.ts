/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Router } from "express";
import { remult } from "remult";
import bcrypt from 'bcrypt';
import { api } from "./api";
import { Transaction, User } from "../shared/dbSchema";
import { FinanceController } from "../shared/FinanceController";
import path from "path";

export const auth = Router();
auth.use(express.json());

auth.post("/api/register", api.withRemult, async (req, res) => {
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


auth.post("/api/signIn", api.withRemult, async (req, res) => {
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

auth.get("/api/loadUserTransaction", api.withRemult, async (req, res) => {
  const userRepo = remult.repo(User);
  try {
    const user = await userRepo.findFirst({id: req.session!["user"].id});
    const loadedTransactions = await userRepo.relations(user).transactions.find()
    res.json(loadedTransactions);
  } catch (error) {
    res.status(401).json("Invalid username or password");
  }
});

auth.post("/api/deleteAccount", api.withRemult, async (req, res) => {
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

// auth.post("/api/deleteAllTasks", api.withRemult, async (req, res) => {
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


auth.post("/api/addUserTransaction", api.withRemult, async (req, res) => {
  try {
    await FinanceController.addUserTransaction(req.body, req.session!["user"].id)
    res.status(201).json("Successfully added a transaction");
  } catch (error: any) {
    res.status(409).json(error.message);
  }
});


auth.post("/api/signOut", (req, res) => {
  req.session!['user'] = null;
  res.json("ok")
});

auth.get("/api/currentUser", (req, res) => {
  const currentUser = req.session!['user']
  res.json(currentUser);
});

auth.get("/*", function (_req, res) {
  res.sendFile(path.join(__dirname, "dist/index.html"), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});