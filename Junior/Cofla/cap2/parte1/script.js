/*
Info 



Crear Soluciones

-Dejar pasar solo a los mayores de edad.
-La primer persona que entre despues de las 2am, no paga 
*/

let free = false;

const validarCliente = (time)=>{
    let edad = prompt("¿Cual es tu edad?");
    if (edad > 18){
        if(time >= 2 && time < 7 && free == false){
            alert("Podes pasar gratis, porque sos la primer persona despues de las 2hs am");
            free=true;
        }else{
            alert(`Son las ${time}:00hs, Se abona $1000 la entrada`);
        }
    }else{
        alert("No se permite el ingreso a menores de edad");
    }
}

validarCliente(23);
validarCliente(1);
validarCliente(2);
validarCliente(3);
