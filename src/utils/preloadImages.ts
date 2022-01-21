export function preloadImages(...args: string[]) {
  args.forEach((url) => {
    new Image().src = url;
  });
}
