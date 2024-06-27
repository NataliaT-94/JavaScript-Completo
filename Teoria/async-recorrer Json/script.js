//promise/promesa: informacion cargada atravez de una funcion asincrona 

const txt = document.getElementById("resp");

async function obtenerData(){
    await fetch("http://localhost/GitHub/JavaScript-Completo/Teoria/async-recorrer%20Json/data.json")
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(error => console.log('Solicitud fallida', error))
}


/*asi lo hariamos de forma simple
async function obtenerData(){
    const respuesta = await fetch("http://localhost/GitHub/JavaScript-Completo/Teoria/async-recorrer%20Json/data.json");
    const json = await respuesta.text();
    console.log(JSON.parse(json));
}

/*Obtenemos el texto directamente con formato json
async function obtenerData(){
    const respuesta = await fetch("http://localhost/GitHub/JavaScript-Completo/Teoria/async-recorrer%20Json/data.json");
    const json = await respuesta.json();
    console.log(json);
}*/

/*descargamos la api directamente
async function obtenerData(){
    const respuesta = await fetch("https://api.github.com/repos/hadley/ggplot2/commits");
    const json = await respuesta.text();
    console.log(JSON.parse(json));
}*/

obtenerData();