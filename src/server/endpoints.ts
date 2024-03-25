/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Router } from "express";
import { remult } from "remult";
import bcrypt from 'bcrypt';
import { api } from "./api";
import { Transaction, User } from "../shared/dbSchema";

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

    req.session!["user"] = user;
    res.status(201).json(newUser);
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
        req.session!["user"] = user;
        res.status(201).json(user);
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
  const transactionRepo = remult.repo(Transaction)
    try {
      const loadedTransaction = await transactionRepo.find({
        where: {
          userId: req.session!["user"].id,
        },
      });
      res.json(loadedTransaction);
    } catch (error) {
      res.status(401).json("Invalid username or password");
    }
  });

  auth.post("/api/deleteAccount", api.withRemult, async (req, res) => {
    const userRepo = remult.repo(User);
      try {
        const deleted = await userRepo.delete({
          id: req.session!["user"].id,
        });
        req.session!['user'] = null;
        res.json(deleted);
      } catch (error) {
        res.status(401).json("could not delete");
      }
    });
  
    
  

  auth.post("/api/addUserTransaction", api.withRemult, async (req, res) => {
    const transactionRepo = remult.repo(Transaction)
    try {
      const { amount, category, description, is_income, date } = req.body;
      // Create a new user entity
      const newTransaction = {
        amount: amount,
        category: category,
        description: description,
        is_income: is_income,
        date: date,
        userId: req.session!["user"].id
      };
      // Save the new user to the database
      await transactionRepo.insert(newTransaction);
      res.status(201).json(newTransaction);
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
