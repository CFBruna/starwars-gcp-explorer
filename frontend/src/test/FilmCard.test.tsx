import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import FilmCard from '../components/FilmCard';
import type { Film } from '../types';

const mockFilm: Film = {
    title: 'A New Hope',
    episode_id: 4,
    opening_crawl: 'It is a period of civil war. Rebel spaceships...',
    director: 'George Lucas',
    producer: 'Gary Kurtz, Rick McCallum',
    release_date: '1977-05-25',
    characters: [],
    planets: [],
    starships: [],
    vehicles: [],
    species: [],
    created: '2014-12-10T14:23:31.880000Z',
    edited: '2014-12-20T19:49:45.256000Z',
    url: 'https://swapi.dev/api/films/1/',
};

describe('FilmCard Component', () => {
    it('renders film title', () => {
        render(<FilmCard film={mockFilm} />);
        expect(screen.getByText('A New Hope')).toBeInTheDocument();
    });

    it('displays episode number', () => {
        render(<FilmCard film={mockFilm} />);
        expect(screen.getByText('EP 4')).toBeInTheDocument();
    });

    it('displays opening crawl', () => {
        render(<FilmCard film={mockFilm} />);
        expect(screen.getByText(/It is a period of civil war/)).toBeInTheDocument();
    });

    it('displays director', () => {
        render(<FilmCard film={mockFilm} />);
        expect(screen.getByText('George Lucas')).toBeInTheDocument();
    });

    it('displays producer', () => {
        render(<FilmCard film={mockFilm} />);
        expect(screen.getByText('Gary Kurtz, Rick McCallum')).toBeInTheDocument();
    });

    it('displays formatted release date', () => {
        render(<FilmCard film={mockFilm} />);
        expect(screen.getByText(/1977/)).toBeInTheDocument();
    });
});
