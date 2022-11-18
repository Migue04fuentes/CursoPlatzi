// Contenedores
const sectionataque = document.getElementById("seleccionar_ataque");
const sectionreiniciar = document.getElementById('reiniciar');
const sectionmascota = document.getElementById("seleccionar_mascota");
// Botones
const btnmascotajugador = document.getElementById("btn_mascota");
const botonfuego = document.getElementById('btn_fuego');
const botonagua = document.getElementById('btn_agua');
const botontierra = document.getElementById('btn_tierra');
const botonreiniciar = document.getElementById("btn_reiniciar");
// Etiquetas de text
const spanmascotajugador = document.getElementById('mascotajugador');
const spanmascotaenemigo = document.getElementById("mascotaenemigo");



const spanvidasjugador = document.getElementById("vidasjugador");
const spanvidasenemigo = document.getElementById("vidasenemigo");

const sectionmensaje = document.getElementById('resultado');

const ataque_jugador = document.getElementById('ataque_jugador');
const ataque_enemigo = document.getElementById('ataque_enemigo');

const contenedor_tarjetas = document.getElementById('contenedor_tarjetas');
let personajes = [];
let ataquejugador;
let ataqueenemigo;
let opcionpersonajes;
let mascotajugador;
let vidasjugador = 3;
let vidasenemigo = 3;

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

    //Ataques
    botonfuego.addEventListener('click', ataquefuego);
    botonagua.addEventListener('click', ataqueagua);
    botontierra.addEventListener('click', ataquetierra);

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
function extraerataques(mascotajugador){
    let ataques;
    for(let i = 0; i < personajes.length; i++){
        if(mascotajugador === personajes[i].nombre){
            ataques = personajes[i].ataques;
        }
    }
    mostrarataques();
}

// Elección de la mascota aleatoria
function selecionarmascotaenemigo() {
    let mascotaaleatorio = aleatorio(0, personajes.length -1);
   
        spanmascotaenemigo.innerHTML = personajes[mascotaaleatorio].nombre;
}


// Ataque de las mascotas
function ataquefuego() {
    ataquejugador = 'FUEGO';
    ataquealeatorioenemigo();
}

function ataqueagua() {
    ataquejugador = 'AGUA';
    ataquealeatorioenemigo();
}

function ataquetierra() {
    ataquejugador = 'TIERRA';
    ataquealeatorioenemigo();
}

// Ataque aleatorio del enemigo
function ataquealeatorioenemigo() {
    let ataquealeatorio = aleatorio(1, 3);

    if (ataquealeatorio == '1') {
        ataqueenemigo = 'FUEGO';
    } else if (ataquealeatorio == '2') {
        ataqueenemigo = 'AGUA';
    } else {
        ataqueenemigo = 'TIERRA';
    }

    combate();
}


//Resultado de combate
function combate() {

    if (ataqueenemigo == ataquejugador) {
        crearmensaje("EMPATE");
    } else if (ataquejugador == 'FUEGO' && ataqueenemigo == 'TIERRA') {
        crearmensaje("GANASTE");
        vidasenemigo--;
        spanvidasenemigo.innerHTML = vidasenemigo;
    } else if (ataquejugador == 'AGUA' && ataqueenemigo == 'FUEGO') {
        crearmensaje("GANASTE");
        vidasenemigo--;
        spanvidasenemigo.innerHTML = vidasenemigo;
    } else if (ataquejugador == 'TIERRA' && ataqueenemigo == 'AGUA') {
        crearmensaje("GANASTE");
        vidasenemigo--;
        spanvidasenemigo.innerHTML = vidasenemigo;
    }
    else {
        crearmensaje("PERDISTE");
        vidasjugador--;
        spanvidasjugador.innerHTML = vidasjugador;
    }

    //Revisar las vidas
    revisarvidas();
}

function revisarvidas() {
    let p_resultado = document.getElementById('#resultado');
    if (vidasenemigo == 0) {
        mensajefinal("¡FELICITACIONES GANASTE!🎉🎊");
        // p_resultado.style.background = 'rgba(233, 239, 53, 0.556)';
    } else if (vidasjugador == 0) {
        mensajefinal("Los siento, perdiste");
        // p_resultado.style.background = 'rgba(239, 53, 53, 0.556)';
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
    new_ataque_jugador.innerHTML = ataquejugador;
    new_ataque_enemigo.innerHTML = ataqueenemigo;

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