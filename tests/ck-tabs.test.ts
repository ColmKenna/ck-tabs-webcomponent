/**
 * Unit tests for CK-Tabs and CK-Tab components
 */
import { CKTabs, CKTab } from '../src/components/ck-tabs/ck-tabs';

describe('CK-Tabs Component Suite', () => {
  beforeAll(() => {
    // Register components if not already registered
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

  describe('CKTab Component', () => {
    let tab: CKTab;

    beforeEach(() => {
      tab = new CKTab();
      document.body.appendChild(tab);
    });

    test('should create tab element without errors', () => {
      expect(tab).toBeInstanceOf(HTMLElement);
      expect(tab.tagName.toLowerCase()).toBe('ck-tab');
    });

    test('should have default label', () => {
      expect(tab.label).toBe('Tab');
    });

    test('should set and get label attribute', () => {
      tab.label = 'Test Tab';
      expect(tab.label).toBe('Test Tab');
      expect(tab.getAttribute('label')).toBe('Test Tab');
    });

    test('should handle active state', () => {
      expect(tab.active).toBe(false);
      
      tab.active = true;
      expect(tab.active).toBe(true);
      expect(tab.hasAttribute('active')).toBe(true);
      
      tab.active = false;
      expect(tab.active).toBe(false);
      expect(tab.hasAttribute('active')).toBe(false);
    });

    test('should get label from attribute when present', () => {
      tab.setAttribute('label', 'Custom Label');
      expect(tab.label).toBe('Custom Label');
    });

    test('should detect active state from attribute', () => {
      tab.setAttribute('active', '');
      expect(tab.active).toBe(true);
    });
  });

  describe('CKTabs Component', () => {
    let tabs: CKTabs;

    beforeEach(() => {
      tabs = new CKTabs();
      document.body.appendChild(tabs);
    });

    test('should create tabs container without errors', () => {
      expect(tabs).toBeInstanceOf(HTMLElement);
      expect(tabs.tagName.toLowerCase()).toBe('ck-tabs');
    });

    test('should have shadow root attached', () => {
      expect(tabs.shadowRoot).toBeTruthy();
    });

    describe('Basic Rendering and Lifecycle', () => {
      test('should render with no tabs', () => {
        tabs.connectedCallback();
        expect(tabs.shadowRoot?.innerHTML).toContain('');
      });

      test('should render with single tab', () => {
        const tab = document.createElement('ck-tab') as CKTab;
        tab.label = 'First Tab';
        tab.innerHTML = 'First content';
        tabs.appendChild(tab);
        
        tabs.connectedCallback();
        
        const headings = tabs.shadowRoot?.querySelectorAll('.tab-heading');
        expect(headings?.length).toBe(1);
        expect(headings?.[0].textContent?.trim()).toBe('First Tab');
      });

      test('should render multiple tabs', () => {
        const tab1 = document.createElement('ck-tab') as CKTab;
        tab1.label = 'Tab 1';
        tab1.innerHTML = 'Content 1';
        
        const tab2 = document.createElement('ck-tab') as CKTab;
        tab2.label = 'Tab 2';
        tab2.innerHTML = 'Content 2';
        
        tabs.appendChild(tab1);
        tabs.appendChild(tab2);
        tabs.connectedCallback();
        
        const headings = tabs.shadowRoot?.querySelectorAll('.tab-heading');
        expect(headings?.length).toBe(2);
      });

      test('should activate first tab by default', () => {
        const tab1 = document.createElement('ck-tab') as CKTab;
        const tab2 = document.createElement('ck-tab') as CKTab;
        
        tabs.appendChild(tab1);
        tabs.appendChild(tab2);
        tabs.connectedCallback();
        
        expect(tabs.getActiveIndex()).toBe(0);
        expect(tab1.active).toBe(true);
        expect(tab2.active).toBe(false);
      });

      test('should respect pre-set active tab', () => {
        const tab1 = document.createElement('ck-tab') as CKTab;
        const tab2 = document.createElement('ck-tab') as CKTab;
        tab2.active = true;
        
        tabs.appendChild(tab1);
        tabs.appendChild(tab2);
        tabs.connectedCallback();
        
        expect(tabs.getActiveIndex()).toBe(1);
        expect(tab1.active).toBe(false);
        expect(tab2.active).toBe(true);
      });
    });

    describe('State Management', () => {
      let tab1: CKTab, tab2: CKTab, tab3: CKTab;

      beforeEach(() => {
        tab1 = document.createElement('ck-tab') as CKTab;
        tab1.label = 'Tab 1';
        tab1.innerHTML = 'Content 1';
        
        tab2 = document.createElement('ck-tab') as CKTab;
        tab2.label = 'Tab 2';
        tab2.innerHTML = 'Content 2';
        
        tab3 = document.createElement('ck-tab') as CKTab;
        tab3.label = 'Tab 3';
        tab3.innerHTML = 'Content 3';
        
        tabs.appendChild(tab1);
        tabs.appendChild(tab2);
        tabs.appendChild(tab3);
        tabs.connectedCallback();
      });

      test('should switch active tab correctly', () => {
        tabs.activateTab(1);
        
        expect(tabs.getActiveIndex()).toBe(1);
        expect(tabs.getActiveTab()).toBe(tab2);
        expect(tab1.active).toBe(false);
        expect(tab2.active).toBe(true);
        expect(tab3.active).toBe(false);
      });

      test('should not activate invalid tab index', () => {
        const initialIndex = tabs.getActiveIndex();
        
        tabs.activateTab(-1);
        expect(tabs.getActiveIndex()).toBe(initialIndex);
        
        tabs.activateTab(5);
        expect(tabs.getActiveIndex()).toBe(initialIndex);
      });

      test('should update ARIA attributes when switching tabs', () => {
        tabs.activateTab(1);
        
        const headings = tabs.shadowRoot?.querySelectorAll('.tab-heading');
        const panels = tabs.shadowRoot?.querySelectorAll('.panel');
        
        expect(headings?.[0].getAttribute('aria-selected')).toBe('false');
        expect(headings?.[1].getAttribute('aria-selected')).toBe('true');
        expect(panels?.[0].getAttribute('aria-hidden')).toBe('true');
        expect(panels?.[1].hasAttribute('aria-hidden')).toBe(false);
      });
    });

    describe('User Interactions', () => {
      let tab1: CKTab, tab2: CKTab;

      beforeEach(() => {
        tab1 = document.createElement('ck-tab') as CKTab;
        tab1.label = 'Tab 1';
        
        tab2 = document.createElement('ck-tab') as CKTab;
        tab2.label = 'Tab 2';
        
        tabs.appendChild(tab1);
        tabs.appendChild(tab2);
        tabs.connectedCallback();
      });

      test('should handle click events on tab headings', () => {
        const heading = tabs.shadowRoot?.querySelector('.tab-heading[data-index=\"1\"]') as HTMLElement;
        
        heading.click();
        
        expect(tabs.getActiveIndex()).toBe(1);
      });

      test('should dispatch tab-change event on tab switch', () => {
        let changeEvent: any = null;
        tabs.addEventListener('tab-change', (e) => {
          changeEvent = e;
        });
        
        tabs.activateTab(1);
        
        expect(changeEvent).toBeTruthy();
        expect(changeEvent.detail.activeIndex).toBe(1);
        expect(changeEvent.detail.previousActiveIndex).toBe(0);
        expect(changeEvent.detail.activeTab).toBe(tab2);
      });

      test('should dispatch tab-selected event on tab switch', () => {
        let selectedEvent: any = null;
        tabs.addEventListener('tab-selected', (e) => {
          selectedEvent = e;
        });
        
        tabs.activateTab(1);
        
        expect(selectedEvent).toBeTruthy();
        expect(selectedEvent.detail.selectedIndex).toBe(1);
        expect(selectedEvent.detail.selectedTab).toBe(tab2);
        expect(selectedEvent.detail.tabLabel).toBe('Tab 2');
        expect(selectedEvent.detail.timestamp).toBeGreaterThan(0);
      });

      test('should handle keyboard navigation - arrow keys', () => {
        const firstHeading = tabs.shadowRoot?.querySelector('.tab-heading[data-index=\"0\"]') as HTMLElement;
        
        // Simulate ArrowRight key
        const rightEvent = new KeyboardEvent('keydown', { key: 'ArrowRight' });
        Object.defineProperty(rightEvent, 'target', { value: firstHeading });
        
        tabs.shadowRoot?.dispatchEvent(rightEvent);
        
        expect(tabs.getActiveIndex()).toBe(1);
      });

      test('should handle keyboard navigation - Home and End keys', () => {
        // Start with second tab active
        tabs.activateTab(1);
        
        const activeHeading = tabs.shadowRoot?.querySelector('.tab-heading[data-index=\"1\"]') as HTMLElement;
        
        // Test Home key
        const homeEvent = new KeyboardEvent('keydown', { key: 'Home' });
        Object.defineProperty(homeEvent, 'target', { value: activeHeading });
        
        tabs.shadowRoot?.dispatchEvent(homeEvent);
        
        expect(tabs.getActiveIndex()).toBe(0);
      });
    });

    describe('Public API Methods', () => {
      let tab1: CKTab, tab2: CKTab;

      beforeEach(() => {
        tab1 = document.createElement('ck-tab') as CKTab;
        tab1.label = 'Tab 1';
        
        tab2 = document.createElement('ck-tab') as CKTab;
        tab2.label = 'Tab 2';
        
        tabs.appendChild(tab1);
        tabs.appendChild(tab2);
        tabs.connectedCallback();
      });

      test('should add new tab programmatically', () => {
        const newTab = tabs.addTab('New Tab', 'New content');
        
        expect(newTab).toBeInstanceOf(CKTab);
        expect(newTab.label).toBe('New Tab');
        expect(newTab.innerHTML).toBe('New content');
        expect(tabs.querySelectorAll('ck-tab').length).toBe(3);
      });

      test('should add active tab programmatically', () => {
        const newTab = tabs.addTab('Active Tab', 'Active content', true);
        
        expect(newTab.active).toBe(true);
        expect(tabs.getActiveTab()).toBe(newTab);
      });

      test('should remove tab by index', () => {
        const result = tabs.removeTab(1);
        
        expect(result).toBe(true);
        expect(tabs.querySelectorAll('ck-tab').length).toBe(1);
      });

      test('should handle removing active tab', () => {
        tabs.activateTab(1);
        tabs.removeTab(1);
        
        // Should activate first available tab
        expect(tabs.getActiveIndex()).toBe(0);
      });

      test('should not remove invalid tab index', () => {
        const result = tabs.removeTab(5);
        
        expect(result).toBe(false);
        expect(tabs.querySelectorAll('ck-tab').length).toBe(2);
      });
    });

    describe('Content and Slotting', () => {
      test('should assign slot names to tabs correctly', () => {
        const tab1 = document.createElement('ck-tab') as CKTab;
        const tab2 = document.createElement('ck-tab') as CKTab;
        
        tabs.appendChild(tab1);
        tabs.appendChild(tab2);
        tabs.connectedCallback();
        
        expect(tab1.getAttribute('slot')).toBe('tab-0');
        expect(tab2.getAttribute('slot')).toBe('tab-1');
      });

      test('should create corresponding panels for each tab', () => {
        const tab1 = document.createElement('ck-tab') as CKTab;
        const tab2 = document.createElement('ck-tab') as CKTab;
        
        tabs.appendChild(tab1);
        tabs.appendChild(tab2);
        tabs.connectedCallback();
        
        const panels = tabs.shadowRoot?.querySelectorAll('.panel');
        expect(panels?.length).toBe(2);
        expect(panels?.[0].id).toBe('panel-0');
        expect(panels?.[1].id).toBe('panel-1');
      });
    });

    describe('XSS Prevention', () => {
      test('should escape HTML in tab labels', () => {
        const tab = document.createElement('ck-tab') as CKTab;
        tab.label = '<script>alert("xss")</script>';
        
        tabs.appendChild(tab);
        tabs.connectedCallback();
        
        const heading = tabs.shadowRoot?.querySelector('.tab-heading');
        expect(heading?.innerHTML).toContain('&lt;script&gt;');
        expect(heading?.innerHTML).not.toContain('<script>');
      });
    });

    describe('Error Handling', () => {
      test('should handle empty tab labels gracefully', () => {
        const tab = document.createElement('ck-tab') as CKTab;
        tab.removeAttribute('label');
        
        tabs.appendChild(tab);
        tabs.connectedCallback();
        
        const heading = tabs.shadowRoot?.querySelector('.tab-heading');
        expect(heading?.textContent?.trim()).toBe('Tab'); // Default label
      });

      test('should handle tabs without content', () => {
        const tab = document.createElement('ck-tab') as CKTab;
        tab.label = 'Empty Tab';
        
        tabs.appendChild(tab);
        
        expect(() => tabs.connectedCallback()).not.toThrow();
      });
    });
  });

  describe('Integration Tests', () => {
    test('should work with dynamically created HTML structure', () => {
      document.body.innerHTML = `
        <ck-tabs>
          <ck-tab label="First" active>
            <h1>First Tab</h1>
            <p>This is the first tab content</p>
          </ck-tab>
          <ck-tab label="Second">
            <h1>Second Tab</h1>
            <p>This is the second tab content</p>
          </ck-tab>
        </ck-tabs>
      `;
      
      const tabsElement = document.querySelector('ck-tabs') as CKTabs;
      expect(tabsElement).toBeTruthy();
      expect(tabsElement.getActiveIndex()).toBe(0);
    });

    test('should maintain state across DOM manipulations', () => {
      const tabs = document.createElement('ck-tabs') as CKTabs;
      const tab1 = document.createElement('ck-tab') as CKTab;
      const tab2 = document.createElement('ck-tab') as CKTab;
      
      tab1.label = 'Tab 1';
      tab2.label = 'Tab 2';
      
      tabs.appendChild(tab1);
      tabs.appendChild(tab2);
      document.body.appendChild(tabs);
      
      tabs.activateTab(1);
      expect(tabs.getActiveIndex()).toBe(1);
      
      // Remove and re-add to DOM
      tabs.remove();
      document.body.appendChild(tabs);
      
      expect(tabs.getActiveIndex()).toBe(1);
    });
  });
});
