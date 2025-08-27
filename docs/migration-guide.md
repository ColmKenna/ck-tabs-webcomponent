# Migration Guide

This guide helps you migrate to CK-Tabs from other tab implementations or upgrade between versions of CK-Tabs.

## Table of Contents
- [From Legacy Implementations](#from-legacy-implementations)
- [From Popular Libraries](#from-popular-libraries)
- [Version Upgrades](#version-upgrades)
- [Migration Tools](#migration-tools)
- [Troubleshooting](#troubleshooting)

## From Legacy Implementations

### From HTML/CSS/JavaScript Tabs

#### Before (Traditional Implementation)
```html
<div class="tabs">
  <div class="tab-headers">
    <button class="tab-header active" data-tab="tab1">Tab 1</button>
    <button class="tab-header" data-tab="tab2">Tab 2</button>
  </div>
  <div class="tab-content">
    <div id="tab1" class="tab-panel active">Content 1</div>
    <div id="tab2" class="tab-panel">Content 2</div>
  </div>
</div>

<script>
document.querySelectorAll('.tab-header').forEach(header => {
  header.addEventListener('click', () => {
    // Custom tab switching logic
  });
});
</script>
```

#### After (CK-Tabs)
```html
<ck-tabs>
  <ck-tab label="Tab 1" active>Content 1</ck-tab>
  <ck-tab label="Tab 2">Content 2</ck-tab>
</ck-tabs>
```

#### Migration Benefits
- ✅ **Reduced Code**: 90% less HTML and no JavaScript required
- ✅ **Accessibility**: Built-in WCAG 2.1 AA compliance
- ✅ **Keyboard Navigation**: Automatic arrow key support
- ✅ **Mobile Support**: Responsive design included

## From Popular Libraries

### From Bootstrap Tabs

#### Before (Bootstrap 5)
```html
<ul class="nav nav-tabs" id="myTab" role="tablist">
  <li class="nav-item" role="presentation">
    <button class="nav-link active" id="home-tab" data-bs-toggle="tab" 
            data-bs-target="#home" type="button" role="tab">Home</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="profile-tab" data-bs-toggle="tab" 
            data-bs-target="#profile" type="button" role="tab">Profile</button>
  </li>
</ul>
<div class="tab-content" id="myTabContent">
  <div class="tab-pane fade show active" id="home" role="tabpanel">Home content</div>
  <div class="tab-pane fade" id="profile" role="tabpanel">Profile content</div>
</div>
```

#### After (CK-Tabs)
```html
<ck-tabs>
  <ck-tab label="Home" active>Home content</ck-tab>
  <ck-tab label="Profile">Profile content</ck-tab>
</ck-tabs>
```

#### Migration Steps
1. **Remove Bootstrap Dependencies**:
   ```bash
   npm uninstall bootstrap
   ```

2. **Install CK-Tabs**:
   ```bash
   npm install @colmkenna/ck-tabs
   ```

3. **Update Imports**:
   ```javascript
   // Remove
   import 'bootstrap/dist/css/bootstrap.min.css';
   import 'bootstrap/dist/js/bootstrap.bundle.min.js';
   
   // Add
   import '@colmkenna/ck-tabs';
   ```

4. **Convert HTML Structure**:
   - Replace `nav` and `tab-content` with `ck-tabs`
   - Convert each tab to `ck-tab` element
   - Move `data-bs-target` content into `ck-tab` body
   - Replace `active` class with `active` attribute

5. **Update CSS** (if using custom Bootstrap overrides):
   ```css
   /* Before */
   .nav-tabs .nav-link.active {
     background-color: #007bff;
   }
   
   /* After */
   ck-tabs {
     --primary-color: #007bff;
   }
   ```

### From jQuery UI Tabs

#### Before (jQuery UI)
```html
<div id="tabs">
  <ul>
    <li><a href="#tabs-1">Tab 1</a></li>
    <li><a href="#tabs-2">Tab 2</a></li>
  </ul>
  <div id="tabs-1">Content 1</div>
  <div id="tabs-2">Content 2</div>
</div>

<script>
$('#tabs').tabs({
  active: 0,
  activate: function(event, ui) {
    console.log('Tab activated:', ui.newTab.index());
  }
});
</script>
```

#### After (CK-Tabs)
```html
<ck-tabs id="tabs">
  <ck-tab label="Tab 1" active>Content 1</ck-tab>
  <ck-tab label="Tab 2">Content 2</ck-tab>
</ck-tabs>

<script>
document.getElementById('tabs').addEventListener('tab-change', (e) => {
  console.log('Tab activated:', e.detail.activeIndex);
});
</script>
```

#### Migration Steps
1. **Remove jQuery Dependencies**:
   ```bash
   npm uninstall jquery jquery-ui
   ```

2. **Convert Event Handlers**:
   ```javascript
   // Before
   $('#tabs').on('tabsactivate', function(event, ui) {
     // Handle tab change
   });
   
   // After
   document.querySelector('ck-tabs').addEventListener('tab-change', (e) => {
     // Handle tab change
   });
   ```

3. **Update Initialization**:
   ```javascript
   // Before
   $('#tabs').tabs({
     active: 2,
     disabled: [1, 3]
   });
   
   // After - Set via HTML attributes
   // <ck-tab label="Tab 3" active>...</ck-tab>
   // Disabled tabs not directly supported - use CSS
   ```

### From React Tabs

#### Before (react-tabs)
```jsx
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

function MyTabs() {
  return (
    <Tabs>
      <TabList>
        <Tab>Tab 1</Tab>
        <Tab>Tab 2</Tab>
      </TabList>
      <TabPanel>Content 1</TabPanel>
      <TabPanel>Content 2</TabPanel>
    </Tabs>
  );
}
```

#### After (CK-Tabs in React)
```jsx
import '@colmkenna/ck-tabs';

function MyTabs() {
  return (
    <ck-tabs>
      <ck-tab label="Tab 1" active>Content 1</ck-tab>
      <ck-tab label="Tab 2">Content 2</ck-tab>
    </ck-tabs>
  );
}
```

#### React Integration Notes
- Use `ref` for imperative actions:
  ```jsx
  const tabsRef = useRef();
  
  const handleActivateSecond = () => {
    tabsRef.current?.activateTab(1);
  };
  
  return <ck-tabs ref={tabsRef}>...</ck-tabs>;
  ```

- Handle events with `onTab-change`:
  ```jsx
  <ck-tabs onTab-change={(e) => console.log(e.detail)}>
    ...
  </ck-tabs>
  ```

## Version Upgrades

### From v0.x to v1.0

#### Breaking Changes
1. **Component Registration**: Auto-registration behavior changed
2. **Event Names**: Event names now use kebab-case
3. **CSS Custom Properties**: Some property names changed

#### Migration Steps

1. **Update Event Listeners**:
   ```javascript
   // Before v1.0
   tabs.addEventListener('tabChange', handler);
   tabs.addEventListener('tabSelected', handler);
   
   // v1.0+
   tabs.addEventListener('tab-change', handler);
   tabs.addEventListener('tab-selected', handler);
   ```

2. **Update CSS Custom Properties**:
   ```css
   /* Before v1.0 */
   ck-tabs {
     --tabBackground: #ffffff;
     --tabTextColor: #333333;
   }
   
   /* v1.0+ */
   ck-tabs {
     --tab-bg: #ffffff;
     --tab-text: #333333;
   }
   ```

3. **Component Registration**:
   ```javascript
   // Before v1.0 - Manual registration required
   import { CKTabs, CKTab } from '@colmkenna/ck-tabs';
   customElements.define('ck-tabs', CKTabs);
   customElements.define('ck-tab', CKTab);
   
   // v1.0+ - Auto-registration
   import '@colmkenna/ck-tabs';
   // Components automatically registered
   ```

### Future Version Considerations

#### Anticipated v2.0 Changes
- Enhanced theming system
- Additional accessibility features
- Performance optimizations
- Possible API refinements

#### Staying Informed
- Watch the [GitHub repository](https://github.com/ColmKenna/ck-tabs-webcomponent) for updates
- Check [release notes](https://github.com/ColmKenna/ck-tabs-webcomponent/releases) for breaking changes
- Follow [migration guides](https://github.com/ColmKenna/ck-tabs-webcomponent/docs) for major updates

## Migration Tools

### Automated Migration Script

Create a migration script for bulk updates:

```javascript
// migrate-to-ck-tabs.js
const fs = require('fs');
const path = require('path');

function migrateBootstrapTabs(htmlContent) {
  // Replace Bootstrap tab structure with CK-Tabs
  return htmlContent
    .replace(/<ul class="nav nav-tabs"[^>]*>[\s\S]*?<\/ul>/g, '')
    .replace(/<div class="tab-content"[^>]*>/g, '<ck-tabs>')
    .replace(/<\/div><!-- tab-content -->/g, '</ck-tabs>')
    .replace(/<div class="tab-pane[^"]*"[^>]*>/g, '<ck-tab>')
    .replace(/<\/div><!-- tab-pane -->/g, '</ck-tab>');
}

// Process files
const files = ['index.html', 'about.html']; // Add your files
files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const migrated = migrateBootstrapTabs(content);
  fs.writeFileSync(file, migrated);
});
```

### CSS Migration Helper

```css
/* migration-helper.css - Temporary compatibility styles */
.nav-tabs-compat {
  /* Styles to bridge the gap during migration */
}

/* Remove after migration is complete */
```

### Testing Migration

Create a test suite to verify migration:

```javascript
// migration.test.js
describe('Migration Tests', () => {
  test('Bootstrap tabs replaced correctly', () => {
    // Test that old Bootstrap structure is gone
    expect(document.querySelector('.nav-tabs')).toBeNull();
    expect(document.querySelector('ck-tabs')).toBeTruthy();
  });
  
  test('Functionality preserved', () => {
    // Test that tab switching still works
    const tabs = document.querySelector('ck-tabs');
    tabs.activateTab(1);
    expect(tabs.getActiveIndex()).toBe(1);
  });
});
```

## Troubleshooting

### Common Migration Issues

#### Issue: "Custom element not defined"
```
Uncaught DOMException: Failed to construct 'CustomElement'
```

**Solution**: Ensure CK-Tabs is imported before use:
```javascript
import '@colmkenna/ck-tabs';
// Use components after import
```

#### Issue: Styles not applying
**Problem**: Custom properties not inherited
**Solution**: Set properties on parent element:
```css
:root {
  --tab-bg: #ffffff;
  /* other properties */
}
```

#### Issue: Content not displaying
**Problem**: Missing slot content
**Solution**: Ensure content is inside `ck-tab` elements:
```html
<!-- Wrong -->
<ck-tabs>
  <div>Content outside tab</div>
  <ck-tab label="Tab">Empty</ck-tab>
</ck-tabs>

<!-- Correct -->
<ck-tabs>
  <ck-tab label="Tab">Content inside tab</ck-tab>
</ck-tabs>
```

#### Issue: Events not firing
**Problem**: Event listener attached before component registration
**Solution**: Wait for component registration:
```javascript
customElements.whenDefined('ck-tabs').then(() => {
  const tabs = document.querySelector('ck-tabs');
  tabs.addEventListener('tab-change', handler);
});
```

### Performance Issues After Migration

#### Issue: Slower than previous implementation
**Investigation**: 
1. Check for excessive re-renders
2. Monitor memory usage
3. Profile JavaScript execution

**Solutions**:
1. Batch DOM updates
2. Use event delegation
3. Optimize CSS selectors

### Browser Compatibility Issues

#### Issue: Not working in older browsers
**Solution**: Add polyfills:
```html
<script src="https://unpkg.com/@webcomponents/webcomponentsjs@2/webcomponents-loader.js"></script>
```

#### Issue: Styling differences across browsers
**Solution**: Use CSS custom properties consistently:
```css
ck-tabs {
  --tab-font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
```

## Migration Checklist

### Pre-Migration
- [ ] Audit current tab implementations
- [ ] Identify customizations that need migration
- [ ] Plan migration phases (if doing gradual migration)
- [ ] Set up testing environment
- [ ] Backup current implementation

### During Migration
- [ ] Install CK-Tabs package
- [ ] Update imports/includes
- [ ] Convert HTML structure
- [ ] Migrate CSS customizations
- [ ] Update JavaScript event handlers
- [ ] Test functionality thoroughly
- [ ] Verify accessibility compliance

### Post-Migration
- [ ] Remove old dependencies
- [ ] Clean up unused CSS
- [ ] Update documentation
- [ ] Performance testing
- [ ] User acceptance testing
- [ ] Deploy to production

### Validation
- [ ] All tabs display correctly
- [ ] Tab switching works as expected
- [ ] Keyboard navigation functional
- [ ] Mobile experience preserved
- [ ] Custom styling applied correctly
- [ ] Event handlers working
- [ ] Performance meets requirements
- [ ] Accessibility standards met

## Getting Help

### Resources
- [GitHub Issues](https://github.com/ColmKenna/ck-tabs-webcomponent/issues) - Report migration problems
- [Documentation](../README.md) - Complete API reference
- [Examples](../examples/) - Working implementation examples

### Support Channels
- GitHub Discussions for migration questions
- Stack Overflow tag: `ck-tabs`
- Community Discord (if available)

### Professional Services
For large-scale migrations, consider:
- Migration consulting services
- Custom migration script development
- Training sessions for development teams

Remember: Migration is an iterative process. Start small, test thoroughly, and gradually expand to full implementation.
