class Product{
    //<---PROPIEDADES---->
    constructor(name,price,year){
        this.name = name;
        this.price = price;
        this.year = year;
    }
}

class UI{//interfas
    //<---METODOS---->
    addProduct(product){//agrega
        const productList = document.getElementById('product-list');
        const element = document.createElement('div');//creamos un elemento div y le colocamos el produclist
        element.innerHTML =//diseñamos un HTML
         `
            <div class="card text-center mb-4">
                <div class="card-body">
                    <strong>Nombre del Producto</strong>: ${product.name}
                    <strong>Precio del Producto</strong>: ${product.price}
                    <strong>Año del Producto</strong>: ${product.year}
                    <a href="#" class="btn btn-danger" name="delete">Eliminar</a>
                </div>
            </div>
        `;
        productList.appendChild(element);//al productlist le agregamos como hijo el element
    }

    resetForm(){//resetea el formulario
        document.getElementById('product-form').reset();
    }

    deleteProduct(element){//elimina 
        if(element.name === 'delete'){//si el elemento tiene la propiedad name="delete"
            element.parentElement.parentElement.parentElement.remove();//elimina el elemento padre del padre del padre
            this.showMessage('El producto fue eliminado', 'danger');
        }
    }

    showMessage(message, cssClass){//mensaje
        const div = document.createElement('div');// creamos una constante div que crea un div
        div.className = `alert alert-${cssClass} mt-4`;//el div tiene un class
        div.appendChild(document.createTextNode(message));//dentro del div creamos un texto
        
            //mostrar en pantalla
        const container = document.querySelector('.container');
        const app = document.querySelector('#App');
        container.insertBefore(div, app);//en el container insertamos un div antes del app
        setTimeout(function(){
            document.querySelector('.alert').remove();
        }, 2000);//despues de 3 segundos remover el documento con clase alert

    }
}

//eventos del DOM
document.getElementById('product-form')
    .addEventListener('submit', function(e){//en cuanto de precione submit realizar la funcion
        const name = document.getElementById('name').value;//creamos una const name el cual va a tener el valor del name
        const price = document.getElementById('price').value;
        const year = document.getElementById('year').value;

        const product = new Product(name, price, year);

        const ui = new UI();

        if(name === '' || price === '' || year === ''){
            return ui.showMessage('Completar todos los campos', 'warning');
        }

        ui.addProduct(product);
        ui.resetForm();
        ui.showMessage('Producto ingresado correctamente', 'success');

        e.preventDefault();//evitamos que se recargue la pagina y podamos obtener los datos
    });

    document.getElementById('product-list')
        .addEventListener('click', function(e){
            const ui = new UI();
            ui.deleteProduct(e.target);//e.target para que comprueve si el enlace a quien dio click
        });