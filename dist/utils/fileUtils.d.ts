/**
 * Sprawdza czy katalog istnieje
 */
export declare function directoryExists(dirPath: string): boolean;
/**
 * Tworzy katalog jeśli nie istnieje
 */
export declare function ensureDirectoryExists(dirPath: string): void;
/**
 * Wczytuje szablon i zastępuje placeholdery
 */
export declare function loadTemplate(templatePath: string, replacements: Record<string, string>): string;
/**
 * Zapisuje plik z zawartością
 */
export declare function writeFile(filePath: string, content: string): void;
/**
 * Generuje nazwę pliku na podstawie nazwy komponentu
 */
export declare function generateFileName(componentName: string, extension: string): string;
//# sourceMappingURL=fileUtils.d.ts.map