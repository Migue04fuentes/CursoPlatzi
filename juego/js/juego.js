// Contenedores
const sectionataque = document.getElementById("seleccionar_ataque");
const sectionreiniciar = document.getElementById('reiniciar');
const sectionmascota = document.getElementById("seleccionar_mascota");
// Botones
const btnmascotajugador = document.getElementById("btn_mascota");
// Botón de reinicio
const botonreiniciar = document.getElementById("btn_reiniciar");
// Etiquetas de text
const spanmascotajugador = document.getElementById('mascotajugador');
const spanmascotaenemigo = document.getElementById("mascotaenemigo");


// Victorias de los jugadores
const spanvictoriasjugador = document.getElementById("vidasjugador");
const spanvictoriasenemigo = document.getElementById("vidasenemigo");

const sectionmensaje = document.getElementById('resultado');

const ataque_jugador = document.getElementById('ataque_jugador');
const ataque_enemigo = document.getElementById('ataque_enemigo');

const contenedor_tarjetas = document.getElementById('contenedor_tarjetas');

// contenedor de ataques
const tarj_ataque = document.getElementById('tarj_ataque');

let personajes = [];
let ataquejugador;
let ataqueenemigo = [];
let opcionpersonajes;
let mascotajugador;
//ataques de personajes
let ataquesavatar;

//Ataques jugador
let atq_jugador = [];
// Ataque enemigo
let ataquesenemigo;

// index de ataques
let indexataquejugador;
let indexataqueenemigo;

// Botones de ataque
let botones = [];

// Victorias de los jugadores
let victoriasjugador = 0;
let victoriasenemigo = 0;

let vidasjugador = 3;
let vidasenemigo = 3;


// Botones de ataques
let botonfuego;
let botonagua;
let botontierra;

let input_hipodoge;
let input_capipepo;
let input_ratigueya;

// Clase de personajes
class Nintendo {
    constructor(nombre, foto, vida) {
        this.nombre = nombre;
        this.foto = foto;
        this.vida = vida;
        this.ataques = [];
    }
}

// Personajes
let hipodoge1 = new Nintendo('Hipodoge', './img/hipodoge.webp', 5);
let capipepo1 = new Nintendo('Capipepo', './img/capipepo.webp', 5);
let ratigueya1 = new Nintendo('Ratigueya', './img/ratigueya.webp', 5);


// Ataques de personajes
hipodoge1.ataques.push(
    { nombre: '💧', id: 'btn_agua' },
    { nombre: '💧', id: 'btn_agua' },
    { nombre: '💧', id: 'btn_agua' },
    { nombre: '🔥', id: 'btn_fuego' },
    { nombre: '🌱', id: 'btn_tierra' }
);

capipepo1.ataques.push(
    { nombre: '🌱', id: 'btn_tierra' },
    { nombre: '🌱', id: 'btn_tierra' },
    { nombre: '🌱', id: 'btn_tierra' },
    { nombre: '💧', id: 'btn_agua' },
    { nombre: '🔥', id: 'btn_fuego' }
);
ratigueya1.ataques.push(
    { nombre: '🔥', id: 'btn_fuego' },
    { nombre: '🔥', id: 'btn_fuego' },
    { nombre: '🔥', id: 'btn_fuego' },
    { nombre: '💧', id: 'btn_agua' },
    { nombre: '🌱', id: 'btn_tierra' }
);

personajes.push(hipodoge1, capipepo1, ratigueya1);


// Función llamada al cargar la página
function iniciarjuego() {

    // ocultar
    sectionataque.style.display = 'none';
    sectionreiniciar.style.display = 'none';

    // Imprimir Personajes
    personajes.forEach((personaje) => {
        opcionpersonajes = `
        <input type="radio" name="mascota" id="${personaje.nombre}" />
        <label class="tarjeta_n64" for="${personaje.nombre}">
            <p>${personaje.nombre}</p>
            <img src="${personaje.foto}" alt="${personaje.nombre}">
        </label>`

        contenedor_tarjetas.innerHTML += opcionpersonajes;

        // seleccionando input
        input_hipodoge = document.getElementById('Hipodoge');
        input_capipepo = document.getElementById('Capipepo');
        input_ratigueya = document.getElementById('Ratigueya');
    });

    // Selección de mascota
    btnmascotajugador.addEventListener('click', seleccionarmascotajugador);



    //Reiniciar
    botonreiniciar.addEventListener('click', reiniciarjuego);
}


// Cógido para obtener la mascota seleccionada del jugador;
function seleccionarmascotajugador() {

    sectionmascota.style.display = 'none';

    // mostrar sesión de los ataques
    sectionataque.style.display = 'flex';

    if (input_hipodoge.checked) {
        spanmascotajugador.innerHTML = input_hipodoge.id;
        mascotajugador = input_hipodoge.id;
    } else if (input_capipepo.checked) {
        spanmascotajugador.innerHTML = input_capipepo.id;
        mascotajugador = input_capipepo.id;
    } else if (input_ratigueya.checked) {
        spanmascotajugador.innerHTML = input_ratigueya.id;
        mascotajugador = input_ratigueya.id;
    } else {
        alert("Selecciona una mascota");
    }

    extraerataques(mascotajugador);
    //llamado de la función después de elegir el usuario
    selecionarmascotaenemigo();
}


