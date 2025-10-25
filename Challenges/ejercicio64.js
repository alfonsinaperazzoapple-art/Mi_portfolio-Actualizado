function mayorNumero(array){
    let mayor= array[0];

    for(let i =1;i<array.length;i++){
        if (array[i]>mayor){
            mayor=array[i];
        }
    }
     return mayor;
}

console.log(mayorNumero ([23,56,89]));
