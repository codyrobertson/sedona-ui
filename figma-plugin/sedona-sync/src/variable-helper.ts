// Helper functions for variable linking in Figma components
// This approach focuses on what actually works in the Figma Plugin API

export class VariableHelper {
  private static variableCollection: VariableCollection | null = null;
  private static variables: Map<string, Variable> = new Map();

  static async initialize(): Promise<void> {
    console.log('🔗 Initializing variable helper...');
    
    // Find the design tokens collection
    const collections = figma.variables.getLocalVariableCollections();
    this.variableCollection = collections.find(c => 
      c.name.includes('Design Tokens') || 
      c.name.includes('Sedona') || 
      c.name.includes('zeus')
    ) || null;
    
    if (!this.variableCollection) {
      console.warn('⚠️ No Design Tokens collection found - using fallback colors');
      return;
    }
    
    console.log(`✅ Found collection: ${this.variableCollection.name}`);
    
    // Index all variables by name for quick lookup
    const allVars = figma.variables.getLocalVariables()
      .filter(v => v.variableCollectionId === this.variableCollection!.id);
    
    for (const variable of allVars) {
      this.variables.set(variable.name, variable);
    }
    
    console.log(`📊 Indexed ${this.variables.size} variables`);
  }

  /**
   * Get a variable alias for binding to Figma properties
   * Only use this where Figma API actually supports variable binding
   */
  static getVariableAlias(variableName: string): VariableAlias | null {
    const variable = this.variables.get(variableName);
    if (!variable) {
      console.warn(`⚠️ Variable not found: ${variableName}`);
      return null;
    }
    return {
      type: 'VARIABLE_ALIAS',
      id: variable.id
    };
  }

  /**
   * Get the actual RGB value from a variable for fallback use
   */
  static getVariableValue(variableName: string): RGB | null {
    const variable = this.variables.get(variableName);
    if (!variable) return null;
    
    const modes = variable.valuesByMode;
    const firstModeId = Object.keys(modes)[0];
    const value = modes[firstModeId];
    
    if (typeof value === 'object' && value !== null && 'r' in value) {
      return value as RGB;
    }
    
    return null;
  }

  /**
   * Create a Paint object that uses variables when possible, fallback colors otherwise
   */
  static createVariablePaint(variableName: string, fallbackColor: RGB): Paint {
    const variableAlias = this.getVariableAlias(variableName);
    
    if (variableAlias) {
      // For VariableAlias, we need a different Paint structure
      return {
        type: 'SOLID' as const,
        color: fallbackColor, // Fallback color is required
        boundVariables: {
          color: variableAlias
        }
      };
    } else {
      return {
        type: 'SOLID' as const,
        color: fallbackColor
      };
    }
  }

  /**
   * Apply variable binding to component fills where supported
   */
  static applyVariableFill(node: SceneNode, variableName: string, fallbackColor: RGB): void {
    if (!('fills' in node)) return;
    
    // Set the basic fill first
    node.fills = [{ type: 'SOLID' as const, color: fallbackColor }];
    
    // Try to bind variable using the proper Figma API
    const variable = this.variables.get(variableName);
    if (variable && 'setBoundVariable' in node) {
      try {
        console.log(`Binding variable ${variableName} to fill`);
        (node as any).setBoundVariable('fills', variable.id);
      } catch (error) {
        console.warn(`Could not bind fill variable ${variableName}:`, error);
      }
    } else if (variable) {
      console.warn(`Node does not support setBoundVariable for fills`);
    }
  }

  /**
   * Apply variable binding to component strokes where supported
   */
  static applyVariableStroke(node: SceneNode, variableName: string, fallbackColor: RGB): void {
    if (!('strokes' in node)) return;
    
    // Set the basic stroke first
    node.strokes = [{ type: 'SOLID' as const, color: fallbackColor }];
    
    // Try to bind variable using the proper Figma API
    const variable = this.variables.get(variableName);
    if (variable && 'setBoundVariable' in node) {
      try {
        console.log(`Binding variable ${variableName} to stroke`);
        (node as any).setBoundVariable('strokes', variable.id);
      } catch (error) {
        console.warn(`Could not bind stroke variable ${variableName}:`, error);
      }
    } else if (variable) {
      console.warn(`Node does not support setBoundVariable for strokes`);
    }
  }

  /**
   * Check if variables are available
   */
  static hasVariables(): boolean {
    return this.variableCollection !== null && this.variables.size > 0;
  }
}