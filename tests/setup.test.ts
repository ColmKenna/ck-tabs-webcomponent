/**
 * Simple test to verify Jest setup
 */

describe('Jest Setup', () => {
  test('should run basic test', () => {
    expect(1 + 1).toBe(2);
  });

  test('should have JSDOM environment', () => {
    expect(document).toBeDefined();
    expect(window).toBeDefined();
  });
});
