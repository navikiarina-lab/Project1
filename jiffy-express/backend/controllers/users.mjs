import db from "../config/db.mjs";

export const getUsers = async (req, res) => {
    try {

        const [users] =
            await db.promise().query(
                `SELECT
                    id,
                    name,
                    email,
                    role
                 FROM users
                 ORDER BY name ASC`
            );

        res.json(users);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message:
                "Gagal mengambil data user"
        });
    }
};