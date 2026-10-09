// Puts each code block in a frame with a tab bar.
// Code blocks that follow each other become one frame with one tab for each language.
// The Markdown stays plain: agents still get normal fenced code blocks.

const LABELS: Record<string, string> = {
  sh: 'Shell',
  bash: 'Shell',
  python: 'Python',
  py: 'Python',
  js: 'JavaScript',
  ts: 'TypeScript',
  json: 'JSON',
  yaml: 'YAML',
  txt: 'Text',
  plaintext: 'Text',
};

function label(block: Element): string {
  const language = block.querySelector('pre')?.getAttribute('data-language') ?? 'txt';
  // A curl command is the "cURL" tab, the same as most API docs.
  if (language === 'sh' && block.textContent?.trimStart().startsWith('curl')) return 'cURL';
  return LABELS[language] ?? language;
}

function isCodeBlock(element: Element | null): element is HTMLElement {
  return element instanceof HTMLElement && element.classList.contains('expressive-code');
}

function makeGroup(blocks: HTMLElement[]) {
  const group = document.createElement('div');
  group.className = 'code-group';
  const bar = document.createElement('div');
  bar.className = 'code-tabs';
  bar.setAttribute('role', 'tablist');
  blocks[0].before(group);
  group.append(bar);

  blocks.forEach((block, index) => {
    const tab = document.createElement('button');
    tab.type = 'button';
    tab.setAttribute('role', 'tab');
    tab.textContent = label(block);
    tab.setAttribute('aria-selected', String(index === 0));
    block.hidden = index !== 0;
    tab.addEventListener('click', () => {
      for (const other of bar.children) other.setAttribute('aria-selected', 'false');
      tab.setAttribute('aria-selected', 'true');
      blocks.forEach((b) => (b.hidden = b !== block));
    });
    bar.append(tab);
    group.append(block);
  });
}

for (const container of document.querySelectorAll('.sl-markdown-content, [data-code-tabs]')) {
  const children = [...container.children];
  let run: HTMLElement[] = [];
  for (const child of [...children, null]) {
    if (isCodeBlock(child)) {
      run.push(child);
      continue;
    }
    if (run.length > 0) makeGroup(run);
    run = [];
  }
}
