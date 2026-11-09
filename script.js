
/* =========================================
   LISTA DE PRODUCTOS
========================================= */

const productos = [

    {
        nombre: "Bomber de paño",
        categoria: "PAÑOS",
        precioUnidad: 250,
        precioMayor: 220,
        tallas: ["S", "M", "L"],

        imagen: "imagenes/paños/bomber-paño.jpeg",

        imagenesColores: [
            "imagenes/paños/bom-paño-col1.jpeg",
            "imagenes/paños/bom-paño-col2.jpeg"
        ]
    },

    {
        nombre: "Casaca suede",
        categoria: "GAMUZADOS",
        precioUnidad: 190,
        precioMayor: 160,
        tallas: ["S", "M", "L"],

        imagen: "imagenes/gamuzados/casaca-suede.jpeg",

        imagenesColores: [
            "imagenes/gamuzados/cas-suede-col1.jpeg",
            "imagenes/gamuzados/cas-suede-col2.jpeg",
            "imagenes/gamuzados/cas-suede-col3.jpeg"
        ]
    },

    {
        nombre: "Chanel de paño",
        categoria: "PAÑOS",
        precioUnidad: 240,
        precioMayor: 210,
        tallas: ["S", "M", "L"],

        imagen: "imagenes/paños/chanel-paño.jpeg",

        imagenesColores: [
            "imagenes/paños/chan-paño-col1.jpeg",
            "imagenes/paños/chanel-paño-col2.jpeg"
        ]
    },

    {
        nombre: "Gabardina de paño",
        categoria: "PAÑOS",
        precioUnidad: 240,
        precioMayor: 210,
        tallas: ["S", "M", "L"],

        imagen: "imagenes/paños/gabardina-paño.jpeg",

        imagenesColores: [
            "imagenes/paños/gab-paño-col.jpeg"
        ]
    }

];


/* =========================================
   ELEMENTOS DEL HTML
========================================= */

const lista = document.getElementById("lista-productos");

const buscador = document.getElementById("buscar");

const limpiarBusqueda = document.getElementById("limpiar-busqueda");

const botones = document.querySelectorAll(".categoria");

const modal = document.getElementById("modal-producto");

const cerrarModal = document.getElementById("cerrar-modal");

const tituloModal = document.getElementById("titulo-modal");

const galeria = document.getElementById("galeria-colores");

const precioModal = document.getElementById("precio-modal");

const tallasModal = document.getElementById("tallas-modal");


/* =========================================
   CATEGORÍA INICIAL
========================================= */

let categoriaActual = "Todas";


/* =========================================
   MOSTRAR PRODUCTOS
========================================= */

function mostrarProductos() {

    lista.innerHTML = "";

    const texto = buscador.value.toLowerCase().trim();

    const filtrados = productos.filter(producto => {

        const coincideNombre =
            producto.nombre.toLowerCase().includes(texto);

        const categoriaSeleccionada =
            categoriaActual.toLowerCase();

        const coincideCategoria =
            categoriaSeleccionada === "todas" ||
            categoriaSeleccionada === "todos" ||
            producto.categoria.toLowerCase() === categoriaSeleccionada;

        return coincideNombre && coincideCategoria;

    });


    // SI NO HAY PRODUCTOS

    if (filtrados.length === 0) {

        lista.innerHTML = `
            <div class="sin-productos">
                <h3>Próximamente ♡</h3>
                <p>Estamos preparando nuestra colección.</p>
            </div>
        `;

        return;

    }


    // CREAR TARJETAS

    filtrados.forEach(producto => {

        const tarjeta = document.createElement("div");

        tarjeta.className = "tarjeta";

        tarjeta.innerHTML = `

            <img
                src="${producto.imagen}"
                alt="${producto.nombre}"
                class="foto-producto"
            >

            <div class="info-producto">

                <h3 class="nombre-producto">
                    ${producto.nombre}
                </h3>

                <div class="precios-producto">

                    <p class="precio-unidad">
                        Unidad: Bs. ${producto.precioUnidad}
                    </p>

                    <p class="precio-mayor">
                        Por mayor: Bs. ${producto.precioMayor}
                    </p>

                </div>

                <p class="texto-tallas">
                    Tallas disponibles
                </p>

                <div class="tallas">

                    ${producto.tallas.map(talla => `
                        <span>${talla}</span>
                    `).join("")}

                </div>

            </div>

        `;


        // ABRIR DETALLES AL PRESIONAR LA IMAGEN

        tarjeta.querySelector(".foto-producto")
            .addEventListener("click", () => {

                abrirModal(producto);

            });

        lista.appendChild(tarjeta);

    });

}


/* =========================================
   ABRIR VENTANA DEL PRODUCTO
========================================= */

function abrirModal(producto) {

    modal.style.display = "flex";

    tituloModal.textContent = producto.nombre;

    // LIMPIAR FOTOGRAFÍAS ANTERIORES

    galeria.innerHTML = "";


    // MOSTRAR TODAS LAS FOTOGRAFÍAS DE COLORES

    producto.imagenesColores.forEach(foto => {

        const imagen = document.createElement("img");

        imagen.src = foto;

        imagen.alt = "Colores disponibles de " + producto.nombre;

        imagen.className = "foto-color";

        galeria.appendChild(imagen);

    });


    // MOSTRAR PRECIOS

    precioModal.innerHTML = `

        <p class="precio-unidad">
            Precio por unidad: Bs. ${producto.precioUnidad}
        </p>

        <p class="precio-mayor">
            Precio por mayor: Bs. ${producto.precioMayor}
        </p>

    `;


    // MOSTRAR TALLAS

    tallasModal.textContent =
        "Tallas disponibles: " + producto.tallas.join(" · ");

}


/* =========================================
   CERRAR VENTANA
========================================= */

cerrarModal.addEventListener("click", () => {

    modal.style.display = "none";

});


modal.addEventListener("click", evento => {

    if (evento.target === modal) {

        modal.style.display = "none";

    }

});


document.addEventListener("keydown", evento => {

    if (evento.key === "Escape") {

        modal.style.display = "none";

    }

});


/* =========================================
   BUSCADOR
========================================= */

buscador.addEventListener("input", () => {

    mostrarProductos();

});


/* =========================================
   LIMPIAR BUSCADOR
========================================= */

limpiarBusqueda.addEventListener("click", () => {

    buscador.value = "";

    mostrarProductos();

});


/* =========================================
   FILTRAR CATEGORÍAS
========================================= */

botones.forEach(boton => {

    boton.addEventListener("click", () => {

        // QUITAR ESTILO ACTIVO DE LOS DEMÁS

        botones.forEach(b => {

            b.classList.remove("activa");

        });


        // ACTIVAR BOTÓN SELECCIONADO

        boton.classList.add("activa");

        categoriaActual = boton.dataset.categoria;

        mostrarProductos();

    });

});


/* =========================================
   INICIAR CATÁLOGO AUTOMÁTICAMENTE
========================================= */

// SELECCIONAR TODAS AL ABRIR LA PÁGINA

categoriaActual = "Todas";

botones.forEach(boton => {

    const categoria = boton.dataset.categoria.toLowerCase();

    boton.classList.toggle(
        "activa",
        categoria === "todas" || categoria === "todos"
    );

});


// MOSTRAR TODOS LOS PRODUCTOS

mostrarProductos();
