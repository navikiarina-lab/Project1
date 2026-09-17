const API_URL = "http://187.53.137.186:5000/api";

export const loginUser = async (email, password) => {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            password
        })
    });

    return response.json();
};

export const registerUser = async (name, email, password) => {
    const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name,
            email,
            password
        })
    });

    return response.json();
};

export const getShipments = async () => {
    const token = localStorage.getItem("token");

    const response = await fetch(
        `${API_URL}/shipments`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.json();
};


export const createShipment = async (shipment) => {
    const token = localStorage.getItem("token");

    const response = await fetch(
        `${API_URL}/shipments`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(shipment)
        }
    );

    return response.json();
};


export const getUsers = async () => {
    const token = localStorage.getItem("token");

    const response = await fetch(
        `${API_URL}/users`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.json();
};


export const deleteShipment = async (id) => {
    const token = localStorage.getItem("token");

    const response = await fetch(
        `${API_URL}/shipments/${id}`,
        {
            method: "DELETE",

            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.json();
};

export const trackShipment = async (trackingNumber) => {
    const response = await fetch(
        `${API_URL}/shipments/tracking/${trackingNumber}`
    );

    return response.json();
};