(function () {
  console.log('[Pake Adblock] injected');
  console.log('[Pake Adblock] url:', location.href);

  const SELECTORS = ['.vui_icon bili-video-card__stats--icon'];

  function removeAds() {
    SELECTORS.forEach((selector) => {
      const nodes = document.querySelectorAll(selector);
      console.log(`[Pake Adblock] ${selector}:`, nodes.length);

      nodes.forEach((el) => {
        console.log('[Pake Adblock] removing element:', el);
        el.style.outline = '2px solid red'; // 先标记，确认后再 remove
        // el.remove();
      });
    });
  }

  function start() {
    console.log('[Pake Adblock] start');
    removeAds();

    const observer = new MutationObserver(() => {
      console.log('[Pake Adblock] mutation observed');
      removeAds();
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();
