
const prodPlan = [];

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
const contenedorPlan = document.querySelector("#productosPlan");

productos.forEach((producto) => {
    const div = document.createElement("div");
    // div.classList.add();
    div.innerHTML = `
    <img src="${producto.img}" alt="">
    <p>${producto.nombre}</p>
    <p>Formato: ${producto.formato}</p>
    <p>Salsa: ${producto.tipo}</p>
    <p>Receta: ${producto.receta}</p>
   
    `;

    const btn = document.createElement("button");
    btn.classList.add("btnplan");
    btn.innerText = "Planificar";
    btn.addEventListener("click", () => {
        agregarAlPlan(producto);
    })

    div.append(btn);

    contenedorProductos.append(div);
})

const agregarAlPlan = (producto) => {
    const itemIngresado = prodPlan.find(item => item.nombre === producto.nombre);
    if (!itemIngresado) {
        prodPlan.push(producto);
        actualizarPlan();
    }
}

const borrarDelPlan = (producto) => {
    const index = prodPlan.findIndex(item => item.nombre === producto.nombre);
    if (index !== -1) {
        prodPlan.splice(index, 1);
        actualizarPlan(); // Llamar a esta función para actualizar la visualización del plan
    }
}





const calcularTiempoEspera = (producto, producidos) => {
    let tiempo = 0;
    producidos.forEach((prod) => {
        if (producto.formato !== prod.formato) tiempo += 240; // 4 horas de espera si el formato es diferente
        if (producto.tipo !== prod.tipo) tiempo += 180; // 3 horas de espera si el tipo es diferente
        if (producto.receta !== prod.receta) tiempo += 30; // 30 minutos de espera si la receta es diferente
    });
    return tiempo;
};

const encontrarProductoEficiente = (prodPlan, producidos) => {
    let mejorProducto;
    let menorTiempo = Infinity;
    prodPlan.forEach((producto) => {
        if (!producidos.includes(producto)) {
            const tiempo = calcularTiempoEspera(producto, producidos);
            if (tiempo < menorTiempo) {
                mejorProducto = producto;
                menorTiempo = tiempo;
            }
        }
    });
    return mejorProducto;
};

const ordenarProductos = (producidos) => {
    return prodPlan.sort((a, b) => {
        let tiempoA = calcularTiempoEspera(a, producidos);
        let tiempoB = calcularTiempoEspera(b, producidos);
        return tiempoA - tiempoB;
    });
};

const planificarProduccion = (primerProducto) => {
    const producidos = [];
    const productoInicial = prodPlan.find((item) => item.nombre === primerProducto);
    if (!productoInicial) {
        alert("El producto ingresado no está en la lista.");
        return;
    }
    producidos.push(productoInicial);
    console.log("Primer producto: " + productoInicial.nombre);
    
    // Ordenar el array de productos según la optimización solicitada
    const productosOrdenados = ordenarProductos(producidos);

    // Crear un nuevo array con los productos ordenados
    const planificacion = [...productosOrdenados];

    // Mostrar la planificación en el HTML
    mostrarPlanificacion(planificacion);
};

const mostrarPlanificacion = (productos) => {
    const contenedorPlanificacion = document.querySelector("#planificacion");
    contenedorPlanificacion.innerHTML = "";
    productos.forEach((producto) => {
        const div = document.createElement("div");
        div.innerHTML = `  
        <img src="${producto.img}" alt="">
        <p>${producto.nombre}</p>
        <p>Formato: ${producto.formato}</p>
        <p>Salsa: ${producto.tipo}</p>
        <p>Receta: ${producto.receta}</p>   
        `;

        contenedorPlanificacion.appendChild(div);
    });
};



const actualizarPlan = () => {
    contenedorPlan.innerHTML = "";
    prodPlan.forEach((producto) => {
        const div = document.createElement("div");
        div.innerHTML = `  
        <img src="${producto.img}" alt="" onclick="planificarProduccion('${producto.nombre}')">
        <p>${producto.nombre}</p>
        <p>Formato: ${producto.formato}</p>
        <p>Salsa: ${producto.tipo}</p>
        <p>Receta: ${producto.receta}</p>   
        `;

        const btn = document.createElement("button");
        btn.classList.add("btnplan");
        btn.innerText = "borrar";
        btn.addEventListener("click", () => {
            borrarDelPlan(producto);
        })

        div.append(btn);

        contenedorPlan.append(div);
    })
}
