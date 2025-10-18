let contactos = JSON.parse(localStorage.getItem("contactos")) || [];
let indiceEditando = null;

function mostrarContactos(){
    let lista = document.getElementById("listaContactos");
    lista.innerHTML = "";

    contactos.forEach((contacto, index) => {
        let li = document.createElement("li");
        li.textContent = `${contacto.nombre} - ${contacto.telefono} - ${contacto.email}`;

        let btnEditar =document.createElement("button");
        btnEditar.textContent = "✏️";
        btnEditar.onclick = () => editarContacto(index);
        li.appendChild(btnEditar);
    

        let btnBorrar= document.createElement("button");
        btnBorrar.textContent = "❌";
        btnBorrar.onclick = () => borrarContacto(index);
        li.appendChild(btnBorrar);

        lista.appendChild(li);
    });
}

document.getElementById("formContacto").addEventListener("submit",function(e){
    e.preventDefault();

    let nombre = document.getElementById("nombre").value;
    let telefono = document.getElementById("telefono").value;
    let email = document.getElementById("email").value;

    if(indiceEditando === null){

        contactos.push({nombre,telefono,email});
    } else {

    contactos[indiceEditando] = { nombre, telefono, email };
    indiceEditando = null;
}

    localStorage.setItem("contactos", JSON.stringify(contactos));
    mostrarContactos();
    document.getElementById("formContacto").reset();
});

function editarContacto(index) {
    let contacto = contactos[index];
    document.getElementById("nombre").value = contacto.nombre;
    document.getElementById("telefono").value = contacto.telefono;
    document.getElementById("email").value = contacto.email;
    indiceEditando = index;
}

  function borrarContacto(index){
    contactos.splice(index,1);
    localStorage.setItem("contactos",JSON.stringify(contactos));
    mostrarContactos();
}

document.getElementById("borrarTodos").addEventListener("click", function (){
    localStorage.removeItem("contactos");
    contactos=[];
    mostrarContactos();
});

mostrarContactos();


