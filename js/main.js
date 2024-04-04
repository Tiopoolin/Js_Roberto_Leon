// Definir la estructura de un objeto para representar un producto
function Producto(nombre, formato, tipo, receta) {
    this.nombre = nombre;
    this.formato = formato;
    this.tipo = tipo;
    this.receta = receta;
}

// Crear una lista de productos
const productos = [
    new Producto("Ketchup Kraft 650 gr", 2, "Ketchup", 32),
    new Producto("Ketchup Kraft 850 gr", 2, "Ketchup", 32),
    new Producto("Ketchup Kraft 450 gr", 1, "Ketchup", 32),
    new Producto("Ketchup Kraft 250 gr", 1, "Ketchup", 32),
    new Producto("Ketchup Kraft 1000 gr", 3, "Ketchup", 32),
    new Producto("Ketchup acuenta 650 gr", 2, "Ketchup", "acuenta"),
    new Producto("Ketchup acuenta 850 gr", 2, "Ketchup", "acuenta"),
    new Producto("Ketchup acuenta 450 gr", 1, "Ketchup", "acuenta"),
    new Producto("Ketchup acuenta 250 gr", 1, "Ketchup", "acuenta"),
    new Producto("Ketchup acuenta 1000 gr", 3, "Ketchup", "acuenta"),
    new Producto("Ketchup Don Juan 650 gr", 2, "Ketchup", 30.5),
    new Producto("Ketchup Don Juan 850 gr", 2, "Ketchup", 30.5),
    new Producto("Ketchup Don Juan 450 gr", 1, "Ketchup", 30.5),
    new Producto("Ketchup Don Juan 250 gr", 1, "Ketchup", 30.5),
    new Producto("Ketchup Don Juan 1000 gr", 3, "Ketchup", 30.5),
    new Producto("Mayonesa Kraft 650 gr", 2, "Mayonesa", 15),
    new Producto("Mayonesa Kraft 850 gr", 2, "Mayonesa", 15),
    new Producto("Mayonesa Kraft 450 gr", 1, "Mayonesa", 15),
    new Producto("Mayonesa Kraft 250 gr", 1, "Mayonesa", 15),
    new Producto("Mayonesa Kraft 1000 gr", 3, "Mayonesa", 15),
    new Producto("Mayonesa acuenta 650 gr", 2, "Mayonesa", 19),
    new Producto("Mayonesa acuenta 850 gr", 2, "Mayonesa", 19),
    new Producto("Mayonesa acuenta 450 gr", 1, "Mayonesa", 19),
    new Producto("Mayonesa acuenta 250 gr", 1, "Mayonesa", 19),
    new Producto("Mayonesa acuenta 1000 gr", 3, "Mayonesa", 19),
    new Producto("Mayonesa Don Juan 650 gr", 2, "Mayonesa", 41),
    new Producto("Mayonesa Don Juan 850 gr", 2, "Mayonesa", 41),
    new Producto("Mayonesa Don Juan 450 gr", 1, "Mayonesa", 41),
    new Producto("Mayonesa Don Juan 250 gr", 1, "Mayonesa", 41),
    new Producto("Mayonesa Don Juan 1000 gr", 3, "Mayonesa", 41)
];


// Mostrar el listado de productos en la consola
console.log("Listado de productos:");
productos.forEach(function(producto) {
    console.log(producto.nombre);
});


// Función para calcular el tiempo de espera para producir un producto
function calcularTiempoEspera(producto, producidos) {
    let tiempo = 0;
    for (let i = 0; i < producidos.length; i++) {
        const prod = producidos[i];
        if (producto.formato !== prod.formato) tiempo += 240; // 4 horas de espera si el formato es diferente
        if (producto.tipo !== prod.tipo) tiempo += 180; // 3 horas de espera si el tipo es diferente
        if (producto.receta !== prod.receta) tiempo += 30; // 30 minutos de espera si la receta es diferente
    }
    return tiempo;
}

// Función para encontrar el producto más eficiente para producir
function encontrarProductoEficiente(producidos) {
    let mejorProducto;
    let menorTiempo = Infinity;
    for (let i = 0; i < productos.length; i++) {
        let producto = productos[i];
        if (!producidos.includes(producto)) { // Verificar si el producto ya ha sido producido
            let tiempo = calcularTiempoEspera(producto, producidos);
            if (tiempo < menorTiempo) {
                mejorProducto = producto;
                menorTiempo = tiempo;
            }
        }
    }
    return mejorProducto;
}

// Función para planificar la producción
function planificarProduccion() {
    const producidos = [];
    const primerProducto = prompt("Ingresa el nombre del primer producto que se fabricará:");
    const producto = productos.find(function(item) {
        return item.nombre === primerProducto;
    });
    if (!producto) {
        alert("El producto ingresado no está en la lista.");
        return;
    }
    producidos.push(producto);
    console.log("Primer producto: " + producto.nombre);
    while (producidos.length < productos.length) {
        const producto = encontrarProductoEficiente(producidos);
        producidos.push(producto);
        console.log("Siguiente producto: " + producto.nombre);
    }
}

// Llamar a la función para planificar la producción
planificarProduccion();