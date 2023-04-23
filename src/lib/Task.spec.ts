import { describe, test, expect } from 'vitest';
import Task from './Task.svelte';

describe('Task Component', () => {
  test('Render', () => {
    const host = document.createElement('div');
    document.body.appendChild(host);
    const instance = new Task({ target: host });
    expect(instance).toBeTruthy();

    const todaysDate = new Date();
    const formattedDate = todaysDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

    expect(host.innerHTML).toContain(formattedDate);
    expect(host.innerHTML).toContain('click to edit task!');
    expect(host.innerHTML).toContain('unset');
    expect(host.innerHTML).toContain('add due date');
  });
});
