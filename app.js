let data = JSON.parse(localStorage.getItem("sorteo")) || {}

function init(){
let grid = document.getElementById("grid")

for(let i=0;i<100;i++){
let d=document.createElement("div")
d.className="cell libre"
d.innerText=i

d.onclick=()=>{

let nombre=prompt("Nombre")

if(nombre){

let tipo=prompt("1 apartado / 2 pagado")

data[i]={nombre,estado: tipo==2?"pagado":"apartado"}

guardar()
render()

}

}

grid.appendChild(d)
}

render()
}

function render(){

document.querySelectorAll(".cell").forEach((c,i)=>{

c.className="cell libre"
c.innerText=i

if(data[i]){

c.classList.add(data[i].estado)

c.innerHTML=i+"<br>"+data[i].nombre

}

})

let lista=document.getElementById("lista")
lista.innerHTML=""

Object.keys(data).forEach(i=>{
lista.innerHTML+=`<div>${i} - ${data[i].nombre}</div>`
})

}

function guardar(){
localStorage.setItem("sorteo",JSON.stringify(data))
}

function nuevo(){
localStorage.removeItem("sorteo")
location.reload()
}

function ganador(){

let keys=Object.keys(data)

let g=keys[Math.floor(Math.random()*keys.length)]

document.getElementById("ganadorBox").innerHTML=
`<h2>${data[g].nombre}</h2><p>Número ${g}</p>`

}

function exportar(){

html2canvas(document.body).then(canvas=>{
let a=document.createElement("a")
a.href=canvas.toDataURL()
a.download="sorteo.png"
a.click()
})

}

init()
