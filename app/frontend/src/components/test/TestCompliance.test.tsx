import { render, screen, fireEvent } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import TestCompliance from './TestCompliance';

const renderWithMantine = (ui: React.ReactElement) => {
  return render(
    <MantineProvider>{ui}</MantineProvider>
  );
};

describe('TestCompliance', () => {
  it('renders component title', () => {
    renderWithMantine(<TestCompliance />);
    expect(screen.getByText('TestCompliance')).toBeInTheDocument();
  });

  it('shows demo mode badge when isDemoMode is true', () => {
    renderWithMantine(<TestCompliance isDemoMode={true} />);
    expect(screen.getByText('DEMO MODE')).toBeInTheDocument();
  });

  it('calls onToggleDemo when toggle button is clicked', () => {
    const mockToggle = jest.fn();
    renderWithMantine(
      <TestCompliance isDemoMode={true} onToggleDemo={mockToggle} />
    );
    
    fireEvent.click(screen.getByText('Toggle Demo'));
    expect(mockToggle).toHaveBeenCalledTimes(1);
  });

  it('shows loading state when action button is clicked', async () => {
    renderWithMantine(<TestCompliance />);
    
    fireEvent.click(screen.getByText('Execute Action'));
    expect(screen.getByText('Processing...')).toBeInTheDocument();
  });

  it('follows PM33 design compliance', () => {
    const { container } = renderWithMantine(<TestCompliance />);
    
    // Check for gradient styling
    const card = container.querySelector('[data-testid="card"]');
    // Add specific design compliance checks here
  });
});
