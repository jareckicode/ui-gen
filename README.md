# @jareckicode/ui-gen

Automatyczny generator komponentów React/TypeScript z szablonami testów (Jest + React Testing Library) i Storybookiem.

## Użycie

```bash
npx @jareckicode/ui-gen create MyButton
```

## Co zostanie wygenerowane?

```
src/components/MyButton/
├── MyButton.tsx           # Komponent React z TypeScript i Tailwind
├── MyButton.test.tsx      # Szablon testów (Jest + RTL)
├── MyButton.stories.tsx   # Szablon Storybook
└── index.ts               # Eksport komponentu (opcjonalnie)
```

## Opcje CLI

- `--directory` lub `-d` — katalog docelowy (domyślnie `src/components`)
- `--classes` lub `-c` — domyślne klasy Tailwind (domyślnie `p-4 border rounded`)
- `--tag` lub `-t` — tag HTML do użycia (domyślnie `div`)
- `--skip-index` — pomiń generowanie pliku index.ts

### Przykłady użycia:

```bash
# Domyślny div
npx @jareckicode/ui-gen create MyContainer

# Button z custom klasami
npx @jareckicode/ui-gen create MyButton --tag button --classes "px-4 py-2 bg-blue-500 text-white rounded"

# Section z custom katalogiem
npx @jareckicode/ui-gen create MySection --tag section --directory src/layouts --classes "p-6 bg-gray-100"

# Aside bez pliku index.ts
npx @jareckicode/ui-gen create MySidebar --tag aside --classes "w-64 bg-gray-200 p-4" --skip-index
```

## Przykład szablonu testu

```tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MyButton } from './MyButton';

describe('MyButton', () => {
  it('renders without crashing', () => {
    render(<MyButton />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders with correct HTML tag', () => {
    render(<MyButton />);
    const element = screen.getByRole('button');
    expect(element.tagName.toLowerCase()).toBe('button');
  });

  it('applies custom className', () => {
    render(<MyButton className="custom-class" />);
    const element = screen.getByRole('button');
    expect(element).toHaveClass('custom-class');
  });

  // Add your tests here
});
```

### Dostępne tagi HTML:
`div`, `button`, `section`, `aside`, `article`, `header`, `footer`, `main`, `nav`, `span`, `p`, `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `ul`, `ol`, `li`, `form`, `input`, `textarea`, `select`, `label`, `a`, `img`, `video`, `audio`, `canvas`, `svg`

## Rozwój (dla kontrybutorów)

### Instalacja lokalna
```bash
npm install
```

### Budowanie
```bash
npm run build
```

### Użycie lokalne
```bash
npx ts-node src/cli.ts create MyButton
# lub po buildzie
node dist/cli.js create MyButton
```

## Wymagania
- Node.js >= 16
- TypeScript

## Autor

**Michał Jarecki**

- 🌐 [Strona internetowa](https://jareckiweb.pl)
- 📧 [Email](mailto:jarecki.kontakt@gmail.com)

## Licencja

MIT License - zobacz plik [LICENSE](LICENSE) dla szczegółów.