function promedio(array){
   let total= 0 

   for(let i=0; i<array.length;i++){
      total += array [i];
}
     return total/array.length;
}
 console.log(promedio([10,20,30]));
 console.log(promedio([5,15,25,35]));
