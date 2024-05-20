/*
Info 



Crear Soluciones

-Crear mini-sistema que nos permita registrar los alumnos que estan presentes(P) y ausentes (A) en clase.
-Pasados los 30 dias mostrar lasituacion final de todos los alumnos(nro total de presentes y ausentes).
-Se puede tener un maximo de 10% de ausencias por semestre, si se tienen mas aclarar que esta desaprobado.
*/

let cantidad = prompt("¡Cuantos alumnos son?");
let alumnosTotales = [];

for (i = 0; i < cantidad; i++){
    alumnosTotales[i] = [prompt("Nombre del alumno " + (i+1)), 0];
};

const tomarAsistencia =(nombre,p)=>{
    let presencia = prompt(nombre);
    if(presencia == "p" || presencia == "P"){
        alumnosTotales[p][1]++;
    };
};

for (i = 0; i < 30; i++){
    for(alumno in alumnosTotales){
        tomarAsistencia(alumnosTotales[alumno][0],alumno);
    };
};

for (alumno in alumnosTotales){
    let resultado = `${alumnosTotales[alumno][0]}:<br>
    _________Presentes: <b>${alumnosTotales[alumno][1]}</b> <br>
    _________Ausentes: <b>${30 - alumnosTotales[alumno][1]}</b> </b>`;
    if(30 - alumnosTotales[alumno][1] > 18){
        resultado+= "<b style='color:red'>REPROBADO POR INASISTENCIAS</b><br><br>";
    }else{
        resultado+= "<br><br>"
    };
    document.write(resultado);
};