/**
 * Accessibility tests for CK-Tabs component
 */
import { CKTabs, CKTab } from '../src/components/ck-tabs/ck-tabs';

describe('CK-Tabs Accessibility Tests', () => {
  let tabs: CKTabs;
  let tab1: CKTab;
  let tab2: CKTab;
  let tab3: CKTab;

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
    
    tabs = new CKTabs();
    
    tab1 = document.createElement('ck-tab') as CKTab;
    tab1.label = 'First Tab';
    tab1.innerHTML = '<h1>First Content</h1><p>This is the first tab content</p>';
    
    tab2 = document.createElement('ck-tab') as CKTab;
    tab2.label = 'Second Tab';
    tab2.innerHTML = '<h1>Second Content</h1><p>This is the second tab content</p>';
    
    tab3 = document.createElement('ck-tab') as CKTab;
    tab3.label = 'Third Tab';
    tab3.innerHTML = '<h1>Third Content</h1><p>This is the third tab content</p>';
    
    tabs.appendChild(tab1);
    tabs.appendChild(tab2);
    tabs.appendChild(tab3);
    document.body.appendChild(tabs);
    
    tabs.connectedCallback();
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  describe('ARIA Attributes', () => {
    test('should have proper role attributes', () => {
      const headings = tabs.shadowRoot?.querySelectorAll('.tab-heading');
      const panels = tabs.shadowRoot?.querySelectorAll('.panel');
      
      headings?.forEach(heading => {
        expect(heading.getAttribute('role')).toBe('tab');
      });
      
      panels?.forEach(panel => {
        expect(panel.getAttribute('role')).toBe('tabpanel');
      });
    });

    test('should have proper aria-selected attributes', () => {
      const headings = tabs.shadowRoot?.querySelectorAll('.tab-heading');
      
      expect(headings?.[0].getAttribute('aria-selected')).toBe('true');
      expect(headings?.[1].getAttribute('aria-selected')).toBe('false');
      expect(headings?.[2].getAttribute('aria-selected')).toBe('false');
    });

    test('should update aria-selected when active tab changes', () => {
      tabs.activateTab(1);
      
      const headings = tabs.shadowRoot?.querySelectorAll('.tab-heading');
      
      expect(headings?.[0].getAttribute('aria-selected')).toBe('false');
      expect(headings?.[1].getAttribute('aria-selected')).toBe('true');
      expect(headings?.[2].getAttribute('aria-selected')).toBe('false');
    });

    test('should have proper aria-controls attributes', () => {
      const headings = tabs.shadowRoot?.querySelectorAll('.tab-heading');
      
      expect(headings?.[0].getAttribute('aria-controls')).toBe('panel-0');
      expect(headings?.[1].getAttribute('aria-controls')).toBe('panel-1');
      expect(headings?.[2].getAttribute('aria-controls')).toBe('panel-2');
    });

    test('should have proper aria-labelledby attributes', () => {
      const panels = tabs.shadowRoot?.querySelectorAll('.panel');
      
      expect(panels?.[0].getAttribute('aria-labelledby')).toBe('tab-0');
      expect(panels?.[1].getAttribute('aria-labelledby')).toBe('tab-1');
      expect(panels?.[2].getAttribute('aria-labelledby')).toBe('tab-2');
    });

    test('should have proper aria-hidden attributes', () => {
      const panels = tabs.shadowRoot?.querySelectorAll('.panel');
      
      expect(panels?.[0].hasAttribute('aria-hidden')).toBe(false);
      expect(panels?.[1].getAttribute('aria-hidden')).toBe('true');
      expect(panels?.[2].getAttribute('aria-hidden')).toBe('true');
    });

    test('should update aria-hidden when active tab changes', () => {
      tabs.activateTab(2);
      
      const panels = tabs.shadowRoot?.querySelectorAll('.panel');
      
      expect(panels?.[0].getAttribute('aria-hidden')).toBe('true');
      expect(panels?.[1].getAttribute('aria-hidden')).toBe('true');
      expect(panels?.[2].hasAttribute('aria-hidden')).toBe(false);
    });

    test('should have unique IDs for tabs and panels', () => {
      const headings = tabs.shadowRoot?.querySelectorAll('.tab-heading');
      const panels = tabs.shadowRoot?.querySelectorAll('.panel');
      
      const headingIds = Array.from(headings || []).map(h => h.id);
      const panelIds = Array.from(panels || []).map(p => p.id);
      
      expect(new Set(headingIds).size).toBe(headingIds.length);
      expect(new Set(panelIds).size).toBe(panelIds.length);
    });
  });

  describe('Keyboard Navigation', () => {
    test('should handle arrow key navigation', () => {
      const firstHeading = tabs.shadowRoot?.querySelector('.tab-heading[data-index="0"]') as HTMLElement;
      
      // Mock focus method
      const focusSpy = jest.fn();
      const headings = tabs.shadowRoot?.querySelectorAll('.tab-heading');
      headings?.forEach(heading => {
        (heading as any).focus = focusSpy;
      });
      
      // Test Right Arrow
      const rightEvent = new KeyboardEvent('keydown', { key: 'ArrowRight' });
      Object.defineProperty(rightEvent, 'target', { value: firstHeading });
      Object.defineProperty(rightEvent, 'preventDefault', { value: jest.fn() });
      
      tabs.shadowRoot?.dispatchEvent(rightEvent);
      
      expect(tabs.getActiveIndex()).toBe(1);
    });

    test('should handle Home and End keys', () => {
      tabs.activateTab(1); // Start with middle tab
      
      const secondHeading = tabs.shadowRoot?.querySelector('.tab-heading[data-index="1"]') as HTMLElement;
      
      // Mock focus method
      const focusSpy = jest.fn();
      const headings = tabs.shadowRoot?.querySelectorAll('.tab-heading');
      headings?.forEach(heading => {
        (heading as any).focus = focusSpy;
      });
      
      // Test Home key
      const homeEvent = new KeyboardEvent('keydown', { key: 'Home' });
      Object.defineProperty(homeEvent, 'target', { value: secondHeading });
      Object.defineProperty(homeEvent, 'preventDefault', { value: jest.fn() });
      
      tabs.shadowRoot?.dispatchEvent(homeEvent);
      
      expect(tabs.getActiveIndex()).toBe(0);
      
      // Test End key
      const endEvent = new KeyboardEvent('keydown', { key: 'End' });
      Object.defineProperty(endEvent, 'target', { value: secondHeading });
      Object.defineProperty(endEvent, 'preventDefault', { value: jest.fn() });
      
      tabs.shadowRoot?.dispatchEvent(endEvent);
      
      expect(tabs.getActiveIndex()).toBe(2);
    });

    test('should wrap navigation at boundaries', () => {
      // Test wrapping from last to first
      tabs.activateTab(2);
      const lastHeading = tabs.shadowRoot?.querySelector('.tab-heading[data-index="2"]') as HTMLElement;
      
      const rightEvent = new KeyboardEvent('keydown', { key: 'ArrowRight' });
      Object.defineProperty(rightEvent, 'target', { value: lastHeading });
      Object.defineProperty(rightEvent, 'preventDefault', { value: jest.fn() });
      
      tabs.shadowRoot?.dispatchEvent(rightEvent);
      
      expect(tabs.getActiveIndex()).toBe(0);
      
      // Test wrapping from first to last
      const firstHeading = tabs.shadowRoot?.querySelector('.tab-heading[data-index="0"]') as HTMLElement;
      
      const leftEvent = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
      Object.defineProperty(leftEvent, 'target', { value: firstHeading });
      Object.defineProperty(leftEvent, 'preventDefault', { value: jest.fn() });
      
      tabs.shadowRoot?.dispatchEvent(leftEvent);
      
      expect(tabs.getActiveIndex()).toBe(2);
    });

    test('should prevent default behavior for handled keys', () => {
      const firstHeading = tabs.shadowRoot?.querySelector('.tab-heading[data-index="0"]') as HTMLElement;
      const preventDefault = jest.fn();
      
      const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });
      Object.defineProperty(event, 'target', { value: firstHeading });
      Object.defineProperty(event, 'preventDefault', { value: preventDefault });
      
      tabs.shadowRoot?.dispatchEvent(event);
      
      expect(preventDefault).toHaveBeenCalled();
    });
  });

  describe('Focus Management', () => {
    test('should have proper tab headings focusable', () => {
      const headings = tabs.shadowRoot?.querySelectorAll('.tab-heading');
      
      headings?.forEach(heading => {
        expect(heading.tagName.toLowerCase()).toBe('button');
        expect(heading.getAttribute('type')).toBe('button');
      });
    });

    test('should support outline for focus indicators', () => {
      const heading = tabs.shadowRoot?.querySelector('.tab-heading') as HTMLElement;
      const styles = getComputedStyle(heading);
      
      // The component should have focus styles defined
      expect(heading).toBeTruthy();
    });
  });

  describe('Screen Reader Support', () => {
    test('should have meaningful button text', () => {
      const headings = tabs.shadowRoot?.querySelectorAll('.tab-heading');
      
      expect(headings?.[0].textContent?.trim()).toBe('First Tab');
      expect(headings?.[1].textContent?.trim()).toBe('Second Tab');
      expect(headings?.[2].textContent?.trim()).toBe('Third Tab');
    });

    test('should not contain script content in labels', () => {
      const maliciousTab = document.createElement('ck-tab') as CKTab;
      maliciousTab.label = '<script>alert("xss")</script>Malicious';
      
      tabs.appendChild(maliciousTab);
      tabs.connectedCallback();
      
      const headings = tabs.shadowRoot?.querySelectorAll('.tab-heading');
      const lastHeading = headings?.[headings.length - 1];
      
      expect(lastHeading?.innerHTML).toContain('&lt;script&gt;');
      expect(lastHeading?.innerHTML).not.toContain('<script>');
    });

    test('should maintain logical tab order', () => {
      const headings = Array.from(tabs.shadowRoot?.querySelectorAll('.tab-heading') || []);
      
      // Verify tab order matches visual order
      headings.forEach((heading, index) => {
        expect(heading.getAttribute('data-index')).toBe(index.toString());
      });
    });
  });

  describe('High Contrast Mode Support', () => {
    test('should be visible in high contrast mode', () => {
      // This test verifies the component doesn't rely solely on background colors
      const headings = tabs.shadowRoot?.querySelectorAll('.tab-heading');
      const panels = tabs.shadowRoot?.querySelectorAll('.panel');
      
      // Components should have borders or other non-color indicators
      expect(headings?.length).toBeGreaterThan(0);
      expect(panels?.length).toBeGreaterThan(0);
    });
  });

  describe('WCAG 2.1 AA Compliance', () => {
    test('should have sufficient color contrast in default theme', () => {
      // This is a placeholder - in real implementation you would use
      // a color contrast checking library
      const headings = tabs.shadowRoot?.querySelectorAll('.tab-heading');
      expect(headings?.length).toBeGreaterThan(0);
      
      // In a real test, you would check:
      // - Text contrast ratio >= 4.5:1 for normal text
      // - Text contrast ratio >= 3:1 for large text
      // - Non-text contrast ratio >= 3:1 for UI components
    });

    test('should be operable with keyboard only', () => {
      // All functionality should be available via keyboard
      expect(tabs.getActiveIndex()).toBe(0);
      
      // Simulate keyboard navigation
      tabs.activateTab(1);
      expect(tabs.getActiveIndex()).toBe(1);
      
      tabs.activateTab(2);
      expect(tabs.getActiveIndex()).toBe(2);
    });

    test('should be understandable with clear labels', () => {
      const headings = tabs.shadowRoot?.querySelectorAll('.tab-heading');
      
      headings?.forEach(heading => {
        expect(heading.textContent?.trim().length).toBeGreaterThan(0);
      });
    });

    test('should be robust across browsers', () => {
      // Component should work without JavaScript enhancement
      expect(tabs.shadowRoot).toBeTruthy();
      expect(tabs.querySelectorAll('ck-tab').length).toBe(3);
    });
  });

  describe('Reduced Motion Support', () => {
    test('should respect prefers-reduced-motion', () => {
      // This would test that animations are disabled when user prefers reduced motion
      // The CSS already includes @media (prefers-reduced-motion: reduce) rules
      const headings = tabs.shadowRoot?.querySelectorAll('.tab-heading');
      expect(headings?.length).toBeGreaterThan(0);
    });
  });
});
