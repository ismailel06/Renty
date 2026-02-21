const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to database
const db = new sqlite3.Database("./database.sqlite");

// Create tables
db.serialize(() => {

    db.run(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        role TEXT CHECK(role IN ('client','provider')) NOT NULL,
        city TEXT
    )
    `);

    db.run(`
    CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        provider_id INTEGER,
        name TEXT,
        description TEXT,
        category TEXT,
        city TEXT,
        condition TEXT,
        price_hour REAL,
        price_day REAL,
        FOREIGN KEY(provider_id) REFERENCES users(id)
    )
    `);

    db.run(`
    CREATE TABLE IF NOT EXISTS rentals (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        product_id INTEGER,
        client_id INTEGER,
        duration_hours INTEGER,
        status TEXT DEFAULT 'requested',
        paid INTEGER DEFAULT 0,
        FOREIGN KEY(product_id) REFERENCES products(id),
        FOREIGN KEY(client_id) REFERENCES users(id)
    )
    `);

});

app.get("/", (req, res) => {
    res.send("Backend with database ready 🚀");
});

// Create new user
app.post("/users", (req, res) => {

    const { name, email, role, city } = req.body;

    db.run(
        `INSERT INTO users (name, email, role, city) VALUES (?, ?, ?, ?)`,
        [name, email, role, city],
        function (err) {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            res.json({ id: this.lastID, name, email, role, city });
        }
    );

});

// Add product
app.post("/products", (req, res) => {

    const {
        provider_id,
        name,
        description,
        category,
        city,
        condition,
        price_hour,
        price_day
    } = req.body;

    db.run(
        `INSERT INTO products 
        (provider_id, name, description, category, city, condition, price_hour, price_day) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [provider_id, name, description, category, city, condition, price_hour, price_day],
        function (err) {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            res.json({ id: this.lastID });
        }
    );

});

// Get all products
app.get("/products", (req, res) => {

    db.all("SELECT * FROM products", [], (err, rows) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json(rows);
    });

});

const PORT = 4000;
app.listen(PORT, () => {
    console.log("Server running on http://localhost:4000");
});