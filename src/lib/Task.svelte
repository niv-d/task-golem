<script>
  import RoundButton from './RoundButton.svelte';

  export let tag = 'unset';
  export let dateCreated = new Date();
  export let task = 'edit me';
  export let dateDue = null;

  const formatDate = (date) =>
    date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
</script>

<task-container>
  <tag-name>{tag}</tag-name>
  <date-created>{formatDate(dateCreated)}</date-created>
  <delete-button />
  <task-name>
    {task}
  </task-name>
  <buttons-first>
    <RoundButton>
      <arrow class="right" />
    </RoundButton>
    <RoundButton>
      <arrow class="up" />
    </RoundButton>
  </buttons-first>
  <date-due>
    {#if dateDue}
      {dateDue}
    {:else}
      <RoundButton hidden={true}>due date</RoundButton>
    {/if}
  </date-due>
  <buttons-second>
    <RoundButton>
      <arrow class="down" />
    </RoundButton>
    <RoundButton>
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
    padding: 10px;
    margin: 10px;

    box-shadow: -2px -2px 6px rgba(255, 255, 255, 0.6),
      -2px -2px 4px rgba(255, 255, 255, 0.4),
      2px 2px 2px rgba(255, 255, 255, 0.05), 2px 2px 4px rgba(0, 0, 0, 0.1);
    font-weight: 600;
    font-size: 0.8rem;
    max-width: 320px;
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
    font-size: 1.2rem;
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
  task-name:hover {
    background: #c2c2c2;
    box-shadow: -2px -2px 6px rgba(255, 255, 255, 0.6),
      -2px -2px 4px rgba(255, 255, 255, 0.4),
      2px 2px 2px rgba(255, 255, 255, 0.05), 2px 2px 4px rgba(0, 0, 0, 0.1);
  }
  task-name:active {
    box-shadow: inset -2px -2px 6px rgba(255, 255, 255, 0.7),
      inset -2px -2px 4px rgba(255, 255, 255, 0.5),
      inset 2px 2px 2px rgba(255, 255, 255, 0.075),
      inset 2px 2px 4px rgba(0, 0, 0, 0.15);
  }

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
