/*
Info 

-Cofla llega a su casa y abre una pagina y apreta F!!, desde ahi se pone a navegar pero hay un problema...
Como ahora esta en pantalla completa no puede ver ni la barra de marcadores, ni el protocolo, ni la URL, ni ninguna informacion que nos puede otorgar la interfaz que contiene la barra de busqueda.

Crear Soluciones

- Crear un sistema que muestre los suficientes datos como para conocer el sitio web.
*/

let href = window.location.href
let pathname = window.location.pathnamef;
let hostname = window.location.hostname;
let protocol = window.location.protocol;

let html = `Protocolo:<b>${protocol}</b></b><br>`;
html += `Hostname:<b>${hostname}</b></b><br>`;
html += `Pathname:<b>${pathname}</b></b><br>`;
html += `URL completa:<b>${href}</b></b><br>`;

document.write(html);