/*
Info 

Despues de aprobar, cofla se compra una mejor computadora para poder pragramar mejor y hacer todo de una forma mas optima pero necesita una resolucion optima para poder trabajarla.


Crear Soluciones

- Debe ser al menos full HD.
-Cuando la este por comprar, preguntarle si esta seguro de eso.
*/

let alto = window.screen.availHeight;
let ancho = window.screen.availWidth;

comprar = confirm(`El Alto es: ${alto}, el Ancho es: ${ancho} `);

if (comprar) {
    alert("Compra realizada exitosamente");
} else{
    alert("compra cancelada");
}