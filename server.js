const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

app.post("/register", (req, res) => {
  const newUser = req.body;

  // Log the incoming request body
  console.log("Received new user data:", newUser);

  // Correct the path to data.json
  const dataPath = path.join(__dirname, "../public/data.json");
  fs.readFile(dataPath, "utf8", (err, data) => {
    if (err) {
      console.error("Failed to read data file:", err);
      return res.status(500).json({ error: "Failed to read data file" });
    }

    let users;
    try {
      users = JSON.parse(data);
    } catch (parseErr) {
      console.error("Failed to parse data file:", parseErr);
      return res.status(500).json({ error: "Failed to parse data file" });
    }

    users.push(newUser);

    // Write the updated data back to the file
    fs.writeFile(dataPath, JSON.stringify(users, null, 2), (err) => {
      if (err) {
        console.error("Failed to write data file:", err);
        return res.status(500).json({ error: "Failed to write data file" });
      }

      res.status(201).json({ message: "User registered successfully" });
    });
  });
});

app.post("/login", (req, res) => {
  const { id, password } = req.body;

  // Correct the path to data.json
  const dataPath = path.join(__dirname, "../public/data.json");
  fs.readFile(dataPath, "utf8", (err, data) => {
    if (err) {
      console.error("Failed to read data file:", err);
      return res.status(500).json({ error: "Failed to read data file" });
    }

    let users;
    try {
      users = JSON.parse(data);
    } catch (parseErr) {
      console.error("Failed to parse data file:", parseErr);
      return res.status(500).json({ error: "Failed to parse data file" });
    }

    const user = users.find((user) => user.id === id);

    if (!user) {
      return res.status(401).json({ error: "user id is incorrect" });
    }

    if (user.password !== password) {
      return res.status(401).json({ error: "password is incorrect" });
    }

    // Generate a session token (for simplicity, using a timestamp)
    const sessionToken = Date.now().toString();
    res.status(200).json({ message: "Login successful", sessionToken });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
