const prodPlan = [];

let productos = [];

const contenedorProductos = document.querySelector("#productosTotales");
const contenedorPlan = document.querySelector("#productosPlan");
const contenedorPlanificacion = document.querySelector("#planificacion");
const btnBorrarLocalStorage = document.getElementById("BorrarLocalStorage");

fetch("data/prod.json")
    .then(res => res.json())
    .then(data => {
        productos = data;
        mostrarProductos();

        // Cargar productos planificados desde localStorage si existen
        const storedProdPlan = localStorage.getItem('prodPlan');
        if (storedProdPlan) {
            prodPlan.push(...JSON.parse(storedProdPlan));
            actualizarPlan();
        }
    });

// Agregar evento de clic al botón
btnBorrarLocalStorage.addEventListener("click", () => {
    localStorage.clear();
    prodPlan.length = 0; // Limpiar el array de productos planificados
    contenedorPlan.innerHTML = ""; // Limpiar la interfaz
    contenedorPlanificacion.innerHTML = ""; // Limpiar la planificación
});

const agregarAlPlan = (producto) => {
    const itemIngresado = prodPlan.find(item => item.nombre === producto.nombre);
    if (!itemIngresado) {
        prodPlan.push(producto);
        // Guardar en localStorage
        localStorage.setItem('prodPlan', JSON.stringify(prodPlan));
        actualizarPlan();
    }
}

const borrarDelPlan = (producto) => {
    const index = prodPlan.findIndex(item => item.nombre === producto.nombre);
    if (index !== -1) {
        prodPlan.splice(index, 1);
        actualizarPlan(); // Llamar a esta función para actualizar la visualización del plan
        // Actualizar localStorage
        localStorage.setItem('prodPlan', JSON.stringify(prodPlan));
    }
}

const mostrarProductos = () => {
    productos.forEach((producto) => {
        const div = document.createElement("div");
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
        });

        div.append(btn);

        contenedorProductos.append(div);
    });
}

const calcularTiempoEspera = (producto, ultimoProducido) => {
    let tiempo = 0;
    if (producto.formato !== ultimoProducido.formato) tiempo += 240; // 4 horas de espera si el formato es diferente
    if (producto.tipo !== ultimoProducido.tipo) tiempo += 180; // 3 horas de espera si el tipo es diferente
    if (producto.receta !== ultimoProducido.receta) tiempo += 30; // 30 minutos de espera si la receta es diferente
    return tiempo;
};

const encontrarProductoEficiente = (prodPlan, producidos) => {
    let mejorProducto;
    let menorTiempo = Infinity;
    const ultimoProducido = producidos[producidos.length - 1];
    prodPlan.forEach((producto) => {
        if (!producidos.includes(producto)) {
            const tiempo = calcularTiempoEspera(producto, ultimoProducido);
            if (tiempo < menorTiempo) {
                mejorProducto = producto;
                menorTiempo = tiempo;
            }
        }
    });
    return mejorProducto;
};

const ordenarProductos = (primerProducto) => {
    const producidos = [primerProducto];
    while (producidos.length < prodPlan.length) {
        const producto = encontrarProductoEficiente(prodPlan, producidos);
        producidos.push(producto);
    }
    return producidos;
};

const planificarProduccion = (primerProductoNombre) => {
    const primerProducto = prodPlan.find((item) => item.nombre === primerProductoNombre);
    if (!primerProducto) {
        alert("El producto ingresado no está en la lista.");
        return;
    }
    
    // Ordenar el array de productos según la optimización solicitada
    const productosOrdenados = ordenarProductos(primerProducto);

    // Crear un nuevo array con los productos ordenados
    const planificacion = [...productosOrdenados];

    // Mostrar la planificación en el HTML
    mostrarPlanificacion(planificacion);
};

const mostrarPlanificacion = (productos) => {
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
        contenedorPlanificacion.append(div);
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
        btn.innerText = "Borrar";
        btn.addEventListener("click", () => {
            borrarDelPlan(producto);
        });

        div.append(btn);

        contenedorPlan.append(div);
    });
}
