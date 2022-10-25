let ataquejugador;
let ataqueenemigo;
let vidasjugador = 3;
let vidasenemigo = 3;

// Función llamada al cargar la página
function iniciarjuego() {

    // ocultar botón de reinicio´
    let sectionreiniciar = document.getElementById('reiniciar');
    sectionreiniciar.style.display = 'none';

    //    ocultar sesión de los ataques
    let sectionataque = document.getElementById("seleccionar_ataque");
    sectionataque.style.display = 'none';

    // Selección de mascota
    let btnmascotajugador = document.getElementById("btn_mascota");
    btnmascotajugador.addEventListener('click', seleccionarmascotajugador);


    let botonfuego = document.getElementById('btn_fuego');
    botonfuego.addEventListener('click', ataquefuego);
    let botonagua = document.getElementById('btn_agua');
    botonagua.addEventListener('click', ataqueagua);
    let botontierra = document.getElementById('btn_tierra');
    botontierra.addEventListener('click', ataquetierra);

    let botonreiniciar = document.getElementById("btn_reiniciar");
    botonreiniciar.addEventListener('click', reiniciarjuego);
}


// Cógido para obtener la mascota seleccionada del jugador;
function seleccionarmascotajugador() {

    let sectionmascota = document.getElementById("seleccionar_mascota");
    sectionmascota.style.display = 'none';

    let sectionataque = document.getElementById("seleccionar_ataque");
    sectionataque.style.display = 'flex';

    let hipodoge = document.getElementById('hipodoge');
    let capipepo = document.getElementById('capipepo');
    let ratigueya = document.getElementById('ratigueya');
    let spanmascotajugador = document.getElementById('mascotajugador');
    if (hipodoge.checked) {
        spanmascotajugador.innerHTML = 'Hipodoge';
    } else if (capipepo.checked) {
        spanmascotajugador.innerHTML = 'Capipepo';
    } else if (ratigueya.checked) {
        spanmascotajugador.innerHTML = 'Ratigueya';
    } else {
        alert("Selecciona una mascota");
    }

    //llamado de la función después de elegir el usuario
    selecionarmascotaenemigo();
}

// Elección de la mascota aleatoria
function selecionarmascotaenemigo() {
    let mascotaaleatorio = aleatorio(1, 3);
    let spanmascotaenemigo = document.getElementById("mascotaenemigo");
    if (mascotaaleatorio == 1) {
        spanmascotaenemigo.innerHTML = 'Hipodoge';
    } else if (mascotaaleatorio == 2) {
        spanmascotaenemigo.innerHTML = "Capipepo";
    } else {
        spanmascotaenemigo.innerHTML = "Ratigueya";
    }
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

    let spanvidasjugador = document.getElementById("vidasjugador");
    let spanvidasenemigo = document.getElementById("vidasenemigo");

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
    if (vidasenemigo == 0) {
        mensajefinal("¡FELICITACIONES GANASTE!");
    } else if (vidasjugador == 0) {
        mensajefinal("Los siento, perdiste");
    }
}

// Mensaje de fin de juego
function mensajefinal(resultadofinal) {
    let sectionmensaje = document.getElementById('resultado');

    sectionmensaje.innerHTML = resultadofinal;

    // Ocultar botones al terminar juego
    let botonfuego = document.getElementById('btn_fuego');
    botonfuego.disabled = true;
    let botonagua = document.getElementById('btn_agua');
    botonagua.disabled = true;
    let botontierra = document.getElementById('btn_tierra');
    botontierra.disabled = true;

    let sectionreiniciar = document.getElementById('reiniciar');
    sectionreiniciar.style.display = 'block';

}


// Mensaje de resultados del juego
function crearmensaje(resultado) {
    let sectionmensaje = document.getElementById('resultado');
    let ataque_jugador = document.getElementById('ataque_jugador');
    let ataque_enemigo = document.getElementById('ataque_enemigo');

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