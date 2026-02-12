import React from 'react';
import GenericButton from '../../../shared/components/GenericButton';

const months = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

const currentYear = new Date().getFullYear();
const years = [currentYear, currentYear + 1, currentYear + 2];

const ContactForm = ({ formData, onChange, onSubmit }) => {

  return (
    <div className="p-6 md:p-8 w-full flex flex-col items-center">
      <h2 className="text-2xl md:text-3xl text-gray-900 mb-6 italic text-center">¿Querés agendar o tenés una consulta?</h2>
      
      <form onSubmit={onSubmit} className="space-y-6 w-full max-w-lg text-xl">
        <div>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={onChange}
            required
            className="w-full px-3 py-2 border-b border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-500 text-gray-700 italic"
            placeholder="Tu nombre completo"
          />
        </div>

        <div>
          <select
            id="sessionType"
            name="sessionType"
            value={formData.sessionType}
            onChange={onChange}
            required
            className={`w-full px-3 py-2 border-b border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-500 ${formData.sessionType ? 'text-gray-700' : 'text-gray-400'} italic`}
            
          >
            <option value="">Selecciona un tipo de sesión</option>
            <option value="Editorial">Editorial</option>
            <option value="Portfolio">Portfolio</option>
            <option value="Eventos">Eventos</option>
            <option value="Productos">Productos</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-400 italic text-md">
            Fecha estimada
          </label>
          <div className="flex gap-4">
            <select
              name="estimatedMonth"
              value={formData.estimatedMonth}
              onChange={onChange}
              required
              className={`flex-1 px-3 py-2 border-b border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-500 ${formData.estimatedMonth ? 'text-gray-700' : 'text-gray-400'} italic`}
            >
              <option value="">Mes</option>
              {months.map((m, i) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
            <select
              name="estimatedYear"
              value={formData.estimatedYear}
              onChange={onChange}
              required
              className={`flex-1 px-3 py-2 border-b border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-500 ${formData.estimatedYear ? 'text-gray-700' : 'text-gray-400'} italic`}
            >
              <option value="">Año</option>
              {years.map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2 italic text-md">
            Mensaje adicional
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={onChange}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-700 italic text-gray-700"
            placeholder="Contame más sobre tu proyecto..."
          />
        </div>
        <div className="w-full flex justify-center">
        <GenericButton
          type="submit"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
          </svg>
          Enviar por WhatsApp
        </GenericButton>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
