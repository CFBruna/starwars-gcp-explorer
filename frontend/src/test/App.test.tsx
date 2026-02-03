import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import apiClient from '../services/api';

vi.mock('../services/api', () => ({
    default: {
        get: vi.fn(),
    },
}));

const mockCharacters = {
    count: 2,
    results: [
        {
            name: 'Luke Skywalker',
            height: '172',
            mass: '77',
            hair_color: 'blond',
            eye_color: 'blue',
            birth_year: '19BBY',
            gender: 'male',
            homeworld: 'https://swapi.dev/api/planets/1/',
            url: 'https://swapi.dev/api/people/1/',
            films: [],
        },
        {
            name: 'Darth Vader',
            height: '202',
            mass: '136',
            hair_color: 'none',
            eye_color: 'yellow',
            birth_year: '41.9BBY',
            gender: 'male',
            homeworld: 'https://swapi.dev/api/planets/1/',
            url: 'https://swapi.dev/api/people/4/',
            films: [],
        },
    ],
};

const mockPlanets = {
    count: 1,
    results: [
        {
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
            url: 'https://swapi.dev/api/planets/1/',
        },
    ],
};

const mockFilms = {
    count: 1,
    results: [
        {
            title: 'A New Hope',
            episode_id: 4,
            opening_crawl: 'It is a period of civil war...',
            director: 'George Lucas',
            producer: 'Gary Kurtz',
            release_date: '1977-05-25',
            characters: [],
            planets: [],
            starships: [],
            vehicles: [],
            species: [],
            url: 'https://swapi.dev/api/films/1/',
        },
    ],
};

const mockStarships = {
    count: 1,
    results: [
        {
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
            url: 'https://swapi.dev/api/starships/12/',
        },
    ],
};

