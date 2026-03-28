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

let pagados=0

document.querySelectorAll(".cell").forEach((c,i)=>{

c.className="cell libre"
c.innerHTML=i

if(data[i]){

c.classList.add(data[i].estado)

if(data[i].estado==="pagado") pagados++

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

// GANANCIAS
calcular(pagados)
}

// 💰 GANANCIAS
function calcular(pagados){

let costo = Number(document.getElementById("costo").value||0)
let p1 = Number(document.getElementById("p1").value||0)
let p2 = Number(document.getElementById("p2").value||0)

let total = pagados * costo
let premios = p1 + p2
let ganancia = total - premios

document.getElementById("ganadorBox").innerHTML += `
<hr>
<p>💰 Total: $${total}</p>
<p>🏆 Premios: $${premios}</p>
<p>📈 Ganancia: $${ganancia}</p>
`
}

// NUEVO
function nuevo(){
localStorage.removeItem("sorteo")
location.reload()
}

// 🏆 GANADOR PREMIUM
function ganador(){

let pagados = Object.keys(data).filter(i=>data[i].estado==="pagado")

if(pagados.length===0){
alert("No hay números pagados")
return
}

// MULTI GANADORES
let seleccion = pagados.sort(()=>0.5-Math.random()).slice(0,3)

let html=`<div style="text-align:center">`

seleccion.forEach((n,i)=>{

let medalla = ["🥇","🥈","🥉"][i]

html+=`
<div style="
margin:10px;
padding:10px;
border:2px solid gold;
border-radius:10px;
">
<h2>${medalla}</h2>
<h1 style="color:gold">${n}</h1>
<p>${data[n].nombre}</p>
</div>
`
})

html+=`</div>`

document.getElementById("ganadorBox").innerHTML=html
}

// 🎟️ BOLETO PRO
function generarBoleto(num){

let info=data[num]

let html=`
<div style="
background:black;
color:white;
padding:30px;
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

// 📤 EXPORT FINAL
function exportar(){

let html=`
<div style="
background:black;
color:white;
padding:40px;
width:900px;
border:2px solid gold;
border-radius:20px;
">

<div style="text-align:center">
<img src="${LOGO}" style="width:80px">
<h1 style="color:gold;">SORTEOS ⚡</h1>
</div>

<p style="text-align:center">${document.getElementById("desc").value||""}</p>

<div style="text-align:center">
🏆 ${document.getElementById("p1").value||""}<br>
🏆 ${document.getElementById("p2").value||""}
</div>

<div style="display:grid;grid-template-columns:repeat(10,1fr);gap:5px;margin-top:10px">
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
a.download="sorteo.png"
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

if(data[i].estado==="pagado"){
style="background:#16a34a;color:white"
}else{
style="background:#facc15;color:black"
}

txt=i+"<br>"+data[i].nombre
}

html+=`<div style="padding:10px;border-radius:8px;text-align:center;${style}">${txt}</div>`
}

return html
}

init()
