import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    sessionType: '',
    estimatedDate: '',
    message: ''
  });

  const [whatsappMessage, setWhatsappMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Generate WhatsApp message dynamically
    generateWhatsAppMessage({ ...formData, [name]: value });
  };

  const generateWhatsAppMessage = (data) => {
    const message = `Hola Leilen! 👋

Me interesa contratar tus servicios de fotografía:

📝 Nombre: ${data.name || '[Tu nombre]'}
📸 Tipo de sesión: ${data.sessionType || '[Selecciona tipo]'}
📅 Fecha estimada: ${data.estimatedDate || '[Mes/Año]'}

${data.message ? `💬 Mensaje adicional: ${data.message}` : ''}

¿Podrías darme más información sobre disponibilidad y precios?

¡Gracias! 😊`;

    setWhatsappMessage(message);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const whatsappUrl = `https://wa.me/1234567890?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Contacta con Leilen</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Nombre completo *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Tu nombre completo"
            />
          </div>

          <div>
            <label htmlFor="sessionType" className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de sesión *
            </label>
            <select
              id="sessionType"
              name="sessionType"
              value={formData.sessionType}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Selecciona un tipo de sesión</option>
              <option value="Editorial">Editorial</option>
              <option value="Portfolio">Portfolio</option>
              <option value="Eventos">Eventos</option>
              <option value="Productos">Productos</option>
            </select>
          </div>

          <div>
            <label htmlFor="estimatedDate" className="block text-sm font-medium text-gray-700 mb-2">
              Fecha estimada *
            </label>
            <input
              type="month"
              id="estimatedDate"
              name="estimatedDate"
              value={formData.estimatedDate}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
              Mensaje adicional
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Cuéntame más sobre tu proyecto..."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-md transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
            </svg>
            Enviar por WhatsApp
          </button>
        </form>

        {/* WhatsApp Message Preview */}
        {whatsappMessage && (
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Vista previa del mensaje:</h3>
            <div className="bg-white p-3 rounded border text-sm text-gray-600 whitespace-pre-wrap">
              {whatsappMessage}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactForm;
