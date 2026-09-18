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


SELECT id, name, email, role
FROM users
WHERE email = 'navi.kiarina@gmail.com';

UPDATE users
SET role = 'admin'
WHERE email = 'navi.kiarina@gmail.com';

INSERT INTO admins (user_id)
SELECT id
FROM users
WHERE email = 'navi.kiarina@gmail.com'
AND NOT EXISTS (
    SELECT 1 FROM admins WHERE admins.user_id = users.id
);

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
WHERE email = 'navi.kiarina@gmail.com';

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

UPDATE users
SET password = '$2b$10$F2Tet6sH.pVkbuq8PdQUl.V14bz0Tvr5pzVxrZJ6MtAVh/Hjz9geW'
WHERE email = 'navi.kiarina@gmail.com';

SELECT email, password
FROM users
WHERE email = 'navi.kiarina@gmail.com';

UPDATE users
SET email = 'admin_jiffy@express.com'
WHERE email = 'navi.kiarina@gmail.com';

SELECT id, name, email, role, password
FROM users
WHERE email = 'admin_jiffy@express.com';

DESCRIBE users;

DESCRIBE shipments;

DESCRIBE tracking_history;

SELECT
    id,
    user_id,
    tracking_number,
    sender,
    receiver,
    status
FROM shipments
ORDER BY id DESC;

SELECT id, name, email, role
FROM users;

SELECT
    id,
    user_id,
    tracking_number,
    sender,
    receiver,
    destination,
    status
FROM shipments;

UPDATE shipments
SET user_id = 2
WHERE id = 2;

SELECT
    id,
    user_id,
    tracking_number,
    sender,
    receiver,
    status
FROM shipments
ORDER BY id DESC;

SELECT id, name, email, role
FROM users
WHERE email = 'ananda.reza1@gmail.com';