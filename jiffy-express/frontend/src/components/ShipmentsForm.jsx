import { useState } from "react";

function ShipmentForm({ onShipmentCreated }) {
    const [form, setForm] = useState({
        tracking_number: "",
        sender: "",
        receiver: "",
        origin: "",
        destination: "",
        scenario: "Operasional",
        condition_level: "Normal",
        status: "Pending"
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        await onShipmentCreated(form);

        setForm({
            tracking_number: "",
            sender: "",
            receiver: "",
            origin: "",
            destination: "",
            scenario: "Operasional",
            condition_level: "Normal",
            status: "Pending"
        });
    };

    return (
        <div className="shipment-form">
            <h2>Tambah Shipment</h2>

            <form onSubmit={handleSubmit}>
                <div className="form-grid">

                    <div className="form-group">
                        <label>Tracking Number</label>
                        <input
                            type="text"
                            name="tracking_number"
                            value={form.tracking_number}
                            onChange={handleChange}
                            placeholder="JFX-001"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Pengirim</label>
                        <input
                            type="text"
                            name="sender"
                            value={form.sender}
                            onChange={handleChange}
                            placeholder="Nama pengirim"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Penerima</label>
                        <input
                            type="text"
                            name="receiver"
                            value={form.receiver}
                            onChange={handleChange}
                            placeholder="Nama penerima"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Asal</label>
                        <input
                            type="text"
                            name="origin"
                            value={form.origin}
                            onChange={handleChange}
                            placeholder="Bandung"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Tujuan</label>
                        <input
                            type="text"
                            name="destination"
                            value={form.destination}
                            onChange={handleChange}
                            placeholder="Jakarta"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Skenario</label>
                        <select
                            name="scenario"
                            value={form.scenario}
                            onChange={handleChange}
                        >
                            <option value="Operasional">
                                Operasional
                            </option>

                            <option value="Kendala operasional">
                                Kendala operasional
                            </option>

                            <option value="Kendala pengiriman">
                                Kendala pengiriman
                            </option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Kondisi Paket</label>
                        <select
                            name="condition_level"
                            value={form.condition_level}
                            onChange={handleChange}
                        >
                            <option value="Normal">
                                Normal
                            </option>

                            <option value="Kusam">
                                Kusam
                            </option>

                            <option value="Penyok">
                                Penyok
                            </option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Status</label>
                        <select
                            name="status"
                            value={form.status}
                            onChange={handleChange}
                        >
                            <option value="Pending">
                                Pending
                            </option>

                            <option value="In Transit">
                                In Transit
                            </option>

                            <option value="Delayed">
                                Delayed
                            </option>

                            <option value="Delivered">
                                Delivered
                            </option>
                        </select>
                    </div>

                </div>

                <button
                    type="submit"
                    className="btn-primary"
                >
                    Tambah Shipment
                </button>
            </form>
        </div>
    );
}

export default ShipmentForm;