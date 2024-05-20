"use strict";

const publicaciones = document.querySelector(".publicaciones");
let contador = 0;

const createPublicationCode = (nombre,content) => {
    const container = document.createElement("DIV");
    const comentarios = document.createElement("DIV");
    const h3 = document.createElement("H3");
    const contenido = document.createElement("p");
    const bntComentario = document.createElement("INPUT");
    const btnEnviar = document.createElement("INPUT");

    container.classList.add("publicacion");
    comentarios.classList.add("comentarios");
    btnEnviar.classList.add("enviar");
    bntComentario.classList.add("comentario");

    bntComentario.setAttribute("placeholder","Escribe un comentario");
    h3.textContent = nombre;
    contenido.textContent = content;

    btnEnviar.type = "submit";

    comentarios.appendChild(bntComentario);
    comentarios.appendChild(btnEnviar);

    container.appendChild(h3);
    container.appendChild(contenido);
    container.appendChild(comentarios);

    return container
}


const cargarMasPublis = entry =>{
    if (entry[0].isIntersecting) cargarPublicaciones(4);
}

const observer = new IntersectionObserver(cargarMasPublis);

const cargarPublicaciones = async num =>{
    const request = await fetch("information.txt");
    const content = await request.json();
    const arr = content.content;
    const documentFragment = document.createDocumentFragment();
    for (let i = 0; i < num; i++) {
        if(arr[contador] != undefined){

            const newPublicacion = createPublicationCode(arr[contador].name,arr[contador].contenido);
            documentFragment.appendChild(newPublicacion);
            contador++;
            if (i == num-1) observer.observe(newPublicacion)
        }else {
            if(publicaciones.lastElementChild.id !== "nomore"){

                let noMore = document.createElement("h3");
                noMore.textContent = "No hay mas publicaciones";
                noMore.id = "nomore";
                documentFragment.appendChild(noMore);
                publicaciones.appendChild(documentFragment);
                break;
            }
        }
    }
    publicaciones.appendChild(documentFragment);
}

cargarPublicaciones(4);