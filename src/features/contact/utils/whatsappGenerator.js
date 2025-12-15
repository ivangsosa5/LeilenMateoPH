export const generateWhatsAppMessage = (data) => {
  return `Hola Leilen! Soy ${data.name || '_________'}, quiero más info sobre las sesiones de ${data.sessionType || '_________'}.
Fecha estimada: ${data.estimatedDate || '_________'}

${data.message ? `Mensaje adicional: ${data.message}` : ''}
¡Gracias! 😊`;
};