// Obtener ataques por id
function extraerataques(mascotajugador) {
    let ataques;
    for (let i = 0; i < personajes.length; i++) {
        if (mascotajugador === personajes[i].nombre) {
            ataques = personajes[i].ataques;
        }
    }
    mostrarataques(ataques);
}

// mostrar ataques
function mostrarataques(ataques) {
    ataques.forEach((ataque) => {
        ataquesavatar = `<button id="${ataque.id}" class="btn_ataque listataques">${ataque.nombre}</button>`
        tarj_ataque.innerHTML += ataquesavatar;
    });
    // Botones de ataques
    botonfuego = document.getElementById('btn_fuego');
    botonagua = document.getElementById('btn_agua');
    botontierra = document.getElementById('btn_tierra');
    // Botones de ataque
    botones = document.querySelectorAll('.listataques');

}

function secuencia_ataques() {
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if (e.target.innerHTML === '🔥') {
                atq_jugador.push('FUEGO');
                console.log(atq_jugador);
                boton.style.background = '#112f58';
            } else if (e.target.innerHTML === '💧') {
                atq_jugador.push('AGUA');
                console.log(atq_jugador);
                boton.style.background = '#112f58';
            } else {
                atq_jugador.push('TIERRA');
                console.log(atq_jugador);
                boton.style.background = '#112f58';
            }
            ataquealeatorioenemigo();
        });
    });
}





// Elección de la mascota aleatoria
function selecionarmascotaenemigo() {
    let mascotaaleatorio = aleatorio(0, personajes.length - 1);

    spanmascotaenemigo.innerHTML = personajes[mascotaaleatorio].nombre;
    ataquesenemigo = personajes[mascotaaleatorio].ataques;
    secuencia_ataques();
}


// Ataque aleatorio del enemigo
function ataquealeatorioenemigo() {
    let ataquealeatorio = aleatorio(0, ataquesenemigo.length - 1);

    if (ataquealeatorio == 0 || ataquealeatorio == 1) {
        ataqueenemigo.push('FUEGO');
    } else if (ataquealeatorio == 3 || ataquealeatorio == 4) {
        ataqueenemigo.push('AGUA');
    } else {
        ataqueenemigo.push('TIERRA');
    }
    console.log(ataqueenemigo);
    iniciarcombate();
}

function iniciarcombate() {
    if (atq_jugador.length === 5) {
        combate();
    }
}

function indexofoponentes(jugador, enemigo) {
    indexataquejugador = atq_jugador[jugador];
    indexataqueenemigo = ataqueenemigo[enemigo];
}

//Resultado de combate
function combate() {

    for (let i = 0; i < atq_jugador.length; i++) {
        if (atq_jugador[i] === ataqueenemigo[i]) {
            indexofoponentes(i, i);
            crearmensaje("EMPATE");
        }else if (atq_jugador[i] === 'FUEGO' && ataqueenemigo[i] === 'TIERRA') {
            indexofoponentes(i, i);
            crearmensaje('GANASTE');
            victoriasjugador++;
            spanvictoriasjugador.innerHTML = victoriasjugador;
        }else if (atq_jugador[i] === 'AGUA' && ataqueenemigo[i] === 'FUEGO') {
            indexofoponentes(i, i);
            crearmensaje('GANASTE');
            victoriasjugador++;
            spanvictoriasjugador.innerHTML = victoriasjugador;
        }else if (atq_jugador[i] === 'TIERRA' && ataqueenemigo[i] === 'AGUA') {
            indexofoponentes(i, i);
            crearmensaje('GANASTE');
            victoriasjugador++;
            spanvictoriasjugador.innerHTML = victoriasjugador;
        } else {
            indexofoponentes(i, i);
            crearmensaje('PERDISTE');
            victoriasenemigo++;
            spanvictoriasenemigo.innerHTML = victoriasenemigo;
        }
        console.log(atq_jugador[i]);
    }
    //Revisar las vidas
    revisarvictorias();
}

function revisarvictorias() {
    if (victoriasjugador === victoriasenemigo) {
        mensajefinal('EMPATE');
    }else if(victoriasjugador > victoriasenemigo){
        mensajefinal("¡FELICITACIONES GANASTE!🎉🎊");
    }else{
        mensajefinal("Los siento, perdiste");
    }
}

// Mensaje de fin de juego
function mensajefinal(resultadofinal) {

    sectionmensaje.innerHTML = resultadofinal;

    // Ocultar botones al terminar juego

    botonfuego.disabled = true;

    botonagua.disabled = true;

    botontierra.disabled = true;


    sectionreiniciar.style.display = 'block';

}


// Mensaje de resultados del juego
function crearmensaje(resultado) {

    let new_ataque_jugador = document.createElement('p');
    let new_ataque_enemigo = document.createElement('p');

    sectionmensaje.innerHTML = resultado;
    new_ataque_jugador.innerHTML = indexataquejugador;
    new_ataque_enemigo.innerHTML = indexataqueenemigo;

    ataque_jugador.appendChild(new_ataque_jugador);
    ataque_enemigo.appendChild(new_ataque_enemigo);
}

// Reinicio de juego 
function reiniciarjuego() {
    location.reload();
}


// Obtener números aleatorios
function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Que cargue el código javascript después que cargue en su totalidad la página;
window.addEventListener('load', iniciarjuego);