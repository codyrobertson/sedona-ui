#!/usr/bin/env ts-node
// Component analysis script to extract component structures for Figma sync
import * as fs from 'fs';
import * as path from 'path';
import tailwindConfig from '../tailwind.config';

interface ComponentAnalysis {
  name: string;
  filePath: string;
  variants: string[];
  props: PropAnalysis[];
  states: string[];
  sizes: string[];
  exports: string[];
  dependencies: string[];
}

interface PropAnalysis {
  name: string;
  type: string;
  optional: boolean;
  defaultValue?: string;
  variants?: string[];
}

class ComponentAnalyzer {
  private componentsDir = path.join(__dirname, '../src/components');
  private components: ComponentAnalysis[] = [];

  async analyzeAllComponents(): Promise<ComponentAnalysis[]> {
    console.log('🔍 Analyzing React components for Figma sync...\n');
    
    await this.walkDirectory(this.componentsDir);
    
    console.log(`✅ Analyzed ${this.components.length} components\n`);
    
    // Write analysis results
    await this.writeAnalysisResults();
    
    return this.components;
  }

  private async walkDirectory(dir: string): Promise<void> {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory() && !entry.name.startsWith('.')) {
        await this.walkDirectory(fullPath);
      } else if (entry.isFile() && /\.(tsx|ts)$/.test(entry.name) && !entry.name.includes('.test.') && !entry.name.includes('.spec.')) {
        await this.analyzeComponent(fullPath);
      }
    }
  }

  private async analyzeComponent(filePath: string): Promise<void> {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const analysis = this.parseComponent(filePath, content);
      
      if (analysis) {
        this.components.push(analysis);
        console.log(`📦 ${analysis.name} - ${analysis.variants.length} variants, ${analysis.props.length} props`);
      }
    } catch (error: any) {
      console.warn(`⚠️  Could not analyze ${filePath}:`, error.message);
    }
  }

  private parseComponent(filePath: string, content: string): ComponentAnalysis | null {
    const fileName = path.basename(filePath, path.extname(filePath));
    
    // Skip index files
    if (fileName === 'index') return null;
    
    // Extract component name from file or export
    const componentName = this.extractComponentName(fileName, content);
    if (!componentName) return null;

    // Extract variants from class variance authority or props
    const variants = this.extractVariants(content);
    
    // Extract props interface or type
    const props = this.extractProps(content);
    
    // Extract common states
    const states = this.extractStates(content);
    
    // Extract sizes
    const sizes = this.extractSizes(content);
    
    // Extract exports
    const exports = this.extractExports(content);
    
    // Extract dependencies
    const dependencies = this.extractDependencies(content);

    return {
      name: componentName,
      filePath,
      variants,
      props,
      states,
      sizes,
      exports,
      dependencies
    };
  }

  private extractComponentName(fileName: string, content: string): string | null {
    // Try to find export default component name
    const exportMatch = content.match(/export\s+(?:default\s+)?(?:const\s+|function\s+)?(\w+)/);
    if (exportMatch) {
      return exportMatch[1];
    }
    
    // Fall back to file name
    return fileName.charAt(0).toUpperCase() + fileName.slice(1);
  }

  private extractVariants(content: string): string[] {
    const variants: string[] = [];
    
    // Look for cva (class-variance-authority) variants
    const cvaMatch = content.match(/cva\([^,]*,\s*{\s*variants:\s*{([^}]*)}/gs);
    if (cvaMatch) {
      const variantsContent = cvaMatch[1];
      const variantMatches = variantsContent.match(/(\w+):/g);
      if (variantMatches) {
        variants.push(...variantMatches.map(match => match.slice(0, -1)));
      }
    }
    
    // Look for variant prop in TypeScript interface
    const variantPropMatch = content.match(/variant\??\s*:\s*["']([^"']+)["']|\s*\|\s*["']([^"']+)["']/g);
    if (variantPropMatch) {
      variantPropMatch.forEach(match => {
        const valueMatch = match.match(/["']([^"']+)["']/);
        if (valueMatch && !variants.includes(valueMatch[1])) {
          variants.push(valueMatch[1]);
        }
      });
    }
    
    // Common variant patterns
    if (content.includes('variant')) {
      if (content.includes('"primary"') || content.includes("'primary'")) variants.push('primary');
      if (content.includes('"secondary"') || content.includes("'secondary'")) variants.push('secondary');
      if (content.includes('"tertiary"') || content.includes("'tertiary'")) variants.push('tertiary');
      if (content.includes('"ghost"') || content.includes("'ghost'")) variants.push('ghost');
      if (content.includes('"outline"') || content.includes("'outline'")) variants.push('outline');
      if (content.includes('"destructive"') || content.includes("'destructive'")) variants.push('destructive');
    }
    
    return Array.from(new Set(variants));
  }

  private extractProps(content: string): PropAnalysis[] {
    const props: PropAnalysis[] = [];
    
    // Extract interface or type definition
    const interfaceMatch = content.match(/(?:interface|type)\s+\w*Props[^{]*{([^}]*)}/s);
    if (interfaceMatch) {
      const propsContent = interfaceMatch[1];
      const propLines = propsContent.split('\n').filter(line => line.trim());
      
      for (const line of propLines) {
        const propMatch = line.match(/(\w+)(\??):\s*([^;,\n]+)/);
        if (propMatch) {
          const [, name, optional, type] = propMatch;
          props.push({
            name,
            type: type.trim(),
            optional: !!optional,
            variants: this.extractPropVariants(type)
          });
        }
      }
    }
    
    return props;
  }

  private extractPropVariants(type: string): string[] | undefined {
    const variants: string[] = [];
    const stringLiterals = type.match(/"([^"]+)"|'([^']+)'/g);
    
    if (stringLiterals && stringLiterals.length > 1) {
      return stringLiterals.map(literal => literal.slice(1, -1));
    }
    
    return variants.length > 0 ? variants : undefined;
  }

  private extractStates(content: string): string[] {
    const states = ['default'];
    
    if (content.includes('hover:') || content.includes(':hover')) states.push('hover');
    if (content.includes('focus:') || content.includes(':focus')) states.push('focus');
    if (content.includes('active:') || content.includes(':active')) states.push('active');
    if (content.includes('disabled:') || content.includes('disabled')) states.push('disabled');
    if (content.includes('error') || content.includes('invalid')) states.push('error');
    if (content.includes('success')) states.push('success');
    
    return Array.from(new Set(states));
  }

  private extractSizes(content: string): string[] {
    const sizes: string[] = [];
    
    // Look for size variants in cva or props
    if (content.includes('size')) {
      if (content.includes('"sm"') || content.includes("'sm'")) sizes.push('sm');
      if (content.includes('"md"') || content.includes("'md'")) sizes.push('md');
      if (content.includes('"lg"') || content.includes("'lg'")) sizes.push('lg');
      if (content.includes('"xl"') || content.includes("'xl'")) sizes.push('xl');
    }
    
    return Array.from(new Set(sizes));
  }

  private extractExports(content: string): string[] {
    const exports: string[] = [];
    
    // Find all export statements
    const exportMatches = content.match(/export\s+(?:default\s+)?(?:const\s+|function\s+|class\s+)?(\w+)/g);
    if (exportMatches) {
      exports.push(...exportMatches.map(match => {
        const nameMatch = match.match(/(\w+)$/);
        return nameMatch ? nameMatch[1] : '';
      }).filter(Boolean));
    }
    
    return Array.from(new Set(exports));
  }

  private extractDependencies(content: string): string[] {
    const dependencies: string[] = [];
    
    // Extract import statements
    const importMatches = content.match(/import[^;]+from\s+["']([^"']+)["']/g);
    if (importMatches) {
      dependencies.push(...importMatches.map(match => {
        const moduleMatch = match.match(/from\s+["']([^"']+)["']/);
        return moduleMatch ? moduleMatch[1] : '';
      }).filter(Boolean));
    }
    
    return Array.from(new Set(dependencies));
  }

  private async writeAnalysisResults(): Promise<void> {
    const outputPath = path.join(__dirname, '../figma-plugin/sedona-sync/component-analysis.json');
    
    const analysisData = {
      timestamp: new Date().toISOString(),
      tailwindConfig: {
        colors: tailwindConfig.theme?.extend?.colors || {},
        fontSize: tailwindConfig.theme?.extend?.fontSize || {},
        spacing: tailwindConfig.theme?.extend?.spacing || {},
        borderRadius: tailwindConfig.theme?.extend?.borderRadius || {}
      },
      components: this.components,
      summary: {
        totalComponents: this.components.length,
        componentsWithVariants: this.components.filter(c => c.variants.length > 0).length,
        totalVariants: this.components.reduce((sum, c) => sum + c.variants.length, 0),
        totalProps: this.components.reduce((sum, c) => sum + c.props.length, 0)
      }
    };
    
    fs.writeFileSync(outputPath, JSON.stringify(analysisData, null, 2));
    console.log(`📄 Analysis results written to: ${outputPath}`);
    
    // Also create a simplified version for the Figma plugin UI
    const simplifiedData = {
      components: this.components.map(c => ({
        name: c.name,
        variants: c.variants,
        states: c.states,
        sizes: c.sizes,
        hasProps: c.props.length > 0
      })),
      tailwindConfig: analysisData.tailwindConfig
    };
    
    const simplifiedPath = path.join(__dirname, '../figma-plugin/sedona-sync/src/component-data.json');
    fs.writeFileSync(simplifiedPath, JSON.stringify(simplifiedData, null, 2));
    console.log(`📄 Simplified data written to: ${simplifiedPath}`);
  }
}

// CLI interface
async function main() {
  const analyzer = new ComponentAnalyzer();
  const results = await analyzer.analyzeAllComponents();
  
  console.log('\n📊 Summary:');
  console.log(`   Components: ${results.length}`);
  console.log(`   With variants: ${results.filter(c => c.variants.length > 0).length}`);
  console.log(`   Total variants: ${results.reduce((sum, c) => sum + c.variants.length, 0)}`);
  console.log(`   Total props: ${results.reduce((sum, c) => sum + c.props.length, 0)}`);
  
  console.log('\n🎨 Ready for Figma sync!');
  console.log('   1. Open Figma');
  console.log('   2. Go to Menu > Plugins > Development > Import plugin from manifest');
  console.log('   3. Select figma-plugin/sedona-sync/manifest.json');
  console.log('   4. Run the Sedona Sync plugin');
}

if (require.main === module) {
  main().catch(console.error);
}