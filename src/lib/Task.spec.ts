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
    expect(host.innerHTML).toContain('click to set task name');
    expect(host.innerHTML).toContain('unset');
    expect(host.innerHTML).toContain('📆');
  });
  test('Render Custom Props', () => {
    const todaysDate = new Date('2023-04-23');
    const dueDate = new Date('2023-04-24');

    const host = document.createElement('div');
    document.body.appendChild(host);
    const instance = new Task({
      target: host,
      props: {
        tag: 'test',
        dateCreated: todaysDate,
        task: 'task_name',
        dateDue: dueDate,
      },
    });
    expect(instance).toBeTruthy();

    const formattedTodaysDate = 'Apr 23, 2023';
    const formattedDueDate = 'Apr 24, 2023';

    expect(host.innerHTML).toContain(formattedTodaysDate);
    expect(host.innerHTML).toContain('task_name');
    expect(host.innerHTML).toContain('test');
    expect(host.innerHTML).toContain(formattedDueDate);
    expect(host.innerHTML).not.toContain('📆');
  });
  // Clicking arrows causes expected event
  test('Clicking arrows causes expected event', () => {});
});
