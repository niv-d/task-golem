<script>
  import { createEventDispatcher } from 'svelte';
  import RoundButton from './RoundButton.svelte';

  const dispatch = createEventDispatcher();

  export let tag = 'unset';
  export let dateCreated = new Date();
  let taskRef = null;
  export let task = 'click to set task';
  export let dateDue = null;
  let input = false;

  const formatDate = (date) =>
    date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

  const handleDirection = (direction) => () => {
    dispatch('direction', {
      direction,
    });
  };
</script>

<task-container>
  <tag-name>{tag}</tag-name>
  <date-created on:drag>{formatDate(dateCreated)}</date-created>
  <delete-button />
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <task-name
    on:click={() => {
      if (input) return;
      input = true;
      //TODO: This works, but seems awful.
      setTimeout(() => {
        taskRef.select();
      }, 0);
    }}
  >
    {#if input}
      <textarea
        aria-multiline="true"
        bind:this={taskRef}
        bind:value={task}
        on:blur={() => {
          input = false;
        }}
      />
    {:else}
      <RoundButton hidden>
        {task}
      </RoundButton>
    {/if}
  </task-name>
  <buttons-first>
    <RoundButton on:click={handleDirection('right')}>
      <arrow class="right" />
    </RoundButton>
    <RoundButton on:click={handleDirection('up')}>
      <arrow class="up" />
    </RoundButton>
  </buttons-first>
  <date-due>
    {#if dateDue}
      {formatDate(dateDue)}
    {:else}
      <RoundButton hidden={true}>📆</RoundButton>
    {/if}
  </date-due>
  <buttons-second>
    <RoundButton on:click={handleDirection('down')}>
      <arrow class="down" />
    </RoundButton>
    <RoundButton on:click={handleDirection('left')}>
      <arrow class="left" />
    </RoundButton>
  </buttons-second>
</task-container>

<style>
  /* neumorphic style card */
  task-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 0.2fr 1.5fr 0.2fr;
    gap: 0px 0px;
    grid-template-areas:
      'tag-name date-created delete'
      'task-name task-name task-name'
      'buttons-first date-due buttons-second';
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    background: var(--task-color);
    padding: 5px;
    margin: 10px;

    /* box-shadow: -2px -2px 6px rgba(255, 255, 255, 0.6),
      -2px -2px 4px rgba(255, 255, 255, 0.4),
      2px 2px 2px rgba(255, 255, 255, 0.05), 2px 2px 4px rgba(0, 0, 0, 0.1); */
    font-weight: 600;
    font-size: 0.8rem;
    max-width: 300px;
  }

  tag-name {
    grid-area: tag-name;
    text-align: center;
  }

  date-created {
    grid-area: date-created;
    text-align: center;
    cursor: grab;
    user-select: none;
  }

  delete-button {
    grid-area: delete;
    text-align: center;
  }

  task-name {
    grid-area: task-name;
    font-size: 1rem;
    margin: 0.5em;
    text-align: center;
    transition: 0.2s ease-in-out;
    cursor: pointer;
    border-radius: 0.5rem;
    user-select: none;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--interactable-color);
  }

  textarea {
    width: 100%;
    height: auto;
    min-height: 2fr;
    resize: none;
    border: none;
    outline: none;
    padding: 1em;
    margin: 1em;

    border-radius: 10px;
    background-color: #a3a2a2;
    box-shadow: inset 5px 5px 10px #8f8f8f, inset -5px -5px 10px #b1b1b1;
    color: var(--interactable-color);
    font-weight: 600;
  }

  textarea::selection {
    background-color: #bdbdbd;
  }

  /* task-name:hover {
    background: #c2c2c2;
    box-shadow: -2px -2px 6px rgba(255, 255, 255, 0.6),
      -2px -2px 4px rgba(255, 255, 255, 0.4),
      2px 2px 2px rgba(255, 255, 255, 0.05), 2px 2px 4px rgba(0, 0, 0, 0.1);
  }
  task-name:active {
    background: #c2c2c2;
    box-shadow: -2px -2px 6px rgba(255, 255, 255, 0.6),
      -2px -2px 4px rgba(255, 255, 255, 0.4),
      2px 2px 2px rgba(255, 255, 255, 0.05), 2px 2px 4px rgba(0, 0, 0, 0.1);
  } */

  arrow {
    border: solid var(--interactable-color);
    border-width: 0 3px 3px 0;
    display: inline-block;
    padding: 3px;
  }

  .left {
    transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
  }

  .right {
    transform: rotate(135deg);
    -webkit-transform: rotate(135deg);
  }

  .up {
    transform: rotate(-135deg);
    -webkit-transform: rotate(-135deg);
  }

  .down {
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
  }

  buttons-first {
    grid-area: buttons-first;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  date-due {
    grid-area: date-due;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  buttons-second {
    grid-area: buttons-second;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
