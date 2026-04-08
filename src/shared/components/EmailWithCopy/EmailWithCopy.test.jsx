import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { stubNavigatorClipboard } from '../../../test/helpers/test-helpers.js';
import EmailWithCopy from './EmailWithCopy.jsx';

const DEFAULT_EMAIL = 'hello@leilenmateo.com';

describe('EmailWithCopy', () => {
  let writeText;

  beforeEach(() => {
    writeText = vi.fn().mockResolvedValue(undefined);
    stubNavigatorClipboard(writeText);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  describe('variant="inlineText"', () => {
    it('muestra el email como texto y usa email por defecto si no hay prop', () => {
      render(<EmailWithCopy variant="inlineText" />);

      expect(screen.getByText(DEFAULT_EMAIL)).toBeInTheDocument();
    });

    it('respeta prop email y clase opcional en el contenedor', () => {
      const { container } = render(
        <EmailWithCopy
          variant="inlineText"
          email="otro@test.com"
          className="footer-email-row"
        />
      );

      expect(screen.getByText('otro@test.com')).toBeInTheDocument();
      expect(container.firstChild).toHaveClass('footer-email-row');
    });

    it('el control de copiar es button type="button" (sin mailto ni navegación)', async () => {
      const user = userEvent.setup();
      const { container } = render(<EmailWithCopy variant="inlineText" />);

      const buttons = screen.getAllByRole('button');
      const copyBtn = buttons.find((b) => b.getAttribute('type') === 'button');
      expect(copyBtn).toBeDefined();
      expect(container.querySelector('a[href^="mailto:"]')).toBeNull();
      expect(container.querySelector('a[href="#"]')).toBeNull();

      await user.click(copyBtn);
      expect(writeText).toHaveBeenCalledWith(DEFAULT_EMAIL);
    });

    it('tras copiar muestra feedback "Copiado" en región aria-live', async () => {
      const user = userEvent.setup();
      render(<EmailWithCopy variant="inlineText" />);

      const copyBtn = screen
        .getAllByRole('button')
        .find((b) => b.getAttribute('type') === 'button');
      expect(copyBtn).toBeDefined();
      await user.click(copyBtn);

      const copiado = await screen.findByText(/copiado/i);
      expect(copiado).toBeInTheDocument();
      const region = copiado.closest('[aria-live]');
      expect(region).toBeTruthy();
      expect(region).toHaveAttribute('aria-live', 'polite');
    });
  });

  describe('variant="iconOnly"', () => {
    it('no muestra el email como texto visible aparte del botón', () => {
      render(<EmailWithCopy variant="iconOnly" />);

      expect(screen.queryByText(DEFAULT_EMAIL)).not.toBeInTheDocument();
    });

    it('aria-label en español describe copiar e incluye el email', () => {
      render(<EmailWithCopy variant="iconOnly" email={DEFAULT_EMAIL} />);

      expect(
        screen.getByRole('button', {
          name: new RegExp(
            `copiar correo\\s+${DEFAULT_EMAIL.replace('.', '\\.')}\\s+al portapapeles`,
            'i'
          ),
        })
      ).toBeInTheDocument();
    });

    it('solo button type="button"; sin enlaces mailto', async () => {
      const user = userEvent.setup();
      const { container } = render(<EmailWithCopy variant="iconOnly" />);

      const btn = screen.getByRole('button');
      expect(btn).toHaveAttribute('type', 'button');
      expect(container.querySelector('a[href^="mailto:"]')).toBeNull();

      await user.click(btn);
      expect(writeText).toHaveBeenCalledWith(DEFAULT_EMAIL);
    });

    it('mismo feedback accesible "Copiado" con aria-live', async () => {
      const user = userEvent.setup();
      render(<EmailWithCopy variant="iconOnly" />);

      await user.click(screen.getByRole('button'));

      const copiado = await screen.findByText(/copiado/i);
      const region = copiado.closest('[aria-live]');
      expect(region).toHaveAttribute('aria-live', 'polite');
    });
  });
});
