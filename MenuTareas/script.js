const fecha = document.querySelector('#fecha');
const lista = document.querySelector('#lista');
const input = document.querySelector('#input');
const botonEnter = document.querySelector('#enter');
const check = 'fa-circle-check';
const uncheck = 'fa-circle';
const lineThrough = 'line-through';
//porque va cambiando
let id 
let LIST

//creacion de fecha

const FECHA = new Date();//llama a la funcion date que viene en el navegador
fecha.innerHTML = FECHA.toLocaleDateString("es-AR",{weekday:'long',month:'short',day:'numeric'})


//funcion agregar tarea
function agregarTarea(tarea,id,realizado,eliminado) {

    if (eliminado) {//si eliminado existe
        return//nada de la funcion agregar tarea se va a ejecutar
    }

    //operadores ternarios: '?' = true / ':' = false.
    const REALIZADO = realizado ?check :uncheck;// si realizo es true utilizar check, si es false  uncheck
    const LINE = realizado ?lineThrough :'';


    const elemento = `<li id="elemento">
                        <i class="fa-regular ${REALIZADO}" data="realizado" id=${id}></i>
                        <p class="text ${LINE}">${tarea}</p>
                        <i class="fa-solid fa-trash-can" data="eliminado" id=${id}></i>
                    </li>
                    ` ;//elemento es igual a tarea
    lista.insertAdjacentHTML("beforeend",elemento);//insertamos en el html antes de que termine la lista la tarea nueva(elemento)
};

//funcion tarea realizada
function tareaRealizada(element) {
    //toggle: permite cada vez que se ejecute cambiar de estado la visibilidad del elemento HTML
    // en este caso cambia la classe del element de check a uncheck y viseversa
    element.classList.toggle(check);
    element.classList.toggle(uncheck);
    //parentNode: para ver los elementos padre
    element.parentNode.querySelector('.text').classList.toggle(lineThrough);// dentro del elemento padre de element,identifica el .text y aqgregale o quita con el toggle la class lineThrough
    LIST[element.id].realizado = LIST[element.id].realizado ?false :true; //si el element realizado es true pasa a false y viseversa
}

//funcion tarea eliminada
function tareaEliminada(element) {
    //el padre de element es li, el padre de li es ul. remover hijo de ul, es decir remover (li)
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].eliminado = true;
}


botonEnter.addEventListener('click',()=>{
    const tarea = input.value; //tarea es igual al valor del input
    if(tarea){//si tarea existe
        agregarTarea(tarea,id,false,false);//agregamos la tarea, el id, la tarea no se realizo todavia por eso es false, tampoco se elimino por eso es false
        LIST.push({
            nombre: tarea,
            id: id,
            realizado: false,
            eliminado: false
        });
    }
    localStorage.setItem('TODO',JSON.stringify(LIST)); //TODO es el nombre que elejimos del archivo, transformamos el lenguaje usado a json
    input.value=''; //cuando se agrege la tarea se borra el input
    id++;//la nueva tarea cambia su id mas1
});

document.addEventListener('keyup', function(event){//al levantar la tecla realizar la funcion con parametro event
    if(event.key=="Enter"){ //si event es la tecla enter realizar lo siguiente
        const tarea = input.value;
        if(tarea){
            agregarTarea(tarea,id,false,false);
            LIST.push({
                nombre: tarea,
                id: id,
                realizado: false,
                eliminado: false
            });
        }
        localStorage.setItem('TODO',JSON.stringify(LIST));
        input.value='';
        id++;
    }
});


lista.addEventListener('click',function(event) {
    const element = event.target;//hace mencion al bloque del elemento
    const elementData = element.attributes.data.value; //hace mencion al valor del data del atributo del element

    if(elementData === 'realizado'){
        tareaRealizada(element);
    }
    else if (elementData === 'eliminado') {
        tareaEliminada(element);
    }
    localStorage.setItem('TODO',JSON.stringify(LIST));

})

//Metodos setItem = agregar
// getItem = obtener

//local storage get item
let data = localStorage.getItem('TODO');//data es igual a lo q obtenemos del localstorage
if(data){//si data existe
    LIST = JSON.parse(data);//obtenemos la lista en formato de la data
    id = LIST.length;//id es igual a lo largo de la lista
    cargarLista(LIST);//realizamos esta funcion
}else{
    LIST = [];
    id = 0;
}

function cargarLista(DATA){
    DATA.forEach(function(i){
        agregarTarea(i.nombre,i.id,i.realizado,i.eliminado);
    });
}