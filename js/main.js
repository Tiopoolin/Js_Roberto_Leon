// Definir la estructura de un objeto para representar un producto
// function Producto(nombre, formato, tipo, receta) {
//     this.nombre = nombre;
//     this.formato = formato;
//     this.tipo = tipo;
//     this.receta = receta;
// }

// Crear una lista de productos
const productos = [
    { nombre: "Ketchup Kraft 650 gr", formato: 2, tipo: "Ketchup", receta: 32, img: "./img/ketchup.jpg" },
    { nombre: "Ketchup Kraft 850 gr", formato: 2, tipo: "Ketchup", receta: 32, img: "./img/ketchup.jpg" },
    { nombre: "Ketchup Kraft 450 gr", formato: 1, tipo: "Ketchup", receta: 32, img: "./img/ketchup.jpg" },
    { nombre: "Ketchup Kraft 250 gr", formato: 1, tipo: "Ketchup", receta: 32, img: "./img/ketchup.jpg" },
    { nombre: "Ketchup Kraft 1000 gr", formato: 3, tipo: "Ketchup", receta: 32, img: "./img/ketchup.jpg" },
    { nombre: "Ketchup acuenta 650 gr", formato: 2, tipo: "Ketchup", receta: "acuenta", img: "./img/ketchup.jpg" },
    { nombre: "Ketchup acuenta 850 gr", formato: 2, tipo: "Ketchup", receta: "acuenta", img: "./img/ketchup.jpg" },
    { nombre: "Ketchup acuenta 450 gr", formato: 1, tipo: "Ketchup", receta: "acuenta", img: "./img/ketchup.jpg" },
    { nombre: "Ketchup acuenta 250 gr", formato: 1, tipo: "Ketchup", receta: "acuenta", img: "./img/ketchup.jpg" },
    { nombre: "Ketchup acuenta 1000 gr", formato: 3, tipo: "Ketchup", receta: "acuenta", img: "./img/ketchup.jpg" },
    { nombre: "Ketchup Don Juan 650 gr", formato: 2, tipo: "Ketchup", receta: 30.5, img: "./img/ketchup.jpg" },
    { nombre: "Ketchup Don Juan 850 gr", formato: 2, tipo: "Ketchup", receta: 30.5, img: "./img/ketchup.jpg" },
    { nombre: "Ketchup Don Juan 450 gr", formato: 1, tipo: "Ketchup", receta: 30.5, img: "./img/ketchup.jpg" },
    { nombre: "Ketchup Don Juan 250 gr", formato: 1, tipo: "Ketchup", receta: 30.5, img: "./img/ketchup.jpg" },
    { nombre: "Ketchup Don Juan 1000 gr", formato: 3, tipo: "Ketchup", receta: 30.5, img: "./img/ketchup.jpg" },
    { nombre: "Mayonesa Kraft 650 gr", formato: 2, tipo: "Mayonesa", receta: 15, img: "./img/mayonesa.webp" },
    { nombre: "Mayonesa Kraft 850 gr", formato: 2, tipo: "Mayonesa", receta: 15, img: "./img/mayonesa.webp" },
    { nombre: "Mayonesa Kraft 450 gr", formato: 1, tipo: "Mayonesa", receta: 15, img: "./img/mayonesa.webp" },
    { nombre: "Mayonesa Kraft 250 gr", formato: 1, tipo: "Mayonesa", receta: 15, img: "./img/mayonesa.webp" },
    { nombre: "Mayonesa Kraft 1000 gr", formato: 3, tipo: "Mayonesa", receta: 15, img: "./img/mayonesa.webp" },
    { nombre: "Mayonesa acuenta 650 gr", formato: 2, tipo: "Mayonesa", receta: 19, img: "./img/mayonesa.webp" },
    { nombre: "Mayonesa acuenta 850 gr", formato: 2, tipo: "Mayonesa", receta: 19, img: "./img/mayonesa.webp" },
    { nombre: "Mayonesa acuenta 450 gr", formato: 1, tipo: "Mayonesa", receta: 19, img: "./img/mayonesa.webp" },
    { nombre: "Mayonesa acuenta 250 gr", formato: 1, tipo: "Mayonesa", receta: 19, img: "./img/mayonesa.webp" },
    { nombre: "Mayonesa acuenta 1000 gr", formato: 3, tipo: "Mayonesa", receta: 19, img: "./img/mayonesa.webp" },
    { nombre: "Mayonesa Don Juan 650 gr", formato: 2, tipo: "Mayonesa", receta: 41, img: "./img/mayonesa.webp" },
    { nombre: "Mayonesa Don Juan 850 gr", formato: 2, tipo: "Mayonesa", receta: 41, img: "./img/mayonesa.webp" },
    { nombre: "Mayonesa Don Juan 450 gr", formato: 1, tipo: "Mayonesa", receta: 41, img: "./img/mayonesa.webp" },
    { nombre: "Mayonesa Don Juan 250 gr", formato: 1, tipo: "Mayonesa", receta: 41, img: "./img/mayonesa.webp" },
    { nombre: "Mayonesa Don Juan 1000 gr", formato: 3, tipo: "Mayonesa", receta: 41, img: "./img/mayonesa.webp" }
];


const contenedorProductos = document.querySelector("#productosTotales");


productos.forEach((producto)=>{
    const div = document.createElement("div");
    // div.classList.add();
    div.innerHTML=`
    <img src="${producto.img}" alt="">
    <p>${producto.nombre}</p>
    <p>formato: ${producto.formato}</p>
    <p>Salsa: ${producto.tipo}</p>
    <p>Receta: ${producto.receta}</p>
    <button>Planificar</button>
    `;

    contenedorProductos.append(div);
})


















// Mostrar el listado de productos en la consola
console.log("Listado de productos:");
productos.forEach(function (producto) {
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
    // const primerProducto = prompt("Ingresa el nombre del primer producto que se fabricará:");
    const producto = productos.find(function (item) {
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

// Función para encontrar y mostrar los productos del formato 1
function mostrarFormatoUno(productos) {
    const formatoUno = productos.filter(function (producto) {
        return producto.formato === 1;
    });

    console.log("Productos del formato 1:");
    formatoUno.forEach(function (producto) {
        console.log(producto.nombre);
    });
}

// Llamar a la función para mostrar los productos del formato 1
mostrarFormatoUno(productos);

// Función para encontrar y mostrar los productos del formato 2
function mostrarFormatoDos(productos) {
    const formatoDos = productos.filter(function (producto) {
        return producto.formato === 2;
    });

    console.log("Productos del formato 2:");
    formatoDos.forEach(function (producto) {
        console.log(producto.nombre);
    });
}

// Llamar a la función para mostrar los productos del formato 2
mostrarFormatoDos(productos);

// Función para encontrar y mostrar los productos del formato 3
function mostrarFormatoTres(productos) {
    const formatoTres = productos.filter(function (producto) {
        return producto.formato === 3;
    });

    console.log("Productos del formato 3:");
    formatoTres.forEach(function (producto) {
        console.log(producto.nombre);
    });
}

// Llamar a la función para mostrar los productos del formato 3
mostrarFormatoTres(productos);

