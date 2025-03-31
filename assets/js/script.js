var list_respuesta = ['A', 'B', 'C', 'D'];
var respuestas_facil = ['', 'B', 'D', 'A', 'B', 'C', 'B', 'D', 'B', 'C', 'D'];                       
var respuestas_dificil = ['', 'C', 'A', 'B', 'A', 'B', 'A', 'C', 'B', 'C', 'B'];                    
var score = 0;
const easyDiffBtn = document.getElementById("easy-diff");
const hardDiffBtn = document.getElementById("hard-diff");
const answerbtn = $(".answer-btn");
// Difficulty selection
easyDiffBtn.addEventListener("click", () => {
    next('Pregunta0', 'from1');
});
hardDiffBtn.addEventListener("click", () => {
    next('Pregunta0', 'from2');
});
$("#from1").on("click", ".answer-btn", function() {
                let eventos = $(this);  
                var question=eventos[0]['attributes']['data-question']['value'];
                var from=eventos[0]['attributes']['data-easy-diff']['value'];
                var answer=eventos[0]['attributes']['data-answer']['value'];   
                Respuesta(question, from, answer,eventos); 
});
 $("#from1").on("click", ".next-btn", function() {
                let eventos = $(this);  
              var a=eventos[0]['attributes']['data-current']['value'];
              var s=eventos[0]['attributes']['data-next']['value'];
             next(a, s);
             
});
  $("#from2").on("click", ".answer-btn", function() {
                let eventos = $(this);  
                var question=eventos[0]['attributes']['data-question']['value'];
                var from=eventos[0]['attributes']['data-easy-diff']['value'];
                var answer=eventos[0]['attributes']['data-answer']['value'];   
                Respuesta(question, from, answer,eventos); 
});
 $("#from2").on("click", ".next-btn", function() {
                let eventos = $(this);   
              var a=eventos[0]['attributes']['data-current']['value'];
              var s=eventos[0]['attributes']['data-next']['value'];
             next(a, s);
});
function next(a, s) {
  
    document.getElementById(a).style.display = "none";
    document.getElementById(s).style.display = "block";
}
function Respuesta(pregunta, dificultad, opcionSeleccionada,eventos) {
 const element = document.querySelector('.score_val');
    var respuestaCorrecta = (dificultad === "1") ? respuestas_facil[pregunta] : respuestas_dificil[pregunta];
    if (respuestaCorrecta === opcionSeleccionada) {
          score += 10; 
          eventos.css({"background":"rgba(108,166,10,0.7)"});    
    } else {
          eventos.css({"background":"rgba(166,21,10,0.7)"}); 
          document.getElementById(pregunta+""+dificultad+""+respuestaCorrecta).style.backgroundColor = "rgba(108,166,10,0.7)";
    } 
        quitar_evento(pregunta,dificultad);
        $("#Pregunta"+dificultad+""+pregunta+" .next-btn").css( {"visibility":"visible"});   
        document.getElementById("Puntaje"+dificultad+""+pregunta).innerHTML = score;
        if (pregunta === "10") {
             document.getElementById("puntajeFinal").innerHTML= score; 
        }else{
            pregunta++;
            document.getElementById("Puntaje"+dificultad+""+pregunta).innerHTML = score; 
        }
}
function quitar_evento(pregunta,dificultad){ 
  $("#Pregunta"+dificultad+""+pregunta+" .answer-btn").attr( "disabled", true);   
  $("#Pregunta"+dificultad+""+pregunta+" .answer-btn").css( {"cursor":"no-drop"});     
}

function volver() {
    location.reload();
}



// Score submission
function Enviar() { 
    let nombre = document.getElementById("nombre").value.trim();
    let puntaje = document.getElementById("puntajeFinal").textContent;

    if (!nombre) {
        Swal.fire({
            icon: "warning",
            title: "Oops...",
            text: "Please enter a name!"
        });
        return;
    }

    // Get existing scores from localStorage
    let scores = JSON.parse(localStorage.getItem("highscores")) || [];

    // Add new score
    scores.push({ nombre, puntaje });

    // Save updated scores back to localStorage
    localStorage.setItem("highscores", JSON.stringify(scores));

    Swal.fire({
        icon: "success",
        title: "Score Submitted!",
        text: `${nombre}, your score has been submitted successfully!`,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK"
    });

    // Clear input field
    document.getElementById("nombre").value = "";
}

// Load high scores
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

// Clear scores
function clearScores() {
    localStorage.removeItem("highscores");
    loadScores();
}

// Load scores on page load
window.onload = loadScores;
