export function initSlider(options) {
  const {
    root,
    viewportSelector,
    trackSelector,
    slideSelector,
    prevSelector,
    nextSelector,
    initialIndex = 0,
    getVisibleCount
  } = options || {};

  if (!root) return null;

  const viewport = root.querySelector(viewportSelector);
  const track = root.querySelector(trackSelector);
  const prevBtn = root.querySelector(prevSelector);
  const nextBtn = root.querySelector(nextSelector);
  const baseSlides = Array.from(root.querySelectorAll(slideSelector));

  if (!viewport || !track || baseSlides.length === 0) return null;

  let renderedSlides = [];
  let logicalIndex = 0;
  let renderedIndex = 0;
  let loopPadding = 0;
  let pointerStartX = null;
  let isTransitioning = false;

  const wrap = (value, max) => (value % max + max) % max;

  const defaultVisible = (width) => {
    if (width < 400) return 1;
    if (width < 768) return 2;
    return 3;
  };

  function getInitialLogicalIndex(visibleCount) {
    const start = wrap(Math.trunc(initialIndex), baseSlides.length);
    if (visibleCount >= 3 && baseSlides.length > 1) {
      return wrap(start - 1, baseSlides.length);
    }
    return start;
  }

  function getCount() {
    const width = viewport.getBoundingClientRect().width;
    const count = typeof getVisibleCount === 'function'
      ? getVisibleCount(width)
      : defaultVisible(width);
    return Math.max(1, Math.min(count, baseSlides.length));
  }

  function slideWidth() {
    const count = getCount();
    const style = getComputedStyle(track);
    const gap = Number.parseFloat(style.columnGap || style.gap || '0') || 0;
    const width = viewport.clientWidth;
    if (width <= 0 || count <= 0) return null;
    return (width - gap * (count - 1)) / count;
  }

  function syncSize() {
    const width = slideWidth();
    if (!width) return;
    viewport.style.setProperty('--coach-slide-width', `${Math.max(width, 220)}px`);
  }

  function syncSlideState() {
    const visible = getCount();
    renderedSlides.forEach((slide) => {
      slide.removeAttribute('data-current');
      slide.removeAttribute('data-previous');
      slide.removeAttribute('data-next');
    });

    if (renderedSlides.length === 0) return;

    if (baseSlides.length === 1 || visible === 1) {
      renderedSlides[renderedIndex]?.setAttribute('data-current', '');
      return;
    }

    if (visible === 2) {
      renderedSlides[renderedIndex]?.setAttribute('data-current', '');
      renderedSlides[renderedIndex + 1]?.setAttribute('data-next', '');
      return;
    }

    renderedSlides[renderedIndex]?.setAttribute('data-previous', '');
    renderedSlides[renderedIndex + 1]?.setAttribute('data-current', '');
    renderedSlides[renderedIndex + 2]?.setAttribute('data-next', '');
  }

  function clearClones() {
    const clones = Array.from(track.querySelectorAll('[data-clone="true"]'));
    clones.forEach((clone) => clone.remove());
  }

  function buildLoopedSlides() {
    clearClones();
    if (baseSlides.length <= 1) {
      renderedSlides = [...baseSlides];
      loopPadding = 0;
      renderedIndex = 0;
      return;
    }

    loopPadding = Math.min(getCount(), baseSlides.length);
    const prependFragment = document.createDocumentFragment();
    const appendFragment = document.createDocumentFragment();

    for (let i = baseSlides.length - loopPadding; i < baseSlides.length; i++) {
      const clone = baseSlides[i].cloneNode(true);
      clone.dataset.clone = 'true';
      prependFragment.append(clone);
    }

    for (let i = 0; i < loopPadding; i++) {
      const clone = baseSlides[i].cloneNode(true);
      clone.dataset.clone = 'true';
      appendFragment.append(clone);
    }

    track.insertBefore(prependFragment, track.firstChild);
    track.append(appendFragment);
    renderedSlides = Array.from(track.querySelectorAll(slideSelector));
    renderedIndex = logicalIndex + loopPadding;
  }

  function normalizeRenderedIndex() {
    if (baseSlides.length <= 1) {
      renderedIndex = 0;
      logicalIndex = 0;
      return;
    }

    const firstReal = loopPadding;
    const lastReal = loopPadding + baseSlides.length - 1;
    if (renderedIndex < firstReal) renderedIndex += baseSlides.length;
    if (renderedIndex > lastReal) renderedIndex -= baseSlides.length;
    logicalIndex = wrap(renderedIndex - loopPadding, baseSlides.length);
  }

  function render(noAnimation = false) {
    const width = slideWidth();
    if (!width) return;
    const style = getComputedStyle(track);
    const gap = Number.parseFloat(style.columnGap || style.gap || '0') || 0;
    const offset = renderedIndex * (width + gap);
    track.style.transition = noAnimation ? 'none' : 'transform 0.5s ease';
    track.style.transform = `translate3d(-${offset}px, 0, 0)`;
    syncSlideState();
    if (noAnimation) {
      track.offsetHeight;
      track.style.transition = '';
    }
  }

  function next() {
    if (isTransitioning) return;
    renderedIndex += 1;
    logicalIndex = wrap(renderedIndex - loopPadding, baseSlides.length);
    isTransitioning = true;
    render();
  }

  function prev() {
    if (isTransitioning) return;
    renderedIndex -= 1;
    logicalIndex = wrap(renderedIndex - loopPadding, baseSlides.length);
    isTransitioning = true;
    render();
  }

  function onTrackTransitionEnd(event) {
    if (event.target !== track || event.propertyName !== 'transform') return;
    isTransitioning = false;
    normalizeRenderedIndex();
    render(true);
  }

  function onResize() {
    isTransitioning = false;
    buildLoopedSlides();
    syncSize();
    render(true);
  }

  function onPointerDown(event) {
    pointerStartX = event.clientX;
  }

  function onPointerUp(event) {
    if (pointerStartX === null) return;
    const deltaX = event.clientX - pointerStartX;
    pointerStartX = null;
    if (Math.abs(deltaX) < 40) return;
    if (deltaX < 0) next();
    else prev();
  }

  prevBtn?.addEventListener('click', prev);
  nextBtn?.addEventListener('click', next);
  viewport.addEventListener('pointerdown', onPointerDown);
  viewport.addEventListener('pointerup', onPointerUp);
  track.addEventListener('transitionend', onTrackTransitionEnd);
  window.addEventListener('resize', onResize);

  function scheduleInitialRender(attempt = 0) {
    const ready = viewport.isConnected && viewport.clientWidth > 0;
    if (ready || attempt > 20) {
      logicalIndex = getInitialLogicalIndex(getCount());
      buildLoopedSlides();
      syncSize();
      normalizeRenderedIndex();
      render(true);
      return;
    }
    requestAnimationFrame(() => scheduleInitialRender(attempt + 1));
  }

  scheduleInitialRender();

  return {
    next,
    prev,
    destroy() {
      prevBtn?.removeEventListener('click', prev);
      nextBtn?.removeEventListener('click', next);
      viewport.removeEventListener('pointerdown', onPointerDown);
      viewport.removeEventListener('pointerup', onPointerUp);
      track.removeEventListener('transitionend', onTrackTransitionEnd);
      window.removeEventListener('resize', onResize);
      clearClones();
    }
  };
}
