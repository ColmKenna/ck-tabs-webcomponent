import '@testing-library/jest-dom';

// Import components to register them
import { CKTab, CKTabs } from '../src/components/ck-tabs/ck-tabs';

// Custom element registration mock for testing
class MockCustomElementRegistry {
  private elements = new Map<string, CustomElementConstructor>();

  define(name: string, constructor: CustomElementConstructor) {
    this.elements.set(name, constructor);
  }

  get(name: string) {
    return this.elements.get(name);
  }

  whenDefined(name: string) {
    return Promise.resolve();
  }
}

// Setup JSDOM environment with custom elements
Object.defineProperty(window, 'customElements', {
  value: new MockCustomElementRegistry(),
  writable: true,
});

// Mock CSS constructable stylesheets
Object.defineProperty(window, 'CSSStyleSheet', {
  value: class MockCSSStyleSheet {
    replaceSync() {}
  },
  writable: true,
});

// Setup Shadow DOM support
if (!Element.prototype.attachShadow) {
  Element.prototype.attachShadow = function() {
    const shadow = document.createElement('div');
    shadow.innerHTML = '';
    this.appendChild(shadow);
    return shadow as any;
  };
}

// Register custom elements for testing
customElements.define('ck-tab', CKTab);
customElements.define('ck-tabs', CKTabs);

// Global test utilities
(global as any).sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Silence console warnings during tests unless debugging
const originalWarn = console.warn;
(global.console as any).warn = (...args: any[]) => {
  if (process.env.DEBUG_TESTS) {
    originalWarn(...args);
  }
};
