import { describe, it, expect } from 'vitest';
import { generateWhatsAppMessage } from './whatsappGenerator';

describe('generateWhatsAppMessage', () => {
  it('generates a formatted message with all fields provided', () => {
    const data = {
      name: 'Maria Perez',
      sessionType: 'Editorial',
      estimatedDate: 'Mayo 2024',
      message: 'Quiero fotos en exterior.'
    };
    
    const result = generateWhatsAppMessage(data);
    
    expect(result).toContain('Hola Leilen!');
    expect(result).toContain('Soy Maria Perez');
    expect(result).toContain('quiero más info sobre las sesiones de Editorial');
    expect(result).toContain('Fecha estimada: Mayo 2024');
    expect(result).toContain('Mensaje adicional: Quiero fotos en exterior.');
  });

  it('generates message with placeholders when fields are missing', () => {
    const data = {
      name: '',
      sessionType: '',
      estimatedDate: '',
      message: ''
    };
    
    const result = generateWhatsAppMessage(data);
    
    expect(result).toContain('Soy _________');
    expect(result).toContain('sesiones de _________');
    expect(result).toContain('Fecha estimada: _________');
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