describe('App Component - Integration Tests', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.mocked(apiClient.get).mockResolvedValue({ data: { results: [] } });
    });

    describe('Initial Render', () => {
        it('renders the application title', () => {
            render(<App />);
            expect(screen.getByText('CHARACTERS')).toBeInTheDocument();
            expect(screen.getByText('DATABASE_V2.0')).toBeInTheDocument();
        });

        it('renders all navigation tabs', () => {
            render(<App />);
            expect(screen.getByText('Characters')).toBeInTheDocument();
            expect(screen.getByText('Planets')).toBeInTheDocument();
            expect(screen.getByText('Films')).toBeInTheDocument();
            expect(screen.getByText('Starships')).toBeInTheDocument();
        });

        it('shows search bar on initial load (people tab)', () => {
            render(<App />);
            expect(screen.getByPlaceholderText(/search characters/i)).toBeInTheDocument();
        });

        it('calls API on initial mount', () => {
            render(<App />);
            expect(apiClient.get).toHaveBeenCalledWith('/people', { params: {} });
        });
    });

    describe('Tab Navigation', () => {
        it('switches to planets tab and fetches planets', async () => {
            vi.mocked(apiClient.get)
                .mockResolvedValueOnce({ data: { results: [] } }) // Initial load (people)
                .mockResolvedValueOnce({ data: mockPlanets });    // Tab switch (planets)

            const user = userEvent.setup();
            render(<App />);

            const planetsTab = screen.getByText('Planets');
            await user.click(planetsTab);

            await waitFor(() => {
                expect(screen.getByText('Tatooine')).toBeInTheDocument();
            });
        });

        it('switches to films tab and fetches films', async () => {
            vi.mocked(apiClient.get)
                .mockResolvedValueOnce({ data: { results: [] } }) // Initial load (people)
                .mockResolvedValueOnce({ data: mockFilms });      // Tab switch (films)

            const user = userEvent.setup();
            render(<App />);

            const filmsTab = screen.getByText('Films');
            await user.click(filmsTab);

            await waitFor(() => {
                expect(screen.getByText('A New Hope')).toBeInTheDocument();
            });
        });

        it('switches to starships tab and fetches starships', async () => {
            vi.mocked(apiClient.get)
                .mockResolvedValueOnce({ data: { results: [] } }) // Initial load (people)
                .mockResolvedValueOnce({ data: mockStarships });  // Tab switch (starships)

            const user = userEvent.setup();
            render(<App />);

            const starshipsTab = screen.getByText('Starships');
            await user.click(starshipsTab);

            await waitFor(() => {
                expect(screen.getByText('X-wing')).toBeInTheDocument();
            });
        });

        it('hides search bar on films tab', async () => {
            const user = userEvent.setup();
            render(<App />);

            const filmsTab = screen.getByText('Films');
            await user.click(filmsTab);

            await waitFor(() => {
                expect(screen.queryByPlaceholderText(/search/i)).not.toBeInTheDocument();
            });
        });
    });

    describe('Search Functionality', () => {
        it('sends search query to API', async () => {
            vi.mocked(apiClient.get).mockResolvedValue({ data: mockCharacters });
            const user = userEvent.setup();
            render(<App />);

            const searchInput = screen.getByPlaceholderText(/search characters/i);
            await user.type(searchInput, 'Luke');

            await waitFor(() => {
                expect(apiClient.get).toHaveBeenCalledWith('/people', {
                    params: { search: 'Luke' },
                });
            }, { timeout: 3000 });
        });

        it('displays search results', async () => {
            vi.mocked(apiClient.get).mockResolvedValue({ data: mockCharacters });
            render(<App />);

            await waitFor(() => {
                expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
                expect(screen.getByText('Darth Vader')).toBeInTheDocument();
            });
        });
    });

    describe('Sorting Functionality', () => {
        it('opens sort dropdown when clicked', async () => {
            const user = userEvent.setup();
            render(<App />);

            const sortButton = screen.getByRole('button', { name: '' });
            await user.click(sortButton);

            await waitFor(() => {
                expect(screen.getByText('Default')).toBeInTheDocument();
                expect(screen.getByText('Name A-Z')).toBeInTheDocument();
            });
        });

        it('sends ordering parameter when sort option selected', async () => {
            vi.mocked(apiClient.get).mockResolvedValue({ data: mockCharacters });
            const user = userEvent.setup();
            render(<App />);

            // Open dropdown
            const sortButton = screen.getByRole('button', { name: '' });
            await user.click(sortButton);

            // Click "Height: Low"
            const heightOption = screen.getByText('Height: Low');
            await user.click(heightOption);

            await waitFor(() => {
                expect(apiClient.get).toHaveBeenCalledWith('/people', {
                    params: { ordering: 'height' },
                });
            });
        });

        it('closes dropdown after selecting option', async () => {
            const user = userEvent.setup();
            render(<App />);

            const sortButton = screen.getByRole('button', { name: '' });
            await user.click(sortButton);

            const nameOption = screen.getByText('Name A-Z');
            await user.click(nameOption);

            await waitFor(() => {
                expect(screen.queryByText('Default')).not.toBeInTheDocument();
            });
        });
    });

    describe('Error Handling', () => {
        it('displays error message on API failure', async () => {
            vi.mocked(apiClient.get).mockRejectedValue(new Error('Network Error'));
            render(<App />);

            await waitFor(() => {
                expect(screen.getByText(/Network Error/i)).toBeInTheDocument();
            });
        });

        it('shows try again button on error', async () => {
            vi.mocked(apiClient.get).mockRejectedValue(new Error('Failed'));
            render(<App />);

            await waitFor(() => {
                expect(screen.getByText('Try Again')).toBeInTheDocument();
            });
        });

        it('retries fetch when try again is clicked', async () => {
            vi.mocked(apiClient.get).mockRejectedValueOnce(new Error('Failed'))
                .mockResolvedValueOnce({ data: mockCharacters });

            const user = userEvent.setup();
            render(<App />);

            await waitFor(() => {
                expect(screen.getByText('Try Again')).toBeInTheDocument();
            });

            const retryButton = screen.getByText('Try Again');
            await user.click(retryButton);

            await waitFor(() => {
                expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
            });
        });
    });

    describe('Loading State', () => {
        it('shows loader while fetching data', async () => {
            let resolvePromise: ((value: unknown) => void) | undefined;
            const promise = new Promise((resolve) => {
                resolvePromise = resolve as (value: unknown) => void;
            });
            vi.mocked(apiClient.get).mockReturnValue(promise as never);

            const { container } = render(<App />);

            const spinner = container.querySelector('.animate-spin');
            expect(spinner).toBeInTheDocument();

            if (resolvePromise) {
                resolvePromise({ data: { results: [] } });
            }
        });
    });

    describe('Empty State', () => {
        it('shows empty state when no characters found', async () => {
            vi.mocked(apiClient.get).mockResolvedValue({ data: { results: [] } });
            render(<App />);

            await waitFor(() => {
                expect(screen.getByText('No characters found')).toBeInTheDocument();
            });
        });
    });

    describe('Data Display', () => {
        it('displays character cards with correct data', async () => {
            vi.mocked(apiClient.get).mockResolvedValue({ data: mockCharacters });
            render(<App />);

            await waitFor(() => {
                expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
                expect(screen.getByText('172 cm')).toBeInTheDocument();
                expect(screen.getByText('77 kg')).toBeInTheDocument();
            });
        });

        it('updates count badges when data changes', async () => {
            vi.mocked(apiClient.get).mockResolvedValue({ data: mockCharacters });
            const { container } = render(<App />);

            await waitFor(() => {
                const badge = container.querySelector('.bg-cyan-500');
                expect(badge).toHaveTextContent('2');
            });
        });
    });
});
