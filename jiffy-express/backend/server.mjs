import express from "express";

import cors from "cors";

import dotenv from "dotenv";

import authRoutes
    from "./routes/auth.mjs";

import shipmentRoutes
    from "./routes/shipments.mjs";


dotenv.config();

import userRoutes from "./routes/users.mjs";

console.log("DATABASE:", process.env.DB_NAME);

const app = express();


app.use(cors());

app.use(express.json());


app.get("/", (req, res) => {

    res.json({

        message: "Jiffy Express API is running"

    });

});




app.use(
    "/api/auth",
    authRoutes
);

app.use("/api/users", userRoutes);

app.use(
    "/api/shipments",
    shipmentRoutes
);


const PORT =
    process.env.PORT || 5000;


app.listen(PORT, () => {

    console.log(
        `Server running on http://localhost:${PORT}`
    );

});