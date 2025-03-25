var list_repuesta=['A','B','C','D'];
var repuestas_facil=['','B','D','A','B','C','B','D','B','C','D'];                      
var repuestas_dificil=[  '','C','A','B','A','B','A','C','B','C','B'];                     
var score=0;
function siguiente(o,m){
    document.getElementById(o).style.display="none";
    document.getElementById(m).style.display="";
} 
function Repuesta(p,r,o){
        if(r=="1"){
        var repuesta=repuestas_facil[p]; 
        }else{
        var repuesta=repuestas_dificil[p];   
        }
        if (repuesta==o){
        score=parseInt(score)+10;
        $("#Boton"+p+r+o).css({"background":"rgba(108,166,10,0.7)","color":"#fff"});
        }else{
        $("#Boton"+p+r+o).css({"background":"rgba(166,21,10,0.7)","color":"#fff"});
        $("#Boton"+p+r+repuesta).css({"background":"rgba(108,166,10,0.7)","color":"#fff"});  
        } 
        for(i=0;i<=3;i++){
        quitar_evento('#Boton'+p+r+list_repuesta[i]);
        }
        document.getElementById("next"+p+r).style.display=""; 
        document.getElementById("Puntaje"+p+r).innerHTML=score;
        p++; 
        if (p=="11"){
        document.getElementById("puntajeFinal").innerHTML=score;
        }else{
         document.getElementById("Puntaje"+p+r).innerHTML=score;   
        }
} 
