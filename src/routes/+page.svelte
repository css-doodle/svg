<main>
  <div class="editor">
    <header class="editor-header">
      <h1>
        <a href="https://yuanchuan.dev/experimenting-a-new-syntax-to-write-svg" target="_blank">
          New Syntax To Write SVG
          <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="svelte-1vv9v21"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
        </a>
      </h1>
      <select on:change={handleSelect}>
        {#each allExamples as item}
          <option value={item.value}>{item.name}</option>
        {/each}
      </select>
    </header>
    <div class="editor-container">
      <Editor {code} bind:this={editor} on:change={handleChange} />
    </div>
  </div>

  <div class="preview">
    <header class="preview-header">
      <button class:active={tab === 'graph'} on:click={() => tab = 'graph'}>Preview</button>
      <button class:active={tab === 'svg'} on:click={() => tab = 'svg'}>SVG</button>
    </header>
    <div class="preview-graph" class:svg={tab === 'svg'}>
      {#if tab === 'graph'}
        {@html svgCode}
      {:else}
        <pre>{svgCode}</pre>
      {/if}
    </div>
  </div>
</main>

<script>
  import { svg } from 'css-doodle/generator';
  import Editor from '../components/editor/index.svelte';

  import examples from '../examples.js';

  let allExamples = getExamples(examples);
  let code = allExamples[0].value;

  $: svgCode = svg(code);
  let editor;
  let tab = 'graph';

  function getExamples(examples) {
    let result = [];
    for (let [name, value] of Object.entries(examples)) {
      result.push({ name, value });
    }
    return result;
  }

  function handleChange(e) {
    code = e.detail;
  }

  function handleSelect(e) {
    code = e.target.value;
    editor.updateCode(code);
  }
</script>

<style>
  main {
    --dark: #1b2e37;
    --light: #d5f1ff;
  }

  main {
    display: grid;
    height: 100%;
    grid-template-columns: 1fr 1fr;
  }

  .editor, .preview {
    height: 100%;
    overflow: auto;
  }

  @media screen and (max-width: 51.25em) {
    main {
      grid-template: 1fr 1fr / auto;
    }
  }

  h1 {
    margin: 0;
    font-size: 1em;
  }
  a {
    color: var(--light);
    text-decoration: none;
    display: flex;
    align-items: center;
  }

  a:hover {
    text-decoration: underline;
  }

  .editor {
    display: flex;
    flex-direction: column;
  }

  .editor-container {
    flex: 1;
    overflow: auto;
    background: var(--dark);
  }

  select {
    margin-left: auto;
    background: transparent;
    border: 1px solid var(--light);
    color: var(--light);
    padding: 4px;
    border-radius: 3px;
  }

  .preview {
    display: flex;
    flex-direction: column;
    background: var(--light);
  }

  .preview-graph {
    flex: 1;
    display: grid;
    place-items: center;
    padding: 5vmax;
    overflow: auto;
  }

  .preview-graph :global(svg) {
    max-width: 100%;
    max-height: 100%;
  }

  .svg {
    display: block;
    padding: 1.6em;
  }

  pre {
    white-space: pre-wrap;
    user-select: all;
    margin: 0;
  }

  header {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 10px;
    height: 48px;
  }

  .editor-header {
    border-bottom: 1px solid var(--light);
    background: var(--dark);
    color: var(--light);
  }

  .preview-header {
    border-bottom: 1px solid var(--dark);
    justify-content: center;
  }
  .preview-header button {
    padding: 5px 4px;
    background: transparent;
    border: 1px solid var(--dark);
    width: 5em;
  }
  .preview-header button.active {
    background: var(--dark);
    color: var(--light);
  }

  .preview-header button:first-child {
    border-radius: 3px 0 0 3px;
  }

  .preview-header button:last-child {
    border-radius: 0 3px 3px 0;
    margin-left: -1px;
  }
</style>
