const express = require("express");
const fs = require("fs");
const XLSX = require("xlsx");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

const DATA_FILE = "./data/cotizaciones.json";

// obtener cotizaciones
app.get("/api/cotizaciones", (req, res) => {
    const data = fs.readFileSync(DATA_FILE);
    res.json(JSON.parse(data));
});

// guardar cotización
app.post("/api/cotizaciones", (req, res) => {
    const data = JSON.parse(fs.readFileSync(DATA_FILE));

    data.push(req.body);

    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

    res.json({ status: "ok" });
});

// exportar excel
app.get("/api/exportar", (req, res) => {

    const data = JSON.parse(fs.readFileSync(DATA_FILE));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Cotizaciones");

    XLSX.writeFile(workbook, "cotizaciones.xlsx");

    res.download("cotizaciones.xlsx");
});

app.listen(PORT, () => {
    console.log(Servidor corriendo en http://localhost:${PORT});
});
