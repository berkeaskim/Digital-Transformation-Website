/* ====================================================
   THE WISE GROUP — Main JavaScript
   ==================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── LOADING SCREEN ──────────────────────────────── */
  const loader = document.querySelector('.loader');
  if (loader) {
    window.addEventListener('load', () => {
      setTimeout(() => loader.classList.add('hidden'), 1200);
    });
    // Fallback in case load event already fired
    setTimeout(() => loader.classList.add('hidden'), 2000);
  }

  /* ─── NAVIGATION ──────────────────────────────────── */
  const nav = document.querySelector('.nav');
  const navToggle = document.querySelector('.nav__toggle');
  const navLinks = document.querySelector('.nav__links');

  // Scroll shadow
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 10);
    });
  }

  // Mobile toggle
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('open');
      navLinks.classList.toggle('open');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    // Close menu on link click
    navLinks.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('open');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ─── SCROLL REVEAL ───────────────────────────────── */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(el => observer.observe(el));
  }

  /* ─── BACK TO TOP ─────────────────────────────────── */
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('visible', window.scrollY > 500);
    });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ─── ACCORDION ───────────────────────────────────── */
  document.querySelectorAll('.accordion__trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const content = trigger.nextElementSibling;
      const isOpen = trigger.classList.contains('open');

      // Close all in same accordion
      const accordion = trigger.closest('.accordion');
      if (accordion) {
        accordion.querySelectorAll('.accordion__trigger').forEach(t => {
          t.classList.remove('open');
          t.nextElementSibling.classList.remove('open');
        });
      }

      if (!isOpen) {
        trigger.classList.add('open');
        content.classList.add('open');
      }
    });
  });

  /* ─── SOLUTION CARD TOGGLES ───────────────────────── */
  // Toggles are bound after dynamic render below

  /* ─── JOURNEY MAP TABS ────────────────────────────── */
  document.querySelectorAll('.journey-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.target;
      const container = tab.closest('.content-section, .section');

      container.querySelectorAll('.journey-tab').forEach(t => t.classList.remove('active'));
      container.querySelectorAll('.journey-map').forEach(m => m.classList.remove('active'));

      tab.classList.add('active');
      const targetMap = container.querySelector(`#${target}`);
      if (targetMap) targetMap.classList.add('active');
    });
  });

  /* ─── WORD COUNT CALCULATOR ───────────────────────── */
  function updateWordCounts() {
    document.querySelectorAll('[data-wordcount]').forEach(container => {
      const target = container.dataset.wordcount;
      const limit = parseInt(container.dataset.limit) || 0;
      const textEl = document.getElementById(target);
      if (!textEl) return;

      const text = textEl.innerText || textEl.textContent || '';
      const words = text.trim().split(/\s+/).filter(w => w.length > 0).length;

      const countEl = container.querySelector('.word-count__num');
      if (countEl) countEl.textContent = words;

      // Status classes
      container.classList.remove('word-count--ok', 'word-count--warning', 'word-count--over');
      if (limit > 0) {
        if (words > limit) container.classList.add('word-count--over');
        else if (words >= limit * 0.9) container.classList.add('word-count--warning');
        else if (words >= limit * 0.5) container.classList.add('word-count--ok');
      }
    });
  }
  updateWordCounts();
  // Re-run on mutations in case text is pasted in
  const wordCountObserver = new MutationObserver(updateWordCounts);
  document.querySelectorAll('[id]').forEach(el => {
    wordCountObserver.observe(el, { childList: true, subtree: true, characterData: true });
  });

  /* ─── RENDER SOLUTION CARDS (Phase 2) ─────────────── */
  const solutionsContainer = document.getElementById('solutions-container');
  if (solutionsContainer && typeof SOLUTIONS !== 'undefined') {
    solutionsContainer.innerHTML = SOLUTIONS.map(sol => `
      <div class="solution-card ${sol.isWinner ? 'solution-card--winner' : ''}">
        <div class="solution-card__top">
          <div class="solution-card__badges">
            <span class="badge ${sol.badgeClass}">${sol.badge}</span>
            ${sol.isWinner ? '<span class="badge badge--winner">Selected Solution</span>' : ''}
            ${sol.isNew ? '<span class="badge badge--new">New to Company</span>' : ''}
          </div>
          <h3 class="solution-card__title">Solution ${sol.id}: ${sol.title}</h3>
          <p class="solution-card__desc">${sol.description}</p>
        </div>

        <div class="solution-card__scores">
          ${Object.entries(SCORE_LABELS).map(([key, label]) => `
            <div class="score-item">
              <div class="score-item__label">${label}</div>
              <div class="score-item__value">${sol.scores[key]}</div>
            </div>
          `).join('')}
        </div>

        <div class="solution-card__total">
          <span class="solution-card__total-label">Total Score</span>
          <span class="solution-card__total-value">${sol.scores.total}/20</span>
        </div>

        <div class="solution-card__expand" id="expand-${sol.id}">
          <div class="solution-detail">
            <div class="solution-detail__label">Key Features</div>
            <div class="solution-detail__text">
              <ul>
                ${sol.features.map(f => `<li>${f}</li>`).join('')}
              </ul>
            </div>
          </div>

          <div class="solution-detail">
            <div class="solution-detail__label">Benefits</div>
            <div class="solution-detail__text">${sol.benefits}</div>
          </div>

          <div class="solution-detail">
            <div class="solution-detail__label">Strategic Challenge Addressed</div>
            <div class="solution-detail__text">${sol.strategicChallenge}</div>
          </div>

          <div class="solution-detail">
            <div class="solution-detail__label">Key Data & Insight</div>
            <div class="solution-detail__text">${sol.keyData}</div>
          </div>

          <div class="solution-detail">
            <div class="solution-detail__label">References</div>
            <div class="solution-detail__text">${sol.references}</div>
          </div>

          <div class="solution-detail">
            <div class="solution-detail__label">Identified Drawbacks</div>
            <div class="solution-detail__text">${sol.drawbacks}</div>
          </div>
        </div>

        <button class="solution-card__toggle" aria-expanded="false">
          <span>Show Details</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </button>
      </div>
    `).join('');

    // Rebind toggles after render
    const allToggles = solutionsContainer.querySelectorAll('.solution-card__toggle');
    allToggles.forEach(toggle => {
      toggle.addEventListener('click', () => {
        const expand = toggle.previousElementSibling;
        const isOpen = toggle.classList.contains('open');

        // Close all other cards first
        allToggles.forEach(other => {
          if (other !== toggle) {
            other.classList.remove('open');
            other.previousElementSibling.classList.remove('open');
            other.setAttribute('aria-expanded', false);
            other.querySelector('span').textContent = 'Show Details';
          }
        });

        // Toggle the clicked card
        toggle.classList.toggle('open');
        expand.classList.toggle('open');
        toggle.setAttribute('aria-expanded', !isOpen);
        toggle.querySelector('span').textContent = isOpen ? 'Show Details' : 'Hide Details';
      });
    });
  }

  /* ─── RADAR CHART (Phase 2) ───────────────────────── */
  const radarCanvas = document.getElementById('radarChart');
  if (radarCanvas && typeof Chart !== 'undefined' && typeof SOLUTIONS !== 'undefined') {
    const ctx = radarCanvas.getContext('2d');
    new Chart(ctx, {
      type: 'radar',
      data: {
        labels: Object.values(SCORE_LABELS),
        datasets: SOLUTIONS.map((sol, i) => ({
          label: `S${sol.id}: ${sol.title.split(' ').slice(0, 3).join(' ')}...`,
          data: [sol.scores.orgRelevance, sol.scores.viability, sol.scores.customerValue, sol.scores.competitiveEdge],
          backgroundColor: CHART_COLORS[i].bg,
          borderColor: CHART_COLORS[i].border,
          borderWidth: 2,
          pointBackgroundColor: CHART_COLORS[i].border,
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 5,
          pointHoverRadius: 7
        }))
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          r: {
            beginAtZero: true,
            max: 5,
            min: 0,
            ticks: {
              stepSize: 1,
              font: { family: 'Inter', size: 11 },
              backdropColor: 'transparent',
              color: '#9CA3AF'
            },
            grid: {
              color: 'rgba(0,0,0,0.06)',
              circular: true
            },
            angleLines: {
              color: 'rgba(0,0,0,0.06)'
            },
            pointLabels: {
              font: { family: 'Inter', size: 12, weight: '600' },
              color: '#323333'
            }
          }
        },
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              font: { family: 'Inter', size: 12 },
              padding: 20,
              usePointStyle: true,
              pointStyle: 'circle'
            }
          },
          tooltip: {
            backgroundColor: '#323333',
            titleFont: { family: 'Inter', size: 13, weight: '600' },
            bodyFont: { family: 'Inter', size: 12 },
            padding: 12,
            cornerRadius: 8,
            callbacks: {
              label: function(context) {
                return `${context.dataset.label}: ${context.raw}/5`;
              }
            }
          }
        },
        interaction: {
          intersect: false,
          mode: 'nearest'
        }
      }
    });
  }

  /* ─── FALLBACK CHARTS (Phase 1) ───────────────────── */
  // Chart 1: Financial Overview (Bar chart)
  const finCanvas = document.getElementById('financialChart');
  if (finCanvas && typeof Chart !== 'undefined') {
    new Chart(finCanvas.getContext('2d'), {
      type: 'bar',
      data: {
        labels: ['FY2022', 'FY2023', 'FY2024'],
        datasets: [
          {
            label: 'Utility Costs (£M)',
            data: [24.8, 28.2, 30.5],
            backgroundColor: '#323333',
            borderRadius: 6,
            barPercentage: 0.55
          },
          {
            label: 'Rental Income Growth (%)',
            data: [3.2, 5.1, 7.8],
            backgroundColor: '#FFDC00',
            borderRadius: 6,
            barPercentage: 0.55
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: { font: { family: 'Inter', size: 12 }, padding: 16, usePointStyle: true }
          },
          tooltip: {
            backgroundColor: '#323333',
            titleFont: { family: 'Inter' },
            bodyFont: { family: 'Inter' },
            cornerRadius: 8,
            padding: 12
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { font: { family: 'Inter', size: 12 } }
          },
          y: {
            grid: { color: 'rgba(0,0,0,0.05)' },
            ticks: { font: { family: 'Inter', size: 11 } }
          }
        }
      }
    });
  }

  // Chart 2: Student Sustainability Preferences (Horizontal bar)
  const sustCanvas = document.getElementById('sustainabilityChart');
  if (sustCanvas && typeof Chart !== 'undefined') {
    new Chart(sustCanvas.getContext('2d'), {
      type: 'bar',
      data: {
        labels: [
          'Prioritise bills-included',
          'Prioritise affordability',
          'Want energy control',
          'Check sustainability'
        ],
        datasets: [{
          data: [85, 76, 69, 58],
          backgroundColor: ['#323333', '#4A4B4B', '#6B7280', '#9CA3AF'],
          borderRadius: 6,
          barPercentage: 0.55,
          borderSkipped: false
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#323333',
            callbacks: {
              label: (ctx) => `${ctx.raw}% of students`
            },
            cornerRadius: 8,
            padding: 12,
            titleFont: { family: 'Inter' },
            bodyFont: { family: 'Inter' }
          }
        },
        scales: {
          x: {
            max: 100,
            grid: { color: 'rgba(0,0,0,0.05)' },
            ticks: {
              callback: v => v + '%',
              font: { family: 'Inter', size: 11 }
            }
          },
          y: {
            grid: { display: false },
            ticks: { font: { family: 'Inter', size: 12, weight: '500' } }
          }
        }
      }
    });
  }

  // Chart 3: PBSA Supply & Demand (Line chart)
  const pbsaCanvas = document.getElementById('pbsaChart');
  if (pbsaCanvas && typeof Chart !== 'undefined') {
    new Chart(pbsaCanvas.getContext('2d'), {
      type: 'line',
      data: {
        labels: ['2020', '2021', '2022', '2023', '2024', '2025 (proj.)'],
        datasets: [
          {
            label: 'PBSA Bed Supply (000s)',
            data: [632, 645, 660, 680, 700, 720],
            borderColor: '#FFDC00',
            backgroundColor: 'rgba(255,220,0,0.08)',
            fill: true,
            tension: 0.35,
            pointRadius: 5,
            pointHoverRadius: 7,
            pointBackgroundColor: '#FFDC00',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            borderWidth: 2.5
          },
          {
            label: 'Full-time Students (000s)',
            data: [1820, 1900, 1980, 2060, 2120, 2180],
            borderColor: '#323333',
            backgroundColor: 'rgba(50,51,51,0.04)',
            fill: true,
            tension: 0.35,
            pointRadius: 5,
            pointHoverRadius: 7,
            pointBackgroundColor: '#323333',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            borderWidth: 2.5,
            yAxisID: 'y1'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { intersect: false, mode: 'index' },
        plugins: {
          legend: {
            position: 'bottom',
            labels: { font: { family: 'Inter', size: 12 }, padding: 16, usePointStyle: true }
          },
          tooltip: {
            backgroundColor: '#323333',
            cornerRadius: 8,
            padding: 12,
            titleFont: { family: 'Inter' },
            bodyFont: { family: 'Inter' }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { font: { family: 'Inter', size: 12 } }
          },
          y: {
            position: 'left',
            grid: { color: 'rgba(0,0,0,0.05)' },
            ticks: { font: { family: 'Inter', size: 11 } },
            title: { display: true, text: 'PBSA Beds (000s)', font: { family: 'Inter', size: 11 } }
          },
          y1: {
            position: 'right',
            grid: { drawOnChartArea: false },
            ticks: { font: { family: 'Inter', size: 11 } },
            title: { display: true, text: 'Students (000s)', font: { family: 'Inter', size: 11 } }
          }
        }
      }
    });
  }

  /* ─── RENDER JOURNEY MAPS (Phase 3) ───────────────── */
  function renderJourneyMap(containerId, data, type) {
    const container = document.getElementById(containerId);
    if (!container || typeof JOURNEY_STAGES === 'undefined') return;

    const emotionMap = {
      bad:     { icon: '&#x1F61E;', cls: 'emotion-bad' },
      neutral: { icon: '&#x1F610;', cls: 'emotion-neutral' },
      good:    { icon: '&#x1F60A;', cls: 'emotion-good' },
      great:   { icon: '&#x1F929;', cls: 'emotion-great' }
    };

    const thirdRowLabel = type === 'as-is' ? 'Pain Points' : 'Improvements';
    const thirdRowData  = type === 'as-is' ? data.painPoints : data.improvements;
    const thirdRowCls   = type === 'as-is' ? 'pain-point' : 'improvement';

    let html = '<div class="journey-grid">';

    // Header row
    html += '<div class="journey-grid__header" style="background:transparent;"></div>';
    JOURNEY_STAGES.forEach(stage => {
      html += `<div class="journey-grid__header">${stage}</div>`;
    });

    // Actions row
    html += '<div class="journey-grid__label">Student Actions</div>';
    data.actions.forEach(a => html += `<div class="journey-grid__cell">${a}</div>`);

    // Touchpoints row
    html += '<div class="journey-grid__label">Touchpoints</div>';
    data.touchpoints.forEach(t => html += `<div class="journey-grid__cell">${t}</div>`);

    // Pain points / Improvements row
    html += `<div class="journey-grid__label">${thirdRowLabel}</div>`;
    thirdRowData.forEach(p => html += `<div class="journey-grid__cell"><span class="${thirdRowCls}">${p}</span></div>`);

    // Emotions row
    html += '<div class="journey-grid__label">Emotion</div>';
    data.emotions.forEach(e => {
      const em = emotionMap[e] || emotionMap.neutral;
      html += `<div class="journey-grid__cell journey-grid__cell--emotion ${em.cls}">${em.icon}</div>`;
    });

    html += '</div>';
    container.innerHTML = html;
  }

  renderJourneyMap('journey-as-is', JOURNEY_AS_IS, 'as-is');
  renderJourneyMap('journey-to-be', JOURNEY_TO_BE, 'to-be');

  /* ─── RENDER REFERENCES ───────────────────────────── */
  document.querySelectorAll('.references-auto').forEach(el => {
    if (typeof REFERENCES !== 'undefined') {
      el.innerHTML = REFERENCES.map(r => `<li>${r}</li>`).join('');
    }
  });

  /* ─── ANIMATED COUNTERS (Stat Boxes & Score Items) ── */
  const counterEls = document.querySelectorAll('.stat-box__value, .score-item__value');
  if (counterEls.length) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.counted) {
          entry.target.dataset.counted = 'true';
          const originalText = entry.target.textContent.trim();
          const match = originalText.match(/^([£]?)([\d.]+)(.*)$/);
          if (match) {
            const prefix = match[1];
            const num = parseFloat(match[2]);
            const suffix = match[3];
            const isFloat = match[2].includes('.');
            const duration = 1500;
            const start = performance.now();

            entry.target.textContent = prefix + '0' + suffix;

            function updateCounter(now) {
              const elapsed = now - start;
              const progress = Math.min(elapsed / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              const current = eased * num;
              entry.target.textContent = prefix + (isFloat ? current.toFixed(1) : Math.round(current)) + suffix;
              if (progress < 1) requestAnimationFrame(updateCounter);
              else entry.target.textContent = originalText;
            }
            requestAnimationFrame(updateCounter);
          }
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    counterEls.forEach(el => counterObserver.observe(el));
  }

  /* ─── READING PROGRESS INDICATOR ───────────────────── */
  const progressBar = document.createElement('div');
  progressBar.className = 'reading-progress';
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = progress + '%';
  });

  /* ─── SMOOTH SCROLL WITH NAV OFFSET ────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 72;
        const targetPos = targetEl.getBoundingClientRect().top + window.scrollY - navH - 20;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      }
    });
  });

  /* ─── PARALLAX PHASE HEADERS ───────────────────────── */
  const phaseBgs = document.querySelectorAll('.phase-header__bg');
  if (phaseBgs.length) {
    let parallaxTicking = false;
    window.addEventListener('scroll', () => {
      if (!parallaxTicking) {
        requestAnimationFrame(() => {
          phaseBgs.forEach(bg => {
            const rect = bg.parentElement.getBoundingClientRect();
            if (rect.bottom > 0 && rect.top < window.innerHeight) {
              const yPos = -(rect.top * 0.3);
              bg.style.transform = `translateY(${yPos}px) scale(1.06)`;
            }
          });
          parallaxTicking = false;
        });
        parallaxTicking = true;
      }
    });
  }

  /* ─── DIRECTIONAL REVEAL VARIANTS ──────────────────── */
  const directionalReveals = document.querySelectorAll('.reveal--left, .reveal--right, .reveal--scale');
  if (directionalReveals.length) {
    const dirObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          dirObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    directionalReveals.forEach(el => dirObserver.observe(el));
  }

  /* ─── TYPED TEXT EFFECT (Hero Subtitle) ────────────── */
  const typedEl = document.querySelector('.hero__subtitle[data-typed]');
  if (typedEl) {
    const text = typedEl.dataset.typed;
    typedEl.textContent = '';

    const cursor = document.createElement('span');
    cursor.className = 'typed-cursor';

    let charIndex = 0;
    const speed = 55;

    function typeChar() {
      if (charIndex < text.length) {
        typedEl.insertBefore(document.createTextNode(text.charAt(charIndex)), cursor);
        charIndex++;
        setTimeout(typeChar, speed);
      } else {
        setTimeout(() => cursor.remove(), 2500);
      }
    }

    setTimeout(() => {
      typedEl.classList.add('typing-active');
      typedEl.appendChild(cursor);
      typeChar();
    }, 2000);
  }

});
