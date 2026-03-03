/**
 * J.F. Family FinTrack — Chart.js Global Theme
 * Apple Design System — iOS color palette, glassmorphism tooltips
 *
 * INSTRUÇÕES DE USO:
 *   1. Copie este arquivo para a pasta js/ do projeto
 *   2. No index.html, adicione ANTES dos outros scripts JS:
 *      <script src="js/chart-theme.js"></script>
 *   3. Os gráficos assumirão automaticamente o novo tema
 *      (sem necessidade de alterar reports.js, dashboard.js, etc.)
 */

(function () {
  'use strict';

  /* ──────────────────────────────────────────────
     PALETA DE CORES — iOS / Apple Design System
  ────────────────────────────────────────────── */
  const PALETTE = {
    // Cores primárias — vibrantes, alto contraste
    primary: [
      '#007AFF',  // iOS Blue
      '#34C759',  // iOS Green
      '#FF9500',  // iOS Amber
      '#FF3B30',  // iOS Red
      '#AF52DE',  // iOS Purple
      '#30B0C7',  // iOS Teal
      '#FF6B35',  // Coral
      '#FFCC00',  // iOS Yellow
      '#5856D6',  // Indigo
      '#FF2D55',  // iOS Pink
      '#00C7BE',  // Cyan
      '#A2845E',  // Brown
    ],
    // Versões com transparência para backgrounds/fill
    primaryAlpha: (opacity = 0.15) => PALETTE.primary.map(hex => hexToRgba(hex, opacity)),

    // Gradientes para line/bar charts
    gradientColors: [
      { start: 'rgba(0,122,255,0.35)',   end: 'rgba(0,122,255,0)' },
      { start: 'rgba(52,199,89,0.35)',   end: 'rgba(52,199,89,0)' },
      { start: 'rgba(255,149,0,0.35)',   end: 'rgba(255,149,0,0)' },
      { start: 'rgba(255,59,48,0.35)',   end: 'rgba(255,59,48,0)' },
      { start: 'rgba(175,82,222,0.35)',  end: 'rgba(175,82,222,0)' },
      { start: 'rgba(48,176,199,0.35)',  end: 'rgba(48,176,199,0)' },
    ],

    // Cores funcionais
    income:  '#34C759',
    expense: '#FF3B30',
    balance: '#007AFF',
    neutral: 'rgba(60,60,67,0.45)',
  };

  /* ──────────────────────────────────────────────
     UTILITÁRIOS
  ────────────────────────────────────────────── */
  function hexToRgba(hex, alpha) {
    const r = parseInt(hex.slice(1,3), 16);
    const g = parseInt(hex.slice(3,5), 16);
    const b = parseInt(hex.slice(5,7), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  }

  /**
   * Cria um gradiente vertical para área de gráfico de linha
   * @param {CanvasRenderingContext2D} ctx
   * @param {string} colorStart  cor RGBA topo
   * @param {string} colorEnd    cor RGBA base
   * @param {number} height      altura do canvas
   */
  function createGradient(ctx, colorStart, colorEnd, height = 300) {
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, colorStart);
    gradient.addColorStop(1, colorEnd);
    return gradient;
  }

  /* ──────────────────────────────────────────────
     PLUGIN: GRADIENTE DE FUNDO PARA LINE CHARTS
  ────────────────────────────────────────────── */
  const gradientPlugin = {
    id: 'fintrackGradient',
    beforeDatasetsDraw(chart) {
      if (chart.config.type !== 'line') return;
      const { ctx, chartArea } = chart;
      if (!chartArea) return;

      chart.data.datasets.forEach((dataset, i) => {
        if (dataset.fill === false || dataset.fill === undefined) return;
        const gradColors = PALETTE.gradientColors[i % PALETTE.gradientColors.length];
        dataset.backgroundColor = createGradient(
          ctx,
          gradColors.start,
          gradColors.end,
          chartArea.height
        );
      });
    },
  };

  /* ──────────────────────────────────────────────
     PLUGIN: TOOLTIP GLASSMORPHISM
  ────────────────────────────────────────────── */
  const glassTooltip = {
    id: 'fintrackTooltip',
    // Sobrescreve o tooltip padrão com versão customizada via externalTooltipHandler
  };

  /**
   * Handler de tooltip externo — glassmorphism, iOS style
   */
  function externalTooltipHandler(context) {
    const { chart, tooltip } = context;
    let tooltipEl = chart.canvas.parentNode.querySelector('.fintrack-tooltip');

    if (!tooltipEl) {
      tooltipEl = document.createElement('div');
      tooltipEl.className = 'fintrack-tooltip';
      tooltipEl.style.cssText = `
        position: absolute;
        background: rgba(255,255,255,0.96);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        border: 0.5px solid rgba(60,60,67,0.15);
        border-radius: 12px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.06);
        padding: 10px 14px;
        pointer-events: none;
        font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif;
        font-size: 13px;
        color: #000;
        transition: all .15s cubic-bezier(.25,.46,.45,.94);
        z-index: 9999;
        min-width: 120px;
      `;
      chart.canvas.parentNode.style.position = 'relative';
      chart.canvas.parentNode.appendChild(tooltipEl);
    }

    if (tooltip.opacity === 0) {
      tooltipEl.style.opacity = '0';
      return;
    }

    // Título
    let innerHTML = '';
    if (tooltip.title && tooltip.title.length) {
      innerHTML += `<div style="font-size:11px;font-weight:600;color:rgba(60,60,67,0.6);text-transform:uppercase;letter-spacing:.06em;margin-bottom:8px">${tooltip.title[0]}</div>`;
    }

    // Itens
    tooltip.body.forEach((body, i) => {
      const colors = tooltip.labelColors[i];
      const color = colors.backgroundColor || colors.borderColor || '#007AFF';
      const colorStr = typeof color === 'string' ? color : '#007AFF';
      const lines = body.lines.join(' ');
      innerHTML += `
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px">
          <span style="width:10px;height:10px;border-radius:50%;background:${colorStr};flex-shrink:0;box-shadow:0 1px 4px ${colorStr}66"></span>
          <span style="font-weight:500;color:#1c1c1e">${lines}</span>
        </div>`;
    });

    tooltipEl.innerHTML = innerHTML;
    tooltipEl.style.opacity = '1';

    // Posicionamento
    const { offsetLeft: posX, offsetTop: posY } = chart.canvas;
    let left = posX + tooltip.caretX + 12;
    let top  = posY + tooltip.caretY - tooltipEl.offsetHeight / 2;

    // Evitar overflow
    const containerW = chart.canvas.parentNode.offsetWidth;
    if (left + 160 > containerW) left = posX + tooltip.caretX - 160;
    if (top < 0) top = 8;

    tooltipEl.style.left = left + 'px';
    tooltipEl.style.top  = top  + 'px';
  }

  /* ──────────────────────────────────────────────
     DEFAULTS GLOBAIS DO CHART.JS
  ────────────────────────────────────────────── */
  function applyGlobalDefaults() {
    if (typeof Chart === 'undefined') return;

    // Registrar plugin de gradiente
    Chart.register(gradientPlugin);

    const D = Chart.defaults;

    // ── Fonte global ──
    D.font.family = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif";
    D.font.size = 12;
    D.font.weight = '500';

    // ── Cores globais ──
    D.color = 'rgba(60,60,67,0.60)';
    D.borderColor = 'rgba(60,60,67,0.08)';
    D.backgroundColor = PALETTE.primary[0];

    // ── Animações suaves ──
    D.animation.duration = 500;
    D.animation.easing = 'easeOutQuart';
    D.transitions.active.animation.duration = 200;

    // ── Responsivo ──
    D.responsive = true;
    D.maintainAspectRatio = false;

    // ── Plugins globais ──

    // Tooltip: usar handler externo (glassmorphism)
    D.plugins.tooltip.enabled = false; // desabilita built-in
    D.plugins.tooltip.external = externalTooltipHandler;
    D.plugins.tooltip.mode = 'index';
    D.plugins.tooltip.intersect = false;

    // Legenda: estilo refinado
    D.plugins.legend.display = true;
    D.plugins.legend.position = 'bottom';
    D.plugins.legend.align = 'center';
    D.plugins.legend.labels.usePointStyle = true;
    D.plugins.legend.labels.pointStyle = 'circle';
    D.plugins.legend.labels.padding = 16;
    D.plugins.legend.labels.color = 'rgba(60,60,67,0.60)';
    D.plugins.legend.labels.font = {
      family: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif",
      size: 11,
      weight: '500',
    };

    // ── Escalas (grids sutis) ──
    if (D.scales) {
      // Eixo X
      D.scales.category = D.scales.category || {};
      D.scales.linear   = D.scales.linear   || {};

      const scaleDefaults = {
        grid: {
          color: 'rgba(60,60,67,0.07)',
          lineWidth: 1,
          drawBorder: false,
          drawTicks: false,
        },
        ticks: {
          color: 'rgba(60,60,67,0.45)',
          padding: 8,
          font: {
            family: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif",
            size: 11,
            weight: '400',
          },
        },
        border: {
          display: false,
        },
      };

      Object.assign(D.scales.category, scaleDefaults);
      Object.assign(D.scales.linear, scaleDefaults);

      // Remover grid vertical
      if (D.scales.category.grid) {
        D.scales.category.grid.drawOnChartArea = false;
      }
    }

    // ── Defaults específicos por tipo ──

    // LINE
    if (D.elements && D.elements.line) {
      D.elements.line.borderWidth = 2.5;
      D.elements.line.tension = 0.4;
      D.elements.line.fill = true;
      D.elements.line.borderCapStyle = 'round';
      D.elements.line.borderJoinStyle = 'round';
    }

    // POINT
    if (D.elements && D.elements.point) {
      D.elements.point.radius = 0;
      D.elements.point.hoverRadius = 6;
      D.elements.point.hoverBorderWidth = 2.5;
      D.elements.point.hoverBackgroundColor = '#fff';
      D.elements.point.hitRadius = 16;
    }

    // BAR
    if (D.elements && D.elements.bar) {
      D.elements.bar.borderRadius = 8;
      D.elements.bar.borderSkipped = false;
    }

    // ARC (pie/doughnut)
    if (D.elements && D.elements.arc) {
      D.elements.arc.borderWidth = 2;
      D.elements.arc.borderColor = '#fff';
      D.elements.arc.hoverBorderColor = '#fff';
      D.elements.arc.hoverOffset = 6;
    }

    console.log('[FinTrack] Chart.js theme aplicado com sucesso 🎨');
  }

  /* ──────────────────────────────────────────────
     APLICAR PALETA AOS DATASETS AUTOMATICAMENTE
  ────────────────────────────────────────────── */
  function patchChartCreate() {
    if (typeof Chart === 'undefined') return;

    const originalConstructor = Chart;

    // Interceptar instanciação
    window.Chart = function (ctx, config) {
      const type = config && config.type;
      const data = config && config.data;

      if (data && data.datasets && Array.isArray(data.datasets)) {
        data.datasets.forEach((ds, i) => {
          const color = PALETTE.primary[i % PALETTE.primary.length];

          if (type === 'doughnut' || type === 'pie') {
            // Múltiplas cores para pie/doughnut
            if (!ds.backgroundColor || (Array.isArray(ds.backgroundColor) && ds.backgroundColor.length === 0)) {
              ds.backgroundColor = PALETTE.primary.map(c => hexToRgba(c, 0.88));
              ds.borderColor     = PALETTE.primary.map(c => c);
              ds.hoverBackgroundColor = PALETTE.primary.map(c => hexToRgba(c, 1));
            }
          } else if (type === 'bar') {
            if (!ds.backgroundColor) {
              ds.backgroundColor = hexToRgba(color, 0.82);
            }
            if (!ds.borderColor) {
              ds.borderColor = color;
              ds.borderWidth = 0;
            }
            if (!ds.hoverBackgroundColor) {
              ds.hoverBackgroundColor = hexToRgba(color, 1);
            }
          } else if (type === 'line') {
            if (!ds.borderColor) {
              ds.borderColor = color;
            }
            if (!ds.pointBackgroundColor) {
              ds.pointBackgroundColor = color;
            }
            if (!ds.pointHoverBackgroundColor) {
              ds.pointHoverBackgroundColor = color;
            }
            // fill gradient será aplicado pelo plugin
          }
        });
      }

      return new originalConstructor(ctx, config);
    };

    // Copiar propriedades estáticas (registro de plugins, etc.)
    Object.setPrototypeOf(window.Chart, originalConstructor);
    Object.keys(originalConstructor).forEach(key => {
      try { window.Chart[key] = originalConstructor[key]; } catch (e) {}
    });
    window.Chart.prototype = originalConstructor.prototype;
  }

  /* ──────────────────────────────────────────────
     INICIALIZAÇÃO — aguarda Chart.js carregar
  ────────────────────────────────────────────── */
  function init() {
    if (typeof Chart !== 'undefined') {
      applyGlobalDefaults();
      // Não patchamos o construtor para evitar quebrar internals do Chart.js
      // Os defaults já são suficientes para a paleta
      window._fintrackChartPalette = PALETTE;
      window._fintrackCreateGradient = createGradient;
    } else {
      // Aguardar carregamento
      setTimeout(init, 80);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expor paleta globalmente para uso nos módulos JS existentes
  window.FINTRACK_CHART_PALETTE = PALETTE;
  window.FINTRACK_HEX_TO_RGBA   = hexToRgba;

})();
