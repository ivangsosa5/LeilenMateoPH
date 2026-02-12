import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '../../test/test-utils';
import NavBar from './NavBar';
import { NavBarProvider } from '../context/NavBarContext';

import { BrowserRouter as Router } from 'react-router-dom';

const AllProviders = ({ children }) => (
    <Router>
        <NavBarProvider>
            {children}
        </NavBarProvider>
    </Router>
);

describe('NavBar Gallery Dropdown', () => {
    it('should render the Galería item', () => {
        render(<NavBar />, { wrapper: AllProviders });
        expect(screen.getByText(/Galería/i)).toBeInTheDocument();
    });

    it('should show dropdown items when clicking on Galería', () => {
        render(<NavBar />, { wrapper: AllProviders });
        const galleryLink = screen.getByText(/Galería/i);

        // Initial state should not show dropdown items (or they shouldn't be visible)
        // We expect the dropdown to be implemented with common React patterns

        fireEvent.click(galleryLink);

        expect(screen.getByText(/Editorial/i)).toBeInTheDocument();
        expect(screen.getByText(/Portfolio/i)).toBeInTheDocument();
        expect(screen.getByText(/Eventos/i)).toBeInTheDocument();
        expect(screen.getByText(/Fotoproducto/i)).toBeInTheDocument();
    });

    it('dropdown items should have correct links', () => {
        render(<NavBar />, { wrapper: AllProviders });
        const galleryLink = screen.getByText(/Galería/i);
        fireEvent.click(galleryLink);

        expect(screen.getByText(/Editorial/i).closest('a')).toHaveAttribute('href', '/gallery/editorial');
        expect(screen.getByText(/Portfolio/i).closest('a')).toHaveAttribute('href', '/gallery/portfolio');
        expect(screen.getByText(/Eventos/i).closest('a')).toHaveAttribute('href', '/gallery/eventos');
        expect(screen.getByText(/Fotoproducto/i).closest('a')).toHaveAttribute('href', '/gallery/fotoproducto');
    });

    it('should close dropdown when a sub-item is clicked', () => {
        render(<NavBar />, { wrapper: AllProviders });
        const galleryLink = screen.getByText(/Galería/i);
        fireEvent.click(galleryLink);

        const editorialLink = screen.getByText(/Editorial/i);
        fireEvent.click(editorialLink);

        expect(screen.queryByText(/Editorial/i)).not.toBeInTheDocument();
    });
});
