import express from "express";
import session from "cookie-session";
import { api } from "./api";
import { router } from "./endpoints";
import path from "path";

const app = express();
app.use(
    session({
        secret: process.env["SESSION_SECRET"] || "secret"
    })
);
app.use(router);
app.use(api);
app.use(express.static(path.join(process.cwd(), "dist")));

app.get('*', (_req, res) => {
    res.sendFile(path.join(process.cwd(), 'dist', 'index.html'));
});

app.listen(process.env["PORT"] || 3002, () => {
    console.log("Server is running on port 3002.")
});