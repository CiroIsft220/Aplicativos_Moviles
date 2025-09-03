function calcularPromedio(notas) {
    let suma = 0;
    for (let i = 0; i < notas.length; i++) {
        suma += notas[i];
    }
    ;
    let promedio = suma / notas.length;
    return Math.floor(promedio * 100) / 100;
}
;
function estado(promedio) {
    if (promedio >= 7)
        return "Promocionado";
    if (promedio >= 4)
        return "Aprobado";
    return "Desaprobado";
}
let estudiantes = [
    {
        nombre: "Jose",
        apellido: "Hernandez",
        notas: [9, 9, 9]
    },
    {
        nombre: "Juliana",
        apellido: "Gutierrez",
        notas: [6, 3, 7]
    },
    {
        nombre: "Jazmin",
        apellido: "Gimenez",
        notas: [2, 4, 8]
    },
    {
        nombre: "Jeronimo",
        apellido: "Gonzalez",
        notas: [6, 10, 2]
    },
    {
        nombre: "Jacinto",
        apellido: "Vasquez",
        notas: [4, 5, 8]
    }
];
estudiantes.forEach((estudiante) => {
    estudiante.promedio = calcularPromedio(estudiante.notas);
    estudiante.estado = estado(estudiante.promedio);
});
console.log("===== REPORTE FINAL DE NOTAS =====");
estudiantes.forEach((estudiante) => {
    console.log(`Alumno: ${estudiante.nombre} | Notas: ${estudiante.notas.join(", ")} | ` + `Promedio: ${estudiante.promedio} | Estado: ${estudiante.estado}`);
});
const promedios = estudiantes.map(e => { var _a; return (_a = e.promedio) !== null && _a !== void 0 ? _a : 0; });
const promedioGeneral = calcularPromedio(promedios);
console.log("\n Promedio general de la clase:", promedioGeneral);
