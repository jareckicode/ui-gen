#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const chalk_1 = __importDefault(require("chalk"));
const path_1 = __importDefault(require("path"));
const fileUtils_1 = require("./utils/fileUtils");
const program = new commander_1.Command();
program
    .name('react-tail-gen')
    .description('CLI generator for React components with TypeScript, Tailwind CSS, and testing setup')
    .version('1.0.0');
program
    .command('create')
    .description('Create a new React component')
    .argument('<componentName>', 'Name of the component to create')
    .option('-d, --directory <path>', 'Directory to create component in', 'src/components')
    .option('-c, --classes <classes>', 'Default Tailwind classes', 'p-4 border rounded')
    .option('-t, --tag <tag>', 'HTML tag to use (div, button, section, aside, etc.)', 'div')
    .action(async (componentName, options) => {
    try {
        console.log(chalk_1.default.blue(`🚀 Creating component: ${componentName}`));
        // Walidacja nazwy komponentu
        if (!/^[A-Z][a-zA-Z0-9]*$/.test(componentName)) {
            console.error(chalk_1.default.red('❌ Component name must start with uppercase letter and contain only letters and numbers'));
            process.exit(1);
        }
        // Walidacja tagu HTML
        const validTags = ['div', 'button', 'section', 'aside', 'article', 'header', 'footer', 'main', 'nav', 'span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'form', 'input', 'textarea', 'select', 'label', 'a', 'img', 'video', 'audio', 'canvas', 'svg'];
        if (!validTags.includes(options.tag.toLowerCase())) {
            console.error(chalk_1.default.red(`❌ Invalid HTML tag: ${options.tag}. Valid tags: ${validTags.join(', ')}`));
            process.exit(1);
        }
        const componentDir = path_1.default.join(process.cwd(), options.directory, componentName);
        const templatesDir = path_1.default.join(__dirname, 'templates');
        // Przygotowanie danych do zastąpienia w szablonach
        const replacements = {
            componentName,
            defaultClasses: options.classes,
            htmlTag: options.tag.toLowerCase()
        };
        // Lista plików do wygenerowania
        const filesToGenerate = [
            { template: 'component.tsx.tpl', output: (0, fileUtils_1.generateFileName)(componentName, 'tsx') },
            { template: 'test.tsx.tpl', output: (0, fileUtils_1.generateFileName)(componentName, 'test.tsx') },
            { template: 'story.tsx.tpl', output: (0, fileUtils_1.generateFileName)(componentName, 'stories.tsx') },
            { template: 'index.ts.tpl', output: 'index.ts' }
        ];
        // Generowanie plików
        for (const file of filesToGenerate) {
            const templatePath = path_1.default.join(templatesDir, file.template);
            const outputPath = path_1.default.join(componentDir, file.output);
            const content = (0, fileUtils_1.loadTemplate)(templatePath, replacements);
            (0, fileUtils_1.writeFile)(outputPath, content);
            console.log(chalk_1.default.green(`✅ Created: ${file.output}`));
        }
        console.log(chalk_1.default.green(`\n🎉 Component ${componentName} created successfully!`));
        console.log(chalk_1.default.blue(`📁 Location: ${componentDir}`));
        console.log(chalk_1.default.blue(`🏷️  HTML Tag: ${options.tag}`));
        console.log(chalk_1.default.yellow(`\nNext steps:`));
        console.log(chalk_1.default.yellow(`1. Import your component: import { ${componentName} } from './${options.directory}/${componentName}'`));
        console.log(chalk_1.default.yellow(`2. Run tests: npm test`));
        console.log(chalk_1.default.yellow(`3. Start Storybook: npm run storybook`));
    }
    catch (error) {
        console.error(chalk_1.default.red(`❌ Error creating component: ${error}`));
        process.exit(1);
    }
});
program.parse();
//# sourceMappingURL=cli.js.map