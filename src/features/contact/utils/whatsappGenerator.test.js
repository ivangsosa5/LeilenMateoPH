import { describe, it, expect } from 'vitest';
import { generateWhatsAppMessage } from './whatsappGenerator';

describe('generateWhatsAppMessage', () => {
  it('generates a formatted message with all fields provided', () => {
    const data = {
      name: 'Maria Perez',
      sessionType: 'Editorial',
      estimatedDate: '2023-10',
      message: 'Quiero fotos en exterior.'
    };
    
    const result = generateWhatsAppMessage(data);
    
    expect(result).toContain('Hola Leilen!');
    expect(result).toContain('Maria Perez');
    expect(result).toContain('Editorial');
    expect(result).toContain('2023-10');
    expect(result).toContain('Quiero fotos en exterior.');
  });

  it('generates message with placeholders when fields are missing', () => {
    const data = {
      name: '',
      sessionType: '',
      estimatedDate: '',
      message: ''
    };
    
    const result = generateWhatsAppMessage(data);
    
    expect(result).toContain('[Tu nombre]');
    expect(result).toContain('[Selecciona tipo]');
    expect(result).toContain('[Mes/Año]');
    expect(result).not.toContain('Mensaje adicional:');
  });

  it('includes additional message only if provided', () => {
    const data = {
      name: 'Juan',
      message: ''
    };
    const resultNoMsg = generateWhatsAppMessage(data);
    expect(resultNoMsg).not.toContain('Mensaje adicional:');

    const dataWithMsg = {
      name: 'Juan',
      message: 'Hola'
    };
    const resultWithMsg = generateWhatsAppMessage(dataWithMsg);
    expect(resultWithMsg).toContain('Mensaje adicional: Hola');
  });
});
