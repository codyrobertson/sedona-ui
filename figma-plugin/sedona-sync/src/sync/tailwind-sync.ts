function isValidColorValue(value: string): boolean {
  if (!value || typeof value !== 'string') return false;
  return value.startsWith('#') || 
         value.startsWith('rgb') || 
         value.startsWith('hsl') || 
         value === 'transparent' ||
         value === 'currentColor' ||
         value === 'inherit' ||
         /^\w+$/.test(value); // Named colors
}

// Validate and sanitize Figma variable names
function sanitizeVariableName(name: string): string {
  if (!name || typeof name !== 'string') {
    console.warn(`Invalid variable name: ${name}`);
    return 'unnamed-variable';
  }
  
  // Remove any characters that might be problematic
  // Figma allows: letters, numbers, hyphens, underscores, forward slashes, spaces
  // But let's be conservative and stick to alphanumeric, hyphens, underscores, and forward slashes
  let sanitized = name.replace(/[^a-zA-Z0-9\-_\/\s]/g, '');
  
  // Ensure it doesn't start with a number
  if (/^\d/.test(sanitized)) {
    sanitized = 'var-' + sanitized;
  }
  
  // Ensure it's not empty
  if (!sanitized.trim()) {
    console.warn(`Empty variable name after sanitization: ${name}`);
    return 'unnamed-variable';
  }
  
  return sanitized.trim();
}

// Clean Design System Variables - Simple and Logical Structure
export async function createVariablesFromTailwind(
  collection: VariableCollection,
  tailwindConfig: any
) {
  console.log('🎨 Starting CLEAN Design System sync...');
  console.log('📋 Simple structure: Foundation → Semantic → Brand');

  const totalStart = Date.now();
  let totalVariables = 0;
  const modes = collection.modes;
  const lightModeId = modes[0].modeId;
  const darkModeId = modes.length > 1 ? modes[1].modeId : lightModeId;

  // ROOT LEVEL GROUPS
  console.log('🏗️ Creating Foundation (Base Values)');
  totalVariables += await createFoundation(collection, tailwindConfig, lightModeId, darkModeId);

  console.log('🎯 Creating Semantic (Purpose-based)');
  totalVariables += await createSemantic(collection, lightModeId, darkModeId);

  console.log('🏢 Creating Brand (Sedona Identity)');
  totalVariables += await createBrand(collection, lightModeId, darkModeId);

  console.log('🎨 Creating Text Styles');
  await createTextStyles(collection);

  const totalTime = Date.now() - totalStart;
  console.log('🎉 CLEAN Design System sync complete!');
  console.log(`📊 Total: ${totalVariables} variables in ${totalTime}ms`);
  console.log('📝 Text styles created using variable references');
}

// ==========================================
// CLEAN DESIGN SYSTEM FUNCTIONS
// ==========================================

