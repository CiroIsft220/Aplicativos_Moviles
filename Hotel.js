"use strict";
const capacidadHabitacion = {
    "Simple": 1,
    "Doble": 2,
    "Suite": 4
};
const precioServicios = {
    "Desayuno": 6500,
    "Limpieza": 3000,
    "Traslado": 5000,
    "Transporte": 5000,
    "Spa": 12000
};
const agregarCero = (num) => num < 10 ? "0" + num : "" + num;
const formatearFecha = (fecha) => `${fecha.getFullYear()}-${agregarCero(fecha.getMonth() + 1)}-${agregarCero(fecha.getDate())}`;
const fechaDMA = (fecha) => {
    const [dia, mes, año] = fecha.split('-').map(Number);
    return new Date(año, mes - 1, dia);
};
const calcularDiasEstadia = (ingreso, salida) => {
    const desde = fechaDMA(ingreso);
    const hasta = fechaDMA(salida);
    return Math.floor((hasta.getTime() - desde.getTime()) / (1000 * 60 * 60 * 24));
};
const calcularCostoBase = (tipo, dias, temporada) => {
    var _a, _b;
    const tarifas = {
        "Simple": { Alta: 100, Baja: 70 },
        "Doble": { Alta: 150, Baja: 100 },
        "Suite": { Alta: 250, Baja: 180 }
    };
    return ((_b = (_a = tarifas[tipo]) === null || _a === void 0 ? void 0 : _a[temporada]) !== null && _b !== void 0 ? _b : 0) * dias;
};
function calcularCostoServicios(servicios, dias) {
    let total = 0;
    for (let i = 0; i < servicios.length; i++) {
        const servicio = servicios[i];
        const precio = precioServicios[servicio] || 0;
        total += precio * dias;
    }
    return total;
}
const calcularDescuento = (subtotal, tipoHuesped, dias) => {
    let porcentaje = 0;
    if (tipoHuesped === "VIP")
        porcentaje = 0.2;
    else if (tipoHuesped === "Corporativo")
        porcentaje = 0.15;
    if (dias > 7)
        porcentaje += 0.05;
    return subtotal * porcentaje;
};
const renovarReserva = (reserva, diasExtra) => {
    const nuevaSalida = fechaDMA(reserva.fechaSalida);
    nuevaSalida.setDate(nuevaSalida.getDate() + diasExtra);
    reserva.fechaSalida = formatearFecha(nuevaSalida);
};
const extenderReserva = renovarReserva;
const sumar = (obj, clave, valor) => { var _a; return obj[clave] = ((_a = obj[clave]) !== null && _a !== void 0 ? _a : 0) + valor; };
const redondear2 = (num) => {
    return Math.round(num * 100) / 100 + "";
};
function procesarReservas(reservas) {
    return reservas.map(r => {
        const dias = calcularDiasEstadia(r.fechaIngreso, r.fechaSalida);
        const base = calcularCostoBase(r.tipoHabitacion, dias, r.temporada);
        const servicios = calcularCostoServicios(r.serviciosAdicionales, dias);
        const subtotal = base + servicios;
        const descuento = calcularDescuento(subtotal, r.tipoHuesped, dias);
        const total = subtotal - descuento;
        return {
            numeroReserva: r.numeroReserva,
            nombreHuesped: r.nombreHuesped,
            tipoHabitacion: r.tipoHabitacion,
            diasEstadia: dias,
            costoBase: base,
            costoServicios: servicios,
            descuento: descuento,
            costoTotal: total,
            temporada: r.temporada
        };
    });
}
const reservasHotel = [
    {
        numeroReserva: "1",
        nombreHuesped: "Juancito",
        tipoHabitacion: "Simple",
        fechaIngreso: "22-04-2025",
        fechaSalida: "29-04-2025",
        temporada: "Baja",
        tipoHuesped: "Regular",
        serviciosAdicionales: []
    },
    {
        numeroReserva: "2",
        nombreHuesped: "Uriel",
        tipoHabitacion: "Suite",
        fechaIngreso: "14-09-2024",
        fechaSalida: "14-10-2024",
        temporada: "Alta",
        tipoHuesped: "VIP",
        serviciosAdicionales: ["Desayuno", "Limpieza", "Traslado"]
    },
    {
        numeroReserva: "3",
        nombreHuesped: "Helena",
        tipoHabitacion: "Doble",
        fechaIngreso: "10-01-2023",
        fechaSalida: "10-01-2024",
        temporada: "Alta",
        tipoHuesped: "Corporativo",
        serviciosAdicionales: ["Desayuno", "Limpieza"]
    },
    {
        numeroReserva: "4",
        nombreHuesped: "Jessica",
        tipoHabitacion: "Simple",
        fechaIngreso: "25-03-2025",
        fechaSalida: "29-04-2025",
        temporada: "Baja",
        tipoHuesped: "Regular",
        serviciosAdicionales: ["Desayuno"]
    },
    {
        numeroReserva: "5",
        nombreHuesped: "Nestor",
        tipoHabitacion: "Suite",
        fechaIngreso: "30-06-2024",
        fechaSalida: "15-07-2024",
        temporada: "Alta",
        tipoHuesped: "VIP",
        serviciosAdicionales: ["Desayuno", "Limpieza", "Transporte", "Spa"]
    }
];
const reporteHotel = procesarReservas(reservasHotel);
const conteoTipo = {};
const totalPorHabitacion = {};
const totalPorTemporada = {};
let sumaDias = 0;
let totalDescuentos = 0;
for (const reserva of reporteHotel) {
    sumar(conteoTipo, reserva.tipoHabitacion, 1);
    sumar(totalPorHabitacion, reserva.tipoHabitacion, reserva.costoTotal);
    sumar(totalPorTemporada, reserva.temporada, reserva.costoTotal);
    sumaDias += reserva.diasEstadia;
    totalDescuentos += reserva.descuento;
}
const promedioDias = sumaDias / reporteHotel.length;
console.log("=".repeat(40));
console.log("REPORTE DE RESERVAS DEL HOTEL");
console.log("=".repeat(40));
for (const r of reporteHotel) {
    console.log(`\nReserva Nº: ${r.numeroReserva}`);
    console.log(`Huésped: ${r.nombreHuesped}`);
    console.log(`Habitación: ${r.tipoHabitacion} (Capacidad: ${capacidadHabitacion[r.tipoHabitacion]} personas)`);
    console.log(`Días: ${r.diasEstadia}`);
    console.log(`Costo base: $${redondear2(r.costoBase)}`);
    console.log(`Servicios: $${redondear2(r.costoServicios)}`);
    console.log(`Descuento: -$${redondear2(r.descuento)}`);
    console.log(`Total: $${redondear2(r.costoTotal)}`);
}
console.log("\nCantidad de reservas por tipo de habitación:");
for (const tipo in conteoTipo) {
    console.log(`- ${tipo}: ${conteoTipo[tipo]}`);
}
console.log(`\nPromedio de días de estadía: ${redondear2(promedioDias)} días`);
console.log("\nIngresos totales por tipo de habitación:");
for (const tipo in totalPorHabitacion) {
    console.log(`- ${tipo}: $${redondear2(totalPorHabitacion[tipo])}`);
}
console.log("\nIngresos totales por temporada:");
for (const temporada in totalPorTemporada) {
    console.log(`- ${temporada}: $${redondear2(totalPorTemporada[temporada])}`);
}
console.log(`\nTotal de descuentos aplicados: $${redondear2(totalDescuentos)}`);
console.log("=".repeat(40));
 
