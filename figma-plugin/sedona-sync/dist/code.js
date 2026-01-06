/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/component-data.json":
/*!*********************************!*\
  !*** ./src/component-data.json ***!
  \*********************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"components":[{"name":"Button","variants":["default","brand","secondary","destructive","safe","close","risk","outline","ghost","link"],"states":["default","hover","pressed","disabled"],"sizes":["xs","sm","default","lg","icon"],"hasProps":true},{"name":"Input","variants":["default","error","success"],"states":["default","focused","disabled"],"sizes":["sm","default","lg"],"hasProps":true},{"name":"Card","variants":["default","outline","elevated"],"states":["default","hover"],"sizes":["sm","default","lg"],"hasProps":true},{"name":"Badge","variants":["default","success","danger","info","warning","secondary","destructive","outline","safe","close","risk","brand"],"states":["default"],"sizes":["sm","default","lg"],"hasProps":true},{"name":"BadgeGroup","variants":["info","success","warning","danger"],"states":["default"],"sizes":["default"],"hasProps":true},{"name":"Avatar","variants":["default"],"states":["default"],"sizes":["sm","md","lg"],"hasProps":true},{"name":"AgentAvatar","variants":["default"],"states":["online","offline","typing"],"sizes":["sm","md","lg"],"hasProps":true},{"name":"Search","variants":["default"],"states":["default","focused"],"sizes":[],"hasProps":true},{"name":"Navigation","variants":["default"],"states":["default"],"sizes":[],"hasProps":true},{"name":"TableRow","variants":["default"],"states":["default"],"sizes":[],"hasProps":true},{"name":"DotMatrixGrid","variants":["green","red","blue","orange","purple","pink","yellow","neutral"],"states":["default"],"sizes":[],"hasProps":true},{"name":"OutlineCard","variants":["default"],"states":["default"],"sizes":[],"hasProps":true},{"name":"ChatInterface","variants":["widget","panel","fullscreen"],"states":["default","typing"],"sizes":[],"hasProps":true},{"name":"MessageBubble","variants":["agent","user"],"states":["default"],"sizes":[],"hasProps":true}],"tailwindConfig":{"colors":{"zeus":{"surface-default":"#1e1c17","surface-neutral":"#2e2b24","surface-neutral-subtle":"#3e3a31","surface-warning":"#2e2319","surface-warning-accent":"#fb9704","surface-destructive":"#2e1b19","surface-destructive-accent":"#ea1e04","surface-info":"#1e2228","surface-info-accent":"#397fb2","surface-success":"#1e2821","surface-success-accent":"#21a65e","text-primary":"#ffffff","text-secondary":"#ffffff99","text-tertiary":"#ffffff75","text-quaternary":"#ffffff40","text-inverted":"#1e1c17","text-inverted-secondary":"#1e1c1799","text-disabled":"#ffffff1a","icon-primary":"#ffffff","icon-secondary":"#ffffff99","icon-tertiary":"#ffffff75","icon-inverted":"#1e1c17","icon-disabled":"#ffffff1a","border-normal":"#ffffff2e","border-alpha":"#ffffff24","border-divider":"#ffffff24","border-neutral-subtle":"#ffffff3d","border-surface":"#1e1c17","border-focused":"#ffffff4d","border-disabled":"#ffffff0d","button-secondary":"#2e2b24","button-tertiary":"#ffffff14","button-ghost":"#ffffff00","button-disabled":"#ffffff0d","badge-surface":"#1f2228","badge-neutral":"#2e2b24","badge-warning":"#2e2319","badge-destructive":"#2e1b19","badge-info":"#1e2228","badge-success":"#1e2821","accent-red":"#d9281c","accent-red-secondary":"#ffffff80","accent-red-accent":"#e6483d","accent-red-subtle":"#2e1b19","accent-orange":"#fb9704","accent-orange-secondary":"#ffffff80","accent-orange-subtle":"#2e2319","accent-yellow":"#fdd835","accent-yellow-secondary":"#ffffff80","accent-yellow-subtle":"#2e2b19","accent-green":"#21a65e","accent-green-secondary":"#ffffff80","accent-green-accent":"#26bd6c","accent-green-subtle":"#1e2821","accent-blue":"#397fb2","accent-blue-secondary":"#ffffff80","accent-blue-accent":"#4778f5","accent-blue-subtle":"#1e2228","accent-purple":"#8b5cf6","accent-purple-secondary":"#ffffff80","accent-purple-subtle":"#251e2e","accent-pink":"#ec4899","accent-pink-secondary":"#ffffff80","accent-pink-subtle":"#2e1e28","accent-gray":"#6b7280","accent-gray-secondary":"#ffffff80","accent-gray-subtle":"#1f2228","status-success":"#339965","status-success-secondary":"#33996599","status-success-subtle":"#1e2821","status-warning":"#f48e2f","status-warning-secondary":"#f48e2f99","status-warning-subtle":"#2e2319","status-destructive":"#e6483d","status-destructive-secondary":"#e6483db2","status-destructive-subtle":"#2e1b19","status-info":"#397fb2","status-info-secondary":"#397fb299","status-info-subtle":"#1e2228","overlay-light":"#ffffff0d","overlay-medium":"#ffffff1a","overlay-heavy":"#ffffff40","overlay-backdrop":"#000000b3","gradient-start":"#1e1c17","gradient-middle":"#2e2b24","gradient-end":"#3e3a31"},"sedona":{"50":"#fef7ed","100":"#fdead5","200":"#fbd1aa","300":"#f7b174","400":"#f2883c","500":"#de7001","600":"#c25e00","700":"#a14800","800":"#833b02","900":"#6c3108"}},"fontSize":{"caption-s":["10px",{"lineHeight":"14px"}],"caption-m":["12px",{"lineHeight":"16px"}],"caption-l":["14px",{"lineHeight":"20px"}],"body-s":["16px",{"lineHeight":"24px"}],"body-m":["18px",{"lineHeight":"26px"}]},"spacing":{"0":"0","1":"4px","2":"8px","3":"12px","4":"16px","6":"24px","8":"32px","36":"144px"},"borderRadius":{"none":"0","xs":"4px","sm":"4px","md":"8px","lg":"12px","xl":"10px","full":"999px"}}}');

/***/ }),

/***/ "./src/react-to-figma-simple.ts":
/*!**************************************!*\
  !*** ./src/react-to-figma-simple.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ReactFigmaConverter = void 0;
// Simplified React to Figma component conversion
const component_data_json_1 = __importDefault(__webpack_require__(/*! ./component-data.json */ "./src/component-data.json"));
const variable_helper_1 = __webpack_require__(/*! ./variable-helper */ "./src/variable-helper.ts");
class ReactFigmaConverter {
    constructor() {
        this.textStyles = new Map();
        this.tailwindConfig = component_data_json_1.default.tailwindConfig;
        this.components = component_data_json_1.default.components;
    }
    async createAllComponents() {
        console.log('🚀 Starting simplified component creation with variable linking...');
        // Initialize variable helper
        await variable_helper_1.VariableHelper.initialize();
        // Index text styles
        const allTextStyles = figma.getLocalTextStyles();
        for (const textStyle of allTextStyles) {
            this.textStyles.set(textStyle.name, textStyle);
        }
        console.log(`📊 Indexed ${this.textStyles.size} text styles`);
        console.log('Loading fonts...');
        // Load all required fonts
        const fontsToLoad = [
            { family: 'Inter', style: 'Regular' },
            { family: 'Inter', style: 'Medium' },
            { family: 'Inter', style: 'SemiBold' },
            { family: 'Inter', style: 'Bold' }
        ];
        for (const font of fontsToLoad) {
            try {
                await figma.loadFontAsync(font);
                console.log(`Loaded font: ${font.family} ${font.style}`);
            }
            catch (error) {
                console.warn(`Failed to load font ${font.family} ${font.style}:`, error);
                try {
                    if (font.style === 'SemiBold') {
                        await figma.loadFontAsync({ family: 'Inter', style: 'Medium' });
                        console.log(`Using Medium as fallback for SemiBold`);
                    }
                    else {
                        await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
                        console.log(`Using Regular as fallback for ${font.style}`);
                    }
                }
                catch (fallbackError) {
                    console.warn(`Fallback font also failed, using default`);
                }
            }
        }
        const componentSets = [];
        // Create a main components page
        let componentsPage = figma.root.children.find(page => page.name === 'Sedona Components');
        if (!componentsPage) {
            componentsPage = figma.createPage();
            componentsPage.name = 'Sedona Components';
        }
        figma.currentPage = componentsPage;
        // Clear existing content
        componentsPage.children.forEach(node => node.remove());
        let yOffset = 0;
        const sectionSpacing = 120;
        for (const component of this.components) {
            console.log(`Creating component set: ${component.name}`);
            const componentSet = await this.createComponentSet(component);
            if (componentSet) {
                componentSet.y = yOffset;
                componentSet.x = 0;
                yOffset += componentSet.height + sectionSpacing;
                componentSets.push(componentSet);
            }
        }
        return componentSets;
    }
    async createComponentSet(config) {
        const { name, variants, states, sizes } = config;
        // Create component set
        const componentSet = figma.createComponentSet ? figma.createComponentSet() : figma.createFrame();
        componentSet.name = `Sedona/${name}`;
        let createdComponents = 0;
        // Create variants
        if (variants.length > 0) {
            for (const variant of variants) {
                if (sizes.length > 0) {
                    for (const size of sizes) {
                        const component = await this.createSingleComponent(name, { variant, size });
                        if (component) {
                            componentSet.appendChild(component);
                            createdComponents++;
                        }
                    }
                }
                else {
                    const component = await this.createSingleComponent(name, { variant });
                    if (component) {
                        componentSet.appendChild(component);
                        createdComponents++;
                    }
                }
            }
        }
        else {
            const component = await this.createSingleComponent(name, {});
            if (component) {
                componentSet.appendChild(component);
                createdComponents++;
            }
        }
        if (createdComponents === 0) {
            componentSet.remove();
            return null;
        }
        // Set up auto-layout for component set
        this.setupComponentSetLayout(componentSet);
        return componentSet;
    }
    async createSingleComponent(componentName, properties) {
        const component = figma.createComponent();
        // Build component name with properties
        const nameParts = [];
        if (properties.variant)
            nameParts.push(`variant=${properties.variant}`);
        if (properties.size)
            nameParts.push(`size=${properties.size}`);
        if (properties.state)
            nameParts.push(`state=${properties.state}`);
        component.name = nameParts.length > 0 ? nameParts.join(', ') : 'default';
        // Create component based on type
        const componentFrame = await this.createComponentFrame(componentName, properties);
        if (!componentFrame)
            return null;
        component.appendChild(componentFrame);
        // Resize component to fit content
        component.resizeWithoutConstraints(componentFrame.width, componentFrame.height);
        return component;
    }
    async createComponentFrame(componentName, properties) {
        const lowerName = componentName.toLowerCase();
        switch (lowerName) {
            case 'button':
                return this.createButtonFrame(properties);
            case 'input':
                return this.createInputFrame(properties);
            case 'card':
                return this.createCardFrame(properties);
            case 'badge':
            case 'badgegroup':
                return this.createBadgeFrame(properties);
            case 'avatar':
            case 'agentavatar':
                return this.createAvatarFrame(properties);
            default:
                return this.createGenericFrame(componentName, properties);
        }
    }
    createButtonFrame(properties) {
        const frame = figma.createFrame();
        frame.name = 'Button';
        const variant = properties.variant || 'default';
        const size = properties.size || 'default';
        const state = properties.state;
        // Get dimensions
        const dimensions = this.getButtonDimensions(size);
        frame.resize(dimensions.width, dimensions.height);
        // Set background with variable linking if available
        const backgroundColor = this.getButtonBackgroundColor(variant);
        const opacity = state === 'disabled' ? 0.5 : 1;
        // Try to use variables for semantic colors
        const variableName = this.getSemanticVariableName(variant);
        if (variable_helper_1.VariableHelper.hasVariables() && variableName) {
            variable_helper_1.VariableHelper.applyVariableFill(frame, variableName, backgroundColor);
        }
        else {
            frame.fills = [{ type: 'SOLID', color: backgroundColor, opacity }];
        }
        frame.cornerRadius = 8;
        // Add text
        const text = figma.createText();
        const textStyle = this.textStyles.get(this.getButtonTextStyleName(size));
        if (textStyle) {
            text.textStyleId = textStyle.id;
        }
        else {
            text.fontName = { family: 'Inter', style: 'Medium' };
            text.fontSize = this.getButtonFontSize(size);
        }
        text.characters = variant.charAt(0).toUpperCase() + variant.slice(1) + ' Button';
        // Set text color
        const textColor = this.getButtonTextColor(variant);
        text.fills = [{ type: 'SOLID', color: textColor, opacity }];
        frame.appendChild(text);
        // Set up auto-layout
        frame.layoutMode = 'HORIZONTAL';
        frame.primaryAxisAlignItems = 'CENTER';
        frame.counterAxisAlignItems = 'CENTER';
        frame.paddingLeft = dimensions.paddingX;
        frame.paddingRight = dimensions.paddingX;
        frame.paddingTop = dimensions.paddingY;
        frame.paddingBottom = dimensions.paddingY;
        return frame;
    }
    createInputFrame(properties) {
        const frame = figma.createFrame();
        frame.name = 'Input';
        const variant = properties.variant || 'default';
        const size = properties.size || 'default';
        const state = properties.state;
        // Get dimensions based on size
        const dimensions = this.getInputDimensions(size);
        frame.resize(dimensions.width, dimensions.height);
        frame.cornerRadius = 8;
        // Set background and border with variables
        const surfaceColor = this.getZeusColor('surface-default');
        const borderColor = this.getInputBorderColor(variant, state);
        if (variable_helper_1.VariableHelper.hasVariables()) {
            variable_helper_1.VariableHelper.applyVariableFill(frame, 'semantic/surface-default', surfaceColor);
            variable_helper_1.VariableHelper.applyVariableStroke(frame, this.getInputBorderVariableName(variant, state), borderColor);
        }
        else {
            frame.fills = [{ type: 'SOLID', color: surfaceColor }];
            frame.strokes = [{ type: 'SOLID', color: borderColor }];
        }
        frame.strokeWeight = 1;
        // Add placeholder text
        const placeholder = figma.createText();
        const textStyleName = this.getInputTextStyleName(size);
        const textStyle = this.textStyles.get(textStyleName);
        if (textStyle) {
            placeholder.textStyleId = textStyle.id;
        }
        else {
            placeholder.fontName = { family: 'Inter', style: 'Regular' };
            placeholder.fontSize = this.getInputFontSize(size);
        }
        placeholder.characters = this.getInputPlaceholder(variant, state);
        placeholder.fills = [{ type: 'SOLID', color: this.getZeusColor('text-tertiary') }];
        frame.appendChild(placeholder);
        // Auto-layout
        frame.layoutMode = 'HORIZONTAL';
        frame.primaryAxisAlignItems = 'CENTER';
        frame.paddingLeft = dimensions.paddingX;
        frame.paddingRight = dimensions.paddingX;
        return frame;
    }
    createCardFrame(properties) {
        const frame = figma.createFrame();
        frame.name = 'Card';
        const variant = properties.variant || 'default';
        const size = properties.size || 'default';
        // Get dimensions based on size
        const dimensions = this.getCardDimensions(size);
        frame.resize(dimensions.width, dimensions.height);
        frame.cornerRadius = 12;
        // Set background based on variant
        const backgroundColor = this.getCardBackgroundColor(variant);
        const borderColor = this.getZeusColor('border-normal');
        if (variant === 'outline') {
            frame.fills = [];
            if (variable_helper_1.VariableHelper.hasVariables()) {
                variable_helper_1.VariableHelper.applyVariableStroke(frame, 'semantic/border-default', borderColor);
            }
            else {
                frame.strokes = [{ type: 'SOLID', color: borderColor }];
            }
            frame.strokeWeight = 1;
        }
        else {
            if (variable_helper_1.VariableHelper.hasVariables()) {
                variable_helper_1.VariableHelper.applyVariableFill(frame, this.getCardBackgroundVariableName(variant), backgroundColor);
            }
            else {
                frame.fills = [{ type: 'SOLID', color: backgroundColor }];
            }
            // Add subtle border for elevated cards
            if (variant === 'elevated') {
                if (variable_helper_1.VariableHelper.hasVariables()) {
                    variable_helper_1.VariableHelper.applyVariableStroke(frame, 'semantic/border-default', borderColor);
                }
                else {
                    frame.strokes = [{ type: 'SOLID', color: borderColor, opacity: 0.1 }];
                }
                frame.strokeWeight = 1;
            }
        }
        // Add header
        const header = figma.createText();
        const headerStyle = this.textStyles.get('Body/Medium');
        if (headerStyle) {
            header.textStyleId = headerStyle.id;
        }
        else {
            try {
                header.fontName = { family: 'Inter', style: 'SemiBold' };
            }
            catch (_a) {
                header.fontName = { family: 'Inter', style: 'Medium' };
            }
            header.fontSize = 18;
        }
        header.characters = `${variant.charAt(0).toUpperCase() + variant.slice(1)} Card`;
        header.fills = [{ type: 'SOLID', color: this.getZeusColor('text-primary') }];
        // Add content
        const content = figma.createText();
        const contentStyle = this.textStyles.get('Body/Small');
        if (contentStyle) {
            content.textStyleId = contentStyle.id;
        }
        else {
            content.fontName = { family: 'Inter', style: 'Regular' };
            content.fontSize = 14;
        }
        content.characters = 'Card content goes here. This is a description or body text.';
        content.fills = [{ type: 'SOLID', color: this.getZeusColor('text-secondary') }];
        content.resize(dimensions.width - 32, 40);
        frame.appendChild(header);
        frame.appendChild(content);
        // Auto-layout
        frame.layoutMode = 'VERTICAL';
        frame.primaryAxisSizingMode = 'AUTO';
        frame.itemSpacing = 8;
        frame.paddingTop = 16;
        frame.paddingBottom = 16;
        frame.paddingLeft = 16;
        frame.paddingRight = 16;
        return frame;
    }
    createBadgeFrame(properties) {
        const frame = figma.createFrame();
        frame.name = 'Badge';
        const variant = properties.variant || 'default';
        const size = properties.size || 'default';
        const badgeHeight = size === 'sm' ? 20 : size === 'lg' ? 32 : 24;
        frame.resize(80, badgeHeight);
        frame.cornerRadius = badgeHeight / 2;
        // Set background
        const backgroundColor = this.getBadgeBackgroundColor(variant);
        frame.fills = [{ type: 'SOLID', color: backgroundColor }];
        // Add text
        const text = figma.createText();
        const textStyle = this.textStyles.get(this.getBadgeTextStyleName(size));
        if (textStyle) {
            text.textStyleId = textStyle.id;
        }
        else {
            text.fontName = { family: 'Inter', style: 'Medium' };
            text.fontSize = size === 'sm' ? 10 : size === 'lg' ? 14 : 12;
        }
        text.characters = variant.toUpperCase();
        text.fills = [{ type: 'SOLID', color: this.getBadgeTextColor(variant) }];
        frame.appendChild(text);
        // Auto-layout
        frame.layoutMode = 'HORIZONTAL';
        frame.primaryAxisAlignItems = 'CENTER';
        frame.counterAxisAlignItems = 'CENTER';
        frame.primaryAxisSizingMode = 'AUTO';
        frame.paddingLeft = 12;
        frame.paddingRight = 12;
        return frame;
    }
    createAvatarFrame(properties) {
        const frame = figma.createFrame();
        frame.name = 'Avatar';
        const size = this.getAvatarSize(properties.size || 'md');
        frame.resize(size, size);
        frame.cornerRadius = size / 2;
        // Set background and border
        if (variable_helper_1.VariableHelper.hasVariables()) {
            variable_helper_1.VariableHelper.applyVariableFill(frame, 'semantic/surface-elevated', this.getZeusColor('surface-neutral'));
            variable_helper_1.VariableHelper.applyVariableStroke(frame, 'semantic/border-default', this.getZeusColor('border-normal'));
        }
        else {
            frame.fills = [{ type: 'SOLID', color: this.getZeusColor('surface-neutral') }];
            frame.strokes = [{ type: 'SOLID', color: this.getZeusColor('border-normal') }];
        }
        frame.strokeWeight = 1;
        // Add initials
        const text = figma.createText();
        const textStyle = this.textStyles.get(this.getAvatarTextStyleName(properties.size || 'md'));
        if (textStyle) {
            text.textStyleId = textStyle.id;
        }
        else {
            text.fontName = { family: 'Inter', style: 'Medium' };
            text.fontSize = size * 0.4;
        }
        text.characters = 'SU';
        text.fills = [{ type: 'SOLID', color: this.getZeusColor('text-primary') }];
        frame.appendChild(text);
        // Auto-layout
        frame.layoutMode = 'HORIZONTAL';
        frame.primaryAxisAlignItems = 'CENTER';
        frame.counterAxisAlignItems = 'CENTER';
        return frame;
    }
    createGenericFrame(componentName, properties) {
        const frame = figma.createFrame();
        frame.name = componentName;
        frame.resize(200, 60);
        frame.cornerRadius = 8;
        // Set background
        if (variable_helper_1.VariableHelper.hasVariables()) {
            variable_helper_1.VariableHelper.applyVariableFill(frame, 'semantic/surface-elevated', this.getZeusColor('surface-neutral'));
        }
        else {
            frame.fills = [{ type: 'SOLID', color: this.getZeusColor('surface-neutral') }];
        }
        // Add text
        const text = figma.createText();
        const textStyle = this.textStyles.get('Caption/Large');
        if (textStyle) {
            text.textStyleId = textStyle.id;
        }
        else {
            text.fontName = { family: 'Inter', style: 'Medium' };
            text.fontSize = 14;
        }
        text.characters = `${componentName} - ${properties.variant || 'default'}`;
        text.fills = [{ type: 'SOLID', color: this.getZeusColor('text-primary') }];
        frame.appendChild(text);
        // Auto-layout
        frame.layoutMode = 'HORIZONTAL';
        frame.primaryAxisAlignItems = 'CENTER';
        frame.counterAxisAlignItems = 'CENTER';
        frame.paddingLeft = 16;
        frame.paddingRight = 16;
        frame.paddingTop = 8;
        frame.paddingBottom = 8;
        return frame;
    }
    // Helper methods
    getButtonDimensions(size) {
        switch (size) {
            case 'xs': return { width: 60, height: 28, paddingX: 8, paddingY: 4 };
            case 'sm': return { width: 80, height: 32, paddingX: 12, paddingY: 6 };
            case 'lg': return { width: 140, height: 48, paddingX: 20, paddingY: 12 };
            case 'icon': return { width: 32, height: 32, paddingX: 8, paddingY: 8 };
            default: return { width: 120, height: 40, paddingX: 16, paddingY: 8 };
        }
    }
    getButtonFontSize(size) {
        switch (size) {
            case 'xs': return 10;
            case 'sm': return 12;
            case 'lg': return 16;
            case 'icon': return 12;
            default: return 14;
        }
    }
    getButtonBackgroundColor(variant) {
        switch (variant) {
            case 'brand': return this.getSedonaColor(500);
            case 'secondary': return this.getZeusColor('surface-neutral');
            case 'destructive':
            case 'risk': return this.getZeusColor('accent-red');
            case 'safe': return this.getZeusColor('accent-green');
            case 'close': return this.getZeusColor('accent-orange');
            case 'outline':
            case 'ghost':
            case 'link': return { r: 0, g: 0, b: 0 };
            default: return { r: 0.2, g: 0.2, b: 0.2 };
        }
    }
    getButtonTextColor(variant) {
        switch (variant) {
            case 'outline':
            case 'ghost': return this.getZeusColor('text-primary');
            case 'link': return this.getSedonaColor(500);
            default: return { r: 1, g: 1, b: 1 };
        }
    }
    getBadgeBackgroundColor(variant) {
        switch (variant) {
            case 'success':
            case 'safe': return this.getZeusColor('badge-success');
            case 'warning':
            case 'close': return this.getZeusColor('badge-warning');
            case 'danger':
            case 'destructive':
            case 'risk': return this.getZeusColor('badge-destructive');
            case 'info': return this.getZeusColor('badge-info');
            case 'brand': return this.getZeusColor('badge-neutral');
            case 'outline': return { r: 0, g: 0, b: 0 };
            default: return this.getZeusColor('badge-neutral');
        }
    }
    getBadgeTextColor(variant) {
        switch (variant) {
            case 'success':
            case 'safe': return this.getZeusColor('accent-green');
            case 'warning':
            case 'close': return this.getZeusColor('accent-orange');
            case 'danger':
            case 'destructive':
            case 'risk': return this.getZeusColor('accent-red');
            case 'info': return this.getZeusColor('accent-blue');
            case 'brand': return this.getSedonaColor(500);
            default: return this.getZeusColor('text-primary');
        }
    }
    getSemanticVariableName(variant) {
        switch (variant) {
            case 'brand': return 'brand/primary';
            case 'secondary': return 'semantic/surface-elevated';
            case 'destructive':
            case 'risk': return 'semantic/error';
            case 'safe': return 'semantic/success';
            case 'close': return 'semantic/warning';
            default: return 'semantic/surface-elevated';
        }
    }
    getButtonTextStyleName(size) {
        switch (size) {
            case 'xs': return 'Caption/Small';
            case 'sm': return 'Caption/Medium';
            case 'lg': return 'Body/Medium';
            default: return 'Caption/Large';
        }
    }
    getBadgeTextStyleName(size) {
        switch (size) {
            case 'sm': return 'Caption/Small';
            case 'lg': return 'Caption/Large';
            default: return 'Caption/Medium';
        }
    }
    getAvatarTextStyleName(size) {
        switch (size) {
            case 'sm': return 'Caption/Small';
            case 'lg': return 'Body/Small';
            case 'xl': return 'Body/Medium';
            default: return 'Caption/Large';
        }
    }
    getAvatarSize(size) {
        switch (size) {
            case 'sm': return 32;
            case 'lg': return 56;
            case 'xl': return 72;
            default: return 40;
        }
    }
    getInputDimensions(size) {
        switch (size) {
            case 'sm': return { width: 200, height: 36, paddingX: 10 };
            case 'lg': return { width: 300, height: 52, paddingX: 16 };
            default: return { width: 240, height: 44, paddingX: 12 };
        }
    }
    getInputFontSize(size) {
        switch (size) {
            case 'sm': return 12;
            case 'lg': return 16;
            default: return 14;
        }
    }
    getInputTextStyleName(size) {
        switch (size) {
            case 'sm': return 'Caption/Medium';
            case 'lg': return 'Body/Medium';
            default: return 'Body/Small';
        }
    }
    getInputBorderVariableName(variant, state) {
        if (variant === 'error')
            return 'semantic/error';
        if (variant === 'success')
            return 'semantic/success';
        if (state === 'focused')
            return 'brand/primary';
        return 'semantic/border-default';
    }
    getCardDimensions(size) {
        switch (size) {
            case 'sm': return { width: 240, height: 160 };
            case 'lg': return { width: 400, height: 280 };
            default: return { width: 300, height: 200 };
        }
    }
    getCardBackgroundColor(variant) {
        switch (variant) {
            case 'elevated': return this.getZeusColor('surface-neutral-subtle');
            case 'outline': return { r: 0, g: 0, b: 0 }; // Transparent
            default: return this.getZeusColor('surface-neutral');
        }
    }
    getCardBackgroundVariableName(variant) {
        switch (variant) {
            case 'elevated': return 'semantic/surface-elevated';
            case 'outline': return 'semantic/surface-default';
            default: return 'semantic/surface-default';
        }
    }
    getInputBorderColor(variant, state) {
        if (variant === 'error')
            return { r: 0.9, g: 0.28, b: 0.24 };
        if (variant === 'success')
            return { r: 0.13, g: 0.65, b: 0.37 };
        if (state === 'focused')
            return this.getSedonaColor(500);
        return this.getZeusColor('border-normal');
    }
    getInputPlaceholder(variant, state) {
        if (state === 'disabled')
            return 'Disabled input';
        if (variant === 'error')
            return 'Error state';
        if (variant === 'success')
            return 'Success state';
        return 'Placeholder text';
    }
    getZeusColor(colorName) {
        var _a;
        const zeusColors = ((_a = this.tailwindConfig.colors) === null || _a === void 0 ? void 0 : _a.zeus) || {};
        const colorValue = zeusColors[colorName];
        if (colorValue) {
            return this.hexToRgb(colorValue) || { r: 1, g: 1, b: 1 };
        }
        // Fallback colors
        const fallbacks = {
            'surface-default': { r: 0.12, g: 0.11, b: 0.09 },
            'surface-neutral': { r: 0.18, g: 0.17, b: 0.14 },
            'text-primary': { r: 1, g: 1, b: 1 },
            'text-secondary': { r: 1, g: 1, b: 1 },
            'text-tertiary': { r: 1, g: 1, b: 1 },
            'border-normal': { r: 1, g: 1, b: 1 },
            'accent-red': { r: 0.85, g: 0.16, b: 0.11 },
            'accent-orange': { r: 0.98, g: 0.59, b: 0.02 },
            'accent-green': { r: 0.13, g: 0.65, b: 0.37 },
            'accent-blue': { r: 0.22, g: 0.5, b: 0.7 },
            'badge-success': { r: 0.12, g: 0.16, b: 0.13 },
            'badge-warning': { r: 0.18, g: 0.14, b: 0.10 },
            'badge-destructive': { r: 0.18, g: 0.11, b: 0.10 },
            'badge-info': { r: 0.12, g: 0.13, b: 0.16 },
            'badge-neutral': { r: 0.18, g: 0.17, b: 0.14 }
        };
        return fallbacks[colorName] || { r: 0.5, g: 0.5, b: 0.5 };
    }
    getSedonaColor(shade) {
        var _a;
        const sedonaColors = ((_a = this.tailwindConfig.colors) === null || _a === void 0 ? void 0 : _a.sedona) || {};
        const colorValue = sedonaColors[shade.toString()];
        if (colorValue) {
            return this.hexToRgb(colorValue) || { r: 0.87, g: 0.44, b: 0.01 };
        }
        return { r: 0.87, g: 0.44, b: 0.01 };
    }
    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16) / 255,
            g: parseInt(result[2], 16) / 255,
            b: parseInt(result[3], 16) / 255
        } : null;
    }
    setupComponentSetLayout(componentSet) {
        componentSet.layoutMode = 'HORIZONTAL';
        componentSet.primaryAxisSizingMode = 'AUTO';
        componentSet.counterAxisSizingMode = 'AUTO';
        componentSet.itemSpacing = 24;
        componentSet.paddingTop = 32;
        componentSet.paddingBottom = 32;
        componentSet.paddingLeft = 32;
        componentSet.paddingRight = 32;
        // Wrap to multiple rows if too many variants
        const children = componentSet.children;
        if (children.length > 6) {
            componentSet.layoutMode = 'VERTICAL';
            componentSet.itemSpacing = 16;
        }
    }
}
exports.ReactFigmaConverter = ReactFigmaConverter;


/***/ }),

/***/ "./src/sync/tailwind-sync.ts":
/*!***********************************!*\
  !*** ./src/sync/tailwind-sync.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createVariablesFromTailwind = createVariablesFromTailwind;
exports.createVariablesFromTailwindTokensOnly = createVariablesFromTailwindTokensOnly;
exports.createTextStylesFromVariables = createTextStylesFromVariables;
exports.syncComponentsToFigma = syncComponentsToFigma;
function isValidColorValue(value) {
    if (!value || typeof value !== 'string')
        return false;
    return value.startsWith('#') ||
        value.startsWith('rgb') ||
        value.startsWith('hsl') ||
        value === 'transparent' ||
        value === 'currentColor' ||
        value === 'inherit' ||
        /^\w+$/.test(value); // Named colors
}
// Validate and sanitize Figma variable names
function sanitizeVariableName(name) {
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
async function createVariablesFromTailwind(collection, tailwindConfig) {
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
async function createFoundation(collection, config, lightModeId, darkModeId) {
    let count = 0;
    // COLOR - Foundation colors (only the essential base colors we need)
    if (config.colors && config.colors.zeus) {
        // Map Zeus colors to clean foundation names
        const foundationColorMap = {
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
            if (!zeusValue || !isValidColorValue(zeusValue))
                continue;
            const variable = createVariableWithConfig(collection, `color/${foundationName}`, 'COLOR', mapping.desc, getIntelligentScopes(`color/${foundationName}`, 'COLOR'));
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
                if (!shade || typeof shade !== 'string' || !isValidColorValue(value) || shade === 'primary')
                    continue;
                const variable = createVariableWithConfig(collection, `color/sedona-${shade}`, 'COLOR', `Sedona brand color: ${shade}`, getIntelligentScopes(`color/sedona-${shade}`, 'COLOR'));
                const lightRgb = parseColorToRgb(value);
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
            if (!name || typeof name !== 'string')
                continue;
            const numValue = parseInt(value);
            if (isNaN(numValue))
                continue;
            const variable = createVariableWithConfig(collection, `spacing/${name}`, 'FLOAT', `Base spacing: ${numValue}px`, getIntelligentScopes(`spacing/${name}`, 'FLOAT'));
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
        const variable = createVariableWithConfig(collection, font.name, 'STRING', font.desc, getIntelligentScopes(font.name, 'STRING'));
        variable.setValueForMode(lightModeId, font.value);
        count++;
    }
    // Font Sizes
    if (config.fontSize) {
        for (const [name, config_val] of Object.entries(config.fontSize)) {
            if (!name || typeof name !== 'string')
                continue;
            let size;
            if (Array.isArray(config_val)) {
                size = parseInt(config_val[0]);
            }
            else {
                size = parseInt(config_val);
            }
            if (isNaN(size))
                continue;
            const variable = createVariableWithConfig(collection, `type/size-${name}`, 'FLOAT', `Font size: ${size}px`, getIntelligentScopes(`type/size-${name}`, 'FLOAT'));
            variable.setValueForMode(lightModeId, size);
            count++;
        }
    }
    // Font Weights
    if (config.fontWeight) {
        for (const [name, value] of Object.entries(config.fontWeight)) {
            if (!name || typeof name !== 'string')
                continue;
            const weight = parseInt(value);
            if (isNaN(weight))
                continue;
            const variable = createVariableWithConfig(collection, `type/weight-${name}`, 'FLOAT', `Font weight: ${weight}`, getIntelligentScopes(`type/weight-${name}`, 'FLOAT'));
            variable.setValueForMode(lightModeId, weight);
            count++;
        }
    }
    // BORDER RADIUS
    if (config.borderRadius) {
        for (const [name, value] of Object.entries(config.borderRadius)) {
            if (!name || typeof name !== 'string')
                continue;
            const radius = parseInt(value);
            if (isNaN(radius) && value !== '999px')
                continue;
            const variable = createVariableWithConfig(collection, `radius/${name}`, 'FLOAT', `Border radius: ${value}`, getIntelligentScopes(`radius/${name}`, 'FLOAT'));
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
        const variable = createVariableWithConfig(collection, opacity.name, 'FLOAT', opacity.desc, getIntelligentScopes(opacity.name, 'FLOAT'));
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
        const variable = createVariableWithConfig(collection, gradient.name, 'STRING', gradient.desc, getIntelligentScopes(gradient.name, 'STRING'));
        variable.setValueForMode(lightModeId, gradient.value);
        count++;
    }
    console.log(`✅ Foundation: ${count} variables created`);
    return count;
}
async function createSemantic(collection, lightModeId, darkModeId) {
    let count = 0;
    const allVars = figma.variables.getLocalVariables();
    const findVar = (name) => allVars.find(v => v.name === name && v.variableCollectionId === collection.id);
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
        if (!foundationVar)
            continue;
        const semanticVar = createVariableWithConfig(collection, mapping.semantic, 'COLOR', mapping.desc, getIntelligentScopes(mapping.semantic, 'COLOR'));
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
async function createBrand(collection, lightModeId, darkModeId) {
    let count = 0;
    const allVars = figma.variables.getLocalVariables();
    const findVar = (name) => allVars.find(v => v.name === name && v.variableCollectionId === collection.id);
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
        if (!refVarName)
            continue; // Skip if no reference variable name
        const refVar = findVar(refVarName);
        if (!refVar)
            continue;
        const brandVar = createVariableWithConfig(collection, mapping.brand, 'COLOR', mapping.desc, getIntelligentScopes(mapping.brand, 'COLOR'));
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
async function createTextStyles(collection) {
    console.log('📝 Starting text styles creation...');
    const allVars = figma.variables.getLocalVariables();
    const collectionVars = allVars.filter(v => v.variableCollectionId === collection.id);
    console.log(`🔍 Found ${collectionVars.length} variables in collection:`);
    collectionVars.forEach(v => console.log(`  - ${v.name} (${v.resolvedType})`));
    const findVar = (name) => {
        const variable = allVars.find(v => v.name === name && v.variableCollectionId === collection.id);
        if (!variable) {
            console.warn(`⚠️  Variable not found: ${name}`);
        }
        else {
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
            textStyle.fontSize = fontSizeVar.valuesByMode[Object.keys(fontSizeVar.valuesByMode)[0]];
            // Set font family and weight using variables
            let fontFamily = 'Inter'; // Default fallback
            if (fontFamilyVar) {
                const familyValue = fontFamilyVar.valuesByMode[Object.keys(fontFamilyVar.valuesByMode)[0]];
                // Map font variable values to actual font names
                if (familyValue.includes('sans') || familyValue.includes('Inter')) {
                    fontFamily = 'Inter';
                }
                else if (familyValue.includes('mono')) {
                    fontFamily = 'JetBrains Mono'; // or 'SF Mono', 'Consolas'
                }
                else if (familyValue.includes('serif')) {
                    fontFamily = 'Times'; // or other serif font
                }
            }
            let fontWeight = 'Regular';
            if (fontWeightVar) {
                const weight = fontWeightVar.valuesByMode[Object.keys(fontWeightVar.valuesByMode)[0]];
                if (weight >= 800)
                    fontWeight = 'ExtraBold';
                else if (weight >= 700)
                    fontWeight = 'Bold';
                else if (weight >= 600)
                    fontWeight = 'SemiBold';
                else if (weight >= 500)
                    fontWeight = 'Medium';
                else if (weight >= 300)
                    fontWeight = 'Light';
                else if (weight >= 200)
                    fontWeight = 'ExtraLight';
                else if (weight >= 100)
                    fontWeight = 'Thin';
                else
                    fontWeight = 'Regular';
            }
            // Set the font name using the determined family and weight
            textStyle.fontName = { family: fontFamily, style: fontWeight };
            // Note: Text styles in Figma don't support variable references for colors yet
            // The color will need to be applied when using the text style
            console.log(`✅ Created text style: ${style.name}`);
            createdCount++;
        }
        catch (error) {
            console.error(`❌ Error creating text style ${style.name}:`, error);
        }
    }
    console.log(`📊 Text styles summary: ${createdCount}/${textStyles.length} created successfully`);
}
// ==========================================
// UTILITY FUNCTIONS
// ==========================================
// Helper function to create variables with descriptions and scopes
function createVariableWithConfig(collection, name, type, description, scopes) {
    // Sanitize the variable name to ensure it's valid for Figma
    const sanitizedName = sanitizeVariableName(name);
    const existingVariable = figma.variables.getLocalVariables().find(variable => variable.name === sanitizedName && variable.variableCollectionId === collection.id);
    if (existingVariable) {
        console.log(`Variable ${sanitizedName} already exists, updating...`);
        // Update existing variable's description and scopes
        try {
            existingVariable.description = description;
            existingVariable.scopes = scopes;
        }
        catch (error) {
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
    }
    catch (error) {
        console.error(`❌ Error creating variable ${sanitizedName} (original: ${name}):`, error.message);
        throw error;
    }
}
// Generate appropriate dark mode colors
function generateDarkModeColor(lightRgb, colorName) {
    if (!lightRgb)
        return null;
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
const SCOPE_RULES = {
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
function getIntelligentScopes(variableName, variableType) {
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
function parseColorToRgb(color) {
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
        }
        else if (hex.length === 6) {
            // Long hex
            const r = parseInt(hex.slice(0, 2), 16) / 255;
            const g = parseInt(hex.slice(2, 4), 16) / 255;
            const b = parseInt(hex.slice(4, 6), 16) / 255;
            return { r, g, b };
        }
        else if (hex.length === 8) {
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
async function createVariablesFromTailwindTokensOnly(collection, tailwindConfig) {
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
async function createTextStylesFromVariables(collection) {
    console.log('📝 Starting Text Styles creation...');
    try {
        await createTextStyles(collection);
        console.log('✅ Text styles created successfully');
    }
    catch (error) {
        console.error('❌ ERROR in createTextStylesFromVariables:', error);
        throw error;
    }
}
// Legacy sync function for compatibility
async function syncComponentsToFigma(components) {
    console.log('Legacy sync function called, redirecting to main sync...');
    // This function exists for backwards compatibility but doesn't do anything
    return;
}


/***/ }),

