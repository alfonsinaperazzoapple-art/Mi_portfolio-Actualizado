function sumarNumeros(array){
    let total =0;
    for (let i =0;i<array.length; i++){
        total += array[i];
    }
    return total;
}

console.log(sumarNumeros([12,34,67]));
console.log(sumarNumeros([1,2,3,4,5]));

