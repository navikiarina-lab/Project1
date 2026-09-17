-- Active: 1789604800523@@127.0.0.1@3306@jiffy_express_db
CREATE DATABASE IF NOT EXISTS jiffy_express_db;

USE jiffy_express_db;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_admin_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE shipments (
    id INT AUTO_INCREMENT PRIMARY KEY,

    tracking_number VARCHAR(50) NOT NULL UNIQUE,

    sender VARCHAR(100) NOT NULL,
    receiver VARCHAR(100) NOT NULL,

    origin VARCHAR(100) NOT NULL,
    destination VARCHAR(100) NOT NULL,

    scenario VARCHAR(100) DEFAULT 'Operasional',

    condition_level ENUM(
        'Normal',
        'Kusam',
        'Penyok'
    ) DEFAULT 'Normal',

    status ENUM(
        'Pending',
        'In Transit',
        'Delayed',
        'Delivered'
    ) DEFAULT 'Pending',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE tracking_history (
    id INT AUTO_INCREMENT PRIMARY KEY,

    shipment_id INT NOT NULL,

    status ENUM(
        'Pending',
        'In Transit',
        'Delayed',
        'Delivered'
    ) NOT NULL,

    location VARCHAR(100) NOT NULL,

    description TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_tracking_shipment
        FOREIGN KEY (shipment_id)
        REFERENCES shipments(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

UPDATE users
SET role = 'admin'
WHERE email = 'admin.navi@gmail.com';

-- 1. Pastikan user sudah ada
SELECT id, name, email, role
FROM users
WHERE email = 'navi.kiarina@gmail.com';

-- 2. Jadikan admin
UPDATE users
SET role = 'admin'
WHERE email = 'navi.kiarina@gmail.com';

-- 3. Masukkan ke tabel admins
INSERT INTO admins (user_id)
SELECT id
FROM users
WHERE email = 'navi.kiarina@gmail.com'
AND NOT EXISTS (
    SELECT 1 FROM admins WHERE admins.user_id = users.id
);

-- 4. Cek
SELECT 
    u.id,
    u.name,
    u.email,
    u.role,
    a.id AS admin_id
FROM users u
LEFT JOIN admins a ON a.user_id = u.id
WHERE u.email = 'navi.kiarina@gmail.com';

SELECT id, name, email, role
FROM users

USE jiffy_express_db;

ALTER TABLE shipments
ADD COLUMN user_id INT NULL AFTER id;

ALTER TABLE shipments
ADD CONSTRAINT fk_shipment_user
FOREIGN KEY (user_id)
REFERENCES users(id)
ON DELETE SET NULL
ON UPDATE CASCADE;

USE jiffy_express_db;

INSERT INTO shipments
(
    tracking_number,
    sender,
    receiver,
    origin,
    destination,
    scenario,
    condition_level,
    status
)
VALUES
(
    'JFX123456',
    'Naufal',
    'Budi',
    'Bandung',
    'Jakarta',
    'Operasional',
    'Normal',
    'In Transit'
);

SELECT * FROM shipments;

INSERT INTO tracking_history
(
    shipment_id,
    status,
    location,
    description
)
VALUES
(
    1,
    'Pending',
    'Bandung',
    'Shipment telah dibuat'
),
(
    1,
    'In Transit',
    'Cimahi',
    'Shipment sedang dalam perjalanan'
),
(
    1,
    'In Transit',
    'Jakarta',
    'Shipment menuju lokasi penerima'
);

DESCRIBE shipments;