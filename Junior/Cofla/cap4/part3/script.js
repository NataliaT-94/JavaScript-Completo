/*
Info 



Crear Soluciones
-Crear una funcion para preguntarle a cofla en que materia se quiere inscribir.
-Si ya hay 20 alumnos anotados en la ,materia negarle la inscripcion.
-Si hay menos de 20 alumnos inscribir a cofla y añadirlo a la lista de alumnos.
*/
let materias = {
    fisica: ["Perez","pedro","pepito","maria"],
    programacion: ["Dalto","pedro","pepito",],
    logica: ["Hernandez","pepito","cofla","maria"],
    quimica: ["Rodriguez","pedro","pepito","cofla","maria"]
}


const inscribir = (alumno,materia)=>{
    personas = materias[materia];
    if(personas.length >= 21){
        document.write(`Lo siento ${alumno}, las clases de ${materia} ya estan llenas`);
    }else{
        personas.push(alumno);
        if(materia == "fisica"){
            mateias = {
                fisica: personas,
                programacion: materias['programacion'],
                logica: materias['logica'],
                quimica: materias['quimica']
            }
        }
        else if(materia == "programacion"){
            mateias = {
                fisica: materias['fisica'],
                programacion: personas,
                logica: materias['logica'],
                quimica: materias['quimica']
            }
        }
        else if(materia == "logica"){
            mateias = {
                fisica: materias['fisica'],
                programacion: materias['programacion'],
                logica: personas,
                quimica: materias['quimica']
            }
        }
        else if(materia == "quimica"){
            mateias = {
                fisica: materias['fisica'],
                programacion: materias['programacion'],
                logica: materias['logica'],
                quimica: personas
            }
        }
        document.write(`¡Felicidades ${alumno}! te has inscripto a ${materia} correctamente`);
    }
}

document.write(materias['fisica'] + "<br>");

inscribir("pedrito","fisica");