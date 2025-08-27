# CK-Tabs Web Component

A modern, accessible, and highly customizable tabs component built with Web Components technology. Provides seamless content organization through labeled tabs with associated panels.

## 🚀 Quick Start

### Installation

#### Script Tag (CDN)
```html
<script type="module" src="https://unpkg.com/@colmkenna/ck-tabs@latest/dist/index.esm.js"></script>
```

#### NPM
```bash
npm install @colmkenna/ck-tabs
```

#### Import in JavaScript
```javascript
import '@colmkenna/ck-tabs';
// Components are automatically registered
```

### Basic Usage

```html
<ck-tabs>
  <ck-tab label="First Tab" active>
    <h1>Welcome</h1>
    <p>This is the content of the first tab.</p>
  </ck-tab>
  <ck-tab label="Second Tab">
    <h1>Features</h1>
    <ul>
      <li>Accessible by default</li>
      <li>Keyboard navigation</li>
      <li>Customizable themes</li>
    </ul>
  </ck-tab>
  <ck-tab label="Third Tab">
    <h1>Documentation</h1>
    <p>Complete API documentation available.</p>
  </ck-tab>
</ck-tabs>
```

## ✨ Features

- **🎯 Accessibility First**: Full WCAG 2.1 AA compliance with ARIA support
- **⌨️ Keyboard Navigation**: Complete keyboard support with arrow keys, Home, End
- **🎨 Theming System**: Extensive CSS custom properties for styling
- **📱 Responsive Design**: Mobile-first design with responsive breakpoints
- **⚡ Performance**: Constructable Stylesheets for optimal performance
- **🔒 Security**: XSS prevention with automatic content sanitization
- **🌐 Browser Support**: Modern browsers with graceful fallbacks

## 📖 API Documentation

### `<ck-tabs>` Container Element

The main container that manages tab state and presentation.

#### Methods

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `activateTab(index)` | `index: number` | `void` | Activates tab by index |
| `getActiveTab()` | - | `CKTab \| undefined` | Returns currently active tab element |
| `getActiveIndex()` | - | `number` | Returns index of active tab |
| `addTab(label, content, active?)` | `label: string, content: string, active?: boolean` | `CKTab` | Adds new tab programmatically |
| `removeTab(index)` | `index: number` | `boolean` | Removes tab by index |

#### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `tab-change` | `{ activeIndex, activeTab, previousActiveIndex, previousActiveTab }` | Fired when active tab changes |
| `tab-selected` | `{ selectedIndex, selectedTab, tabLabel, tabElement, timestamp }` | Fired when tab is selected |

#### Example Usage

```javascript
const tabs = document.querySelector('ck-tabs');

// Programmatically switch tabs
tabs.activateTab(2);

// Add new tab
const newTab = tabs.addTab('New Tab', '<p>New content</p>', true);

// Listen for tab changes
tabs.addEventListener('tab-change', (e) => {
  console.log('Active tab changed to:', e.detail.activeIndex);
});
```

### `<ck-tab>` Individual Tab Element

Individual tab elements that contain the label and content.

#### Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `label` | `string` | `"Tab"` | Display text for the tab header |
| `active` | `boolean` | `false` | Whether this tab is currently active |

#### Properties

| Property | Type | Description |
|----------|------|-------------|
| `label` | `string` | Gets/sets the tab label |
| `active` | `boolean` | Gets/sets active state |

#### Example Usage

```javascript
const tab = document.querySelector('ck-tab');

// Set label
tab.label = 'Updated Label';

// Check if active
if (tab.active) {
  console.log('This tab is active');
}

// Activate programmatically
tab.active = true;
```

## 🎨 Theming Guide

The component uses CSS custom properties for comprehensive theming support.

### CSS Custom Properties

| Property | Default | Description |
|----------|---------|-------------|
| `--tab-bg` | `#ffffff` | Background color for tab headers |
| `--tab-border` | `#e0e0e0` | Border color for tabs container |
| `--tab-text` | `#333333` | Text color for tab headers |
| `--tab-hover-bg` | `#f5f5f5` | Background color on hover |
| `--primary-color` | `#007bff` | Primary accent color |
| `--primary-hover` | `#0056b3` | Primary color on hover/active |
| `--text-light` | `#ffffff` | Light text color for active states |
| `--tab-content-bg` | `#ffffff` | Background color for tab content |
| `--tab-content-text` | `#333333` | Text color for tab content |
| `--focus-color` | `#007bff` | Focus outline color |
| `--scrollbar-track` | `#f1f1f1` | Scrollbar track color |
| `--scrollbar-thumb` | `#c1c1c1` | Scrollbar thumb color |
| `--tab-font-family` | `system-ui, sans-serif` | Font family for tabs |
| `--heading-font-family` | `serif` | Font family for content headings |

