// nav.js — site nav injection + IntersectionObserver for active sidebar TOC links
(function () {
  const pages = [
    { href: 'index.html', label: 'Home' },
    { href: 'overview.html', label: 'Overview' },
    { href: 'technical.html', label: 'Technical' },
    { href: 'architecture.html', label: 'Architecture' },
  ];

  // Determine which page is current by matching the filename
  const current = location.pathname.split('/').pop() || 'index.html';

  const nav = document.createElement('nav');
  nav.className = 'site-nav';
  nav.setAttribute('aria-label', 'Site navigation');
  nav.innerHTML = `
    <a href="index.html" class="site-nav-brand">Research Vault</a>
    <div class="site-nav-links">
      ${pages.map(p =>
        `<a href="${p.href}"${p.href === current ? ' class="active" aria-current="page"' : ''}>${p.label}</a>`
      ).join('')}
    </div>
  `;
  document.body.prepend(nav);

  // IntersectionObserver: highlight active TOC link as user scrolls
  const tocLinks = document.querySelectorAll('.toc a[href^="#"]');
  if (!tocLinks.length) return;

  const sections = Array.from(tocLinks)
    .map(a => document.getElementById(a.getAttribute('href').slice(1)))
    .filter(Boolean);

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const link = document.querySelector(`.toc a[href="#${entry.target.id}"]`);
      if (link) link.classList.toggle('active', entry.isIntersecting);
    });
  }, { rootMargin: '-20% 0px -70% 0px', threshold: 0 });

  sections.forEach(s => observer.observe(s));
})();
