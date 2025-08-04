#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import path from 'path';
import { loadTemplate, writeFile, generateFileName } from './utils/fileUtils';

const program = new Command();

program
  .name('ui-gen')
  .description('CLI generator for React components with TypeScript, Tailwind CSS, and testing setup')
  .version('1.0.0');

program
  .command('create')
  .description('Create a new React component')
  .argument('<componentName>', 'Name of the component to create')
  .option('-d, --directory <path>', 'Directory to create component in', 'src/components')
  .option('-c, --classes <classes>', 'Default Tailwind classes', 'p-4 border rounded')
  .option('-t, --tag <tag>', 'HTML tag to use (div, button, section, aside, etc.)', 'div')
  .option('--no-index', 'Skip generating index.ts file', false)
  .action(async (componentName: string, options: { directory: string; classes: string; tag: string; index?: boolean }) => {
    try {
      console.log(chalk.blue(`🚀 Creating component: ${componentName}`));
      // Walidacja nazwy komponentu
      if (!/^[A-Z][a-zA-Z0-9]*$/.test(componentName)) {
        console.error(chalk.red('❌ Component name must start with uppercase letter and contain only letters and numbers'));
        process.exit(1);
      }

      // Walidacja tagu HTML
      const validTags = ['div', 'button', 'section', 'aside', 'article', 'header', 'footer', 'main', 'nav', 'span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'form', 'input', 'textarea', 'select', 'label', 'a', 'img', 'video', 'audio', 'canvas', 'svg'];
      if (!validTags.includes(options.tag.toLowerCase())) {
        console.error(chalk.red(`❌ Invalid HTML tag: ${options.tag}. Valid tags: ${validTags.join(', ')}`));
        process.exit(1);
      }

      const componentDir = path.join(process.cwd(), options.directory, componentName);
      const templatesDir = path.join(__dirname, 'templates');

      // Przygotowanie danych do zastąpienia w szablonach
      const replacements = {
        componentName,
        defaultClasses: options.classes,
        htmlTag: options.tag.toLowerCase()
      };

      // Lista plików do wygenerowania
      const filesToGenerate = [
        { template: 'component.tsx.tpl', output: generateFileName(componentName, 'tsx') },
        { template: 'test.tsx.tpl', output: generateFileName(componentName, 'test.tsx') },
        { template: 'story.tsx.tpl', output: generateFileName(componentName, 'stories.tsx') }
      ];

      // Dodaj index.ts tylko jeśli index nie jest false
      if (options.index !== false) {
        filesToGenerate.push({ template: 'index.ts.tpl', output: 'index.ts' });
      }

      // Generowanie plików
      for (const file of filesToGenerate) {
        const templatePath = path.join(templatesDir, file.template);
        const outputPath = path.join(componentDir, file.output);
        
        const content = loadTemplate(templatePath, replacements);
        writeFile(outputPath, content);
        
        console.log(chalk.green(`✅ Created: ${file.output}`));
      }

      console.log(chalk.green(`\n🎉 Component ${componentName} created successfully!`));
      console.log(chalk.blue(`📁 Location: ${componentDir}`));
      console.log(chalk.blue(`🏷️  HTML Tag: ${options.tag}`));
      console.log(chalk.yellow(`\nNext steps:`));
      console.log(chalk.yellow(`1. Import your component: import { ${componentName} } from './${options.directory}/${componentName}'`));
      console.log(chalk.yellow(`2. Run tests: npm test`));
      console.log(chalk.yellow(`3. Start Storybook: npm run storybook`));

    } catch (error) {
      console.error(chalk.red(`❌ Error creating component: ${error}`));
      process.exit(1);
    }
  });

program.parse(); 