import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import ShipmentForm from "../components/ShipmentsForm";
import ShipmentTable from "../components/ShipmentsTable";

import {
    getShipments,
    createShipment,
    deleteShipment
} from "../api";

function AdminDashboard() {
    const navigate = useNavigate();

    const [shipments, setShipments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/");
            return;
        }

        if (user?.role !== "admin") {
            navigate("/dashboard");
            return;
        }

        loadShipments();
    }, [navigate]);

    const loadShipments = async () => {
        try {
            setLoading(true);

            const data = await getShipments();

            if (Array.isArray(data)) {
                setShipments(data);
            } else {
                setMessage(
                    data.message || "Gagal mengambil data"
                );
            }
        } catch (error) {
            console.error(error);

            setMessage(
                "Tidak dapat terhubung ke server"
            );
        } finally {
            setLoading(false);
        }
    };

    const handleCreateShipment = async (shipment) => {
        try {
            const data = await createShipment(shipment);

            if (data.id) {
                setMessage(
                    "Shipment berhasil ditambahkan"
                );

                await loadShipments();
            } else {
                setMessage(
                    data.message || "Gagal menambahkan shipment"
                );
            }
        } catch (error) {
            console.error(error);

            setMessage(
                "Tidak dapat terhubung ke server"
            );
        }
    };

    const handleDeleteShipment = async (id) => {
        const confirmDelete = window.confirm(
            "Yakin ingin menghapus shipment ini?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            const data = await deleteShipment(id);

            setMessage(
                data.message || "Shipment berhasil dihapus"
            );

            await loadShipments();
        } catch (error) {
            console.error(error);

            setMessage(
                "Gagal menghapus shipment"
            );
        }
    };

    const totalShipment = shipments.length;

    const pending = shipments.filter(
        (item) => item.status === "Pending"
    ).length;

    const inTransit = shipments.filter(
        (item) => item.status === "In Transit"
    ).length;

    const delayed = shipments.filter(
        (item) => item.status === "Delayed"
    ).length;

    const delivered = shipments.filter(
        (item) => item.status === "Delivered"
    ).length;

    return (
        <div className="admin-page">

            <Navbar />

            <main className="dashboard">

                {/* HEADER */}

                <div className="dashboard-header">
                    <div>
                        <h1>Dashboard Admin</h1>

                        <p>
                            Kelola dan pantau seluruh shipment
                            Jiffy Express.
                        </p>
                    </div>
                </div>

                {/* MESSAGE */}

                {message && (
                    <div className="dashboard-message">
                        {message}
                    </div>
                )}

                {/* STATISTICS */}

                <div className="stats-grid">

                    <div className="stat-card">
                        <h3>Total Shipment</h3>
                        <strong>
                            {totalShipment}
                        </strong>
                    </div>

                    <div className="stat-card">
                        <h3>Pending</h3>
                        <strong>
                            {pending}
                        </strong>
                    </div>

                    <div className="stat-card">
                        <h3>In Transit</h3>
                        <strong>
                            {inTransit}
                        </strong>
                    </div>

                    <div className="stat-card">
                        <h3>Delayed</h3>
                        <strong>
                            {delayed}
                        </strong>
                    </div>

                    <div className="stat-card">
                        <h3>Delivered</h3>
                        <strong>
                            {delivered}
                        </strong>
                    </div>

                </div>

                {/* FORM */}

                <ShipmentForm
                    onShipmentCreated={
                        handleCreateShipment
                    }
                />

                {/* TABLE */}

                {loading ? (
                    <div className="loading">
                        Memuat data shipment...
                    </div>
                ) : (
                    <ShipmentTable
                        shipments={shipments}
                        onDelete={
                            handleDeleteShipment
                        }
                    />
                )}

            </main>

        </div>
    );
}

export default AdminDashboard;