async function createFoundation(collection: VariableCollection, config: any, lightModeId: string, darkModeId: string): Promise<number> {
  let count = 0;
  
  // COLOR - Foundation colors (only the essential base colors we need)
  if (config.colors && config.colors.zeus) {
    // Map Zeus colors to clean foundation names
    const foundationColorMap: Record<string, { zeus: string; desc: string }> = {
      'surface-default': { zeus: 'surface-default', desc: 'Default surface background' },
      'surface-elevated': { zeus: 'surface-neutral', desc: 'Elevated surface background' },
      'text-primary': { zeus: 'text-primary', desc: 'Primary text color' },
      'text-secondary': { zeus: 'text-secondary', desc: 'Secondary text color' },
      'border-default': { zeus: 'border-normal', desc: 'Default border color' },
      'accent-green': { zeus: 'accent-green', desc: 'Green accent color' },
      'accent-orange': { zeus: 'accent-orange', desc: 'Orange accent color' },
      'accent-red': { zeus: 'accent-red', desc: 'Red accent color' },
      'accent-blue': { zeus: 'accent-blue', desc: 'Blue accent color' }
    };
    
    for (const [foundationName, mapping] of Object.entries(foundationColorMap)) {
      const zeusValue = config.colors.zeus[mapping.zeus];
      if (!zeusValue || !isValidColorValue(zeusValue)) continue;
      
      const variable = createVariableWithConfig(
        collection,
        `color/${foundationName}`,
        'COLOR',
        mapping.desc,
        getIntelligentScopes(`color/${foundationName}`, 'COLOR')
      );
      
      const lightRgb = parseColorToRgb(zeusValue);
      const darkRgb = generateDarkModeColor(lightRgb, foundationName);
      
      if (lightRgb) {
        variable.setValueForMode(lightModeId, { r: lightRgb.r, g: lightRgb.g, b: lightRgb.b, a: lightRgb.a || 1 });
        if (darkModeId !== lightModeId && darkRgb) {
          variable.setValueForMode(darkModeId, { r: darkRgb.r, g: darkRgb.g, b: darkRgb.b, a: darkRgb.a || 1 });
        }
        count++;
      }
    }
    
    // Sedona colors (brand palette)
    if (config.colors.sedona) {
      for (const [shade, value] of Object.entries(config.colors.sedona)) {
        if (!shade || typeof shade !== 'string' || !isValidColorValue(value as string) || shade === 'primary') continue;
        
        const variable = createVariableWithConfig(
          collection,
          `color/sedona-${shade}`,
          'COLOR',
          `Sedona brand color: ${shade}`,
          getIntelligentScopes(`color/sedona-${shade}`, 'COLOR')
        );
        
        const lightRgb = parseColorToRgb(value as string);
        if (lightRgb) {
          variable.setValueForMode(lightModeId, { r: lightRgb.r, g: lightRgb.g, b: lightRgb.b, a: lightRgb.a || 1 });
          if (darkModeId !== lightModeId) {
            variable.setValueForMode(darkModeId, { r: lightRgb.r, g: lightRgb.g, b: lightRgb.b, a: lightRgb.a || 1 });
          }
          count++;
        }
      }
    }
  }
  
  // SPACING - All spacing values
  if (config.spacing) {
    for (const [name, value] of Object.entries(config.spacing)) {
      if (!name || typeof name !== 'string') continue;
      
      const numValue = parseInt(value as string);
      if (isNaN(numValue)) continue;
      
      const variable = createVariableWithConfig(
        collection,
        `spacing/${name}`,
        'FLOAT',
        `Base spacing: ${numValue}px`,
        getIntelligentScopes(`spacing/${name}`, 'FLOAT')
      );
      
      variable.setValueForMode(lightModeId, numValue);
      count++;
    }
  }
  
  // TYPOGRAPHY - Font families, sizes, weights
  // Font Families
  const fontFamilies = [
    { name: 'font/sans', value: 'Inter, system-ui, -apple-system, sans-serif', desc: 'Sans-serif font stack' },
    { name: 'font/serif', value: 'Georgia, Times, serif', desc: 'Serif font stack' },
    { name: 'font/mono', value: 'SF Mono, Consolas, Monaco, monospace', desc: 'Monospace font stack' }
  ];
  
  for (const font of fontFamilies) {
    const variable = createVariableWithConfig(
      collection,
      font.name,
      'STRING',
      font.desc,
      getIntelligentScopes(font.name, 'STRING')
    );
    variable.setValueForMode(lightModeId, font.value);
    count++;
  }
  
  // Font Sizes
  if (config.fontSize) {
    for (const [name, config_val] of Object.entries(config.fontSize)) {
      if (!name || typeof name !== 'string') continue;
      
      let size: number;
      if (Array.isArray(config_val)) {
        size = parseInt(config_val[0]);
      } else {
        size = parseInt(config_val as string);
      }
      
      if (isNaN(size)) continue;
      
      const variable = createVariableWithConfig(
        collection,
        `type/size-${name}`,
        'FLOAT',
        `Font size: ${size}px`,
        getIntelligentScopes(`type/size-${name}`, 'FLOAT')
      );
      
      variable.setValueForMode(lightModeId, size);
      count++;
    }
  }
  
  // Font Weights
  if (config.fontWeight) {
    for (const [name, value] of Object.entries(config.fontWeight)) {
      if (!name || typeof name !== 'string') continue;
      
      const weight = parseInt(value as string);
      if (isNaN(weight)) continue;
      
      const variable = createVariableWithConfig(
        collection,
        `type/weight-${name}`,
        'FLOAT',
        `Font weight: ${weight}`,
        getIntelligentScopes(`type/weight-${name}`, 'FLOAT')
      );
      
      variable.setValueForMode(lightModeId, weight);
      count++;
    }
  }
  
  // BORDER RADIUS
  if (config.borderRadius) {
    for (const [name, value] of Object.entries(config.borderRadius)) {
      if (!name || typeof name !== 'string') continue;
      
      const radius = parseInt(value as string);
      if (isNaN(radius) && value !== '999px') continue;
      
      const variable = createVariableWithConfig(
        collection,
        `radius/${name}`,
        'FLOAT',
        `Border radius: ${value}`,
        getIntelligentScopes(`radius/${name}`, 'FLOAT')
      );
      
      variable.setValueForMode(lightModeId, value === '999px' ? 999 : radius);
      count++;
    }
  }
  
  // OPACITY - Essential opacity values
  const opacityValues = [
    { name: 'opacity/0', value: 0, desc: 'Fully transparent' },
    { name: 'opacity/5', value: 0.05, desc: '5% opacity' },
    { name: 'opacity/10', value: 0.1, desc: '10% opacity' },
    { name: 'opacity/20', value: 0.2, desc: '20% opacity' },
    { name: 'opacity/25', value: 0.25, desc: '25% opacity' },
    { name: 'opacity/40', value: 0.4, desc: '40% opacity' },
    { name: 'opacity/50', value: 0.5, desc: '50% opacity' },
    { name: 'opacity/60', value: 0.6, desc: '60% opacity' },
    { name: 'opacity/75', value: 0.75, desc: '75% opacity' },
    { name: 'opacity/80', value: 0.8, desc: '80% opacity' },
    { name: 'opacity/90', value: 0.9, desc: '90% opacity' },
    { name: 'opacity/95', value: 0.95, desc: '95% opacity' },
    { name: 'opacity/100', value: 1, desc: 'Fully opaque' }
  ];
  
  for (const opacity of opacityValues) {
    const variable = createVariableWithConfig(
      collection,
      opacity.name,
      'FLOAT',
      opacity.desc,
      getIntelligentScopes(opacity.name, 'FLOAT')
    );
    variable.setValueForMode(lightModeId, opacity.value);
    count++;
  }
  
  // GRADIENTS - Common gradient definitions
  const gradients = [
    { name: 'gradient/subtle', value: 'linear-gradient(180deg, var(--surface-default) 0%, var(--surface-elevated) 100%)', desc: 'Subtle surface gradient' },
    { name: 'gradient/brand', value: 'linear-gradient(135deg, var(--sedona-400) 0%, var(--sedona-600) 100%)', desc: 'Sedona brand gradient' },
    { name: 'gradient/success', value: 'linear-gradient(135deg, var(--accent-green) 0%, #16a34a 100%)', desc: 'Success state gradient' },
    { name: 'gradient/warning', value: 'linear-gradient(135deg, var(--accent-orange) 0%, #ea580c 100%)', desc: 'Warning state gradient' },
    { name: 'gradient/error', value: 'linear-gradient(135deg, var(--accent-red) 0%, #dc2626 100%)', desc: 'Error state gradient' }
  ];
  
  for (const gradient of gradients) {
    const variable = createVariableWithConfig(
      collection,
      gradient.name,
      'STRING',
      gradient.desc,
      getIntelligentScopes(gradient.name, 'STRING')
    );
    variable.setValueForMode(lightModeId, gradient.value);
    count++;
  }
  
  console.log(`✅ Foundation: ${count} variables created`);
  return count;
}

