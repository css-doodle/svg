<div use:initEditor />

<script>
  import { onMount, onDestroy, createEventDispatcher } from 'svelte';

  import {basicSetup} from "codemirror"

  import {EditorState, Compartment} from "@codemirror/state"
  import {EditorView, keymap} from '@codemirror/view';
  import {indentWithTab, defaultKeymap, history, historyKeymap} from '@codemirror/commands';
  import {syntaxHighlighting, defaultHighlightStyle} from "@codemirror/language";
  import {css} from "@codemirror/lang-css";
  import theme from './theme.js';

  export let code = '';

  let language = new Compartment;

  let editor;
  let dispatch = createEventDispatcher();

  function getState(code) {
    return EditorState.create({
      doc: code,
      extensions: [
        basicSetup,
        language.of(css()),
        history(),
        theme,
        keymap.of([...defaultKeymap, indentWithTab, ...historyKeymap]),
        syntaxHighlighting(defaultHighlightStyle),
        EditorView.updateListener.of(v => {
          if (v.docChanged) {
            dispatch('change', editor.state.doc.toString());
          }
        })
      ]
    });
  }

  function initEditor(element) {
    editor = new EditorView({
      state: getState(code),
      parent: element,
    });
    return {
      destroy() {
        editor.destroy();
      }
    }
  }

  export function updateCode(input) {
    if (editor) {
      code = input;
      editor.setState(getState(input));
    }
  }
</script>

<style>
  div {
    font-size: 14px;
    font-weight: 400;
    height: 100%;
    letter-spacing: normal;
    line-height: 1.4;
    tab-size: 2;
    display: grid;
  }

  @media screen and (max-width: 25.875em) {
    div {
      font-size: 12px;
    }
  }
</style>
