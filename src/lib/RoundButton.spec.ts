import { describe, test, expect, it } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import RoundButton from './RoundButton.svelte';
import html from 'svelte-htm';

describe('RoundButton', () => {
  it('should render with custom text', () => {
    render(html`<${RoundButton}>button txt</${RoundButton}>`);
    expect(screen.getByText('button txt')).toBeInTheDocument();
  });
  it('should render with default text', () => {
    render(html`<${RoundButton}></${RoundButton}>`);
    expect(screen.getByText('no button text?')).toBeInTheDocument();
  });
});
