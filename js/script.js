var list_respuesta = ['A', 'B', 'C', 'D'];
var respuestas_facil = ['', 'B', 'D', 'A', 'B', 'C', 'B', 'D', 'B', 'C', 'D'];                       
var respuestas_dificil = ['', 'C', 'A', 'B', 'A', 'B', 'A', 'C', 'B', 'C', 'B'];                    
var score = 0;

const easyDiffBtn = document.getElementById("easy-diff");
const hardDiffBtn = document.getElementById("hard-diff");

function siguiente(actual, siguiente) {
    document.getElementById(actual).style.display = "none";
    document.getElementById(siguiente).style.display = "block";
}

// Difficulty selection
easyDiffBtn.addEventListener("click", () => {
    siguiente('Pregunta0', 'from1');
});
hardDiffBtn.addEventListener("click", () => {
    siguiente('Pregunta0', 'from2');
});

// Answer selection
function Respuesta(pregunta, dificultad, opcionSeleccionada) {
    var respuestaCorrecta = (dificultad === "1") ? respuestas_facil[pregunta] : respuestas_dificil[pregunta];

    if (respuestaCorrecta === opcionSeleccionada) {
        score += 10;
        document.getElementById(`Boton${pregunta}${dificultad}${opcionSeleccionada}`).style.backgroundColor = "rgba(108,166,10,0.7)";
        document.getElementById(`Boton${pregunta}${dificultad}${opcionSeleccionada}`).style.color = "#fff";
    } else {
        document.getElementById(`Boton${pregunta}${dificultad}${opcionSeleccionada}`).style.backgroundColor = "rgba(166,21,10,0.7)";
        document.getElementById(`Boton${pregunta}${dificultad}${opcionSeleccionada}`).style.color = "#fff";

        // Highlight correct answer
        document.getElementById(`Boton${pregunta}${dificultad}${respuestaCorrecta}`).style.backgroundColor = "rgba(108,166,10,0.7)";
        document.getElementById(`Boton${pregunta}${dificultad}${respuestaCorrecta}`).style.color = "#fff";
    }

    // Disable all answer buttons for this question
    list_respuesta.forEach(option => {
        quitar_evento(`Boton${pregunta}${dificultad}${option}`);
    });

    // Display next button
    document.getElementById(`next${pregunta}${dificultad}`).style.display = "block"; 
    document.getElementById(`Puntaje${pregunta}${dificultad}`).innerHTML = score;

    if (pregunta === "10") {
        document.getElementById("puntajeFinal").innerHTML = score;
    } else {
        document.getElementById(`Puntaje${(parseInt(pregunta, 10) + 1)}${dificultad}`).innerHTML = score;
    }
}

// Disable button click event
function quitar_evento(id) {
    let button = document.getElementById(id);
    if (button) {
        button.onclick = null;
        button.style.cursor = "not-allowed";
    }
}

// Reload quiz
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


// Attach event listeners after DOM loads
document.getElementById("send-btn").addEventListener("click", Enviar);
document.getElementById("play-again-btn").addEventListener("click", volver);
document.getElementById("high-scores-btn").addEventListener("click", () => {
    location.href = "highscores.html";
});

