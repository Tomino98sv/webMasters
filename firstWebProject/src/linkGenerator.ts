interface MenuItem {
  local: string;
  label: string;
  important?: boolean;
  title?: string;
}

export const linkGenerator = (item: MenuItem, actualPage: string) => {
  const active = item.local === actualPage ? "active" : "";
  const important = item.important ? "important" : "";
  let classString = "";
  if (active || important) {
    classString = ` class="${
      active && important ? active + " " + important : active + important
    }"`;
  }
  const title = item.title ? ` title="${item.title}"` : "";
  return `<li><a href="/${item.local}"${classString}${title}>${item.label}</a></li>`;
};
