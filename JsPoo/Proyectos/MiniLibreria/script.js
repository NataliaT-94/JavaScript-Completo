/* 
+Descripcion: Simular un sistema de Almacenamiento de libros y comics
+Propiedades a registrar para cada objeto:
-Libros: titulo, autor, precio, stock y un id
-Comics: esla misma informacion que libros, mas: ilustradores y volumen.
+Los usiarios no podran modificar ningun valor.
+Funciones: cada objeto podra mostrar su informacion completa
*/

class Book{
    //se declaran las propiedades fuera del constructor, para que pueda funcionar
    #title
    #author
    #price
    #stock
    #id
    constructor(title, author, price, stock, id){
        //el '#' significa que la propiedad esta en privado
        this.#title = title;
        this.#author = author;
        this.#price = price;
        this.#stock = stock;
        this.#id = id;
    }

    getInfo(){
        let info = `
                    Titulo: ${this.#title}, 
                    Autor: ${this.#author}, 
                    Precio: ${this.#price},
                    ID:  ${this.#id},
                    `;

        if(this.#stock > 0){//si en el estock hay mas de 0 
            info += `Cantidad: ${this.#stock} `;//cantidad es igual al stock
        }else{//si el stock es igual a 0
            info += `No disponible `;// no hay libros
        }
 
        console.log(info);
    }

/*// es otra forma para llamar al objeto
    get title(){
        return this.#title;
    }
    set title(new_title){
        this.#title = new_title;
    }

    get author(){
        return this.#author;
    }
    get price(){
        return this.#price;
    }
    get stock(){
        return this.#stock;
    }
    get id(){
        return this.#id;
    }
*/
}

class Comic extends Book{
    #illustrators
    #vol
    constructor(title, author, price, stock, id, illustrators, vol){
        super(title, author, price, stock, id);
        this.#illustrators = illustrators;
        this.#vol = vol;
    }

    getInfo(){
        let info = ` Ilustradores: ${this.#illustrators.toString()}, Volumen: ${this.#vol}`;
        super.getInfo();
        console.log(info);
    }
}

const book1 = new Book('El cuento numero trece', 'D.setterfield', 150.000, 50, 1);
const book2 = new Book('El tiempo que tuvimos', 'C.Chic', 250.000, 0, 2);

const comic1 = new Comic('Batman the k.j', 'A.M', 100.000, 20, 1, ['B.B', 'J.H'], 2);




//book1.title = 'Hola mundo';
book1.getInfo();
book2.getInfo();

comic1.getInfo();

