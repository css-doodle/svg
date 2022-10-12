<main>
  <div class="editor">
    <header class="editor-header">
      <h1>
        <a href="https://yuanchuan.dev/experimenting-a-new-syntax-to-write-svg" target="_blank">
          New Syntax To Write SVG
        </a>
      </h1>
      {#if selectedName}
        <select on:change={handleSelect} value={selectedName}>
          {#each exampleNames as name}
            <option value={name}>{name}</option>
          {/each}
        </select>
      {/if}
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
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { svg } from 'css-doodle/generator';
  import Editor from '../components/editor/index.svelte';

  import examples from '../examples.js';

  let exampleNames = Object.keys(examples);
  let selectedName = '';
  let code = '';

  let editor;
  let tab = 'graph';

  $: svgCode = svg(code);

  function handleChange(e) {
    code = e.detail;
  }

  function handleSelect(e) {
    let name = (typeof e === 'string') ? e : e.target.value;
    code = examples[name];
    if (!code) {
      name = exampleNames[0];
      code = examples[name];
    }
    selectedName = name;
    editor.updateCode(code);
    updateUrl(name);
  }

  function updateUrl(name) {
    let query = new URLSearchParams(location.search);
    query.set('name', name);
    goto(location.pathname + '?' + query.toString(), {
      replaceState: true
    });
  }

  onMount(() => {
    let query = new URLSearchParams(location.search);
    let name = query.get('name');
    if (!name) {
      name = exampleNames[0];
      code = examples[name];
      selectedName = name;
      editor.updateCode(code);
    } else {
      handleSelect(name);
    }
  });
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
    font-size: 16px;
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
    min-width: 5em;
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
