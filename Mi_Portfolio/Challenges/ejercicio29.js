let opciones = ["piedra", "papel", "tijera"];

let jugador = "piedra";
let computadora = opciones[Math.floor(Math.random()* 3)];

console.log("Jugardor:" + jugador);
console.log("Computadora:" + computadora);

if(jugador == computadora){
    console.log("Empate");
} else if(
    (jugador === "piedra" && computadora === "tijera")||
    (jugador === "papel" && computradpra === "piedra") ||
    (jugador === "tijera" && computadora === "papel")
){
    console.log("!Ganaste!")
} 
