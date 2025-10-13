import React, { useState } from "react";
import SEOHead from "../seo/SEOHead";
import { usePageTracking, useContactTracking } from "../../hooks/useAnalytics";

const Contacto = () => {
  const [formData, setFormData] = useState({
    name: '',
    sessionType: '',
    estimatedDate: ''
  });

  // Tracking de página y contacto
  usePageTracking('Contacto', {
    page_section: 'contact',
    page_type: 'conversion'
  });

  const { trackFormStart, trackFormSubmit, trackWhatsAppClick } = useContactTracking();

  // Trackear inicio del formulario
  const handleFormStart = () => {
    trackFormStart('form');
  };

  // Trackear envío del formulario
  const handleFormSubmit = (e) => {
    e.preventDefault();
    trackFormSubmit('form');
    // Lógica de envío del formulario
  };

  // Trackear click en WhatsApp
  const handleWhatsAppClick = () => {
    trackWhatsAppClick('button');
    // Lógica para abrir WhatsApp
  };

  // Trackear cambios en el formulario
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Trackear interés en contacto cuando se llena el primer campo
    if (field === 'name' && value && !formData.name) {
      trackFormStart('form');
    }
  };

  return (
    <>
      <SEOHead 
        title="Contacto - Leilen Mateo | Reserva tu Sesión Fotográfica"
        description="Contacta con Leilen Mateo para reservar tu sesión fotográfica. Formulario de contacto y WhatsApp para consultas sobre servicios de fotografía profesional."
        keywords="contacto Leilen Mateo, reservar sesión, fotografía profesional, WhatsApp, formulario contacto, servicios fotográficos"
        url="/contacto"
        image="/og-contacto.jpg"
      />
      <div>
        <h1>Contacto</h1>
        <form onSubmit={handleFormSubmit} onFocus={handleFormStart}>
          <div>
            <label htmlFor="name">Nombre:</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              required
            />
          </div>
          
          <div>
            <label htmlFor="sessionType">Tipo de Sesión:</label>
            <select
              id="sessionType"
              value={formData.sessionType}
              onChange={(e) => handleInputChange('sessionType', e.target.value)}
              required
            >
              <option value="">Selecciona una opción</option>
              <option value="editorial">Editorial</option>
              <option value="portfolio">Portfolio</option>
              <option value="eventos">Eventos</option>
              <option value="productos">Productos</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="estimatedDate">Fecha Estimada:</label>
            <input
              type="month"
              id="estimatedDate"
              value={formData.estimatedDate}
              onChange={(e) => handleInputChange('estimatedDate', e.target.value)}
            />
          </div>
          
          <button type="submit">Enviar Consulta</button>
        </form>
        
        <div>
          <button onClick={handleWhatsAppClick}>
            Contactar por WhatsApp
          </button>
        </div>
      </div>
    </>
  );
};

export default Contacto;
