interface Estudiante {

    nombre: string;
    apellido: string;
    notas: number[];
    promedio?: number;
    estado?: string;
}

function calcularPromedio (notas: number[]): number {

    let suma = 0;
    for (let i = 0; i < notas.length; i++) {
        suma += notas[i];
    };

    let promedio = suma / notas.length;
    return Math.floor (promedio * 100) / 100;
};

function estado (promedio: number): string {

    if (promedio >= 7) return "Promocionado";
    if (promedio >= 4) return "Aprobado";
    return "Desaprobado";
}

let estudiantes: Estudiante [] = [

{
    nombre: "Jose",
    apellido: "Hernandez",
    notas: [9, 9, 9]
},
{
    nombre: "Juliana",
    apellido: "Gutierrez",
    notas: [3,3,7]
},
{
    nombre: "Jazmin",
    apellido: "Gimenez",
    notas: [2,4,8]
},
{
    nombre: "Jeronimo",
    apellido: "Gonzalez",
    notas: [6,10,2]
},
{
    nombre: "Jacinto",
    apellido: "Vasquez",
    notas: [4,5,8]
}];

estudiantes.forEach ((estudiante) => {

    estudiante.promedio = calcularPromedio (estudiante.notas);
    estudiante.estado = estado (estudiante.promedio);
});

console.log ("===== REPORTE FINAL DE NOTAS =====");
estudiantes.forEach ((estudiante) => {

    console.log ( `Alumno: ${estudiante.nombre} | Notas: ${estudiante.notas.join(", ")} | ` + `Promedio: ${estudiante.promedio} | Estado: ${estudiante.estado}`
    );
});

const promedios = estudiantes.map (e => e.promedio ?? 0);
const promedioGeneral = calcularPromedio (promedios);

console.log ("\n Promedio general de la clase:", promedioGeneral);