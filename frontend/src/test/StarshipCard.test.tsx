import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import StarshipCard from '../components/StarshipCard';
import type { Starship } from '../types';

const mockStarship: Starship = {
    name: 'X-wing',
    model: 'T-65 X-wing',
    manufacturer: 'Incom Corporation',
    cost_in_credits: '149999',
    length: '12.5',
    max_atmosphering_speed: '1050',
    crew: '1',
    passengers: '0',
    cargo_capacity: '110',
    consumables: '1 week',
    hyperdrive_rating: '1.0',
    MGLT: '100',
    starship_class: 'Starfighter',
    pilots: [],
    films: [],
    created: '2014-12-12T11:19:05.340000Z',
    edited: '2014-12-20T21:23:49.886000Z',
    url: 'https://swapi.dev/api/starships/12/',
};

describe('StarshipCard Component', () => {
    it('renders starship name', () => {
        render(<StarshipCard starship={mockStarship} />);
        expect(screen.getByText('X-wing')).toBeInTheDocument();
    });

    it('displays model', () => {
        render(<StarshipCard starship={mockStarship} />);
        expect(screen.getByText('T-65 X-wing')).toBeInTheDocument();
    });

    it('displays starship class', () => {
        render(<StarshipCard starship={mockStarship} />);
        expect(screen.getByText('Starfighter')).toBeInTheDocument();
    });

    it('displays manufacturer', () => {
        render(<StarshipCard starship={mockStarship} />);
        expect(screen.getByText('Incom Corporation')).toBeInTheDocument();
    });

    it('displays crew count', () => {
        render(<StarshipCard starship={mockStarship} />);
        expect(screen.getByText('1')).toBeInTheDocument();
    });

    it('displays passengers count', () => {
        render(<StarshipCard starship={mockStarship} />);
        expect(screen.getByText('0')).toBeInTheDocument();
    });

    it('displays hyperdrive rating', () => {
        render(<StarshipCard starship={mockStarship} />);
        expect(screen.getByText('1.0')).toBeInTheDocument();
    });

    it('displays length with unit', () => {
        render(<StarshipCard starship={mockStarship} />);
        expect(screen.getByText('12.5 m')).toBeInTheDocument();
    });
});
