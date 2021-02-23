/* eslint-disable prefer-destructuring */
let elementosDOM = {
    categoria: null,
    pregunta: null,
    form: null,
    respuesta: null,
    negative: null,
    puntaje: null,
    respuestaCorrecta: null,
    positive: null,
};

let preguntaActual = null;
let puntaje = 0;

function mostrarPregunta(data) {
    preguntaActual = data[0];
    console.log(preguntaActual);
    elementosDOM.pregunta.innerText = preguntaActual.question;
    elementosDOM.categoria.innerText = preguntaActual.category.title;
}

function traerPregunta() {
    fetch('http://jservice.io/api/random')
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
        })
        .then(mostrarPregunta);
    // Es igual que
    // .then(function(data){
    //     mostrarPregunta(data)
    // });
}

function compareAnswer() {
    let answer = elementosDOM.respuesta.value;
    if (answer.toLowerCase() === preguntaActual.answer.toLowerCase()) {
        elementosDOM.positive.classList.remove('escondida');
        elementosDOM.negative.classList.add('escondida');
        puntaje += preguntaActual.value;
    } else {
        elementosDOM.respuestaCorrecta.innerText += preguntaActual.answer;
        elementosDOM.negative.classList.remove('escondida');
        elementosDOM.positive.classList.add('escondida');
    }

    elementosDOM.puntaje.innerText = `Puntaje: ${puntaje} Puntos`;

    setTimeout(function () {
        elementosDOM.respuesta.value = null;
        elementosDOM.positive.classList.add('escondida');
        elementosDOM.negative.classList.add('escondida');
    }, 6500);
    setTimeout(traerPregunta, 7000);
}

window.addEventListener('DOMContentLoaded', function () {
    console.log('el DOM esta listo');

    for (const llave of Object.keys(elementosDOM)) {
        elementosDOM[llave] = document.getElementById(llave);
    }

    elementosDOM.form.addEventListener('submit', function (e) {
        e.preventDefault();
        compareAnswer();
    });
});

traerPregunta();
