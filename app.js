body{
margin:0;
font-family:Arial;
background:#050505;
color:white;
}

.header{
display:flex;
justify-content:space-between;
padding:15px;
border-bottom:1px solid gold;
}

.logo-area{
display:flex;
align-items:center;
gap:10px;
color:gold;
}

.logo-area img{width:40px;}

.menu button{
background:gold;
border:none;
padding:8px;
margin:3px;
border-radius:8px;
cursor:pointer;
}

.top{text-align:center;padding:10px;}

.config input, .config textarea{
margin:5px;
padding:8px;
border-radius:8px;
border:none;
}

main{display:flex;}

.grid{
display:grid;
grid-template-columns:repeat(10,1fr);
gap:6px;
padding:10px;
flex:3;
}

.cell{
padding:10px;
text-align:center;
border-radius:10px;
cursor:pointer;
background:#111;
}

.libre{background:white;color:black;}
.apartado{background:#facc15;color:black;}
.pagado{background:#22c55e;}
.ganador{border:2px solid gold;}

.cell button{
margin-top:5px;
padding:3px 6px;
border:none;
border-radius:6px;
background:black;
color:white;
}

.side{flex:1;padding:10px;}

#lista div{margin:5px 0;}

#ganadorBox{
margin-top:10px;
padding:10px;
border:1px solid gold;
text-align:center;
}

#stats{
margin-top:10px;
}
