import {EditorView} from '@codemirror/view';

const white = '#D5F1FF';
const dark = '#1b2e37';

export default EditorView.theme({
  "&": {
    color: white,
    backgroundColor: dark,
  },
  ".ͼi": {
    color: '#11b0ff',
  },
  ".ͼd": {
    color: '#e9e91e',
  },
  ".ͼc": {
    color: '#8d7cff',
  },
  ".ͼb": {
    color: '#eb5eff',
  },
  ".ͼm": {
    color: '#66787f',
  },
  ".ͼj": {
    color: '#8d7cff',
  },
  "&.cm-focused .cm-cursor": {
    borderLeftColor: "yellow"
  },
  "&.cm-focused .cm-selectionBackground, ::selection": {
    backgroundColor: '#233b49',
  },
  ".cm-selectionBackground": {
    backgroundColor: '#242D4A',
  },
  ".cm-gutters": {
    backgroundColor: "#1B2D37",
    color: "#D5F1FF33",
    border: "none"
  },
  ".cm-activeLine": {
    backgroundColor: '#233b49',
  },
  ".cm-activeLineGutter": {
    color: white,
    backgroundColor: '#233b49',
  }
}, {dark: true});

