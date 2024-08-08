let tiempo = 0; // Variable para el tiempo
let cronometro; // Variable para el cronómetro
let score = 0; // Variable para el score

// Función que carga la palabra
const cargarPalabras = async () => {
    try {
        // Realizamos la conexión a la API
        const respuesta = await fetch('https://random-word-api.herokuapp.com/word?lang=es');
        const datos = await respuesta.json();
        const palabraAleatoria = datos[0]; 

        // Declaramos las variables para el juego
        let palabraSecreta = palabraAleatoria.replace(/./g, "_ "); 
        document.querySelector('.palabraSecreta').innerHTML = palabraSecreta; 

        // Iniciamos el cronómetro
        cronometro = setInterval(() => {
            tiempo++; 
            document.querySelector('.cronometro').innerHTML = `Tiempo: ${tiempo} segundos`; 
        }, 1000);

        alert(palabraAleatoria

        )

        // Definimos las vidas que tendrá el usuario y las mostramos en el HTML.
        const vidasTotales = 6; 
        let vidasRestantes = vidasTotales; 
        document.querySelector('.vidas').innerHTML = `Vidas restantes: ${vidasRestantes}`; 

        // Reemplazar los caracteres del juego
        const reemplazar = (string, character, index) => {
            return string.substring(0, index) + character + string.substring(index + character.length);
        }

        // Verifica la letra ingresada y limpia el campo de entrada
        const verificarPalabra = () => {
            const letra = document.querySelector('input').value; 
            document.querySelector('input').value = ''; 
            let acierto = false; 

            // Recorremos la palabra y verificamos si la letra está presente
            for (let i = 0; i < palabraAleatoria.length; i++) {
                if (palabraAleatoria[i] === letra) { 
                    palabraSecreta = reemplazar(palabraSecreta, letra, i * 2); 
                    acierto = true; 
                    score += 5; 
                    document.querySelector('.score').innerHTML = `Score: ${score}`; 
                }
            }

            // Actualiza la palabra mostrada.
            document.querySelector('.palabraSecreta').innerHTML = palabraSecreta; 

            // Resta una vida si no hay acierto y actualiza el contador de vidas
            if (!acierto) {
                vidasRestantes--; 
                score -= 2;
                document.querySelector('.score').innerHTML = `Score: ${score}`;
                document.querySelector('.vidas').innerHTML = `Vidas restantes: ${vidasRestantes}`; 
            }

            // Verifica si el jugador perdio y muestra el mensaje en caso de que sea asi
            if (vidasRestantes === 0) { // Si no quedan vidas
                clearInterval(cronometro); // Detiene el cronómetro
                document.querySelector('.container').innerHTML = `
                <h1 id="mensaje-final">Has perdido</h1>  
                <a href="pages/inicio-scores.html">
                    <button> Jugar de Nuevo </button>
                </a> 
                `; // Muestra el mensaje
            }

            // Verifica si el jugador ganó y mostrar el mensaje final en caso de que sea asi
            if (!palabraSecreta.includes("_")) {
                document.querySelector('.container').innerHTML = `
                <h1 id="mensaje-final">Has ganado</h1>
                <p>Tiempo total: ${tiempo} segundos</p>
                <p>Score total: ${score}</p> <!-- Mostrar el score total -->
                <div id="fin-juego">
                    <p>Ingrese su nombre para guardar su puntuación (máx 3 caracteres):</p>
                    <input type="text" id="nombre-jugador" minlength="3" maxlength="3">
                    <a href="pages/inicio-scores.html">
                        <button id="guardar-score">Guardar Score</button>
                    </a>
                </div>
                `;

                // Agrega el evento para guardar el score
                document.getElementById('guardar-score').addEventListener('click', () => {
                    const nombreJugador = document.getElementById('nombre-jugador').value;

                    // Envia los datos al servidor
                    fetch('http://localhost:3000/guardar-score', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            nombre: nombreJugador,
                            puntos: score,
                            tiempo: tiempo
                        })
                    })
                    .then(response => response.text())
                    .catch(error => {
                        console.error('Error al guardar el score:', error);
                    });
                });
            }
        }

        // Llama a la funcion verificarPalabra al hacer clic en el botón
        document.querySelector('button').addEventListener('click', verificarPalabra); 

    } catch (error) { 
        console.log(error); 
    }
}

// Función para cargar los mejores scores
const cargarScores = async () => {
    try {
        const respuesta = await fetch('http://localhost:3000/mejores-scores');
        const scores = await respuesta.json();

        const tbody = document.querySelector('#tabla-scores tbody');
        tbody.innerHTML = '';

        scores.forEach(score => {
            const fila = document.createElement('tr');
            const fecha = new Date(score.fecha);
            const fechaScore = fecha.toISOString().split('T')[0]; // Formatea la fecha para mostrar solo la parte de la fecha

            fila.innerHTML = `
                <td>${score.nombre}</td>
                <td>${score.puntos}</td>
                <td>${score.tiempo} segundos</td>
                <td>${fechaScore}</td>
            `;
            tbody.appendChild(fila);
        });
    } catch (error) {
        console.error('Error al cargar los scores:', error);
    }
}

// Llama a la función para cargar los scores al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('inicio-scores.html')) {
        cargarScores(); // Solo cargar scores si estamos en inicio-scores.html
    } else {
        cargarPalabras(); // Cargar palabras si estamos en index.html
    }
});
