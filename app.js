let data = JSON.parse(localStorage.getItem("sorteo")) || {}

function init(){
let grid = document.getElementById("grid")

for(let i=0;i<100;i++){
let d=document.createElement("div")
d.className="cell libre"
d.innerText=i

// CLICK = escribir nombre → APARTADO
d.onclick=()=>{
let nombre=prompt("Nombre(s) (usa / para vaquita)")
if(nombre){
data[i]={nombre,estado:"apartado"}
guardar()
render()
}
}

grid.appendChild(d)
}

render()
}

// RENDER
function render(){

document.querySelectorAll(".cell").forEach((c,i)=>{

c.className="cell libre"
c.innerText=i

if(data[i]){
c.classList.add(data[i].estado)

let emoji = data[i].nombre.includes("/") ? "🐮 " : ""

c.innerHTML=i+"<br>"+emoji+data[i].nombre

// DOBLE CLICK = PAGAR
c.ondblclick=()=>{
data[i].estado="pagado"
guardar()
render()
generarBoleto(i)
}
}
})

// LISTA
let lista=document.getElementById("lista")
lista.innerHTML=""

Object.keys(data).forEach(i=>{
lista.innerHTML+=`<div>${i} - ${data[i].nombre}</div>`
})

}

// GUARDAR
function guardar(){
localStorage.setItem("sorteo",JSON.stringify(data))
}

// RESET
function nuevo(){
localStorage.removeItem("sorteo")
location.reload()
}

// GANADOR (solo pagados)
function ganador(){
let pagados = Object.keys(data).filter(i=>data[i].estado==="pagado")

if(pagados.length===0){
alert("No hay números pagados")
return
}

let g = pagados[Math.floor(Math.random()*pagados.length)]

document.getElementById("ganadorBox").innerHTML=
`<h2>${data[g].nombre}</h2><p>Número ${g}</p>`

}

// 🎟️ BOLETO AUTOMÁTICO
function generarBoleto(num){

let info=data[num]

let html=`
<div style="background:black;color:white;padding:30px;text-align:center;font-family:Arial">
<h1 style="color:gold;">SORTEOS ⚡</h1>
<h2>${document.getElementById("titulo").value||""}</h2>

<p>Número: ${num}</p>
<p>${info.nombre}</p>

<p style="color:#22c55e;">PAGADO ✅</p>
<p>${new Date().toLocaleString()}</p>
</div>
`

let div=document.createElement("div")
div.innerHTML=html
document.body.appendChild(div)

html2canvas(div).then(canvas=>{
let a=document.createElement("a")
a.href=canvas.toDataURL()
a.download="boleto.png"
a.click()
div.remove()
})
}

// EXPORT PREMIUM
function exportar(){

let html=`
<div style="background:black;color:white;padding:30px;width:900px;font-family:Arial">

<h1 style="text-align:center;color:gold;">SORTEOS ⚡</h1>

<p style="text-align:center">${document.getElementById("desc").value||""}</p>

<div style="text-align:center">
🏆 ${document.getElementById("p1").value||""}<br>
🏆 ${document.getElementById("p2").value||""}<br>
💲 $${document.getElementById("costo").value||""}
</div>

<div style="display:grid;grid-template-columns:repeat(10,1fr);gap:5px;margin-top:10px">
${tablaExport()}
</div>

</div>
`

let div=document.createElement("div")
div.innerHTML=html
document.body.appendChild(div)

html2canvas(div).then(canvas=>{
let a=document.createElement("a")
a.href=canvas.toDataURL()
a.download="sorteo.png"
a.click()
div.remove()
})
}

function tablaExport(){

let html=""

for(let i=0;i<100;i++){

let style="background:white;color:black"
let txt=i

if(data[i]){

if(data[i].estado=="pagado"){
style="background:#22c55e;color:white"
}else{
style="background:#facc15;color:black"
}

let emoji = data[i].nombre.includes("/") ? "🐮 " : ""

txt=i+"<br>"+emoji+data[i].nombre
}

html+=`<div style="padding:10px;border-radius:8px;text-align:center;${style}">${txt}</div>`
}

return html
}

init()
