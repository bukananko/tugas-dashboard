import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(value: string) {
  const n = Number(value);
  return new Intl.NumberFormat("en-US").format(n);
}
