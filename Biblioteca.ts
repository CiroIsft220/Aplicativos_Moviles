interface Libro {
    titulo: string;
    autor: string;
    isbn: string;
    fechaPrestamo: string;
    fechaDevolucionPrevista: string;
    tipoUsuario: "estudiante" | "profesor" | "general";
    categoria: string;
};

interface ReporteMulta {
    titulo: string;
    diasRetraso: number;
    multa: number;
    tipoUsuario: string;
    categoria: string;
}

function agregarCero(num: number): string {
    return num < 10 ? "0" + num : "" + num;
}

function formatearFecha(fecha: Date): string {
    const año = fecha.getFullYear();
    const mes = agregarCero(fecha.getMonth() + 1);
    const dia = agregarCero(fecha.getDate());
    return `${año}-${mes}-${dia}`;
}

function CalcularDiasRetraso(fechaDevolucionPrevista: string, fechaActual: string): number {
    const devolucion = new Date(fechaDevolucionPrevista);
    const actual = new Date(fechaActual);
    const diferencia = actual.getTime() - devolucion.getTime();
    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    return dias > 0 ? dias : 0;
}

function aplicarDescuento(diasRetraso: number, fechaActual: string, fechaDevolucionPrevista: string): number {
    const actual = new Date(fechaActual);
    const devolucion = new Date(fechaDevolucionPrevista);
    const diasFaltantes = Math.floor((devolucion.getTime() - actual.getTime()) / (1000 * 60 * 60 * 24));
    return diasFaltantes <= 7 && diasFaltantes >= 0 ? 0.5 : 1;
}

function calcularMulta(diasRetraso: number, tipoUsuario: string): number {
    let tarifa = 0;
    switch (tipoUsuario) {
        case "estudiante":
            tarifa = 5;
            break;
        case "profesor":
            tarifa = 2;
            break;
        case "general":
            tarifa = 3;
            break;
        default:
            tarifa = 0;
    }
    return diasRetraso * tarifa;
}

function renovarPrestamo(libro: Libro, diasExtra: number): void {
    const fecha = new Date(libro.fechaDevolucionPrevista);
    fecha.setDate(fecha.getDate() + diasExtra);
    libro.fechaDevolucionPrevista = formatearFecha(fecha);
}

function procesarBiblioteca(Libros: Libro[], fechaActual: string): ReporteMulta[] {
    const reportes: ReporteMulta[] = [];
    for (const Libro of Libros) {
        const diasRetraso = CalcularDiasRetraso(Libro.fechaDevolucionPrevista, fechaActual);
        const descuento = aplicarDescuento(diasRetraso, fechaActual, Libro.fechaDevolucionPrevista);
        const multa = calcularMulta(diasRetraso, Libro.tipoUsuario) * descuento;
        reportes.push({
            titulo: Libro.titulo,
            diasRetraso,
            multa,
            tipoUsuario: Libro.tipoUsuario,
            categoria: Libro.categoria
        });
    }
    return reportes;
}

const LibrosEnPrestamo: Libro[] = [
    {
        titulo: "Yo, robot",
        autor: "Isaac Asimov",
        isbn: "9780194230698",
        fechaPrestamo: "2025-06-02",
        fechaDevolucionPrevista: "2025-06-27",
        tipoUsuario: "estudiante",
        categoria: "ficción"
    },
    {
        titulo: "1984",
        autor: "George Orwell",
        isbn: "9783103900095",
        fechaPrestamo: "2025-05-10",
        fechaDevolucionPrevista: "2025-05-19",
        tipoUsuario: "profesor",
        categoria: "ficción"
    },
    {
        titulo: "Mafalda",
        autor: "Joaquín Salvador Lavado (Quino)",
        isbn: "9789505156023",
        fechaPrestamo: "2025-06-01",
        fechaDevolucionPrevista: "2025-05-22",
        tipoUsuario: "general",
        categoria: "cómic"
    },
    {
        titulo: "El Principito",
        autor: "Antoine de Saint-Exupéry",
        isbn: "9780152048044",
        fechaPrestamo: "2025-06-26",
        fechaDevolucionPrevista: "2025-06-16",
        tipoUsuario: "estudiante",
        categoria: "ficción"
    }
];

const fechaHoy = "2025-06-27";
const reporteFinal = procesarBiblioteca(LibrosEnPrestamo, fechaHoy);

const nombreTipoUsuario = {
    estudiante: "Estudiante",
    profesor: "Profesor",
    general: "General"
};

const conteoPorTipo = {
    estudiante: 0,
    profesor: 0,
    general: 0
};

for (const libro of LibrosEnPrestamo) {
    conteoPorTipo[libro.tipoUsuario]++;
}

let sumaDiasRetraso = 0;
for (const reporte of reporteFinal) {
    sumaDiasRetraso += reporte.diasRetraso;
}
const promedioDias = sumaDiasRetraso / reporteFinal.length;

const multaPorCategoria: {[categoria: string]: number} = {};

for (let i = 0; i < LibrosEnPrestamo.length; i++) {
    const categoria = LibrosEnPrestamo[i].categoria;
    const multa = reporteFinal[i].multa;

    if (!(categoria in multaPorCategoria)) {
        multaPorCategoria[categoria] = 0;
    }

    multaPorCategoria[categoria] += multa;
}

console.log("=".repeat(40));
console.log("REPORTE DE BIBLIOTECA");
console.log("=".repeat(40));

for (let i = 0; i < LibrosEnPrestamo.length; i++) {
    const libro = LibrosEnPrestamo[i];
    const reporte = reporteFinal[i];

    console.log(`\nLibro: ${libro.titulo}`);
    console.log(`Autor: ${libro.autor}`);
    console.log(`Categoría: ${libro.categoria}`);

    console.log(`Usuario: ${nombreTipoUsuario[libro.tipoUsuario] || libro.tipoUsuario}`);

    if (reporte.diasRetraso > 0) {
        console.log(`Días de retraso: ${reporte.diasRetraso}`);
        console.log(`Multa: $${reporte.multa.toFixed(2)}`);
    } else {
        console.log("Estado: Sin retraso");
        console.log("Multa: $0");
    }
}

console.log("\nCantidad de libros por tipo de usuario:");
for (const tipo in conteoPorTipo) {
    const key = tipo as "estudiante" | "profesor" | "general";
    console.log(`- ${key}: ${conteoPorTipo[key]}`);
}

console.log(`\nPromedio de días de retraso: ${promedioDias.toFixed(2)}`);

console.log("\nMulta total por categoría:");
for (const cat in multaPorCategoria) {
    console.log(`- ${cat}: $${multaPorCategoria[cat].toFixed(2)}`);
}

console.log("=".repeat(40));