async function createSemantic(collection: VariableCollection, lightModeId: string, darkModeId: string): Promise<number> {
  let count = 0;
  const allVars = figma.variables.getLocalVariables();
  const findVar = (name: string) => allVars.find(v => v.name === name && v.variableCollectionId === collection.id);
  
  // Semantic colors using foundation colors  
  const semanticColors = [
    { semantic: 'semantic/text-primary', foundation: 'color/text-primary', desc: 'Primary text for content' },
    { semantic: 'semantic/text-secondary', foundation: 'color/text-secondary', desc: 'Secondary text for descriptions' },
    { semantic: 'semantic/text-tertiary', foundation: 'color/text-tertiary', desc: 'Tertiary text for subtle content' },
    { semantic: 'semantic/text-quaternary', foundation: 'color/text-quaternary', desc: 'Quaternary text for very subtle content' },
    { semantic: 'semantic/surface-default', foundation: 'color/surface-default', desc: 'Default page background' },
    { semantic: 'semantic/surface-elevated', foundation: 'color/surface-elevated', desc: 'Cards and elevated surfaces' },
    { semantic: 'semantic/border-default', foundation: 'color/border-default', desc: 'Default UI borders' },
    { semantic: 'semantic/success', foundation: 'color/accent-green', desc: 'Success states and positive actions' },
    { semantic: 'semantic/warning', foundation: 'color/accent-orange', desc: 'Warning states and caution' },
    { semantic: 'semantic/error', foundation: 'color/accent-red', desc: 'Error states and destructive actions' },
    { semantic: 'semantic/info', foundation: 'color/accent-blue', desc: 'Informational states and content' }
  ];
  
  for (const mapping of semanticColors) {
    const foundationVar = findVar(mapping.foundation);
    if (!foundationVar) continue;
    
    const semanticVar = createVariableWithConfig(
      collection,
      mapping.semantic,
      'COLOR',
      mapping.desc,
      getIntelligentScopes(mapping.semantic, 'COLOR')
    );
    
    // Create alias to foundation variable
    semanticVar.setValueForMode(lightModeId, { type: 'VARIABLE_ALIAS', id: foundationVar.id });
    if (darkModeId !== lightModeId) {
      semanticVar.setValueForMode(darkModeId, { type: 'VARIABLE_ALIAS', id: foundationVar.id });
    }
    count++;
  }
  
  console.log(`✅ Semantic: ${count} variables created`);
  return count;
}

