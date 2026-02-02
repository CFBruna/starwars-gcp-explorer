import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';

vi.mock('../services/api', () => ({
    default: {
        get: vi.fn(() => Promise.resolve({ data: { results: [] } })),
    },
}));

describe('App Component', () => {
    it('renders the Star Wars Explorer title', () => {
        render(<App />);
        expect(screen.getByText('Star Wars')).toBeInTheDocument();
        expect(screen.getByText('Explorer')).toBeInTheDocument();
    });

    it('renders all tab buttons', () => {
        render(<App />);
        expect(screen.getByText('Characters')).toBeInTheDocument();
        expect(screen.getByText('Planets')).toBeInTheDocument();
        expect(screen.getByText('Films')).toBeInTheDocument();
        expect(screen.getByText('Starships')).toBeInTheDocument();
    });

    it('renders search bar for people tab', () => {
        render(<App />);
        expect(screen.getByPlaceholderText(/search characters/i)).toBeInTheDocument();
    });
});
