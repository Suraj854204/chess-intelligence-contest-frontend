const $ = (s, ctx = document) => ctx.querySelector(s);
const $$ = (s, ctx = document) => [...ctx.querySelectorAll(s)];

const btn = $('[data-menu-btn]');
const panel = $('[data-mobile-panel]');

if (btn && panel) {
  btn.addEventListener('click', () => {
    const open = panel.classList.toggle('is-open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

$$('.mode-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const id = tab.dataset.tab;

    $$('.mode-tab').forEach(t => {
      t.classList.toggle('is-active', t === tab);
      t.setAttribute('aria-selected', t === tab ? 'true' : 'false');
    });

    $$('.search-pane').forEach(p => {
      p.classList.toggle('is-active', p.dataset.pane === id);
    });
  });
});

$$('.query-chips button').forEach(chip =>
  chip.addEventListener('click', () => {
    $('#primary-search').value = chip.textContent.trim();
    $('#primary-search').focus();
  })
);

const io = new IntersectionObserver(entries =>
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('is-visible');
      io.unobserve(e.target);
    }
  }),
  { threshold: 0.12 }
);

$$('.reveal').forEach(el => io.observe(el));

let ticking = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      const header = document.querySelector('[data-header]');
      if (header) {
        header.classList.toggle('is-scrolled', scrollY > 8);
      }
      ticking = false;
    });

    ticking = true;
  }
});