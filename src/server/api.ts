import { remultExpress } from "remult/remult-express";
import { createPostgresConnection } from "remult/postgres"
// import { UserController } from "../shared/UserController";
import { Transaction, User } from "../shared/dbSchema";
import { FinanceController } from "../shared/FinanceController"

export const api = remultExpress({
  entities: [Transaction, User], // Include User entity
  controllers: [FinanceController],
  getUser: (req) => req.session?.['user'],
  dataProvider: createPostgresConnection({
    connectionString: process.env["DATABASE_URL"] || "postgres://postgres:MASTERKEY@localhost/postgres" 
  }),
});

