let palabra = "javascript";
let contador = 0;

for (let i=0;i<palabra.length;i++){
    let letra= palabra[i].toLowerCase();
    if("aeiou".includes(letra)){
        contador++;
    }
}

console.log("La palabra tiene" + contador + "vocales");
