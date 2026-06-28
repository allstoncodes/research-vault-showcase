// mermaid-init.js — Mermaid v11 init using DESIGN.md tokens
//
// WHY dynamic injection instead of ESM `import`:
//   WKWebView (cmux's browser engine on macOS) blocks cross-origin ES module
//   imports when the page is loaded via file://. A bare `import mermaid from CDN`
//   silently fails — no console error, no SVG render. Dynamic <script> injection
//   loads the UMD bundle instead, which works on file:// pages because it's
//   treated as a regular cross-origin script, not an ES module import.
//   This file remains a module (`<script type="module">`) for deferred loading
//   and module-scope isolation; it just injects UMD internally.

(function () {
  const MERMAID_CDN = 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js';

  const CONFIG = {
    startOnLoad: false,   // we call run() explicitly after the script loads
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
  };

  function runMermaid() {
    window.mermaid.initialize(CONFIG);
    // Explicit run — handles both "DOM already ready" and "still loading" cases
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () =>
        window.mermaid.run({ querySelector: '.mermaid' })
      );
    } else {
      window.mermaid.run({ querySelector: '.mermaid' });
    }
  }

  // If mermaid was already loaded by another script, just run immediately
  if (window.mermaid) {
    runMermaid();
    return;
  }

  // Inject UMD bundle via <script> tag — works on file:// pages in WKWebView
  const script = document.createElement('script');
  script.src = MERMAID_CDN;
  script.onload = runMermaid;
  script.onerror = () => {
    // eslint-disable-next-line no-console
    console.warn('[mermaid-init] Failed to load Mermaid from CDN — diagrams will not render.');
  };
  document.head.appendChild(script);
}());
