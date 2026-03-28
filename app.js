let modo="apartado";
let data=[];

function crearSorteo(){
  document.getElementById("home").classList.remove("active");
  document.getElementById("panel").classList.add("active");
  generarGrid(100);
}

function setModo(m){
  modo=m;
}

function generarGrid(n){
  data=Array(n).fill(null);
  const grid=document.getElementById("grid");
  grid.innerHTML="";

  for(let i=0;i<n;i++){
    let div=document.createElement("div");
    div.className="cell";
    div.innerText=i.toString().padStart(2,"0");
    div.onclick=()=>clickNumero(i);
    grid.appendChild(div);
  }
}

function clickNumero(i){
  let nombre=document.getElementById("nombre").value.trim();
  if(!nombre) return alert("Escribe nombre");

  // VAQUITA
  if(data[i] && data[i].estado!=="pagado"){
    data[i].nombre+=" / "+nombre;
  }else{
    data[i]={nombre:nombre,estado:"apartado"};
  }

  // CAMBIO DE ESTADO
  if(modo==="pagado"){
    data[i].estado="pagado";
    generarBoleto(i);
  }

  render();
}

function render(){
  const cells=document.querySelectorAll(".cell");
  const lista=document.getElementById("lista");
  lista.innerHTML="";

  data.forEach((d,i)=>{
    let c=cells[i];
    c.className="cell";

    if(d){
      let emoji=d.nombre.includes("/")?"🐮":"";
      c.innerHTML=`<b>${i}</b><br>${emoji}${d.nombre}`;

      if(d.estado==="apartado") c.classList.add("apartado");
      if(d.estado==="pagado") c.classList.add("pagado");

      lista.innerHTML+=`<div>${i} - ${d.nombre}</div>`;
    }
  });
}

function generarBoleto(i){
  let d=data[i];

  let div=document.createElement("div");
  div.style.padding="20px";
  div.style.background="#000";
  div.style.color="white";
  div.style.textAlign="center";

  div.innerHTML=`
    <h1 style="color:gold">SORTEOS ⚡</h1>
    <h2>Número: ${i}</h2>
    <h3>${d.nombre}</h3>
    <p style="color:#22c55e;font-size:20px">✔ PAGADO</p>
    <p>${new Date().toLocaleString()}</p>
  `;

  document.body.appendChild(div);

  html2canvas(div).then(canvas=>{
    let a=document.createElement("a");
    a.href=canvas.toDataURL();
    a.download="boleto.png";
    a.click();
    div.remove();
  });
}

function exportar(){
  html2canvas(document.body).then(canvas=>{
    let a=document.createElement("a");
    a.href=canvas.toDataURL();
    a.download="sorteo.png";
    a.click();
  });
}
