import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ObjectType {
  [key: string]: any; // Replace 'any' with a specific type if known
}

export function diffObject<T extends ObjectType>(a: T, b: T): Partial<T> {
  return Object.keys(a).reduce((acc, k) => {
    if (a[k] !== b[k]) {
      return { ...acc, [k]: b[k] };
    }
    return acc;
  }, {} as Partial<T>);
}
