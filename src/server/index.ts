import express from "express";
import session from "cookie-session";
import { api } from "./api";
import { auth } from "./endpoints";

const app = express();
app.use(
    session({
        secret: process.env["SESSION_SECRET"] || "secret"
    })
);
app.use(auth);
app.use(api);
app.use(express.static(process.cwd() + "/dist"));
app.listen(process.env["PORT"] || 3002, () => {
    console.log("Server is running on port 3002.")
});
