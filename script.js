(function () {
  const cfg = window.COIN_CONFIG || {};
  const $ = (sel) => document.querySelector(sel);

  function setText(id, text) {
    const el = $(id);
    if (el && text) el.textContent = text;
  }

  document.title = `${cfg.name || 'Memecoin'}`;
  setText('#site-title', cfg.name);
  setText('#coin-name', cfg.name);
  setText('#coin-name-inline', cfg.name);
  // Hide ticker badge if empty
  const tickerEl = document.querySelector('#ticker');
  if (tickerEl) {
    if (cfg.ticker && cfg.ticker.trim() !== '') {
      tickerEl.textContent = cfg.ticker;
    } else {
      tickerEl.parentElement.removeChild(tickerEl);
    }
  }
  setText('#mint', cfg.mint);
  setText('#footer-name', cfg.name);
  setText('#supply', cfg.supply);
  setText('#about-text', cfg.about);

  const pumpUrl = cfg.pumpUrl || '';
  const xUrl = cfg.xCommunityUrl || '#';
  const solscanUrl = cfg.mint ? `${cfg.solscanBase || 'https://solscan.io/token/'}${cfg.mint}` : '#';

  const setHref = (id, href) => { const el = $(id); if (el && href) el.href = href; };
  // Pump button removed per request
  setHref('#btn-x', xUrl);
  setHref('#link-pump', pumpUrl);
  setHref('#link-x', xUrl);
  setHref('#link-mintscan', solscanUrl);

  const copyBtn = $('#copy-mint');
  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(cfg.mint || '');
        copyBtn.textContent = 'Copied!';
        setTimeout(() => (copyBtn.textContent = 'Copy Mint'), 1200);
      } catch (_) {
        copyBtn.textContent = 'Copy failed';
        setTimeout(() => (copyBtn.textContent = 'Copy Mint'), 1200);
      }
    });
  }
})();


