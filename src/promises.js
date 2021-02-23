console.log(1);

window.addEventListener('DOMContentLoaded', function () {
    console.log(2);
});

function factorial(x) {
    // if number is 0
    if (x === 0) {
        return 1;
    }

    // if number is positive

    return x * factorial(x - 1);
}

function factorialConPromesas(x) {
    // ❎
    return new Promise(function (resolver, rechazar) {
        if (x < 0) {
            rechazar(new Error('Como va a usar un negativo mano?'));
        }

        // ✅
        // if number is 0
        if (x === 0) {
            resolver(1);
        }

        // if number is positive
        resolver(x * factorial(x - 1));
    });
}

function esperar(cuanto) {
    return new Promise(function (resolver, rechazar) {
        setTimeout(
            function () {
                resolver();
            },
            cuanto * 1000 // milisegundos
        );
    });
}

esperar(10).then(function () {
    console.log('han pasado 10 segundos');
});

console.log('Yo no me voy a aguantar 10seg');

console.time('sinpromesa');
factorialConPromesas(1000)
    .then(function (valor) {
        console.log(valor + 1, 'promesa');
    })
    .catch(function (error) {
        console.error(`Algo malio sal ${error.message}`);
    });
console.timeEnd('sinpromesa');

let resultNormal = factorial(1000);

// // fn => P <== funcion => 2 Fn

// mostrarTexto('askldjasd ads da sd asd a ds asd ').then(function () {
//     personaje.mostrar();
// });

XMLHttpRequest; // callbacks

fetch(
    'https://gist.githubusercontent.com/bar0191/fae6084225b608f25e98b733864a102b/raw/dea83ea9cf4a8a6022bfc89a8ae8df5ab05b6dcc/pokemon.json'
)
    .then(function (response) {
        // Response
        return response.json();
    })
    .then(function (value) {
        console.log(value);
    })
    .catch(function (error) {
        console.error(error);
    });

console.log('no me espero el fetch');

function mejorFetch(url) {
    return new Promise(function (resolve, reject) {
        fetch(url)
            .then(function (response) {
                // Response
                if (response.ok === false) {
                    reject(response);
                }

                return response.json();
            })
            .then(function (value) {
                resolve(value);
            })
            .catch(function (error) {
                reject(error);
            });
    });
}

mejorFetch(
    'https://gist.githubusercontent.com/bar0191/fae6084225b608f25e98b733d864a102b/raw/dea83ea9cf4a8a6022bfc89a8ae8df5ab05b6dcc/pokemon.json'
).then(function (info) {
    console.log(info);
});

// Callback hell
function uno(info, callback, recallback) {
    callback(info, recallback);
}
uno(
    1,
    function (info, callback) {
        console.log(info);
    },
    function (params) {}
);

mejorFetch('http://jservice.io/api/clues').then(function (data) {
    console.log(data);
});
