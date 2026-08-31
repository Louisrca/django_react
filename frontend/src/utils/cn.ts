import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind class names, resolving conflicts.
 *
 * `clsx` flattens conditionals / arrays / falsy values, then `twMerge`
 * keeps only the last of any conflicting utilities (e.g. `text-slate-700`
 * followed by `text-slate-500` yields `text-slate-500`). Use it wherever a
 * component composes its own classes with a caller-provided `className`.
 */
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
