import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import PlanetCard from '../components/PlanetCard';
import type { Planet } from '../types';

const mockPlanet: Planet = {
    name: 'Tatooine',
    rotation_period: '23',
    orbital_period: '304',
    diameter: '10465',
    climate: 'arid',
    gravity: '1 standard',
    terrain: 'desert',
    surface_water: '1',
    population: '200000',
    residents: [],
    films: [],
    created: '2014-12-09T13:50:49.641000Z',
    edited: '2014-12-20T20:58:18.411000Z',
    url: 'https://swapi.dev/api/planets/1/',
};

describe('PlanetCard Component', () => {
    it('renders planet name', () => {
        render(<PlanetCard planet={mockPlanet} />);
        expect(screen.getByText('Tatooine')).toBeInTheDocument();
    });

    it('displays climate', () => {
        render(<PlanetCard planet={mockPlanet} />);
        expect(screen.getByText('arid')).toBeInTheDocument();
    });

    it('displays terrain', () => {
        render(<PlanetCard planet={mockPlanet} />);
        expect(screen.getByText('desert')).toBeInTheDocument();
    });

    it('displays population', () => {
        render(<PlanetCard planet={mockPlanet} />);
        expect(screen.getByText('200000')).toBeInTheDocument();
    });

    it('displays diameter with unit', () => {
        render(<PlanetCard planet={mockPlanet} />);
        expect(screen.getByText('10465 km')).toBeInTheDocument();
    });

    it('displays gravity', () => {
        render(<PlanetCard planet={mockPlanet} />);
        expect(screen.getByText('1 standard')).toBeInTheDocument();
    });

    it('has proper holographic styling', () => {
        const { container } = render(<PlanetCard planet={mockPlanet} />);
        const card = container.firstChild;
        expect(card).toHaveClass('card-holographic');
    });
});
