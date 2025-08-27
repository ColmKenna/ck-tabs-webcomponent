/**
 * TypeScript definitions for CK-Tabs Web Component
 */

/**
 * Individual tab element that holds tab content and label
 */
export declare class CKTab extends HTMLElement {
  /**
   * Creates a new CKTab instance
   */
  constructor();

  /**
   * Called when the element is added to the DOM
   */
  connectedCallback(): void;

  /**
   * Gets the label text for this tab
   */
  get label(): string;

  /**
   * Sets the label text for this tab
   */
  set label(value: string);

  /**
   * Gets whether this tab is currently active
   */
  get active(): boolean;

  /**
   * Sets whether this tab is currently active
   */
  set active(value: boolean);
}

/**
 * Container element that manages tab state and presentation
 */
export declare class CKTabs extends HTMLElement {
  /**
   * Creates a new CKTabs instance
   */
  constructor();

  /**
   * Called when the element is added to the DOM
   */
  connectedCallback(): void;

  /**
   * Gets the currently active tab element
   */
  getActiveTab(): CKTab | undefined;

  /**
   * Gets the index of the currently active tab
   */
  getActiveIndex(): number;

  /**
   * Activates a tab by index
   */
  activateTab(index: number): void;

  /**
   * Adds a new tab programmatically
   */
  addTab(label: string, content: string, active?: boolean): CKTab;

  /**
   * Removes a tab by index
   */
  removeTab(index: number): boolean;
}

/**
 * Event detail for tab-change event
 */
export interface TabChangeEventDetail {
  /** Index of the newly active tab */
  activeIndex: number;
  /** Reference to the newly active tab element */
  activeTab: CKTab;
  /** Index of the previously active tab */
  previousActiveIndex: number;
  /** Reference to the previously active tab element */
  previousActiveTab: CKTab;
}

/**
 * Event detail for tab-selected event
 */
export interface TabSelectedEventDetail {
  /** Index of the selected tab */
  selectedIndex: number;
  /** Reference to the selected tab element */
  selectedTab: CKTab;
  /** Label text of the selected tab */
  tabLabel: string;
  /** Reference to the tabs container element */
  tabElement: CKTabs;
  /** Timestamp when the tab was selected */
  timestamp: number;
}

/**
 * Custom event fired when the active tab changes
 */
export interface TabChangeEvent extends CustomEvent<TabChangeEventDetail> {
  type: 'tab-change';
  detail: TabChangeEventDetail;
}

/**
 * Custom event fired when a tab is selected
 */
export interface TabSelectedEvent extends CustomEvent<TabSelectedEventDetail> {
  type: 'tab-selected';
  detail: TabSelectedEventDetail;
}

/**
 * CSS Custom Properties supported by the component
 */
export interface CKTabsCSSProperties {
  /** Background color for tab headers */
  '--tab-bg'?: string;
  /** Border color for tabs container */
  '--tab-border'?: string;
  /** Text color for tab headers */
  '--tab-text'?: string;
  /** Background color on hover */
  '--tab-hover-bg'?: string;
  /** Primary accent color */
  '--primary-color'?: string;
  /** Primary color on hover/active */
  '--primary-hover'?: string;
  /** Light text color for active states */
  '--text-light'?: string;
  /** Background color for tab content */
  '--tab-content-bg'?: string;
  /** Text color for tab content */
  '--tab-content-text'?: string;
  /** Focus outline color */
  '--focus-color'?: string;
  /** Scrollbar track color */
  '--scrollbar-track'?: string;
  /** Scrollbar thumb color */
  '--scrollbar-thumb'?: string;
  /** Font family for tabs */
  '--tab-font-family'?: string;
  /** Font family for content headings */
  '--heading-font-family'?: string;
}

/**
 * Global declarations for custom elements
 */
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ck-tabs': React.DetailedHTMLProps<React.HTMLAttributes<CKTabs>, CKTabs> & {
        onTabChange?: (event: TabChangeEvent) => void;
        onTabSelected?: (event: TabSelectedEvent) => void;
        'onTab-change'?: (event: TabChangeEvent) => void;
        'onTab-selected'?: (event: TabSelectedEvent) => void;
      };
      'ck-tab': React.DetailedHTMLProps<React.HTMLAttributes<CKTab>, CKTab> & {
        label?: string;
        active?: boolean;
      };
    }
  }

  interface HTMLElementTagNameMap {
    'ck-tabs': CKTabs;
    'ck-tab': CKTab;
  }

  interface HTMLElementEventMap {
    'tab-change': TabChangeEvent;
    'tab-selected': TabSelectedEvent;
  }
}

/**
 * Module augmentation for CSS custom properties in styled-components
 */
declare module 'styled-components' {
  interface DefaultTheme {
    ckTabs?: CKTabsCSSProperties;
  }
}

/**
 * Utility type for theme configuration
 */
export type CKTabsTheme = Partial<CKTabsCSSProperties>;

/**
 * Predefined theme configurations
 */
export declare const themes: {
  light: CKTabsTheme;
  dark: CKTabsTheme;
  forest: CKTabsTheme;
  sunset: CKTabsTheme;
};

/**
 * Utility function to apply a theme
 */
export declare function applyTheme(theme: CKTabsTheme | string): void;

/**
 * Utility function to register custom elements (called automatically on import)
 */
export declare function registerComponents(): void;
