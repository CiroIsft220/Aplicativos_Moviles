type Formulario = {

  id: number;
  nombre: string;
  email: string;
  telefono: string;
  edad: number;
  mensaje: string;
};

type ResultadoCampo = {

  campo: keyof Formulario;
  valido: boolean;
  mensaje: string;
};

type ResultadoFormulario = {

  id: number;
  camposValidos: ResultadoCampo[];
  esValido: boolean;
};

function validarNombre(nombre: string): ResultadoCampo {

  const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,50}$/;

  if (!nombre) {
    return { campo: "nombre", valido: false, mensaje: "❌ Error en nombre: El nombre no puede estar vacío" };
  }

  if (!regex.test(nombre)) {
    return { campo: "nombre", valido: false, mensaje: "❌ Error en nombre: Debe contener solo letras, espacios y entre 2 y 50 caracteres" };
  }

  return { campo: "nombre", valido: true, mensaje: "✅ Campo nombre válido" };
}

function validarEmail(email: string): ResultadoCampo {

  if (!email) {
    return { campo: "email", valido: false, mensaje: "❌ Error en email: El email no puede estar vacío" };
  }

  if (email.length > 100) {
    return { campo: "email", valido: false, mensaje: "❌ Error en email: El email no debe superar los 100 caracteres" };
  }

  const partes = email.split("@");

  if (partes.length !== 2 || !partes[0] || !partes[1] || !partes[1].includes(".")) {

    return { campo: "email", valido: false, mensaje: "❌ Error en email: El formato del email es inválido" };
  }

  return { campo: "email", valido: true, mensaje: "✅ Campo email válido" };
}

function validarTelefono(telefono: string): ResultadoCampo {

  if (!telefono) {
    return { campo: "telefono", valido: false, mensaje: "❌ Error en teléfono: El teléfono no puede estar vacío" };
  }

  const soloDigitos = telefono.replace(/[\s\-]/g, "");

  if (!/^\d+$/.test(soloDigitos) || soloDigitos.length < 8 || soloDigitos.length > 15) {

    return { campo: "telefono", valido: false, mensaje: "❌ Error en teléfono: El teléfono debe tener entre 8 y 15 dígitos válidos" };
  }

  return { campo: "telefono", valido: true, mensaje: "✅ Campo teléfono válido" };
}

function validarEdad(edad: number): ResultadoCampo {

  if (edad < 16 || edad > 99) {

    return { campo: "edad", valido: false, mensaje: "❌ Error en edad: La edad debe estar entre 16 y 99 años" };
  }

  return { campo: "edad", valido: true, mensaje: "✅ Campo edad válido" };
}

function validarMensaje(mensaje: string): ResultadoCampo {

  if (!mensaje) {
    return { campo: "mensaje", valido: false, mensaje: "❌ Error en mensaje: El mensaje no puede estar vacío" };
  }

  if (mensaje.length < 10 || mensaje.length > 500 || !/[a-zA-Z]/.test(mensaje)) {

    return { campo: "mensaje", valido: false, mensaje: "❌ Error en mensaje: El mensaje debe tener entre 10 y 500 caracteres y al menos una letra" };
  }

  return { campo: "mensaje", valido: true, mensaje: "✅ Campo mensaje válido" };
}

function validarFormulario(formulario: Formulario): ResultadoFormulario {

  console.log("=== VALIDANDO FORMULARIO ID:", formulario.id, "===");

  const resultados = [
    validarNombre(formulario.nombre),
    validarEmail(formulario.email),
    validarTelefono(formulario.telefono),
    validarEdad(formulario.edad),
    validarMensaje(formulario.mensaje),
  ];

  resultados.forEach(r => console.log(r.mensaje));

  const errores = resultados.filter(r => !r.valido);
  
  if (errores.length === 0) {
    console.log("🎉 ¡FORMULARIO VÁLIDO! Todos los campos son correctos.");
  } else {
    console.log("⚠️ FORMULARIO INCOMPLETO\nCorrija los siguientes errores:");
    errores.forEach(e => console.log("- " + e.mensaje));
  }

  return {
    id: formulario.id,
    camposValidos: resultados,
    esValido: errores.length === 0,
  };
}

const formularios: Formulario[] = [
  {
    id: 1,
    nombre: "María García",
    email: "maria.garcia@empresa.com",
    telefono: "011-1234-5678",
    edad: 28,
    mensaje: "Me gustaría recibir información sobre sus productos y servicios disponibles."
  },
  {
    id: 2,
    nombre: "A",
    email: "email_invalido",
    telefono: "123",
    edad: 10,
    mensaje: "Hola"
  },
  {
    id: 3,
    nombre: "",
    email: "",
    telefono: "",
    edad: 0,
    mensaje: ""
  },
  {
    id: 4,
    nombre: "Juan123",
    email: "test@@test.com",
    telefono: "123456789012345",
    edad: 25,
    mensaje: "Mensaje correcto pero con errores en otros campos"
  }
];

console.log("=== VALIDADOR DE FORMULARIO DE CONTACTO ===");

formularios.forEach(formulario => {
  validarFormulario(formulario);
  console.log("\n------------------------\n");
});