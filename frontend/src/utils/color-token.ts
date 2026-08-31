/** Read a semantic color token (see `index.css` `@theme`) for use on the
 *  Chart.js canvas, which needs a literal color string rather than a class. */
export const colorToken = (name: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim();
