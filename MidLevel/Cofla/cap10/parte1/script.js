/*
Info 

    Cofla esta en su ultimo año y necesita recuperar todas sus notas para que le puedadn decir si efectivamente paso al ultimo semestre, de ser asi...
cofla ya estaria a un solo paso de finalizar su carrera como ingeniero! pero hay un problema: Estas notas estan almacenadas en otro servidor.  
Crear Soluciones

- Crear un sistema que almacene toda la informacion de las materias y las muestre en pantalla de forma ordenada.
*/

const materiasHTML = document.querySelector(".materias");

const materias =[
    {
        nombre: "Fisica 4",
        nota: 7
    },{
        nombre: "Calculo 3",
        nota: 8
    },{
        nombre: "Matematicas 2",
        nota: 9
    },{
        nombre: "Programacion 4",
        nota: 7
    },{
        nombre: "Bases de datos 4",
        nota: 8
    }
];

const obtenerMateria = (id)=>{
    return new Promise((resolve,reject)=>{
        materia = materias[id];
        if(materia == undefined) reject("La materia no existe");
        else setTimeout(()=>{resolve(materia)},Math.random()*1400);
    })
};

const devolverMaterias = async ()=>{
    let materia =[];
    for (let i = 0; i< materias.length; i++){
        materia[i] = await obtenerMateria(i);
        let newHTMLCode =`
        <div class="materia">
            <div class="nombre">${materia[i].nombre}</div>
            <div class="nota">${materia[i].nota}</div>
        </div> `;
        materiasHTML.innerHTML += newHTMLCode;
    }
}

devolverMaterias();