interface Producto {

    nombre: string;
    cantidad: number;
    precio: number;
    descuento?: number;
};

function facturarProductos(productos: Producto[]): number
    {let total: number = 0;

    for (const producto of productos) {

        let precioUnitario = producto.precio;

if (producto.descuento) {
    precioUnitario = precioUnitario * (1 - producto.descuento / 100); 
}

total += precioUnitario * producto.cantidad;
    }

return total;

};

const productosAFacturar: Producto[] = [ { 
    nombre: "Laptop Gaming", 
    precio: 1200,
    cantidad: 1,
    descuento: 10
    },

    {
    nombre: "Mouse Inalámbrico",
    precio: 25,
    cantidad: 2
    
    },

    { 
    nombre: "Monitor 24\"", 
    precio: 300, 
    cantidad: 1, 
    descuento: 5
    },

    { 
    nombre: "Teclado Mecánico", 
    precio: 80, 
    cantidad: 1, 
    descuento: 15
    }
];

const totalFactura = facturarProductos(productosAFacturar); 

console.log("=".repeat(50));
console.log(" FACTURA DE PRODUCTOS");
console.log("=".repeat(50));

console.log("\nDetalle de productos:");
console.log("-".repeat(50));

productosAFacturar.forEach((producto, index) => {

const precioUnitarioConDescuento = producto.descuento 
? producto.precio * (1 - producto.descuento / 100)
: producto.precio;

const subtotal = precioUnitarioConDescuento * producto.cantidad;
console.log(`${index + 1}. ${producto.nombre}`);
console.log(` Precio unitario: $${producto.precio.toFixed(2)}`); if (producto.descuento) {

console.log(` Descuento: ${producto.descuento}%`); 
console.log(` Precio con descuento: $${precioUnitarioConDescuento.toFixed(2)}`);
}

console.log(` Cantidad: ${producto.cantidad}`);
console.log(` Subtotal: $${subtotal.toFixed(2)}`);
console.log("");
});

console.log("-".repeat(50));
console.log(`TOTAL A PAGAR: $${totalFactura.toFixed(2)}`);
console.log("=".repeat(50))