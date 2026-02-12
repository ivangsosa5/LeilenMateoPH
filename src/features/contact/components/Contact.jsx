import React, { useState } from "react";
import SEOHead from "../../../shared/components/SEOHead";
import { usePageTracking, useContactTracking } from "../../../shared/hooks/useAnalytics";
import ContactForm from "./ContactForm";
import WhatsappPreview from "./WhatsappPreview";
import { generateWhatsAppMessage } from "../utils/whatsappGenerator";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    sessionType: '',
    estimatedMonth: '',
    estimatedYear: '',
    message: ''
  });

  const [whatsappMessage, setWhatsappMessage] = useState('');

  // Tracking de página y contacto
  usePageTracking('Contacto', {
    page_section: 'contact',
    page_type: 'conversion'
  });

  const { trackFormStart, trackFormSubmit, trackWhatsAppClick } = useContactTracking();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newData = { ...formData, [name]: value };
    setFormData(newData);
    setWhatsappMessage(generateWhatsAppMessage(newData));
    
    // Tracking
    if (name === 'name' && value && !formData.name) {
      trackFormStart('form');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    trackFormSubmit('form');
    trackWhatsAppClick('button');
    const whatsappUrl = `https://wa.me/5493412748925?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  console.log(whatsappMessage)

  return (
    <>
      <SEOHead 
        title="Contacto - Leilen Mateo | Reserva tu Sesión Fotográfica"
        description="Contacta con Leilen Mateo para reservar tu sesión fotográfica. Formulario de contacto y WhatsApp para consultas sobre servicios de fotografía profesional."
        keywords="contacto Leilen Mateo, reservar sesión, fotografía profesional, WhatsApp, formulario contacto, servicios fotográficos"
        url="/contact"
        image="/og-contacto.jpg"
      />
      <div className="container mx-auto px-4 lg:mt-30">
        {/* <h1 className="text-4xl text-center mb-12 lg:text-8xl">Con<span className="italic">tac</span>to</h1> */}
        <img src="/images/contactImages/contactTitleImage.svg" alt="contactTitle" className="mx-auto mb-12"/>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 max-w-6xl mx-auto">
          {/* Left Column: Form */}
          <div className="w-full">
            <ContactForm 
              formData={formData} 
              onChange={handleInputChange} 
              onSubmit={handleSubmit} 
            />
          </div>

          {/* Right Column: Preview */}
          <div className="w-full relative">
            <WhatsappPreview message={whatsappMessage} />
            <div className="absolute top-15 right-10">
              <img src="/images/contactImages/yourmessage.svg" alt="" />
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="my-16 text-center border-t border-gray-300 pt-8 w-1/2 mx-auto">
          <h2 className="text-2xl italic mb-6">También podés contactarme vía redes!</h2>
          <div className="flex justify-center gap-6">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full hover:bg-gray-200 transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            {/* Add more social icons as needed */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;