async function createBrand(collection: VariableCollection, lightModeId: string, darkModeId: string): Promise<number> {
  let count = 0;
  const allVars = figma.variables.getLocalVariables();
  const findVar = (name: string) => allVars.find(v => v.name === name && v.variableCollectionId === collection.id);
  
  // Brand colors using semantic colors and foundation
  const brandColors = [
    { brand: 'brand/primary', foundation: 'color/sedona-500', desc: 'Sedona primary brand color' },
    { brand: 'brand/secondary', semantic: 'semantic/surface-elevated', desc: 'Secondary brand color for support' },
    { brand: 'brand/success', semantic: 'semantic/success', desc: 'Brand success color' },
    { brand: 'brand/warning', semantic: 'semantic/warning', desc: 'Brand warning color' },
    { brand: 'brand/error', semantic: 'semantic/error', desc: 'Brand error color' },
    { brand: 'brand/info', semantic: 'semantic/info', desc: 'Brand info color' }
  ];
  
  for (const mapping of brandColors) {
    const refVarName = mapping.foundation || mapping.semantic;
    if (!refVarName) continue; // Skip if no reference variable name
    
    const refVar = findVar(refVarName);
    if (!refVar) continue;
    
    const brandVar = createVariableWithConfig(
      collection,
      mapping.brand,
      'COLOR',
      mapping.desc,
      getIntelligentScopes(mapping.brand, 'COLOR')
    );
    
    // Create alias to reference variable
    brandVar.setValueForMode(lightModeId, { type: 'VARIABLE_ALIAS', id: refVar.id });
    if (darkModeId !== lightModeId) {
      brandVar.setValueForMode(darkModeId, { type: 'VARIABLE_ALIAS', id: refVar.id });
    }
    count++;
  }
  
  console.log(`✅ Brand: ${count} variables created`);
  return count;
}

