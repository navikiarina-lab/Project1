function ShipmentTable({ shipments, onDelete }) {
    return (
        <div className="table-container">
            <h2>Data Shipment</h2>

            <table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Tracking</th>
                        <th>Pengirim</th>
                        <th>Penerima</th>
                        <th>Asal</th>
                        <th>Tujuan</th>
                        <th>Kondisi</th>
                        <th>Status</th>
                        <th>Aksi</th>
                    </tr>
                </thead>

                <tbody>
                    {shipments.length === 0 ? (
                        <tr>
                            <td colSpan="9" className="empty">
                                Belum ada shipment
                            </td>
                        </tr>
                    ) : (
                        shipments.map((shipment, index) => (
                            <tr key={shipment.id}>
                                <td>{index + 1}</td>

                                <td>
                                    <strong>
                                        {shipment.tracking_number}
                                    </strong>
                                </td>

                                <td>{shipment.sender}</td>
                                <td>{shipment.receiver}</td>
                                <td>{shipment.origin}</td>
                                <td>{shipment.destination}</td>
                                <td>{shipment.condition_level}</td>

                                <td>
                                    <span className="status">
                                        {shipment.status}
                                    </span>
                                </td>

                                <td>
                                    <button
                                        className="btn-delete"
                                        onClick={() =>
                                            onDelete(shipment.id)
                                        }
                                    >
                                        Hapus
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ShipmentTable;