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


router.get(
    "/tracking/:tracking_number",
    trackShipment
);

router.get(
    "/",
    authMiddleware,
    getAll
);

router.post(
    "/",
    authMiddleware,
    adminOnly,
    create
);


router.put(
    "/:id",
    authMiddleware,
    adminOnly,
    update
);


router.delete(
    "/:id",
    authMiddleware,
    adminOnly,
    remove
);


export default router;