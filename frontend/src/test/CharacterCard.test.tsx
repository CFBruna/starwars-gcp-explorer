import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import CharacterCard from '../components/CharacterCard';
import type { Character } from '../types';

const mockCharacter: Character = {
    name: 'Luke Skywalker',
    height: '172',
    mass: '77',
    hair_color: 'blond',
    skin_color: 'fair',
    eye_color: 'blue',
    birth_year: '19BBY',
    gender: 'male',
    homeworld: 'https://swapi.dev/api/planets/1/',
    films: [],
    species: [],
    vehicles: [],
    starships: [],
    created: '2014-12-09T13:50:51.644000Z',
    edited: '2014-12-20T21:17:56.891000Z',
    url: 'https://swapi.dev/api/people/1/',
};

describe('CharacterCard Component', () => {
    it('renders character name', () => {
        render(<CharacterCard character={mockCharacter} />);
        expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    });

    it('displays height correctly', () => {
        render(<CharacterCard character={mockCharacter} />);
        expect(screen.getByText('172 cm')).toBeInTheDocument();
    });

    it('displays mass correctly', () => {
        render(<CharacterCard character={mockCharacter} />);
        expect(screen.getByText('77 kg')).toBeInTheDocument();
    });

    it('displays birth year', () => {
        render(<CharacterCard character={mockCharacter} />);
        expect(screen.getByText('19BBY')).toBeInTheDocument();
    });

    it('displays gender capitalized', () => {
        render(<CharacterCard character={mockCharacter} />);
        expect(screen.getByText('male')).toBeInTheDocument();
    });

    it('displays hair and eye color', () => {
        render(<CharacterCard character={mockCharacter} />);
        expect(screen.getByText('blond')).toBeInTheDocument();
        expect(screen.getByText('blue')).toBeInTheDocument();
    });

    it('has proper card styling', () => {
        const { container } = render(<CharacterCard character={mockCharacter} />);
        const card = container.firstChild;
        expect(card).toHaveClass('card-glow', 'bg-gray-900/80');
    });
});
