import express from "express";

import authMiddleware
    from "../middleware/auth.mjs";

import adminOnly
    from "../middleware/adminOnly.mjs";

import {
    getUsers
} from "../controllers/users.mjs";

const router = express.Router();

router.get(
    "/",
    authMiddleware,
    adminOnly,
    getUsers
);

export default router;