import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import apiClient from '../services/api';

vi.mock('../services/api', () => ({
    default: {
        get: vi.fn(),
    },
}));

describe('App - Sorting Options Coverage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.mocked(apiClient.get).mockResolvedValue({ data: { results: [] } });
    });

    describe('Characters Tab Sorting', () => {
        it('selects Default sorting', async () => {
            const user = userEvent.setup();
            render(<App />);

            const sortButton = screen.getByRole('button', { name: '' });
            await user.click(sortButton);
            await user.click(screen.getByText('Name A-Z'));

            await user.click(sortButton);
            const defaultOption = screen.getByText('Default');
            await user.click(defaultOption);

            await waitFor(() => {
                const lastCall = vi.mocked(apiClient.get).mock.calls[vi.mocked(apiClient.get).mock.calls.length - 1];
                expect(lastCall[1]?.params?.ordering || '').toBe('');
            });
        });

        it('selects Name Z-A sorting', async () => {
            const user = userEvent.setup();
            render(<App />);

            const sortButton = screen.getByRole('button', { name: '' });
            await user.click(sortButton);

            const option = screen.getByText('Name Z-A');
            await user.click(option);

            await waitFor(() => {
                expect(apiClient.get).toHaveBeenCalledWith('/people', { params: { ordering: '-name' } });
            });
        });

        it('selects Height High sorting', async () => {
            const user = userEvent.setup();
            render(<App />);

            const sortButton = screen.getByRole('button', { name: '' });
            await user.click(sortButton);

            const option = screen.getByText('Height: High');
            await user.click(option);

            await waitFor(() => {
                expect(apiClient.get).toHaveBeenCalledWith('/people', { params: { ordering: '-height' } });
            });
        });

        it('selects Mass Low sorting', async () => {
            const user = userEvent.setup();
            render(<App />);

            const sortButton = screen.getByRole('button', { name: '' });
            await user.click(sortButton);

            const option = screen.getByText('Mass: Low');
            await user.click(option);

            await waitFor(() => {
                expect(apiClient.get).toHaveBeenCalledWith('/people', { params: { ordering: 'mass' } });
            });
        });

        it('selects Mass High sorting', async () => {
            const user = userEvent.setup();
            render(<App />);

            const sortButton = screen.getByRole('button', { name: '' });
            await user.click(sortButton);

            const option = screen.getByText('Mass: High');
            await user.click(option);

            await waitFor(() => {
                expect(apiClient.get).toHaveBeenCalledWith('/people', { params: { ordering: '-mass' } });
            });
        });
    });

    describe('Planets Tab Sorting', () => {
        it('selects Population Low sorting', async () => {
            const user = userEvent.setup();
            render(<App />);

            const planetsTab = screen.getByText('Planets');
            await user.click(planetsTab);

            const sortButton = screen.getByRole('button', { name: '' });
            await user.click(sortButton);

            const option = screen.getByText('Pop: Low');
            await user.click(option);

            await waitFor(() => {
                expect(apiClient.get).toHaveBeenCalledWith('/planets', { params: { ordering: 'population' } });
            });
        });

        it('selects Population High sorting', async () => {
            const user = userEvent.setup();
            render(<App />);

            const planetsTab = screen.getByText('Planets');
            await user.click(planetsTab);

            const sortButton = screen.getByRole('button', { name: '' });
            await user.click(sortButton);

            const option = screen.getByText('Pop: High');
            await user.click(option);

            await waitFor(() => {
                expect(apiClient.get).toHaveBeenCalledWith('/planets', { params: { ordering: '-population' } });
            });
        });

        it('selects Size Small sorting', async () => {
            const user = userEvent.setup();
            render(<App />);

            const planetsTab = screen.getByText('Planets');
            await user.click(planetsTab);

            const sortButton = screen.getByRole('button', { name: '' });
            await user.click(sortButton);

            const option = screen.getByText('Size: Small');
            await user.click(option);

            await waitFor(() => {
                expect(apiClient.get).toHaveBeenCalledWith('/planets', { params: { ordering: 'diameter' } });
            });
        });

        it('selects Size Large sorting', async () => {
            const user = userEvent.setup();
            render(<App />);

            const planetsTab = screen.getByText('Planets');
            await user.click(planetsTab);

            const sortButton = screen.getByRole('button', { name: '' });
            await user.click(sortButton);

            const option = screen.getByText('Size: Large');
            await user.click(option);

            await waitFor(() => {
                expect(apiClient.get).toHaveBeenCalledWith('/planets', { params: { ordering: '-diameter' } });
            });
        });
    });

    describe('Starships Tab Sorting', () => {
        it('selects Passengers Low sorting', async () => {
            const user = userEvent.setup();
            render(<App />);

            const starshipsTab = screen.getByText('Starships');
            await user.click(starshipsTab);

            const sortButton = screen.getByRole('button', { name: '' });
            await user.click(sortButton);

            const option = screen.getByText('Passengers: Low');
            await user.click(option);

            await waitFor(() => {
                expect(apiClient.get).toHaveBeenCalledWith('/starships', { params: { ordering: 'passengers' } });
            });
        });

        it('selects Passengers High sorting', async () => {
            const user = userEvent.setup();
            render(<App />);

            const starshipsTab = screen.getByText('Starships');
            await user.click(starshipsTab);

            const sortButton = screen.getByRole('button', { name: '' });
            await user.click(sortButton);

            const option = screen.getByText('Passengers: High');
            await user.click(option);

            await waitFor(() => {
                expect(apiClient.get).toHaveBeenCalledWith('/starships', { params: { ordering: '-passengers' } });
            });
        });

        it('selects Crew Low sorting', async () => {
            const user = userEvent.setup();
            render(<App />);

            const starshipsTab = screen.getByText('Starships');
            await user.click(starshipsTab);

            const sortButton = screen.getByRole('button', { name: '' });
            await user.click(sortButton);

            const option = screen.getByText('Crew: Low');
            await user.click(option);

            await waitFor(() => {
                expect(apiClient.get).toHaveBeenCalledWith('/starships', { params: { ordering: 'crew' } });
            });
        });

        it('selects Crew High sorting', async () => {
            const user = userEvent.setup();
            render(<App />);

            const starshipsTab = screen.getByText('Starships');
            await user.click(starshipsTab);

            const sortButton = screen.getByRole('button', { name: '' });
            await user.click(sortButton);

            const option = screen.getByText('Crew: High');
            await user.click(option);

            await waitFor(() => {
                expect(apiClient.get).toHaveBeenCalledWith('/starships', { params: { ordering: '-crew' } });
            });
        });
    });
});
