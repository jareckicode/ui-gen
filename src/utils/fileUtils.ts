import fs from 'fs';
import path from 'path';

/**
 * Sprawdza czy katalog istnieje
 */
export function directoryExists(dirPath: string): boolean {
  return fs.existsSync(dirPath);
}

/**
 * Tworzy katalog jeśli nie istnieje
 */
export function ensureDirectoryExists(dirPath: string): void {
  if (!directoryExists(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

/**
 * Wczytuje szablon i zastępuje placeholdery
 */
export function loadTemplate(templatePath: string, replacements: Record<string, string>): string {
  let content = fs.readFileSync(templatePath, 'utf-8');
  
  // Zastępuje wszystkie placeholdery
  Object.entries(replacements).forEach(([key, value]) => {
    const placeholder = `{{${key}}}`;
    content = content.replace(new RegExp(placeholder, 'g'), value);
  });
  
  return content;
}

/**
 * Zapisuje plik z zawartością
 */
export function writeFile(filePath: string, content: string): void {
  const dir = path.dirname(filePath);
  ensureDirectoryExists(dir);
  fs.writeFileSync(filePath, content, 'utf-8');
}

/**
 * Generuje nazwę pliku na podstawie nazwy komponentu
 */
export function generateFileName(componentName: string, extension: string): string {
  return `${componentName}.${extension}`;
} 