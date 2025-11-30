const express = require("express");
const mysql = require("mysql2");

const app = express();
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",   // ← your MySQL password
  database: "rahul_test"  // ← your database name
});

db.connect((err) => {
  if (err) {
    console.error("❌ MySQL Connection Error:", err);
    return;
  }
  console.log("✅ MySQL Connected Successfully");
});

// ------------------------
//       API ROUTES
// ------------------------

// GET all employees
app.get("/employees", (req, res) => {
  db.query("SELECT * FROM employees", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// GET employee by ID
app.get("/employees/:id", (req, res) => {
  db.query(
    "SELECT * FROM employees WHERE id = ?",
    [req.params.id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results[0] || { message: "Employee not found" });
    }
  );
});

// INSERT new employee
app.post("/employees", (req, res) => {
  const { name, age, salary } = req.body;

  db.query(
    "INSERT INTO employees (name, age, salary) VALUES (?,?,?)",
    [name, age, salary],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Employee created", id: result.insertId });
    }
  );
});

// UPDATE employee
app.put("/employees/:id", (req, res) => {
  const { name, age, salary } = req.body;

  db.query(
    "UPDATE employees SET name = ?, age = ?, salary = ? WHERE id = ?",
    [name, age, salary, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Employee updated" });
    }
  );
});

// DELETE employee
app.delete("/employees/:id", (req, res) => {
  db.query(
    "DELETE FROM employees WHERE id = ?",
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Employee deleted" });
    }
  );
});

// ------------------------
//       START SERVER
// ------------------------
app.listen(3000, () => {
  console.log("🚀 API running on http://localhost:3000");
});
