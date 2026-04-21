(function () {
  'use strict';

  const tabs     = document.querySelectorAll('.tab-btn');
  const sections = document.querySelectorAll('.menu-section');

  if (!tabs.length || !sections.length) return;

  // ─── Set active tab ───
  function setActive(id) {
    tabs.forEach(function (tab) {
      const isMatch = tab.dataset.target === id;
      tab.classList.toggle('active', isMatch);
      if (isMatch) tab.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
    });
  }

  // ─── Tab click → scroll to section ───
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      const target = document.getElementById(tab.dataset.target);
      if (!target) return;
      setActive(tab.dataset.target);
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // ─── Scroll-spy ───
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        setActive(entry.target.id);
      }
    });
  }, {
    rootMargin: '-30% 0px -60% 0px',
    threshold: 0
  });

  sections.forEach(function (section) { observer.observe(section); });

  // ─── Activate first tab on load ───
  if (tabs[0]) setActive(tabs[0].dataset.target);
})();
