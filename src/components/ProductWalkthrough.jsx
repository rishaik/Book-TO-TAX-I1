import React, { useEffect } from 'react';
import 'intro.js/introjs.css';
import { WalkthroughAnalytics } from '../utils/walkthroughAnalytics';
import '../styles/walkthrough.css';

const ProductWalkthrough = ({ isActive, onClose, onComplete }) => {
  useEffect(() => {
    if (isActive) {
      let introInstance;
      const analytics = new WalkthroughAnalytics({ walkthroughName: 'book_tax_walkthrough', totalSteps: 6 });

      // Dynamic import for lazy loading and faster initial load
      import('intro.js').then(({ default: introJs }) => {
        const intro = introJs();
        introInstance = intro;
      
      intro.setOptions({
        nextLabel: 'Next',
        prevLabel: 'Back',
        skipLabel: '×',
        doneLabel: 'Get Started!',
        showProgress: false,
        showBullets: true,
        exitOnOverlayClick: true,
        exitOnEsc: true,
        scrollToElement: true,
        scrollPadding: 30,
        disableInteraction: false,
        tooltipClass: 'custom-tooltip',
        highlightClass: 'custom-highlight',
        steps: [
          {
            intro: '<h4>Hello World! 👋</h4><p>Welcome to your guided tour.</p>',
            position: 'auto'
          },
          {
            element: '[data-intro="book-data-tab"]',
            intro: '<h4>Core Feature #1</h4><p>Book Data shows your core financials for reconciliation.</p>',
            position: 'bottom',
            blurBackground: true
          },
          {
            element: '[data-intro="search-bar"]',
            intro: '<h4>Core Feature #2</h4><p>Use search to quickly find records and speed decisions.</p>',
            position: 'bottom',
            blurBackground: true
          },
          {
            element: '[data-intro="sub-tabs"]',
            intro: '<h4>Navigation</h4><p>Switch views here: General Ledger or Trial Balance.</p>',
            position: 'bottom'
          },
          {
            element: '[data-intro="add-button"]',
            intro: '<h4>Key Action</h4><p>Add manual adjustments in this panel. We\'ll open it for you.</p>',
            position: 'left',
            blurBackground: true,
            prepare: 'openManualPanel'
          },
          {
            element: '[data-intro="footer-info"]',
            intro: '<h4>Resources & Next Steps</h4><p>Need help later? Use the help button to replay.</p>',
            position: 'top'
          }
        ]
      });

        // Start the tour and add passive hints
        analytics.start();
        intro.start();
        (async () => {
          try {
            const { default: introJs2 } = await import('intro.js');
            introJs2().hint().addHints();
          } catch (_) {}
        })();

        // Step change tracking and dynamic overlay blur
        const applyOverlayBlurForStep = (stepIndex) => {
          const overlay = document.querySelector('.introjs-overlay');
          if (!overlay) return;
          try {
            const step = (intro._options && intro._options.steps && intro._options.steps[stepIndex]) || {};
            if (step.blurBackground) {
              overlay.classList.add('overlay-strong-blur');
            } else {
              overlay.classList.remove('overlay-strong-blur');
            }
          } catch (_) {}
        };

        const waitFor = (selector, timeoutMs = 3000) => new Promise((resolve, reject) => {
          const start = performance.now();
          const tick = () => {
            const el = document.querySelector(selector);
            if (el) return resolve(el);
            if (performance.now() - start > timeoutMs) return reject(new Error('Timeout waiting for ' + selector));
            requestAnimationFrame(tick);
          };
          tick();
        });

        const clickIfExists = (selector) => {
          const el = document.querySelector(selector);
          if (el) {
            try { el.scrollIntoView({ behavior: 'smooth', block: 'center' }); } catch (_) {}
            el.click();
          }
        };

        const openManualPanelFlow = async () => {
          // 1) Go to Book Adjustments tab
          clickIfExists('[data-intro="book-adjustments-tab"]');
          // 2) Wait for sub-tabs and click Manual
          await waitFor('.sub-nav-tabs');
          const manualBtn = Array.from(document.querySelectorAll('.sub-nav-tabs button')).find(b => (b.textContent || '').trim() === 'Manual');
          if (manualBtn) manualBtn.click();
          // 3) Wait for + button and click to open sidepanel
          await waitFor('[data-intro="add-button"]');
          clickIfExists('[data-intro="add-button"]');
          // 4) Wait for sidepanel to appear and refresh positioning
          await waitFor('.sidepanel');
          try {
            const current = intro._currentStep || 0;
            const panel = document.querySelector('.sidepanel');
            if (panel && intro._introItems && intro._introItems[current]) {
              intro._introItems[current].element = panel;
            }
            intro.refresh();
          } catch (_) {}
        };

        intro.onchange(async () => {
          const current = intro._currentStep || 0;
          analytics.changeStep(current);
          try {
            const step = (intro._options && intro._options.steps && intro._options.steps[current]) || {};
            if (step.prepare === 'openManualPanel') {
              await openManualPanelFlow();
            }
          } catch (_) {}
          applyOverlayBlurForStep(current);
        });

        intro.onafterchange(() => {
          const current = intro._currentStep || 0;
          applyOverlayBlurForStep(current);
        });

        // Handle tour completion
        intro.oncomplete(() => {
          try { document.querySelector('.introjs-overlay')?.classList.remove('overlay-strong-blur'); } catch (_) {}
          analytics.complete();
          onClose && onClose();
          onComplete && onComplete();
        });

        // Handle tour exit
        intro.onexit(() => {
          try { document.querySelector('.introjs-overlay')?.classList.remove('overlay-strong-blur'); } catch (_) {}
          analytics.exit('exit');
          onClose && onClose();
          onComplete && onComplete();
        });
      });

      // Cleanup function
      return () => {
        try {
          introInstance && introInstance.exit();
        } catch (_) {}
        try { document.querySelector('.introjs-overlay')?.classList.remove('overlay-strong-blur'); } catch (_) {}
      };
    }
  }, [isActive, onClose]);

  // This component doesn't render anything visible
  // Intro.js handles all the UI
  return null;
};

export default ProductWalkthrough;
