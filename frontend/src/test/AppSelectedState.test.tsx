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

describe('App - Selected State Coverage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.mocked(apiClient.get).mockResolvedValue({ data: { results: [] } });
    });

    describe('Selected State Styling', () => {
        it('shows selected styling for active sort option', async () => {
            const user = userEvent.setup();
            render(<App />);

            const sortButton = screen.getByRole('button', { name: '' });
            await user.click(sortButton);

            const heightOption = screen.getByText('Height: Low');
            await user.click(heightOption);

            await user.click(sortButton);

            await waitFor(() => {
                const selectedOption = screen.getByText('Height: Low');
                expect(selectedOption.className).toContain('bg-[#FFE81F]/10');
                expect(selectedOption.className).toContain('text-[#FFE81F]');
            });
        });

        it('shows selected styling for Population option', async () => {
            const user = userEvent.setup();
            render(<App />);

            const planetsTab = screen.getByText('Planets');
            await user.click(planetsTab);

            const sortButton = screen.getByRole('button', { name: '' });
            await user.click(sortButton);

            const popOption = screen.getByText('Pop: Low');
            await user.click(popOption);

            await user.click(sortButton);

            await waitFor(() => {
                const selectedOption = screen.getByText('Pop: Low');
                expect(selectedOption.className).toContain('bg-[#FFE81F]/10');
            });
        });

        it('shows selected styling for Passengers option', async () => {
            const user = userEvent.setup();
            render(<App />);

            const starshipsTab = screen.getByText('Starships');
            await user.click(starshipsTab);

            const sortButton = screen.getByRole('button', { name: '' });
            await user.click(sortButton);

            const passengersOption = screen.getByText('Passengers: Low');
            await user.click(passengersOption);

            await user.click(sortButton);

            await waitFor(() => {
                const selectedOption = screen.getByText('Passengers: Low');
                expect(selectedOption.className).toContain('bg-[#FFE81F]/10');
            });
        });

        it('shows default styling for non-selected options', async () => {
            const user = userEvent.setup();
            render(<App />);

            const sortButton = screen.getByRole('button', { name: '' });
            await user.click(sortButton);

            const nameOption = screen.getByText('Name A-Z');
            await user.click(nameOption);

            await user.click(sortButton);

            const defaultOption = screen.getByText('Default');
            expect(defaultOption.className).not.toContain('bg-[#FFE81F]/10');
            expect(defaultOption.className).toContain('text-gray-300');
        });

        it('shows selected styling for negative sorting (Z-A)', async () => {
            const user = userEvent.setup();
            render(<App />);

            const sortButton = screen.getByRole('button', { name: '' });
            await user.click(sortButton);

            const nameZA = screen.getByText('Name Z-A');
            await user.click(nameZA);

            await user.click(sortButton);

            await waitFor(() => {
                const selected = screen.getByText('Name Z-A');
                expect(selected.className).toContain('bg-[#FFE81F]/10');
            });
        });

        it('shows selected styling for diameter sorting', async () => {
            const user = userEvent.setup();
            render(<App />);

            const planetsTab = screen.getByText('Planets');
            await user.click(planetsTab);

            const sortButton = screen.getByRole('button', { name: '' });
            await user.click(sortButton);

            const diameterOption = screen.getByText('Size: Small');
            await user.click(diameterOption);

            await user.click(sortButton);

            await waitFor(() => {
                const selected = screen.getByText('Size: Small');
                expect(selected.className).toContain('bg-[#FFE81F]/10');
            });
        });

        it('shows selected styling for crew sorting', async () => {
            const user = userEvent.setup();
            render(<App />);

            const starshipsTab = screen.getByText('Starships');
            await user.click(starshipsTab);

            const sortButton = screen.getByRole('button', { name: '' });
            await user.click(sortButton);

            const crewOption = screen.getByText('Crew: Low');
            await user.click(crewOption);

            await user.click(sortButton);

            await waitFor(() => {
                const selected = screen.getByText('Crew: Low');
                expect(selected.className).toContain('bg-[#FFE81F]/10');
            });
        });

        it('toggles between selected and unselected states', async () => {
            const user = userEvent.setup();
            render(<App />);

            const sortButton = screen.getByRole('button', { name: '' });

            await user.click(sortButton);
            await user.click(screen.getByText('Height: Low'));

            await user.click(sortButton);
            await user.click(screen.getByText('Mass: Low'));

            await user.click(sortButton);

            await waitFor(() => {
                const massOption = screen.getByText('Mass: Low');
                const heightOption = screen.getByText('Height: Low');

                expect(massOption.className).toContain('bg-[#FFE81F]/10');
                expect(heightOption.className).not.toContain('bg-[#FFE81F]/10');
            });
        });
    });
});
