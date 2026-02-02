import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import Loader from '../components/Loader';

describe('Loader Component', () => {
    it('renders loading spinner', () => {
        const { container } = render(<Loader />);
        const spinner = container.querySelector('.animate-spin');
        expect(spinner).toBeInTheDocument();
    });

    it('has correct styling classes', () => {
        const { container } = render(<Loader />);
        const spinner = container.querySelector('.animate-spin');
        expect(spinner).toHaveClass('rounded-full', 'border-t-4', 'border-b-4', 'border-yellow-500');
    });
});