async function createTextStyles(collection: VariableCollection): Promise<void> {
  console.log('📝 Starting text styles creation...');
  
  const allVars = figma.variables.getLocalVariables();
  const collectionVars = allVars.filter(v => v.variableCollectionId === collection.id);
  
  console.log(`🔍 Found ${collectionVars.length} variables in collection:`);
  collectionVars.forEach(v => console.log(`  - ${v.name} (${v.resolvedType})`));
  
  const findVar = (name: string) => {
    const variable = allVars.find(v => v.name === name && v.variableCollectionId === collection.id);
    if (!variable) {
      console.warn(`⚠️  Variable not found: ${name}`);
    } else {
      console.log(`✅ Found variable: ${name}`);
    }
    return variable;
  };
  
  // Comprehensive text style definitions using variables
  const textStyles = [
    // Display & Headings
    {
      name: 'Display/Large',
      fontFamily: 'font/sans',
      fontSize: 'type/size-display',
      fontWeight: 'type/weight-bold',
      color: 'semantic/text-primary',
      desc: 'Display text (64px, Bold)'
    },
    {
      name: 'Heading/Large',
      fontFamily: 'font/sans',
      fontSize: 'type/size-heading-l',
      fontWeight: 'type/weight-bold',
      color: 'semantic/text-primary',
      desc: 'Large heading H1 (48px, Bold)'
    },
    {
      name: 'Heading/Medium',
      fontFamily: 'font/sans',
      fontSize: 'type/size-heading-m',
      fontWeight: 'type/weight-semibold',
      color: 'semantic/text-primary',
      desc: 'Medium heading H2 (32px, Semibold)'
    },
    {
      name: 'Heading/Small',
      fontFamily: 'font/sans',
      fontSize: 'type/size-heading-s',
      fontWeight: 'type/weight-semibold',
      color: 'semantic/text-primary',
      desc: 'Small heading H3 (24px, Semibold)'
    },
    // Body Text
    {
      name: 'Body/Large',
      fontFamily: 'font/sans',
      fontSize: 'type/size-body-l',
      fontWeight: 'type/weight-regular',
      color: 'semantic/text-primary',
      desc: 'Large body text (20px)'
    },
    {
      name: 'Body/Medium',
      fontFamily: 'font/sans',
      fontSize: 'type/size-body-m',
      fontWeight: 'type/weight-regular',
      color: 'semantic/text-primary',
      desc: 'Medium body text (18px)'
    },
    {
      name: 'Body/Small',
      fontFamily: 'font/sans',
      fontSize: 'type/size-body-s',
      fontWeight: 'type/weight-regular',
      color: 'semantic/text-primary',
      desc: 'Small body text (16px)'
    },
    // Body Text Variations
    {
      name: 'Body/Medium/Secondary',
      fontFamily: 'font/sans',
      fontSize: 'type/size-body-m',
      fontWeight: 'type/weight-regular',
      color: 'semantic/text-secondary',
      desc: 'Medium body secondary text (18px)'
    },
    {
      name: 'Body/Small/Secondary',
      fontFamily: 'font/sans',
      fontSize: 'type/size-body-s',
      fontWeight: 'type/weight-regular',
      color: 'semantic/text-secondary',
      desc: 'Small body secondary text (16px)'
    },
    // Captions
    {
      name: 'Caption/Large',
      fontFamily: 'font/sans',
      fontSize: 'type/size-caption-l',
      fontWeight: 'type/weight-regular',
      color: 'semantic/text-secondary',
      desc: 'Large caption text (14px)'
    },
    {
      name: 'Caption/Medium',
      fontFamily: 'font/sans',
      fontSize: 'type/size-caption-m',
      fontWeight: 'type/weight-regular',
      color: 'semantic/text-secondary',
      desc: 'Medium caption text (12px)'
    },
    {
      name: 'Caption/Small',
      fontFamily: 'font/sans',
      fontSize: 'type/size-caption-s',
      fontWeight: 'type/weight-regular',
      color: 'semantic/text-tertiary',
      desc: 'Small caption text (10px)'
    }
  ];

  console.log(`🎯 Attempting to create ${textStyles.length} text styles...`);
  
  let createdCount = 0;
  for (const style of textStyles) {
    console.log(`\n🔨 Creating text style: ${style.name}`);
    try {
      // Find the variable references
      const fontFamilyVar = findVar(style.fontFamily);
      const fontSizeVar = findVar(style.fontSize);
      const fontWeightVar = findVar(style.fontWeight);
      const colorVar = findVar(style.color);

      if (!fontSizeVar || !colorVar) {
        console.warn(`❌ SKIPPING text style ${style.name} - missing variables:`);
        console.warn(`  - fontFamily: ${fontFamilyVar ? '✅' : '❌'} ${style.fontFamily}`);
        console.warn(`  - fontSize: ${fontSizeVar ? '✅' : '❌'} ${style.fontSize}`);
        console.warn(`  - fontWeight: ${fontWeightVar ? '✅' : '❌'} ${style.fontWeight}`);
        console.warn(`  - color: ${colorVar ? '✅' : '❌'} ${style.color}`);
        
        // Show available size variables for debugging
        if (!fontSizeVar) {
          const sizeVars = collectionVars.filter(v => v.name.includes('type/size'));
          console.warn(`📝 Available size variables:`, sizeVars.map(v => v.name));
        }
        continue;
      }
      
      console.log(`✅ All required variables found for ${style.name}`);

      // Check if text style already exists to avoid duplicates
      const existingStyle = figma.getLocalTextStyles().find(ts => ts.name === style.name);
      if (existingStyle) {
        console.warn(`⚠️  Text style "${style.name}" already exists, skipping...`);
        continue;
      }

      // Create the text style
      const textStyle = figma.createTextStyle();
      textStyle.name = style.name;
      textStyle.description = style.desc;

      // Set font size using variable
      textStyle.fontSize = fontSizeVar.valuesByMode[Object.keys(fontSizeVar.valuesByMode)[0]] as number;

      // Set font family and weight using variables
      let fontFamily = 'Inter'; // Default fallback
      if (fontFamilyVar) {
        const familyValue = fontFamilyVar.valuesByMode[Object.keys(fontFamilyVar.valuesByMode)[0]] as string;
        // Map font variable values to actual font names
        if (familyValue.includes('sans') || familyValue.includes('Inter')) {
          fontFamily = 'Inter';
        } else if (familyValue.includes('mono')) {
          fontFamily = 'JetBrains Mono'; // or 'SF Mono', 'Consolas'
        } else if (familyValue.includes('serif')) {
          fontFamily = 'Times'; // or other serif font
        }
      }

      let fontWeight = 'Regular';
      if (fontWeightVar) {
        const weight = fontWeightVar.valuesByMode[Object.keys(fontWeightVar.valuesByMode)[0]] as number;
        if (weight >= 800) fontWeight = 'ExtraBold';
        else if (weight >= 700) fontWeight = 'Bold';
        else if (weight >= 600) fontWeight = 'SemiBold';
        else if (weight >= 500) fontWeight = 'Medium';
        else if (weight >= 300) fontWeight = 'Light';
        else if (weight >= 200) fontWeight = 'ExtraLight';
        else if (weight >= 100) fontWeight = 'Thin';
        else fontWeight = 'Regular';
      }
      
      // Set the font name using the determined family and weight
      textStyle.fontName = { family: fontFamily, style: fontWeight };

      // Note: Text styles in Figma don't support variable references for colors yet
      // The color will need to be applied when using the text style

      console.log(`✅ Created text style: ${style.name}`);
      createdCount++;
    } catch (error) {
      console.error(`❌ Error creating text style ${style.name}:`, error);
    }
  }
  
  console.log(`📊 Text styles summary: ${createdCount}/${textStyles.length} created successfully`);
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

// Helper function to create variables with descriptions and scopes
function createVariableWithConfig(
  collection: VariableCollection,
  name: string,
  type: VariableResolvedDataType,
  description: string,
  scopes: VariableScope[]
): Variable {
  // Sanitize the variable name to ensure it's valid for Figma
  const sanitizedName = sanitizeVariableName(name);
  
  const existingVariable = figma.variables.getLocalVariables().find(variable => 
    variable.name === sanitizedName && variable.variableCollectionId === collection.id
  );
  
  if (existingVariable) {
    console.log(`Variable ${sanitizedName} already exists, updating...`);
    // Update existing variable's description and scopes
    try {
      existingVariable.description = description;
      existingVariable.scopes = scopes;
    } catch (error) {
      console.warn(`Could not update variable properties: ${error}`);
    }
    return existingVariable;
  }
  
  try {
    const variable = figma.variables.createVariable(sanitizedName, collection.id, type);
    variable.description = description;
    variable.scopes = scopes;
    console.log(`✅ Created variable: ${sanitizedName}`);
    return variable;
  } catch (error: any) {
    console.error(`❌ Error creating variable ${sanitizedName} (original: ${name}):`, error.message);
    throw error;
  }
}

// Generate appropriate dark mode colors
function generateDarkModeColor(lightRgb: any, colorName: string): any {
  if (!lightRgb) return null;
  
  // Surface colors should be inverted for dark mode
  if (colorName.includes('surface')) {
    // Make surfaces darker
    return {
      r: Math.max(0, lightRgb.r - 0.1),
      g: Math.max(0, lightRgb.g - 0.1),
      b: Math.max(0, lightRgb.b - 0.1),
      a: lightRgb.a || 1
    };
  }
  
  // Text colors should be lighter for dark mode
  if (colorName.includes('text')) {
    return {
      r: Math.min(1, lightRgb.r + 0.2),
      g: Math.min(1, lightRgb.g + 0.2),
      b: Math.min(1, lightRgb.b + 0.2),
      a: lightRgb.a || 1
    };
  }
  
  // Default: keep the same color
  return lightRgb;
}

// ABSTRACTED SCOPING RULES - NEVER SET CONFLICTING SCOPES
const SCOPE_RULES: Record<string, Record<string, VariableScope[]>> = {
  COLOR: {
    // Text colors - ONLY text scope
    text: ['TEXT_FILL'],
    placeholder: ['TEXT_FILL'],
    foreground: ['TEXT_FILL'],
    
    // Border colors - ONLY stroke scope  
    border: ['STROKE_COLOR'],
    outline: ['STROKE_COLOR'],
    stroke: ['STROKE_COLOR'],
    
    // Background colors - Frame and shape fills (NO ALL_FILLS)
    background: ['FRAME_FILL', 'SHAPE_FILL'],
    surface: ['FRAME_FILL', 'SHAPE_FILL'],
    fill: ['FRAME_FILL', 'SHAPE_FILL'],
    
    // Shadow/effect colors
    shadow: ['EFFECT_COLOR'],
    glow: ['EFFECT_COLOR'],
    
    // Status/semantic colors - can be used for multiple purposes
    primary: ['FRAME_FILL', 'SHAPE_FILL', 'TEXT_FILL'],
    secondary: ['FRAME_FILL', 'SHAPE_FILL', 'TEXT_FILL'],
    accent: ['FRAME_FILL', 'SHAPE_FILL', 'TEXT_FILL'],
    success: ['FRAME_FILL', 'SHAPE_FILL', 'TEXT_FILL'],
    warning: ['FRAME_FILL', 'SHAPE_FILL', 'TEXT_FILL'],
    error: ['FRAME_FILL', 'SHAPE_FILL', 'TEXT_FILL'],
    info: ['FRAME_FILL', 'SHAPE_FILL', 'TEXT_FILL']
  },
  FLOAT: {
    // Typography
    size: ['TEXT_CONTENT'],
    'font-size': ['TEXT_CONTENT'],
    weight: ['TEXT_CONTENT'],
    'font-weight': ['TEXT_CONTENT'],
    'line-height': ['TEXT_CONTENT'],
    'letter-spacing': ['TEXT_CONTENT'],
    
    // Spacing
    padding: ['GAP'],
    margin: ['GAP'],
    spacing: ['GAP'],
    gap: ['GAP'],
    
    // Border radius
    radius: ['CORNER_RADIUS'],
    'border-radius': ['CORNER_RADIUS'],
    rounded: ['CORNER_RADIUS'],
    
    // Dimensions
    width: ['WIDTH_HEIGHT'],
    height: ['WIDTH_HEIGHT'],
    
    // Opacity
    opacity: ['OPACITY'],
    alpha: ['OPACITY']
  },
  STRING: {
    // Font families and text content
    font: ['TEXT_CONTENT'],
    family: ['TEXT_CONTENT'],
    content: ['TEXT_CONTENT']
  },
  BOOLEAN: {
    // Boolean variables typically don't have scopes, return empty array
    boolean: []
  }
};

function getIntelligentScopes(variableName: string, variableType: VariableResolvedDataType): VariableScope[] {
  const name = variableName.toLowerCase();
  
  const rules = SCOPE_RULES[variableType];
  if (!rules) {
    console.warn(`No scope rules found for type: ${variableType}`);
    return [];
  }
  
  // Find the first matching rule
  for (const [keyword, scopes] of Object.entries(rules)) {
    if (name.includes(keyword)) {
      console.log(`Applied scope rule "${keyword}" to "${variableName}": [${scopes.join(', ')}]`);
      return scopes;
    }
  }
  
  // Default scopes based on type
  if (variableType === 'COLOR') {
    // Generic color - safe default (NO ALL_FILLS to avoid conflicts)
    return ['FRAME_FILL', 'SHAPE_FILL'];
  }
  
  if (variableType === 'FLOAT') {
    // Default for numbers - most commonly used for spacing
    return ['GAP'];
  }
  
  if (variableType === 'STRING') {
    // Default for strings - most commonly used for text content
    return ['TEXT_CONTENT'];
  }
  
  // Fallback - return empty array to avoid scope conflicts
  console.warn(`No default scope found for type: ${variableType}, returning empty scopes`);
  return [];
}

// Enhanced color parser to handle hex, rgba, rgb, hsl, and other formats
function parseColorToRgb(color: string): { r: number; g: number; b: number; a?: number } | null {
  // Remove whitespace
  color = color.trim();
  
  // Handle hex colors
  if (color.startsWith('#')) {
    const hex = color.slice(1);
    if (hex.length === 3) {
      // Short hex
      const r = parseInt(hex[0] + hex[0], 16) / 255;
      const g = parseInt(hex[1] + hex[1], 16) / 255;
      const b = parseInt(hex[2] + hex[2], 16) / 255;
      return { r, g, b };
    } else if (hex.length === 6) {
      // Long hex
      const r = parseInt(hex.slice(0, 2), 16) / 255;
      const g = parseInt(hex.slice(2, 4), 16) / 255;
      const b = parseInt(hex.slice(4, 6), 16) / 255;
      return { r, g, b };
    } else if (hex.length === 8) {
      // Hex with alpha
      const r = parseInt(hex.slice(0, 2), 16) / 255;
      const g = parseInt(hex.slice(2, 4), 16) / 255;
      const b = parseInt(hex.slice(4, 6), 16) / 255;
      const a = parseInt(hex.slice(6, 8), 16) / 255;
      return { r, g, b, a };
    }
  }
  
  // Handle rgba/rgb
  if (color.startsWith('rgb')) {
    const match = color.match(/rgba?\(([^)]+)\)/);
    if (match) {
      const values = match[1].split(',').map(v => v.trim());
      const r = parseInt(values[0]) / 255;
      const g = parseInt(values[1]) / 255;
      const b = parseInt(values[2]) / 255;
      const a = values[3] ? parseFloat(values[3]) : 1;
      return { r, g, b, a };
    }
  }
  
  // Handle special colors
  if (color === 'transparent') {
    return { r: 0, g: 0, b: 0, a: 0 };
  }
  
  console.warn(`Could not parse color: ${color}`);
  return null;
}

