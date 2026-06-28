// mermaid-init.js — Mermaid global config using DESIGN.md tokens
import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';

mermaid.initialize({
  startOnLoad: true,
  theme: 'base',
  themeVariables: {
    primaryColor:        '#EFF6FF',
    primaryTextColor:    '#1C1C1E',
    primaryBorderColor:  '#2563EB',
    lineColor:           '#6B6B6B',
    secondaryColor:      '#FFFBEB',
    tertiaryColor:       '#F0FDF4',
    background:          '#FFFFFF',
    mainBkg:             '#EFF6FF',
    nodeBorder:          '#2563EB',
    clusterBkg:          '#FAFAF9',
    clusterBorder:       '#E5E4E2',
    titleColor:          '#1C1C1E',
    edgeLabelBackground: '#FFFFFF',
    fontFamily:          'Inter, system-ui, sans-serif',
    fontSize:            '13px',
  },
  flowchart: { useMaxWidth: true, htmlLabels: true, curve: 'basis' },
  sequence:  { useMaxWidth: true },
});
