body{
  margin:0;
  font-family:'Segoe UI',sans-serif;
  background: radial-gradient(circle at top,#0a0a0a,#000);
  color:white;
}

/* HEADER */
header{
  text-align:center;
  padding:15px;
}

.logo{
  width:70px;
}

h1{
  color:#ffd700;
  letter-spacing:2px;
  text-shadow:0 0 20px rgba(255,215,0,.6);
}

/* INPUT */
input{
  width:100%;
  padding:14px;
  background:#111;
  border:1px solid #222;
  border-radius:12px;
  color:white;
  margin-bottom:12px;
}

/* BOTONES */
.acciones{
  display:flex;
  gap:10px;
  margin-bottom:12px;
}

.acciones button{
  flex:1;
  padding:14px;
  border:none;
  border-radius:12px;
  font-weight:bold;
  background:linear-gradient(145deg,#ffd700,#b8860b);
  color:black;
  box-shadow:0 0 12px rgba(255,215,0,.5);
}

/* GRID */
.grid{
  display:grid;
  grid-template-columns:repeat(10,1fr);
  gap:8px;
}

.cell{
  background:#111;
  padding:12px;
  border-radius:14px;
  text-align:center;
  font-size:13px;
  transition:.2s;
  box-shadow: inset 0 0 5px #000;
}

.cell:hover{
  transform:scale(1.06);
}

/* ESTADOS */
.apartado{
  background:linear-gradient(#facc15,#ca8a04);
  color:black;
}

.pagado{
  background:linear-gradient(#22c55e,#14532d);
  box-shadow:0 0 12px #22c55e;
}

/* PANEL */
.side{
  margin-top:15px;
  padding:12px;
  border-radius:14px;
  border:1px solid gold;
  background:#111;
}

.side h3{
  color:gold;
}

/* LISTA */
#lista div{
  padding:5px;
  border-bottom:1px solid #222;
}

/* BOLETO */
.ticket{
  background:#000;
  border:2px solid gold;
  border-radius:20px;
  padding:20px;
  text-align:center;
  color:white;
}
