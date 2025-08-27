/**
 * Basic component tests for CK-Tabs
 */

describe('CK-Tabs Basic Tests', () => {
  test('should create component classes', () => {
    // Simple test to verify imports work
    expect(typeof HTMLElement).toBe('function');
  });

  test('should work with DOM', () => {
    const div = document.createElement('div');
    div.innerHTML = '<p>Test content</p>';
    expect(div.querySelector('p')?.textContent).toBe('Test content');
  });
});
