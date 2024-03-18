// Función para solicitar el sueldo en múltiplos de 50.000
function solicitarSueldo() {
    let sueldo = parseInt(prompt("Por favor, ingresa tu sueldo en múltiplos de 50,000:"));
    while (sueldo % 50000 !== 0) {
        sueldo = parseInt(prompt("Por favor, ingresa tu sueldo en múltiplos de 50,000:"));
    }
    return sueldo;
}

// Función para verificar si el sueldo está sobre o bajo la media
function verificarMedia(sueldo) {
    if (sueldo >= 1500000) {
        alert("Tu sueldo está sobre la media.");
    } 
    else {
        alert("Tu sueldo está bajo la media.");
    }
}

// Función para calcular las cotizaciones y sueldo líquido
function calcularCotizacionesYSueldo(sueldo) {
    let cotizacionIsapre = Math.floor(sueldo * 0.07);
    let cotizacionAFP = Math.floor(sueldo * 0.12);
    let sueldoLiquido = sueldo - cotizacionIsapre - cotizacionAFP;
    console.log("Sueldo ingresado: " + sueldo + " CLP");
    console.log("Cotización Isapre (7%): " + cotizacionIsapre + " CLP");
    console.log("Cotización AFP (12%): " + cotizacionAFP + " CLP");
    console.log("Sueldo líquido: " + sueldoLiquido + " CLP");
}

// Función principal
function main() {
    let sueldo = solicitarSueldo();
    verificarMedia(sueldo);
    calcularCotizacionesYSueldo(sueldo);
}

// Llamada a la función principal
main();