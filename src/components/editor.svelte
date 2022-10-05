<div
  bind:this={element}
/>

<script>
  import { onMount, onDestroy, createEventDispatcher } from 'svelte';
  import 'prismjs/themes/prism-funky.css';

  export let code = '';

  let element;
  let jar;
  let dispatch = createEventDispatcher();

  onMount(async () => {
    const {CodeJar} = await import('codejar');
    const Prism = await import('prismjs');

    function highlight(editor) {
      editor.innerHTML = Prism.highlight(
        editor.textContent,
        Prism.languages.css
      );
    }

    if (element) {
      jar = new CodeJar(element, highlight);

      jar.updateCode(code);
      jar.onUpdate(input => {
        code = input;
        dispatch('input', input);
      });
    }
  });

  export function updateCode(input) {
    if (jar) {
      code = input;
      jar.updateCode(code);
    }
  }

  onDestroy(() => {
    if (jar) {
      jar.destroy();
    }
  });
</script>

<style>
  div {
    font-family: 'Source Code Pro', monospace;
    font-size: 14px;
    font-weight: 400;
    height: 100%;
    letter-spacing: normal;
    line-height: 1.4;
    padding: 1.6em;
    tab-size: 2;
    background: #1b2e37;
    color: #d5f1ff;
  }

  @media screen and (max-width: 25.875em) {
    div {
      padding: 1em;
      font-size: 12px;
    }
  }
</style>
