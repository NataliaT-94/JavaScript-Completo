/*
Info 

Cofla reprobo 2 materias y ahora tiene que enviar un formulario para registrarse en la materia que debe.

Crear Soluciones

- El formulario debe contener nombre completo, mail y materia adeudada.
- Se debe validar que el mail sea valido, que los nombres sean reales.
- Se debe enviar al servidor de una manera pulida.
*/

const nombre = document.getElementById("nombre");
const email = document.getElementById("email");
const materia = document.getElementById("materia");
const boton = document.getElementById("btn-enviar");
const resultado = document.querySelector(".resultado");

boton.addEventListener("click",(e)=>{
    e.preventDefault();
    let error = validarCampos();
    if(error[0]){
        resultado.innerHTML = error[1];
        resultado.classList.add("red");
    }else{
        resultado.innerHTML = "Solicitud enviada correctamente";
        resultado.classList.add("green");
        resultado.classList.remove("red");
    }
});

const validarCampos = ()=>{
    let error = [];
    if(nombre.value.length < 5 || nombre.value.length > 40){
        error[0] = true;
        error[1] = "El nombre es invalido";
        return error;
    }else if(email.value.length < 5 || 
            email.value.length > 40 ||
            email.value.indexOf("@") == -1 ||
            email.value.indexOf(".") == -1){
        error[0] = true;
        error[1] = "El mail es invalido";
        return error;
    }else if(materia.value.length < 4 || materia.value.length > 40){
        error[0] = true;
        error[1] = "La matria es invalido";
        return error;
    }
    error[0] = false;
    return error;

}