### Theme Examples

#### Dark Theme
```css
:root {
  --tab-bg: #2d3748;
  --tab-border: #4a5568;
  --tab-text: #e2e8f0;
  --tab-hover-bg: #4a5568;
  --primary-color: #63b3ed;
  --primary-hover: #3182ce;
  --tab-content-bg: #1a202c;
  --tab-content-text: #e2e8f0;
  --scrollbar-track: #2d3748;
  --scrollbar-thumb: #4a5568;
}
```

#### Forest Theme
```css
:root {
  --tab-bg: #f0f8f0;
  --tab-border: #68d391;
  --tab-text: #2f855a;
  --tab-hover-bg: #e6fffa;
  --primary-color: #38a169;
  --primary-hover: #2f855a;
  --tab-content-bg: #ffffff;
  --tab-content-text: #2d3748;
}
```

#### Dynamic Theme Switching
```javascript
function applyTheme(themeName) {
  const themes = {
    light: {
      '--tab-bg': '#ffffff',
      '--tab-text': '#333333',
      '--primary-color': '#007bff'
    },
    dark: {
      '--tab-bg': '#2d3748',
      '--tab-text': '#e2e8f0',
      '--primary-color': '#63b3ed'
    }
  };
  
  const theme = themes[themeName];
  Object.entries(theme).forEach(([property, value]) => {
    document.documentElement.style.setProperty(property, value);
  });
}
```

## ♿ Accessibility Features

### WCAG 2.1 AA Compliance

- **Keyboard Navigation**: Full keyboard support with arrow keys, Home, End
- **Screen Reader Support**: Proper ARIA attributes and semantic HTML
- **Focus Management**: Visible focus indicators and logical tab order
- **Color Contrast**: Meets WCAG contrast requirements
- **High Contrast Mode**: Support for Windows High Contrast
- **Reduced Motion**: Respects `prefers-reduced-motion` preference

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Tab` | Move focus to tabs container |
| `Arrow Left/Up` | Previous tab |
| `Arrow Right/Down` | Next tab |
| `Home` | First tab |
| `End` | Last tab |
| `Enter/Space` | Activate focused tab |

### ARIA Implementation

- `role="tab"` on tab headers
- `role="tabpanel"` on content panels  
- `aria-selected` indicates active tab
- `aria-controls` links tabs to panels
- `aria-labelledby` links panels to tabs
- `aria-hidden` manages panel visibility

## 🌐 Browser Support

| Browser | Version | Support |
|---------|---------|---------|
| Chrome | 73+ | ✅ Full support |
| Firefox | 69+ | ✅ Full support |
| Safari | 16.4+ | ✅ Full support (with fallback CSS) |
| Edge | 79+ | ✅ Full support |

### Polyfills

For older browsers, include:
```html
<script src="https://unpkg.com/@webcomponents/webcomponentsjs@2/webcomponents-loader.js"></script>
```

## ⚡ Performance Guidelines

### Best Practices

1. **Limit Tab Count**: For optimal performance, limit to 50 tabs per container
2. **Content Size**: Keep tab content under 100KB for smooth scrolling
3. **Dynamic Updates**: Batch multiple tab operations when possible
4. **Event Listeners**: Remove custom event listeners when component is destroyed

### Performance Metrics

- **Initialization**: < 50ms for 20 tabs
- **Tab Switching**: < 10ms per switch
- **Memory Usage**: Stable with no leaks
- **Bundle Size**: < 15KB gzipped

## 🔧 Troubleshooting

### Common Issues

**Q: Tabs not displaying correctly**
```javascript
// Ensure components are registered
if (!customElements.get('ck-tabs')) {
  import('@colmkenna/ck-tabs');
}
```

**Q: Styles not applying**
```css
/* Ensure CSS custom properties are set on :root or parent */
:root {
  --tab-bg: #ffffff;
  /* other properties */
}
```

**Q: Content not updating**
```javascript
// Re-render after dynamic changes
const tabs = document.querySelector('ck-tabs');
tabs.connectedCallback(); // Force re-render
```

**Q: Keyboard navigation not working**
```html
<!-- Ensure tab elements have proper structure -->
<ck-tabs>
  <ck-tab label="Tab 1">Content</ck-tab>
