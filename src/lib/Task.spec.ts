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

test('bubble up on:drag events', () => {
  const handleDrag = vi.fn();
  const host = document.createElement('div');
  document.body.appendChild(host);
  const instance = new Task({
    target: host,
  });
  expect(instance).toBeTruthy();
  instance.$on('drag', handleDrag);

  const dragEvent = new Event('drag');
  host.querySelector('date-created').dispatchEvent(dragEvent);

  expect(handleDrag).toHaveBeenCalledTimes(1);
});

test('click to edit task', () => {
  const host = document.createElement('div');
  document.body.appendChild(host);
  const instance = new Task({ target: host });
  expect(instance).toBeTruthy();

  //clicking on the 'click to set task' text should cause the task to be editable input field
  const clickToSetTask = host.querySelector('task-name');
  expect(clickToSetTask).toBeTruthy();
  expect(host.querySelector('input')).not.toBeTruthy();
  clickToSetTask.dispatchEvent(new MouseEvent('click'));

  // the input field should be visible
  const input = host.querySelector('textarea');
  expect(input).toBeTruthy();

  // the input field should have the same text as the 'click to set task' text
  expect(input.value).toBe(clickToSetTask.textContent);

  // clicking on the input field should not cause it to disappear
  input.dispatchEvent(new MouseEvent('click'));
  expect(input).toBeTruthy();

  // clicking off the input field should cause it to disappear, and send an event
  const handleTask = vi.fn();
  instance.$on('taskUpdate', (e) => handleTask(e.detail));
  document.body.dispatchEvent(new MouseEvent('click'));
  expect(input).not.toHaveClass('visible');
  expect(handleTask).toHaveBeenCalledTimes(1);
  expect(handleTask).toHaveBeenCalledWith({ task: input.value });
});
