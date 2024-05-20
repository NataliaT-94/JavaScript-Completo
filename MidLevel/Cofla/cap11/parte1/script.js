/*
Info 

    Cofla ya ewta cursando su ultimo semestre en la universidad. Efectivamente tuvo todo lo necesario para pasar de año,
pero el tiene una duda, quiere saber cuantas personas que cursan el ultimo semestre, se reciben y cuantas no, 
esta informacion la tiene una api de su universidad a la que el tiene facil acceso.

- Crear un sistema para obtener esa informacion.
-Mostrarla ordenadamente en un sitio web.

*/

/*
const getInfo = async ()=>{
    resultado = await axios("informacion.txt");
    document.querySelector(".num-aprobados").innerHTML = resultado.data.aprobados;
    document.querySelector(".num-desaprobados").innerHTML = resultado.data.desaprobados;
}

document.getElementById("getInfo").addEventListener("click",getInfo);
*/
const getInfo = async ()=>{
    let aprobados = document.querySelector(".num-aprobados");
    let desaprobados = document.querySelector(".num-desaprobados");
    try{
        resultado = await axios("informacion.txt");

        aprobados.innerHTML = resultado.data.aprobados;
        desaprobados.innerHTML = resultado.data.desaprobados;
    }catch(e){
        aprobados.innerHTML = "La API fallo";
        desaprobados.innerHTML = "La API fallo";
    }
}

document.getElementById("getInfo").addEventListener("click",getInfo);