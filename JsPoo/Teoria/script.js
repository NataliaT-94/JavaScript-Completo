//----------abstraccion--------------

class Libro{
    constructor(titulo, autor, precio){//usamos el constructor para poder construir la estructura y sus propiedades que queresmos utilizar
        this._titulo = titulo;//con el this._titulo va a ser igual a la propiedad titulo de arriba
        this._autor = autor;// el guion bajo'_' indica que estas propiedades no deben ser modificadas por otros programadores.
        this._precio = precio;

    }
}
//Instancia de Libro

const libro1 = new Libro('1984', 'G.O', 300);//generamos un nuevo libro y le pasamos la informacion a las propiedades de la class
const libro2 = new Libro('Frankenstein', 'S.M', 250);

console.log(libro1._titulo);//this se transforma en libro1
console.log(libro1._autor);
console.log(libro1._precio);

console.log(libro2._titulo);//this se transforma en libro2
console.log(libro2._autor);
console.log(libro2._precio);

//-----------------------------------------------------------------
//seguridad

const _privado = new WeakMap();// weakMap se lo utiliza para mantener nuestras propiedades privadas.

class Libro{
    constructor(titulo, autor, precio){//usamos el constructor para poder construir la estructura y sus propiedades que queresmos utilizar
        const propiedades = {
            _titulo: titulo,
            _autor: autor,
            _precio: precio

        }
        

        _privado.set(this,{propiedades});//permite colocar nuestras propiedades como privadas
        //_privado.get();//nos permite obtener nuestras propiedades privadas
    }

    get titulo(){//obtiene el titulo de un libro
        return _privado.get(this).propiedades['_titulo'];
    }
    set titulo(newTitle){//modifica el titulo de un libro por newTitle
        return _privado.get(this).propiedades['_titulo'] = newTitle;
    }

    get autor(){
        return _privado.get(this).propiedades['_autor'];
    }
    set autor(newAutor){
        return _privado.get(this).propiedades['_autor'] = newAutor;
    }

    get precio(){
        return _privado.get(this).propiedades['_precio'];
    }
    set precio(newPrecio){
        return _privado.get(this).propiedades['_precio'] = newPrecio;
    }
    //------------polimorfismo-----------------

    obtenerDatos(){
        console.log(`Titulo: ${this.titulo}, Autor: ${this.autor}, Precio: ${this.precio}`);
    }
}
//Instancia de Libro

const libro1 = new Libro('1984', 'G.O', 300);
const libro2 = new Libro('Frankenstein', 'S.M', 250);

libro1.titulo = 'mil novecientos ochenta y cuatro';

console.log(libro1.titulo);//asi solo toma la informacion del get

//------------herencia-----------------

class Comic extends Libro{//Comic va a utilizar las mismas propiedades que la class Book
    constructor(nombre, autor, precio,ilustradores){
        super(nombre, autor, precio);//se utiliza para definir las propiedades con base a las que ya tenemos definidas en la class padre
        this.ilustradores = ilustradores;
    }

    agregarilustradores(newilustrador = []){//otra forma de agregar o modificar cuando esta en publico
        this.ilustradores.push(newilustrador);
    }

        //------------polimorfismo-----------------

        obtenerDatos(){
            super.obtenerDatos();
            console.log(`Ilustradores: ${this.ilustradores}`);
        }
}
const comic1 = new Comic('The Killing Joke', 'A.M', 150, ['B.B', 'J.H']);// es un array porque hay mas de un ilustrador


comic1.agregarilustradores('B.B');//asi lo agregamos

console.log(comic1.ilustradores);

class CarritoCompra{
    constructor(){
        this.producto = [];
    }

    agregarProducto(cantidad, precio){
        this.producto.push(...Array(cantidad).fill(precio));//al producto le agragamos un array el cual va a contener la cantidad, a esta cantidad le vamos a rellenar con el precio del producto
        // los '...' antes del Array se llama sprite opereitor: genera una copia del array anterior y luego le concatenamos el resto, asi no vamos a tener multiples elementos
    }

    compraProductos(){
        console.log(this.producto);
    }

    calcularTotal(){
        return this.producto
                .map(precio => precio)//map va a ejecutar una funcion sobre el precio de los productos
                .reduce((ac, precio)=> ac + precio, 0); //ac es un acumulador, el cual va a iniciar en 0 y por cada iteracion se le va sumando el precio

    }

    imprimirTicket(){
       console.log(`Total a pagar : ${this.calcularTotal()}`); 
    }
}

const carrito = new CarritoCompra();

carrito.agregarProducto(2, comic1.precio);
carrito.agregarProducto(1, libro1.precio);
carrito.compraProductos();
carrito.imprimirTicket();
