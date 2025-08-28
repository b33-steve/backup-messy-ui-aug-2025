'use client';

import { useEffect } from 'react';
import { generateCSSCustomProperties } from '../../lib/design-system';

export function DesignSystemProvider() {
  useEffect(() => {
    // Inject design system CSS custom properties
    const styleId = 'pm33-design-system';
    let style = document.getElementById(styleId);
    
    if (!style) {
      style = document.createElement('style');
      style.id = styleId;
      document.head.appendChild(style);
    }
    
    style.textContent = generateCSSCustomProperties();
  }, []);

  return null;
}