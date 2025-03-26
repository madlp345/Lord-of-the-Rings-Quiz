
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
function quitar_evento(b){
    $(b).removeAttr("onclick");
    $(b).css({"cursor":"no-drop"});  
 }
 function volver(){
     location.reload();
 }
 function Enviar() { 
    let nombre = document.getElementById("nombre").value;
    let puntaje = document.getElementById("puntajeFinal").textContent;

    if (nombre.trim() === "") {
        alert("Please enter a name!");
        return;
    }

    // Get existing scores from localStorage or initialize an empty array
    let scores = JSON.parse(localStorage.getItem("highscores")) || [];

    // Add new score
    scores.push({ nombre, puntaje });

    // Save updated scores back to localStorage
    localStorage.setItem("highscores", JSON.stringify(scores));

    // Show confirmation
    alert(nombre + ", your score has been submitted successfully!");

    // Clear input field
    document.getElementById("nombre").value = "";
}
//High scores code
function loadScores() {
    let scores = JSON.parse(localStorage.getItem("highscores")) || [];
    let tbody = document.querySelector("#tablaPuntajes tbody");
    tbody.innerHTML = "";

    scores.forEach((score, index) => {
        let row = tbody.insertRow();
        row.insertCell(0).textContent = index + 1;
        row.insertCell(1).textContent = score.nombre;
        row.insertCell(2).textContent = score.puntaje;
    });
}

function clearScores() {
    localStorage.removeItem("highscores");
    loadScores();
}

// Load scores when the page loads
window.onload = loadScores;