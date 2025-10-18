let numero = 17;
let esPrimo = true;

for (let i = 2;i<numero;i++){
    if(numero % i === 0){
        esPrimo = false;
        break;
    }
}

if(esPrimo){
    console.log(numero + "es primo");
} else {
    console.log(numero + "no es par");
}
