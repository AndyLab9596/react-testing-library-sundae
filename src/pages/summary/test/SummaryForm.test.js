import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import SummaryForm from "../SummaryForm";

test('initial conditions', () => {
    render(<SummaryForm />);

    const checkbox = screen.getByRole('checkbox', { name: /terms and conditions/i });
    const confirmOrderButton = screen.getByRole('button', { name: /confirm order/i });

    expect(checkbox).not.toBeChecked();
    expect(confirmOrderButton).toBeDisabled();
});

test('Checkbox enables button on the first click and disables on second click', async () => {
    const user = userEvent.setup();

    render(<SummaryForm />);

    const checkbox = screen.getByRole('checkbox', { name: /terms and conditions/i });
    const confirmOrderButton = screen.getByRole('button', { name: 'Confirm order' });

    expect(checkbox).not.toBeChecked();
    await user.click(checkbox);

    expect(confirmOrderButton).toBeEnabled();

    await user.click(checkbox);
    expect(confirmOrderButton).toBeDisabled();
});

test('popover responds to hover', async () => {
    const user = userEvent.setup();
    render(<SummaryForm />);

    // popover starts out hidden
    const nullPopover = screen.queryByText(/no ice cream will actually be delivered/i);
    expect(nullPopover).not.toBeInTheDocument();

    // popover appears on mouseover of checkbox label
    const termsAndCondition = screen.getByText(/terms and conditions/i);
    await user.hover(termsAndCondition);
    const popover = screen.getByText(/no ice cream will actually be delivered/i);
    expect(popover).toBeInTheDocument();

    // popover disappear when we mouse out
    await user.unhover(termsAndCondition);
    expect(popover).not.toBeInTheDocument();
})