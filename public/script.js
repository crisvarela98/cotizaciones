async function cargar() {

const res = await fetch("/api/cotizaciones");
const data = await res.json();

const tbody = document.querySelector("#tabla tbody");
tbody.innerHTML = "";

let precios = {};

data.forEach(item => {

if(!precios[item.producto]){
precios[item.producto] = [];
}

precios[item.producto].push(item.precio);

});

data.forEach(item => {

let min = Math.min(...precios[item.producto]);

let diff = ((item.precio - min) / min * 100).toFixed(2);

let alerta = diff > 20 ? "⚠️ Alto" : "";

const tr = document.createElement("tr");

if(diff > 20){
tr.classList.add("alerta");
}

tr.innerHTML = `
<td>${item.producto}</td>
<td>${item.proveedor}</td>
<td>$${item.precio}</td>
<td>${diff}%</td>
<td>${alerta}</td>
`;

tbody.appendChild(tr);

});

}

async function agregar(){

const producto = document.getElementById("producto").value;
const proveedor = document.getElementById("proveedor").value;
const precio = Number(document.getElementById("precio").value);

await fetch("/api/cotizaciones",{

method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
producto,
proveedor,
precio
})

});

cargar();

}

function exportarExcel(){

window.location="/api/exportar";

}

cargar();