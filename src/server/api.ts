import { remultExpress } from "remult/remult-express";
import { Task } from "../shared/task";
import { TasksController } from "../shared/TaskController";
import {createPostgresConnection } from "remult/postgres"

export const api = remultExpress({
  entities: [Task],
  controllers: [TasksController],
  getUser: (req) => req.session?.['user'],
  dataProvider: createPostgresConnection({
    connectionString: process.env["DATABASE_URL"] || "postgres://postgres:MASTERKEY@localhost/postgres" 
  }),
});

