import db from "../config/db.mjs";


export const getAll = async (req, res) => {
    try {
        let query;
        let params = [];

        // ADMIN → melihat semua shipment
        if (req.user.role === "admin") {

            query = `
                SELECT
                    shipments.*,
                    users.name AS user_name,
                    users.email AS user_email
                FROM shipments
                LEFT JOIN users
                    ON shipments.user_id = users.id
                ORDER BY shipments.id DESC
            `;

        } else {

           
            query = `
                SELECT *
                FROM shipments
                WHERE user_id = ?
                ORDER BY id DESC
            `;

            params = [req.user.id];
        }

        const [shipments] =
            await db.promise().query(
                query,
                params
            );

        res.json(shipments);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Gagal mengambil shipment"
        });
    }
};


export const create = async (req, res) => {
    try {

        const {
            user_id,    
            tracking_number,
            sender,
            receiver,
            origin,
            destination,
            scenario,
            condition_level,
            status
        } = req.body;


        if (
            !tracking_number ||
            !sender ||
            !receiver ||
            !origin ||
            !destination
        ) {
            return res.status(400).json({
                message:
                    "Data shipment belum lengkap"
            });
        }


        const [result] =
            await db.promise().query(
                `INSERT INTO shipments
                (
                    user_id,
                    tracking_number,
                    sender,
                    receiver,
                    origin,
                    destination,
                    scenario,
                    condition_level,
                    status
                )
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    user_id,
                    tracking_number,
                    sender,
                    receiver,
                    origin,
                    destination,
                    scenario || "Operasional",
                    condition_level || "Normal",
                    status || "Pending"
                ]
            );


        res.status(201).json({
            message:
                "Shipment berhasil dibuat",

            id: result.insertId
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message:
                "Gagal membuat shipment"
        });
    }
};


export const update = async (req, res) => {
    try {

        const { id } = req.params;

        const {
            sender,
            receiver,
            origin,
            destination,
            scenario,
            condition_level,
            status
        } = req.body;

        let query;
        let params;


        if (req.user.role === "admin") {

            query = `
                UPDATE shipments
                SET
                    sender = ?,
                    receiver = ?,
                    origin = ?,
                    destination = ?,
                    scenario = ?,
                    condition_level = ?,
                    status = ?
                WHERE id = ?
            `;

            params = [
                sender,
                receiver,
                origin,
                destination,
                scenario,
                condition_level,
                status,
                id
            ];

        } else {

            query = `
                UPDATE shipments
                SET
                    sender = ?,
                    receiver = ?,
                    origin = ?,
                    destination = ?,
                    scenario = ?,
                    condition_level = ?,
                    status = ?
                WHERE id = ?
                AND user_id = ?
            `;

            params = [
                sender,
                receiver,
                origin,
                destination,
                scenario,
                condition_level,
                status,
                id,
                req.user.id
            ];
        }


        const [result] =
            await db.promise().query(
                query,
                params
            );


        if (result.affectedRows === 0) {
            return res.status(404).json({
                message:
                    "Shipment tidak ditemukan"
            });
        }


        res.json({
            message:
                "Shipment berhasil diperbarui"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message:
                "Gagal memperbarui shipment"
        });
    }
};


export const remove = async (req, res) => {
    try {

        const { id } = req.params;

        let query;
        let params;


        if (req.user.role === "admin") {

            query =
                "DELETE FROM shipments WHERE id = ?";

            params = [id];

        } else {

            query = `
                DELETE FROM shipments
                WHERE id = ?
                AND user_id = ?
            `;

            params = [
                id,
                req.user.id
            ];
        }


        const [result] =
            await db.promise().query(
                query,
                params
            );


        if (result.affectedRows === 0) {
            return res.status(404).json({
                message:
                    "Shipment tidak ditemukan"
            });
        }


        res.json({
            message:
                "Shipment berhasil dihapus"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message:
                "Gagal menghapus shipment"
        });
    }
};


export const trackShipment = async (req, res) => {
    try {

        const {
            tracking_number
        } = req.params;


        if (!tracking_number) {
            return res.status(400).json({
                message:
                    "Nomor resi wajib diisi"
            });
        }


        const [shipments] =
            await db.promise().query(
                `SELECT
                    id,
                    tracking_number,
                    sender,
                    receiver,
                    origin,
                    destination,
                    scenario,
                    condition_level,
                    status,
                    created_at,
                    updated_at
                FROM shipments
                WHERE tracking_number = ?`,
                [tracking_number]
            );


        if (shipments.length === 0) {
            return res.status(404).json({
                message:
                    "Nomor resi tidak ditemukan"
            });
        }


        const shipment = shipments[0];


        const [history] =
            await db.promise().query(
                `SELECT
                    id,
                    status,
                    location,
                    description,
                    created_at
                FROM tracking_history
                WHERE shipment_id = ?
                ORDER BY created_at ASC`,
                [shipment.id]
            );


        res.json({
            shipment,
            tracking_history: history
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message:
                "Gagal melakukan tracking"
        });
    }
};