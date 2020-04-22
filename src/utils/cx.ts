export default function cx(...classNames: Array<any>) {
  const set = new Set();
  for (const className of classNames) {
    if (className) {
      set.add(className);
    }
  }
  return Array.from(set).join(" ");
}
