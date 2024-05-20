/*
Info 



Crear Soluciones
-Crear una funcion que al pasarle como parmetro la materia nos devuelva:
        --profesor asignado;
        --El nombre de todos los alumnos;
-Crear funcion que nos diga en cuantas clases esta cofla.
-Nombrar las clases en las que esta y los profesores de cada una.
*/

const obtenerInformacion = (materia)=>{
    materias = {
        fisica: ["Perez","pedro","pepito","maria"],
        programacion: ["Dalto","pedro","pepito",],
        logica: ["Hernandez","pepito","cofla","maria"],
        quimica: ["Rodriguez","pedro","pepito","cofla","maria"]
    }
    if(materias[materia] !== undefined){
        return[materias[materia],materia,materias];
    }else{
        return materias;
    }
}

const mostrarInformacion = (materia)=>{  
    let informacion = obtenerInformacion(materia);
    
    if(informacion !== false){
        let profesor = informacion[0][0];
        alumnos = informacion[0];
        alumnos.shift();//.shift() elimina el primer elemento.
        document.write(`El profesor de <b>${informacion[1]} </b> es: <b style:"color:red"> ${profesor}</b>
        Los alumnos son: <b style:"color:blue">${alumnos}</b><br><br>`);
    }
}

const cantidadDeClases = (alumno)=>{
    let informacion = obtenerInformacion();
    let clasesPresentes = [];
    let cantidadTotal = 0;
    for (info in informacion){
        if(informacion[info].includes(alumno)){
            cantidadTotal++;
            clasesPresentes.push(" " + info);
        }
    }
    return `<b>${alumno} </b> esta en <b>${cantidadTotal}</b> clases.
    Esta cursando las clases: <b>${clasesPresentes}</b>`;
}
mostrarInformacion("fisica");
mostrarInformacion("logica");
mostrarInformacion("programacion");
mostrarInformacion("quimica");

document.write(cantidadDeClases("cofla"));
