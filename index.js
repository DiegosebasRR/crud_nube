const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db");

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

// Create
app.post("/api/users", async (req, res) => {
  const { name, email } = req.body;
  const values = [name, email];
  try {
    await db.query("INSERT INTO users (name, email) VALUES ($1, $2)", values);
    res
      .status(201)
      .send(
        `Usuario agregado con nombre: ${name} y correo electrónico${email}`
      );
    console.log(name, email);
    console.log(req.body);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Read
app.get("/api/users", async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM users");
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error);
  }
});

//update
app.put("/api/users/update/:id", (req, res) => {
  const id = req.params.id;
  const { name, email } = req.body;

  db.query(
    "UPDATE users SET name = $1, email = $2 WHERE id = $3",
    [name, email, id],
    (error, results) => {
      if (error) {
        console.error("Error al actualizar el usuario", error);
        res.status(500).send("Error al actualizar el usuario");
      } else {
        console.log("Usuario actualizado correctamente");
        res.status(200).send("Usuario actualizado correctamente");
      }
    }
  );
});

// Delete
app.delete("/api/users/delete/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM users WHERE id = $1", [id], (error, results) => {
    console.log(id);
    if (error) {
      console.error("Error al eliminar el usuario", error);
      res.status(500).send("Error al eliminar el usuario");
    } else {
      console.log("Usuario eliminado correctamente");
      res.status(200).send("Usuario eliminado correctamente");
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
