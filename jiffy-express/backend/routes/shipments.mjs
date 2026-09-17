import express from "express";

import authMiddleware
    from "../middleware/auth.mjs";

import adminOnly
    from "../middleware/adminOnly.mjs";

import {
    getAll,
    create,
    update,
    remove,
    trackShipment
} from "../controllers/shipments.mjs";

const router = express.Router();


// =========================
// TRACKING
// =========================

router.get(
    "/tracking/:tracking_number",
    trackShipment
);


// =========================
// USER + ADMIN
// =========================

router.get(
    "/",
    authMiddleware,
    getAll
);


// =========================
// ADMIN CREATE
// =========================

router.post(
    "/",
    authMiddleware,
    adminOnly,
    create
);


// =========================
// ADMIN UPDATE
// =========================

router.put(
    "/:id",
    authMiddleware,
    adminOnly,
    update
);


// =========================
// ADMIN DELETE
// =========================

router.delete(
    "/:id",
    authMiddleware,
    adminOnly,
    remove
);


export default router;