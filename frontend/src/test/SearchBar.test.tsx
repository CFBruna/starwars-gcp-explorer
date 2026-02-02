import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from '../components/SearchBar';

describe('SearchBar Component', () => {
    it('renders with placeholder', () => {
        render(<SearchBar value="" onChange={() => { }} placeholder="Search characters..." />);
        expect(screen.getByPlaceholderText('Search characters...')).toBeInTheDocument();
    });

    it('displays current value', () => {
        render(<SearchBar value="Luke" onChange={() => { }} />);
        const input = screen.getByRole('textbox');
        expect(input).toHaveValue('Luke');
    });

    it('calls onChange when typing', async () => {
        const handleChange = vi.fn();
        render(<SearchBar value="" onChange={handleChange} />);

        const input = screen.getByRole('textbox');
        await userEvent.type(input, 'Darth');

        expect(handleChange).toHaveBeenCalled();
        expect(handleChange).toHaveBeenCalledTimes(5);
    });

    it('calls onChange with correct value on input', () => {
        const handleChange = vi.fn();
        render(<SearchBar value="" onChange={handleChange} />);

        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: 'Yoda' } });

        expect(handleChange).toHaveBeenCalledWith('Yoda');
    });

    it('has proper styling classes', () => {
        render(<SearchBar value="" onChange={() => { }} />);
        const input = screen.getByRole('textbox');
        expect(input).toHaveClass('bg-gray-900/80', 'border-gray-700/50', 'text-white');
    });
});
