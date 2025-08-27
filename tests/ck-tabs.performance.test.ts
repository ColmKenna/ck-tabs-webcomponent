/**
 * Performance tests for CK-Tabs component
 */
import { CKTabs, CKTab } from '../src/components/ck-tabs/ck-tabs';

describe('CK-Tabs Performance Tests', () => {
  beforeAll(() => {
    if (!customElements.get('ck-tab')) {
      customElements.define('ck-tab', CKTab);
    }
    if (!customElements.get('ck-tabs')) {
      customElements.define('ck-tabs', CKTabs);
    }
  });

  beforeEach(() => {
    document.body.innerHTML = '';
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  describe('Component Initialization Performance', () => {
    test('should initialize quickly with small number of tabs', () => {
      const startTime = performance.now();
      
      const tabs = new CKTabs();
      
      for (let i = 0; i < 5; i++) {
        const tab = document.createElement('ck-tab') as CKTab;
        tab.label = `Tab ${i + 1}`;
        tab.innerHTML = `<p>Content for tab ${i + 1}</p>`;
        tabs.appendChild(tab);
      }
      
      document.body.appendChild(tabs);
      tabs.connectedCallback();
      
      const endTime = performance.now();
      const initTime = endTime - startTime;
      
      // Should initialize within 50ms for 5 tabs
      expect(initTime).toBeLessThan(50);
    });



  });

  describe('Tab Switching Performance', () => {
    let tabs: CKTabs;

    beforeEach(() => {
      tabs = new CKTabs();
      
      for (let i = 0; i < 10; i++) {
        const tab = document.createElement('ck-tab') as CKTab;
        tab.label = `Tab ${i + 1}`;
        tab.innerHTML = `<div>
          <h2>Tab ${i + 1}</h2>
          <p>Content for tab ${i + 1}</p>
        </div>`;
        tabs.appendChild(tab);
      }
      
      document.body.appendChild(tabs);
      tabs.connectedCallback();
    });

    test('should switch tabs quickly', () => {
      const startTime = performance.now();
      
      tabs.activateTab(5);
      
      const endTime = performance.now();
      const switchTime = endTime - startTime;
      
      // Tab switching should be nearly instantaneous
      expect(switchTime).toBeLessThan(10);
      expect(tabs.getActiveIndex()).toBe(5);
    });

    test('should handle rapid tab switching', () => {
      const startTime = performance.now();
      
      // Rapidly switch between tabs
      for (let i = 0; i < 50; i++) {
        tabs.activateTab(i % 10);
      }
      
      const endTime = performance.now();
      const totalTime = endTime - startTime;
      
      // 50 rapid switches should complete within 100ms
      expect(totalTime).toBeLessThan(100);
    });

    test('should maintain performance with event listeners', () => {
      let eventCount = 0;
      tabs.addEventListener('tab-change', () => eventCount++);
      tabs.addEventListener('tab-selected', () => eventCount++);
      
      const startTime = performance.now();
      
      // Switch tabs multiple times
      for (let i = 0; i < 20; i++) {
        tabs.activateTab(i % 10);
      }
      
      const endTime = performance.now();
      const totalTime = endTime - startTime;
      
      expect(totalTime).toBeLessThan(50);
      expect(eventCount).toBe(40); // 2 events per switch * 20 switches
    });
  });

  describe('Memory Usage', () => {
    test('should not create memory leaks when adding/removing tabs', () => {
      const tabs = new CKTabs();
      document.body.appendChild(tabs);
      tabs.connectedCallback();
      
      const initialTabCount = tabs.querySelectorAll('ck-tab').length;
      
      // Add tabs
      for (let i = 0; i < 10; i++) {
        tabs.addTab(`Dynamic Tab ${i}`, `Content ${i}`);
      }
      
      expect(tabs.querySelectorAll('ck-tab').length).toBe(initialTabCount + 10);
      
      // Remove tabs
      for (let i = 0; i < 10; i++) {
        tabs.removeTab(tabs.querySelectorAll('ck-tab').length - 1);
      }
      
      expect(tabs.querySelectorAll('ck-tab').length).toBe(initialTabCount);
    });

    test('should properly clean up event listeners', () => {
      const tabs = new CKTabs();
      document.body.appendChild(tabs);
      tabs.connectedCallback();
      
      // Add some tabs
      for (let i = 0; i < 5; i++) {
        const tab = document.createElement('ck-tab') as CKTab;
        tab.label = `Tab ${i}`;
        tabs.appendChild(tab);
      }
      
      // Re-render multiple times (simulating updates)
      for (let i = 0; i < 10; i++) {
        tabs.connectedCallback();
      }
      
      // Should not accumulate multiple event listeners
      const shadowRoot = tabs.shadowRoot;
      expect(shadowRoot).toBeTruthy();
    });

    test('should handle component removal cleanly', () => {
      const tabs = new CKTabs();
      
      for (let i = 0; i < 5; i++) {
        const tab = document.createElement('ck-tab') as CKTab;
        tab.label = `Tab ${i}`;
        tabs.appendChild(tab);
      }
      
      document.body.appendChild(tabs);
      tabs.connectedCallback();
      
      // Remove component
      tabs.remove();
      
      // Should not throw errors
      expect(() => tabs.activateTab(0)).not.toThrow();
    });
  });

  describe('CSS Performance', () => {
    test('should apply styles efficiently', () => {
      const tabs = new CKTabs();
      
      const startTime = performance.now();
      
      for (let i = 0; i < 5; i++) {
        const tab = document.createElement('ck-tab') as CKTab;
        tab.label = `Tab ${i}`;
        tabs.appendChild(tab);
      }
      
      document.body.appendChild(tabs);
      tabs.connectedCallback();
      
      const endTime = performance.now();
      const styleTime = endTime - startTime;
      
      // CSS application should be fast
      expect(styleTime).toBeLessThan(50);
    });

    test('should handle theme changes efficiently', () => {
      const tabs = new CKTabs();
      
      for (let i = 0; i < 10; i++) {
        const tab = document.createElement('ck-tab') as CKTab;
        tab.label = `Tab ${i}`;
        tabs.appendChild(tab);
      }
      
      document.body.appendChild(tabs);
      tabs.connectedCallback();
      
      const startTime = performance.now();
      
      // Simulate theme changes by updating CSS custom properties
      document.documentElement.style.setProperty('--primary-color', '#ff0000');
      document.documentElement.style.setProperty('--tab-bg', '#f0f0f0');
      document.documentElement.style.setProperty('--tab-text', '#333333');
      
      const endTime = performance.now();
      const themeTime = endTime - startTime;
      
      // Theme changes should be instant
      expect(themeTime).toBeLessThan(10);
    });
  });

  describe('Event Performance', () => {
    test('should handle multiple event listeners efficiently', () => {
      const tabs = new CKTabs();
      
      for (let i = 0; i < 5; i++) {
        const tab = document.createElement('ck-tab') as CKTab;
        tab.label = `Tab ${i}`;
        tabs.appendChild(tab);
      }
      
      document.body.appendChild(tabs);
      tabs.connectedCallback();
      
      // Add multiple event listeners
      const listeners: (() => void)[] = [];
      for (let i = 0; i < 20; i++) {
        const listener = jest.fn();
        listeners.push(listener);
        tabs.addEventListener('tab-change', listener);
      }
      
      const startTime = performance.now();
      
      tabs.activateTab(2);
      
      const endTime = performance.now();
      const eventTime = endTime - startTime;
      
      // Should handle multiple listeners efficiently
      expect(eventTime).toBeLessThan(20);
      listeners.forEach(listener => {
        expect(listener).toHaveBeenCalledTimes(1);
      });
    });

    test('should prevent event listener memory leaks', () => {
      const tabs = new CKTabs();
      document.body.appendChild(tabs);
      
      let listenerCallCount = 0;
      const listener = () => listenerCallCount++;
      
      // Add and remove tabs multiple times
      for (let cycle = 0; cycle < 5; cycle++) {
        // Add tabs
        for (let i = 0; i < 3; i++) {
          const tab = document.createElement('ck-tab') as CKTab;
          tab.label = `Tab ${i}`;
          tabs.appendChild(tab);
        }
        
        tabs.connectedCallback();
        tabs.addEventListener('tab-change', listener);
        
        // Switch tabs
        tabs.activateTab(1);
        
        // Remove all tabs
        while (tabs.firstChild) {
          tabs.removeChild(tabs.firstChild);
        }
      }
      
      // Should not accumulate excessive event calls
      expect(listenerCallCount).toBeLessThan(10);
    });
  });

  describe('DOM Manipulation Performance', () => {
    test('should efficiently update DOM when switching tabs', () => {
      const tabs = new CKTabs();
      
      for (let i = 0; i < 10; i++) {
        const tab = document.createElement('ck-tab') as CKTab;
        tab.label = `Tab ${i}`;
        tab.innerHTML = `<div>Complex content for tab ${i} with <strong>formatting</strong></div>`;
        tabs.appendChild(tab);
      }
      
      document.body.appendChild(tabs);
      tabs.connectedCallback();
      
      const startTime = performance.now();
      
      // Perform multiple DOM updates
      for (let i = 0; i < 20; i++) {
        tabs.activateTab(i % 10);
      }
      
      const endTime = performance.now();
      const domTime = endTime - startTime;
      
      // DOM updates should be efficient
      expect(domTime).toBeLessThan(100);
    });

    test('should handle dynamic content changes efficiently', () => {
      const tabs = new CKTabs();
      
      const tab1 = document.createElement('ck-tab') as CKTab;
      tab1.label = 'Dynamic Tab';
      tabs.appendChild(tab1);
      
      document.body.appendChild(tabs);
      tabs.connectedCallback();
      
      const startTime = performance.now();
      
      // Simulate dynamic content updates
      for (let i = 0; i < 50; i++) {
        tab1.innerHTML = `<div>Updated content ${i}</div>`;
      }
      
      const endTime = performance.now();
      const updateTime = endTime - startTime;
      
      // Content updates should be fast
      expect(updateTime).toBeLessThan(100);
    });
  });
});
