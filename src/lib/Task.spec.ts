import { describe, test, expect, vi } from 'vitest';
import Task from './Task.svelte';

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
  expect(host.innerHTML).toContain('click to set task');
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

test('Clicking arrows causes expected event', () => {
  // the arrow element is <arrow> with classname being direction
  const host = document.createElement('div');
  document.body.appendChild(host);
  const instance = new Task({ target: host });
  expect(instance).toBeTruthy();

  const arrows = ['left', 'right', 'up', 'down'];
  let arrow_elements = arrows.map((direction) => ({
    element: host.querySelector(`arrow.${direction}`),
    direction,
  }));

  arrow_elements.forEach((arrow) => {
    const handleDirection = vi.fn();
    instance.$on('direction', (e) => handleDirection(e.detail));

    const { element, direction } = arrow;
    expect(arrow).toBeTruthy();
    element.parentElement.dispatchEvent(new MouseEvent('click'));

    expect(handleDirection).toHaveBeenCalledWith({ direction });
  });
});
