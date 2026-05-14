// Dev-only in-page editor.
// Loaded by dev-server.py via runtime injection — never present in shipped HTML.
// Only activates when served from localhost; no-op on a deployed site even if accidentally loaded.
(function () {
  const host = location.hostname;
  if (host !== 'localhost' && host !== '127.0.0.1' && host !== '::1') return;

  const STYLE = `
    #dev-edit-bar { position: fixed; bottom: 16px; right: 16px; display: flex; align-items: center; gap: 8px; background: #1A2030; color: #F1F5F9; border-radius: 10px; padding: 8px 12px; font: 13px/1.2 system-ui, -apple-system, sans-serif; box-shadow: 0 6px 18px rgba(0,0,0,0.28); z-index: 99999; direction: ltr; }
    #dev-edit-bar button { background: #2A3346; border: 1px solid #3F4A60; color: #F1F5F9; padding: 6px 10px; border-radius: 6px; cursor: pointer; font: inherit; }
    #dev-edit-bar button:hover { background: #3A445A; }
    #dev-edit-bar button:disabled { opacity: 0.4; cursor: not-allowed; }
    #dev-edit-bar button.live { background: #7DD957; border-color: #7DD957; color: #0E1117; font-weight: 600; }
    #dev-status { font-size: 12px; color: #9AB0CC; min-width: 64px; text-align: center; }
    article[contenteditable=true] *:hover { outline: 1px dashed #FFB347 !important; outline-offset: 2px; }
    article[contenteditable=true] *:focus { outline: 2px solid #7DD957 !important; outline-offset: 2px; }
  `;

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(() => {
    const article = document.querySelector('article');
    if (!article) {
      // Nothing semantic to edit — don't render the bar.
      return;
    }

    const style = document.createElement('style');
    style.textContent = STYLE;
    style.dataset.devInjected = '1';
    document.head.appendChild(style);

    const bar = document.createElement('div');
    bar.id = 'dev-edit-bar';
    bar.dataset.devInjected = '1';
    bar.innerHTML =
      '<button id="dev-edit" type="button">✏ Edit</button>' +
      '<button id="dev-save" type="button" disabled>💾 Save</button>' +
      '<span id="dev-status" aria-live="polite"></span>';
    document.body.appendChild(bar);

    const btnEdit = bar.querySelector('#dev-edit');
    const btnSave = bar.querySelector('#dev-save');
    const status = bar.querySelector('#dev-status');

    let editing = false;
    let dirty = false;

    article.addEventListener('input', () => {
      if (editing) {
        dirty = true;
        status.textContent = 'unsaved';
      }
    });

    btnEdit.addEventListener('click', () => {
      editing = !editing;
      article.contentEditable = editing ? 'true' : 'false';
      btnEdit.textContent = editing ? '🛑 Stop' : '✏ Edit';
      btnEdit.classList.toggle('live', editing);
      btnSave.disabled = !editing;
      status.textContent = editing ? 'editing' : '';
    });

    // Whitelists used at save-time to keep browser extensions, password managers,
    // and our own injected nodes from polluting the file on disk.
    const HEAD_KEEP = (el) => {
      const t = el.tagName.toLowerCase();
      if (t === 'meta' || t === 'title') return true;
      if (t === 'link') {
        const rel = (el.getAttribute('rel') || '').toLowerCase();
        // Accept the project's stylesheet + standard discovery links; drop the rest.
        return rel === 'stylesheet' || rel === 'icon' || rel === 'preconnect' || rel === 'manifest';
      }
      return false;
    };
    const BODY_KEEP = (el) => {
      const t = el.tagName.toLowerCase();
      // Site pages use these top-level structural tags only.
      return t === 'nav' || t === 'article' || t === 'footer' || t === 'header' || t === 'main' || t === 'section';
    };

    btnSave.addEventListener('click', async () => {
      // Resolve the save target. If we're at a directory URL, treat it as index.html.
      let path = location.pathname;
      if (path.endsWith('/')) path += 'index.html';

      // Clone the document, then scrub.
      const docClone = document.documentElement.cloneNode(true);

      // 1. Remove anything we injected (the editor's <style>, <script>, and the dock).
      docClone.querySelectorAll('[data-dev-injected]').forEach((n) => n.remove());

      // 2. Filter <head>: keep meta/title/link(stylesheet), drop everything else
      //    (extension-injected style/script, miscellaneous junk).
      const head = docClone.querySelector('head');
      if (head) {
        Array.from(head.children).forEach((el) => {
          if (!HEAD_KEEP(el)) el.remove();
        });
      }

      // 3. Filter <body>: keep only known top-level structural elements.
      //    Catches extension overlays (Grammarly, autofill icons, etc.) that
      //    sit as sibling <div>s next to our <article>.
      const body = docClone.querySelector('body');
      if (body) {
        Array.from(body.children).forEach((el) => {
          if (!BODY_KEEP(el)) el.remove();
        });
      }

      // 4. Strip the contenteditable attribute itself.
      docClone.querySelectorAll('[contenteditable]').forEach((n) => n.removeAttribute('contenteditable'));

      const html = '<!doctype html>\n' + docClone.outerHTML + '\n';

      status.textContent = 'saving…';
      try {
        const res = await fetch(path, {
          method: 'PUT',
          headers: { 'Content-Type': 'text/html; charset=utf-8' },
          body: html,
        });
        if (res.ok) {
          dirty = false;
          status.textContent = '✓ saved';
          setTimeout(() => {
            if (!dirty) status.textContent = editing ? 'editing' : '';
          }, 1800);
        } else {
          const text = await res.text().catch(() => '');
          status.textContent = `✗ ${res.status}`;
          console.error('[dev-edit] save failed', res.status, text);
        }
      } catch (e) {
        status.textContent = '✗ error';
        console.error('[dev-edit] save error', e);
      }
    });

    // Warn before navigating away with unsaved edits.
    window.addEventListener('beforeunload', (e) => {
      if (dirty) {
        e.preventDefault();
        e.returnValue = '';
      }
    });
  });
})();
