import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import { getShipments, trackShipment } from "../api";

function Dashboard() {
    const navigate = useNavigate();

    const [shipments, setShipments] = useState([]);
    const [trackingNumber, setTrackingNumber] = useState("");
    const [trackingResult, setTrackingResult] = useState(null);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [trackingLoading, setTrackingLoading] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/");
            return;
        }

        loadShipments();
    }, [navigate]);


    const loadShipments = async () => {
        try {
            const token = localStorage.getItem("token");

            console.log("TOKEN DASHBOARD:", token);

            const data = await getShipments();
            
            console.log("SHIPMENTS DATA:", data);
            
            if (Array.isArray(data)) {
                setShipments(data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };


    const handleTracking = async (e) => {
        e.preventDefault();

        if (!trackingNumber.trim()) {
            setMessage("Masukkan nomor resi terlebih dahulu");
            return;
        }

        try {
            setTrackingLoading(true);
            setMessage("");
            setTrackingResult(null);

            const data = await trackShipment(
                trackingNumber.trim()
            );

            if (data.shipment) {
                setTrackingResult(data);
            } else {
                setMessage(
                    data.message || "Resi tidak ditemukan"
                );
            }

        } catch (error) {
            console.error(error);

            setMessage(
                "Gagal terhubung ke server"
            );
        } finally {
            setTrackingLoading(false);
        }
    };


    const getStatusClass = (status) => {
        switch (status) {
            case "Delivered":
                return "status delivered";

            case "In Transit":
                return "status transit";

            case "Delayed":
                return "status delayed";

            default:
                return "status pending";
        }
    };


    const pending = shipments.filter(
        item => item.status === "Pending"
    ).length;

    const inTransit = shipments.filter(
        item => item.status === "In Transit"
    ).length;

    const delayed = shipments.filter(
        item => item.status === "Delayed"
    ).length;

    const delivered = shipments.filter(
        item => item.status === "Delivered"
    ).length;


    return (
        <div className="user-page">

            <Navbar />

            <main className="user-dashboard">

                <section className="welcome-section">
                    <div>
                        <h1>
                            Dashboard User
                        </h1>

                        <p>
                            Pantau pengiriman Jiffy Express
                        </p>
                    </div>
                </section>

                <section className="tracking-section">

                    <div className="tracking-title">
                        <h2>
                            🔎 Lacak Pengiriman
                        </h2>

                        <p>
                            Masukkan nomor resi untuk melihat
                            status pengiriman
                        </p>
                    </div>


                    <form
                        className="tracking-form"
                        onSubmit={handleTracking}
                    >

                        <input
                            type="text"
                            value={trackingNumber}
                            onChange={(e) =>
                                setTrackingNumber(
                                    e.target.value
                                )
                            }
                            placeholder="Contoh: JFX123456"
                        />

                        <button
                            type="submit"
                            className="btn-primary"
                            disabled={trackingLoading}
                        >
                            {trackingLoading
                                ? "Mencari..."
                                : "Lacak Resi"}
                        </button>

                    </form>


                    {message && (
                        <div className="tracking-error">
                            {message}
                        </div>
                    )}

                </section>


                {trackingResult && (
                    <section className="tracking-result">

                        <div className="result-header">

                            <div>
                                <p>
                                    Nomor Resi
                                </p>

                                <h2>
                                    {
                                        trackingResult.shipment
                                            .tracking_number
                                    }
                                </h2>
                            </div>

                            <span
                                className={getStatusClass(
                                    trackingResult.shipment.status
                                )}
                            >
                                {
                                    trackingResult.shipment.status
                                }
                            </span>

                        </div>


                        <div className="shipment-info">

                            <div>
                                <span>
                                    Pengirim
                                </span>

                                <strong>
                                    {
                                        trackingResult.shipment
                                            .sender
                                    }
                                </strong>
                            </div>


                            <div>
                                <span>
                                    Penerima
                                </span>

                                <strong>
                                    {
                                        trackingResult.shipment
                                            .receiver
                                    }
                                </strong>
                            </div>


                            <div>
                                <span>
                                    Asal
                                </span>

                                <strong>
                                    {
                                        trackingResult.shipment
                                            .origin
                                    }
                                </strong>
                            </div>


                            <div>
                                <span>
                                    Tujuan
                                </span>

                                <strong>
                                    {
                                        trackingResult.shipment
                                            .destination
                                    }
                                </strong>
                            </div>

                        </div>

                        <div className="tracking-timeline">

                            <h3>
                                Riwayat Pengiriman
                            </h3>


                            {trackingResult
                                .tracking_history
                                ?.length > 0 ? (

                                <div className="timeline">

                                    {trackingResult
                                        .tracking_history
                                        .map((item) => (

                                            <div
                                                className="timeline-item"
                                                key={item.id}
                                            >

                                                <div className="timeline-dot">
                                                </div>

                                                <div className="timeline-content">

                                                    <div className="timeline-top">

                                                        <strong>
                                                            {item.status}
                                                        </strong>

                                                        <span>
                                                            {new Date(
                                                                item.created_at
                                                            ).toLocaleString(
                                                                "id-ID"
                                                            )}
                                                        </span>

                                                    </div>

                                                    <p>
                                                        📍{" "}
                                                        {item.location}
                                                    </p>

                                                    {item.description && (
                                                        <small>
                                                            {
                                                                item.description
                                                            }
                                                        </small>
                                                    )}

                                                </div>

                                            </div>

                                        ))}

                                </div>

                            ) : (

                                <div className="empty-history">
                                    Belum ada riwayat tracking.
                                </div>

                            )}

                        </div>

                    </section>
                )}

                <section className="user-stats">

                    <div className="user-stat-card">
                        <span>Total Shipment</span>
                        <strong>
                            {shipments.length}
                        </strong>
                    </div>


                    <div className="user-stat-card">
                        <span>Pending</span>
                        <strong>
                            {pending}
                        </strong>
                    </div>


                    <div className="user-stat-card">
                        <span>In Transit</span>
                        <strong>
                            {inTransit}
                        </strong>
                    </div>


                    <div className="user-stat-card">
                        <span>Delayed</span>
                        <strong>
                            {delayed}
                        </strong>
                    </div>


                    <div className="user-stat-card">
                        <span>Delivered</span>
                        <strong>
                            {delivered}
                        </strong>
                    </div>

                </section>

                <section className="shipment-list-section">

                    <div className="section-header">

                        <div>
                            <h2>
                                📦 Daftar Shipment
                            </h2>

                            <p>
                                Data pengiriman terbaru
                            </p>
                        </div>

                    </div>


                    {loading ? (

                        <div className="loading">
                            Memuat data...
                        </div>

                    ) : shipments.length === 0 ? (

                        <div className="empty-history">
                            Belum ada shipment.
                        </div>

                    ) : (

                        <div className="shipment-cards">

                            {shipments.map((shipment) => (

                                <div
                                    className="shipment-card"
                                    key={shipment.id}
                                >

                                    <div className="shipment-card-header">

                                        <div>
                                            <span>
                                                Nomor Resi
                                            </span>

                                            <strong>
                                                {
                                                    shipment.tracking_number
                                                }
                                            </strong>
                                        </div>

                                        <span
                                            className={getStatusClass(
                                                shipment.status
                                            )}
                                        >
                                            {
                                                shipment.status
                                            }
                                        </span>

                                    </div>


                                    <div className="route">

                                        <div>
                                            <small>
                                                Dari
                                            </small>

                                            <strong>
                                                {shipment.origin}
                                            </strong>
                                        </div>


                                        <div className="route-arrow">
                                            →
                                        </div>


                                        <div>
                                            <small>
                                                Ke
                                            </small>

                                            <strong>
                                                {
                                                    shipment.destination
                                                }
                                            </strong>
                                        </div>

                                    </div>


                                    <div className="shipment-card-footer">

                                        <span>
                                            Penerima:{" "}
                                            {
                                                shipment.receiver
                                            }
                                        </span>

                                        <button
                                            onClick={() => {
                                                setTrackingNumber(
                                                    shipment.tracking_number
                                                );

                                                window.scrollTo({
                                                    top: 0,
                                                    behavior: "smooth"
                                                });
                                            }}
                                            className="btn-track"
                                        >
                                            Lacak
                                        </button>

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

                </section>

            </main>

        </div>
    );
}

export default Dashboard;