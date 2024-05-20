/*
Info 
Termino el primer semestre y cofla no sabe si aprobara o no las materias, para lograrlo necesitara contar con al menos el 90% de asistencias.
El prokmedio por materia debe ser de al menos 7 / 10.
Debe tener al menos el 75% de los trabajos practicos entregados.


Crear Soluciones
-Soicitar los datos y decirle si aprueba o no.
-Mostrar todo esto con colores representativos en consola.
-Todo esto estructurado como tabla.

*/
const materias = {
    fisica: [90,6,3,"fisica"],
    matematica: [84,8,2,"matematica"],
    logica: [92,8,4,"logica"],
    quimica: [96,8,4,"quimica"],
    calculo: [91,6,3,"calculo"],
    programacion: [79,7,4,"programacion"],
    biologia: [75,9,2,"biologia"],
    bbdd: [98,9,1,"bbdd"],
    algebra: [100,10,4,"algebra"]
}

const aprobo = ()=>{
    for (materia in materias){

        let asistencias = materias[materia][0];
        let promedio = materias[materia][1];
        let trabajos = materias[materia][2];
        
        console.log(materias[materia][3]);

        if(asistencias >= 90){
            console.log("%c   Asistencias en orden","color:green");
        }else{
            console.log("%c   Falta de asistencias","color:red");
        }
        
        if (promedio >= 7) {
            console.log("%c Promedio en orden", "color:green ");
            
        }else {
            console.log("%c   Promedio desaprobado","color:red");
        }
        
        if(trabajos >= 3){
            console.log("%c Trabajos en orden", "color:green ");
        }else {
            console.log("%c   Trabajos desaprobado","color:red");
        }
    }
}

aprobo();