export default function useDebounce(fn: Function, delay: number) {
  let timeout: number;

  function debouncedFn(...args: any) {
    window.clearTimeout(timeout);
    timeout = window.setTimeout(() => {
      fn(...args);
    }, delay);
  }

  return debouncedFn;
}
