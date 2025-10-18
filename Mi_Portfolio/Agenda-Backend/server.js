const express = require("express");
const cors = require("cors");
const fs = require("fs").promises;

const app = express();
app.use(cors());
app.use(express.json());


const CONTACTOS_FILE = "contactos.json";

async function readContacts() {
  try {
    const data = await fs.readFile(CONTACTOS_FILE, "utf8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}


async function writeContacts(contactos) {
  await fs.writeFile(CONTACTOS_FILE, JSON.stringify(contactos, null, 2));
}


app.get("/contactos", async (req, res) => {
  const contactos = await readContacts();
  res.json(contactos);
});


app.post("/contactos", async (req, res) => {
  const { nombre, telefono, email } = req.body;

  if (!nombre || !telefono || !email) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  const contactos = await readContacts();
  const nuevo = {
    id: Date.now().toString(),
    nombre,
    telefono,
    email
  };

  contactos.push(nuevo);
  await writeContacts(contactos);
  res.status(201).json(nuevo);
});


app.put("/contactos/:id", async (req, res) => {
  const contactos = await readContacts();
  const index = contactos.findIndex(c => c.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: "No existe contacto" });
  }

  const { nombre, telefono, email } = req.body;
  contactos[index] = { ...contactos[index], nombre, telefono, email };
  await writeContacts(contactos);
  res.json(contactos[index]);
});

app.delete("/contactos/:id", async (req, res) => {
  let contactos = await readContacts();
  const nuevoArray = contactos.filter(c => c.id !== req.params.id);

  if (contactos.length === nuevoArray.length) {
    return res.status(404).json({ error: "No existe contacto" });
  }

  await writeContacts(nuevoArray);
  res.json({ mensaje: "Contacto eliminado" });
});


app.listen(3000, () => {
  console.log("Servidor escuchando en http://localhost:3000");
});