/***/ "./src/tailwind-reader.ts":
/*!********************************!*\
  !*** ./src/tailwind-reader.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getTailwindConfig = getTailwindConfig;
// Tailwind config reader - reads the actual tailwind.config.ts from the project
function getTailwindConfig() {
    // Return the complete Zeus design system from the actual Tailwind config
    return {
        colors: {
            // Zeus color system - COMPLETE palette from Figma
            zeus: {
                // Surface colors
                "surface-default": "#1e1c17",
                "surface-neutral": "#2e2b24",
                "surface-neutral-subtle": "#3e3a31",
                "surface-warning": "#2e2319",
                "surface-warning-accent": "#fb9704",
                "surface-destructive": "#2e1b19",
                "surface-destructive-accent": "#ea1e04",
                "surface-info": "#1e2228",
                "surface-info-accent": "#397fb2",
                "surface-success": "#1e2821",
                "surface-success-accent": "#21a65e",
                // Text colors (complete set)
                "text-primary": "#ffffff",
                "text-secondary": "#ffffff99", // 60% opacity
                "text-tertiary": "#ffffff75", // 46% opacity
                "text-quaternary": "#ffffff40", // 25% opacity
                "text-inverted": "#1e1c17",
                "text-inverted-secondary": "#1e1c1799", // 60% opacity
                "text-disabled": "#ffffff1a", // 10% opacity
                // Icon colors (complete set)
                "icon-primary": "#ffffff",
                "icon-secondary": "#ffffff99", // 60% opacity
                "icon-tertiary": "#ffffff75", // 46% opacity
                "icon-inverted": "#1e1c17",
                "icon-disabled": "#ffffff1a", // 10% opacity
                // Border colors (complete set)
                "border-normal": "#ffffff2e", // 18% opacity
                "border-alpha": "#ffffff24", // 14% opacity  
                "border-divider": "#ffffff24", // 14% opacity
                "border-neutral-subtle": "#ffffff3d", // 24% opacity
                "border-surface": "#1e1c17",
                "border-focused": "#ffffff4d", // 30% opacity
                "border-disabled": "#ffffff0d", // 5% opacity
                // Button backgrounds (complete set)
                "button-secondary": "#2e2b24",
                "button-tertiary": "#ffffff14", // 8% opacity
                "button-ghost": "#ffffff00", // transparent
                "button-disabled": "#ffffff0d", // 5% opacity
                // Badge/accent backgrounds
                "badge-surface": "#1f2228",
                "badge-neutral": "#2e2b24",
                "badge-warning": "#2e2319",
                "badge-destructive": "#2e1b19",
                "badge-info": "#1e2228",
                "badge-success": "#1e2821",
                // Accent colors (complete set)
                "accent-red": "#d9281c",
                "accent-red-secondary": "#ffffff80",
                "accent-red-accent": "#e6483d",
                "accent-red-subtle": "#2e1b19",
                "accent-orange": "#fb9704",
                "accent-orange-secondary": "#ffffff80",
                "accent-orange-subtle": "#2e2319",
                "accent-yellow": "#fdd835",
                "accent-yellow-secondary": "#ffffff80",
                "accent-yellow-subtle": "#2e2b19",
                "accent-green": "#21a65e",
                "accent-green-secondary": "#ffffff80",
                "accent-green-accent": "#26bd6c",
                "accent-green-subtle": "#1e2821",
                "accent-blue": "#397fb2",
                "accent-blue-secondary": "#ffffff80",
                "accent-blue-accent": "#4778f5",
                "accent-blue-subtle": "#1e2228",
                "accent-purple": "#8b5cf6",
                "accent-purple-secondary": "#ffffff80",
                "accent-purple-subtle": "#251e2e",
                "accent-pink": "#ec4899",
                "accent-pink-secondary": "#ffffff80",
                "accent-pink-subtle": "#2e1e28",
                "accent-gray": "#6b7280",
                "accent-gray-secondary": "#ffffff80",
                "accent-gray-subtle": "#1f2228",
                // Status colors (complete set)
                "status-success": "#339965",
                "status-success-secondary": "#33996599",
                "status-success-subtle": "#1e2821",
                "status-warning": "#f48e2f",
                "status-warning-secondary": "#f48e2f99",
                "status-warning-subtle": "#2e2319",
                "status-destructive": "#e6483d",
                "status-destructive-secondary": "#e6483db2",
                "status-destructive-subtle": "#2e1b19",
                "status-info": "#397fb2",
                "status-info-secondary": "#397fb299",
                "status-info-subtle": "#1e2228",
                // Overlay colors
                "overlay-light": "#ffffff0d", // 5% opacity
                "overlay-medium": "#ffffff1a", // 10% opacity
                "overlay-heavy": "#ffffff40", // 25% opacity
                "overlay-backdrop": "#000000b3", // 70% black
                // Gradient colors
                "gradient-start": "#1e1c17",
                "gradient-middle": "#2e2b24",
                "gradient-end": "#3e3a31",
            },
            // Sedona design system colors from Figma
            sedona: {
                50: "#fef7ed",
                100: "#fdead5",
                200: "#fbd1aa",
                300: "#f7b174",
                400: "#f2883c",
                500: "#de7001", // Primary Sedona orange
                600: "#c25e00",
                700: "#a14800",
                800: "#833b02",
                900: "#6c3108",
                // Design system semantic colors
                primary: "#de7001",
            },
            // Button colors from design tokens  
            'button-secondary': "#14151a",
            'button-tertiary': "rgba(10, 15, 41, 0.04)", // From Figma exactly
            'button-ghost': "transparent",
            // Status colors from design
            success: {
                DEFAULT: "#10b981",
                foreground: "#065f46",
            },
            warning: {
                DEFAULT: "#f59e0b",
                foreground: "#92400e",
            },
            danger: {
                DEFAULT: "#e6483d", // From Figma disconnect button
                foreground: "#991b1b",
            },
            // Semantic colors using CSS variables
            border: "hsl(var(--border))",
            input: "hsl(var(--input))",
            ring: "hsl(var(--ring))",
            background: "hsl(var(--background))",
            foreground: "hsl(var(--foreground))",
            primary: {
                DEFAULT: "hsl(var(--primary))",
                foreground: "hsl(var(--primary-foreground))",
            },
            secondary: {
                DEFAULT: "hsl(var(--secondary))",
                foreground: "hsl(var(--secondary-foreground))",
            },
            destructive: {
                DEFAULT: "hsl(var(--destructive))",
                foreground: "hsl(var(--destructive-foreground))",
            },
            muted: {
                DEFAULT: "hsl(var(--muted))",
                foreground: "hsl(var(--muted-foreground))",
            },
            accent: {
                DEFAULT: "hsl(var(--accent))",
                foreground: "hsl(var(--accent-foreground))",
            },
            popover: {
                DEFAULT: "hsl(var(--popover))",
                foreground: "hsl(var(--popover-foreground))",
            },
            card: {
                DEFAULT: "hsl(var(--card))",
                foreground: "hsl(var(--card-foreground))",
            },
            // Button-specific theme colors
            'button-primary': {
                DEFAULT: "hsl(var(--button-primary-bg))",
                foreground: "hsl(var(--button-primary-text))",
            },
            'button-brand': {
                foreground: "hsl(var(--button-brand-text))",
            },
            'button-danger': {
                foreground: "hsl(var(--button-danger-text))",
            },
        },
        fontSize: {
            // Sedona typography scale
            'caption-s': ['10px', { lineHeight: '14px', letterSpacing: '0' }],
            'caption-m': ['12px', { lineHeight: '16px', letterSpacing: '0' }],
            'caption-l': ['14px', { lineHeight: '20px', letterSpacing: '-0.1px' }],
            'body-s': ['16px', { lineHeight: '24px', letterSpacing: '-0.2px' }],
            'body-m': ['18px', { lineHeight: '26px', letterSpacing: '-0.2px' }],
            'body-l': ['20px', { lineHeight: '28px', letterSpacing: '-0.3px' }],
            'heading-s': ['24px', { lineHeight: '32px', letterSpacing: '-0.4px' }],
            'heading-m': ['32px', { lineHeight: '40px', letterSpacing: '-0.5px' }],
            'heading-l': ['48px', { lineHeight: '56px', letterSpacing: '-0.6px' }],
            'display': ['64px', { lineHeight: '72px', letterSpacing: '-0.8px' }],
        },
        spacing: {
            // Sedona spacing scale from design tokens
            '0': '0',
            '1': '4px',
            '2': '8px',
            '3': '12px',
            '4': '16px',
            '6': '24px',
            '8': '32px',
            '12': '48px',
            '16': '64px',
            '20': '80px',
            '24': '96px',
            '32': '128px',
            '36': '144px',
            '40': '160px',
            '44': '176px',
            '48': '192px',
            '52': '208px',
            '56': '224px',
            '60': '240px',
            '64': '256px',
            '72': '288px',
            '80': '320px',
            '96': '384px',
        },
        borderRadius: {
            none: '0',
            xs: '4px',
            sm: '4px',
            md: '8px',
            lg: '12px',
            xl: '10px', // Sedona button radius
            '2xl': '16px',
            '3xl': '24px',
            full: '999px',
        },
        fontWeight: {
            thin: '100',
            extralight: '200',
            light: '300',
            regular: '400',
            medium: '500',
            semibold: '600',
            bold: '700',
            extrabold: '800',
            black: '900',
        },
        lineHeight: {
            none: '1',
            tight: '1.25',
            snug: '1.375',
            normal: '1.5',
            relaxed: '1.625',
            loose: '2',
        },
        letterSpacing: {
            tighter: '-0.05em',
            tight: '-0.025em',
            normal: '0em',
            wide: '0.025em',
            wider: '0.05em',
            widest: '0.1em',
        }
    };
}


/***/ }),

/***/ "./src/variable-helper.ts":
/*!********************************!*\
  !*** ./src/variable-helper.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports) => {


// Helper functions for variable linking in Figma components
// This approach focuses on what actually works in the Figma Plugin API
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VariableHelper = void 0;
class VariableHelper {
    static async initialize() {
        console.log('🔗 Initializing variable helper...');
        // Find the design tokens collection
        const collections = figma.variables.getLocalVariableCollections();
        this.variableCollection = collections.find(c => c.name.includes('Design Tokens') ||
            c.name.includes('Sedona') ||
            c.name.includes('zeus')) || null;
        if (!this.variableCollection) {
            console.warn('⚠️ No Design Tokens collection found - using fallback colors');
            return;
        }
        console.log(`✅ Found collection: ${this.variableCollection.name}`);
        // Index all variables by name for quick lookup
        const allVars = figma.variables.getLocalVariables()
            .filter(v => v.variableCollectionId === this.variableCollection.id);
        for (const variable of allVars) {
            this.variables.set(variable.name, variable);
        }
        console.log(`📊 Indexed ${this.variables.size} variables`);
    }
    /**
     * Get a variable alias for binding to Figma properties
     * Only use this where Figma API actually supports variable binding
     */
    static getVariableAlias(variableName) {
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
    static getVariableValue(variableName) {
        const variable = this.variables.get(variableName);
        if (!variable)
            return null;
        const modes = variable.valuesByMode;
        const firstModeId = Object.keys(modes)[0];
        const value = modes[firstModeId];
        if (typeof value === 'object' && value !== null && 'r' in value) {
            return value;
        }
        return null;
    }
    /**
     * Create a Paint object that uses variables when possible, fallback colors otherwise
     */
    static createVariablePaint(variableName, fallbackColor) {
        const variableAlias = this.getVariableAlias(variableName);
        if (variableAlias) {
            // For VariableAlias, we need a different Paint structure
            return {
                type: 'SOLID',
                color: fallbackColor, // Fallback color is required
                boundVariables: {
                    color: variableAlias
                }
            };
        }
        else {
            return {
                type: 'SOLID',
                color: fallbackColor
            };
        }
    }
    /**
     * Apply variable binding to component fills where supported
     */
    static applyVariableFill(node, variableName, fallbackColor) {
        if (!('fills' in node))
            return;
        // Set the basic fill first
        node.fills = [{ type: 'SOLID', color: fallbackColor }];
        // Try to bind variable using the proper Figma API
        const variable = this.variables.get(variableName);
        if (variable && 'setBoundVariable' in node) {
            try {
                console.log(`Binding variable ${variableName} to fill`);
                node.setBoundVariable('fills', variable.id);
            }
            catch (error) {
                console.warn(`Could not bind fill variable ${variableName}:`, error);
            }
        }
        else if (variable) {
            console.warn(`Node does not support setBoundVariable for fills`);
        }
    }
    /**
     * Apply variable binding to component strokes where supported
     */
    static applyVariableStroke(node, variableName, fallbackColor) {
        if (!('strokes' in node))
            return;
        // Set the basic stroke first
        node.strokes = [{ type: 'SOLID', color: fallbackColor }];
        // Try to bind variable using the proper Figma API
        const variable = this.variables.get(variableName);
        if (variable && 'setBoundVariable' in node) {
            try {
                console.log(`Binding variable ${variableName} to stroke`);
                node.setBoundVariable('strokes', variable.id);
            }
            catch (error) {
                console.warn(`Could not bind stroke variable ${variableName}:`, error);
            }
        }
        else if (variable) {
            console.warn(`Node does not support setBoundVariable for strokes`);
        }
    }
    /**
     * Check if variables are available
     */
    static hasVariables() {
        return this.variableCollection !== null && this.variables.size > 0;
    }
}
exports.VariableHelper = VariableHelper;
VariableHelper.variableCollection = null;
VariableHelper.variables = new Map();


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!*********************!*\
  !*** ./src/code.ts ***!
  \*********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
