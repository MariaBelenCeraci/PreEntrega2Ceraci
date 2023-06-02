
const carrito =  []

class MiCarrito {
    constructor(carrito) {
        this.carrito = carrito
    }
    agregarProducto (){
        let productoIngresado = prompt ("👉Ingresa el ID del producto que quieras agregar (en la consola podrás ver todos los productos disponibles):")
        const nuevoProducto = productos.find ((producto)=> producto.id === parseInt(productoIngresado))
        
        if (nuevoProducto != undefined){
            if (nuevoProducto.stock > 0){
                nuevoProducto.stock = nuevoProducto.stock - 1
                this.carrito.push (nuevoProducto)
                let totalCarrito = this.carrito.reduce ((acc,producto)=> acc + producto.precio, 0)
                verCarrito()
                alert ("✅Hemos agregado " + nuevoProducto.nombre + " a tu carrito" +  "\n" + "Tu carrito tiene " + this.carrito.length + " items" +  "\n" + "Total a pagar: " + totalCarrito)
                
            } else{
                alert ("Lo sentimos no disponemos de stock del producto solicitado, porfavor elige otro producto")
            }
        }else{
            alert ("⛔El producto ingresado no es válido. Por favor ingresa un producto de nuestra lista")
        }
    }

    eliminarProducto(){
        verCarrito()
        let productoIngresado = prompt ("En consola podrás ver tu carrito. Ingresá el ID del producto que querés eliminar")
        const indice = this.carrito.findIndex ((producto)=> producto.id === productoIngresado) 
        this.carrito.splice (indice, 1)
    
        if (this.carrito.length > 0){
            verCarrito()
            alert ("✅Hemos eliminado el producto de tu carrito")
        }else{
            alert ("✅Hemos eliminado el producto de tu carrito. Ahora tu carrito está vacío")
            console.warn ("Se ha eliminado el producto. Ahora tu carrito está vacío")
        }
    }
}

function verTodos(){
    productos.sort ((a,b)=>{
        if (a.nombre > b.nombre) {
            return 1
        }   

        if (a.nombre < b.nombre) {
            return -1
        }  

    return 0
    })
    console.table (productos)
}

function verCarrito(){
    const miCarrito = carrito.map ((producto)=>{
        return{
            id: producto.id,
            nombre: producto.nombre,   
            precio: producto.precio,
        }
    })
    console.warn ("Tu carrito:")
    console.table (miCarrito)
}

function filtrarPorCategoria(){
    verTodos()
    let categoriaIngresada = prompt ("👉Ingresa una categoría" +  "\n" + 
    "Agenda  -  Artbag  -  Calendario  -  Cuadro  -  Taza")
    const filtrado = productos.filter ((producto)=> {return producto.categoria === categoriaIngresada.toUpperCase()}) 

    if (filtrado.length === 0){ 
        alert ("⛔La categoría ingresada no existe")
        console.warn ("La categoría ingresada no existe")
    } else {
        console.table (filtrado)
        alert ("✅Podrás ver los resultados de tu búsqueda en la consola")
    }
}

function darBienvenida (){
    verTodos()
    alert("Hola!🖐️ Bienvenido a mi tienda de ilustraciones. En la consola podrás ver todos los productos que ofrecemos. (Si no lo estás viendo, porfavor actualiza la página). Podrás agregar todos los productos que quieras a tu carrito, asi como eliminarlos. También podrás aplicar filtros en cualquier momento para facilitar tu búsqueda. ")
}

function iniciarCompra (){
    const nuevaCompra = new MiCarrito(carrito)
    let accion 

    do  {
        accion = prompt ("👉Ingresa la acción que deseas realizar (ingresar el número correspondiente): " + "\n" +
        "    1.  Filtrar:  filtra los productos por categoría" + "\n" +
        "    2.  Agregar:  agrega un producto al carrito" + "\n" +
        "    3.  Eliminar:  elimina un producto de tu carrito" + "\n" +
        "    4.  Ver todos los productos" + "\n" +
        "    5.  Finalizar la compra")

        switch (parseInt(accion)) {
            case 1:
            filtrarPorCategoria()
            break;

            case 2:
            nuevaCompra.agregarProducto()
            break;

            case 3:
            nuevaCompra.eliminarProducto()
            break;

            case 4:
            verTodos()
            break;
        
            case 5:
            accion = 5
            break;

            default:
            accion = 5

        }
    }  while (accion != 5)
}


function finalizarCompra (){
    verCarrito()
    let totalCarrito = carrito.reduce ((acc,producto)=> acc + producto.precio, 0) 
    alert ("Muchas gracias por tu compra! Podrás ver tu carrito en la consola. " + "\n" + 
    "✅Total a pagar: " + totalCarrito)
}    

darBienvenida()
iniciarCompra()
finalizarCompra()