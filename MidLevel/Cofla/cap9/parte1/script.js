/*
Info 

Las mesas de examen ya finalizaron y el profesor le tomo un ultimo especial a cofla, ya cofla hizo 2 pruebas mas,
pero lamentablemente se rompio el sistema de inscripcionde notas, por ende habra que crear una solucion a este problema,
desarrollando una web que sea capas de simular  su funcionamiento.

Crear Soluciones

- Crear mini interfaz para introducir nota.
-Validar que no haya errores.
-Se debe promediar la nota del profesor, otras 2 notas de trabajo.
-Si el promedio es mayor a 7/10-> aprobo la materia.
*/

const sendButton = document.getElementById('snd-nota');

sendButton.addEventListener("click",()=>{
    let resultado, mensaje;
    try{
       prevRes = parseInt(document.getElementById('nota').value);
       if(isNaN(prevRes)){
        throw "Grasioso";
       }
       resultado = verificarAprovacion(8,5,mensaje);
       mensaje = definirMensaje(resultado[1]);
    }catch(e){ 
        resultado = "Es un error";
        mensaje = "He descubierto que intestaste hacear el sitio";
    }
    abrirModal(resultado[0],mensaje);
});

const definirMensaje = (pr)=>{
    let resultado;
    switch(pr){
        case 1: resultado = "La nota es 1";
        break;
        case 2: resultado = "La nota es 2";
        break;
        case 3: resultado = "La nota es 3";
        break;
        case 4: resultado = "La nota es 4";
        break;
        case 5: resultado = "La nota es 5";
        break;
        case 6: resultado = "La nota es 6";
        break;
        case 7: resultado = "La nota es 7";
        break;
        case 8: resultado = "La nota es 8";
        break;
        case 9: resultado = "La nota es 9";
        break;
        case 10: resultado = "La nota es 10";
        break;
        default: resultado = null;
    }
    return resultado;
}

const verificarAprovacion = (nota1,nota2,prevRes)=>{

    promedio = (nota1 + nota2 + prevRes) / 3;
    if(promedio >= 7){
        return "<span class='green'>APROBADO</span>";
    }
    return "<span class='red'>DESAPROBADO</span>";
}

const abrirModal = (res,msg)=>{
    document.querySelector(".resultado").innerHTML = res;
    document.querySelector(".mensaje").innerHTML = "Tu prueba: " + msg;
    let modal = document.querySelector(".modal-background");
    modal.style.display = "flex"; 
    modal.style.animation = "aparecer 1s forwards";
};