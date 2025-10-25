function agregarNumero(array,num){
    return [...array,num];
}

let numeros = [7];
let nuevoArray = agregarNumero(numeros,3);

console.log("Array original:",numeros);
console.log("Nuevo array:",nuevoArray);