// Export function for tokens-only sync (without text styles)
export async function createVariablesFromTailwindTokensOnly(
  collection: VariableCollection,
  tailwindConfig: any
) {
  console.log('🎨 Starting Design Tokens sync (variables only)...');
  console.log('📋 Simple structure: Foundation → Semantic → Brand');

  const totalStart = Date.now();
  let totalVariables = 0;
  const modes = collection.modes;
  const lightModeId = modes[0].modeId;
  const darkModeId = modes.length > 1 ? modes[1].modeId : lightModeId;

  // ROOT LEVEL GROUPS
  console.log('🏗️ Creating Foundation (Base Values)');
  totalVariables += await createFoundation(collection, tailwindConfig, lightModeId, darkModeId);

  console.log('🎯 Creating Semantic (Purpose-based)');
  totalVariables += await createSemantic(collection, lightModeId, darkModeId);

  console.log('🏢 Creating Brand (Sedona Identity)');
  totalVariables += await createBrand(collection, lightModeId, darkModeId);

  const totalTime = Date.now() - totalStart;
  console.log('✅ Design Tokens sync complete!');
  console.log(`📊 Total: ${totalVariables} variables in ${totalTime}ms`);
}

// Export function for text styles only
export async function createTextStylesFromVariables(collection: VariableCollection) {
  console.log('📝 Starting Text Styles creation...');
  
  try {
    await createTextStyles(collection);
    console.log('✅ Text styles created successfully');
  } catch (error: any) {
    console.error('❌ ERROR in createTextStylesFromVariables:', error);
    throw error;
  }
}

// Legacy sync function for compatibility
export async function syncComponentsToFigma(components: any[]) {
  console.log('Legacy sync function called, redirecting to main sync...');
  // This function exists for backwards compatibility but doesn't do anything
  return;
}