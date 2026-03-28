const LOGO = "https://i.imgur.com/8Km9tLL.png"

let data = JSON.parse(localStorage.getItem("sorteo")) || {}

function init(){
let grid=document.getElementById("grid")

for(let i=0;i<100;i++){

let d=document.createElement("div")
d.className="cell libre"
d.innerText=i

d.onclick=()=>editar(i)

grid.appendChild(d)
}

render()
}

// EDITAR
function editar(i){

let nombre=prompt("Nombre(s)")
if(nombre===null) return

if(nombre===""){
delete data[i]
guardar()
render()
return
}

data[i]={nombre,estado:"apartado"}
guardar()
render()
}

// PAGAR
function pagar(i){

if(!data[i]) return

if(!confirm("Confirmar pago")) return

data[i].estado="pagado"

guardar()
render()

generarBoleto(i)
}

// RENDER
function render(){

document.querySelectorAll(".cell").forEach((c,i)=>{

c.className="cell libre"
c.innerHTML=i

if(data[i]){

c.classList.add(data[i].estado)

let emoji = data[i].nombre.includes("/") ? "🐮 " : ""

c.innerHTML=`
${i}<br>
<small>${emoji}${data[i].nombre}</small><br>
<button onclick="event.stopPropagation(); pagar(${i})">💲</button>
`
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

// NUEVO
function nuevo(){
localStorage.removeItem("sorteo")
location.reload()
}

// GANADOR
function ganador(){

let pagados = Object.keys(data).filter(i=>data[i].estado==="pagado")

if(pagados.length===0){
alert("No hay números pagados")
return
}

let g = pagados[Math.floor(Math.random()*pagados.length)]

document.getElementById("ganadorBox").innerHTML=
`<h2 style="color:gold">${data[g].nombre}</h2><p>Número ${g}</p>`
}

// 🎟️ BOLETO PRO
function generarBoleto(num){

let info=data[num]

let html=`
<div style="
background:linear-gradient(#000,#111);
color:white;
padding:30px;
font-family:Arial;
text-align:center;
border:2px solid gold;
border-radius:20px;
width:350px;
">

<img src="${LOGO}" style="width:80px">

<h1 style="color:gold;">SORTEOS ⚡</h1>

<h2>${document.getElementById("titulo").value||""}</h2>

<hr>

<h2>Número ${num}</h2>
<h3>${info.nombre}</h3>

<p style="color:#22c55e;">PAGADO ✅</p>

<p>${new Date().toLocaleString()}</p>

</div>
`

let div=document.createElement("div")
div.innerHTML=html
document.body.appendChild(div)

html2canvas(div,{scale:2}).then(canvas=>{
let a=document.createElement("a")
a.href=canvas.toDataURL()
a.download="boleto.png"
a.click()
div.remove()
})
}

// 📤 EXPORT PREMIUM REAL (YA COMO TU IMAGEN)
function exportar(){

let html=`
<div style="
background:black;
color:white;
padding:40px;
width:900px;
font-family:Arial;
border:2px solid gold;
border-radius:20px;
">

<div style="text-align:center">
<img src="${LOGO}" style="width:80px">
<h1 style="color:gold;">SORTEOS ⚡</h1>
</div>

<p style="text-align:center">${document.getElementById("desc").value||""}</p>

<div style="text-align:center;margin-bottom:15px;">
🏆 ${document.getElementById("p1").value||""}<br>
🏆 ${document.getElementById("p2").value||""}<br>
💲 $${document.getElementById("costo").value||""}
</div>

<div style="display:grid;grid-template-columns:repeat(10,1fr);gap:5px;">
${tablaExport()}
</div>

</div>
`

let div=document.createElement("div")
div.style.position="fixed"
div.style.left="-9999px"
div.innerHTML=html
document.body.appendChild(div)

setTimeout(()=>{
html2canvas(div,{scale:2}).then(canvas=>{
let a=document.createElement("a")
a.href=canvas.toDataURL()
a.download="sorteo_pro.png"
a.click()
div.remove()
})
},300)
}

function tablaExport(){

let html=""

for(let i=0;i<100;i++){

let style="background:white;color:black"
let txt=i

if(data[i]){

if(data[i].estado=="pagado"){
style="background:#16a34a;color:white"
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
