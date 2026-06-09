/**
 * Animated count-up. Mirrors the original `animCount` helper from the HTML:
 * integers are rounded and localized (thousands separators), decimals use one
 * fixed digit. Writes straight to `textContent` via requestAnimationFrame.
 */
export function animCount(
  el: HTMLElement,
  target: number,
  prefix: string,
  suffix: string,
  dur: number,
) {
  let s = 0;
  const step = target / (dur / 16);
  const tick = () => {
    s = Math.min(s + step, target);
    el.textContent =
      prefix +
      (Number.isInteger(target) ? Math.round(s).toLocaleString() : s.toFixed(1)) +
      suffix;
    if (s < target) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}
