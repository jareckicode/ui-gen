"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.directoryExists = directoryExists;
exports.ensureDirectoryExists = ensureDirectoryExists;
exports.loadTemplate = loadTemplate;
exports.writeFile = writeFile;
exports.generateFileName = generateFileName;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
/**
 * Sprawdza czy katalog istnieje
 */
function directoryExists(dirPath) {
    return fs_1.default.existsSync(dirPath);
}
/**
 * Tworzy katalog jeśli nie istnieje
 */
function ensureDirectoryExists(dirPath) {
    if (!directoryExists(dirPath)) {
        fs_1.default.mkdirSync(dirPath, { recursive: true });
    }
}
/**
 * Wczytuje szablon i zastępuje placeholdery
 */
function loadTemplate(templatePath, replacements) {
    let content = fs_1.default.readFileSync(templatePath, 'utf-8');
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
function writeFile(filePath, content) {
    const dir = path_1.default.dirname(filePath);
    ensureDirectoryExists(dir);
    fs_1.default.writeFileSync(filePath, content, 'utf-8');
}
/**
 * Generuje nazwę pliku na podstawie nazwy komponentu
 */
function generateFileName(componentName, extension) {
    return `${componentName}.${extension}`;
}
//# sourceMappingURL=fileUtils.js.map