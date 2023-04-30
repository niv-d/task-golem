import { describe, test, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import RoundButton from './RoundButton.svelte';
import html from 'svelte-htm';

describe('RoundButton', () => {
  it('should render with custom text', () => {
    render(html`<${RoundButton}>button txt</${RoundButton}>`);
    expect(screen.getByText('button txt')).toBeInTheDocument();
    expect(screen.getByText('button txt')).not.toHaveClass('hidden');
  });
  it('should render with default text', () => {
    render(html`<${RoundButton}></${RoundButton}>`);
    expect(screen.getByText('no button text?')).toBeInTheDocument();
  });
  it('click should bubble', () => {
    const handleClick = vi.fn();
    render(html`<${RoundButton} on:click=${handleClick}></${RoundButton}>`);
    screen.getByText('no button text?').click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  it('hidden class when hidden prop is true', () => {
    render(html`<${RoundButton} hidden=${true}></${RoundButton}>`);
    expect(screen.getByText('no button text?')).toHaveClass('hidden');
  });
});
