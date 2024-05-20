"use strict";
const IDBRequest = indexedDB.open("baseDtos",1);// le decimos que base de datos queremos abrir o crear y luego la version.
IDBRequest.addEventListener("upgradeneeded",()=>{
    const db = IDBRequest.result;
    db.createObjectStore("nombre",{
        autoIncrement: true
    });// primer parametro el nombre de la tabla segundo las keys.
});// si creamos una base de datos hay que ponerles las tablas.
IDBRequest.addEventListener("success",()=>{
    leerObjetos();
});
IDBRequest.addEventListener("error",()=>{
    console.log("Ocurrio un error al abrir la base de datos");			
});

document.getElementById('add').addEventListener("click", ()=>{
    let nombre = document.getElementById("nombre").value;
    if (nombre.length > 0){
        if(document.querySelector(".posible") != undefined){
            if(confirm("Hay un elemento sin guardar: ¿Quieres continuar?")){
                addObjetos({nombre: nombre.value});
                nombre.value = "";
                leerObjetos();
            }
        }else{
            addObjetos({nombre: nombre.value});
            nombre.value = "";
            leerObjetos();
        }
    }
});

const addObjetos = objeto =>{
    /*const  IDBtransaction = db.transaction("nombres","readwrite");//abrimos  una mosficacion en la tabra nombres, es leer y escribir.
    const objectStore = IDBtransaction.objctStore("nombre");// la modificacion se realiza en la tabla nombres.
    objectStore.add(objeto);// agregamos el objeto.
    IDBtransaction.addEventLiatener("complete", ()=>{
        console.log("objeto agregado correctamente");
    });*/
    const IDBData = getIDBData("readwrite","Objeto agregado correctamente");
    IDBData.add(objeto);
};

const leerObjetos = ()=>{
    /*const db = IDBRequest.result;
    const IDBtransaction = db.transaction("nombre","readonly");
    const objectStore = IDBtransaction.objectStore("nombres");
    const cursor = objectStore.openCursor();
    cursor.addEventListener("succes", ()=>{
        if(cursor.result){
            console.log(cursor.result.value);
            cursor.result.continue();
        }else console.log("todos los datos fueron leidos");
    });*/
    const IDBData = getIDBData("readonly");
    const cursor = IDBData.openCursor();
    const fragment = document.createDocumentFragment();
    document.querySelector(".nombres").innerHTML = "";
    cursor.addEventListener("success", ()=>{
        
        if(cursor.result){
            let elemento = nombreHTML(cursor.result.key,cursor.result.value);
            fragment.appendChild(elemento)
            cursor.result.continue()
        }else document.querySelector(".nombres").appendChild(fragment);
    })
};

const modificarObjetos = (key,objeto)=>{
   /* const db = IDBRequest.result;
    const IDBtransaction = db.transaction("nombre","readwrite");
    const objectStore = IDBtransaction.objectStore("nombres");
    objectStore.put(objeto,key);
    IDBtransaction.addEventListener("complete", ()=>{
        console.log("objeto modificado correctamente");
    });*/
    const IDBData = getIDBData("readwrite","Objeto modificado correctamente");
    IDBData.put(objeto,key);
};

 const eliminarObjetos = key =>{
    /*const db = IDBRequest.result;
    const IDBtransaction = db.transaction("nombre","readwrite");
    const objectStore = IDBtransaction.objectStore("nombres");
    objectStore.delete(key);
    IDBtransaction.addEventListener("complete", ()=>{
        console.log("objeto eliminado correctamente");
    });*/
    const IDBData = getIDBData("readwrite","Objeto eliminado correctamente");
    IDBData.delete(key);
};

const getIDBData =(mode,msg)=>{
    const db = IDBRequest.result;
    const IDBtransaction = db.transaction("nombre",mode);
    const objectStore = IDBtransaction.objectStore("nombre");
    IDBtransaction.addEventListener("complete",()=>{
        console.log(msg);
    });
    return objectStore;
};


const nombreHTML = (id,name) =>{
    const container = document.createElement("DIV");
    const h2 = document.createElement("h2");
    const options = document.createElement("DIV");
    const saveButton = document.createElement("button");
    const deleteButton = document.createElement("button");

    container.classList.add("nombre");
    options.classList.add("options");
    saveButton.classList.add("imposible");
    deleteButton.classList.add("delete");

    saveButton.textContent = "Guardar";
    deleteButton.textContent = "Eliminar";
 
    h2.textContent = name.nombre;
    h2.setAttribute("conteneditable", "true");
    h2.setAttribute("spellcheck", "false");

    options.appendChild(saveButton);
    options.appendChild(deleteButton);

    container.appendChild(h2);
    container.appendChild(options);

    h2.addEventListener("keyup",()=>{
        saveButton.classList.replace("imposible", "posible")
    });

    saveButton.addEventListener("click",()=>{
        if(saveButton.classList.contains("posible")){
            modificarObjetos(id, {nombre: h2.textContent});
            saveButton.classList.replace("posible", "imposible");
        }
    });
    
    

    deleteButton.addEventListener("click",()=>{
        eliminarObjetos(id);
        document.querySelector(".nombres").removeChild(container);
    });

    return container;
}