<main>
  <div class="editor">
    <header class="editor-header">
      <h1>
        <a href="https://yuanchuan.dev/experimenting-a-new-syntax-to-write-svg" target="_blank">
          New Syntax To Write SVG
        </a>
      </h1>
      <div class="nav">
        {#if selectedName || codeFromQuery}
          <select on:change={handleSelect} value={selectedName}>
            {#if codeFromQuery}
              <option value="other">Select example</option>
            {/if}
            {#each exampleNames as name}
              <option value={name}>{name}</option>
            {/each}
          </select>
        {/if}
        <a href="https://github.com/css-doodle/svg" target="_blank">
          <svg viewBox="0 0 16 16" version="1.1"><path fill="currentColor" fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"> </path> </svg>
        </a>
      </div>
    </header>
    <div class="editor-container">
      <Editor {code} bind:this={editor} on:change={handleChange} />
    </div>
    <div class="actions">
      {#if !codeFromQuery && mounted}
        <button on:click={saveToURL}>Save to URL</button>
      {/if}
    </div>
  </div>

  <div class="preview">
    <header class="preview-header">
      <button class:active={tab === 'graph'} on:click={() => tab = 'graph'}>Preview</button>
      <button class:active={tab === 'svg'} on:click={() => tab = 'svg'}>SVG</button>
    </header>
    <div class="preview-graph" class:svg={tab === 'svg'} class:full>
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
  let codeFromQuery = '';

  let editor;
  let tab = 'graph';

  let mounted = false;

  $: svgCode = svg(code);

  $: full = selectedName === 'weave';

  function handleChange(e) {
    code = e.detail;
    if (codeFromQuery) {
      saveToURL();
    }
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
    codeFromQuery = '';
  }

  function updateUrl(name) {
    let query = new URLSearchParams(location.search);
    query.set('name', name);
    query.delete('code');
    goto(location.pathname + '?' + query.toString(), {
      replaceState: true
    });
  }

  function saveToURL() {
    let query = new URLSearchParams(location.search);
    query.set('code', code);
    query.delete('name');
    codeFromQuery = code;
    selectedName = 'other';
    goto(location.pathname + '?' + query.toString(), {
      replaceState: true
    });
  }

  onMount(() => {
    let query = new URLSearchParams(location.search);
    let name = query.get('name');
    codeFromQuery = query.get('code');
    if (codeFromQuery) {
      code = codeFromQuery;
      editor.updateCode(code);
      selectedName = 'other';
    } else if (!name) {
      name = exampleNames[0];
      code = examples[name];
      selectedName = name;
      editor.updateCode(code);
    } else {
      handleSelect(name);
    }
    mounted = true;
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
    padding-right: .5em;
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
    position: relative;
  }

  .editor-container {
    flex: 1;
    overflow: auto;
    background: var(--dark);
  }

  select {
    font-size: 16px;
    background: transparent;
    border: 1px solid var(--light);
    color: var(--light);
    padding: 4px;
    border-radius: 3px;
  }
  @media screen and (max-width: 27em) {
    select {
      font-size: 14px;
    }
  }

  .nav {
    margin-left: auto;
    display: flex;
    align-items: center;
  }

  .nav svg {
    width: 24px;
    height: 24px;
    margin-left: .8em;
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

  .preview-graph.full {
    padding: 0;
  }
  .preview-graph.full pre {
    padding: 1.6rem;
  }

  .preview-graph :global(svg) {
    max-width: 100%;
    max-height: 100%;
  }
  .preview-graph.full :global(svg) {
    width: 100%;
    height: 100%;
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

  .preview {
    position: relative;
  }

  .preview-header {
    border-bottom: 1px solid var(--dark);
    justify-content: center;
  }

  .preview-header button {
    margin: 0;
    padding: 5px 4px;
    background: transparent;
    border: 1px solid var(--dark);
    min-width: 5em;
    font-size: 1em;
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

  .actions {
    position: absolute;
    bottom: 10px;
    right: 10px;
  }
  .actions button {
    background: rgba(0, 0, 0, .2);
    border: 1px solid var(--dark);
    padding: 5px 8px;
    font-size: inherit;
    color: var(--light);
    cursor: pointer;
    border-radius: 3px;
  }
  @media screen and (max-width: 51.25em) {
    .preview-graph pre {
      padding-right: 1.6em;
    }
    .preview-header {
      border-bottom: none;
      position: absolute;
      padding: 0;
      opacity: .9;
      top: 10px;
      right: 10px;
      z-index: 2;
      height: auto;
      width: auto;
      transform-origin: 100% 0;
      transform: rotate(90deg) translateX(100%);;
    }
    .preview-header button {
      background: #D5F1FF;
    }
    .preview-header button:first-child,
    .preview-header button:last-child {
      min-width: 4.5em;
    }
  }
</style>