</ck-tabs>
```

### Debug Mode

Enable debug logging:
```javascript
window.CK_TABS_DEBUG = true;
```

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Setup

```bash
# Clone repository
git clone https://github.com/ColmKenna/ck-tabs-webcomponent.git

# Install dependencies  
npm install

# Start development server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

### Running Tests

```bash
# Unit tests
npm test

# With coverage
npm run test:coverage

# Watch mode
npm run test:watch

# Accessibility tests
npm test -- --testNamePattern="Accessibility"
```

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🔗 Links

- [Documentation](./docs/)
- [Technical Details](./docs/readme.technical.md)
- [Migration Guide](./docs/migration-guide.md)
- [Examples](./examples/)
- [GitHub Repository](https://github.com/ColmKenna/ck-tabs-webcomponent)
- [NPM Package](https://www.npmjs.com/package/@colmkenna/ck-tabs)

---

## 📝 Changelog

### v1.0.0
- Initial release
- Full WCAG 2.1 AA compliance
- Constructable Stylesheets support
- Comprehensive theming system
- Complete keyboard navigation
- TypeScript definitions included

A simple greeting component with customizable name and color.

```html
<!-- Basic usage -->
<hello-world></ck-tabs>

<!-- With custom name -->
<hello-world name="Developer"></ck-tabs>

<!-- With custom name and color -->
<hello-world name="Developer" color="#ff6b6b"></ck-tabs>
```

#### Attributes

| Attribute | Type   | Default | Description                    |
|-----------|--------|---------|--------------------------------|
| `name`    | string | "World" | The name to display in the greeting |
| `color`   | string | "#333"  | Text color for the message     |

#### Properties

The component also supports JavaScript property access:

```javascript
const ckTabs = document.querySelector('ck-tabs');
helloWorld.name = 'New Name';
ckTabs.color = '#blue';
```

## 🛠️ Development

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Setup

1. Clone the repository:
```bash
git clone https://github.com/ColmKenna/ck-tabs-webcomponent.git
cd ck-tabs-webcomponent
```

2. Install dependencies:
```bash
npm install
```

3. Start development mode:
```bash
npm run dev
```

4. Serve the demo page:
```bash
npm run serve
```

### Available Scripts

- `npm run build` - Build the library for production
- `npm run dev` - Build in watch mode for development
- `npm run serve` - Serve the dist folder on localhost:8080
- `npm run clean` - Clean the dist folder

### Project Structure

```
webcomponent-library/
├── src/
│   ├── components/
│   │   └── hello-world/
│   │       └── ck-tabs.component.ts
│   └── index.ts
├── dist/
│   ├── index.html (demo page)
│   ├── index.js (UMD build)
│   ├── index.esm.js (ES module build)
│   ├── index.min.js (minified UMD build)
│   └── index.d.ts (TypeScript definitions)
├── package.json
├── rollup.config.js
├── tsconfig.json
└── README.md
```

## 📖 Creating New Components

1. Create a new component file in `src/components/`:

```typescript
export class MyComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  private render() {
    this.shadowRoot!.innerHTML = `
      <style>
        /* Component styles */
      </style>
      <div>
        <!-- Component template -->
      </div>
    `;
  }
}

// Register the component
if (!customElements.get('my-component')) {
  customElements.define('my-component', MyComponent);
}
```

2. Export the component in `src/index.ts`:

```typescript
export { MyComponent } from './components/my-component/my-component.component';
import './components/my-component/my-component.component';
```

## 🚀 Publishing to GitHub Packages

### Automatic Publishing

The project is configured to automatically publish to GitHub Packages when you create a new release:

1. Update the version in `package.json`:
```bash
npm version patch  # or minor, major
```

2. Push the tag to GitHub:
```bash
git push origin --tags
```

3. The GitHub Action will automatically build and publish the package.

### Manual Publishing

You can also publish manually:

1. Build the project:
```bash
npm run build
```

2. Make sure you're authenticated with GitHub Packages:
```bash
npm login --scope=@colmkenna --registry=https://npm.pkg.github.com
```

3. Publish:
```bash
npm publish
```

## 📖 Using the Package

After installing, you can use the components in your HTML:

```html
<!DOCTYPE html>
<html>
<head>
    <script type="module">
      import '@colmkenna/ck-webcomponents/ck-tabs';
    </script>
</head>
<body>
    <hello-world name="GitHub Packages"></ck-tabs>
</body>
</html>
```

## 📄 License

MIT License - see LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For questions and support, please open an issue on GitHub.
