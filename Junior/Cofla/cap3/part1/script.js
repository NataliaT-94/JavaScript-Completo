/*
Info 



Crear Soluciones
-Crear un sistema para mostrarle a cofla las particularidades de los 3 celulares elegidos.
-Cada celular debe tener color, peso, resolucion de pantalla, resolucion e camara y memoria ram.
-Cada celular debe poder prender, reiniciar, tomar fotos y grabar.

-crear dos celulares de alta gama, implementar las cualidades anteriores pero con mejores caracteristicas
 y agregar grabar en camara super lenta, tiene reconocimiento facial y una camara extra.

 -Crear un sistema que ayude a cofla a decidir cual app descargar.
 -La informacion de los instaladores debe contener la cantidad de descargas, la puntuacion y el peso.
 -Las Apps se deben poder instalar, abrir, cerrar y desinstalar.
*/
/*
class Celular{
    constructor(color,peso,tamaño,rdc,ram){
        this.color = color;
        this.peso = peso;
        this.tamaño = tamaño;
        this.resolucionDeCamara = rdc;
        this.memoriaRam = ram;
        this.encendido = false;
    }
    presionarBotonEncendido(){
        if (this.encendido == false) {
            alert("celular prendido");
            this.encendido = true;
        }else{
            alert("celular apagado");
            this.encendido = false;
        }
    }
    reiniciar(){
        if(this.encendido == true){
            alert("reiniciando celular");
        }else{
            alert("el celular esta apagado");
        }
    }
    tomarFoto(){
        alert(`foto tomada en una resolucion de: ${this.resolucionDeCamara}`);
    }
    grabarVideo(){
        alert(`grabando video en una resolucion de: ${this.resolucionDeCamara}`);
    }
    mobileInfo(){
        return `
            Color: <b>${this.color}</b></br>
            Peso: <b>${this.peso}</b></br>
            Tamaño: <b>${this.tamaño}</b></br>
            Resolucion de Video: <b>${this.resolucionDeCamara}</b></br>
            Memoria Ram: <b>${this.memoriaRam}</b></br>
        `;
    }
}

class CelularAltaGama extends Celular{
    constructor(color,peso,tamaño,rdc,ram,rdce){
        super(color,peso,tamaño,rdc,ram);
        this.resolucionDeCamaraExtra = rdce;
    }
    grabarVideoLento(){
        alert("estas grabando en camara lenta");
    }
    reconocimientoFacial(){
        alert("vamos a iniciar un reconocimiento facial");
    }
    infoAltaGama(){
        return this.mobileInfo() + `Resolucion de Camara Extra: ${this.resolucionDeCamaraExtra}`;
    }
}


/*celular1 = new Celular("rojo","150g","5'","full hd","3GB");
celular2 = new Celular("azul","155g","5'","full hd","2GB");
celular3 = new Celular("verde","150g","5'","hd","2GB");

celular1.presionarBotonEncendido();
celular1.tomarFoto();
celular1.grabarVideo();
celular1.reiniciar();
celular1.presionarBotonEncendido();

document.write(`
    ${celular1.mobileInfo()}<br>
    ${celular2.mobileInfo()}<br>
    ${celular3.mobileInfo()}
`)
*/
/*
celular1 = new CelularAltaGama("rojo","142g","5.5'","4K","4GB","full hd");
celular2 = new CelularAltaGama("azul","150g","6'","4K","3GB","full hd");

document.write(`
    ${celular1.infoAltaGama()}<br>
    ${celular2.infoAltaGama()}
`)
*/
class App{
    constructor(descargas,puntuacion,peso){
        this.descargas = descargas;
        this.puntuacion = puntuacion;
        this.peso = peso;
        this.iniciada = false;
        this.instalada = false;
    }
    instalar(){
        if(this.instalada == false){
            this.iniciada = true;
            alert("app instalada correctamente");
        } 
    }
    desinstalar(){
        if(this.instalada == true){
            this.iniciada = false;
            alert("app instalada correctamente");
        } 
    }
    abrir(){
           if(this.iniciada == false && this.instalada == true){
            this.iniciada = true;
            alert("app iniciada");
        }
    }
    cerrar(){
        if(this.iniciada == true && this.instalada == true){
            this.iniciada = false;
            alert("app cerrada");
        } 
    }
    appInfo(){
        return`
            Descargas:<b>${this.descargas}</b></br>
            Puntuacion:<b>${this.puntuacion}</b></br>
            Peso:<b>${this.peso}</b></br>
        `
    }
}

app = new App("16.000","5 estrellas","900mb");

app.instalar();
app.desinstalar();

document.write(`
    ${app.appInfo()}<br>

`)