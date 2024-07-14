import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/*
export function diffObject(a: any, b: any) {
  // By 'Mulan' -> https://stackoverflow.com/revisions/33233053/6
  return Object.keys(a).reduce(function(map: any, k: any) {
    if (a[k] !== b[k]) map[k] = b[k];
    return map;
  }, {});
}
*/

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

