/*
Info 

Los datos de cofla y de otros alumnos fueron recibidos y ya estan almacenados, ahora hay que crear un sistema que muestre esa informacion y
 se pueda asignar cuando rinde.

Crear Soluciones

-La interfaz debe swer agradable y atractiva.
-Debe contener todos los datos de manera esstructurada.
-El profesor puede seleccionar en cual de las 2 semanas rinde el usuario.
-Si el profesor confirma, los datos se deben actualizar y reemplazar el espacio de seleccion de semana por la semana seleccionada.

*/

const alumnos = [{
    nombre: "Natalia Techeira",
    email: "natt@gmail.com",
    materia: "Matematicas"
},{
    nombre: "Evelyn Techeira",
    email: "natt@gmail.com",
    materia: "Quimica"
},{
    nombre: "Lilian Techeira",
    email: "lili@gmail.com",
    materia: "Literatura"
},{
    nombre: "Braian Zamudio",
    email: "braian@gmail.com",
    materia: "Calculo"
},{
    nombre: "Cofla Gonzalez",
    email: "cofla@gmail.com",
    materia: "Fisica"
}];

const boton = document.querySelector(".boton-confirmar");
const contenedor = document.querySelector(".grid-container");


for (alumno in alumnos){
    let datos = alumnos[alumno];
    let nombre = datos["nombre"];
    let email = datos["email"];
    let materia = datos["materia"];
    let htmlCode = `
        <div class="grid-item nombre">${nombre}</div>
        <div class="grid-item email">${email}</div>
        <div class="grid-item materia">${materia}</div>
        <div class="grid-item semana">
            <select class="semana-elegida">
                <option value="semana 1">Semana 1</option>
                <option value="ssemana 2">Semana 2</option>
            </select>
        </div>`;
    contenedor.innerHTML += htmlCode;
};

boton.addEventListener("click", ()=>{
    let confirmar = confirm("¿Realmente quieres confirmar las mesas?");
    if(confirmar){
        document.body.removeChild(boton);
        let elementos = document.querySelectorAll(".semana");
        let semanasElegidas = document.querySelectorAll(".semana-elegida");
        for (elemento in elementos){
            semana = elementos[elemento];
            semana.innerHTML = semanasElegidas[elemento].value;
        };
    }
});