/*
Info 
Cofla esta sufriendo... ya que, a pesar de que cree contar con el 90% de asistencias y tener un promedio mayor a 7 / 10, no cree entregar el 75% de trabajos practicos entregados,
ya que necesita dividir las tareas que hara semanalmente, cofla debe, trabajar 8hs por dia durante dos semanas entre las cuales tiene que:
24hs estudiar, 24hs hacer trabajos practicos, 56hs de trabajar 8horas de hacer las cosas de la casa.


Crear Soluciones
-Organizar las actividades diariamente.
-Utilizar la consola para organizar todo.
-El tiempo por tarea no debe superar las 4horas.

Datos:


*/

 let trabajo = "240 min de Trabajo";
 let estudio = "100 min de estudio";
 let tp = "100 min de trabajos practicos";
 let homework = "30 min de cosas de la casa";
 let descanso = "10 min de descanso";

 console.log("TAREAS");

 for (let i = 0; i < 14; i++) {
    if (i == 0) {
        console.group("semana 1");
    }
    console.groupCollapsed("dia " + (i+1));
    console.log(trabajo);
    console.log(descanso);
    console.log(estudio);
    console.log(tp);
    console.log(homework);
    console.groupEnd();
    if(i == 7){
        console.groupEnd();
        console.groupCollapsed("semana 2");
    }
 }

 console.groupEnd();
 console.groupEnd();