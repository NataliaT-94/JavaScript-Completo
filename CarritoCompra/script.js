const db = {
    methods: {
        find: (id) =>{
            return db.items.find(item => item.id === id);//quiero que me regreses para cada elemento aquel elemento donde el id es igual al id que estoy colocando como parametro
        },
        remove: (items) =>{
            items.forEach(item => {
                const product = db.methods.find(item.id);
                product.qty = product.qty - item.qty;//actualizamos la cantidad del producto de la base de datos, con la cantidad de productos que se compro
            });
            console.log(db);
        },//removemos todos los elementos de nuestra base de datos
    },
    items: [
        {
            id: 0,
            title: "Fideos",
            price: 250,
            qty: 5,
        },
        {
            id: 1,
            title: "Harina",
            price: 345,
            qty: 10,
        },
        {
            id: 2,
            title: "arroz",
            price: 300,
            qty: 25,
        }
    ]
};//simulamos una basse de datos con objetos

const shoppingCart = {
    items: [],
    methods: {
        add: (id, qty) => {
            const cartItem = shoppingCart.methods.get(id);

            if(cartItem){
                if(shoppingCart.methods.hasInventory(id, qty + cartItem.qty)){//sumamos la cantidad de cosas que vamos a comprar junto con la cantidad que ya hayamos guardado en el carrito, si ese fuera el caso.

                    cartItem.qty += qty;

                }else{
                    alert("No hay inventario suficiente");
                }
            }else{
                shoppingCart.items.push({id, qty});// es el primer elemento dentro del carrito de compras
            }
        },//añadir un nuevo elemento al carrito de compras
        remove: (id, qty) => {
            const cartItem = shoppingCart.methods.get(id);

            if(cartItem.qty - qty > 0){
                cartItem.qty -= qty;
            }else{
                shoppingCart.items = shoppingCart.items.filter(item => item.id !== id);
            }
        },//eliminar un elemento del carrito de compras
        count: () => {
            return shoppingCart.items.reduce((acc, item)=> acc + item.qty, 0);
        },// sumamos cada producto por la cantidad. y que me devuelva la cuenta total de productos
        get: (id) => {
            const index =shoppingCart.items.findIndex(item => item.id === id);
            return index >= 0 ? shoppingCart.items[index] : null;//si el indice es mayor a 0, quiere decir que encontro un elemento voy a regresar shoppingCart.items en la posicion de mi indice, sino no encontro el elemento qu se pidio buscar.
        },
        getTotal: () => {
            const total = shoppingCart.items.reduce((acc, item)=>{
                const found = db.methods.find(item.id);
                return acc + found.price * item.qty;
            },0);
            return total;

        },//la suma del total del carrito de compras
        hasInventory: (id, qty) => {
            return db.items.find(item => item.id === id).qty - qty >= 0;//primero encontramos el elemento luego descontamos la cantidad que le estoy pasando como parametro, si el resultado el mayor a 0 es true sino false.
        },//no se puede comprar mas del inventario que existe
        purchase: () => {
            db.methods.remove(shoppingCart.items);
            shoppingCart.items = [];
        },//comprar todo lo que tengo en el carrito de compras

    },
};

renderStore();

function renderStore(){
    const html = db.items.map(item => {
        return `
            <div class="item">
                <div class="title">${item.title}</div>
                <div class="price">${numberToCurrency(item.price)}</div>
                <div class="qty">${item.qty} unidad</div>

                <div class="actions">
                    <button class="add" data-id="${item.id}">Añadir al carrito</button> 
                </div>
            </div>
        `;
    });

    document.querySelector("#store-container").innerHTML = html.join("");

    document.querySelectorAll('.item .actions .add').forEach(button =>{
        button.addEventListener('click', e =>{
            const id = parseInt(button.getAttribute('data-id'));//obtenemos el id
            const item = db.methods.find(id);//encontramos el elemento a traves de id

            if(item && item.qty - 1 >= 0){//si al incrementar el elemento y la cantidad sigue siendo mayor q 0, añadimos el elemento al shopping cart
                shoppingCart.methods.add(id, 1);
                renderShoppingCart();
            }else{
                console.log("ya no hay inventario");
            }
        });
    });
}

function renderShoppingCart(){
    const html = shoppingCart.items.map(item =>{
        const dbItem = db.methods.find(item.id);
        return `
            <div class="item">
                <div class="title">${dbItem.title}</div>
                <div class="price">${numberToCurrency(dbItem.price)}</div>
                <div class="qty">${item.qty} unidad</div>
                <div class="subtotal">
                    Subtotal:${numberToCurrency(item.qty * dbItem.price)}//*multiplicamos la cantidad de articulos que vamos a comprar por 
                </div>
                <div class="actions">
                    <button class="addOne" data-id="${item.id}">+</button>
                    <button class="removeOne" data-id="${item.id}">-</button>
                </div>
            </div>
        `;
    });

    const closeButton = `
        <div class="cart-header">
            <button class="bClose">Cerrar</button>
        </div>
    `;
    const purchaseButton = 
        shoppingCart.items.length > 0
        ? `
        <div class="cart-actions">
            <button id="bPurchase">Comprar</button>
        </div>
    `
        : "";// cuando el carrito de compra tiene elementos se imprime el texto sino un string vacio

    const total = shoppingCart.methods.getTotal();
    const totalContainer = 
        `<div class="total">
            Total:${numberToCurrency(total)}
        </div>`;

    const shoppingCartContainer = document.querySelector("#shopping-cart-container");

    shoppingCartContainer.classList.remove("hide");
    shoppingCartContainer.classList.add("show");

    shoppingCartContainer.innerHTML =
        closeButton + html.join("") + totalContainer + purchaseButton;

    document.querySelectorAll('.addOne').forEach(button =>{
        button.addEventListener('click', e =>{
            const id = parseInt(button.getAttribute("data-id"));
            shoppingCart.methods.add(id, 1);
            renderShoppingCart();
        });
    });

    document.querySelectorAll('.removeOne').forEach(button =>{
        button.addEventListener('click', e =>{
            const id = parseInt(button.getAttribute("data-id"));
            shoppingCart.methods.remove(id, 1);
            renderShoppingCart();
        });
    });

    document.querySelector('.bClose').addEventListener('click', e =>{
        shoppingCartContainer.classList.remove("show");
        shoppingCartContainer.classList.add("hide");
    });

    const bPurchase = document.querySelector('#bPurchase');

    if(bPurchase) {
        bPurchase.addEventListener('click', e=>{
            shoppingCart.methods.purchase();
            renderStore();
            renderShoppingCart();
        });
    }
};

function numberToCurrency(n){
    return new Intl.NumberFormat('en-US', { //API es para transformar un numero a una moneda
        maximumSignificantDigits: 2,//cantidad de digitos decimales
        style: 'currency',
        currency: 'USD'
    }).format(n);//aplicamos ese formato a mi variable
}