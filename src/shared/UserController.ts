import { Allow, BackendMethod, remult } from "remult";
import bcrypt from 'bcrypt';
import { User } from "./dbSchema";


export class UserController {
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
}