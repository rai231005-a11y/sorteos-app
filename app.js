let modo = "apartado";
let data = [];

function crearSorteo(tipo){
  document.getElementById("home").classList.remove("active");
  document.getElementById("panel").classList.add("active");

  generarGrid(100);
}

function setModo(m){
  modo = m;
}

function generarGrid(n){
  data = Array(n).fill(null);
  const grid = document.getElementById("grid");
  grid.innerHTML="";

  for(let i=0;i<n;i++){
    let div = document.createElement("div");
    div.className="cell";
    div.innerText=i.toString().padStart(2,"0");

    div.onclick=()=>clickNumero(i);

    grid.appendChild(div);
  }
}

function clickNumero(i){
  let nombre = document.getElementById("nombre").value;

  if(!nombre) return alert("Escribe nombre");

  if(data[i]){
    data[i].nombre += " / " + nombre;
  }else{
    data[i]={nombre:nombre,estado:modo};
  }

  if(modo==="pagado"){
    generarBoleto(i);
  }

  render();
}

function render(){
  const cells = document.querySelectorAll(".cell");
  const lista = document.getElementById("lista");
  lista.innerHTML="";

  data.forEach((d,i)=>{
    let c = cells[i];
    c.className="cell";

    if(d){
      c.innerHTML=`${i}<br>${d.nombre}`;

      if(d.estado==="apartado") c.classList.add("apartado");
      if(d.estado==="pagado") c.classList.add("pagado");

      lista.innerHTML+=`<div>${i} - ${d.nombre}</div>`;
    }
  });
}

function generarBoleto(i){
  alert("Boleto generado: "+i);
}

function exportar(){
  html2canvas(document.body).then(canvas=>{
    let a=document.createElement("a");
    a.href=canvas.toDataURL();
    a.download="sorteo.png";
    a.click();
  });
}