// Figma plugin code that runs in the main thread
const tailwind_sync_1 = __webpack_require__(/*! ./sync/tailwind-sync */ "./src/sync/tailwind-sync.ts");
const react_to_figma_simple_1 = __webpack_require__(/*! ./react-to-figma-simple */ "./src/react-to-figma-simple.ts");
const tailwind_reader_1 = __webpack_require__(/*! ./tailwind-reader */ "./src/tailwind-reader.ts");
// Show the plugin UI
figma.showUI(__html__, {
    width: 400,
    height: 600,
    title: 'Sedona Sync'
});
// Handle messages from the UI
figma.ui.onmessage = async (msg) => {
    console.log('Received message:', msg);
    try {
        switch (msg.type) {
            case 'get-tailwind-config':
                // Send the actual Tailwind config to the UI
                const tailwindConfig = (0, tailwind_reader_1.getTailwindConfig)();
                figma.ui.postMessage({
                    type: 'tailwind-config',
                    config: tailwindConfig
                });
                break;
            case 'sync-tokens':
                await syncTokens();
                figma.ui.postMessage({
                    type: 'sync-complete',
                    success: true,
                    message: 'Design tokens synced successfully!'
                });
                break;
            case 'sync-styles':
                await syncStyles();
                figma.ui.postMessage({
                    type: 'sync-complete',
                    success: true,
                    message: 'Text styles created successfully!'
                });
                break;
            case 'sync-components':
                await syncComponents(msg.components);
                figma.ui.postMessage({
                    type: 'sync-complete',
                    success: true,
                    message: 'Components synced successfully!'
                });
                break;
            case 'create-design-system':
                await createDesignSystem(msg.config);
                figma.ui.postMessage({
                    type: 'sync-complete',
                    success: true,
                    message: 'Design system created successfully!'
                });
                break;
            case 'close':
                figma.closePlugin();
                break;
            default:
                console.log('Unknown message type:', msg.type);
        }
    }
    catch (error) {
        console.error('Plugin error:', error);
        figma.ui.postMessage({
            type: 'sync-complete',
            success: false,
            message: `Error: ${error.message}`
        });
    }
};
async function syncTokens() {
    console.log('Syncing design tokens...');
    // Load required fonts first
    await loadRequiredFonts();
    // Create or get the design tokens collection
    let collection = figma.variables.getLocalVariableCollections().find(col => col.name === 'Sedona Design Tokens');
    if (!collection) {
        collection = figma.variables.createVariableCollection('Sedona Design Tokens');
    }
    else {
        // Clear existing variables to avoid duplicates
        console.log('Clearing existing variables to avoid duplicates...');
        const existingVariables = figma.variables.getLocalVariables();
        const collectionVariables = existingVariables.filter(variable => variable.variableCollectionId === collection.id);
        console.log(`Found ${collectionVariables.length} existing variables to remove`);
        collectionVariables.forEach(variable => {
            try {
                variable.remove();
            }
            catch (error) {
                console.warn(`Could not remove variable ${variable.name}:`, error.message);
            }
        });
    }
    // Add modes for light/dark themes
    const modes = collection.modes;
    let lightMode = modes.find(mode => mode.name === 'Light');
    let darkMode = modes.find(mode => mode.name === 'Dark');
    if (!lightMode) {
        lightMode = collection.modes[0];
        collection.renameMode(lightMode.modeId, 'Light');
    }
    if (!darkMode) {
        const newModeId = collection.addMode('Dark');
        darkMode = collection.modes.find(mode => mode.modeId === newModeId);
    }
    // Get Tailwind config and create variables (excluding text styles)
    const tailwindConfig = (0, tailwind_reader_1.getTailwindConfig)();
    await (0, tailwind_sync_1.createVariablesFromTailwindTokensOnly)(collection, tailwindConfig);
    console.log('Design tokens synced successfully');
}
async function syncStyles() {
    console.log('Creating text styles...');
    // Load required fonts first
    await loadRequiredFonts();
    // Find the design tokens collection
    const collection = figma.variables.getLocalVariableCollections().find(col => col.name === 'Sedona Design Tokens');
    if (!collection) {
        throw new Error('Design tokens must be synced first! Please run "Sync Tokens" before creating styles.');
    }
    // Create text styles using the variables
    await (0, tailwind_sync_1.createTextStylesFromVariables)(collection);
    console.log('Text styles created successfully');
}
async function syncComponents(components) {
    console.log('Syncing components...');
    // Use the advanced React to Figma converter
    const converter = new react_to_figma_simple_1.ReactFigmaConverter();
    await converter.createAllComponents();
    console.log('Components synced successfully');
}
async function createDesignSystem(config) {
    console.log('Creating design system...');
    // Load required fonts
    await loadRequiredFonts();
    // First sync tokens
    await syncTokens();
    // Then sync components
    await syncComponents(config.components);
    // Create a cover page
    let coverPage = figma.root.children.find(page => page.name === 'Sedona Design System');
    if (!coverPage) {
        coverPage = figma.createPage();
        coverPage.name = 'Sedona Design System';
        figma.root.insertChild(0, coverPage);
    }
    figma.currentPage = coverPage;
    // Clear existing content
    coverPage.children.forEach(node => node.remove());
    // Create title
    const title = figma.createText();
    title.characters = 'Sedona UI Design System';
    title.fontSize = 48;
    title.fontName = { family: 'Inter', style: 'Bold' };
    title.fills = [{ type: 'SOLID', color: { r: 0.87, g: 0.44, b: 0.01 } }]; // Sedona orange
    title.x = 100;
    title.y = 100;
    // Create description
    const description = figma.createText();
    description.characters = 'Production-ready UI components built with React, Tailwind CSS, and Zeus design system.\nOptimized for AI agent trading platforms.';
    description.fontSize = 16;
    description.fontName = { family: 'Inter', style: 'Regular' };
    description.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 }, opacity: 0.75 }];
    description.resize(600, 50);
    description.x = 100;
    description.y = 180;
    console.log('Design system created successfully');
}
async function loadRequiredFonts() {
    console.log('Loading required fonts...');
    const fontsToLoad = [
        { family: 'Inter', style: 'Regular' },
        { family: 'Inter', style: 'Medium' },
        { family: 'Inter', style: 'Semibold' },
        { family: 'Inter', style: 'Bold' }
    ];
    for (const font of fontsToLoad) {
        try {
            await figma.loadFontAsync(font);
            console.log(`Loaded font: ${font.family} ${font.style}`);
        }
        catch (error) {
            console.warn(`Failed to load font ${font.family} ${font.style}:`, error);
            // Try fallback font
            try {
                await figma.loadFontAsync({ family: 'Roboto', style: font.style });
            }
            catch (fallbackError) {
                console.warn(`Fallback font also failed, using system default`);
            }
        }
    }
}
// Initialize plugin
console.log('Sedona Sync plugin initialized');

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29kZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFhO0FBQ2I7QUFDQSw2Q0FBNkM7QUFDN0M7QUFDQSw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsMkJBQTJCO0FBQzNCO0FBQ0EsOENBQThDLG1CQUFPLENBQUMsd0RBQXVCO0FBQzdFLDBCQUEwQixtQkFBTyxDQUFDLG1EQUFtQjtBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0Msc0JBQXNCO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBLGNBQWMsbUNBQW1DO0FBQ2pELGNBQWMsa0NBQWtDO0FBQ2hELGNBQWMsb0NBQW9DO0FBQ2xELGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUE0QyxhQUFhLEVBQUUsV0FBVztBQUN0RTtBQUNBO0FBQ0Esb0RBQW9ELGFBQWEsRUFBRSxXQUFXO0FBQzlFO0FBQ0E7QUFDQSxvREFBb0Qsa0NBQWtDO0FBQ3RGO0FBQ0E7QUFDQTtBQUNBLG9EQUFvRCxtQ0FBbUM7QUFDdkYscUVBQXFFLFdBQVc7QUFDaEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1EQUFtRCxlQUFlO0FBQ2xFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsZ0NBQWdDO0FBQ2hEO0FBQ0E7QUFDQSxzQ0FBc0MsS0FBSztBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtRkFBbUYsZUFBZTtBQUNsRztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtFQUErRSxTQUFTO0FBQ3hGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1RUFBdUU7QUFDdkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLG1CQUFtQjtBQUN6RDtBQUNBLG1DQUFtQyxnQkFBZ0I7QUFDbkQ7QUFDQSxvQ0FBb0MsaUJBQWlCO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsZ0RBQWdEO0FBQzdFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLDBDQUEwQztBQUNsRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLG9DQUFvQztBQUNqRSwrQkFBK0IsbUNBQW1DO0FBQ2xFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBLCtCQUErQiwwREFBMEQ7QUFDekY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyxtQ0FBbUM7QUFDdEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyx1Q0FBdUM7QUFDeEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsaURBQWlEO0FBQ3hGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQztBQUNwQztBQUNBO0FBQ0Esb0NBQW9DO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixvREFBb0Q7QUFDbkYsMEJBQTBCLHlEQUF5RDtBQUNuRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQztBQUNqQztBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsMkRBQTJEO0FBQ3RGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsdUNBQXVDO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix1REFBdUQ7QUFDL0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsNERBQTREO0FBQ3pGLCtCQUErQiwwREFBMEQ7QUFDekY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix5REFBeUQ7QUFDakY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2Qiw0REFBNEQ7QUFDekY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QjtBQUM5QjtBQUNBO0FBQ0EsNkJBQTZCLGVBQWUsSUFBSSxnQ0FBZ0M7QUFDaEYsd0JBQXdCLHlEQUF5RDtBQUNqRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDO0FBQ2hDLGdDQUFnQztBQUNoQyxnQ0FBZ0M7QUFDaEMsa0NBQWtDO0FBQ2xDLDhCQUE4QjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0M7QUFDbEMsOEJBQThCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDO0FBQ2hDLGdDQUFnQztBQUNoQyw4QkFBOEI7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDO0FBQ2hDLGdDQUFnQztBQUNoQyw4QkFBOEI7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyxvQkFBb0I7QUFDekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtEQUFrRDtBQUNsRDtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsMkJBQTJCO0FBQzVELGlDQUFpQywyQkFBMkI7QUFDNUQsOEJBQThCLGtCQUFrQjtBQUNoRCxnQ0FBZ0Msa0JBQWtCO0FBQ2xELCtCQUErQixrQkFBa0I7QUFDakQsK0JBQStCLGtCQUFrQjtBQUNqRCw0QkFBNEIsMkJBQTJCO0FBQ3ZELCtCQUErQiwyQkFBMkI7QUFDMUQsOEJBQThCLDJCQUEyQjtBQUN6RCw2QkFBNkIseUJBQXlCO0FBQ3RELCtCQUErQiwyQkFBMkI7QUFDMUQsK0JBQStCLDJCQUEyQjtBQUMxRCxtQ0FBbUMsMkJBQTJCO0FBQzlELDRCQUE0QiwyQkFBMkI7QUFDdkQsK0JBQStCO0FBQy9CO0FBQ0EseUNBQXlDO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtEQUFrRDtBQUNsRDtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0Esb0NBQW9DLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRTtBQUM5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkI7Ozs7Ozs7Ozs7O0FDcHFCZDtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxtQ0FBbUM7QUFDbkMsNkNBQTZDO0FBQzdDLHFDQUFxQztBQUNyQyw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQStDLEtBQUs7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0VBQWdFLEtBQUs7QUFDckU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLGdCQUFnQixlQUFlLFVBQVU7QUFDdEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyw2REFBNkQ7QUFDOUYsa0NBQWtDLDhEQUE4RDtBQUNoRyw4QkFBOEIsa0RBQWtEO0FBQ2hGLGdDQUFnQyxzREFBc0Q7QUFDdEYsZ0NBQWdDLHFEQUFxRDtBQUNyRiw4QkFBOEIsa0RBQWtEO0FBQ2hGLCtCQUErQixvREFBb0Q7QUFDbkYsNEJBQTRCLDhDQUE4QztBQUMxRSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJFQUEyRSxlQUFlLHdEQUF3RCxlQUFlO0FBQ2pLO0FBQ0E7QUFDQTtBQUNBLHdEQUF3RCxpRUFBaUU7QUFDekg7QUFDQSwyREFBMkQsNkRBQTZEO0FBQ3hIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNGQUFzRixNQUFNLG1DQUFtQyxNQUFNLHdDQUF3QyxNQUFNO0FBQ25MO0FBQ0E7QUFDQSw0REFBNEQsaUVBQWlFO0FBQzdIO0FBQ0EsK0RBQStELGlFQUFpRTtBQUNoSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkVBQTZFLEtBQUssNkJBQTZCLFNBQVMscUNBQXFDLEtBQUs7QUFDbEs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVLHdHQUF3RztBQUNsSCxVQUFVLDhFQUE4RTtBQUN4RixVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtFQUErRSxLQUFLLDBCQUEwQixLQUFLLHVDQUF1QyxLQUFLO0FBQy9KO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlGQUFpRixLQUFLLDRCQUE0QixPQUFPLHVDQUF1QyxLQUFLO0FBQ3JLO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRFQUE0RSxLQUFLLDhCQUE4QixNQUFNLGtDQUFrQyxLQUFLO0FBQzVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsd0RBQXdEO0FBQ2xFLFVBQVUsb0RBQW9EO0FBQzlELFVBQVUscURBQXFEO0FBQy9ELFVBQVUscURBQXFEO0FBQy9ELFVBQVUsc0RBQXNEO0FBQ2hFLFVBQVUscURBQXFEO0FBQy9ELFVBQVUscURBQXFEO0FBQy9ELFVBQVUscURBQXFEO0FBQy9ELFVBQVUsc0RBQXNEO0FBQ2hFLFVBQVUscURBQXFEO0FBQy9ELFVBQVUscURBQXFEO0FBQy9ELFVBQVUsc0RBQXNEO0FBQ2hFLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVSxxSkFBcUo7QUFDL0osVUFBVSx1SUFBdUk7QUFDakosVUFBVSxrSUFBa0k7QUFDNUksVUFBVSxtSUFBbUk7QUFDN0ksVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyxPQUFPO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVLHVHQUF1RztBQUNqSCxVQUFVLGtIQUFrSDtBQUM1SCxVQUFVLGlIQUFpSDtBQUMzSCxVQUFVLDRIQUE0SDtBQUN0SSxVQUFVLDRHQUE0RztBQUN0SCxVQUFVLGtIQUFrSDtBQUM1SCxVQUFVLHFHQUFxRztBQUMvRyxVQUFVLDZHQUE2RztBQUN2SCxVQUFVLHFHQUFxRztBQUMvRyxVQUFVLDBHQUEwRztBQUNwSCxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtREFBbUQsOENBQThDO0FBQ2pHO0FBQ0Esc0RBQXNELDhDQUE4QztBQUNwRztBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsT0FBTztBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVSw0RkFBNEY7QUFDdEcsVUFBVSw0R0FBNEc7QUFDdEgsVUFBVSxtRkFBbUY7QUFDN0YsVUFBVSxtRkFBbUY7QUFDN0YsVUFBVSw2RUFBNkU7QUFDdkYsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0QsdUNBQXVDO0FBQ3ZGO0FBQ0EsbURBQW1ELHVDQUF1QztBQUMxRjtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsT0FBTztBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsdUJBQXVCO0FBQ25ELG1EQUFtRCxRQUFRLEdBQUcsZUFBZTtBQUM3RTtBQUNBO0FBQ0E7QUFDQSxvREFBb0QsS0FBSztBQUN6RDtBQUNBO0FBQ0EsNkNBQTZDLEtBQUs7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDLG1CQUFtQjtBQUM5RDtBQUNBO0FBQ0EsaURBQWlELFdBQVc7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzREFBc0QsWUFBWTtBQUNsRSxnREFBZ0QsMkJBQTJCLEVBQUUsaUJBQWlCO0FBQzlGLDhDQUE4Qyx5QkFBeUIsRUFBRSxlQUFlO0FBQ3hGLGdEQUFnRCwyQkFBMkIsRUFBRSxpQkFBaUI7QUFDOUYsMkNBQTJDLHNCQUFzQixFQUFFLFlBQVk7QUFDL0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4REFBOEQsV0FBVztBQUN6RTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0QsV0FBVztBQUMzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0M7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtREFBbUQ7QUFDbkQ7QUFDQTtBQUNBLDBDQUEwQztBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DO0FBQ0E7QUFDQSxpREFBaUQsV0FBVztBQUM1RDtBQUNBO0FBQ0E7QUFDQSx5REFBeUQsV0FBVztBQUNwRTtBQUNBO0FBQ0EsMkNBQTJDLGFBQWEsR0FBRyxtQkFBbUI7QUFDOUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MsZUFBZTtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrRUFBa0UsTUFBTTtBQUN4RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQyxjQUFjO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBLG1EQUFtRCxlQUFlLGFBQWEsS0FBSztBQUNwRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdURBQXVELGFBQWE7QUFDcEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDQUErQyxRQUFRLFFBQVEsYUFBYSxNQUFNLGtCQUFrQjtBQUNwRztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscURBQXFELGFBQWE7QUFDbEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLDJDQUEyQyxNQUFNO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsZ0JBQWdCLGVBQWUsVUFBVTtBQUN0RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNudEJhO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FB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QTZCLEdBQUc7QUFDN0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCLDJCQUEyQix3QkFBd0Isa0JBQWtCLGlCQUFpQjtBQUN0RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVSxtQ0FBbUM7QUFDN0MsVUFBVSxrQ0FBa0M7QUFDNUMsVUFBVSxvQ0FBb0M7QUFDOUMsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGFBQWEsRUFBRSxXQUFXO0FBQ2xFO0FBQ0E7QUFDQSxnREFBZ0QsYUFBYSxFQUFFLFdBQVc7QUFDMUU7QUFDQTtBQUNBLDRDQUE0QyxxQ0FBcUM7QUFDakY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2Vkb25hLXN5bmMvLi9zcmMvcmVhY3QtdG8tZmlnbWEtc2ltcGxlLnRzIiwid2VicGFjazovL3NlZG9uYS1zeW5jLy4vc3JjL3N5bmMvdGFpbHdpbmQtc3luYy50cyIsIndlYnBhY2s6Ly9zZWRvbmEtc3luYy8uL3NyYy90YWlsd2luZC1yZWFkZXIudHMiLCJ3ZWJwYWNrOi8vc2Vkb25hLXN5bmMvLi9zcmMvdmFyaWFibGUtaGVscGVyLnRzIiwid2VicGFjazovL3NlZG9uYS1zeW5jL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3NlZG9uYS1zeW5jLy4vc3JjL2NvZGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlJlYWN0RmlnbWFDb252ZXJ0ZXIgPSB2b2lkIDA7XG4vLyBTaW1wbGlmaWVkIFJlYWN0IHRvIEZpZ21hIGNvbXBvbmVudCBjb252ZXJzaW9uXG5jb25zdCBjb21wb25lbnRfZGF0YV9qc29uXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vY29tcG9uZW50LWRhdGEuanNvblwiKSk7XG5jb25zdCB2YXJpYWJsZV9oZWxwZXJfMSA9IHJlcXVpcmUoXCIuL3ZhcmlhYmxlLWhlbHBlclwiKTtcbmNsYXNzIFJlYWN0RmlnbWFDb252ZXJ0ZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnRleHRTdHlsZXMgPSBuZXcgTWFwKCk7XG4gICAgICAgIHRoaXMudGFpbHdpbmRDb25maWcgPSBjb21wb25lbnRfZGF0YV9qc29uXzEuZGVmYXVsdC50YWlsd2luZENvbmZpZztcbiAgICAgICAgdGhpcy5jb21wb25lbnRzID0gY29tcG9uZW50X2RhdGFfanNvbl8xLmRlZmF1bHQuY29tcG9uZW50cztcbiAgICB9XG4gICAgYXN5bmMgY3JlYXRlQWxsQ29tcG9uZW50cygpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ/CfmoAgU3RhcnRpbmcgc2ltcGxpZmllZCBjb21wb25lbnQgY3JlYXRpb24gd2l0aCB2YXJpYWJsZSBsaW5raW5nLi4uJyk7XG4gICAgICAgIC8vIEluaXRpYWxpemUgdmFyaWFibGUgaGVscGVyXG4gICAgICAgIGF3YWl0IHZhcmlhYmxlX2hlbHBlcl8xLlZhcmlhYmxlSGVscGVyLmluaXRpYWxpemUoKTtcbiAgICAgICAgLy8gSW5kZXggdGV4dCBzdHlsZXNcbiAgICAgICAgY29uc3QgYWxsVGV4dFN0eWxlcyA9IGZpZ21hLmdldExvY2FsVGV4dFN0eWxlcygpO1xuICAgICAgICBmb3IgKGNvbnN0IHRleHRTdHlsZSBvZiBhbGxUZXh0U3R5bGVzKSB7XG4gICAgICAgICAgICB0aGlzLnRleHRTdHlsZXMuc2V0KHRleHRTdHlsZS5uYW1lLCB0ZXh0U3R5bGUpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKGDwn5OKIEluZGV4ZWQgJHt0aGlzLnRleHRTdHlsZXMuc2l6ZX0gdGV4dCBzdHlsZXNgKTtcbiAgICAgICAgY29uc29sZS5sb2coJ0xvYWRpbmcgZm9udHMuLi4nKTtcbiAgICAgICAgLy8gTG9hZCBhbGwgcmVxdWlyZWQgZm9udHNcbiAgICAgICAgY29uc3QgZm9udHNUb0xvYWQgPSBbXG4gICAgICAgICAgICB7IGZhbWlseTogJ0ludGVyJywgc3R5bGU6ICdSZWd1bGFyJyB9LFxuICAgICAgICAgICAgeyBmYW1pbHk6ICdJbnRlcicsIHN0eWxlOiAnTWVkaXVtJyB9LFxuICAgICAgICAgICAgeyBmYW1pbHk6ICdJbnRlcicsIHN0eWxlOiAnU2VtaUJvbGQnIH0sXG4gICAgICAgICAgICB7IGZhbWlseTogJ0ludGVyJywgc3R5bGU6ICdCb2xkJyB9XG4gICAgICAgIF07XG4gICAgICAgIGZvciAoY29uc3QgZm9udCBvZiBmb250c1RvTG9hZCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBhd2FpdCBmaWdtYS5sb2FkRm9udEFzeW5jKGZvbnQpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBMb2FkZWQgZm9udDogJHtmb250LmZhbWlseX0gJHtmb250LnN0eWxlfWApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGBGYWlsZWQgdG8gbG9hZCBmb250ICR7Zm9udC5mYW1pbHl9ICR7Zm9udC5zdHlsZX06YCwgZXJyb3IpO1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmb250LnN0eWxlID09PSAnU2VtaUJvbGQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCBmaWdtYS5sb2FkRm9udEFzeW5jKHsgZmFtaWx5OiAnSW50ZXInLCBzdHlsZTogJ01lZGl1bScgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgVXNpbmcgTWVkaXVtIGFzIGZhbGxiYWNrIGZvciBTZW1pQm9sZGApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgZmlnbWEubG9hZEZvbnRBc3luYyh7IGZhbWlseTogJ0ludGVyJywgc3R5bGU6ICdSZWd1bGFyJyB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBVc2luZyBSZWd1bGFyIGFzIGZhbGxiYWNrIGZvciAke2ZvbnQuc3R5bGV9YCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGZhbGxiYWNrRXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGBGYWxsYmFjayBmb250IGFsc28gZmFpbGVkLCB1c2luZyBkZWZhdWx0YCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNvbXBvbmVudFNldHMgPSBbXTtcbiAgICAgICAgLy8gQ3JlYXRlIGEgbWFpbiBjb21wb25lbnRzIHBhZ2VcbiAgICAgICAgbGV0IGNvbXBvbmVudHNQYWdlID0gZmlnbWEucm9vdC5jaGlsZHJlbi5maW5kKHBhZ2UgPT4gcGFnZS5uYW1lID09PSAnU2Vkb25hIENvbXBvbmVudHMnKTtcbiAgICAgICAgaWYgKCFjb21wb25lbnRzUGFnZSkge1xuICAgICAgICAgICAgY29tcG9uZW50c1BhZ2UgPSBmaWdtYS5jcmVhdGVQYWdlKCk7XG4gICAgICAgICAgICBjb21wb25lbnRzUGFnZS5uYW1lID0gJ1NlZG9uYSBDb21wb25lbnRzJztcbiAgICAgICAgfVxuICAgICAgICBmaWdtYS5jdXJyZW50UGFnZSA9IGNvbXBvbmVudHNQYWdlO1xuICAgICAgICAvLyBDbGVhciBleGlzdGluZyBjb250ZW50XG4gICAgICAgIGNvbXBvbmVudHNQYWdlLmNoaWxkcmVuLmZvckVhY2gobm9kZSA9PiBub2RlLnJlbW92ZSgpKTtcbiAgICAgICAgbGV0IHlPZmZzZXQgPSAwO1xuICAgICAgICBjb25zdCBzZWN0aW9uU3BhY2luZyA9IDEyMDtcbiAgICAgICAgZm9yIChjb25zdCBjb21wb25lbnQgb2YgdGhpcy5jb21wb25lbnRzKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgQ3JlYXRpbmcgY29tcG9uZW50IHNldDogJHtjb21wb25lbnQubmFtZX1gKTtcbiAgICAgICAgICAgIGNvbnN0IGNvbXBvbmVudFNldCA9IGF3YWl0IHRoaXMuY3JlYXRlQ29tcG9uZW50U2V0KGNvbXBvbmVudCk7XG4gICAgICAgICAgICBpZiAoY29tcG9uZW50U2V0KSB7XG4gICAgICAgICAgICAgICAgY29tcG9uZW50U2V0LnkgPSB5T2Zmc2V0O1xuICAgICAgICAgICAgICAgIGNvbXBvbmVudFNldC54ID0gMDtcbiAgICAgICAgICAgICAgICB5T2Zmc2V0ICs9IGNvbXBvbmVudFNldC5oZWlnaHQgKyBzZWN0aW9uU3BhY2luZztcbiAgICAgICAgICAgICAgICBjb21wb25lbnRTZXRzLnB1c2goY29tcG9uZW50U2V0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29tcG9uZW50U2V0cztcbiAgICB9XG4gICAgYXN5bmMgY3JlYXRlQ29tcG9uZW50U2V0KGNvbmZpZykge1xuICAgICAgICBjb25zdCB7IG5hbWUsIHZhcmlhbnRzLCBzdGF0ZXMsIHNpemVzIH0gPSBjb25maWc7XG4gICAgICAgIC8vIENyZWF0ZSBjb21wb25lbnQgc2V0XG4gICAgICAgIGNvbnN0IGNvbXBvbmVudFNldCA9IGZpZ21hLmNyZWF0ZUNvbXBvbmVudFNldCA/IGZpZ21hLmNyZWF0ZUNvbXBvbmVudFNldCgpIDogZmlnbWEuY3JlYXRlRnJhbWUoKTtcbiAgICAgICAgY29tcG9uZW50U2V0Lm5hbWUgPSBgU2Vkb25hLyR7bmFtZX1gO1xuICAgICAgICBsZXQgY3JlYXRlZENvbXBvbmVudHMgPSAwO1xuICAgICAgICAvLyBDcmVhdGUgdmFyaWFudHNcbiAgICAgICAgaWYgKHZhcmlhbnRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgdmFyaWFudCBvZiB2YXJpYW50cykge1xuICAgICAgICAgICAgICAgIGlmIChzaXplcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3Qgc2l6ZSBvZiBzaXplcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY29tcG9uZW50ID0gYXdhaXQgdGhpcy5jcmVhdGVTaW5nbGVDb21wb25lbnQobmFtZSwgeyB2YXJpYW50LCBzaXplIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbXBvbmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudFNldC5hcHBlbmRDaGlsZChjb21wb25lbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZWRDb21wb25lbnRzKys7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbXBvbmVudCA9IGF3YWl0IHRoaXMuY3JlYXRlU2luZ2xlQ29tcG9uZW50KG5hbWUsIHsgdmFyaWFudCB9KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbXBvbmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50U2V0LmFwcGVuZENoaWxkKGNvbXBvbmVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVkQ29tcG9uZW50cysrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgY29tcG9uZW50ID0gYXdhaXQgdGhpcy5jcmVhdGVTaW5nbGVDb21wb25lbnQobmFtZSwge30pO1xuICAgICAgICAgICAgaWYgKGNvbXBvbmVudCkge1xuICAgICAgICAgICAgICAgIGNvbXBvbmVudFNldC5hcHBlbmRDaGlsZChjb21wb25lbnQpO1xuICAgICAgICAgICAgICAgIGNyZWF0ZWRDb21wb25lbnRzKys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNyZWF0ZWRDb21wb25lbnRzID09PSAwKSB7XG4gICAgICAgICAgICBjb21wb25lbnRTZXQucmVtb3ZlKCk7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICAvLyBTZXQgdXAgYXV0by1sYXlvdXQgZm9yIGNvbXBvbmVudCBzZXRcbiAgICAgICAgdGhpcy5zZXR1cENvbXBvbmVudFNldExheW91dChjb21wb25lbnRTZXQpO1xuICAgICAgICByZXR1cm4gY29tcG9uZW50U2V0O1xuICAgIH1cbiAgICBhc3luYyBjcmVhdGVTaW5nbGVDb21wb25lbnQoY29tcG9uZW50TmFtZSwgcHJvcGVydGllcykge1xuICAgICAgICBjb25zdCBjb21wb25lbnQgPSBmaWdtYS5jcmVhdGVDb21wb25lbnQoKTtcbiAgICAgICAgLy8gQnVpbGQgY29tcG9uZW50IG5hbWUgd2l0aCBwcm9wZXJ0aWVzXG4gICAgICAgIGNvbnN0IG5hbWVQYXJ0cyA9IFtdO1xuICAgICAgICBpZiAocHJvcGVydGllcy52YXJpYW50KVxuICAgICAgICAgICAgbmFtZVBhcnRzLnB1c2goYHZhcmlhbnQ9JHtwcm9wZXJ0aWVzLnZhcmlhbnR9YCk7XG4gICAgICAgIGlmIChwcm9wZXJ0aWVzLnNpemUpXG4gICAgICAgICAgICBuYW1lUGFydHMucHVzaChgc2l6ZT0ke3Byb3BlcnRpZXMuc2l6ZX1gKTtcbiAgICAgICAgaWYgKHByb3BlcnRpZXMuc3RhdGUpXG4gICAgICAgICAgICBuYW1lUGFydHMucHVzaChgc3RhdGU9JHtwcm9wZXJ0aWVzLnN0YXRlfWApO1xuICAgICAgICBjb21wb25lbnQubmFtZSA9IG5hbWVQYXJ0cy5sZW5ndGggPiAwID8gbmFtZVBhcnRzLmpvaW4oJywgJykgOiAnZGVmYXVsdCc7XG4gICAgICAgIC8vIENyZWF0ZSBjb21wb25lbnQgYmFzZWQgb24gdHlwZVxuICAgICAgICBjb25zdCBjb21wb25lbnRGcmFtZSA9IGF3YWl0IHRoaXMuY3JlYXRlQ29tcG9uZW50RnJhbWUoY29tcG9uZW50TmFtZSwgcHJvcGVydGllcyk7XG4gICAgICAgIGlmICghY29tcG9uZW50RnJhbWUpXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgY29tcG9uZW50LmFwcGVuZENoaWxkKGNvbXBvbmVudEZyYW1lKTtcbiAgICAgICAgLy8gUmVzaXplIGNvbXBvbmVudCB0byBmaXQgY29udGVudFxuICAgICAgICBjb21wb25lbnQucmVzaXplV2l0aG91dENvbnN0cmFpbnRzKGNvbXBvbmVudEZyYW1lLndpZHRoLCBjb21wb25lbnRGcmFtZS5oZWlnaHQpO1xuICAgICAgICByZXR1cm4gY29tcG9uZW50O1xuICAgIH1cbiAgICBhc3luYyBjcmVhdGVDb21wb25lbnRGcmFtZShjb21wb25lbnROYW1lLCBwcm9wZXJ0aWVzKSB7XG4gICAgICAgIGNvbnN0IGxvd2VyTmFtZSA9IGNvbXBvbmVudE5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgc3dpdGNoIChsb3dlck5hbWUpIHtcbiAgICAgICAgICAgIGNhc2UgJ2J1dHRvbic6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlQnV0dG9uRnJhbWUocHJvcGVydGllcyk7XG4gICAgICAgICAgICBjYXNlICdpbnB1dCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlSW5wdXRGcmFtZShwcm9wZXJ0aWVzKTtcbiAgICAgICAgICAgIGNhc2UgJ2NhcmQnOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZUNhcmRGcmFtZShwcm9wZXJ0aWVzKTtcbiAgICAgICAgICAgIGNhc2UgJ2JhZGdlJzpcbiAgICAgICAgICAgIGNhc2UgJ2JhZGdlZ3JvdXAnOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZUJhZGdlRnJhbWUocHJvcGVydGllcyk7XG4gICAgICAgICAgICBjYXNlICdhdmF0YXInOlxuICAgICAgICAgICAgY2FzZSAnYWdlbnRhdmF0YXInOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZUF2YXRhckZyYW1lKHByb3BlcnRpZXMpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVHZW5lcmljRnJhbWUoY29tcG9uZW50TmFtZSwgcHJvcGVydGllcyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY3JlYXRlQnV0dG9uRnJhbWUocHJvcGVydGllcykge1xuICAgICAgICBjb25zdCBmcmFtZSA9IGZpZ21hLmNyZWF0ZUZyYW1lKCk7XG4gICAgICAgIGZyYW1lLm5hbWUgPSAnQnV0dG9uJztcbiAgICAgICAgY29uc3QgdmFyaWFudCA9IHByb3BlcnRpZXMudmFyaWFudCB8fCAnZGVmYXVsdCc7XG4gICAgICAgIGNvbnN0IHNpemUgPSBwcm9wZXJ0aWVzLnNpemUgfHwgJ2RlZmF1bHQnO1xuICAgICAgICBjb25zdCBzdGF0ZSA9IHByb3BlcnRpZXMuc3RhdGU7XG4gICAgICAgIC8vIEdldCBkaW1lbnNpb25zXG4gICAgICAgIGNvbnN0IGRpbWVuc2lvbnMgPSB0aGlzLmdldEJ1dHRvbkRpbWVuc2lvbnMoc2l6ZSk7XG4gICAgICAgIGZyYW1lLnJlc2l6ZShkaW1lbnNpb25zLndpZHRoLCBkaW1lbnNpb25zLmhlaWdodCk7XG4gICAgICAgIC8vIFNldCBiYWNrZ3JvdW5kIHdpdGggdmFyaWFibGUgbGlua2luZyBpZiBhdmFpbGFibGVcbiAgICAgICAgY29uc3QgYmFja2dyb3VuZENvbG9yID0gdGhpcy5nZXRCdXR0b25CYWNrZ3JvdW5kQ29sb3IodmFyaWFudCk7XG4gICAgICAgIGNvbnN0IG9wYWNpdHkgPSBzdGF0ZSA9PT0gJ2Rpc2FibGVkJyA/IDAuNSA6IDE7XG4gICAgICAgIC8vIFRyeSB0byB1c2UgdmFyaWFibGVzIGZvciBzZW1hbnRpYyBjb2xvcnNcbiAgICAgICAgY29uc3QgdmFyaWFibGVOYW1lID0gdGhpcy5nZXRTZW1hbnRpY1ZhcmlhYmxlTmFtZSh2YXJpYW50KTtcbiAgICAgICAgaWYgKHZhcmlhYmxlX2hlbHBlcl8xLlZhcmlhYmxlSGVscGVyLmhhc1ZhcmlhYmxlcygpICYmIHZhcmlhYmxlTmFtZSkge1xuICAgICAgICAgICAgdmFyaWFibGVfaGVscGVyXzEuVmFyaWFibGVIZWxwZXIuYXBwbHlWYXJpYWJsZUZpbGwoZnJhbWUsIHZhcmlhYmxlTmFtZSwgYmFja2dyb3VuZENvbG9yKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGZyYW1lLmZpbGxzID0gW3sgdHlwZTogJ1NPTElEJywgY29sb3I6IGJhY2tncm91bmRDb2xvciwgb3BhY2l0eSB9XTtcbiAgICAgICAgfVxuICAgICAgICBmcmFtZS5jb3JuZXJSYWRpdXMgPSA4O1xuICAgICAgICAvLyBBZGQgdGV4dFxuICAgICAgICBjb25zdCB0ZXh0ID0gZmlnbWEuY3JlYXRlVGV4dCgpO1xuICAgICAgICBjb25zdCB0ZXh0U3R5bGUgPSB0aGlzLnRleHRTdHlsZXMuZ2V0KHRoaXMuZ2V0QnV0dG9uVGV4dFN0eWxlTmFtZShzaXplKSk7XG4gICAgICAgIGlmICh0ZXh0U3R5bGUpIHtcbiAgICAgICAgICAgIHRleHQudGV4dFN0eWxlSWQgPSB0ZXh0U3R5bGUuaWQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0ZXh0LmZvbnROYW1lID0geyBmYW1pbHk6ICdJbnRlcicsIHN0eWxlOiAnTWVkaXVtJyB9O1xuICAgICAgICAgICAgdGV4dC5mb250U2l6ZSA9IHRoaXMuZ2V0QnV0dG9uRm9udFNpemUoc2l6ZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGV4dC5jaGFyYWN0ZXJzID0gdmFyaWFudC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHZhcmlhbnQuc2xpY2UoMSkgKyAnIEJ1dHRvbic7XG4gICAgICAgIC8vIFNldCB0ZXh0IGNvbG9yXG4gICAgICAgIGNvbnN0IHRleHRDb2xvciA9IHRoaXMuZ2V0QnV0dG9uVGV4dENvbG9yKHZhcmlhbnQpO1xuICAgICAgICB0ZXh0LmZpbGxzID0gW3sgdHlwZTogJ1NPTElEJywgY29sb3I6IHRleHRDb2xvciwgb3BhY2l0eSB9XTtcbiAgICAgICAgZnJhbWUuYXBwZW5kQ2hpbGQodGV4dCk7XG4gICAgICAgIC8vIFNldCB1cCBhdXRvLWxheW91dFxuICAgICAgICBmcmFtZS5sYXlvdXRNb2RlID0gJ0hPUklaT05UQUwnO1xuICAgICAgICBmcmFtZS5wcmltYXJ5QXhpc0FsaWduSXRlbXMgPSAnQ0VOVEVSJztcbiAgICAgICAgZnJhbWUuY291bnRlckF4aXNBbGlnbkl0ZW1zID0gJ0NFTlRFUic7XG4gICAgICAgIGZyYW1lLnBhZGRpbmdMZWZ0ID0gZGltZW5zaW9ucy5wYWRkaW5nWDtcbiAgICAgICAgZnJhbWUucGFkZGluZ1JpZ2h0ID0gZGltZW5zaW9ucy5wYWRkaW5nWDtcbiAgICAgICAgZnJhbWUucGFkZGluZ1RvcCA9IGRpbWVuc2lvbnMucGFkZGluZ1k7XG4gICAgICAgIGZyYW1lLnBhZGRpbmdCb3R0b20gPSBkaW1lbnNpb25zLnBhZGRpbmdZO1xuICAgICAgICByZXR1cm4gZnJhbWU7XG4gICAgfVxuICAgIGNyZWF0ZUlucHV0RnJhbWUocHJvcGVydGllcykge1xuICAgICAgICBjb25zdCBmcmFtZSA9IGZpZ21hLmNyZWF0ZUZyYW1lKCk7XG4gICAgICAgIGZyYW1lLm5hbWUgPSAnSW5wdXQnO1xuICAgICAgICBjb25zdCB2YXJpYW50ID0gcHJvcGVydGllcy52YXJpYW50IHx8ICdkZWZhdWx0JztcbiAgICAgICAgY29uc3Qgc2l6ZSA9IHByb3BlcnRpZXMuc2l6ZSB8fCAnZGVmYXVsdCc7XG4gICAgICAgIGNvbnN0IHN0YXRlID0gcHJvcGVydGllcy5zdGF0ZTtcbiAgICAgICAgLy8gR2V0IGRpbWVuc2lvbnMgYmFzZWQgb24gc2l6ZVxuICAgICAgICBjb25zdCBkaW1lbnNpb25zID0gdGhpcy5nZXRJbnB1dERpbWVuc2lvbnMoc2l6ZSk7XG4gICAgICAgIGZyYW1lLnJlc2l6ZShkaW1lbnNpb25zLndpZHRoLCBkaW1lbnNpb25zLmhlaWdodCk7XG4gICAgICAgIGZyYW1lLmNvcm5lclJhZGl1cyA9IDg7XG4gICAgICAgIC8vIFNldCBiYWNrZ3JvdW5kIGFuZCBib3JkZXIgd2l0aCB2YXJpYWJsZXNcbiAgICAgICAgY29uc3Qgc3VyZmFjZUNvbG9yID0gdGhpcy5nZXRaZXVzQ29sb3IoJ3N1cmZhY2UtZGVmYXVsdCcpO1xuICAgICAgICBjb25zdCBib3JkZXJDb2xvciA9IHRoaXMuZ2V0SW5wdXRCb3JkZXJDb2xvcih2YXJpYW50LCBzdGF0ZSk7XG4gICAgICAgIGlmICh2YXJpYWJsZV9oZWxwZXJfMS5WYXJpYWJsZUhlbHBlci5oYXNWYXJpYWJsZXMoKSkge1xuICAgICAgICAgICAgdmFyaWFibGVfaGVscGVyXzEuVmFyaWFibGVIZWxwZXIuYXBwbHlWYXJpYWJsZUZpbGwoZnJhbWUsICdzZW1hbnRpYy9zdXJmYWNlLWRlZmF1bHQnLCBzdXJmYWNlQ29sb3IpO1xuICAgICAgICAgICAgdmFyaWFibGVfaGVscGVyXzEuVmFyaWFibGVIZWxwZXIuYXBwbHlWYXJpYWJsZVN0cm9rZShmcmFtZSwgdGhpcy5nZXRJbnB1dEJvcmRlclZhcmlhYmxlTmFtZSh2YXJpYW50LCBzdGF0ZSksIGJvcmRlckNvbG9yKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGZyYW1lLmZpbGxzID0gW3sgdHlwZTogJ1NPTElEJywgY29sb3I6IHN1cmZhY2VDb2xvciB9XTtcbiAgICAgICAgICAgIGZyYW1lLnN0cm9rZXMgPSBbeyB0eXBlOiAnU09MSUQnLCBjb2xvcjogYm9yZGVyQ29sb3IgfV07XG4gICAgICAgIH1cbiAgICAgICAgZnJhbWUuc3Ryb2tlV2VpZ2h0ID0gMTtcbiAgICAgICAgLy8gQWRkIHBsYWNlaG9sZGVyIHRleHRcbiAgICAgICAgY29uc3QgcGxhY2Vob2xkZXIgPSBmaWdtYS5jcmVhdGVUZXh0KCk7XG4gICAgICAgIGNvbnN0IHRleHRTdHlsZU5hbWUgPSB0aGlzLmdldElucHV0VGV4dFN0eWxlTmFtZShzaXplKTtcbiAgICAgICAgY29uc3QgdGV4dFN0eWxlID0gdGhpcy50ZXh0U3R5bGVzLmdldCh0ZXh0U3R5bGVOYW1lKTtcbiAgICAgICAgaWYgKHRleHRTdHlsZSkge1xuICAgICAgICAgICAgcGxhY2Vob2xkZXIudGV4dFN0eWxlSWQgPSB0ZXh0U3R5bGUuaWQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBwbGFjZWhvbGRlci5mb250TmFtZSA9IHsgZmFtaWx5OiAnSW50ZXInLCBzdHlsZTogJ1JlZ3VsYXInIH07XG4gICAgICAgICAgICBwbGFjZWhvbGRlci5mb250U2l6ZSA9IHRoaXMuZ2V0SW5wdXRGb250U2l6ZShzaXplKTtcbiAgICAgICAgfVxuICAgICAgICBwbGFjZWhvbGRlci5jaGFyYWN0ZXJzID0gdGhpcy5nZXRJbnB1dFBsYWNlaG9sZGVyKHZhcmlhbnQsIHN0YXRlKTtcbiAgICAgICAgcGxhY2Vob2xkZXIuZmlsbHMgPSBbeyB0eXBlOiAnU09MSUQnLCBjb2xvcjogdGhpcy5nZXRaZXVzQ29sb3IoJ3RleHQtdGVydGlhcnknKSB9XTtcbiAgICAgICAgZnJhbWUuYXBwZW5kQ2hpbGQocGxhY2Vob2xkZXIpO1xuICAgICAgICAvLyBBdXRvLWxheW91dFxuICAgICAgICBmcmFtZS5sYXlvdXRNb2RlID0gJ0hPUklaT05UQUwnO1xuICAgICAgICBmcmFtZS5wcmltYXJ5QXhpc0FsaWduSXRlbXMgPSAnQ0VOVEVSJztcbiAgICAgICAgZnJhbWUucGFkZGluZ0xlZnQgPSBkaW1lbnNpb25zLnBhZGRpbmdYO1xuICAgICAgICBmcmFtZS5wYWRkaW5nUmlnaHQgPSBkaW1lbnNpb25zLnBhZGRpbmdYO1xuICAgICAgICByZXR1cm4gZnJhbWU7XG4gICAgfVxuICAgIGNyZWF0ZUNhcmRGcmFtZShwcm9wZXJ0aWVzKSB7XG4gICAgICAgIGNvbnN0IGZyYW1lID0gZmlnbWEuY3JlYXRlRnJhbWUoKTtcbiAgICAgICAgZnJhbWUubmFtZSA9ICdDYXJkJztcbiAgICAgICAgY29uc3QgdmFyaWFudCA9IHByb3BlcnRpZXMudmFyaWFudCB8fCAnZGVmYXVsdCc7XG4gICAgICAgIGNvbnN0IHNpemUgPSBwcm9wZXJ0aWVzLnNpemUgfHwgJ2RlZmF1bHQnO1xuICAgICAgICAvLyBHZXQgZGltZW5zaW9ucyBiYXNlZCBvbiBzaXplXG4gICAgICAgIGNvbnN0IGRpbWVuc2lvbnMgPSB0aGlzLmdldENhcmREaW1lbnNpb25zKHNpemUpO1xuICAgICAgICBmcmFtZS5yZXNpemUoZGltZW5zaW9ucy53aWR0aCwgZGltZW5zaW9ucy5oZWlnaHQpO1xuICAgICAgICBmcmFtZS5jb3JuZXJSYWRpdXMgPSAxMjtcbiAgICAgICAgLy8gU2V0IGJhY2tncm91bmQgYmFzZWQgb24gdmFyaWFudFxuICAgICAgICBjb25zdCBiYWNrZ3JvdW5kQ29sb3IgPSB0aGlzLmdldENhcmRCYWNrZ3JvdW5kQ29sb3IodmFyaWFudCk7XG4gICAgICAgIGNvbnN0IGJvcmRlckNvbG9yID0gdGhpcy5nZXRaZXVzQ29sb3IoJ2JvcmRlci1ub3JtYWwnKTtcbiAgICAgICAgaWYgKHZhcmlhbnQgPT09ICdvdXRsaW5lJykge1xuICAgICAgICAgICAgZnJhbWUuZmlsbHMgPSBbXTtcbiAgICAgICAgICAgIGlmICh2YXJpYWJsZV9oZWxwZXJfMS5WYXJpYWJsZUhlbHBlci5oYXNWYXJpYWJsZXMoKSkge1xuICAgICAgICAgICAgICAgIHZhcmlhYmxlX2hlbHBlcl8xLlZhcmlhYmxlSGVscGVyLmFwcGx5VmFyaWFibGVTdHJva2UoZnJhbWUsICdzZW1hbnRpYy9ib3JkZXItZGVmYXVsdCcsIGJvcmRlckNvbG9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGZyYW1lLnN0cm9rZXMgPSBbeyB0eXBlOiAnU09MSUQnLCBjb2xvcjogYm9yZGVyQ29sb3IgfV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmcmFtZS5zdHJva2VXZWlnaHQgPSAxO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKHZhcmlhYmxlX2hlbHBlcl8xLlZhcmlhYmxlSGVscGVyLmhhc1ZhcmlhYmxlcygpKSB7XG4gICAgICAgICAgICAgICAgdmFyaWFibGVfaGVscGVyXzEuVmFyaWFibGVIZWxwZXIuYXBwbHlWYXJpYWJsZUZpbGwoZnJhbWUsIHRoaXMuZ2V0Q2FyZEJhY2tncm91bmRWYXJpYWJsZU5hbWUodmFyaWFudCksIGJhY2tncm91bmRDb2xvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBmcmFtZS5maWxscyA9IFt7IHR5cGU6ICdTT0xJRCcsIGNvbG9yOiBiYWNrZ3JvdW5kQ29sb3IgfV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBBZGQgc3VidGxlIGJvcmRlciBmb3IgZWxldmF0ZWQgY2FyZHNcbiAgICAgICAgICAgIGlmICh2YXJpYW50ID09PSAnZWxldmF0ZWQnKSB7XG4gICAgICAgICAgICAgICAgaWYgKHZhcmlhYmxlX2hlbHBlcl8xLlZhcmlhYmxlSGVscGVyLmhhc1ZhcmlhYmxlcygpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhcmlhYmxlX2hlbHBlcl8xLlZhcmlhYmxlSGVscGVyLmFwcGx5VmFyaWFibGVTdHJva2UoZnJhbWUsICdzZW1hbnRpYy9ib3JkZXItZGVmYXVsdCcsIGJvcmRlckNvbG9yKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGZyYW1lLnN0cm9rZXMgPSBbeyB0eXBlOiAnU09MSUQnLCBjb2xvcjogYm9yZGVyQ29sb3IsIG9wYWNpdHk6IDAuMSB9XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZnJhbWUuc3Ryb2tlV2VpZ2h0ID0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBBZGQgaGVhZGVyXG4gICAgICAgIGNvbnN0IGhlYWRlciA9IGZpZ21hLmNyZWF0ZVRleHQoKTtcbiAgICAgICAgY29uc3QgaGVhZGVyU3R5bGUgPSB0aGlzLnRleHRTdHlsZXMuZ2V0KCdCb2R5L01lZGl1bScpO1xuICAgICAgICBpZiAoaGVhZGVyU3R5bGUpIHtcbiAgICAgICAgICAgIGhlYWRlci50ZXh0U3R5bGVJZCA9IGhlYWRlclN0eWxlLmlkO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBoZWFkZXIuZm9udE5hbWUgPSB7IGZhbWlseTogJ0ludGVyJywgc3R5bGU6ICdTZW1pQm9sZCcgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChfYSkge1xuICAgICAgICAgICAgICAgIGhlYWRlci5mb250TmFtZSA9IHsgZmFtaWx5OiAnSW50ZXInLCBzdHlsZTogJ01lZGl1bScgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGhlYWRlci5mb250U2l6ZSA9IDE4O1xuICAgICAgICB9XG4gICAgICAgIGhlYWRlci5jaGFyYWN0ZXJzID0gYCR7dmFyaWFudC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHZhcmlhbnQuc2xpY2UoMSl9IENhcmRgO1xuICAgICAgICBoZWFkZXIuZmlsbHMgPSBbeyB0eXBlOiAnU09MSUQnLCBjb2xvcjogdGhpcy5nZXRaZXVzQ29sb3IoJ3RleHQtcHJpbWFyeScpIH1dO1xuICAgICAgICAvLyBBZGQgY29udGVudFxuICAgICAgICBjb25zdCBjb250ZW50ID0gZmlnbWEuY3JlYXRlVGV4dCgpO1xuICAgICAgICBjb25zdCBjb250ZW50U3R5bGUgPSB0aGlzLnRleHRTdHlsZXMuZ2V0KCdCb2R5L1NtYWxsJyk7XG4gICAgICAgIGlmIChjb250ZW50U3R5bGUpIHtcbiAgICAgICAgICAgIGNvbnRlbnQudGV4dFN0eWxlSWQgPSBjb250ZW50U3R5bGUuaWQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb250ZW50LmZvbnROYW1lID0geyBmYW1pbHk6ICdJbnRlcicsIHN0eWxlOiAnUmVndWxhcicgfTtcbiAgICAgICAgICAgIGNvbnRlbnQuZm9udFNpemUgPSAxNDtcbiAgICAgICAgfVxuICAgICAgICBjb250ZW50LmNoYXJhY3RlcnMgPSAnQ2FyZCBjb250ZW50IGdvZXMgaGVyZS4gVGhpcyBpcyBhIGRlc2NyaXB0aW9uIG9yIGJvZHkgdGV4dC4nO1xuICAgICAgICBjb250ZW50LmZpbGxzID0gW3sgdHlwZTogJ1NPTElEJywgY29sb3I6IHRoaXMuZ2V0WmV1c0NvbG9yKCd0ZXh0LXNlY29uZGFyeScpIH1dO1xuICAgICAgICBjb250ZW50LnJlc2l6ZShkaW1lbnNpb25zLndpZHRoIC0gMzIsIDQwKTtcbiAgICAgICAgZnJhbWUuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcbiAgICAgICAgZnJhbWUuYXBwZW5kQ2hpbGQoY29udGVudCk7XG4gICAgICAgIC8vIEF1dG8tbGF5b3V0XG4gICAgICAgIGZyYW1lLmxheW91dE1vZGUgPSAnVkVSVElDQUwnO1xuICAgICAgICBmcmFtZS5wcmltYXJ5QXhpc1NpemluZ01vZGUgPSAnQVVUTyc7XG4gICAgICAgIGZyYW1lLml0ZW1TcGFjaW5nID0gODtcbiAgICAgICAgZnJhbWUucGFkZGluZ1RvcCA9IDE2O1xuICAgICAgICBmcmFtZS5wYWRkaW5nQm90dG9tID0gMTY7XG4gICAgICAgIGZyYW1lLnBhZGRpbmdMZWZ0ID0gMTY7XG4gICAgICAgIGZyYW1lLnBhZGRpbmdSaWdodCA9IDE2O1xuICAgICAgICByZXR1cm4gZnJhbWU7XG4gICAgfVxuICAgIGNyZWF0ZUJhZGdlRnJhbWUocHJvcGVydGllcykge1xuICAgICAgICBjb25zdCBmcmFtZSA9IGZpZ21hLmNyZWF0ZUZyYW1lKCk7XG4gICAgICAgIGZyYW1lLm5hbWUgPSAnQmFkZ2UnO1xuICAgICAgICBjb25zdCB2YXJpYW50ID0gcHJvcGVydGllcy52YXJpYW50IHx8ICdkZWZhdWx0JztcbiAgICAgICAgY29uc3Qgc2l6ZSA9IHByb3BlcnRpZXMuc2l6ZSB8fCAnZGVmYXVsdCc7XG4gICAgICAgIGNvbnN0IGJhZGdlSGVpZ2h0ID0gc2l6ZSA9PT0gJ3NtJyA/IDIwIDogc2l6ZSA9PT0gJ2xnJyA/IDMyIDogMjQ7XG4gICAgICAgIGZyYW1lLnJlc2l6ZSg4MCwgYmFkZ2VIZWlnaHQpO1xuICAgICAgICBmcmFtZS5jb3JuZXJSYWRpdXMgPSBiYWRnZUhlaWdodCAvIDI7XG4gICAgICAgIC8vIFNldCBiYWNrZ3JvdW5kXG4gICAgICAgIGNvbnN0IGJhY2tncm91bmRDb2xvciA9IHRoaXMuZ2V0QmFkZ2VCYWNrZ3JvdW5kQ29sb3IodmFyaWFudCk7XG4gICAgICAgIGZyYW1lLmZpbGxzID0gW3sgdHlwZTogJ1NPTElEJywgY29sb3I6IGJhY2tncm91bmRDb2xvciB9XTtcbiAgICAgICAgLy8gQWRkIHRleHRcbiAgICAgICAgY29uc3QgdGV4dCA9IGZpZ21hLmNyZWF0ZVRleHQoKTtcbiAgICAgICAgY29uc3QgdGV4dFN0eWxlID0gdGhpcy50ZXh0U3R5bGVzLmdldCh0aGlzLmdldEJhZGdlVGV4dFN0eWxlTmFtZShzaXplKSk7XG4gICAgICAgIGlmICh0ZXh0U3R5bGUpIHtcbiAgICAgICAgICAgIHRleHQudGV4dFN0eWxlSWQgPSB0ZXh0U3R5bGUuaWQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0ZXh0LmZvbnROYW1lID0geyBmYW1pbHk6ICdJbnRlcicsIHN0eWxlOiAnTWVkaXVtJyB9O1xuICAgICAgICAgICAgdGV4dC5mb250U2l6ZSA9IHNpemUgPT09ICdzbScgPyAxMCA6IHNpemUgPT09ICdsZycgPyAxNCA6IDEyO1xuICAgICAgICB9XG4gICAgICAgIHRleHQuY2hhcmFjdGVycyA9IHZhcmlhbnQudG9VcHBlckNhc2UoKTtcbiAgICAgICAgdGV4dC5maWxscyA9IFt7IHR5cGU6ICdTT0xJRCcsIGNvbG9yOiB0aGlzLmdldEJhZGdlVGV4dENvbG9yKHZhcmlhbnQpIH1dO1xuICAgICAgICBmcmFtZS5hcHBlbmRDaGlsZCh0ZXh0KTtcbiAgICAgICAgLy8gQXV0by1sYXlvdXRcbiAgICAgICAgZnJhbWUubGF5b3V0TW9kZSA9ICdIT1JJWk9OVEFMJztcbiAgICAgICAgZnJhbWUucHJpbWFyeUF4aXNBbGlnbkl0ZW1zID0gJ0NFTlRFUic7XG4gICAgICAgIGZyYW1lLmNvdW50ZXJBeGlzQWxpZ25JdGVtcyA9ICdDRU5URVInO1xuICAgICAgICBmcmFtZS5wcmltYXJ5QXhpc1NpemluZ01vZGUgPSAnQVVUTyc7XG4gICAgICAgIGZyYW1lLnBhZGRpbmdMZWZ0ID0gMTI7XG4gICAgICAgIGZyYW1lLnBhZGRpbmdSaWdodCA9IDEyO1xuICAgICAgICByZXR1cm4gZnJhbWU7XG4gICAgfVxuICAgIGNyZWF0ZUF2YXRhckZyYW1lKHByb3BlcnRpZXMpIHtcbiAgICAgICAgY29uc3QgZnJhbWUgPSBmaWdtYS5jcmVhdGVGcmFtZSgpO1xuICAgICAgICBmcmFtZS5uYW1lID0gJ0F2YXRhcic7XG4gICAgICAgIGNvbnN0IHNpemUgPSB0aGlzLmdldEF2YXRhclNpemUocHJvcGVydGllcy5zaXplIHx8ICdtZCcpO1xuICAgICAgICBmcmFtZS5yZXNpemUoc2l6ZSwgc2l6ZSk7XG4gICAgICAgIGZyYW1lLmNvcm5lclJhZGl1cyA9IHNpemUgLyAyO1xuICAgICAgICAvLyBTZXQgYmFja2dyb3VuZCBhbmQgYm9yZGVyXG4gICAgICAgIGlmICh2YXJpYWJsZV9oZWxwZXJfMS5WYXJpYWJsZUhlbHBlci5oYXNWYXJpYWJsZXMoKSkge1xuICAgICAgICAgICAgdmFyaWFibGVfaGVscGVyXzEuVmFyaWFibGVIZWxwZXIuYXBwbHlWYXJpYWJsZUZpbGwoZnJhbWUsICdzZW1hbnRpYy9zdXJmYWNlLWVsZXZhdGVkJywgdGhpcy5nZXRaZXVzQ29sb3IoJ3N1cmZhY2UtbmV1dHJhbCcpKTtcbiAgICAgICAgICAgIHZhcmlhYmxlX2hlbHBlcl8xLlZhcmlhYmxlSGVscGVyLmFwcGx5VmFyaWFibGVTdHJva2UoZnJhbWUsICdzZW1hbnRpYy9ib3JkZXItZGVmYXVsdCcsIHRoaXMuZ2V0WmV1c0NvbG9yKCdib3JkZXItbm9ybWFsJykpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZnJhbWUuZmlsbHMgPSBbeyB0eXBlOiAnU09MSUQnLCBjb2xvcjogdGhpcy5nZXRaZXVzQ29sb3IoJ3N1cmZhY2UtbmV1dHJhbCcpIH1dO1xuICAgICAgICAgICAgZnJhbWUuc3Ryb2tlcyA9IFt7IHR5cGU6ICdTT0xJRCcsIGNvbG9yOiB0aGlzLmdldFpldXNDb2xvcignYm9yZGVyLW5vcm1hbCcpIH1dO1xuICAgICAgICB9XG4gICAgICAgIGZyYW1lLnN0cm9rZVdlaWdodCA9IDE7XG4gICAgICAgIC8vIEFkZCBpbml0aWFsc1xuICAgICAgICBjb25zdCB0ZXh0ID0gZmlnbWEuY3JlYXRlVGV4dCgpO1xuICAgICAgICBjb25zdCB0ZXh0U3R5bGUgPSB0aGlzLnRleHRTdHlsZXMuZ2V0KHRoaXMuZ2V0QXZhdGFyVGV4dFN0eWxlTmFtZShwcm9wZXJ0aWVzLnNpemUgfHwgJ21kJykpO1xuICAgICAgICBpZiAodGV4dFN0eWxlKSB7XG4gICAgICAgICAgICB0ZXh0LnRleHRTdHlsZUlkID0gdGV4dFN0eWxlLmlkO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGV4dC5mb250TmFtZSA9IHsgZmFtaWx5OiAnSW50ZXInLCBzdHlsZTogJ01lZGl1bScgfTtcbiAgICAgICAgICAgIHRleHQuZm9udFNpemUgPSBzaXplICogMC40O1xuICAgICAgICB9XG4gICAgICAgIHRleHQuY2hhcmFjdGVycyA9ICdTVSc7XG4gICAgICAgIHRleHQuZmlsbHMgPSBbeyB0eXBlOiAnU09MSUQnLCBjb2xvcjogdGhpcy5nZXRaZXVzQ29sb3IoJ3RleHQtcHJpbWFyeScpIH1dO1xuICAgICAgICBmcmFtZS5hcHBlbmRDaGlsZCh0ZXh0KTtcbiAgICAgICAgLy8gQXV0by1sYXlvdXRcbiAgICAgICAgZnJhbWUubGF5b3V0TW9kZSA9ICdIT1JJWk9OVEFMJztcbiAgICAgICAgZnJhbWUucHJpbWFyeUF4aXNBbGlnbkl0ZW1zID0gJ0NFTlRFUic7XG4gICAgICAgIGZyYW1lLmNvdW50ZXJBeGlzQWxpZ25JdGVtcyA9ICdDRU5URVInO1xuICAgICAgICByZXR1cm4gZnJhbWU7XG4gICAgfVxuICAgIGNyZWF0ZUdlbmVyaWNGcmFtZShjb21wb25lbnROYW1lLCBwcm9wZXJ0aWVzKSB7XG4gICAgICAgIGNvbnN0IGZyYW1lID0gZmlnbWEuY3JlYXRlRnJhbWUoKTtcbiAgICAgICAgZnJhbWUubmFtZSA9IGNvbXBvbmVudE5hbWU7XG4gICAgICAgIGZyYW1lLnJlc2l6ZSgyMDAsIDYwKTtcbiAgICAgICAgZnJhbWUuY29ybmVyUmFkaXVzID0gODtcbiAgICAgICAgLy8gU2V0IGJhY2tncm91bmRcbiAgICAgICAgaWYgKHZhcmlhYmxlX2hlbHBlcl8xLlZhcmlhYmxlSGVscGVyLmhhc1ZhcmlhYmxlcygpKSB7XG4gICAgICAgICAgICB2YXJpYWJsZV9oZWxwZXJfMS5WYXJpYWJsZUhlbHBlci5hcHBseVZhcmlhYmxlRmlsbChmcmFtZSwgJ3NlbWFudGljL3N1cmZhY2UtZWxldmF0ZWQnLCB0aGlzLmdldFpldXNDb2xvcignc3VyZmFjZS1uZXV0cmFsJykpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZnJhbWUuZmlsbHMgPSBbeyB0eXBlOiAnU09MSUQnLCBjb2xvcjogdGhpcy5nZXRaZXVzQ29sb3IoJ3N1cmZhY2UtbmV1dHJhbCcpIH1dO1xuICAgICAgICB9XG4gICAgICAgIC8vIEFkZCB0ZXh0XG4gICAgICAgIGNvbnN0IHRleHQgPSBmaWdtYS5jcmVhdGVUZXh0KCk7XG4gICAgICAgIGNvbnN0IHRleHRTdHlsZSA9IHRoaXMudGV4dFN0eWxlcy5nZXQoJ0NhcHRpb24vTGFyZ2UnKTtcbiAgICAgICAgaWYgKHRleHRTdHlsZSkge1xuICAgICAgICAgICAgdGV4dC50ZXh0U3R5bGVJZCA9IHRleHRTdHlsZS5pZDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRleHQuZm9udE5hbWUgPSB7IGZhbWlseTogJ0ludGVyJywgc3R5bGU6ICdNZWRpdW0nIH07XG4gICAgICAgICAgICB0ZXh0LmZvbnRTaXplID0gMTQ7XG4gICAgICAgIH1cbiAgICAgICAgdGV4dC5jaGFyYWN0ZXJzID0gYCR7Y29tcG9uZW50TmFtZX0gLSAke3Byb3BlcnRpZXMudmFyaWFudCB8fCAnZGVmYXVsdCd9YDtcbiAgICAgICAgdGV4dC5maWxscyA9IFt7IHR5cGU6ICdTT0xJRCcsIGNvbG9yOiB0aGlzLmdldFpldXNDb2xvcigndGV4dC1wcmltYXJ5JykgfV07XG4gICAgICAgIGZyYW1lLmFwcGVuZENoaWxkKHRleHQpO1xuICAgICAgICAvLyBBdXRvLWxheW91dFxuICAgICAgICBmcmFtZS5sYXlvdXRNb2RlID0gJ0hPUklaT05UQUwnO1xuICAgICAgICBmcmFtZS5wcmltYXJ5QXhpc0FsaWduSXRlbXMgPSAnQ0VOVEVSJztcbiAgICAgICAgZnJhbWUuY291bnRlckF4aXNBbGlnbkl0ZW1zID0gJ0NFTlRFUic7XG4gICAgICAgIGZyYW1lLnBhZGRpbmdMZWZ0ID0gMTY7XG4gICAgICAgIGZyYW1lLnBhZGRpbmdSaWdodCA9IDE2O1xuICAgICAgICBmcmFtZS5wYWRkaW5nVG9wID0gODtcbiAgICAgICAgZnJhbWUucGFkZGluZ0JvdHRvbSA9IDg7XG4gICAgICAgIHJldHVybiBmcmFtZTtcbiAgICB9XG4gICAgLy8gSGVscGVyIG1ldGhvZHNcbiAgICBnZXRCdXR0b25EaW1lbnNpb25zKHNpemUpIHtcbiAgICAgICAgc3dpdGNoIChzaXplKSB7XG4gICAgICAgICAgICBjYXNlICd4cyc6IHJldHVybiB7IHdpZHRoOiA2MCwgaGVpZ2h0OiAyOCwgcGFkZGluZ1g6IDgsIHBhZGRpbmdZOiA0IH07XG4gICAgICAgICAgICBjYXNlICdzbSc6IHJldHVybiB7IHdpZHRoOiA4MCwgaGVpZ2h0OiAzMiwgcGFkZGluZ1g6IDEyLCBwYWRkaW5nWTogNiB9O1xuICAgICAgICAgICAgY2FzZSAnbGcnOiByZXR1cm4geyB3aWR0aDogMTQwLCBoZWlnaHQ6IDQ4LCBwYWRkaW5nWDogMjAsIHBhZGRpbmdZOiAxMiB9O1xuICAgICAgICAgICAgY2FzZSAnaWNvbic6IHJldHVybiB7IHdpZHRoOiAzMiwgaGVpZ2h0OiAzMiwgcGFkZGluZ1g6IDgsIHBhZGRpbmdZOiA4IH07XG4gICAgICAgICAgICBkZWZhdWx0OiByZXR1cm4geyB3aWR0aDogMTIwLCBoZWlnaHQ6IDQwLCBwYWRkaW5nWDogMTYsIHBhZGRpbmdZOiA4IH07XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0QnV0dG9uRm9udFNpemUoc2l6ZSkge1xuICAgICAgICBzd2l0Y2ggKHNpemUpIHtcbiAgICAgICAgICAgIGNhc2UgJ3hzJzogcmV0dXJuIDEwO1xuICAgICAgICAgICAgY2FzZSAnc20nOiByZXR1cm4gMTI7XG4gICAgICAgICAgICBjYXNlICdsZyc6IHJldHVybiAxNjtcbiAgICAgICAgICAgIGNhc2UgJ2ljb24nOiByZXR1cm4gMTI7XG4gICAgICAgICAgICBkZWZhdWx0OiByZXR1cm4gMTQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0QnV0dG9uQmFja2dyb3VuZENvbG9yKHZhcmlhbnQpIHtcbiAgICAgICAgc3dpdGNoICh2YXJpYW50KSB7XG4gICAgICAgICAgICBjYXNlICdicmFuZCc6IHJldHVybiB0aGlzLmdldFNlZG9uYUNvbG9yKDUwMCk7XG4gICAgICAgICAgICBjYXNlICdzZWNvbmRhcnknOiByZXR1cm4gdGhpcy5nZXRaZXVzQ29sb3IoJ3N1cmZhY2UtbmV1dHJhbCcpO1xuICAgICAgICAgICAgY2FzZSAnZGVzdHJ1Y3RpdmUnOlxuICAgICAgICAgICAgY2FzZSAncmlzayc6IHJldHVybiB0aGlzLmdldFpldXNDb2xvcignYWNjZW50LXJlZCcpO1xuICAgICAgICAgICAgY2FzZSAnc2FmZSc6IHJldHVybiB0aGlzLmdldFpldXNDb2xvcignYWNjZW50LWdyZWVuJyk7XG4gICAgICAgICAgICBjYXNlICdjbG9zZSc6IHJldHVybiB0aGlzLmdldFpldXNDb2xvcignYWNjZW50LW9yYW5nZScpO1xuICAgICAgICAgICAgY2FzZSAnb3V0bGluZSc6XG4gICAgICAgICAgICBjYXNlICdnaG9zdCc6XG4gICAgICAgICAgICBjYXNlICdsaW5rJzogcmV0dXJuIHsgcjogMCwgZzogMCwgYjogMCB9O1xuICAgICAgICAgICAgZGVmYXVsdDogcmV0dXJuIHsgcjogMC4yLCBnOiAwLjIsIGI6IDAuMiB9O1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldEJ1dHRvblRleHRDb2xvcih2YXJpYW50KSB7XG4gICAgICAgIHN3aXRjaCAodmFyaWFudCkge1xuICAgICAgICAgICAgY2FzZSAnb3V0bGluZSc6XG4gICAgICAgICAgICBjYXNlICdnaG9zdCc6IHJldHVybiB0aGlzLmdldFpldXNDb2xvcigndGV4dC1wcmltYXJ5Jyk7XG4gICAgICAgICAgICBjYXNlICdsaW5rJzogcmV0dXJuIHRoaXMuZ2V0U2Vkb25hQ29sb3IoNTAwKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6IHJldHVybiB7IHI6IDEsIGc6IDEsIGI6IDEgfTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXRCYWRnZUJhY2tncm91bmRDb2xvcih2YXJpYW50KSB7XG4gICAgICAgIHN3aXRjaCAodmFyaWFudCkge1xuICAgICAgICAgICAgY2FzZSAnc3VjY2Vzcyc6XG4gICAgICAgICAgICBjYXNlICdzYWZlJzogcmV0dXJuIHRoaXMuZ2V0WmV1c0NvbG9yKCdiYWRnZS1zdWNjZXNzJyk7XG4gICAgICAgICAgICBjYXNlICd3YXJuaW5nJzpcbiAgICAgICAgICAgIGNhc2UgJ2Nsb3NlJzogcmV0dXJuIHRoaXMuZ2V0WmV1c0NvbG9yKCdiYWRnZS13YXJuaW5nJyk7XG4gICAgICAgICAgICBjYXNlICdkYW5nZXInOlxuICAgICAgICAgICAgY2FzZSAnZGVzdHJ1Y3RpdmUnOlxuICAgICAgICAgICAgY2FzZSAncmlzayc6IHJldHVybiB0aGlzLmdldFpldXNDb2xvcignYmFkZ2UtZGVzdHJ1Y3RpdmUnKTtcbiAgICAgICAgICAgIGNhc2UgJ2luZm8nOiByZXR1cm4gdGhpcy5nZXRaZXVzQ29sb3IoJ2JhZGdlLWluZm8nKTtcbiAgICAgICAgICAgIGNhc2UgJ2JyYW5kJzogcmV0dXJuIHRoaXMuZ2V0WmV1c0NvbG9yKCdiYWRnZS1uZXV0cmFsJyk7XG4gICAgICAgICAgICBjYXNlICdvdXRsaW5lJzogcmV0dXJuIHsgcjogMCwgZzogMCwgYjogMCB9O1xuICAgICAgICAgICAgZGVmYXVsdDogcmV0dXJuIHRoaXMuZ2V0WmV1c0NvbG9yKCdiYWRnZS1uZXV0cmFsJyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0QmFkZ2VUZXh0Q29sb3IodmFyaWFudCkge1xuICAgICAgICBzd2l0Y2ggKHZhcmlhbnQpIHtcbiAgICAgICAgICAgIGNhc2UgJ3N1Y2Nlc3MnOlxuICAgICAgICAgICAgY2FzZSAnc2FmZSc6IHJldHVybiB0aGlzLmdldFpldXNDb2xvcignYWNjZW50LWdyZWVuJyk7XG4gICAgICAgICAgICBjYXNlICd3YXJuaW5nJzpcbiAgICAgICAgICAgIGNhc2UgJ2Nsb3NlJzogcmV0dXJuIHRoaXMuZ2V0WmV1c0NvbG9yKCdhY2NlbnQtb3JhbmdlJyk7XG4gICAgICAgICAgICBjYXNlICdkYW5nZXInOlxuICAgICAgICAgICAgY2FzZSAnZGVzdHJ1Y3RpdmUnOlxuICAgICAgICAgICAgY2FzZSAncmlzayc6IHJldHVybiB0aGlzLmdldFpldXNDb2xvcignYWNjZW50LXJlZCcpO1xuICAgICAgICAgICAgY2FzZSAnaW5mbyc6IHJldHVybiB0aGlzLmdldFpldXNDb2xvcignYWNjZW50LWJsdWUnKTtcbiAgICAgICAgICAgIGNhc2UgJ2JyYW5kJzogcmV0dXJuIHRoaXMuZ2V0U2Vkb25hQ29sb3IoNTAwKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6IHJldHVybiB0aGlzLmdldFpldXNDb2xvcigndGV4dC1wcmltYXJ5Jyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0U2VtYW50aWNWYXJpYWJsZU5hbWUodmFyaWFudCkge1xuICAgICAgICBzd2l0Y2ggKHZhcmlhbnQpIHtcbiAgICAgICAgICAgIGNhc2UgJ2JyYW5kJzogcmV0dXJuICdicmFuZC9wcmltYXJ5JztcbiAgICAgICAgICAgIGNhc2UgJ3NlY29uZGFyeSc6IHJldHVybiAnc2VtYW50aWMvc3VyZmFjZS1lbGV2YXRlZCc7XG4gICAgICAgICAgICBjYXNlICdkZXN0cnVjdGl2ZSc6XG4gICAgICAgICAgICBjYXNlICdyaXNrJzogcmV0dXJuICdzZW1hbnRpYy9lcnJvcic7XG4gICAgICAgICAgICBjYXNlICdzYWZlJzogcmV0dXJuICdzZW1hbnRpYy9zdWNjZXNzJztcbiAgICAgICAgICAgIGNhc2UgJ2Nsb3NlJzogcmV0dXJuICdzZW1hbnRpYy93YXJuaW5nJztcbiAgICAgICAgICAgIGRlZmF1bHQ6IHJldHVybiAnc2VtYW50aWMvc3VyZmFjZS1lbGV2YXRlZCc7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0QnV0dG9uVGV4dFN0eWxlTmFtZShzaXplKSB7XG4gICAgICAgIHN3aXRjaCAoc2l6ZSkge1xuICAgICAgICAgICAgY2FzZSAneHMnOiByZXR1cm4gJ0NhcHRpb24vU21hbGwnO1xuICAgICAgICAgICAgY2FzZSAnc20nOiByZXR1cm4gJ0NhcHRpb24vTWVkaXVtJztcbiAgICAgICAgICAgIGNhc2UgJ2xnJzogcmV0dXJuICdCb2R5L01lZGl1bSc7XG4gICAgICAgICAgICBkZWZhdWx0OiByZXR1cm4gJ0NhcHRpb24vTGFyZ2UnO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldEJhZGdlVGV4dFN0eWxlTmFtZShzaXplKSB7XG4gICAgICAgIHN3aXRjaCAoc2l6ZSkge1xuICAgICAgICAgICAgY2FzZSAnc20nOiByZXR1cm4gJ0NhcHRpb24vU21hbGwnO1xuICAgICAgICAgICAgY2FzZSAnbGcnOiByZXR1cm4gJ0NhcHRpb24vTGFyZ2UnO1xuICAgICAgICAgICAgZGVmYXVsdDogcmV0dXJuICdDYXB0aW9uL01lZGl1bSc7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0QXZhdGFyVGV4dFN0eWxlTmFtZShzaXplKSB7XG4gICAgICAgIHN3aXRjaCAoc2l6ZSkge1xuICAgICAgICAgICAgY2FzZSAnc20nOiByZXR1cm4gJ0NhcHRpb24vU21hbGwnO1xuICAgICAgICAgICAgY2FzZSAnbGcnOiByZXR1cm4gJ0JvZHkvU21hbGwnO1xuICAgICAgICAgICAgY2FzZSAneGwnOiByZXR1cm4gJ0JvZHkvTWVkaXVtJztcbiAgICAgICAgICAgIGRlZmF1bHQ6IHJldHVybiAnQ2FwdGlvbi9MYXJnZSc7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0QXZhdGFyU2l6ZShzaXplKSB7XG4gICAgICAgIHN3aXRjaCAoc2l6ZSkge1xuICAgICAgICAgICAgY2FzZSAnc20nOiByZXR1cm4gMzI7XG4gICAgICAgICAgICBjYXNlICdsZyc6IHJldHVybiA1NjtcbiAgICAgICAgICAgIGNhc2UgJ3hsJzogcmV0dXJuIDcyO1xuICAgICAgICAgICAgZGVmYXVsdDogcmV0dXJuIDQwO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldElucHV0RGltZW5zaW9ucyhzaXplKSB7XG4gICAgICAgIHN3aXRjaCAoc2l6ZSkge1xuICAgICAgICAgICAgY2FzZSAnc20nOiByZXR1cm4geyB3aWR0aDogMjAwLCBoZWlnaHQ6IDM2LCBwYWRkaW5nWDogMTAgfTtcbiAgICAgICAgICAgIGNhc2UgJ2xnJzogcmV0dXJuIHsgd2lkdGg6IDMwMCwgaGVpZ2h0OiA1MiwgcGFkZGluZ1g6IDE2IH07XG4gICAgICAgICAgICBkZWZhdWx0OiByZXR1cm4geyB3aWR0aDogMjQwLCBoZWlnaHQ6IDQ0LCBwYWRkaW5nWDogMTIgfTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXRJbnB1dEZvbnRTaXplKHNpemUpIHtcbiAgICAgICAgc3dpdGNoIChzaXplKSB7XG4gICAgICAgICAgICBjYXNlICdzbSc6IHJldHVybiAxMjtcbiAgICAgICAgICAgIGNhc2UgJ2xnJzogcmV0dXJuIDE2O1xuICAgICAgICAgICAgZGVmYXVsdDogcmV0dXJuIDE0O1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldElucHV0VGV4dFN0eWxlTmFtZShzaXplKSB7XG4gICAgICAgIHN3aXRjaCAoc2l6ZSkge1xuICAgICAgICAgICAgY2FzZSAnc20nOiByZXR1cm4gJ0NhcHRpb24vTWVkaXVtJztcbiAgICAgICAgICAgIGNhc2UgJ2xnJzogcmV0dXJuICdCb2R5L01lZGl1bSc7XG4gICAgICAgICAgICBkZWZhdWx0OiByZXR1cm4gJ0JvZHkvU21hbGwnO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldElucHV0Qm9yZGVyVmFyaWFibGVOYW1lKHZhcmlhbnQsIHN0YXRlKSB7XG4gICAgICAgIGlmICh2YXJpYW50ID09PSAnZXJyb3InKVxuICAgICAgICAgICAgcmV0dXJuICdzZW1hbnRpYy9lcnJvcic7XG4gICAgICAgIGlmICh2YXJpYW50ID09PSAnc3VjY2VzcycpXG4gICAgICAgICAgICByZXR1cm4gJ3NlbWFudGljL3N1Y2Nlc3MnO1xuICAgICAgICBpZiAoc3RhdGUgPT09ICdmb2N1c2VkJylcbiAgICAgICAgICAgIHJldHVybiAnYnJhbmQvcHJpbWFyeSc7XG4gICAgICAgIHJldHVybiAnc2VtYW50aWMvYm9yZGVyLWRlZmF1bHQnO1xuICAgIH1cbiAgICBnZXRDYXJkRGltZW5zaW9ucyhzaXplKSB7XG4gICAgICAgIHN3aXRjaCAoc2l6ZSkge1xuICAgICAgICAgICAgY2FzZSAnc20nOiByZXR1cm4geyB3aWR0aDogMjQwLCBoZWlnaHQ6IDE2MCB9O1xuICAgICAgICAgICAgY2FzZSAnbGcnOiByZXR1cm4geyB3aWR0aDogNDAwLCBoZWlnaHQ6IDI4MCB9O1xuICAgICAgICAgICAgZGVmYXVsdDogcmV0dXJuIHsgd2lkdGg6IDMwMCwgaGVpZ2h0OiAyMDAgfTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXRDYXJkQmFja2dyb3VuZENvbG9yKHZhcmlhbnQpIHtcbiAgICAgICAgc3dpdGNoICh2YXJpYW50KSB7XG4gICAgICAgICAgICBjYXNlICdlbGV2YXRlZCc6IHJldHVybiB0aGlzLmdldFpldXNDb2xvcignc3VyZmFjZS1uZXV0cmFsLXN1YnRsZScpO1xuICAgICAgICAgICAgY2FzZSAnb3V0bGluZSc6IHJldHVybiB7IHI6IDAsIGc6IDAsIGI6IDAgfTsgLy8gVHJhbnNwYXJlbnRcbiAgICAgICAgICAgIGRlZmF1bHQ6IHJldHVybiB0aGlzLmdldFpldXNDb2xvcignc3VyZmFjZS1uZXV0cmFsJyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0Q2FyZEJhY2tncm91bmRWYXJpYWJsZU5hbWUodmFyaWFudCkge1xuICAgICAgICBzd2l0Y2ggKHZhcmlhbnQpIHtcbiAgICAgICAgICAgIGNhc2UgJ2VsZXZhdGVkJzogcmV0dXJuICdzZW1hbnRpYy9zdXJmYWNlLWVsZXZhdGVkJztcbiAgICAgICAgICAgIGNhc2UgJ291dGxpbmUnOiByZXR1cm4gJ3NlbWFudGljL3N1cmZhY2UtZGVmYXVsdCc7XG4gICAgICAgICAgICBkZWZhdWx0OiByZXR1cm4gJ3NlbWFudGljL3N1cmZhY2UtZGVmYXVsdCc7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0SW5wdXRCb3JkZXJDb2xvcih2YXJpYW50LCBzdGF0ZSkge1xuICAgICAgICBpZiAodmFyaWFudCA9PT0gJ2Vycm9yJylcbiAgICAgICAgICAgIHJldHVybiB7IHI6IDAuOSwgZzogMC4yOCwgYjogMC4yNCB9O1xuICAgICAgICBpZiAodmFyaWFudCA9PT0gJ3N1Y2Nlc3MnKVxuICAgICAgICAgICAgcmV0dXJuIHsgcjogMC4xMywgZzogMC42NSwgYjogMC4zNyB9O1xuICAgICAgICBpZiAoc3RhdGUgPT09ICdmb2N1c2VkJylcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFNlZG9uYUNvbG9yKDUwMCk7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFpldXNDb2xvcignYm9yZGVyLW5vcm1hbCcpO1xuICAgIH1cbiAgICBnZXRJbnB1dFBsYWNlaG9sZGVyKHZhcmlhbnQsIHN0YXRlKSB7XG4gICAgICAgIGlmIChzdGF0ZSA9PT0gJ2Rpc2FibGVkJylcbiAgICAgICAgICAgIHJldHVybiAnRGlzYWJsZWQgaW5wdXQnO1xuICAgICAgICBpZiAodmFyaWFudCA9PT0gJ2Vycm9yJylcbiAgICAgICAgICAgIHJldHVybiAnRXJyb3Igc3RhdGUnO1xuICAgICAgICBpZiAodmFyaWFudCA9PT0gJ3N1Y2Nlc3MnKVxuICAgICAgICAgICAgcmV0dXJuICdTdWNjZXNzIHN0YXRlJztcbiAgICAgICAgcmV0dXJuICdQbGFjZWhvbGRlciB0ZXh0JztcbiAgICB9XG4gICAgZ2V0WmV1c0NvbG9yKGNvbG9yTmFtZSkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGNvbnN0IHpldXNDb2xvcnMgPSAoKF9hID0gdGhpcy50YWlsd2luZENvbmZpZy5jb2xvcnMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS56ZXVzKSB8fCB7fTtcbiAgICAgICAgY29uc3QgY29sb3JWYWx1ZSA9IHpldXNDb2xvcnNbY29sb3JOYW1lXTtcbiAgICAgICAgaWYgKGNvbG9yVmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmhleFRvUmdiKGNvbG9yVmFsdWUpIHx8IHsgcjogMSwgZzogMSwgYjogMSB9O1xuICAgICAgICB9XG4gICAgICAgIC8vIEZhbGxiYWNrIGNvbG9yc1xuICAgICAgICBjb25zdCBmYWxsYmFja3MgPSB7XG4gICAgICAgICAgICAnc3VyZmFjZS1kZWZhdWx0JzogeyByOiAwLjEyLCBnOiAwLjExLCBiOiAwLjA5IH0sXG4gICAgICAgICAgICAnc3VyZmFjZS1uZXV0cmFsJzogeyByOiAwLjE4LCBnOiAwLjE3LCBiOiAwLjE0IH0sXG4gICAgICAgICAgICAndGV4dC1wcmltYXJ5JzogeyByOiAxLCBnOiAxLCBiOiAxIH0sXG4gICAgICAgICAgICAndGV4dC1zZWNvbmRhcnknOiB7IHI6IDEsIGc6IDEsIGI6IDEgfSxcbiAgICAgICAgICAgICd0ZXh0LXRlcnRpYXJ5JzogeyByOiAxLCBnOiAxLCBiOiAxIH0sXG4gICAgICAgICAgICAnYm9yZGVyLW5vcm1hbCc6IHsgcjogMSwgZzogMSwgYjogMSB9LFxuICAgICAgICAgICAgJ2FjY2VudC1yZWQnOiB7IHI6IDAuODUsIGc6IDAuMTYsIGI6IDAuMTEgfSxcbiAgICAgICAgICAgICdhY2NlbnQtb3JhbmdlJzogeyByOiAwLjk4LCBnOiAwLjU5LCBiOiAwLjAyIH0sXG4gICAgICAgICAgICAnYWNjZW50LWdyZWVuJzogeyByOiAwLjEzLCBnOiAwLjY1LCBiOiAwLjM3IH0sXG4gICAgICAgICAgICAnYWNjZW50LWJsdWUnOiB7IHI6IDAuMjIsIGc6IDAuNSwgYjogMC43IH0sXG4gICAgICAgICAgICAnYmFkZ2Utc3VjY2Vzcyc6IHsgcjogMC4xMiwgZzogMC4xNiwgYjogMC4xMyB9LFxuICAgICAgICAgICAgJ2JhZGdlLXdhcm5pbmcnOiB7IHI6IDAuMTgsIGc6IDAuMTQsIGI6IDAuMTAgfSxcbiAgICAgICAgICAgICdiYWRnZS1kZXN0cnVjdGl2ZSc6IHsgcjogMC4xOCwgZzogMC4xMSwgYjogMC4xMCB9LFxuICAgICAgICAgICAgJ2JhZGdlLWluZm8nOiB7IHI6IDAuMTIsIGc6IDAuMTMsIGI6IDAuMTYgfSxcbiAgICAgICAgICAgICdiYWRnZS1uZXV0cmFsJzogeyByOiAwLjE4LCBnOiAwLjE3LCBiOiAwLjE0IH1cbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGZhbGxiYWNrc1tjb2xvck5hbWVdIHx8IHsgcjogMC41LCBnOiAwLjUsIGI6IDAuNSB9O1xuICAgIH1cbiAgICBnZXRTZWRvbmFDb2xvcihzaGFkZSkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGNvbnN0IHNlZG9uYUNvbG9ycyA9ICgoX2EgPSB0aGlzLnRhaWx3aW5kQ29uZmlnLmNvbG9ycykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnNlZG9uYSkgfHwge307XG4gICAgICAgIGNvbnN0IGNvbG9yVmFsdWUgPSBzZWRvbmFDb2xvcnNbc2hhZGUudG9TdHJpbmcoKV07XG4gICAgICAgIGlmIChjb2xvclZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5oZXhUb1JnYihjb2xvclZhbHVlKSB8fCB7IHI6IDAuODcsIGc6IDAuNDQsIGI6IDAuMDEgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyByOiAwLjg3LCBnOiAwLjQ0LCBiOiAwLjAxIH07XG4gICAgfVxuICAgIGhleFRvUmdiKGhleCkge1xuICAgICAgICBjb25zdCByZXN1bHQgPSAvXiM/KFthLWZcXGRdezJ9KShbYS1mXFxkXXsyfSkoW2EtZlxcZF17Mn0pJC9pLmV4ZWMoaGV4KTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdCA/IHtcbiAgICAgICAgICAgIHI6IHBhcnNlSW50KHJlc3VsdFsxXSwgMTYpIC8gMjU1LFxuICAgICAgICAgICAgZzogcGFyc2VJbnQocmVzdWx0WzJdLCAxNikgLyAyNTUsXG4gICAgICAgICAgICBiOiBwYXJzZUludChyZXN1bHRbM10sIDE2KSAvIDI1NVxuICAgICAgICB9IDogbnVsbDtcbiAgICB9XG4gICAgc2V0dXBDb21wb25lbnRTZXRMYXlvdXQoY29tcG9uZW50U2V0KSB7XG4gICAgICAgIGNvbXBvbmVudFNldC5sYXlvdXRNb2RlID0gJ0hPUklaT05UQUwnO1xuICAgICAgICBjb21wb25lbnRTZXQucHJpbWFyeUF4aXNTaXppbmdNb2RlID0gJ0FVVE8nO1xuICAgICAgICBjb21wb25lbnRTZXQuY291bnRlckF4aXNTaXppbmdNb2RlID0gJ0FVVE8nO1xuICAgICAgICBjb21wb25lbnRTZXQuaXRlbVNwYWNpbmcgPSAyNDtcbiAgICAgICAgY29tcG9uZW50U2V0LnBhZGRpbmdUb3AgPSAzMjtcbiAgICAgICAgY29tcG9uZW50U2V0LnBhZGRpbmdCb3R0b20gPSAzMjtcbiAgICAgICAgY29tcG9uZW50U2V0LnBhZGRpbmdMZWZ0ID0gMzI7XG4gICAgICAgIGNvbXBvbmVudFNldC5wYWRkaW5nUmlnaHQgPSAzMjtcbiAgICAgICAgLy8gV3JhcCB0byBtdWx0aXBsZSByb3dzIGlmIHRvbyBtYW55IHZhcmlhbnRzXG4gICAgICAgIGNvbnN0IGNoaWxkcmVuID0gY29tcG9uZW50U2V0LmNoaWxkcmVuO1xuICAgICAgICBpZiAoY2hpbGRyZW4ubGVuZ3RoID4gNikge1xuICAgICAgICAgICAgY29tcG9uZW50U2V0LmxheW91dE1vZGUgPSAnVkVSVElDQUwnO1xuICAgICAgICAgICAgY29tcG9uZW50U2V0Lml0ZW1TcGFjaW5nID0gMTY7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLlJlYWN0RmlnbWFDb252ZXJ0ZXIgPSBSZWFjdEZpZ21hQ29udmVydGVyO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmNyZWF0ZVZhcmlhYmxlc0Zyb21UYWlsd2luZCA9IGNyZWF0ZVZhcmlhYmxlc0Zyb21UYWlsd2luZDtcbmV4cG9ydHMuY3JlYXRlVmFyaWFibGVzRnJvbVRhaWx3aW5kVG9rZW5zT25seSA9IGNyZWF0ZVZhcmlhYmxlc0Zyb21UYWlsd2luZFRva2Vuc09ubHk7XG5leHBvcnRzLmNyZWF0ZVRleHRTdHlsZXNGcm9tVmFyaWFibGVzID0gY3JlYXRlVGV4dFN0eWxlc0Zyb21WYXJpYWJsZXM7XG5leHBvcnRzLnN5bmNDb21wb25lbnRzVG9GaWdtYSA9IHN5bmNDb21wb25lbnRzVG9GaWdtYTtcbmZ1bmN0aW9uIGlzVmFsaWRDb2xvclZhbHVlKHZhbHVlKSB7XG4gICAgaWYgKCF2YWx1ZSB8fCB0eXBlb2YgdmFsdWUgIT09ICdzdHJpbmcnKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuIHZhbHVlLnN0YXJ0c1dpdGgoJyMnKSB8fFxuICAgICAgICB2YWx1ZS5zdGFydHNXaXRoKCdyZ2InKSB8fFxuICAgICAgICB2YWx1ZS5zdGFydHNXaXRoKCdoc2wnKSB8fFxuICAgICAgICB2YWx1ZSA9PT0gJ3RyYW5zcGFyZW50JyB8fFxuICAgICAgICB2YWx1ZSA9PT0gJ2N1cnJlbnRDb2xvcicgfHxcbiAgICAgICAgdmFsdWUgPT09ICdpbmhlcml0JyB8fFxuICAgICAgICAvXlxcdyskLy50ZXN0KHZhbHVlKTsgLy8gTmFtZWQgY29sb3JzXG59XG4vLyBWYWxpZGF0ZSBhbmQgc2FuaXRpemUgRmlnbWEgdmFyaWFibGUgbmFtZXNcbmZ1bmN0aW9uIHNhbml0aXplVmFyaWFibGVOYW1lKG5hbWUpIHtcbiAgICBpZiAoIW5hbWUgfHwgdHlwZW9mIG5hbWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihgSW52YWxpZCB2YXJpYWJsZSBuYW1lOiAke25hbWV9YCk7XG4gICAgICAgIHJldHVybiAndW5uYW1lZC12YXJpYWJsZSc7XG4gICAgfVxuICAgIC8vIFJlbW92ZSBhbnkgY2hhcmFjdGVycyB0aGF0IG1pZ2h0IGJlIHByb2JsZW1hdGljXG4gICAgLy8gRmlnbWEgYWxsb3dzOiBsZXR0ZXJzLCBudW1iZXJzLCBoeXBoZW5zLCB1bmRlcnNjb3JlcywgZm9yd2FyZCBzbGFzaGVzLCBzcGFjZXNcbiAgICAvLyBCdXQgbGV0J3MgYmUgY29uc2VydmF0aXZlIGFuZCBzdGljayB0byBhbHBoYW51bWVyaWMsIGh5cGhlbnMsIHVuZGVyc2NvcmVzLCBhbmQgZm9yd2FyZCBzbGFzaGVzXG4gICAgbGV0IHNhbml0aXplZCA9IG5hbWUucmVwbGFjZSgvW15hLXpBLVowLTlcXC1fXFwvXFxzXS9nLCAnJyk7XG4gICAgLy8gRW5zdXJlIGl0IGRvZXNuJ3Qgc3RhcnQgd2l0aCBhIG51bWJlclxuICAgIGlmICgvXlxcZC8udGVzdChzYW5pdGl6ZWQpKSB7XG4gICAgICAgIHNhbml0aXplZCA9ICd2YXItJyArIHNhbml0aXplZDtcbiAgICB9XG4gICAgLy8gRW5zdXJlIGl0J3Mgbm90IGVtcHR5XG4gICAgaWYgKCFzYW5pdGl6ZWQudHJpbSgpKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihgRW1wdHkgdmFyaWFibGUgbmFtZSBhZnRlciBzYW5pdGl6YXRpb246ICR7bmFtZX1gKTtcbiAgICAgICAgcmV0dXJuICd1bm5hbWVkLXZhcmlhYmxlJztcbiAgICB9XG4gICAgcmV0dXJuIHNhbml0aXplZC50cmltKCk7XG59XG4vLyBDbGVhbiBEZXNpZ24gU3lzdGVtIFZhcmlhYmxlcyAtIFNpbXBsZSBhbmQgTG9naWNhbCBTdHJ1Y3R1cmVcbmFzeW5jIGZ1bmN0aW9uIGNyZWF0ZVZhcmlhYmxlc0Zyb21UYWlsd2luZChjb2xsZWN0aW9uLCB0YWlsd2luZENvbmZpZykge1xuICAgIGNvbnNvbGUubG9nKCfwn46oIFN0YXJ0aW5nIENMRUFOIERlc2lnbiBTeXN0ZW0gc3luYy4uLicpO1xuICAgIGNvbnNvbGUubG9nKCfwn5OLIFNpbXBsZSBzdHJ1Y3R1cmU6IEZvdW5kYXRpb24g4oaSIFNlbWFudGljIOKGkiBCcmFuZCcpO1xuICAgIGNvbnN0IHRvdGFsU3RhcnQgPSBEYXRlLm5vdygpO1xuICAgIGxldCB0b3RhbFZhcmlhYmxlcyA9IDA7XG4gICAgY29uc3QgbW9kZXMgPSBjb2xsZWN0aW9uLm1vZGVzO1xuICAgIGNvbnN0IGxpZ2h0TW9kZUlkID0gbW9kZXNbMF0ubW9kZUlkO1xuICAgIGNvbnN0IGRhcmtNb2RlSWQgPSBtb2Rlcy5sZW5ndGggPiAxID8gbW9kZXNbMV0ubW9kZUlkIDogbGlnaHRNb2RlSWQ7XG4gICAgLy8gUk9PVCBMRVZFTCBHUk9VUFNcbiAgICBjb25zb2xlLmxvZygn8J+Pl++4jyBDcmVhdGluZyBGb3VuZGF0aW9uIChCYXNlIFZhbHVlcyknKTtcbiAgICB0b3RhbFZhcmlhYmxlcyArPSBhd2FpdCBjcmVhdGVGb3VuZGF0aW9uKGNvbGxlY3Rpb24sIHRhaWx3aW5kQ29uZmlnLCBsaWdodE1vZGVJZCwgZGFya01vZGVJZCk7XG4gICAgY29uc29sZS5sb2coJ/Cfjq8gQ3JlYXRpbmcgU2VtYW50aWMgKFB1cnBvc2UtYmFzZWQpJyk7XG4gICAgdG90YWxWYXJpYWJsZXMgKz0gYXdhaXQgY3JlYXRlU2VtYW50aWMoY29sbGVjdGlvbiwgbGlnaHRNb2RlSWQsIGRhcmtNb2RlSWQpO1xuICAgIGNvbnNvbGUubG9nKCfwn4+iIENyZWF0aW5nIEJyYW5kIChTZWRvbmEgSWRlbnRpdHkpJyk7XG4gICAgdG90YWxWYXJpYWJsZXMgKz0gYXdhaXQgY3JlYXRlQnJhbmQoY29sbGVjdGlvbiwgbGlnaHRNb2RlSWQsIGRhcmtNb2RlSWQpO1xuICAgIGNvbnNvbGUubG9nKCfwn46oIENyZWF0aW5nIFRleHQgU3R5bGVzJyk7XG4gICAgYXdhaXQgY3JlYXRlVGV4dFN0eWxlcyhjb2xsZWN0aW9uKTtcbiAgICBjb25zdCB0b3RhbFRpbWUgPSBEYXRlLm5vdygpIC0gdG90YWxTdGFydDtcbiAgICBjb25zb2xlLmxvZygn8J+OiSBDTEVBTiBEZXNpZ24gU3lzdGVtIHN5bmMgY29tcGxldGUhJyk7XG4gICAgY29uc29sZS5sb2coYPCfk4ogVG90YWw6ICR7dG90YWxWYXJpYWJsZXN9IHZhcmlhYmxlcyBpbiAke3RvdGFsVGltZX1tc2ApO1xuICAgIGNvbnNvbGUubG9nKCfwn5OdIFRleHQgc3R5bGVzIGNyZWF0ZWQgdXNpbmcgdmFyaWFibGUgcmVmZXJlbmNlcycpO1xufVxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBDTEVBTiBERVNJR04gU1lTVEVNIEZVTkNUSU9OU1xuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5hc3luYyBmdW5jdGlvbiBjcmVhdGVGb3VuZGF0aW9uKGNvbGxlY3Rpb24sIGNvbmZpZywgbGlnaHRNb2RlSWQsIGRhcmtNb2RlSWQpIHtcbiAgICBsZXQgY291bnQgPSAwO1xuICAgIC8vIENPTE9SIC0gRm91bmRhdGlvbiBjb2xvcnMgKG9ubHkgdGhlIGVzc2VudGlhbCBiYXNlIGNvbG9ycyB3ZSBuZWVkKVxuICAgIGlmIChjb25maWcuY29sb3JzICYmIGNvbmZpZy5jb2xvcnMuemV1cykge1xuICAgICAgICAvLyBNYXAgWmV1cyBjb2xvcnMgdG8gY2xlYW4gZm91bmRhdGlvbiBuYW1lc1xuICAgICAgICBjb25zdCBmb3VuZGF0aW9uQ29sb3JNYXAgPSB7XG4gICAgICAgICAgICAnc3VyZmFjZS1kZWZhdWx0JzogeyB6ZXVzOiAnc3VyZmFjZS1kZWZhdWx0JywgZGVzYzogJ0RlZmF1bHQgc3VyZmFjZSBiYWNrZ3JvdW5kJyB9LFxuICAgICAgICAgICAgJ3N1cmZhY2UtZWxldmF0ZWQnOiB7IHpldXM6ICdzdXJmYWNlLW5ldXRyYWwnLCBkZXNjOiAnRWxldmF0ZWQgc3VyZmFjZSBiYWNrZ3JvdW5kJyB9LFxuICAgICAgICAgICAgJ3RleHQtcHJpbWFyeSc6IHsgemV1czogJ3RleHQtcHJpbWFyeScsIGRlc2M6ICdQcmltYXJ5IHRleHQgY29sb3InIH0sXG4gICAgICAgICAgICAndGV4dC1zZWNvbmRhcnknOiB7IHpldXM6ICd0ZXh0LXNlY29uZGFyeScsIGRlc2M6ICdTZWNvbmRhcnkgdGV4dCBjb2xvcicgfSxcbiAgICAgICAgICAgICdib3JkZXItZGVmYXVsdCc6IHsgemV1czogJ2JvcmRlci1ub3JtYWwnLCBkZXNjOiAnRGVmYXVsdCBib3JkZXIgY29sb3InIH0sXG4gICAgICAgICAgICAnYWNjZW50LWdyZWVuJzogeyB6ZXVzOiAnYWNjZW50LWdyZWVuJywgZGVzYzogJ0dyZWVuIGFjY2VudCBjb2xvcicgfSxcbiAgICAgICAgICAgICdhY2NlbnQtb3JhbmdlJzogeyB6ZXVzOiAnYWNjZW50LW9yYW5nZScsIGRlc2M6ICdPcmFuZ2UgYWNjZW50IGNvbG9yJyB9LFxuICAgICAgICAgICAgJ2FjY2VudC1yZWQnOiB7IHpldXM6ICdhY2NlbnQtcmVkJywgZGVzYzogJ1JlZCBhY2NlbnQgY29sb3InIH0sXG4gICAgICAgICAgICAnYWNjZW50LWJsdWUnOiB7IHpldXM6ICdhY2NlbnQtYmx1ZScsIGRlc2M6ICdCbHVlIGFjY2VudCBjb2xvcicgfVxuICAgICAgICB9O1xuICAgICAgICBmb3IgKGNvbnN0IFtmb3VuZGF0aW9uTmFtZSwgbWFwcGluZ10gb2YgT2JqZWN0LmVudHJpZXMoZm91bmRhdGlvbkNvbG9yTWFwKSkge1xuICAgICAgICAgICAgY29uc3QgemV1c1ZhbHVlID0gY29uZmlnLmNvbG9ycy56ZXVzW21hcHBpbmcuemV1c107XG4gICAgICAgICAgICBpZiAoIXpldXNWYWx1ZSB8fCAhaXNWYWxpZENvbG9yVmFsdWUoemV1c1ZhbHVlKSlcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIGNvbnN0IHZhcmlhYmxlID0gY3JlYXRlVmFyaWFibGVXaXRoQ29uZmlnKGNvbGxlY3Rpb24sIGBjb2xvci8ke2ZvdW5kYXRpb25OYW1lfWAsICdDT0xPUicsIG1hcHBpbmcuZGVzYywgZ2V0SW50ZWxsaWdlbnRTY29wZXMoYGNvbG9yLyR7Zm91bmRhdGlvbk5hbWV9YCwgJ0NPTE9SJykpO1xuICAgICAgICAgICAgY29uc3QgbGlnaHRSZ2IgPSBwYXJzZUNvbG9yVG9SZ2IoemV1c1ZhbHVlKTtcbiAgICAgICAgICAgIGNvbnN0IGRhcmtSZ2IgPSBnZW5lcmF0ZURhcmtNb2RlQ29sb3IobGlnaHRSZ2IsIGZvdW5kYXRpb25OYW1lKTtcbiAgICAgICAgICAgIGlmIChsaWdodFJnYikge1xuICAgICAgICAgICAgICAgIHZhcmlhYmxlLnNldFZhbHVlRm9yTW9kZShsaWdodE1vZGVJZCwgeyByOiBsaWdodFJnYi5yLCBnOiBsaWdodFJnYi5nLCBiOiBsaWdodFJnYi5iLCBhOiBsaWdodFJnYi5hIHx8IDEgfSk7XG4gICAgICAgICAgICAgICAgaWYgKGRhcmtNb2RlSWQgIT09IGxpZ2h0TW9kZUlkICYmIGRhcmtSZ2IpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyaWFibGUuc2V0VmFsdWVGb3JNb2RlKGRhcmtNb2RlSWQsIHsgcjogZGFya1JnYi5yLCBnOiBkYXJrUmdiLmcsIGI6IGRhcmtSZ2IuYiwgYTogZGFya1JnYi5hIHx8IDEgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gU2Vkb25hIGNvbG9ycyAoYnJhbmQgcGFsZXR0ZSlcbiAgICAgICAgaWYgKGNvbmZpZy5jb2xvcnMuc2Vkb25hKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IFtzaGFkZSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKGNvbmZpZy5jb2xvcnMuc2Vkb25hKSkge1xuICAgICAgICAgICAgICAgIGlmICghc2hhZGUgfHwgdHlwZW9mIHNoYWRlICE9PSAnc3RyaW5nJyB8fCAhaXNWYWxpZENvbG9yVmFsdWUodmFsdWUpIHx8IHNoYWRlID09PSAncHJpbWFyeScpXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhcmlhYmxlID0gY3JlYXRlVmFyaWFibGVXaXRoQ29uZmlnKGNvbGxlY3Rpb24sIGBjb2xvci9zZWRvbmEtJHtzaGFkZX1gLCAnQ09MT1InLCBgU2Vkb25hIGJyYW5kIGNvbG9yOiAke3NoYWRlfWAsIGdldEludGVsbGlnZW50U2NvcGVzKGBjb2xvci9zZWRvbmEtJHtzaGFkZX1gLCAnQ09MT1InKSk7XG4gICAgICAgICAgICAgICAgY29uc3QgbGlnaHRSZ2IgPSBwYXJzZUNvbG9yVG9SZ2IodmFsdWUpO1xuICAgICAgICAgICAgICAgIGlmIChsaWdodFJnYikge1xuICAgICAgICAgICAgICAgICAgICB2YXJpYWJsZS5zZXRWYWx1ZUZvck1vZGUobGlnaHRNb2RlSWQsIHsgcjogbGlnaHRSZ2IuciwgZzogbGlnaHRSZ2IuZywgYjogbGlnaHRSZ2IuYiwgYTogbGlnaHRSZ2IuYSB8fCAxIH0pO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGFya01vZGVJZCAhPT0gbGlnaHRNb2RlSWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhcmlhYmxlLnNldFZhbHVlRm9yTW9kZShkYXJrTW9kZUlkLCB7IHI6IGxpZ2h0UmdiLnIsIGc6IGxpZ2h0UmdiLmcsIGI6IGxpZ2h0UmdiLmIsIGE6IGxpZ2h0UmdiLmEgfHwgMSB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb3VudCsrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBTUEFDSU5HIC0gQWxsIHNwYWNpbmcgdmFsdWVzXG4gICAgaWYgKGNvbmZpZy5zcGFjaW5nKSB7XG4gICAgICAgIGZvciAoY29uc3QgW25hbWUsIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhjb25maWcuc3BhY2luZykpIHtcbiAgICAgICAgICAgIGlmICghbmFtZSB8fCB0eXBlb2YgbmFtZSAhPT0gJ3N0cmluZycpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICBjb25zdCBudW1WYWx1ZSA9IHBhcnNlSW50KHZhbHVlKTtcbiAgICAgICAgICAgIGlmIChpc05hTihudW1WYWx1ZSkpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICBjb25zdCB2YXJpYWJsZSA9IGNyZWF0ZVZhcmlhYmxlV2l0aENvbmZpZyhjb2xsZWN0aW9uLCBgc3BhY2luZy8ke25hbWV9YCwgJ0ZMT0FUJywgYEJhc2Ugc3BhY2luZzogJHtudW1WYWx1ZX1weGAsIGdldEludGVsbGlnZW50U2NvcGVzKGBzcGFjaW5nLyR7bmFtZX1gLCAnRkxPQVQnKSk7XG4gICAgICAgICAgICB2YXJpYWJsZS5zZXRWYWx1ZUZvck1vZGUobGlnaHRNb2RlSWQsIG51bVZhbHVlKTtcbiAgICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gVFlQT0dSQVBIWSAtIEZvbnQgZmFtaWxpZXMsIHNpemVzLCB3ZWlnaHRzXG4gICAgLy8gRm9udCBGYW1pbGllc1xuICAgIGNvbnN0IGZvbnRGYW1pbGllcyA9IFtcbiAgICAgICAgeyBuYW1lOiAnZm9udC9zYW5zJywgdmFsdWU6ICdJbnRlciwgc3lzdGVtLXVpLCAtYXBwbGUtc3lzdGVtLCBzYW5zLXNlcmlmJywgZGVzYzogJ1NhbnMtc2VyaWYgZm9udCBzdGFjaycgfSxcbiAgICAgICAgeyBuYW1lOiAnZm9udC9zZXJpZicsIHZhbHVlOiAnR2VvcmdpYSwgVGltZXMsIHNlcmlmJywgZGVzYzogJ1NlcmlmIGZvbnQgc3RhY2snIH0sXG4gICAgICAgIHsgbmFtZTogJ2ZvbnQvbW9ubycsIHZhbHVlOiAnU0YgTW9ubywgQ29uc29sYXMsIE1vbmFjbywgbW9ub3NwYWNlJywgZGVzYzogJ01vbm9zcGFjZSBmb250IHN0YWNrJyB9XG4gICAgXTtcbiAgICBmb3IgKGNvbnN0IGZvbnQgb2YgZm9udEZhbWlsaWVzKSB7XG4gICAgICAgIGNvbnN0IHZhcmlhYmxlID0gY3JlYXRlVmFyaWFibGVXaXRoQ29uZmlnKGNvbGxlY3Rpb24sIGZvbnQubmFtZSwgJ1NUUklORycsIGZvbnQuZGVzYywgZ2V0SW50ZWxsaWdlbnRTY29wZXMoZm9udC5uYW1lLCAnU1RSSU5HJykpO1xuICAgICAgICB2YXJpYWJsZS5zZXRWYWx1ZUZvck1vZGUobGlnaHRNb2RlSWQsIGZvbnQudmFsdWUpO1xuICAgICAgICBjb3VudCsrO1xuICAgIH1cbiAgICAvLyBGb250IFNpemVzXG4gICAgaWYgKGNvbmZpZy5mb250U2l6ZSkge1xuICAgICAgICBmb3IgKGNvbnN0IFtuYW1lLCBjb25maWdfdmFsXSBvZiBPYmplY3QuZW50cmllcyhjb25maWcuZm9udFNpemUpKSB7XG4gICAgICAgICAgICBpZiAoIW5hbWUgfHwgdHlwZW9mIG5hbWUgIT09ICdzdHJpbmcnKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgbGV0IHNpemU7XG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShjb25maWdfdmFsKSkge1xuICAgICAgICAgICAgICAgIHNpemUgPSBwYXJzZUludChjb25maWdfdmFsWzBdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHNpemUgPSBwYXJzZUludChjb25maWdfdmFsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpc05hTihzaXplKSlcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIGNvbnN0IHZhcmlhYmxlID0gY3JlYXRlVmFyaWFibGVXaXRoQ29uZmlnKGNvbGxlY3Rpb24sIGB0eXBlL3NpemUtJHtuYW1lfWAsICdGTE9BVCcsIGBGb250IHNpemU6ICR7c2l6ZX1weGAsIGdldEludGVsbGlnZW50U2NvcGVzKGB0eXBlL3NpemUtJHtuYW1lfWAsICdGTE9BVCcpKTtcbiAgICAgICAgICAgIHZhcmlhYmxlLnNldFZhbHVlRm9yTW9kZShsaWdodE1vZGVJZCwgc2l6ZSk7XG4gICAgICAgICAgICBjb3VudCsrO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIEZvbnQgV2VpZ2h0c1xuICAgIGlmIChjb25maWcuZm9udFdlaWdodCkge1xuICAgICAgICBmb3IgKGNvbnN0IFtuYW1lLCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMoY29uZmlnLmZvbnRXZWlnaHQpKSB7XG4gICAgICAgICAgICBpZiAoIW5hbWUgfHwgdHlwZW9mIG5hbWUgIT09ICdzdHJpbmcnKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgY29uc3Qgd2VpZ2h0ID0gcGFyc2VJbnQodmFsdWUpO1xuICAgICAgICAgICAgaWYgKGlzTmFOKHdlaWdodCkpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICBjb25zdCB2YXJpYWJsZSA9IGNyZWF0ZVZhcmlhYmxlV2l0aENvbmZpZyhjb2xsZWN0aW9uLCBgdHlwZS93ZWlnaHQtJHtuYW1lfWAsICdGTE9BVCcsIGBGb250IHdlaWdodDogJHt3ZWlnaHR9YCwgZ2V0SW50ZWxsaWdlbnRTY29wZXMoYHR5cGUvd2VpZ2h0LSR7bmFtZX1gLCAnRkxPQVQnKSk7XG4gICAgICAgICAgICB2YXJpYWJsZS5zZXRWYWx1ZUZvck1vZGUobGlnaHRNb2RlSWQsIHdlaWdodCk7XG4gICAgICAgICAgICBjb3VudCsrO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIEJPUkRFUiBSQURJVVNcbiAgICBpZiAoY29uZmlnLmJvcmRlclJhZGl1cykge1xuICAgICAgICBmb3IgKGNvbnN0IFtuYW1lLCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMoY29uZmlnLmJvcmRlclJhZGl1cykpIHtcbiAgICAgICAgICAgIGlmICghbmFtZSB8fCB0eXBlb2YgbmFtZSAhPT0gJ3N0cmluZycpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICBjb25zdCByYWRpdXMgPSBwYXJzZUludCh2YWx1ZSk7XG4gICAgICAgICAgICBpZiAoaXNOYU4ocmFkaXVzKSAmJiB2YWx1ZSAhPT0gJzk5OXB4JylcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIGNvbnN0IHZhcmlhYmxlID0gY3JlYXRlVmFyaWFibGVXaXRoQ29uZmlnKGNvbGxlY3Rpb24sIGByYWRpdXMvJHtuYW1lfWAsICdGTE9BVCcsIGBCb3JkZXIgcmFkaXVzOiAke3ZhbHVlfWAsIGdldEludGVsbGlnZW50U2NvcGVzKGByYWRpdXMvJHtuYW1lfWAsICdGTE9BVCcpKTtcbiAgICAgICAgICAgIHZhcmlhYmxlLnNldFZhbHVlRm9yTW9kZShsaWdodE1vZGVJZCwgdmFsdWUgPT09ICc5OTlweCcgPyA5OTkgOiByYWRpdXMpO1xuICAgICAgICAgICAgY291bnQrKztcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBPUEFDSVRZIC0gRXNzZW50aWFsIG9wYWNpdHkgdmFsdWVzXG4gICAgY29uc3Qgb3BhY2l0eVZhbHVlcyA9IFtcbiAgICAgICAgeyBuYW1lOiAnb3BhY2l0eS8wJywgdmFsdWU6IDAsIGRlc2M6ICdGdWxseSB0cmFuc3BhcmVudCcgfSxcbiAgICAgICAgeyBuYW1lOiAnb3BhY2l0eS81JywgdmFsdWU6IDAuMDUsIGRlc2M6ICc1JSBvcGFjaXR5JyB9LFxuICAgICAgICB7IG5hbWU6ICdvcGFjaXR5LzEwJywgdmFsdWU6IDAuMSwgZGVzYzogJzEwJSBvcGFjaXR5JyB9LFxuICAgICAgICB7IG5hbWU6ICdvcGFjaXR5LzIwJywgdmFsdWU6IDAuMiwgZGVzYzogJzIwJSBvcGFjaXR5JyB9LFxuICAgICAgICB7IG5hbWU6ICdvcGFjaXR5LzI1JywgdmFsdWU6IDAuMjUsIGRlc2M6ICcyNSUgb3BhY2l0eScgfSxcbiAgICAgICAgeyBuYW1lOiAnb3BhY2l0eS80MCcsIHZhbHVlOiAwLjQsIGRlc2M6ICc0MCUgb3BhY2l0eScgfSxcbiAgICAgICAgeyBuYW1lOiAnb3BhY2l0eS81MCcsIHZhbHVlOiAwLjUsIGRlc2M6ICc1MCUgb3BhY2l0eScgfSxcbiAgICAgICAgeyBuYW1lOiAnb3BhY2l0eS82MCcsIHZhbHVlOiAwLjYsIGRlc2M6ICc2MCUgb3BhY2l0eScgfSxcbiAgICAgICAgeyBuYW1lOiAnb3BhY2l0eS83NScsIHZhbHVlOiAwLjc1LCBkZXNjOiAnNzUlIG9wYWNpdHknIH0sXG4gICAgICAgIHsgbmFtZTogJ29wYWNpdHkvODAnLCB2YWx1ZTogMC44LCBkZXNjOiAnODAlIG9wYWNpdHknIH0sXG4gICAgICAgIHsgbmFtZTogJ29wYWNpdHkvOTAnLCB2YWx1ZTogMC45LCBkZXNjOiAnOTAlIG9wYWNpdHknIH0sXG4gICAgICAgIHsgbmFtZTogJ29wYWNpdHkvOTUnLCB2YWx1ZTogMC45NSwgZGVzYzogJzk1JSBvcGFjaXR5JyB9LFxuICAgICAgICB7IG5hbWU6ICdvcGFjaXR5LzEwMCcsIHZhbHVlOiAxLCBkZXNjOiAnRnVsbHkgb3BhcXVlJyB9XG4gICAgXTtcbiAgICBmb3IgKGNvbnN0IG9wYWNpdHkgb2Ygb3BhY2l0eVZhbHVlcykge1xuICAgICAgICBjb25zdCB2YXJpYWJsZSA9IGNyZWF0ZVZhcmlhYmxlV2l0aENvbmZpZyhjb2xsZWN0aW9uLCBvcGFjaXR5Lm5hbWUsICdGTE9BVCcsIG9wYWNpdHkuZGVzYywgZ2V0SW50ZWxsaWdlbnRTY29wZXMob3BhY2l0eS5uYW1lLCAnRkxPQVQnKSk7XG4gICAgICAgIHZhcmlhYmxlLnNldFZhbHVlRm9yTW9kZShsaWdodE1vZGVJZCwgb3BhY2l0eS52YWx1ZSk7XG4gICAgICAgIGNvdW50Kys7XG4gICAgfVxuICAgIC8vIEdSQURJRU5UUyAtIENvbW1vbiBncmFkaWVudCBkZWZpbml0aW9uc1xuICAgIGNvbnN0IGdyYWRpZW50cyA9IFtcbiAgICAgICAgeyBuYW1lOiAnZ3JhZGllbnQvc3VidGxlJywgdmFsdWU6ICdsaW5lYXItZ3JhZGllbnQoMTgwZGVnLCB2YXIoLS1zdXJmYWNlLWRlZmF1bHQpIDAlLCB2YXIoLS1zdXJmYWNlLWVsZXZhdGVkKSAxMDAlKScsIGRlc2M6ICdTdWJ0bGUgc3VyZmFjZSBncmFkaWVudCcgfSxcbiAgICAgICAgeyBuYW1lOiAnZ3JhZGllbnQvYnJhbmQnLCB2YWx1ZTogJ2xpbmVhci1ncmFkaWVudCgxMzVkZWcsIHZhcigtLXNlZG9uYS00MDApIDAlLCB2YXIoLS1zZWRvbmEtNjAwKSAxMDAlKScsIGRlc2M6ICdTZWRvbmEgYnJhbmQgZ3JhZGllbnQnIH0sXG4gICAgICAgIHsgbmFtZTogJ2dyYWRpZW50L3N1Y2Nlc3MnLCB2YWx1ZTogJ2xpbmVhci1ncmFkaWVudCgxMzVkZWcsIHZhcigtLWFjY2VudC1ncmVlbikgMCUsICMxNmEzNGEgMTAwJSknLCBkZXNjOiAnU3VjY2VzcyBzdGF0ZSBncmFkaWVudCcgfSxcbiAgICAgICAgeyBuYW1lOiAnZ3JhZGllbnQvd2FybmluZycsIHZhbHVlOiAnbGluZWFyLWdyYWRpZW50KDEzNWRlZywgdmFyKC0tYWNjZW50LW9yYW5nZSkgMCUsICNlYTU4MGMgMTAwJSknLCBkZXNjOiAnV2FybmluZyBzdGF0ZSBncmFkaWVudCcgfSxcbiAgICAgICAgeyBuYW1lOiAnZ3JhZGllbnQvZXJyb3InLCB2YWx1ZTogJ2xpbmVhci1ncmFkaWVudCgxMzVkZWcsIHZhcigtLWFjY2VudC1yZWQpIDAlLCAjZGMyNjI2IDEwMCUpJywgZGVzYzogJ0Vycm9yIHN0YXRlIGdyYWRpZW50JyB9XG4gICAgXTtcbiAgICBmb3IgKGNvbnN0IGdyYWRpZW50IG9mIGdyYWRpZW50cykge1xuICAgICAgICBjb25zdCB2YXJpYWJsZSA9IGNyZWF0ZVZhcmlhYmxlV2l0aENvbmZpZyhjb2xsZWN0aW9uLCBncmFkaWVudC5uYW1lLCAnU1RSSU5HJywgZ3JhZGllbnQuZGVzYywgZ2V0SW50ZWxsaWdlbnRTY29wZXMoZ3JhZGllbnQubmFtZSwgJ1NUUklORycpKTtcbiAgICAgICAgdmFyaWFibGUuc2V0VmFsdWVGb3JNb2RlKGxpZ2h0TW9kZUlkLCBncmFkaWVudC52YWx1ZSk7XG4gICAgICAgIGNvdW50Kys7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKGDinIUgRm91bmRhdGlvbjogJHtjb3VudH0gdmFyaWFibGVzIGNyZWF0ZWRgKTtcbiAgICByZXR1cm4gY291bnQ7XG59XG5hc3luYyBmdW5jdGlvbiBjcmVhdGVTZW1hbnRpYyhjb2xsZWN0aW9uLCBsaWdodE1vZGVJZCwgZGFya01vZGVJZCkge1xuICAgIGxldCBjb3VudCA9IDA7XG4gICAgY29uc3QgYWxsVmFycyA9IGZpZ21hLnZhcmlhYmxlcy5nZXRMb2NhbFZhcmlhYmxlcygpO1xuICAgIGNvbnN0IGZpbmRWYXIgPSAobmFtZSkgPT4gYWxsVmFycy5maW5kKHYgPT4gdi5uYW1lID09PSBuYW1lICYmIHYudmFyaWFibGVDb2xsZWN0aW9uSWQgPT09IGNvbGxlY3Rpb24uaWQpO1xuICAgIC8vIFNlbWFudGljIGNvbG9ycyB1c2luZyBmb3VuZGF0aW9uIGNvbG9ycyAgXG4gICAgY29uc3Qgc2VtYW50aWNDb2xvcnMgPSBbXG4gICAgICAgIHsgc2VtYW50aWM6ICdzZW1hbnRpYy90ZXh0LXByaW1hcnknLCBmb3VuZGF0aW9uOiAnY29sb3IvdGV4dC1wcmltYXJ5JywgZGVzYzogJ1ByaW1hcnkgdGV4dCBmb3IgY29udGVudCcgfSxcbiAgICAgICAgeyBzZW1hbnRpYzogJ3NlbWFudGljL3RleHQtc2Vjb25kYXJ5JywgZm91bmRhdGlvbjogJ2NvbG9yL3RleHQtc2Vjb25kYXJ5JywgZGVzYzogJ1NlY29uZGFyeSB0ZXh0IGZvciBkZXNjcmlwdGlvbnMnIH0sXG4gICAgICAgIHsgc2VtYW50aWM6ICdzZW1hbnRpYy90ZXh0LXRlcnRpYXJ5JywgZm91bmRhdGlvbjogJ2NvbG9yL3RleHQtdGVydGlhcnknLCBkZXNjOiAnVGVydGlhcnkgdGV4dCBmb3Igc3VidGxlIGNvbnRlbnQnIH0sXG4gICAgICAgIHsgc2VtYW50aWM6ICdzZW1hbnRpYy90ZXh0LXF1YXRlcm5hcnknLCBmb3VuZGF0aW9uOiAnY29sb3IvdGV4dC1xdWF0ZXJuYXJ5JywgZGVzYzogJ1F1YXRlcm5hcnkgdGV4dCBmb3IgdmVyeSBzdWJ0bGUgY29udGVudCcgfSxcbiAgICAgICAgeyBzZW1hbnRpYzogJ3NlbWFudGljL3N1cmZhY2UtZGVmYXVsdCcsIGZvdW5kYXRpb246ICdjb2xvci9zdXJmYWNlLWRlZmF1bHQnLCBkZXNjOiAnRGVmYXVsdCBwYWdlIGJhY2tncm91bmQnIH0sXG4gICAgICAgIHsgc2VtYW50aWM6ICdzZW1hbnRpYy9zdXJmYWNlLWVsZXZhdGVkJywgZm91bmRhdGlvbjogJ2NvbG9yL3N1cmZhY2UtZWxldmF0ZWQnLCBkZXNjOiAnQ2FyZHMgYW5kIGVsZXZhdGVkIHN1cmZhY2VzJyB9LFxuICAgICAgICB7IHNlbWFudGljOiAnc2VtYW50aWMvYm9yZGVyLWRlZmF1bHQnLCBmb3VuZGF0aW9uOiAnY29sb3IvYm9yZGVyLWRlZmF1bHQnLCBkZXNjOiAnRGVmYXVsdCBVSSBib3JkZXJzJyB9LFxuICAgICAgICB7IHNlbWFudGljOiAnc2VtYW50aWMvc3VjY2VzcycsIGZvdW5kYXRpb246ICdjb2xvci9hY2NlbnQtZ3JlZW4nLCBkZXNjOiAnU3VjY2VzcyBzdGF0ZXMgYW5kIHBvc2l0aXZlIGFjdGlvbnMnIH0sXG4gICAgICAgIHsgc2VtYW50aWM6ICdzZW1hbnRpYy93YXJuaW5nJywgZm91bmRhdGlvbjogJ2NvbG9yL2FjY2VudC1vcmFuZ2UnLCBkZXNjOiAnV2FybmluZyBzdGF0ZXMgYW5kIGNhdXRpb24nIH0sXG4gICAgICAgIHsgc2VtYW50aWM6ICdzZW1hbnRpYy9lcnJvcicsIGZvdW5kYXRpb246ICdjb2xvci9hY2NlbnQtcmVkJywgZGVzYzogJ0Vycm9yIHN0YXRlcyBhbmQgZGVzdHJ1Y3RpdmUgYWN0aW9ucycgfSxcbiAgICAgICAgeyBzZW1hbnRpYzogJ3NlbWFudGljL2luZm8nLCBmb3VuZGF0aW9uOiAnY29sb3IvYWNjZW50LWJsdWUnLCBkZXNjOiAnSW5mb3JtYXRpb25hbCBzdGF0ZXMgYW5kIGNvbnRlbnQnIH1cbiAgICBdO1xuICAgIGZvciAoY29uc3QgbWFwcGluZyBvZiBzZW1hbnRpY0NvbG9ycykge1xuICAgICAgICBjb25zdCBmb3VuZGF0aW9uVmFyID0gZmluZFZhcihtYXBwaW5nLmZvdW5kYXRpb24pO1xuICAgICAgICBpZiAoIWZvdW5kYXRpb25WYXIpXG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgY29uc3Qgc2VtYW50aWNWYXIgPSBjcmVhdGVWYXJpYWJsZVdpdGhDb25maWcoY29sbGVjdGlvbiwgbWFwcGluZy5zZW1hbnRpYywgJ0NPTE9SJywgbWFwcGluZy5kZXNjLCBnZXRJbnRlbGxpZ2VudFNjb3BlcyhtYXBwaW5nLnNlbWFudGljLCAnQ09MT1InKSk7XG4gICAgICAgIC8vIENyZWF0ZSBhbGlhcyB0byBmb3VuZGF0aW9uIHZhcmlhYmxlXG4gICAgICAgIHNlbWFudGljVmFyLnNldFZhbHVlRm9yTW9kZShsaWdodE1vZGVJZCwgeyB0eXBlOiAnVkFSSUFCTEVfQUxJQVMnLCBpZDogZm91bmRhdGlvblZhci5pZCB9KTtcbiAgICAgICAgaWYgKGRhcmtNb2RlSWQgIT09IGxpZ2h0TW9kZUlkKSB7XG4gICAgICAgICAgICBzZW1hbnRpY1Zhci5zZXRWYWx1ZUZvck1vZGUoZGFya01vZGVJZCwgeyB0eXBlOiAnVkFSSUFCTEVfQUxJQVMnLCBpZDogZm91bmRhdGlvblZhci5pZCB9KTtcbiAgICAgICAgfVxuICAgICAgICBjb3VudCsrO1xuICAgIH1cbiAgICBjb25zb2xlLmxvZyhg4pyFIFNlbWFudGljOiAke2NvdW50fSB2YXJpYWJsZXMgY3JlYXRlZGApO1xuICAgIHJldHVybiBjb3VudDtcbn1cbmFzeW5jIGZ1bmN0aW9uIGNyZWF0ZUJyYW5kKGNvbGxlY3Rpb24sIGxpZ2h0TW9kZUlkLCBkYXJrTW9kZUlkKSB7XG4gICAgbGV0IGNvdW50ID0gMDtcbiAgICBjb25zdCBhbGxWYXJzID0gZmlnbWEudmFyaWFibGVzLmdldExvY2FsVmFyaWFibGVzKCk7XG4gICAgY29uc3QgZmluZFZhciA9IChuYW1lKSA9PiBhbGxWYXJzLmZpbmQodiA9PiB2Lm5hbWUgPT09IG5hbWUgJiYgdi52YXJpYWJsZUNvbGxlY3Rpb25JZCA9PT0gY29sbGVjdGlvbi5pZCk7XG4gICAgLy8gQnJhbmQgY29sb3JzIHVzaW5nIHNlbWFudGljIGNvbG9ycyBhbmQgZm91bmRhdGlvblxuICAgIGNvbnN0IGJyYW5kQ29sb3JzID0gW1xuICAgICAgICB7IGJyYW5kOiAnYnJhbmQvcHJpbWFyeScsIGZvdW5kYXRpb246ICdjb2xvci9zZWRvbmEtNTAwJywgZGVzYzogJ1NlZG9uYSBwcmltYXJ5IGJyYW5kIGNvbG9yJyB9LFxuICAgICAgICB7IGJyYW5kOiAnYnJhbmQvc2Vjb25kYXJ5Jywgc2VtYW50aWM6ICdzZW1hbnRpYy9zdXJmYWNlLWVsZXZhdGVkJywgZGVzYzogJ1NlY29uZGFyeSBicmFuZCBjb2xvciBmb3Igc3VwcG9ydCcgfSxcbiAgICAgICAgeyBicmFuZDogJ2JyYW5kL3N1Y2Nlc3MnLCBzZW1hbnRpYzogJ3NlbWFudGljL3N1Y2Nlc3MnLCBkZXNjOiAnQnJhbmQgc3VjY2VzcyBjb2xvcicgfSxcbiAgICAgICAgeyBicmFuZDogJ2JyYW5kL3dhcm5pbmcnLCBzZW1hbnRpYzogJ3NlbWFudGljL3dhcm5pbmcnLCBkZXNjOiAnQnJhbmQgd2FybmluZyBjb2xvcicgfSxcbiAgICAgICAgeyBicmFuZDogJ2JyYW5kL2Vycm9yJywgc2VtYW50aWM6ICdzZW1hbnRpYy9lcnJvcicsIGRlc2M6ICdCcmFuZCBlcnJvciBjb2xvcicgfSxcbiAgICAgICAgeyBicmFuZDogJ2JyYW5kL2luZm8nLCBzZW1hbnRpYzogJ3NlbWFudGljL2luZm8nLCBkZXNjOiAnQnJhbmQgaW5mbyBjb2xvcicgfVxuICAgIF07XG4gICAgZm9yIChjb25zdCBtYXBwaW5nIG9mIGJyYW5kQ29sb3JzKSB7XG4gICAgICAgIGNvbnN0IHJlZlZhck5hbWUgPSBtYXBwaW5nLmZvdW5kYXRpb24gfHwgbWFwcGluZy5zZW1hbnRpYztcbiAgICAgICAgaWYgKCFyZWZWYXJOYW1lKVxuICAgICAgICAgICAgY29udGludWU7IC8vIFNraXAgaWYgbm8gcmVmZXJlbmNlIHZhcmlhYmxlIG5hbWVcbiAgICAgICAgY29uc3QgcmVmVmFyID0gZmluZFZhcihyZWZWYXJOYW1lKTtcbiAgICAgICAgaWYgKCFyZWZWYXIpXG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgY29uc3QgYnJhbmRWYXIgPSBjcmVhdGVWYXJpYWJsZVdpdGhDb25maWcoY29sbGVjdGlvbiwgbWFwcGluZy5icmFuZCwgJ0NPTE9SJywgbWFwcGluZy5kZXNjLCBnZXRJbnRlbGxpZ2VudFNjb3BlcyhtYXBwaW5nLmJyYW5kLCAnQ09MT1InKSk7XG4gICAgICAgIC8vIENyZWF0ZSBhbGlhcyB0byByZWZlcmVuY2UgdmFyaWFibGVcbiAgICAgICAgYnJhbmRWYXIuc2V0VmFsdWVGb3JNb2RlKGxpZ2h0TW9kZUlkLCB7IHR5cGU6ICdWQVJJQUJMRV9BTElBUycsIGlkOiByZWZWYXIuaWQgfSk7XG4gICAgICAgIGlmIChkYXJrTW9kZUlkICE9PSBsaWdodE1vZGVJZCkge1xuICAgICAgICAgICAgYnJhbmRWYXIuc2V0VmFsdWVGb3JNb2RlKGRhcmtNb2RlSWQsIHsgdHlwZTogJ1ZBUklBQkxFX0FMSUFTJywgaWQ6IHJlZlZhci5pZCB9KTtcbiAgICAgICAgfVxuICAgICAgICBjb3VudCsrO1xuICAgIH1cbiAgICBjb25zb2xlLmxvZyhg4pyFIEJyYW5kOiAke2NvdW50fSB2YXJpYWJsZXMgY3JlYXRlZGApO1xuICAgIHJldHVybiBjb3VudDtcbn1cbmFzeW5jIGZ1bmN0aW9uIGNyZWF0ZVRleHRTdHlsZXMoY29sbGVjdGlvbikge1xuICAgIGNvbnNvbGUubG9nKCfwn5OdIFN0YXJ0aW5nIHRleHQgc3R5bGVzIGNyZWF0aW9uLi4uJyk7XG4gICAgY29uc3QgYWxsVmFycyA9IGZpZ21hLnZhcmlhYmxlcy5nZXRMb2NhbFZhcmlhYmxlcygpO1xuICAgIGNvbnN0IGNvbGxlY3Rpb25WYXJzID0gYWxsVmFycy5maWx0ZXIodiA9PiB2LnZhcmlhYmxlQ29sbGVjdGlvbklkID09PSBjb2xsZWN0aW9uLmlkKTtcbiAgICBjb25zb2xlLmxvZyhg8J+UjSBGb3VuZCAke2NvbGxlY3Rpb25WYXJzLmxlbmd0aH0gdmFyaWFibGVzIGluIGNvbGxlY3Rpb246YCk7XG4gICAgY29sbGVjdGlvblZhcnMuZm9yRWFjaCh2ID0+IGNvbnNvbGUubG9nKGAgIC0gJHt2Lm5hbWV9ICgke3YucmVzb2x2ZWRUeXBlfSlgKSk7XG4gICAgY29uc3QgZmluZFZhciA9IChuYW1lKSA9PiB7XG4gICAgICAgIGNvbnN0IHZhcmlhYmxlID0gYWxsVmFycy5maW5kKHYgPT4gdi5uYW1lID09PSBuYW1lICYmIHYudmFyaWFibGVDb2xsZWN0aW9uSWQgPT09IGNvbGxlY3Rpb24uaWQpO1xuICAgICAgICBpZiAoIXZhcmlhYmxlKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYOKaoO+4jyAgVmFyaWFibGUgbm90IGZvdW5kOiAke25hbWV9YCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhg4pyFIEZvdW5kIHZhcmlhYmxlOiAke25hbWV9YCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhcmlhYmxlO1xuICAgIH07XG4gICAgLy8gQ29tcHJlaGVuc2l2ZSB0ZXh0IHN0eWxlIGRlZmluaXRpb25zIHVzaW5nIHZhcmlhYmxlc1xuICAgIGNvbnN0IHRleHRTdHlsZXMgPSBbXG4gICAgICAgIC8vIERpc3BsYXkgJiBIZWFkaW5nc1xuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnRGlzcGxheS9MYXJnZScsXG4gICAgICAgICAgICBmb250RmFtaWx5OiAnZm9udC9zYW5zJyxcbiAgICAgICAgICAgIGZvbnRTaXplOiAndHlwZS9zaXplLWRpc3BsYXknLFxuICAgICAgICAgICAgZm9udFdlaWdodDogJ3R5cGUvd2VpZ2h0LWJvbGQnLFxuICAgICAgICAgICAgY29sb3I6ICdzZW1hbnRpYy90ZXh0LXByaW1hcnknLFxuICAgICAgICAgICAgZGVzYzogJ0Rpc3BsYXkgdGV4dCAoNjRweCwgQm9sZCknXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdIZWFkaW5nL0xhcmdlJyxcbiAgICAgICAgICAgIGZvbnRGYW1pbHk6ICdmb250L3NhbnMnLFxuICAgICAgICAgICAgZm9udFNpemU6ICd0eXBlL3NpemUtaGVhZGluZy1sJyxcbiAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICd0eXBlL3dlaWdodC1ib2xkJyxcbiAgICAgICAgICAgIGNvbG9yOiAnc2VtYW50aWMvdGV4dC1wcmltYXJ5JyxcbiAgICAgICAgICAgIGRlc2M6ICdMYXJnZSBoZWFkaW5nIEgxICg0OHB4LCBCb2xkKSdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ0hlYWRpbmcvTWVkaXVtJyxcbiAgICAgICAgICAgIGZvbnRGYW1pbHk6ICdmb250L3NhbnMnLFxuICAgICAgICAgICAgZm9udFNpemU6ICd0eXBlL3NpemUtaGVhZGluZy1tJyxcbiAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICd0eXBlL3dlaWdodC1zZW1pYm9sZCcsXG4gICAgICAgICAgICBjb2xvcjogJ3NlbWFudGljL3RleHQtcHJpbWFyeScsXG4gICAgICAgICAgICBkZXNjOiAnTWVkaXVtIGhlYWRpbmcgSDIgKDMycHgsIFNlbWlib2xkKSdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ0hlYWRpbmcvU21hbGwnLFxuICAgICAgICAgICAgZm9udEZhbWlseTogJ2ZvbnQvc2FucycsXG4gICAgICAgICAgICBmb250U2l6ZTogJ3R5cGUvc2l6ZS1oZWFkaW5nLXMnLFxuICAgICAgICAgICAgZm9udFdlaWdodDogJ3R5cGUvd2VpZ2h0LXNlbWlib2xkJyxcbiAgICAgICAgICAgIGNvbG9yOiAnc2VtYW50aWMvdGV4dC1wcmltYXJ5JyxcbiAgICAgICAgICAgIGRlc2M6ICdTbWFsbCBoZWFkaW5nIEgzICgyNHB4LCBTZW1pYm9sZCknXG4gICAgICAgIH0sXG4gICAgICAgIC8vIEJvZHkgVGV4dFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnQm9keS9MYXJnZScsXG4gICAgICAgICAgICBmb250RmFtaWx5OiAnZm9udC9zYW5zJyxcbiAgICAgICAgICAgIGZvbnRTaXplOiAndHlwZS9zaXplLWJvZHktbCcsXG4gICAgICAgICAgICBmb250V2VpZ2h0OiAndHlwZS93ZWlnaHQtcmVndWxhcicsXG4gICAgICAgICAgICBjb2xvcjogJ3NlbWFudGljL3RleHQtcHJpbWFyeScsXG4gICAgICAgICAgICBkZXNjOiAnTGFyZ2UgYm9keSB0ZXh0ICgyMHB4KSdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ0JvZHkvTWVkaXVtJyxcbiAgICAgICAgICAgIGZvbnRGYW1pbHk6ICdmb250L3NhbnMnLFxuICAgICAgICAgICAgZm9udFNpemU6ICd0eXBlL3NpemUtYm9keS1tJyxcbiAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICd0eXBlL3dlaWdodC1yZWd1bGFyJyxcbiAgICAgICAgICAgIGNvbG9yOiAnc2VtYW50aWMvdGV4dC1wcmltYXJ5JyxcbiAgICAgICAgICAgIGRlc2M6ICdNZWRpdW0gYm9keSB0ZXh0ICgxOHB4KSdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ0JvZHkvU21hbGwnLFxuICAgICAgICAgICAgZm9udEZhbWlseTogJ2ZvbnQvc2FucycsXG4gICAgICAgICAgICBmb250U2l6ZTogJ3R5cGUvc2l6ZS1ib2R5LXMnLFxuICAgICAgICAgICAgZm9udFdlaWdodDogJ3R5cGUvd2VpZ2h0LXJlZ3VsYXInLFxuICAgICAgICAgICAgY29sb3I6ICdzZW1hbnRpYy90ZXh0LXByaW1hcnknLFxuICAgICAgICAgICAgZGVzYzogJ1NtYWxsIGJvZHkgdGV4dCAoMTZweCknXG4gICAgICAgIH0sXG4gICAgICAgIC8vIEJvZHkgVGV4dCBWYXJpYXRpb25zXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdCb2R5L01lZGl1bS9TZWNvbmRhcnknLFxuICAgICAgICAgICAgZm9udEZhbWlseTogJ2ZvbnQvc2FucycsXG4gICAgICAgICAgICBmb250U2l6ZTogJ3R5cGUvc2l6ZS1ib2R5LW0nLFxuICAgICAgICAgICAgZm9udFdlaWdodDogJ3R5cGUvd2VpZ2h0LXJlZ3VsYXInLFxuICAgICAgICAgICAgY29sb3I6ICdzZW1hbnRpYy90ZXh0LXNlY29uZGFyeScsXG4gICAgICAgICAgICBkZXNjOiAnTWVkaXVtIGJvZHkgc2Vjb25kYXJ5IHRleHQgKDE4cHgpJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnQm9keS9TbWFsbC9TZWNvbmRhcnknLFxuICAgICAgICAgICAgZm9udEZhbWlseTogJ2ZvbnQvc2FucycsXG4gICAgICAgICAgICBmb250U2l6ZTogJ3R5cGUvc2l6ZS1ib2R5LXMnLFxuICAgICAgICAgICAgZm9udFdlaWdodDogJ3R5cGUvd2VpZ2h0LXJlZ3VsYXInLFxuICAgICAgICAgICAgY29sb3I6ICdzZW1hbnRpYy90ZXh0LXNlY29uZGFyeScsXG4gICAgICAgICAgICBkZXNjOiAnU21hbGwgYm9keSBzZWNvbmRhcnkgdGV4dCAoMTZweCknXG4gICAgICAgIH0sXG4gICAgICAgIC8vIENhcHRpb25zXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdDYXB0aW9uL0xhcmdlJyxcbiAgICAgICAgICAgIGZvbnRGYW1pbHk6ICdmb250L3NhbnMnLFxuICAgICAgICAgICAgZm9udFNpemU6ICd0eXBlL3NpemUtY2FwdGlvbi1sJyxcbiAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICd0eXBlL3dlaWdodC1yZWd1bGFyJyxcbiAgICAgICAgICAgIGNvbG9yOiAnc2VtYW50aWMvdGV4dC1zZWNvbmRhcnknLFxuICAgICAgICAgICAgZGVzYzogJ0xhcmdlIGNhcHRpb24gdGV4dCAoMTRweCknXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdDYXB0aW9uL01lZGl1bScsXG4gICAgICAgICAgICBmb250RmFtaWx5OiAnZm9udC9zYW5zJyxcbiAgICAgICAgICAgIGZvbnRTaXplOiAndHlwZS9zaXplLWNhcHRpb24tbScsXG4gICAgICAgICAgICBmb250V2VpZ2h0OiAndHlwZS93ZWlnaHQtcmVndWxhcicsXG4gICAgICAgICAgICBjb2xvcjogJ3NlbWFudGljL3RleHQtc2Vjb25kYXJ5JyxcbiAgICAgICAgICAgIGRlc2M6ICdNZWRpdW0gY2FwdGlvbiB0ZXh0ICgxMnB4KSdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ0NhcHRpb24vU21hbGwnLFxuICAgICAgICAgICAgZm9udEZhbWlseTogJ2ZvbnQvc2FucycsXG4gICAgICAgICAgICBmb250U2l6ZTogJ3R5cGUvc2l6ZS1jYXB0aW9uLXMnLFxuICAgICAgICAgICAgZm9udFdlaWdodDogJ3R5cGUvd2VpZ2h0LXJlZ3VsYXInLFxuICAgICAgICAgICAgY29sb3I6ICdzZW1hbnRpYy90ZXh0LXRlcnRpYXJ5JyxcbiAgICAgICAgICAgIGRlc2M6ICdTbWFsbCBjYXB0aW9uIHRleHQgKDEwcHgpJ1xuICAgICAgICB9XG4gICAgXTtcbiAgICBjb25zb2xlLmxvZyhg8J+OryBBdHRlbXB0aW5nIHRvIGNyZWF0ZSAke3RleHRTdHlsZXMubGVuZ3RofSB0ZXh0IHN0eWxlcy4uLmApO1xuICAgIGxldCBjcmVhdGVkQ291bnQgPSAwO1xuICAgIGZvciAoY29uc3Qgc3R5bGUgb2YgdGV4dFN0eWxlcykge1xuICAgICAgICBjb25zb2xlLmxvZyhgXFxu8J+UqCBDcmVhdGluZyB0ZXh0IHN0eWxlOiAke3N0eWxlLm5hbWV9YCk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBGaW5kIHRoZSB2YXJpYWJsZSByZWZlcmVuY2VzXG4gICAgICAgICAgICBjb25zdCBmb250RmFtaWx5VmFyID0gZmluZFZhcihzdHlsZS5mb250RmFtaWx5KTtcbiAgICAgICAgICAgIGNvbnN0IGZvbnRTaXplVmFyID0gZmluZFZhcihzdHlsZS5mb250U2l6ZSk7XG4gICAgICAgICAgICBjb25zdCBmb250V2VpZ2h0VmFyID0gZmluZFZhcihzdHlsZS5mb250V2VpZ2h0KTtcbiAgICAgICAgICAgIGNvbnN0IGNvbG9yVmFyID0gZmluZFZhcihzdHlsZS5jb2xvcik7XG4gICAgICAgICAgICBpZiAoIWZvbnRTaXplVmFyIHx8ICFjb2xvclZhcikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2Fybihg4p2MIFNLSVBQSU5HIHRleHQgc3R5bGUgJHtzdHlsZS5uYW1lfSAtIG1pc3NpbmcgdmFyaWFibGVzOmApO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgICAtIGZvbnRGYW1pbHk6ICR7Zm9udEZhbWlseVZhciA/ICfinIUnIDogJ+KdjCd9ICR7c3R5bGUuZm9udEZhbWlseX1gKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYCAgLSBmb250U2l6ZTogJHtmb250U2l6ZVZhciA/ICfinIUnIDogJ+KdjCd9ICR7c3R5bGUuZm9udFNpemV9YCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGAgIC0gZm9udFdlaWdodDogJHtmb250V2VpZ2h0VmFyID8gJ+KchScgOiAn4p2MJ30gJHtzdHlsZS5mb250V2VpZ2h0fWApO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgICAtIGNvbG9yOiAke2NvbG9yVmFyID8gJ+KchScgOiAn4p2MJ30gJHtzdHlsZS5jb2xvcn1gKTtcbiAgICAgICAgICAgICAgICAvLyBTaG93IGF2YWlsYWJsZSBzaXplIHZhcmlhYmxlcyBmb3IgZGVidWdnaW5nXG4gICAgICAgICAgICAgICAgaWYgKCFmb250U2l6ZVZhcikge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzaXplVmFycyA9IGNvbGxlY3Rpb25WYXJzLmZpbHRlcih2ID0+IHYubmFtZS5pbmNsdWRlcygndHlwZS9zaXplJykpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYPCfk50gQXZhaWxhYmxlIHNpemUgdmFyaWFibGVzOmAsIHNpemVWYXJzLm1hcCh2ID0+IHYubmFtZSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGDinIUgQWxsIHJlcXVpcmVkIHZhcmlhYmxlcyBmb3VuZCBmb3IgJHtzdHlsZS5uYW1lfWApO1xuICAgICAgICAgICAgLy8gQ2hlY2sgaWYgdGV4dCBzdHlsZSBhbHJlYWR5IGV4aXN0cyB0byBhdm9pZCBkdXBsaWNhdGVzXG4gICAgICAgICAgICBjb25zdCBleGlzdGluZ1N0eWxlID0gZmlnbWEuZ2V0TG9jYWxUZXh0U3R5bGVzKCkuZmluZCh0cyA9PiB0cy5uYW1lID09PSBzdHlsZS5uYW1lKTtcbiAgICAgICAgICAgIGlmIChleGlzdGluZ1N0eWxlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGDimqDvuI8gIFRleHQgc3R5bGUgXCIke3N0eWxlLm5hbWV9XCIgYWxyZWFkeSBleGlzdHMsIHNraXBwaW5nLi4uYCk7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBDcmVhdGUgdGhlIHRleHQgc3R5bGVcbiAgICAgICAgICAgIGNvbnN0IHRleHRTdHlsZSA9IGZpZ21hLmNyZWF0ZVRleHRTdHlsZSgpO1xuICAgICAgICAgICAgdGV4dFN0eWxlLm5hbWUgPSBzdHlsZS5uYW1lO1xuICAgICAgICAgICAgdGV4dFN0eWxlLmRlc2NyaXB0aW9uID0gc3R5bGUuZGVzYztcbiAgICAgICAgICAgIC8vIFNldCBmb250IHNpemUgdXNpbmcgdmFyaWFibGVcbiAgICAgICAgICAgIHRleHRTdHlsZS5mb250U2l6ZSA9IGZvbnRTaXplVmFyLnZhbHVlc0J5TW9kZVtPYmplY3Qua2V5cyhmb250U2l6ZVZhci52YWx1ZXNCeU1vZGUpWzBdXTtcbiAgICAgICAgICAgIC8vIFNldCBmb250IGZhbWlseSBhbmQgd2VpZ2h0IHVzaW5nIHZhcmlhYmxlc1xuICAgICAgICAgICAgbGV0IGZvbnRGYW1pbHkgPSAnSW50ZXInOyAvLyBEZWZhdWx0IGZhbGxiYWNrXG4gICAgICAgICAgICBpZiAoZm9udEZhbWlseVZhcikge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZhbWlseVZhbHVlID0gZm9udEZhbWlseVZhci52YWx1ZXNCeU1vZGVbT2JqZWN0LmtleXMoZm9udEZhbWlseVZhci52YWx1ZXNCeU1vZGUpWzBdXTtcbiAgICAgICAgICAgICAgICAvLyBNYXAgZm9udCB2YXJpYWJsZSB2YWx1ZXMgdG8gYWN0dWFsIGZvbnQgbmFtZXNcbiAgICAgICAgICAgICAgICBpZiAoZmFtaWx5VmFsdWUuaW5jbHVkZXMoJ3NhbnMnKSB8fCBmYW1pbHlWYWx1ZS5pbmNsdWRlcygnSW50ZXInKSkge1xuICAgICAgICAgICAgICAgICAgICBmb250RmFtaWx5ID0gJ0ludGVyJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoZmFtaWx5VmFsdWUuaW5jbHVkZXMoJ21vbm8nKSkge1xuICAgICAgICAgICAgICAgICAgICBmb250RmFtaWx5ID0gJ0pldEJyYWlucyBNb25vJzsgLy8gb3IgJ1NGIE1vbm8nLCAnQ29uc29sYXMnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGZhbWlseVZhbHVlLmluY2x1ZGVzKCdzZXJpZicpKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvbnRGYW1pbHkgPSAnVGltZXMnOyAvLyBvciBvdGhlciBzZXJpZiBmb250XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IGZvbnRXZWlnaHQgPSAnUmVndWxhcic7XG4gICAgICAgICAgICBpZiAoZm9udFdlaWdodFZhcikge1xuICAgICAgICAgICAgICAgIGNvbnN0IHdlaWdodCA9IGZvbnRXZWlnaHRWYXIudmFsdWVzQnlNb2RlW09iamVjdC5rZXlzKGZvbnRXZWlnaHRWYXIudmFsdWVzQnlNb2RlKVswXV07XG4gICAgICAgICAgICAgICAgaWYgKHdlaWdodCA+PSA4MDApXG4gICAgICAgICAgICAgICAgICAgIGZvbnRXZWlnaHQgPSAnRXh0cmFCb2xkJztcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh3ZWlnaHQgPj0gNzAwKVxuICAgICAgICAgICAgICAgICAgICBmb250V2VpZ2h0ID0gJ0JvbGQnO1xuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHdlaWdodCA+PSA2MDApXG4gICAgICAgICAgICAgICAgICAgIGZvbnRXZWlnaHQgPSAnU2VtaUJvbGQnO1xuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHdlaWdodCA+PSA1MDApXG4gICAgICAgICAgICAgICAgICAgIGZvbnRXZWlnaHQgPSAnTWVkaXVtJztcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh3ZWlnaHQgPj0gMzAwKVxuICAgICAgICAgICAgICAgICAgICBmb250V2VpZ2h0ID0gJ0xpZ2h0JztcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh3ZWlnaHQgPj0gMjAwKVxuICAgICAgICAgICAgICAgICAgICBmb250V2VpZ2h0ID0gJ0V4dHJhTGlnaHQnO1xuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHdlaWdodCA+PSAxMDApXG4gICAgICAgICAgICAgICAgICAgIGZvbnRXZWlnaHQgPSAnVGhpbic7XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICBmb250V2VpZ2h0ID0gJ1JlZ3VsYXInO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gU2V0IHRoZSBmb250IG5hbWUgdXNpbmcgdGhlIGRldGVybWluZWQgZmFtaWx5IGFuZCB3ZWlnaHRcbiAgICAgICAgICAgIHRleHRTdHlsZS5mb250TmFtZSA9IHsgZmFtaWx5OiBmb250RmFtaWx5LCBzdHlsZTogZm9udFdlaWdodCB9O1xuICAgICAgICAgICAgLy8gTm90ZTogVGV4dCBzdHlsZXMgaW4gRmlnbWEgZG9uJ3Qgc3VwcG9ydCB2YXJpYWJsZSByZWZlcmVuY2VzIGZvciBjb2xvcnMgeWV0XG4gICAgICAgICAgICAvLyBUaGUgY29sb3Igd2lsbCBuZWVkIHRvIGJlIGFwcGxpZWQgd2hlbiB1c2luZyB0aGUgdGV4dCBzdHlsZVxuICAgICAgICAgICAgY29uc29sZS5sb2coYOKchSBDcmVhdGVkIHRleHQgc3R5bGU6ICR7c3R5bGUubmFtZX1gKTtcbiAgICAgICAgICAgIGNyZWF0ZWRDb3VudCsrO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihg4p2MIEVycm9yIGNyZWF0aW5nIHRleHQgc3R5bGUgJHtzdHlsZS5uYW1lfTpgLCBlcnJvcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29uc29sZS5sb2coYPCfk4ogVGV4dCBzdHlsZXMgc3VtbWFyeTogJHtjcmVhdGVkQ291bnR9LyR7dGV4dFN0eWxlcy5sZW5ndGh9IGNyZWF0ZWQgc3VjY2Vzc2Z1bGx5YCk7XG59XG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIFVUSUxJVFkgRlVOQ1RJT05TXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIEhlbHBlciBmdW5jdGlvbiB0byBjcmVhdGUgdmFyaWFibGVzIHdpdGggZGVzY3JpcHRpb25zIGFuZCBzY29wZXNcbmZ1bmN0aW9uIGNyZWF0ZVZhcmlhYmxlV2l0aENvbmZpZyhjb2xsZWN0aW9uLCBuYW1lLCB0eXBlLCBkZXNjcmlwdGlvbiwgc2NvcGVzKSB7XG4gICAgLy8gU2FuaXRpemUgdGhlIHZhcmlhYmxlIG5hbWUgdG8gZW5zdXJlIGl0J3MgdmFsaWQgZm9yIEZpZ21hXG4gICAgY29uc3Qgc2FuaXRpemVkTmFtZSA9IHNhbml0aXplVmFyaWFibGVOYW1lKG5hbWUpO1xuICAgIGNvbnN0IGV4aXN0aW5nVmFyaWFibGUgPSBmaWdtYS52YXJpYWJsZXMuZ2V0TG9jYWxWYXJpYWJsZXMoKS5maW5kKHZhcmlhYmxlID0+IHZhcmlhYmxlLm5hbWUgPT09IHNhbml0aXplZE5hbWUgJiYgdmFyaWFibGUudmFyaWFibGVDb2xsZWN0aW9uSWQgPT09IGNvbGxlY3Rpb24uaWQpO1xuICAgIGlmIChleGlzdGluZ1ZhcmlhYmxlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGBWYXJpYWJsZSAke3Nhbml0aXplZE5hbWV9IGFscmVhZHkgZXhpc3RzLCB1cGRhdGluZy4uLmApO1xuICAgICAgICAvLyBVcGRhdGUgZXhpc3RpbmcgdmFyaWFibGUncyBkZXNjcmlwdGlvbiBhbmQgc2NvcGVzXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBleGlzdGluZ1ZhcmlhYmxlLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gICAgICAgICAgICBleGlzdGluZ1ZhcmlhYmxlLnNjb3BlcyA9IHNjb3BlcztcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgQ291bGQgbm90IHVwZGF0ZSB2YXJpYWJsZSBwcm9wZXJ0aWVzOiAke2Vycm9yfWApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBleGlzdGluZ1ZhcmlhYmxlO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBjb25zdCB2YXJpYWJsZSA9IGZpZ21hLnZhcmlhYmxlcy5jcmVhdGVWYXJpYWJsZShzYW5pdGl6ZWROYW1lLCBjb2xsZWN0aW9uLmlkLCB0eXBlKTtcbiAgICAgICAgdmFyaWFibGUuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgICAgICAgdmFyaWFibGUuc2NvcGVzID0gc2NvcGVzO1xuICAgICAgICBjb25zb2xlLmxvZyhg4pyFIENyZWF0ZWQgdmFyaWFibGU6ICR7c2FuaXRpemVkTmFtZX1gKTtcbiAgICAgICAgcmV0dXJuIHZhcmlhYmxlO1xuICAgIH1cbiAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihg4p2MIEVycm9yIGNyZWF0aW5nIHZhcmlhYmxlICR7c2FuaXRpemVkTmFtZX0gKG9yaWdpbmFsOiAke25hbWV9KTpgLCBlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxufVxuLy8gR2VuZXJhdGUgYXBwcm9wcmlhdGUgZGFyayBtb2RlIGNvbG9yc1xuZnVuY3Rpb24gZ2VuZXJhdGVEYXJrTW9kZUNvbG9yKGxpZ2h0UmdiLCBjb2xvck5hbWUpIHtcbiAgICBpZiAoIWxpZ2h0UmdiKVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAvLyBTdXJmYWNlIGNvbG9ycyBzaG91bGQgYmUgaW52ZXJ0ZWQgZm9yIGRhcmsgbW9kZVxuICAgIGlmIChjb2xvck5hbWUuaW5jbHVkZXMoJ3N1cmZhY2UnKSkge1xuICAgICAgICAvLyBNYWtlIHN1cmZhY2VzIGRhcmtlclxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcjogTWF0aC5tYXgoMCwgbGlnaHRSZ2IuciAtIDAuMSksXG4gICAgICAgICAgICBnOiBNYXRoLm1heCgwLCBsaWdodFJnYi5nIC0gMC4xKSxcbiAgICAgICAgICAgIGI6IE1hdGgubWF4KDAsIGxpZ2h0UmdiLmIgLSAwLjEpLFxuICAgICAgICAgICAgYTogbGlnaHRSZ2IuYSB8fCAxXG4gICAgICAgIH07XG4gICAgfVxuICAgIC8vIFRleHQgY29sb3JzIHNob3VsZCBiZSBsaWdodGVyIGZvciBkYXJrIG1vZGVcbiAgICBpZiAoY29sb3JOYW1lLmluY2x1ZGVzKCd0ZXh0JykpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHI6IE1hdGgubWluKDEsIGxpZ2h0UmdiLnIgKyAwLjIpLFxuICAgICAgICAgICAgZzogTWF0aC5taW4oMSwgbGlnaHRSZ2IuZyArIDAuMiksXG4gICAgICAgICAgICBiOiBNYXRoLm1pbigxLCBsaWdodFJnYi5iICsgMC4yKSxcbiAgICAgICAgICAgIGE6IGxpZ2h0UmdiLmEgfHwgMVxuICAgICAgICB9O1xuICAgIH1cbiAgICAvLyBEZWZhdWx0OiBrZWVwIHRoZSBzYW1lIGNvbG9yXG4gICAgcmV0dXJuIGxpZ2h0UmdiO1xufVxuLy8gQUJTVFJBQ1RFRCBTQ09QSU5HIFJVTEVTIC0gTkVWRVIgU0VUIENPTkZMSUNUSU5HIFNDT1BFU1xuY29uc3QgU0NPUEVfUlVMRVMgPSB7XG4gICAgQ09MT1I6IHtcbiAgICAgICAgLy8gVGV4dCBjb2xvcnMgLSBPTkxZIHRleHQgc2NvcGVcbiAgICAgICAgdGV4dDogWydURVhUX0ZJTEwnXSxcbiAgICAgICAgcGxhY2Vob2xkZXI6IFsnVEVYVF9GSUxMJ10sXG4gICAgICAgIGZvcmVncm91bmQ6IFsnVEVYVF9GSUxMJ10sXG4gICAgICAgIC8vIEJvcmRlciBjb2xvcnMgLSBPTkxZIHN0cm9rZSBzY29wZSAgXG4gICAgICAgIGJvcmRlcjogWydTVFJPS0VfQ09MT1InXSxcbiAgICAgICAgb3V0bGluZTogWydTVFJPS0VfQ09MT1InXSxcbiAgICAgICAgc3Ryb2tlOiBbJ1NUUk9LRV9DT0xPUiddLFxuICAgICAgICAvLyBCYWNrZ3JvdW5kIGNvbG9ycyAtIEZyYW1lIGFuZCBzaGFwZSBmaWxscyAoTk8gQUxMX0ZJTExTKVxuICAgICAgICBiYWNrZ3JvdW5kOiBbJ0ZSQU1FX0ZJTEwnLCAnU0hBUEVfRklMTCddLFxuICAgICAgICBzdXJmYWNlOiBbJ0ZSQU1FX0ZJTEwnLCAnU0hBUEVfRklMTCddLFxuICAgICAgICBmaWxsOiBbJ0ZSQU1FX0ZJTEwnLCAnU0hBUEVfRklMTCddLFxuICAgICAgICAvLyBTaGFkb3cvZWZmZWN0IGNvbG9yc1xuICAgICAgICBzaGFkb3c6IFsnRUZGRUNUX0NPTE9SJ10sXG4gICAgICAgIGdsb3c6IFsnRUZGRUNUX0NPTE9SJ10sXG4gICAgICAgIC8vIFN0YXR1cy9zZW1hbnRpYyBjb2xvcnMgLSBjYW4gYmUgdXNlZCBmb3IgbXVsdGlwbGUgcHVycG9zZXNcbiAgICAgICAgcHJpbWFyeTogWydGUkFNRV9GSUxMJywgJ1NIQVBFX0ZJTEwnLCAnVEVYVF9GSUxMJ10sXG4gICAgICAgIHNlY29uZGFyeTogWydGUkFNRV9GSUxMJywgJ1NIQVBFX0ZJTEwnLCAnVEVYVF9GSUxMJ10sXG4gICAgICAgIGFjY2VudDogWydGUkFNRV9GSUxMJywgJ1NIQVBFX0ZJTEwnLCAnVEVYVF9GSUxMJ10sXG4gICAgICAgIHN1Y2Nlc3M6IFsnRlJBTUVfRklMTCcsICdTSEFQRV9GSUxMJywgJ1RFWFRfRklMTCddLFxuICAgICAgICB3YXJuaW5nOiBbJ0ZSQU1FX0ZJTEwnLCAnU0hBUEVfRklMTCcsICdURVhUX0ZJTEwnXSxcbiAgICAgICAgZXJyb3I6IFsnRlJBTUVfRklMTCcsICdTSEFQRV9GSUxMJywgJ1RFWFRfRklMTCddLFxuICAgICAgICBpbmZvOiBbJ0ZSQU1FX0ZJTEwnLCAnU0hBUEVfRklMTCcsICdURVhUX0ZJTEwnXVxuICAgIH0sXG4gICAgRkxPQVQ6IHtcbiAgICAgICAgLy8gVHlwb2dyYXBoeVxuICAgICAgICBzaXplOiBbJ1RFWFRfQ09OVEVOVCddLFxuICAgICAgICAnZm9udC1zaXplJzogWydURVhUX0NPTlRFTlQnXSxcbiAgICAgICAgd2VpZ2h0OiBbJ1RFWFRfQ09OVEVOVCddLFxuICAgICAgICAnZm9udC13ZWlnaHQnOiBbJ1RFWFRfQ09OVEVOVCddLFxuICAgICAgICAnbGluZS1oZWlnaHQnOiBbJ1RFWFRfQ09OVEVOVCddLFxuICAgICAgICAnbGV0dGVyLXNwYWNpbmcnOiBbJ1RFWFRfQ09OVEVOVCddLFxuICAgICAgICAvLyBTcGFjaW5nXG4gICAgICAgIHBhZGRpbmc6IFsnR0FQJ10sXG4gICAgICAgIG1hcmdpbjogWydHQVAnXSxcbiAgICAgICAgc3BhY2luZzogWydHQVAnXSxcbiAgICAgICAgZ2FwOiBbJ0dBUCddLFxuICAgICAgICAvLyBCb3JkZXIgcmFkaXVzXG4gICAgICAgIHJhZGl1czogWydDT1JORVJfUkFESVVTJ10sXG4gICAgICAgICdib3JkZXItcmFkaXVzJzogWydDT1JORVJfUkFESVVTJ10sXG4gICAgICAgIHJvdW5kZWQ6IFsnQ09STkVSX1JBRElVUyddLFxuICAgICAgICAvLyBEaW1lbnNpb25zXG4gICAgICAgIHdpZHRoOiBbJ1dJRFRIX0hFSUdIVCddLFxuICAgICAgICBoZWlnaHQ6IFsnV0lEVEhfSEVJR0hUJ10sXG4gICAgICAgIC8vIE9wYWNpdHlcbiAgICAgICAgb3BhY2l0eTogWydPUEFDSVRZJ10sXG4gICAgICAgIGFscGhhOiBbJ09QQUNJVFknXVxuICAgIH0sXG4gICAgU1RSSU5HOiB7XG4gICAgICAgIC8vIEZvbnQgZmFtaWxpZXMgYW5kIHRleHQgY29udGVudFxuICAgICAgICBmb250OiBbJ1RFWFRfQ09OVEVOVCddLFxuICAgICAgICBmYW1pbHk6IFsnVEVYVF9DT05URU5UJ10sXG4gICAgICAgIGNvbnRlbnQ6IFsnVEVYVF9DT05URU5UJ11cbiAgICB9LFxuICAgIEJPT0xFQU46IHtcbiAgICAgICAgLy8gQm9vbGVhbiB2YXJpYWJsZXMgdHlwaWNhbGx5IGRvbid0IGhhdmUgc2NvcGVzLCByZXR1cm4gZW1wdHkgYXJyYXlcbiAgICAgICAgYm9vbGVhbjogW11cbiAgICB9XG59O1xuZnVuY3Rpb24gZ2V0SW50ZWxsaWdlbnRTY29wZXModmFyaWFibGVOYW1lLCB2YXJpYWJsZVR5cGUpIHtcbiAgICBjb25zdCBuYW1lID0gdmFyaWFibGVOYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgY29uc3QgcnVsZXMgPSBTQ09QRV9SVUxFU1t2YXJpYWJsZVR5cGVdO1xuICAgIGlmICghcnVsZXMpIHtcbiAgICAgICAgY29uc29sZS53YXJuKGBObyBzY29wZSBydWxlcyBmb3VuZCBmb3IgdHlwZTogJHt2YXJpYWJsZVR5cGV9YCk7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gICAgLy8gRmluZCB0aGUgZmlyc3QgbWF0Y2hpbmcgcnVsZVxuICAgIGZvciAoY29uc3QgW2tleXdvcmQsIHNjb3Blc10gb2YgT2JqZWN0LmVudHJpZXMocnVsZXMpKSB7XG4gICAgICAgIGlmIChuYW1lLmluY2x1ZGVzKGtleXdvcmQpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgQXBwbGllZCBzY29wZSBydWxlIFwiJHtrZXl3b3JkfVwiIHRvIFwiJHt2YXJpYWJsZU5hbWV9XCI6IFske3Njb3Blcy5qb2luKCcsICcpfV1gKTtcbiAgICAgICAgICAgIHJldHVybiBzY29wZXM7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gRGVmYXVsdCBzY29wZXMgYmFzZWQgb24gdHlwZVxuICAgIGlmICh2YXJpYWJsZVR5cGUgPT09ICdDT0xPUicpIHtcbiAgICAgICAgLy8gR2VuZXJpYyBjb2xvciAtIHNhZmUgZGVmYXVsdCAoTk8gQUxMX0ZJTExTIHRvIGF2b2lkIGNvbmZsaWN0cylcbiAgICAgICAgcmV0dXJuIFsnRlJBTUVfRklMTCcsICdTSEFQRV9GSUxMJ107XG4gICAgfVxuICAgIGlmICh2YXJpYWJsZVR5cGUgPT09ICdGTE9BVCcpIHtcbiAgICAgICAgLy8gRGVmYXVsdCBmb3IgbnVtYmVycyAtIG1vc3QgY29tbW9ubHkgdXNlZCBmb3Igc3BhY2luZ1xuICAgICAgICByZXR1cm4gWydHQVAnXTtcbiAgICB9XG4gICAgaWYgKHZhcmlhYmxlVHlwZSA9PT0gJ1NUUklORycpIHtcbiAgICAgICAgLy8gRGVmYXVsdCBmb3Igc3RyaW5ncyAtIG1vc3QgY29tbW9ubHkgdXNlZCBmb3IgdGV4dCBjb250ZW50XG4gICAgICAgIHJldHVybiBbJ1RFWFRfQ09OVEVOVCddO1xuICAgIH1cbiAgICAvLyBGYWxsYmFjayAtIHJldHVybiBlbXB0eSBhcnJheSB0byBhdm9pZCBzY29wZSBjb25mbGljdHNcbiAgICBjb25zb2xlLndhcm4oYE5vIGRlZmF1bHQgc2NvcGUgZm91bmQgZm9yIHR5cGU6ICR7dmFyaWFibGVUeXBlfSwgcmV0dXJuaW5nIGVtcHR5IHNjb3Blc2ApO1xuICAgIHJldHVybiBbXTtcbn1cbi8vIEVuaGFuY2VkIGNvbG9yIHBhcnNlciB0byBoYW5kbGUgaGV4LCByZ2JhLCByZ2IsIGhzbCwgYW5kIG90aGVyIGZvcm1hdHNcbmZ1bmN0aW9uIHBhcnNlQ29sb3JUb1JnYihjb2xvcikge1xuICAgIC8vIFJlbW92ZSB3aGl0ZXNwYWNlXG4gICAgY29sb3IgPSBjb2xvci50cmltKCk7XG4gICAgLy8gSGFuZGxlIGhleCBjb2xvcnNcbiAgICBpZiAoY29sb3Iuc3RhcnRzV2l0aCgnIycpKSB7XG4gICAgICAgIGNvbnN0IGhleCA9IGNvbG9yLnNsaWNlKDEpO1xuICAgICAgICBpZiAoaGV4Lmxlbmd0aCA9PT0gMykge1xuICAgICAgICAgICAgLy8gU2hvcnQgaGV4XG4gICAgICAgICAgICBjb25zdCByID0gcGFyc2VJbnQoaGV4WzBdICsgaGV4WzBdLCAxNikgLyAyNTU7XG4gICAgICAgICAgICBjb25zdCBnID0gcGFyc2VJbnQoaGV4WzFdICsgaGV4WzFdLCAxNikgLyAyNTU7XG4gICAgICAgICAgICBjb25zdCBiID0gcGFyc2VJbnQoaGV4WzJdICsgaGV4WzJdLCAxNikgLyAyNTU7XG4gICAgICAgICAgICByZXR1cm4geyByLCBnLCBiIH07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaGV4Lmxlbmd0aCA9PT0gNikge1xuICAgICAgICAgICAgLy8gTG9uZyBoZXhcbiAgICAgICAgICAgIGNvbnN0IHIgPSBwYXJzZUludChoZXguc2xpY2UoMCwgMiksIDE2KSAvIDI1NTtcbiAgICAgICAgICAgIGNvbnN0IGcgPSBwYXJzZUludChoZXguc2xpY2UoMiwgNCksIDE2KSAvIDI1NTtcbiAgICAgICAgICAgIGNvbnN0IGIgPSBwYXJzZUludChoZXguc2xpY2UoNCwgNiksIDE2KSAvIDI1NTtcbiAgICAgICAgICAgIHJldHVybiB7IHIsIGcsIGIgfTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChoZXgubGVuZ3RoID09PSA4KSB7XG4gICAgICAgICAgICAvLyBIZXggd2l0aCBhbHBoYVxuICAgICAgICAgICAgY29uc3QgciA9IHBhcnNlSW50KGhleC5zbGljZSgwLCAyKSwgMTYpIC8gMjU1O1xuICAgICAgICAgICAgY29uc3QgZyA9IHBhcnNlSW50KGhleC5zbGljZSgyLCA0KSwgMTYpIC8gMjU1O1xuICAgICAgICAgICAgY29uc3QgYiA9IHBhcnNlSW50KGhleC5zbGljZSg0LCA2KSwgMTYpIC8gMjU1O1xuICAgICAgICAgICAgY29uc3QgYSA9IHBhcnNlSW50KGhleC5zbGljZSg2LCA4KSwgMTYpIC8gMjU1O1xuICAgICAgICAgICAgcmV0dXJuIHsgciwgZywgYiwgYSB9O1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIEhhbmRsZSByZ2JhL3JnYlxuICAgIGlmIChjb2xvci5zdGFydHNXaXRoKCdyZ2InKSkge1xuICAgICAgICBjb25zdCBtYXRjaCA9IGNvbG9yLm1hdGNoKC9yZ2JhP1xcKChbXildKylcXCkvKTtcbiAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZXMgPSBtYXRjaFsxXS5zcGxpdCgnLCcpLm1hcCh2ID0+IHYudHJpbSgpKTtcbiAgICAgICAgICAgIGNvbnN0IHIgPSBwYXJzZUludCh2YWx1ZXNbMF0pIC8gMjU1O1xuICAgICAgICAgICAgY29uc3QgZyA9IHBhcnNlSW50KHZhbHVlc1sxXSkgLyAyNTU7XG4gICAgICAgICAgICBjb25zdCBiID0gcGFyc2VJbnQodmFsdWVzWzJdKSAvIDI1NTtcbiAgICAgICAgICAgIGNvbnN0IGEgPSB2YWx1ZXNbM10gPyBwYXJzZUZsb2F0KHZhbHVlc1szXSkgOiAxO1xuICAgICAgICAgICAgcmV0dXJuIHsgciwgZywgYiwgYSB9O1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIEhhbmRsZSBzcGVjaWFsIGNvbG9yc1xuICAgIGlmIChjb2xvciA9PT0gJ3RyYW5zcGFyZW50Jykge1xuICAgICAgICByZXR1cm4geyByOiAwLCBnOiAwLCBiOiAwLCBhOiAwIH07XG4gICAgfVxuICAgIGNvbnNvbGUud2FybihgQ291bGQgbm90IHBhcnNlIGNvbG9yOiAke2NvbG9yfWApO1xuICAgIHJldHVybiBudWxsO1xufVxuLy8gRXhwb3J0IGZ1bmN0aW9uIGZvciB0b2tlbnMtb25seSBzeW5jICh3aXRob3V0IHRleHQgc3R5bGVzKVxuYXN5bmMgZnVuY3Rpb24gY3JlYXRlVmFyaWFibGVzRnJvbVRhaWx3aW5kVG9rZW5zT25seShjb2xsZWN0aW9uLCB0YWlsd2luZENvbmZpZykge1xuICAgIGNvbnNvbGUubG9nKCfwn46oIFN0YXJ0aW5nIERlc2lnbiBUb2tlbnMgc3luYyAodmFyaWFibGVzIG9ubHkpLi4uJyk7XG4gICAgY29uc29sZS5sb2coJ/Cfk4sgU2ltcGxlIHN0cnVjdHVyZTogRm91bmRhdGlvbiDihpIgU2VtYW50aWMg4oaSIEJyYW5kJyk7XG4gICAgY29uc3QgdG90YWxTdGFydCA9IERhdGUubm93KCk7XG4gICAgbGV0IHRvdGFsVmFyaWFibGVzID0gMDtcbiAgICBjb25zdCBtb2RlcyA9IGNvbGxlY3Rpb24ubW9kZXM7XG4gICAgY29uc3QgbGlnaHRNb2RlSWQgPSBtb2Rlc1swXS5tb2RlSWQ7XG4gICAgY29uc3QgZGFya01vZGVJZCA9IG1vZGVzLmxlbmd0aCA+IDEgPyBtb2Rlc1sxXS5tb2RlSWQgOiBsaWdodE1vZGVJZDtcbiAgICAvLyBST09UIExFVkVMIEdST1VQU1xuICAgIGNvbnNvbGUubG9nKCfwn4+X77iPIENyZWF0aW5nIEZvdW5kYXRpb24gKEJhc2UgVmFsdWVzKScpO1xuICAgIHRvdGFsVmFyaWFibGVzICs9IGF3YWl0IGNyZWF0ZUZvdW5kYXRpb24oY29sbGVjdGlvbiwgdGFpbHdpbmRDb25maWcsIGxpZ2h0TW9kZUlkLCBkYXJrTW9kZUlkKTtcbiAgICBjb25zb2xlLmxvZygn8J+OryBDcmVhdGluZyBTZW1hbnRpYyAoUHVycG9zZS1iYXNlZCknKTtcbiAgICB0b3RhbFZhcmlhYmxlcyArPSBhd2FpdCBjcmVhdGVTZW1hbnRpYyhjb2xsZWN0aW9uLCBsaWdodE1vZGVJZCwgZGFya01vZGVJZCk7XG4gICAgY29uc29sZS5sb2coJ/Cfj6IgQ3JlYXRpbmcgQnJhbmQgKFNlZG9uYSBJZGVudGl0eSknKTtcbiAgICB0b3RhbFZhcmlhYmxlcyArPSBhd2FpdCBjcmVhdGVCcmFuZChjb2xsZWN0aW9uLCBsaWdodE1vZGVJZCwgZGFya01vZGVJZCk7XG4gICAgY29uc3QgdG90YWxUaW1lID0gRGF0ZS5ub3coKSAtIHRvdGFsU3RhcnQ7XG4gICAgY29uc29sZS5sb2coJ+KchSBEZXNpZ24gVG9rZW5zIHN5bmMgY29tcGxldGUhJyk7XG4gICAgY29uc29sZS5sb2coYPCfk4ogVG90YWw6ICR7dG90YWxWYXJpYWJsZXN9IHZhcmlhYmxlcyBpbiAke3RvdGFsVGltZX1tc2ApO1xufVxuLy8gRXhwb3J0IGZ1bmN0aW9uIGZvciB0ZXh0IHN0eWxlcyBvbmx5XG5hc3luYyBmdW5jdGlvbiBjcmVhdGVUZXh0U3R5bGVzRnJvbVZhcmlhYmxlcyhjb2xsZWN0aW9uKSB7XG4gICAgY29uc29sZS5sb2coJ/Cfk50gU3RhcnRpbmcgVGV4dCBTdHlsZXMgY3JlYXRpb24uLi4nKTtcbiAgICB0cnkge1xuICAgICAgICBhd2FpdCBjcmVhdGVUZXh0U3R5bGVzKGNvbGxlY3Rpb24pO1xuICAgICAgICBjb25zb2xlLmxvZygn4pyFIFRleHQgc3R5bGVzIGNyZWF0ZWQgc3VjY2Vzc2Z1bGx5Jyk7XG4gICAgfVxuICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKCfinYwgRVJST1IgaW4gY3JlYXRlVGV4dFN0eWxlc0Zyb21WYXJpYWJsZXM6JywgZXJyb3IpO1xuICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG59XG4vLyBMZWdhY3kgc3luYyBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eVxuYXN5bmMgZnVuY3Rpb24gc3luY0NvbXBvbmVudHNUb0ZpZ21hKGNvbXBvbmVudHMpIHtcbiAgICBjb25zb2xlLmxvZygnTGVnYWN5IHN5bmMgZnVuY3Rpb24gY2FsbGVkLCByZWRpcmVjdGluZyB0byBtYWluIHN5bmMuLi4nKTtcbiAgICAvLyBUaGlzIGZ1bmN0aW9uIGV4aXN0cyBmb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHkgYnV0IGRvZXNuJ3QgZG8gYW55dGhpbmdcbiAgICByZXR1cm47XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZ2V0VGFpbHdpbmRDb25maWcgPSBnZXRUYWlsd2luZENvbmZpZztcbi8vIFRhaWx3aW5kIGNvbmZpZyByZWFkZXIgLSByZWFkcyB0aGUgYWN0dWFsIHRhaWx3aW5kLmNvbmZpZy50cyBmcm9tIHRoZSBwcm9qZWN0XG5mdW5jdGlvbiBnZXRUYWlsd2luZENvbmZpZygpIHtcbiAgICAvLyBSZXR1cm4gdGhlIGNvbXBsZXRlIFpldXMgZGVzaWduIHN5c3RlbSBmcm9tIHRoZSBhY3R1YWwgVGFpbHdpbmQgY29uZmlnXG4gICAgcmV0dXJuIHtcbiAgICAgICAgY29sb3JzOiB7XG4gICAgICAgICAgICAvLyBaZXVzIGNvbG9yIHN5c3RlbSAtIENPTVBMRVRFIHBhbGV0dGUgZnJvbSBGaWdtYVxuICAgICAgICAgICAgemV1czoge1xuICAgICAgICAgICAgICAgIC8vIFN1cmZhY2UgY29sb3JzXG4gICAgICAgICAgICAgICAgXCJzdXJmYWNlLWRlZmF1bHRcIjogXCIjMWUxYzE3XCIsXG4gICAgICAgICAgICAgICAgXCJzdXJmYWNlLW5ldXRyYWxcIjogXCIjMmUyYjI0XCIsXG4gICAgICAgICAgICAgICAgXCJzdXJmYWNlLW5ldXRyYWwtc3VidGxlXCI6IFwiIzNlM2EzMVwiLFxuICAgICAgICAgICAgICAgIFwic3VyZmFjZS13YXJuaW5nXCI6IFwiIzJlMjMxOVwiLFxuICAgICAgICAgICAgICAgIFwic3VyZmFjZS13YXJuaW5nLWFjY2VudFwiOiBcIiNmYjk3MDRcIixcbiAgICAgICAgICAgICAgICBcInN1cmZhY2UtZGVzdHJ1Y3RpdmVcIjogXCIjMmUxYjE5XCIsXG4gICAgICAgICAgICAgICAgXCJzdXJmYWNlLWRlc3RydWN0aXZlLWFjY2VudFwiOiBcIiNlYTFlMDRcIixcbiAgICAgICAgICAgICAgICBcInN1cmZhY2UtaW5mb1wiOiBcIiMxZTIyMjhcIixcbiAgICAgICAgICAgICAgICBcInN1cmZhY2UtaW5mby1hY2NlbnRcIjogXCIjMzk3ZmIyXCIsXG4gICAgICAgICAgICAgICAgXCJzdXJmYWNlLXN1Y2Nlc3NcIjogXCIjMWUyODIxXCIsXG4gICAgICAgICAgICAgICAgXCJzdXJmYWNlLXN1Y2Nlc3MtYWNjZW50XCI6IFwiIzIxYTY1ZVwiLFxuICAgICAgICAgICAgICAgIC8vIFRleHQgY29sb3JzIChjb21wbGV0ZSBzZXQpXG4gICAgICAgICAgICAgICAgXCJ0ZXh0LXByaW1hcnlcIjogXCIjZmZmZmZmXCIsXG4gICAgICAgICAgICAgICAgXCJ0ZXh0LXNlY29uZGFyeVwiOiBcIiNmZmZmZmY5OVwiLCAvLyA2MCUgb3BhY2l0eVxuICAgICAgICAgICAgICAgIFwidGV4dC10ZXJ0aWFyeVwiOiBcIiNmZmZmZmY3NVwiLCAvLyA0NiUgb3BhY2l0eVxuICAgICAgICAgICAgICAgIFwidGV4dC1xdWF0ZXJuYXJ5XCI6IFwiI2ZmZmZmZjQwXCIsIC8vIDI1JSBvcGFjaXR5XG4gICAgICAgICAgICAgICAgXCJ0ZXh0LWludmVydGVkXCI6IFwiIzFlMWMxN1wiLFxuICAgICAgICAgICAgICAgIFwidGV4dC1pbnZlcnRlZC1zZWNvbmRhcnlcIjogXCIjMWUxYzE3OTlcIiwgLy8gNjAlIG9wYWNpdHlcbiAgICAgICAgICAgICAgICBcInRleHQtZGlzYWJsZWRcIjogXCIjZmZmZmZmMWFcIiwgLy8gMTAlIG9wYWNpdHlcbiAgICAgICAgICAgICAgICAvLyBJY29uIGNvbG9ycyAoY29tcGxldGUgc2V0KVxuICAgICAgICAgICAgICAgIFwiaWNvbi1wcmltYXJ5XCI6IFwiI2ZmZmZmZlwiLFxuICAgICAgICAgICAgICAgIFwiaWNvbi1zZWNvbmRhcnlcIjogXCIjZmZmZmZmOTlcIiwgLy8gNjAlIG9wYWNpdHlcbiAgICAgICAgICAgICAgICBcImljb24tdGVydGlhcnlcIjogXCIjZmZmZmZmNzVcIiwgLy8gNDYlIG9wYWNpdHlcbiAgICAgICAgICAgICAgICBcImljb24taW52ZXJ0ZWRcIjogXCIjMWUxYzE3XCIsXG4gICAgICAgICAgICAgICAgXCJpY29uLWRpc2FibGVkXCI6IFwiI2ZmZmZmZjFhXCIsIC8vIDEwJSBvcGFjaXR5XG4gICAgICAgICAgICAgICAgLy8gQm9yZGVyIGNvbG9ycyAoY29tcGxldGUgc2V0KVxuICAgICAgICAgICAgICAgIFwiYm9yZGVyLW5vcm1hbFwiOiBcIiNmZmZmZmYyZVwiLCAvLyAxOCUgb3BhY2l0eVxuICAgICAgICAgICAgICAgIFwiYm9yZGVyLWFscGhhXCI6IFwiI2ZmZmZmZjI0XCIsIC8vIDE0JSBvcGFjaXR5ICBcbiAgICAgICAgICAgICAgICBcImJvcmRlci1kaXZpZGVyXCI6IFwiI2ZmZmZmZjI0XCIsIC8vIDE0JSBvcGFjaXR5XG4gICAgICAgICAgICAgICAgXCJib3JkZXItbmV1dHJhbC1zdWJ0bGVcIjogXCIjZmZmZmZmM2RcIiwgLy8gMjQlIG9wYWNpdHlcbiAgICAgICAgICAgICAgICBcImJvcmRlci1zdXJmYWNlXCI6IFwiIzFlMWMxN1wiLFxuICAgICAgICAgICAgICAgIFwiYm9yZGVyLWZvY3VzZWRcIjogXCIjZmZmZmZmNGRcIiwgLy8gMzAlIG9wYWNpdHlcbiAgICAgICAgICAgICAgICBcImJvcmRlci1kaXNhYmxlZFwiOiBcIiNmZmZmZmYwZFwiLCAvLyA1JSBvcGFjaXR5XG4gICAgICAgICAgICAgICAgLy8gQnV0dG9uIGJhY2tncm91bmRzIChjb21wbGV0ZSBzZXQpXG4gICAgICAgICAgICAgICAgXCJidXR0b24tc2Vjb25kYXJ5XCI6IFwiIzJlMmIyNFwiLFxuICAgICAgICAgICAgICAgIFwiYnV0dG9uLXRlcnRpYXJ5XCI6IFwiI2ZmZmZmZjE0XCIsIC8vIDglIG9wYWNpdHlcbiAgICAgICAgICAgICAgICBcImJ1dHRvbi1naG9zdFwiOiBcIiNmZmZmZmYwMFwiLCAvLyB0cmFuc3BhcmVudFxuICAgICAgICAgICAgICAgIFwiYnV0dG9uLWRpc2FibGVkXCI6IFwiI2ZmZmZmZjBkXCIsIC8vIDUlIG9wYWNpdHlcbiAgICAgICAgICAgICAgICAvLyBCYWRnZS9hY2NlbnQgYmFja2dyb3VuZHNcbiAgICAgICAgICAgICAgICBcImJhZGdlLXN1cmZhY2VcIjogXCIjMWYyMjI4XCIsXG4gICAgICAgICAgICAgICAgXCJiYWRnZS1uZXV0cmFsXCI6IFwiIzJlMmIyNFwiLFxuICAgICAgICAgICAgICAgIFwiYmFkZ2Utd2FybmluZ1wiOiBcIiMyZTIzMTlcIixcbiAgICAgICAgICAgICAgICBcImJhZGdlLWRlc3RydWN0aXZlXCI6IFwiIzJlMWIxOVwiLFxuICAgICAgICAgICAgICAgIFwiYmFkZ2UtaW5mb1wiOiBcIiMxZTIyMjhcIixcbiAgICAgICAgICAgICAgICBcImJhZGdlLXN1Y2Nlc3NcIjogXCIjMWUyODIxXCIsXG4gICAgICAgICAgICAgICAgLy8gQWNjZW50IGNvbG9ycyAoY29tcGxldGUgc2V0KVxuICAgICAgICAgICAgICAgIFwiYWNjZW50LXJlZFwiOiBcIiNkOTI4MWNcIixcbiAgICAgICAgICAgICAgICBcImFjY2VudC1yZWQtc2Vjb25kYXJ5XCI6IFwiI2ZmZmZmZjgwXCIsXG4gICAgICAgICAgICAgICAgXCJhY2NlbnQtcmVkLWFjY2VudFwiOiBcIiNlNjQ4M2RcIixcbiAgICAgICAgICAgICAgICBcImFjY2VudC1yZWQtc3VidGxlXCI6IFwiIzJlMWIxOVwiLFxuICAgICAgICAgICAgICAgIFwiYWNjZW50LW9yYW5nZVwiOiBcIiNmYjk3MDRcIixcbiAgICAgICAgICAgICAgICBcImFjY2VudC1vcmFuZ2Utc2Vjb25kYXJ5XCI6IFwiI2ZmZmZmZjgwXCIsXG4gICAgICAgICAgICAgICAgXCJhY2NlbnQtb3JhbmdlLXN1YnRsZVwiOiBcIiMyZTIzMTlcIixcbiAgICAgICAgICAgICAgICBcImFjY2VudC15ZWxsb3dcIjogXCIjZmRkODM1XCIsXG4gICAgICAgICAgICAgICAgXCJhY2NlbnQteWVsbG93LXNlY29uZGFyeVwiOiBcIiNmZmZmZmY4MFwiLFxuICAgICAgICAgICAgICAgIFwiYWNjZW50LXllbGxvdy1zdWJ0bGVcIjogXCIjMmUyYjE5XCIsXG4gICAgICAgICAgICAgICAgXCJhY2NlbnQtZ3JlZW5cIjogXCIjMjFhNjVlXCIsXG4gICAgICAgICAgICAgICAgXCJhY2NlbnQtZ3JlZW4tc2Vjb25kYXJ5XCI6IFwiI2ZmZmZmZjgwXCIsXG4gICAgICAgICAgICAgICAgXCJhY2NlbnQtZ3JlZW4tYWNjZW50XCI6IFwiIzI2YmQ2Y1wiLFxuICAgICAgICAgICAgICAgIFwiYWNjZW50LWdyZWVuLXN1YnRsZVwiOiBcIiMxZTI4MjFcIixcbiAgICAgICAgICAgICAgICBcImFjY2VudC1ibHVlXCI6IFwiIzM5N2ZiMlwiLFxuICAgICAgICAgICAgICAgIFwiYWNjZW50LWJsdWUtc2Vjb25kYXJ5XCI6IFwiI2ZmZmZmZjgwXCIsXG4gICAgICAgICAgICAgICAgXCJhY2NlbnQtYmx1ZS1hY2NlbnRcIjogXCIjNDc3OGY1XCIsXG4gICAgICAgICAgICAgICAgXCJhY2NlbnQtYmx1ZS1zdWJ0bGVcIjogXCIjMWUyMjI4XCIsXG4gICAgICAgICAgICAgICAgXCJhY2NlbnQtcHVycGxlXCI6IFwiIzhiNWNmNlwiLFxuICAgICAgICAgICAgICAgIFwiYWNjZW50LXB1cnBsZS1zZWNvbmRhcnlcIjogXCIjZmZmZmZmODBcIixcbiAgICAgICAgICAgICAgICBcImFjY2VudC1wdXJwbGUtc3VidGxlXCI6IFwiIzI1MWUyZVwiLFxuICAgICAgICAgICAgICAgIFwiYWNjZW50LXBpbmtcIjogXCIjZWM0ODk5XCIsXG4gICAgICAgICAgICAgICAgXCJhY2NlbnQtcGluay1zZWNvbmRhcnlcIjogXCIjZmZmZmZmODBcIixcbiAgICAgICAgICAgICAgICBcImFjY2VudC1waW5rLXN1YnRsZVwiOiBcIiMyZTFlMjhcIixcbiAgICAgICAgICAgICAgICBcImFjY2VudC1ncmF5XCI6IFwiIzZiNzI4MFwiLFxuICAgICAgICAgICAgICAgIFwiYWNjZW50LWdyYXktc2Vjb25kYXJ5XCI6IFwiI2ZmZmZmZjgwXCIsXG4gICAgICAgICAgICAgICAgXCJhY2NlbnQtZ3JheS1zdWJ0bGVcIjogXCIjMWYyMjI4XCIsXG4gICAgICAgICAgICAgICAgLy8gU3RhdHVzIGNvbG9ycyAoY29tcGxldGUgc2V0KVxuICAgICAgICAgICAgICAgIFwic3RhdHVzLXN1Y2Nlc3NcIjogXCIjMzM5OTY1XCIsXG4gICAgICAgICAgICAgICAgXCJzdGF0dXMtc3VjY2Vzcy1zZWNvbmRhcnlcIjogXCIjMzM5OTY1OTlcIixcbiAgICAgICAgICAgICAgICBcInN0YXR1cy1zdWNjZXNzLXN1YnRsZVwiOiBcIiMxZTI4MjFcIixcbiAgICAgICAgICAgICAgICBcInN0YXR1cy13YXJuaW5nXCI6IFwiI2Y0OGUyZlwiLFxuICAgICAgICAgICAgICAgIFwic3RhdHVzLXdhcm5pbmctc2Vjb25kYXJ5XCI6IFwiI2Y0OGUyZjk5XCIsXG4gICAgICAgICAgICAgICAgXCJzdGF0dXMtd2FybmluZy1zdWJ0bGVcIjogXCIjMmUyMzE5XCIsXG4gICAgICAgICAgICAgICAgXCJzdGF0dXMtZGVzdHJ1Y3RpdmVcIjogXCIjZTY0ODNkXCIsXG4gICAgICAgICAgICAgICAgXCJzdGF0dXMtZGVzdHJ1Y3RpdmUtc2Vjb25kYXJ5XCI6IFwiI2U2NDgzZGIyXCIsXG4gICAgICAgICAgICAgICAgXCJzdGF0dXMtZGVzdHJ1Y3RpdmUtc3VidGxlXCI6IFwiIzJlMWIxOVwiLFxuICAgICAgICAgICAgICAgIFwic3RhdHVzLWluZm9cIjogXCIjMzk3ZmIyXCIsXG4gICAgICAgICAgICAgICAgXCJzdGF0dXMtaW5mby1zZWNvbmRhcnlcIjogXCIjMzk3ZmIyOTlcIixcbiAgICAgICAgICAgICAgICBcInN0YXR1cy1pbmZvLXN1YnRsZVwiOiBcIiMxZTIyMjhcIixcbiAgICAgICAgICAgICAgICAvLyBPdmVybGF5IGNvbG9yc1xuICAgICAgICAgICAgICAgIFwib3ZlcmxheS1saWdodFwiOiBcIiNmZmZmZmYwZFwiLCAvLyA1JSBvcGFjaXR5XG4gICAgICAgICAgICAgICAgXCJvdmVybGF5LW1lZGl1bVwiOiBcIiNmZmZmZmYxYVwiLCAvLyAxMCUgb3BhY2l0eVxuICAgICAgICAgICAgICAgIFwib3ZlcmxheS1oZWF2eVwiOiBcIiNmZmZmZmY0MFwiLCAvLyAyNSUgb3BhY2l0eVxuICAgICAgICAgICAgICAgIFwib3ZlcmxheS1iYWNrZHJvcFwiOiBcIiMwMDAwMDBiM1wiLCAvLyA3MCUgYmxhY2tcbiAgICAgICAgICAgICAgICAvLyBHcmFkaWVudCBjb2xvcnNcbiAgICAgICAgICAgICAgICBcImdyYWRpZW50LXN0YXJ0XCI6IFwiIzFlMWMxN1wiLFxuICAgICAgICAgICAgICAgIFwiZ3JhZGllbnQtbWlkZGxlXCI6IFwiIzJlMmIyNFwiLFxuICAgICAgICAgICAgICAgIFwiZ3JhZGllbnQtZW5kXCI6IFwiIzNlM2EzMVwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIFNlZG9uYSBkZXNpZ24gc3lzdGVtIGNvbG9ycyBmcm9tIEZpZ21hXG4gICAgICAgICAgICBzZWRvbmE6IHtcbiAgICAgICAgICAgICAgICA1MDogXCIjZmVmN2VkXCIsXG4gICAgICAgICAgICAgICAgMTAwOiBcIiNmZGVhZDVcIixcbiAgICAgICAgICAgICAgICAyMDA6IFwiI2ZiZDFhYVwiLFxuICAgICAgICAgICAgICAgIDMwMDogXCIjZjdiMTc0XCIsXG4gICAgICAgICAgICAgICAgNDAwOiBcIiNmMjg4M2NcIixcbiAgICAgICAgICAgICAgICA1MDA6IFwiI2RlNzAwMVwiLCAvLyBQcmltYXJ5IFNlZG9uYSBvcmFuZ2VcbiAgICAgICAgICAgICAgICA2MDA6IFwiI2MyNWUwMFwiLFxuICAgICAgICAgICAgICAgIDcwMDogXCIjYTE0ODAwXCIsXG4gICAgICAgICAgICAgICAgODAwOiBcIiM4MzNiMDJcIixcbiAgICAgICAgICAgICAgICA5MDA6IFwiIzZjMzEwOFwiLFxuICAgICAgICAgICAgICAgIC8vIERlc2lnbiBzeXN0ZW0gc2VtYW50aWMgY29sb3JzXG4gICAgICAgICAgICAgICAgcHJpbWFyeTogXCIjZGU3MDAxXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gQnV0dG9uIGNvbG9ycyBmcm9tIGRlc2lnbiB0b2tlbnMgIFxuICAgICAgICAgICAgJ2J1dHRvbi1zZWNvbmRhcnknOiBcIiMxNDE1MWFcIixcbiAgICAgICAgICAgICdidXR0b24tdGVydGlhcnknOiBcInJnYmEoMTAsIDE1LCA0MSwgMC4wNClcIiwgLy8gRnJvbSBGaWdtYSBleGFjdGx5XG4gICAgICAgICAgICAnYnV0dG9uLWdob3N0JzogXCJ0cmFuc3BhcmVudFwiLFxuICAgICAgICAgICAgLy8gU3RhdHVzIGNvbG9ycyBmcm9tIGRlc2lnblxuICAgICAgICAgICAgc3VjY2Vzczoge1xuICAgICAgICAgICAgICAgIERFRkFVTFQ6IFwiIzEwYjk4MVwiLFxuICAgICAgICAgICAgICAgIGZvcmVncm91bmQ6IFwiIzA2NWY0NlwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHdhcm5pbmc6IHtcbiAgICAgICAgICAgICAgICBERUZBVUxUOiBcIiNmNTllMGJcIixcbiAgICAgICAgICAgICAgICBmb3JlZ3JvdW5kOiBcIiM5MjQwMGVcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkYW5nZXI6IHtcbiAgICAgICAgICAgICAgICBERUZBVUxUOiBcIiNlNjQ4M2RcIiwgLy8gRnJvbSBGaWdtYSBkaXNjb25uZWN0IGJ1dHRvblxuICAgICAgICAgICAgICAgIGZvcmVncm91bmQ6IFwiIzk5MWIxYlwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIFNlbWFudGljIGNvbG9ycyB1c2luZyBDU1MgdmFyaWFibGVzXG4gICAgICAgICAgICBib3JkZXI6IFwiaHNsKHZhcigtLWJvcmRlcikpXCIsXG4gICAgICAgICAgICBpbnB1dDogXCJoc2wodmFyKC0taW5wdXQpKVwiLFxuICAgICAgICAgICAgcmluZzogXCJoc2wodmFyKC0tcmluZykpXCIsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiBcImhzbCh2YXIoLS1iYWNrZ3JvdW5kKSlcIixcbiAgICAgICAgICAgIGZvcmVncm91bmQ6IFwiaHNsKHZhcigtLWZvcmVncm91bmQpKVwiLFxuICAgICAgICAgICAgcHJpbWFyeToge1xuICAgICAgICAgICAgICAgIERFRkFVTFQ6IFwiaHNsKHZhcigtLXByaW1hcnkpKVwiLFxuICAgICAgICAgICAgICAgIGZvcmVncm91bmQ6IFwiaHNsKHZhcigtLXByaW1hcnktZm9yZWdyb3VuZCkpXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2Vjb25kYXJ5OiB7XG4gICAgICAgICAgICAgICAgREVGQVVMVDogXCJoc2wodmFyKC0tc2Vjb25kYXJ5KSlcIixcbiAgICAgICAgICAgICAgICBmb3JlZ3JvdW5kOiBcImhzbCh2YXIoLS1zZWNvbmRhcnktZm9yZWdyb3VuZCkpXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVzdHJ1Y3RpdmU6IHtcbiAgICAgICAgICAgICAgICBERUZBVUxUOiBcImhzbCh2YXIoLS1kZXN0cnVjdGl2ZSkpXCIsXG4gICAgICAgICAgICAgICAgZm9yZWdyb3VuZDogXCJoc2wodmFyKC0tZGVzdHJ1Y3RpdmUtZm9yZWdyb3VuZCkpXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbXV0ZWQ6IHtcbiAgICAgICAgICAgICAgICBERUZBVUxUOiBcImhzbCh2YXIoLS1tdXRlZCkpXCIsXG4gICAgICAgICAgICAgICAgZm9yZWdyb3VuZDogXCJoc2wodmFyKC0tbXV0ZWQtZm9yZWdyb3VuZCkpXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYWNjZW50OiB7XG4gICAgICAgICAgICAgICAgREVGQVVMVDogXCJoc2wodmFyKC0tYWNjZW50KSlcIixcbiAgICAgICAgICAgICAgICBmb3JlZ3JvdW5kOiBcImhzbCh2YXIoLS1hY2NlbnQtZm9yZWdyb3VuZCkpXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcG9wb3Zlcjoge1xuICAgICAgICAgICAgICAgIERFRkFVTFQ6IFwiaHNsKHZhcigtLXBvcG92ZXIpKVwiLFxuICAgICAgICAgICAgICAgIGZvcmVncm91bmQ6IFwiaHNsKHZhcigtLXBvcG92ZXItZm9yZWdyb3VuZCkpXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2FyZDoge1xuICAgICAgICAgICAgICAgIERFRkFVTFQ6IFwiaHNsKHZhcigtLWNhcmQpKVwiLFxuICAgICAgICAgICAgICAgIGZvcmVncm91bmQ6IFwiaHNsKHZhcigtLWNhcmQtZm9yZWdyb3VuZCkpXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gQnV0dG9uLXNwZWNpZmljIHRoZW1lIGNvbG9yc1xuICAgICAgICAgICAgJ2J1dHRvbi1wcmltYXJ5Jzoge1xuICAgICAgICAgICAgICAgIERFRkFVTFQ6IFwiaHNsKHZhcigtLWJ1dHRvbi1wcmltYXJ5LWJnKSlcIixcbiAgICAgICAgICAgICAgICBmb3JlZ3JvdW5kOiBcImhzbCh2YXIoLS1idXR0b24tcHJpbWFyeS10ZXh0KSlcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAnYnV0dG9uLWJyYW5kJzoge1xuICAgICAgICAgICAgICAgIGZvcmVncm91bmQ6IFwiaHNsKHZhcigtLWJ1dHRvbi1icmFuZC10ZXh0KSlcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAnYnV0dG9uLWRhbmdlcic6IHtcbiAgICAgICAgICAgICAgICBmb3JlZ3JvdW5kOiBcImhzbCh2YXIoLS1idXR0b24tZGFuZ2VyLXRleHQpKVwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgZm9udFNpemU6IHtcbiAgICAgICAgICAgIC8vIFNlZG9uYSB0eXBvZ3JhcGh5IHNjYWxlXG4gICAgICAgICAgICAnY2FwdGlvbi1zJzogWycxMHB4JywgeyBsaW5lSGVpZ2h0OiAnMTRweCcsIGxldHRlclNwYWNpbmc6ICcwJyB9XSxcbiAgICAgICAgICAgICdjYXB0aW9uLW0nOiBbJzEycHgnLCB7IGxpbmVIZWlnaHQ6ICcxNnB4JywgbGV0dGVyU3BhY2luZzogJzAnIH1dLFxuICAgICAgICAgICAgJ2NhcHRpb24tbCc6IFsnMTRweCcsIHsgbGluZUhlaWdodDogJzIwcHgnLCBsZXR0ZXJTcGFjaW5nOiAnLTAuMXB4JyB9XSxcbiAgICAgICAgICAgICdib2R5LXMnOiBbJzE2cHgnLCB7IGxpbmVIZWlnaHQ6ICcyNHB4JywgbGV0dGVyU3BhY2luZzogJy0wLjJweCcgfV0sXG4gICAgICAgICAgICAnYm9keS1tJzogWycxOHB4JywgeyBsaW5lSGVpZ2h0OiAnMjZweCcsIGxldHRlclNwYWNpbmc6ICctMC4ycHgnIH1dLFxuICAgICAgICAgICAgJ2JvZHktbCc6IFsnMjBweCcsIHsgbGluZUhlaWdodDogJzI4cHgnLCBsZXR0ZXJTcGFjaW5nOiAnLTAuM3B4JyB9XSxcbiAgICAgICAgICAgICdoZWFkaW5nLXMnOiBbJzI0cHgnLCB7IGxpbmVIZWlnaHQ6ICczMnB4JywgbGV0dGVyU3BhY2luZzogJy0wLjRweCcgfV0sXG4gICAgICAgICAgICAnaGVhZGluZy1tJzogWyczMnB4JywgeyBsaW5lSGVpZ2h0OiAnNDBweCcsIGxldHRlclNwYWNpbmc6ICctMC41cHgnIH1dLFxuICAgICAgICAgICAgJ2hlYWRpbmctbCc6IFsnNDhweCcsIHsgbGluZUhlaWdodDogJzU2cHgnLCBsZXR0ZXJTcGFjaW5nOiAnLTAuNnB4JyB9XSxcbiAgICAgICAgICAgICdkaXNwbGF5JzogWyc2NHB4JywgeyBsaW5lSGVpZ2h0OiAnNzJweCcsIGxldHRlclNwYWNpbmc6ICctMC44cHgnIH1dLFxuICAgICAgICB9LFxuICAgICAgICBzcGFjaW5nOiB7XG4gICAgICAgICAgICAvLyBTZWRvbmEgc3BhY2luZyBzY2FsZSBmcm9tIGRlc2lnbiB0b2tlbnNcbiAgICAgICAgICAgICcwJzogJzAnLFxuICAgICAgICAgICAgJzEnOiAnNHB4JyxcbiAgICAgICAgICAgICcyJzogJzhweCcsXG4gICAgICAgICAgICAnMyc6ICcxMnB4JyxcbiAgICAgICAgICAgICc0JzogJzE2cHgnLFxuICAgICAgICAgICAgJzYnOiAnMjRweCcsXG4gICAgICAgICAgICAnOCc6ICczMnB4JyxcbiAgICAgICAgICAgICcxMic6ICc0OHB4JyxcbiAgICAgICAgICAgICcxNic6ICc2NHB4JyxcbiAgICAgICAgICAgICcyMCc6ICc4MHB4JyxcbiAgICAgICAgICAgICcyNCc6ICc5NnB4JyxcbiAgICAgICAgICAgICczMic6ICcxMjhweCcsXG4gICAgICAgICAgICAnMzYnOiAnMTQ0cHgnLFxuICAgICAgICAgICAgJzQwJzogJzE2MHB4JyxcbiAgICAgICAgICAgICc0NCc6ICcxNzZweCcsXG4gICAgICAgICAgICAnNDgnOiAnMTkycHgnLFxuICAgICAgICAgICAgJzUyJzogJzIwOHB4JyxcbiAgICAgICAgICAgICc1Nic6ICcyMjRweCcsXG4gICAgICAgICAgICAnNjAnOiAnMjQwcHgnLFxuICAgICAgICAgICAgJzY0JzogJzI1NnB4JyxcbiAgICAgICAgICAgICc3Mic6ICcyODhweCcsXG4gICAgICAgICAgICAnODAnOiAnMzIwcHgnLFxuICAgICAgICAgICAgJzk2JzogJzM4NHB4JyxcbiAgICAgICAgfSxcbiAgICAgICAgYm9yZGVyUmFkaXVzOiB7XG4gICAgICAgICAgICBub25lOiAnMCcsXG4gICAgICAgICAgICB4czogJzRweCcsXG4gICAgICAgICAgICBzbTogJzRweCcsXG4gICAgICAgICAgICBtZDogJzhweCcsXG4gICAgICAgICAgICBsZzogJzEycHgnLFxuICAgICAgICAgICAgeGw6ICcxMHB4JywgLy8gU2Vkb25hIGJ1dHRvbiByYWRpdXNcbiAgICAgICAgICAgICcyeGwnOiAnMTZweCcsXG4gICAgICAgICAgICAnM3hsJzogJzI0cHgnLFxuICAgICAgICAgICAgZnVsbDogJzk5OXB4JyxcbiAgICAgICAgfSxcbiAgICAgICAgZm9udFdlaWdodDoge1xuICAgICAgICAgICAgdGhpbjogJzEwMCcsXG4gICAgICAgICAgICBleHRyYWxpZ2h0OiAnMjAwJyxcbiAgICAgICAgICAgIGxpZ2h0OiAnMzAwJyxcbiAgICAgICAgICAgIHJlZ3VsYXI6ICc0MDAnLFxuICAgICAgICAgICAgbWVkaXVtOiAnNTAwJyxcbiAgICAgICAgICAgIHNlbWlib2xkOiAnNjAwJyxcbiAgICAgICAgICAgIGJvbGQ6ICc3MDAnLFxuICAgICAgICAgICAgZXh0cmFib2xkOiAnODAwJyxcbiAgICAgICAgICAgIGJsYWNrOiAnOTAwJyxcbiAgICAgICAgfSxcbiAgICAgICAgbGluZUhlaWdodDoge1xuICAgICAgICAgICAgbm9uZTogJzEnLFxuICAgICAgICAgICAgdGlnaHQ6ICcxLjI1JyxcbiAgICAgICAgICAgIHNudWc6ICcxLjM3NScsXG4gICAgICAgICAgICBub3JtYWw6ICcxLjUnLFxuICAgICAgICAgICAgcmVsYXhlZDogJzEuNjI1JyxcbiAgICAgICAgICAgIGxvb3NlOiAnMicsXG4gICAgICAgIH0sXG4gICAgICAgIGxldHRlclNwYWNpbmc6IHtcbiAgICAgICAgICAgIHRpZ2h0ZXI6ICctMC4wNWVtJyxcbiAgICAgICAgICAgIHRpZ2h0OiAnLTAuMDI1ZW0nLFxuICAgICAgICAgICAgbm9ybWFsOiAnMGVtJyxcbiAgICAgICAgICAgIHdpZGU6ICcwLjAyNWVtJyxcbiAgICAgICAgICAgIHdpZGVyOiAnMC4wNWVtJyxcbiAgICAgICAgICAgIHdpZGVzdDogJzAuMWVtJyxcbiAgICAgICAgfVxuICAgIH07XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbi8vIEhlbHBlciBmdW5jdGlvbnMgZm9yIHZhcmlhYmxlIGxpbmtpbmcgaW4gRmlnbWEgY29tcG9uZW50c1xuLy8gVGhpcyBhcHByb2FjaCBmb2N1c2VzIG9uIHdoYXQgYWN0dWFsbHkgd29ya3MgaW4gdGhlIEZpZ21hIFBsdWdpbiBBUElcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuVmFyaWFibGVIZWxwZXIgPSB2b2lkIDA7XG5jbGFzcyBWYXJpYWJsZUhlbHBlciB7XG4gICAgc3RhdGljIGFzeW5jIGluaXRpYWxpemUoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCfwn5SXIEluaXRpYWxpemluZyB2YXJpYWJsZSBoZWxwZXIuLi4nKTtcbiAgICAgICAgLy8gRmluZCB0aGUgZGVzaWduIHRva2VucyBjb2xsZWN0aW9uXG4gICAgICAgIGNvbnN0IGNvbGxlY3Rpb25zID0gZmlnbWEudmFyaWFibGVzLmdldExvY2FsVmFyaWFibGVDb2xsZWN0aW9ucygpO1xuICAgICAgICB0aGlzLnZhcmlhYmxlQ29sbGVjdGlvbiA9IGNvbGxlY3Rpb25zLmZpbmQoYyA9PiBjLm5hbWUuaW5jbHVkZXMoJ0Rlc2lnbiBUb2tlbnMnKSB8fFxuICAgICAgICAgICAgYy5uYW1lLmluY2x1ZGVzKCdTZWRvbmEnKSB8fFxuICAgICAgICAgICAgYy5uYW1lLmluY2x1ZGVzKCd6ZXVzJykpIHx8IG51bGw7XG4gICAgICAgIGlmICghdGhpcy52YXJpYWJsZUNvbGxlY3Rpb24pIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2Fybign4pqg77iPIE5vIERlc2lnbiBUb2tlbnMgY29sbGVjdGlvbiBmb3VuZCAtIHVzaW5nIGZhbGxiYWNrIGNvbG9ycycpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKGDinIUgRm91bmQgY29sbGVjdGlvbjogJHt0aGlzLnZhcmlhYmxlQ29sbGVjdGlvbi5uYW1lfWApO1xuICAgICAgICAvLyBJbmRleCBhbGwgdmFyaWFibGVzIGJ5IG5hbWUgZm9yIHF1aWNrIGxvb2t1cFxuICAgICAgICBjb25zdCBhbGxWYXJzID0gZmlnbWEudmFyaWFibGVzLmdldExvY2FsVmFyaWFibGVzKClcbiAgICAgICAgICAgIC5maWx0ZXIodiA9PiB2LnZhcmlhYmxlQ29sbGVjdGlvbklkID09PSB0aGlzLnZhcmlhYmxlQ29sbGVjdGlvbi5pZCk7XG4gICAgICAgIGZvciAoY29uc3QgdmFyaWFibGUgb2YgYWxsVmFycykge1xuICAgICAgICAgICAgdGhpcy52YXJpYWJsZXMuc2V0KHZhcmlhYmxlLm5hbWUsIHZhcmlhYmxlKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhg8J+TiiBJbmRleGVkICR7dGhpcy52YXJpYWJsZXMuc2l6ZX0gdmFyaWFibGVzYCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCBhIHZhcmlhYmxlIGFsaWFzIGZvciBiaW5kaW5nIHRvIEZpZ21hIHByb3BlcnRpZXNcbiAgICAgKiBPbmx5IHVzZSB0aGlzIHdoZXJlIEZpZ21hIEFQSSBhY3R1YWxseSBzdXBwb3J0cyB2YXJpYWJsZSBiaW5kaW5nXG4gICAgICovXG4gICAgc3RhdGljIGdldFZhcmlhYmxlQWxpYXModmFyaWFibGVOYW1lKSB7XG4gICAgICAgIGNvbnN0IHZhcmlhYmxlID0gdGhpcy52YXJpYWJsZXMuZ2V0KHZhcmlhYmxlTmFtZSk7XG4gICAgICAgIGlmICghdmFyaWFibGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2Fybihg4pqg77iPIFZhcmlhYmxlIG5vdCBmb3VuZDogJHt2YXJpYWJsZU5hbWV9YCk7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZTogJ1ZBUklBQkxFX0FMSUFTJyxcbiAgICAgICAgICAgIGlkOiB2YXJpYWJsZS5pZFxuICAgICAgICB9O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGFjdHVhbCBSR0IgdmFsdWUgZnJvbSBhIHZhcmlhYmxlIGZvciBmYWxsYmFjayB1c2VcbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0VmFyaWFibGVWYWx1ZSh2YXJpYWJsZU5hbWUpIHtcbiAgICAgICAgY29uc3QgdmFyaWFibGUgPSB0aGlzLnZhcmlhYmxlcy5nZXQodmFyaWFibGVOYW1lKTtcbiAgICAgICAgaWYgKCF2YXJpYWJsZSlcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICBjb25zdCBtb2RlcyA9IHZhcmlhYmxlLnZhbHVlc0J5TW9kZTtcbiAgICAgICAgY29uc3QgZmlyc3RNb2RlSWQgPSBPYmplY3Qua2V5cyhtb2RlcylbMF07XG4gICAgICAgIGNvbnN0IHZhbHVlID0gbW9kZXNbZmlyc3RNb2RlSWRdO1xuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAhPT0gbnVsbCAmJiAncicgaW4gdmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgUGFpbnQgb2JqZWN0IHRoYXQgdXNlcyB2YXJpYWJsZXMgd2hlbiBwb3NzaWJsZSwgZmFsbGJhY2sgY29sb3JzIG90aGVyd2lzZVxuICAgICAqL1xuICAgIHN0YXRpYyBjcmVhdGVWYXJpYWJsZVBhaW50KHZhcmlhYmxlTmFtZSwgZmFsbGJhY2tDb2xvcikge1xuICAgICAgICBjb25zdCB2YXJpYWJsZUFsaWFzID0gdGhpcy5nZXRWYXJpYWJsZUFsaWFzKHZhcmlhYmxlTmFtZSk7XG4gICAgICAgIGlmICh2YXJpYWJsZUFsaWFzKSB7XG4gICAgICAgICAgICAvLyBGb3IgVmFyaWFibGVBbGlhcywgd2UgbmVlZCBhIGRpZmZlcmVudCBQYWludCBzdHJ1Y3R1cmVcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ1NPTElEJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogZmFsbGJhY2tDb2xvciwgLy8gRmFsbGJhY2sgY29sb3IgaXMgcmVxdWlyZWRcbiAgICAgICAgICAgICAgICBib3VuZFZhcmlhYmxlczoge1xuICAgICAgICAgICAgICAgICAgICBjb2xvcjogdmFyaWFibGVBbGlhc1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdTT0xJRCcsXG4gICAgICAgICAgICAgICAgY29sb3I6IGZhbGxiYWNrQ29sb3JcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQXBwbHkgdmFyaWFibGUgYmluZGluZyB0byBjb21wb25lbnQgZmlsbHMgd2hlcmUgc3VwcG9ydGVkXG4gICAgICovXG4gICAgc3RhdGljIGFwcGx5VmFyaWFibGVGaWxsKG5vZGUsIHZhcmlhYmxlTmFtZSwgZmFsbGJhY2tDb2xvcikge1xuICAgICAgICBpZiAoISgnZmlsbHMnIGluIG5vZGUpKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAvLyBTZXQgdGhlIGJhc2ljIGZpbGwgZmlyc3RcbiAgICAgICAgbm9kZS5maWxscyA9IFt7IHR5cGU6ICdTT0xJRCcsIGNvbG9yOiBmYWxsYmFja0NvbG9yIH1dO1xuICAgICAgICAvLyBUcnkgdG8gYmluZCB2YXJpYWJsZSB1c2luZyB0aGUgcHJvcGVyIEZpZ21hIEFQSVxuICAgICAgICBjb25zdCB2YXJpYWJsZSA9IHRoaXMudmFyaWFibGVzLmdldCh2YXJpYWJsZU5hbWUpO1xuICAgICAgICBpZiAodmFyaWFibGUgJiYgJ3NldEJvdW5kVmFyaWFibGUnIGluIG5vZGUpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYEJpbmRpbmcgdmFyaWFibGUgJHt2YXJpYWJsZU5hbWV9IHRvIGZpbGxgKTtcbiAgICAgICAgICAgICAgICBub2RlLnNldEJvdW5kVmFyaWFibGUoJ2ZpbGxzJywgdmFyaWFibGUuaWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGBDb3VsZCBub3QgYmluZCBmaWxsIHZhcmlhYmxlICR7dmFyaWFibGVOYW1lfTpgLCBlcnJvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodmFyaWFibGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgTm9kZSBkb2VzIG5vdCBzdXBwb3J0IHNldEJvdW5kVmFyaWFibGUgZm9yIGZpbGxzYCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQXBwbHkgdmFyaWFibGUgYmluZGluZyB0byBjb21wb25lbnQgc3Ryb2tlcyB3aGVyZSBzdXBwb3J0ZWRcbiAgICAgKi9cbiAgICBzdGF0aWMgYXBwbHlWYXJpYWJsZVN0cm9rZShub2RlLCB2YXJpYWJsZU5hbWUsIGZhbGxiYWNrQ29sb3IpIHtcbiAgICAgICAgaWYgKCEoJ3N0cm9rZXMnIGluIG5vZGUpKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAvLyBTZXQgdGhlIGJhc2ljIHN0cm9rZSBmaXJzdFxuICAgICAgICBub2RlLnN0cm9rZXMgPSBbeyB0eXBlOiAnU09MSUQnLCBjb2xvcjogZmFsbGJhY2tDb2xvciB9XTtcbiAgICAgICAgLy8gVHJ5IHRvIGJpbmQgdmFyaWFibGUgdXNpbmcgdGhlIHByb3BlciBGaWdtYSBBUElcbiAgICAgICAgY29uc3QgdmFyaWFibGUgPSB0aGlzLnZhcmlhYmxlcy5nZXQodmFyaWFibGVOYW1lKTtcbiAgICAgICAgaWYgKHZhcmlhYmxlICYmICdzZXRCb3VuZFZhcmlhYmxlJyBpbiBub2RlKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBCaW5kaW5nIHZhcmlhYmxlICR7dmFyaWFibGVOYW1lfSB0byBzdHJva2VgKTtcbiAgICAgICAgICAgICAgICBub2RlLnNldEJvdW5kVmFyaWFibGUoJ3N0cm9rZXMnLCB2YXJpYWJsZS5pZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYENvdWxkIG5vdCBiaW5kIHN0cm9rZSB2YXJpYWJsZSAke3ZhcmlhYmxlTmFtZX06YCwgZXJyb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHZhcmlhYmxlKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYE5vZGUgZG9lcyBub3Qgc3VwcG9ydCBzZXRCb3VuZFZhcmlhYmxlIGZvciBzdHJva2VzYCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgdmFyaWFibGVzIGFyZSBhdmFpbGFibGVcbiAgICAgKi9cbiAgICBzdGF0aWMgaGFzVmFyaWFibGVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy52YXJpYWJsZUNvbGxlY3Rpb24gIT09IG51bGwgJiYgdGhpcy52YXJpYWJsZXMuc2l6ZSA+IDA7XG4gICAgfVxufVxuZXhwb3J0cy5WYXJpYWJsZUhlbHBlciA9IFZhcmlhYmxlSGVscGVyO1xuVmFyaWFibGVIZWxwZXIudmFyaWFibGVDb2xsZWN0aW9uID0gbnVsbDtcblZhcmlhYmxlSGVscGVyLnZhcmlhYmxlcyA9IG5ldyBNYXAoKTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8vIEZpZ21hIHBsdWdpbiBjb2RlIHRoYXQgcnVucyBpbiB0aGUgbWFpbiB0aHJlYWRcbmNvbnN0IHRhaWx3aW5kX3N5bmNfMSA9IHJlcXVpcmUoXCIuL3N5bmMvdGFpbHdpbmQtc3luY1wiKTtcbmNvbnN0IHJlYWN0X3RvX2ZpZ21hX3NpbXBsZV8xID0gcmVxdWlyZShcIi4vcmVhY3QtdG8tZmlnbWEtc2ltcGxlXCIpO1xuY29uc3QgdGFpbHdpbmRfcmVhZGVyXzEgPSByZXF1aXJlKFwiLi90YWlsd2luZC1yZWFkZXJcIik7XG4vLyBTaG93IHRoZSBwbHVnaW4gVUlcbmZpZ21hLnNob3dVSShfX2h0bWxfXywge1xuICAgIHdpZHRoOiA0MDAsXG4gICAgaGVpZ2h0OiA2MDAsXG4gICAgdGl0bGU6ICdTZWRvbmEgU3luYydcbn0pO1xuLy8gSGFuZGxlIG1lc3NhZ2VzIGZyb20gdGhlIFVJXG5maWdtYS51aS5vbm1lc3NhZ2UgPSBhc3luYyAobXNnKSA9PiB7XG4gICAgY29uc29sZS5sb2coJ1JlY2VpdmVkIG1lc3NhZ2U6JywgbXNnKTtcbiAgICB0cnkge1xuICAgICAgICBzd2l0Y2ggKG1zZy50eXBlKSB7XG4gICAgICAgICAgICBjYXNlICdnZXQtdGFpbHdpbmQtY29uZmlnJzpcbiAgICAgICAgICAgICAgICAvLyBTZW5kIHRoZSBhY3R1YWwgVGFpbHdpbmQgY29uZmlnIHRvIHRoZSBVSVxuICAgICAgICAgICAgICAgIGNvbnN0IHRhaWx3aW5kQ29uZmlnID0gKDAsIHRhaWx3aW5kX3JlYWRlcl8xLmdldFRhaWx3aW5kQ29uZmlnKSgpO1xuICAgICAgICAgICAgICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3RhaWx3aW5kLWNvbmZpZycsXG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZzogdGFpbHdpbmRDb25maWdcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3N5bmMtdG9rZW5zJzpcbiAgICAgICAgICAgICAgICBhd2FpdCBzeW5jVG9rZW5zKCk7XG4gICAgICAgICAgICAgICAgZmlnbWEudWkucG9zdE1lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnc3luYy1jb21wbGV0ZScsXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICdEZXNpZ24gdG9rZW5zIHN5bmNlZCBzdWNjZXNzZnVsbHkhJ1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnc3luYy1zdHlsZXMnOlxuICAgICAgICAgICAgICAgIGF3YWl0IHN5bmNTdHlsZXMoKTtcbiAgICAgICAgICAgICAgICBmaWdtYS51aS5wb3N0TWVzc2FnZSh7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdzeW5jLWNvbXBsZXRlJyxcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogJ1RleHQgc3R5bGVzIGNyZWF0ZWQgc3VjY2Vzc2Z1bGx5ISdcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3N5bmMtY29tcG9uZW50cyc6XG4gICAgICAgICAgICAgICAgYXdhaXQgc3luY0NvbXBvbmVudHMobXNnLmNvbXBvbmVudHMpO1xuICAgICAgICAgICAgICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3N5bmMtY29tcGxldGUnLFxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiAnQ29tcG9uZW50cyBzeW5jZWQgc3VjY2Vzc2Z1bGx5ISdcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2NyZWF0ZS1kZXNpZ24tc3lzdGVtJzpcbiAgICAgICAgICAgICAgICBhd2FpdCBjcmVhdGVEZXNpZ25TeXN0ZW0obXNnLmNvbmZpZyk7XG4gICAgICAgICAgICAgICAgZmlnbWEudWkucG9zdE1lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnc3luYy1jb21wbGV0ZScsXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICdEZXNpZ24gc3lzdGVtIGNyZWF0ZWQgc3VjY2Vzc2Z1bGx5ISdcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2Nsb3NlJzpcbiAgICAgICAgICAgICAgICBmaWdtYS5jbG9zZVBsdWdpbigpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnVW5rbm93biBtZXNzYWdlIHR5cGU6JywgbXNnLnR5cGUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdQbHVnaW4gZXJyb3I6JywgZXJyb3IpO1xuICAgICAgICBmaWdtYS51aS5wb3N0TWVzc2FnZSh7XG4gICAgICAgICAgICB0eXBlOiAnc3luYy1jb21wbGV0ZScsXG4gICAgICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgICAgIG1lc3NhZ2U6IGBFcnJvcjogJHtlcnJvci5tZXNzYWdlfWBcbiAgICAgICAgfSk7XG4gICAgfVxufTtcbmFzeW5jIGZ1bmN0aW9uIHN5bmNUb2tlbnMoKSB7XG4gICAgY29uc29sZS5sb2coJ1N5bmNpbmcgZGVzaWduIHRva2Vucy4uLicpO1xuICAgIC8vIExvYWQgcmVxdWlyZWQgZm9udHMgZmlyc3RcbiAgICBhd2FpdCBsb2FkUmVxdWlyZWRGb250cygpO1xuICAgIC8vIENyZWF0ZSBvciBnZXQgdGhlIGRlc2lnbiB0b2tlbnMgY29sbGVjdGlvblxuICAgIGxldCBjb2xsZWN0aW9uID0gZmlnbWEudmFyaWFibGVzLmdldExvY2FsVmFyaWFibGVDb2xsZWN0aW9ucygpLmZpbmQoY29sID0+IGNvbC5uYW1lID09PSAnU2Vkb25hIERlc2lnbiBUb2tlbnMnKTtcbiAgICBpZiAoIWNvbGxlY3Rpb24pIHtcbiAgICAgICAgY29sbGVjdGlvbiA9IGZpZ21hLnZhcmlhYmxlcy5jcmVhdGVWYXJpYWJsZUNvbGxlY3Rpb24oJ1NlZG9uYSBEZXNpZ24gVG9rZW5zJyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICAvLyBDbGVhciBleGlzdGluZyB2YXJpYWJsZXMgdG8gYXZvaWQgZHVwbGljYXRlc1xuICAgICAgICBjb25zb2xlLmxvZygnQ2xlYXJpbmcgZXhpc3RpbmcgdmFyaWFibGVzIHRvIGF2b2lkIGR1cGxpY2F0ZXMuLi4nKTtcbiAgICAgICAgY29uc3QgZXhpc3RpbmdWYXJpYWJsZXMgPSBmaWdtYS52YXJpYWJsZXMuZ2V0TG9jYWxWYXJpYWJsZXMoKTtcbiAgICAgICAgY29uc3QgY29sbGVjdGlvblZhcmlhYmxlcyA9IGV4aXN0aW5nVmFyaWFibGVzLmZpbHRlcih2YXJpYWJsZSA9PiB2YXJpYWJsZS52YXJpYWJsZUNvbGxlY3Rpb25JZCA9PT0gY29sbGVjdGlvbi5pZCk7XG4gICAgICAgIGNvbnNvbGUubG9nKGBGb3VuZCAke2NvbGxlY3Rpb25WYXJpYWJsZXMubGVuZ3RofSBleGlzdGluZyB2YXJpYWJsZXMgdG8gcmVtb3ZlYCk7XG4gICAgICAgIGNvbGxlY3Rpb25WYXJpYWJsZXMuZm9yRWFjaCh2YXJpYWJsZSA9PiB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHZhcmlhYmxlLnJlbW92ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGBDb3VsZCBub3QgcmVtb3ZlIHZhcmlhYmxlICR7dmFyaWFibGUubmFtZX06YCwgZXJyb3IubWVzc2FnZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvLyBBZGQgbW9kZXMgZm9yIGxpZ2h0L2RhcmsgdGhlbWVzXG4gICAgY29uc3QgbW9kZXMgPSBjb2xsZWN0aW9uLm1vZGVzO1xuICAgIGxldCBsaWdodE1vZGUgPSBtb2Rlcy5maW5kKG1vZGUgPT4gbW9kZS5uYW1lID09PSAnTGlnaHQnKTtcbiAgICBsZXQgZGFya01vZGUgPSBtb2Rlcy5maW5kKG1vZGUgPT4gbW9kZS5uYW1lID09PSAnRGFyaycpO1xuICAgIGlmICghbGlnaHRNb2RlKSB7XG4gICAgICAgIGxpZ2h0TW9kZSA9IGNvbGxlY3Rpb24ubW9kZXNbMF07XG4gICAgICAgIGNvbGxlY3Rpb24ucmVuYW1lTW9kZShsaWdodE1vZGUubW9kZUlkLCAnTGlnaHQnKTtcbiAgICB9XG4gICAgaWYgKCFkYXJrTW9kZSkge1xuICAgICAgICBjb25zdCBuZXdNb2RlSWQgPSBjb2xsZWN0aW9uLmFkZE1vZGUoJ0RhcmsnKTtcbiAgICAgICAgZGFya01vZGUgPSBjb2xsZWN0aW9uLm1vZGVzLmZpbmQobW9kZSA9PiBtb2RlLm1vZGVJZCA9PT0gbmV3TW9kZUlkKTtcbiAgICB9XG4gICAgLy8gR2V0IFRhaWx3aW5kIGNvbmZpZyBhbmQgY3JlYXRlIHZhcmlhYmxlcyAoZXhjbHVkaW5nIHRleHQgc3R5bGVzKVxuICAgIGNvbnN0IHRhaWx3aW5kQ29uZmlnID0gKDAsIHRhaWx3aW5kX3JlYWRlcl8xLmdldFRhaWx3aW5kQ29uZmlnKSgpO1xuICAgIGF3YWl0ICgwLCB0YWlsd2luZF9zeW5jXzEuY3JlYXRlVmFyaWFibGVzRnJvbVRhaWx3aW5kVG9rZW5zT25seSkoY29sbGVjdGlvbiwgdGFpbHdpbmRDb25maWcpO1xuICAgIGNvbnNvbGUubG9nKCdEZXNpZ24gdG9rZW5zIHN5bmNlZCBzdWNjZXNzZnVsbHknKTtcbn1cbmFzeW5jIGZ1bmN0aW9uIHN5bmNTdHlsZXMoKSB7XG4gICAgY29uc29sZS5sb2coJ0NyZWF0aW5nIHRleHQgc3R5bGVzLi4uJyk7XG4gICAgLy8gTG9hZCByZXF1aXJlZCBmb250cyBmaXJzdFxuICAgIGF3YWl0IGxvYWRSZXF1aXJlZEZvbnRzKCk7XG4gICAgLy8gRmluZCB0aGUgZGVzaWduIHRva2VucyBjb2xsZWN0aW9uXG4gICAgY29uc3QgY29sbGVjdGlvbiA9IGZpZ21hLnZhcmlhYmxlcy5nZXRMb2NhbFZhcmlhYmxlQ29sbGVjdGlvbnMoKS5maW5kKGNvbCA9PiBjb2wubmFtZSA9PT0gJ1NlZG9uYSBEZXNpZ24gVG9rZW5zJyk7XG4gICAgaWYgKCFjb2xsZWN0aW9uKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignRGVzaWduIHRva2VucyBtdXN0IGJlIHN5bmNlZCBmaXJzdCEgUGxlYXNlIHJ1biBcIlN5bmMgVG9rZW5zXCIgYmVmb3JlIGNyZWF0aW5nIHN0eWxlcy4nKTtcbiAgICB9XG4gICAgLy8gQ3JlYXRlIHRleHQgc3R5bGVzIHVzaW5nIHRoZSB2YXJpYWJsZXNcbiAgICBhd2FpdCAoMCwgdGFpbHdpbmRfc3luY18xLmNyZWF0ZVRleHRTdHlsZXNGcm9tVmFyaWFibGVzKShjb2xsZWN0aW9uKTtcbiAgICBjb25zb2xlLmxvZygnVGV4dCBzdHlsZXMgY3JlYXRlZCBzdWNjZXNzZnVsbHknKTtcbn1cbmFzeW5jIGZ1bmN0aW9uIHN5bmNDb21wb25lbnRzKGNvbXBvbmVudHMpIHtcbiAgICBjb25zb2xlLmxvZygnU3luY2luZyBjb21wb25lbnRzLi4uJyk7XG4gICAgLy8gVXNlIHRoZSBhZHZhbmNlZCBSZWFjdCB0byBGaWdtYSBjb252ZXJ0ZXJcbiAgICBjb25zdCBjb252ZXJ0ZXIgPSBuZXcgcmVhY3RfdG9fZmlnbWFfc2ltcGxlXzEuUmVhY3RGaWdtYUNvbnZlcnRlcigpO1xuICAgIGF3YWl0IGNvbnZlcnRlci5jcmVhdGVBbGxDb21wb25lbnRzKCk7XG4gICAgY29uc29sZS5sb2coJ0NvbXBvbmVudHMgc3luY2VkIHN1Y2Nlc3NmdWxseScpO1xufVxuYXN5bmMgZnVuY3Rpb24gY3JlYXRlRGVzaWduU3lzdGVtKGNvbmZpZykge1xuICAgIGNvbnNvbGUubG9nKCdDcmVhdGluZyBkZXNpZ24gc3lzdGVtLi4uJyk7XG4gICAgLy8gTG9hZCByZXF1aXJlZCBmb250c1xuICAgIGF3YWl0IGxvYWRSZXF1aXJlZEZvbnRzKCk7XG4gICAgLy8gRmlyc3Qgc3luYyB0b2tlbnNcbiAgICBhd2FpdCBzeW5jVG9rZW5zKCk7XG4gICAgLy8gVGhlbiBzeW5jIGNvbXBvbmVudHNcbiAgICBhd2FpdCBzeW5jQ29tcG9uZW50cyhjb25maWcuY29tcG9uZW50cyk7XG4gICAgLy8gQ3JlYXRlIGEgY292ZXIgcGFnZVxuICAgIGxldCBjb3ZlclBhZ2UgPSBmaWdtYS5yb290LmNoaWxkcmVuLmZpbmQocGFnZSA9PiBwYWdlLm5hbWUgPT09ICdTZWRvbmEgRGVzaWduIFN5c3RlbScpO1xuICAgIGlmICghY292ZXJQYWdlKSB7XG4gICAgICAgIGNvdmVyUGFnZSA9IGZpZ21hLmNyZWF0ZVBhZ2UoKTtcbiAgICAgICAgY292ZXJQYWdlLm5hbWUgPSAnU2Vkb25hIERlc2lnbiBTeXN0ZW0nO1xuICAgICAgICBmaWdtYS5yb290Lmluc2VydENoaWxkKDAsIGNvdmVyUGFnZSk7XG4gICAgfVxuICAgIGZpZ21hLmN1cnJlbnRQYWdlID0gY292ZXJQYWdlO1xuICAgIC8vIENsZWFyIGV4aXN0aW5nIGNvbnRlbnRcbiAgICBjb3ZlclBhZ2UuY2hpbGRyZW4uZm9yRWFjaChub2RlID0+IG5vZGUucmVtb3ZlKCkpO1xuICAgIC8vIENyZWF0ZSB0aXRsZVxuICAgIGNvbnN0IHRpdGxlID0gZmlnbWEuY3JlYXRlVGV4dCgpO1xuICAgIHRpdGxlLmNoYXJhY3RlcnMgPSAnU2Vkb25hIFVJIERlc2lnbiBTeXN0ZW0nO1xuICAgIHRpdGxlLmZvbnRTaXplID0gNDg7XG4gICAgdGl0bGUuZm9udE5hbWUgPSB7IGZhbWlseTogJ0ludGVyJywgc3R5bGU6ICdCb2xkJyB9O1xuICAgIHRpdGxlLmZpbGxzID0gW3sgdHlwZTogJ1NPTElEJywgY29sb3I6IHsgcjogMC44NywgZzogMC40NCwgYjogMC4wMSB9IH1dOyAvLyBTZWRvbmEgb3JhbmdlXG4gICAgdGl0bGUueCA9IDEwMDtcbiAgICB0aXRsZS55ID0gMTAwO1xuICAgIC8vIENyZWF0ZSBkZXNjcmlwdGlvblxuICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZmlnbWEuY3JlYXRlVGV4dCgpO1xuICAgIGRlc2NyaXB0aW9uLmNoYXJhY3RlcnMgPSAnUHJvZHVjdGlvbi1yZWFkeSBVSSBjb21wb25lbnRzIGJ1aWx0IHdpdGggUmVhY3QsIFRhaWx3aW5kIENTUywgYW5kIFpldXMgZGVzaWduIHN5c3RlbS5cXG5PcHRpbWl6ZWQgZm9yIEFJIGFnZW50IHRyYWRpbmcgcGxhdGZvcm1zLic7XG4gICAgZGVzY3JpcHRpb24uZm9udFNpemUgPSAxNjtcbiAgICBkZXNjcmlwdGlvbi5mb250TmFtZSA9IHsgZmFtaWx5OiAnSW50ZXInLCBzdHlsZTogJ1JlZ3VsYXInIH07XG4gICAgZGVzY3JpcHRpb24uZmlsbHMgPSBbeyB0eXBlOiAnU09MSUQnLCBjb2xvcjogeyByOiAxLCBnOiAxLCBiOiAxIH0sIG9wYWNpdHk6IDAuNzUgfV07XG4gICAgZGVzY3JpcHRpb24ucmVzaXplKDYwMCwgNTApO1xuICAgIGRlc2NyaXB0aW9uLnggPSAxMDA7XG4gICAgZGVzY3JpcHRpb24ueSA9IDE4MDtcbiAgICBjb25zb2xlLmxvZygnRGVzaWduIHN5c3RlbSBjcmVhdGVkIHN1Y2Nlc3NmdWxseScpO1xufVxuYXN5bmMgZnVuY3Rpb24gbG9hZFJlcXVpcmVkRm9udHMoKSB7XG4gICAgY29uc29sZS5sb2coJ0xvYWRpbmcgcmVxdWlyZWQgZm9udHMuLi4nKTtcbiAgICBjb25zdCBmb250c1RvTG9hZCA9IFtcbiAgICAgICAgeyBmYW1pbHk6ICdJbnRlcicsIHN0eWxlOiAnUmVndWxhcicgfSxcbiAgICAgICAgeyBmYW1pbHk6ICdJbnRlcicsIHN0eWxlOiAnTWVkaXVtJyB9LFxuICAgICAgICB7IGZhbWlseTogJ0ludGVyJywgc3R5bGU6ICdTZW1pYm9sZCcgfSxcbiAgICAgICAgeyBmYW1pbHk6ICdJbnRlcicsIHN0eWxlOiAnQm9sZCcgfVxuICAgIF07XG4gICAgZm9yIChjb25zdCBmb250IG9mIGZvbnRzVG9Mb2FkKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhd2FpdCBmaWdtYS5sb2FkRm9udEFzeW5jKGZvbnQpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coYExvYWRlZCBmb250OiAke2ZvbnQuZmFtaWx5fSAke2ZvbnQuc3R5bGV9YCk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYEZhaWxlZCB0byBsb2FkIGZvbnQgJHtmb250LmZhbWlseX0gJHtmb250LnN0eWxlfTpgLCBlcnJvcik7XG4gICAgICAgICAgICAvLyBUcnkgZmFsbGJhY2sgZm9udFxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBhd2FpdCBmaWdtYS5sb2FkRm9udEFzeW5jKHsgZmFtaWx5OiAnUm9ib3RvJywgc3R5bGU6IGZvbnQuc3R5bGUgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZmFsbGJhY2tFcnJvcikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgRmFsbGJhY2sgZm9udCBhbHNvIGZhaWxlZCwgdXNpbmcgc3lzdGVtIGRlZmF1bHRgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbi8vIEluaXRpYWxpemUgcGx1Z2luXG5jb25zb2xlLmxvZygnU2Vkb25hIFN5bmMgcGx1Z2luIGluaXRpYWxpemVkJyk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=