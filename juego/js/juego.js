// Contenedores
const sectionataque = document.getElementById("seleccionar_ataque");
const sectionreiniciar = document.getElementById("reiniciar");
const sectionmascota = document.getElementById("seleccionar_mascota");
// Botones
const btnmascotajugador = document.getElementById("btn_mascota");
const botonfuego = document.getElementById("btn_fuego");
const botonagua = document.getElementById("btn_agua");
const botontierra = document.getElementById("btn_tierra");
const botonreiniciar = document.getElementById("btn_reiniciar");
// Etiquetas de text
const spanmascotajugador = document.getElementById("mascotajugador");
const spanmascotaenemigo = document.getElementById("mascotaenemigo");

const hipodoge = document.getElementById("hipodoge");
const capipepo = document.getElementById("capipepo");
const ratigueya = document.getElementById("ratigueya");

const spanvidasjugador = document.getElementById("vidasjugador");
const spanvidasenemigo = document.getElementById("vidasenemigo");

const sectionmensaje = document.getElementById("resultado");

const ataque_jugador = document.getElementById("ataque_jugador");
const ataque_enemigo = document.getElementById("ataque_enemigo");

let ataquejugador;
let ataqueenemigo;
let vidasjugador = 3;
let vidasenemigo = 3;

// Función llamada al cargar la página
function iniciarjuego() {
  // ocultar
  sectionataque.style.display = "none";
  sectionreiniciar.style.display = "none";

  // Selección de mascota
  btnmascotajugador.addEventListener("click", seleccionarmascotajugador);

  //Ataques
  botonfuego.addEventListener("click", ataquefuego);
  botonagua.addEventListener("click", ataqueagua);
  botontierra.addEventListener("click", ataquetierra);

  //Reiniciar
  botonreiniciar.addEventListener("click", reiniciarjuego);
}

// Cógido para obtener la mascota seleccionada del jugador;
function seleccionarmascotajugador() {
  sectionmascota.style.display = "none";

  // mostrar sesión de los ataques
  sectionataque.style.display = "flex";

  if (hipodoge.checked) {
    spanmascotajugador.innerHTML = "Hipodoge";
  } else if (capipepo.checked) {
    spanmascotajugador.innerHTML = "Capipepo";
  } else if (ratigueya.checked) {
    spanmascotajugador.innerHTML = "Ratigueya";
  } else {
    alert("Selecciona una mascota");
  }

  //llamado de la función después de elegir el usuario
  selecionarmascotaenemigo();
}

// Elección de la mascota aleatoria
function selecionarmascotaenemigo() {
  let mascotaaleatorio = aleatorio(1, 3);
  if (mascotaaleatorio == 1) {
    spanmascotaenemigo.innerHTML = "Hipodoge";
  } else if (mascotaaleatorio == 2) {
    spanmascotaenemigo.innerHTML = "Capipepo";
  } else {
    spanmascotaenemigo.innerHTML = "Ratigueya";
  }
}

// Ataque de las mascotas
function ataquefuego() {
  ataquejugador = "FUEGO";
  ataquealeatorioenemigo();
}

function ataqueagua() {
  ataquejugador = "AGUA";
  ataquealeatorioenemigo();
}

function ataquetierra() {
  ataquejugador = "TIERRA";
  ataquealeatorioenemigo();
}

// Ataque aleatorio del enemigo
function ataquealeatorioenemigo() {
  let ataquealeatorio = aleatorio(1, 3);

  if (ataquealeatorio == "1") {
    ataqueenemigo = "FUEGO";
  } else if (ataquealeatorio == "2") {
    ataqueenemigo = "AGUA";
  } else {
    ataqueenemigo = "TIERRA";
  }

  combate();
}

//Resultado de combate
function combate() {
  if (ataqueenemigo == ataquejugador) {
    crearmensaje("EMPATE");
  } else if (ataquejugador == "FUEGO" && ataqueenemigo == "TIERRA") {
    crearmensaje("GANASTE");
    vidasenemigo--;
    spanvidasenemigo.innerHTML = vidasenemigo;
  } else if (ataquejugador == "AGUA" && ataqueenemigo == "FUEGO") {
    crearmensaje("GANASTE");
    vidasenemigo--;
    spanvidasenemigo.innerHTML = vidasenemigo;
  } else if (ataquejugador == "TIERRA" && ataqueenemigo == "AGUA") {
    crearmensaje("GANASTE");
    vidasenemigo--;
    spanvidasenemigo.innerHTML = vidasenemigo;
  } else {
    crearmensaje("PERDISTE");
    vidasjugador--;
    spanvidasjugador.innerHTML = vidasjugador;
  }

  //Revisar las vidas
  revisarvidas();
}

function revisarvidas() {
  let p_resultado = document.getElementById("resultado");
  if (vidasenemigo == 0) {
    mensajefinal("¡FELICITACIONES GANASTE!🎉🎊");
    p_resultado.setAttribute('style','background: rgba(233, 239, 53, 0.4);');
  } else if (vidasjugador == 0) {
    mensajefinal("Los siento, perdiste");
    p_resultado.style.background = 'rgba(239, 53, 53, 0.3)';
  }
}

// Mensaje de fin de juego
function mensajefinal(resultadofinal) {
  sectionmensaje.innerHTML = resultadofinal;

  // Ocultar botones al terminar juego

  botonfuego.disabled = true;

  botonagua.disabled = true;

  botontierra.disabled = true;

  sectionreiniciar.style.display = "block";
}

// Mensaje de resultados del juego
function crearmensaje(resultado) {
  let new_ataque_jugador = document.createElement("p");
  let new_ataque_enemigo = document.createElement("p");

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
window.addEventListener("load", iniciarjuego);
