<script>
  export let hidden = false;
</script>

<button class:hidden><slot /></button>

<style>
  button {
    margin: 0.3em;
    padding: 0.8em 1.5em;
    background: var(--interactable-color);
    border: none;
    border-radius: 0.5rem;
    color: #444;
    font-size: 1rem;
    font-weight: 700;
    letter-spacing: 0.2rem;
    text-align: center;
    outline: none;
    cursor: pointer;
    transition: 0.2s ease-in-out;
    box-shadow: -2px -2px 6px rgba(255, 255, 255, 0.6),
      -2px -2px 4px rgba(255, 255, 255, 0.4),
      2px 2px 2px rgba(255, 255, 255, 0.05), 2px 2px 4px rgba(0, 0, 0, 0.1);
  }
  button:active {
    box-shadow: inset -2px -2px 6px rgba(255, 255, 255, 0.7),
      inset -2px -2px 4px rgba(255, 255, 255, 0.5),
      inset 2px 2px 2px rgba(255, 255, 255, 0.075),
      inset 2px 2px 4px rgba(0, 0, 0, 0.15);
  }
  .hidden {
    box-shadow: unset;
    background: unset;
  }
  .hidden:hover {
    background: var(--interactable-color);
    box-shadow: -2px -2px 6px rgba(255, 255, 255, 0.6),
      -2px -2px 4px rgba(255, 255, 255, 0.4),
      2px 2px 2px rgba(255, 255, 255, 0.05), 2px 2px 4px rgba(0, 0, 0, 0.1);
  }
  .hidden:active {
    box-shadow: inset -2px -2px 6px rgba(255, 255, 255, 0.7),
      inset -2px -2px 4px rgba(255, 255, 255, 0.5),
      inset 2px 2px 2px rgba(255, 255, 255, 0.075),
      inset 2px 2px 4px rgba(0, 0, 0, 0.15);
  }
</style>
