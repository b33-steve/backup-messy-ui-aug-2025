'use client';

import React, { useEffect, useState, createContext, useContext } from 'react';
import { MantineProvider, createTheme, CSSVariablesResolver, useMantineColorScheme } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/charts/styles.css';
import '@mantine/dropzone/styles.css';
import '@mantine/spotlight/styles.css';

/**
 * PM33 Complete UI System - Official Mantine Theme Integration
 * 
 * This implementation follows Mantine's official best practices using cssVariablesResolver
 * to properly integrate PM33 design tokens with Mantine's CSS variable system.
 * 
 * APPROACH: Uses cssVariablesResolver (official method) instead of component overrides
 * REFERENCE: PM33_COMPLETE_UI_SYSTEM.MD + Mantine official documentation
 * COMPATIBILITY: Full semantic color support (c="dimmed", c="bright", etc.)
 */

/**
 * Official Mantine CSS Variables Resolver
 * Maps PM33 design tokens to Mantine's CSS variable system for seamless integration
 */
const pm33CssVariablesResolver: CSSVariablesResolver = (theme) => ({
  variables: {
    // Theme-independent variables (spacing, radius, shadows)
    '--mantine-spacing-xs': '0.5rem',    // 8px - PM33 space-2
    '--mantine-spacing-sm': '0.75rem',   // 12px - PM33 space-3
    '--mantine-spacing-md': '1rem',      // 16px - PM33 space-4
    '--mantine-spacing-lg': '1.5rem',    // 24px - PM33 space-6
    '--mantine-spacing-xl': '2rem',      // 32px - PM33 space-8
    
    '--mantine-radius-xs': '4px',        // PM33 minimal radius
    '--mantine-radius-sm': '8px',        // PM33 small radius
    '--mantine-radius-md': '12px',       // PM33 standard radius
    '--mantine-radius-lg': '16px',       // PM33 card radius
    '--mantine-radius-xl': '20px',       // PM33 large radius
    
    '--mantine-shadow-xs': '0 1px 3px 0 rgba(31, 38, 135, 0.1)',
    '--mantine-shadow-sm': '0 4px 6px -1px rgba(31, 38, 135, 0.1)',
    '--mantine-shadow-md': '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
    '--mantine-shadow-lg': '0 20px 60px 0 rgba(31, 38, 135, 0.25)',
    '--mantine-shadow-xl': '0 25px 50px -12px rgba(31, 38, 135, 0.25)',
  },
  
  light: {
    // Core text and body colors - CRITICAL for default styling
    '--mantine-color-text': 'var(--pm33-text-primary)',         // All default text
    '--mantine-color-body': 'var(--pm33-bg-primary)',           // Body background
    '--mantine-color-error': 'var(--pm33-danger)',              // Error states
    '--mantine-color-placeholder': 'var(--pm33-text-muted)',    // Input placeholders
    '--mantine-color-anchor': 'var(--pm33-primary)',            // Links
    
    // Default component colors - Paper, Card, etc.
    '--mantine-color-default': 'var(--pm33-bg-secondary)',      // Default backgrounds
    '--mantine-color-default-hover': 'var(--pm33-bg-tertiary)', // Hover states
    '--mantine-color-default-color': 'var(--pm33-text-primary)', // Default component text
    '--mantine-color-default-border': 'var(--pm33-border)',     // Default borders
    
    // Semantic colors for c="dimmed", c="bright" etc.
    '--mantine-color-dimmed': 'var(--pm33-text-secondary)',     // c="dimmed"
    '--mantine-color-bright': 'var(--pm33-text-primary)',       // c="bright"
    '--mantine-color-dark': 'var(--pm33-text-primary)',         // c="dark"
    
    // Complete Mantine dark palette override (light theme)
    '--mantine-color-dark-0': 'var(--pm33-text-primary)',       // Darkest text
    '--mantine-color-dark-1': 'var(--pm33-text-primary)',
    '--mantine-color-dark-2': 'var(--pm33-text-secondary)',
    '--mantine-color-dark-3': 'var(--pm33-text-muted)',
    '--mantine-color-dark-4': 'var(--pm33-bg-tertiary)',
    '--mantine-color-dark-5': 'var(--pm33-bg-secondary)',
    '--mantine-color-dark-6': 'var(--pm33-bg-secondary)',
    '--mantine-color-dark-7': 'var(--pm33-bg-primary)',         // Lightest bg
    '--mantine-color-dark-8': 'var(--pm33-bg-primary)',
    '--mantine-color-dark-9': 'var(--pm33-bg-primary)',
    
    // ThemeIcon light variants that were causing light backgrounds
    '--mantine-color-blue-light': 'var(--pm33-primary-100)',
    '--mantine-color-blue-light-color': 'var(--pm33-primary)',
    '--mantine-color-indigo-light': 'var(--pm33-primary-100)',
    '--mantine-color-indigo-light-color': 'var(--pm33-primary)',
    '--mantine-color-yellow-light': 'var(--pm33-warning-100)',
    '--mantine-color-yellow-light-color': 'var(--pm33-warning)',
    '--mantine-color-teal-light': 'var(--pm33-success-100)',
    '--mantine-color-teal-light-color': 'var(--pm33-success)',
    
    // Color-specific filled variants
    '--mantine-color-blue-filled': 'var(--pm33-primary)',
    '--mantine-color-indigo-filled': 'var(--pm33-primary)',
    '--mantine-color-yellow-filled': 'var(--pm33-warning)',
    '--mantine-color-teal-filled': 'var(--pm33-success)',
    
    // Primary color scale
    '--mantine-primary-color-0': 'var(--pm33-primary-50)',
    '--mantine-primary-color-1': 'var(--pm33-primary-100)',
    '--mantine-primary-color-2': 'var(--pm33-primary-200)',
    '--mantine-primary-color-3': 'var(--pm33-primary-300)',
    '--mantine-primary-color-4': 'var(--pm33-primary-400)',
    '--mantine-primary-color-5': 'var(--pm33-primary)',
    '--mantine-primary-color-6': 'var(--pm33-primary)',
    '--mantine-primary-color-7': 'var(--pm33-primary)',
    '--mantine-primary-color-8': 'var(--pm33-primary-800)',
    '--mantine-primary-color-9': 'var(--pm33-primary-900)',

    // COMPREHENSIVE COLOR SCALE MAPPINGS - Light Theme
    // Gray color scale (most common: bg="gray.0", c="gray.4")
    '--mantine-color-gray-0': 'var(--pm33-text-muted-10)',      // Light background for gray.0
    '--mantine-color-gray-1': 'var(--pm33-text-muted-20)',      
    '--mantine-color-gray-2': 'var(--pm33-text-muted-30)',
    '--mantine-color-gray-3': 'var(--pm33-text-muted-40)',
    '--mantine-color-gray-4': 'var(--pm33-text-secondary)',      // c="gray.4" → theme-aware
    '--mantine-color-gray-5': 'var(--pm33-text-muted)',
    '--mantine-color-gray-6': 'var(--pm33-text-primary)',
    '--mantine-color-gray-7': 'var(--pm33-text-primary)',
    '--mantine-color-gray-8': 'var(--pm33-text-primary)',
    '--mantine-color-gray-9': 'var(--pm33-text-primary)',

    // Indigo color scale (common: bg="indigo.0", c="indigo.6")
    '--mantine-color-indigo-0': 'var(--pm33-primary-50)',       // Light background for indigo.0
    '--mantine-color-indigo-1': 'var(--pm33-primary-100)',
    '--mantine-color-indigo-2': 'var(--pm33-primary-200)',
    '--mantine-color-indigo-3': 'var(--pm33-primary-300)',
    '--mantine-color-indigo-4': 'var(--pm33-primary-400)',
    '--mantine-color-indigo-5': 'var(--pm33-primary)',
    '--mantine-color-indigo-6': 'var(--pm33-primary-400)',    // c="indigo.6" → lighter primary for readability
    '--mantine-color-indigo-7': 'var(--pm33-primary)',
    '--mantine-color-indigo-8': 'var(--pm33-primary-800)',
    '--mantine-color-indigo-9': 'var(--pm33-primary-900)',

    // Blue color scale
    '--mantine-color-blue-0': 'var(--pm33-primary-50)',
    '--mantine-color-blue-1': 'var(--pm33-primary-100)',
    '--mantine-color-blue-2': 'var(--pm33-primary-200)',
    '--mantine-color-blue-3': 'var(--pm33-primary-300)',
    '--mantine-color-blue-4': 'var(--pm33-primary-400)',
    '--mantine-color-blue-5': 'var(--pm33-primary-400)',    // c="blue.5" → lighter for readability
    '--mantine-color-blue-6': 'var(--pm33-primary-400)',    // c="blue.6" → lighter for readability
    '--mantine-color-blue-7': 'var(--pm33-primary)',
    '--mantine-color-blue-8': 'var(--pm33-primary-800)',
    '--mantine-color-blue-9': 'var(--pm33-primary-900)',

    // Teal/Green color scale (common: bg="teal.0", c="green.6")
    '--mantine-color-teal-0': 'var(--pm33-success-50)',         // Light background for teal.0
    '--mantine-color-teal-1': 'var(--pm33-success-100)',
    '--mantine-color-teal-2': 'var(--pm33-success-200)',
    '--mantine-color-teal-3': 'var(--pm33-success-300)',
    '--mantine-color-teal-4': 'var(--pm33-success-400)',
    '--mantine-color-teal-5': 'var(--pm33-success)',
    '--mantine-color-teal-6': 'var(--pm33-success)',
    '--mantine-color-teal-7': 'var(--pm33-success)',
    '--mantine-color-teal-8': 'var(--pm33-success-800)',
    '--mantine-color-teal-9': 'var(--pm33-success-900)',

    '--mantine-color-green-0': 'var(--pm33-success-50)',
    '--mantine-color-green-1': 'var(--pm33-success-100)',
    '--mantine-color-green-2': 'var(--pm33-success-200)',
    '--mantine-color-green-3': 'var(--pm33-success-300)',
    '--mantine-color-green-4': 'var(--pm33-success-400)',
    '--mantine-color-green-5': 'var(--pm33-success)',
    '--mantine-color-green-6': 'var(--pm33-success)',           // c="green.6" → success
    '--mantine-color-green-7': 'var(--pm33-success)',
    '--mantine-color-green-8': 'var(--pm33-success-800)',
    '--mantine-color-green-9': 'var(--pm33-success-900)',

    // Red color scale (common: bg="red.0")
    '--mantine-color-red-0': 'var(--pm33-danger-50)',           // Light background for red.0
    '--mantine-color-red-1': 'var(--pm33-danger-100)',
    '--mantine-color-red-2': 'var(--pm33-danger-200)',
    '--mantine-color-red-3': 'var(--pm33-danger-300)',
    '--mantine-color-red-4': 'var(--pm33-danger-400)',
    '--mantine-color-red-5': 'var(--pm33-danger)',
    '--mantine-color-red-6': 'var(--pm33-danger)',
    '--mantine-color-red-7': 'var(--pm33-danger)',
    '--mantine-color-red-8': 'var(--pm33-danger-800)',
    '--mantine-color-red-9': 'var(--pm33-danger-900)',

    // Orange/Yellow color scale (common: bg="orange.0", bg="yellow.0")
    '--mantine-color-orange-0': 'var(--pm33-warning-50)',       // Light background for orange.0
    '--mantine-color-orange-1': 'var(--pm33-warning-100)',
    '--mantine-color-orange-2': 'var(--pm33-warning-200)',
    '--mantine-color-orange-3': 'var(--pm33-warning-300)',
    '--mantine-color-orange-4': 'var(--pm33-warning-400)',
    '--mantine-color-orange-5': 'var(--pm33-warning)',
    '--mantine-color-orange-6': 'var(--pm33-warning)',
    '--mantine-color-orange-7': 'var(--pm33-warning)',
    '--mantine-color-orange-8': 'var(--pm33-warning-800)',
    '--mantine-color-orange-9': 'var(--pm33-warning-900)',

    '--mantine-color-yellow-0': 'var(--pm33-warning-50)',
    '--mantine-color-yellow-1': 'var(--pm33-warning-100)',
    '--mantine-color-yellow-2': 'var(--pm33-warning-200)',
    '--mantine-color-yellow-3': 'var(--pm33-warning-300)',
    '--mantine-color-yellow-4': 'var(--pm33-warning-400)',
    '--mantine-color-yellow-5': 'var(--pm33-warning)',
    '--mantine-color-yellow-6': 'var(--pm33-warning)',
    '--mantine-color-yellow-7': 'var(--pm33-warning)',
    '--mantine-color-yellow-8': 'var(--pm33-warning-800)',
    '--mantine-color-yellow-9': 'var(--pm33-warning-900)',

    // Purple color scale
    '--mantine-color-purple-0': 'var(--pm33-primary-50)',       // Map to primary for consistency
    '--mantine-color-purple-1': 'var(--pm33-primary-100)',
    '--mantine-color-purple-2': 'var(--pm33-primary-200)',
    '--mantine-color-purple-3': 'var(--pm33-primary-300)',
    '--mantine-color-purple-4': 'var(--pm33-primary-400)',
    '--mantine-color-purple-5': 'var(--pm33-primary)',
    '--mantine-color-purple-6': 'var(--pm33-primary)',
    '--mantine-color-purple-7': 'var(--pm33-primary)',
    '--mantine-color-purple-8': 'var(--pm33-primary-800)',
    '--mantine-color-purple-9': 'var(--pm33-primary-900)',
  },
  
  dark: {
    // Core text and body colors - CRITICAL for dark mode styling
    '--mantine-color-text': 'var(--pm33-text-primary)',         // White text for all components
    '--mantine-color-body': 'var(--pm33-bg-primary)',           // Dark body background
    '--mantine-color-error': 'var(--pm33-danger)',              // Error states
    '--mantine-color-placeholder': 'var(--pm33-text-muted)',    // Input placeholders
    '--mantine-color-anchor': 'var(--pm33-primary)',            // Links
    
    // Default component colors - MUST be dark in dark mode
    '--mantine-color-default': 'var(--pm33-bg-secondary)',      // Dark component backgrounds
    '--mantine-color-default-hover': 'var(--pm33-bg-tertiary)', // Hover states
    '--mantine-color-default-color': 'var(--pm33-text-primary)', // White component text
    '--mantine-color-default-border': 'var(--pm33-border)',     // Dark borders
    
    // Semantic colors for dark mode
    '--mantine-color-dimmed': 'var(--pm33-text-secondary)',     // c="dimmed" → light gray
    '--mantine-color-bright': 'var(--pm33-text-primary)',       // c="bright" → white
    '--mantine-color-dark': 'var(--pm33-text-muted)',           // c="dark" → muted in dark mode
    
    // Complete Mantine dark palette override (dark theme) - CRITICAL
    '--mantine-color-dark-0': 'var(--pm33-text-primary)',       // White (lightest text)
    '--mantine-color-dark-1': 'var(--pm33-text-secondary)',     // Light gray text
    '--mantine-color-dark-2': 'var(--pm33-text-muted)',         // Muted text
    '--mantine-color-dark-3': 'var(--pm33-bg-tertiary)',        // Light background
    '--mantine-color-dark-4': 'var(--pm33-bg-secondary)',       // Medium background  
    '--mantine-color-dark-5': 'var(--pm33-bg-secondary)',       // Default bg
    '--mantine-color-dark-6': 'var(--pm33-bg-secondary)',       // Card backgrounds
    '--mantine-color-dark-7': 'var(--pm33-bg-primary)',         // Dark body background
    '--mantine-color-dark-8': 'var(--pm33-bg-primary)',         // Darker
    '--mantine-color-dark-9': 'var(--pm33-bg-primary)',         // Darkest
    
    // ThemeIcon light variants - MUST be dark in dark mode
    '--mantine-color-blue-light': 'var(--pm33-bg-secondary)',
    '--mantine-color-blue-light-color': 'var(--pm33-primary)',
    '--mantine-color-indigo-light': 'var(--pm33-bg-secondary)',
    '--mantine-color-indigo-light-color': 'var(--pm33-primary)',
    '--mantine-color-yellow-light': 'var(--pm33-bg-secondary)',
    '--mantine-color-yellow-light-color': 'var(--pm33-warning)',
    '--mantine-color-teal-light': 'var(--pm33-bg-secondary)',
    '--mantine-color-teal-light-color': 'var(--pm33-success)',
    
    // Color-specific filled variants
    '--mantine-color-blue-filled': 'var(--pm33-primary)',
    '--mantine-color-indigo-filled': 'var(--pm33-primary)',
    '--mantine-color-yellow-filled': 'var(--pm33-warning)',
    '--mantine-color-teal-filled': 'var(--pm33-success)',
    
    // Primary color scale for dark theme
    '--mantine-primary-color-0': 'var(--pm33-primary-50)',
    '--mantine-primary-color-1': 'var(--pm33-primary-100)',
    '--mantine-primary-color-2': 'var(--pm33-primary-200)',
    '--mantine-primary-color-3': 'var(--pm33-primary-300)',
    '--mantine-primary-color-4': 'var(--pm33-primary-400)',
    '--mantine-primary-color-5': 'var(--pm33-primary)',
    '--mantine-primary-color-6': 'var(--pm33-primary)',
    '--mantine-primary-color-7': 'var(--pm33-primary)',
    '--mantine-primary-color-8': 'var(--pm33-primary-800)',
    '--mantine-primary-color-9': 'var(--pm33-primary-900)',

    // COMPREHENSIVE COLOR SCALE MAPPINGS - Dark Theme
    // Gray color scale - CRITICAL for dark mode (bg="gray.0" must be dark)
    '--mantine-color-gray-0': 'var(--pm33-bg-secondary)',       // Dark background for gray.0
    '--mantine-color-gray-1': 'var(--pm33-bg-tertiary)',       
    '--mantine-color-gray-2': 'var(--pm33-border)',
    '--mantine-color-gray-3': 'var(--pm33-text-muted)',
    '--mantine-color-gray-4': 'var(--pm33-text-secondary)',     // c="gray.4" → light gray in dark mode
    '--mantine-color-gray-5': 'var(--pm33-text-secondary)',
    '--mantine-color-gray-6': 'var(--pm33-text-primary)',
    '--mantine-color-gray-7': 'var(--pm33-text-primary)',
    '--mantine-color-gray-8': 'var(--pm33-text-primary)',
    '--mantine-color-gray-9': 'var(--pm33-text-primary)',

    // Indigo color scale - adjusted for dark mode
    '--mantine-color-indigo-0': 'var(--pm33-primary-100)',      // Slightly darker background for dark mode
    '--mantine-color-indigo-1': 'var(--pm33-primary-200)',
    '--mantine-color-indigo-2': 'var(--pm33-primary-300)',
    '--mantine-color-indigo-3': 'var(--pm33-primary-400)',
    '--mantine-color-indigo-4': 'var(--pm33-primary-400)',    // c="indigo.4" → lighter primary for readability
    '--mantine-color-indigo-5': 'var(--pm33-primary)',
    '--mantine-color-indigo-6': 'var(--pm33-primary-400)',    // c="indigo.6" → lighter primary for readability
    '--mantine-color-indigo-7': 'var(--pm33-primary)',
    '--mantine-color-indigo-8': 'var(--pm33-primary-800)',
    '--mantine-color-indigo-9': 'var(--pm33-primary-900)',

    // Blue color scale
    '--mantine-color-blue-0': 'var(--pm33-primary-100)',
    '--mantine-color-blue-1': 'var(--pm33-primary-200)',
    '--mantine-color-blue-2': 'var(--pm33-primary-300)',
    '--mantine-color-blue-3': 'var(--pm33-primary-400)',
    '--mantine-color-blue-4': 'var(--pm33-primary-400)',    // c="blue.4" → lighter for readability
    '--mantine-color-blue-5': 'var(--pm33-primary-400)',    // c="blue.5" → lighter for readability
    '--mantine-color-blue-6': 'var(--pm33-primary-400)',    // c="blue.6" → lighter for readability
    '--mantine-color-blue-7': 'var(--pm33-primary)',
    '--mantine-color-blue-8': 'var(--pm33-primary-800)',
    '--mantine-color-blue-9': 'var(--pm33-primary-900)',

    // Teal/Green color scale - adjusted for dark mode visibility
    '--mantine-color-teal-0': 'var(--pm33-success-100)',        // Darker background for dark mode
    '--mantine-color-teal-1': 'var(--pm33-success-200)',
    '--mantine-color-teal-2': 'var(--pm33-success-300)',
    '--mantine-color-teal-3': 'var(--pm33-success-400)',
    '--mantine-color-teal-4': 'var(--pm33-success)',
    '--mantine-color-teal-5': 'var(--pm33-success)',
    '--mantine-color-teal-6': 'var(--pm33-success)',
    '--mantine-color-teal-7': 'var(--pm33-success)',
    '--mantine-color-teal-8': 'var(--pm33-success-800)',
    '--mantine-color-teal-9': 'var(--pm33-success-900)',

    '--mantine-color-green-0': 'var(--pm33-success-100)',
    '--mantine-color-green-1': 'var(--pm33-success-200)',
    '--mantine-color-green-2': 'var(--pm33-success-300)',
    '--mantine-color-green-3': 'var(--pm33-success-400)',
    '--mantine-color-green-4': 'var(--pm33-success)',
    '--mantine-color-green-5': 'var(--pm33-success)',
    '--mantine-color-green-6': 'var(--pm33-success)',           // c="green.6" → success
    '--mantine-color-green-7': 'var(--pm33-success)',
    '--mantine-color-green-8': 'var(--pm33-success-800)',
    '--mantine-color-green-9': 'var(--pm33-success-900)',

    // Red color scale - adjusted for dark mode
    '--mantine-color-red-0': 'var(--pm33-danger-100)',          // Darker background for dark mode
    '--mantine-color-red-1': 'var(--pm33-danger-200)',
    '--mantine-color-red-2': 'var(--pm33-danger-300)',
    '--mantine-color-red-3': 'var(--pm33-danger-400)',
    '--mantine-color-red-4': 'var(--pm33-danger)',
    '--mantine-color-red-5': 'var(--pm33-danger)',
    '--mantine-color-red-6': 'var(--pm33-danger)',
    '--mantine-color-red-7': 'var(--pm33-danger)',
    '--mantine-color-red-8': 'var(--pm33-danger-800)',
    '--mantine-color-red-9': 'var(--pm33-danger-900)',

    // Orange/Yellow color scale - adjusted for dark mode
    '--mantine-color-orange-0': 'var(--pm33-warning-100)',      // Darker background for dark mode
    '--mantine-color-orange-1': 'var(--pm33-warning-200)',
    '--mantine-color-orange-2': 'var(--pm33-warning-300)',
    '--mantine-color-orange-3': 'var(--pm33-warning-400)',
    '--mantine-color-orange-4': 'var(--pm33-warning)',
    '--mantine-color-orange-5': 'var(--pm33-warning)',
    '--mantine-color-orange-6': 'var(--pm33-warning)',
    '--mantine-color-orange-7': 'var(--pm33-warning)',
    '--mantine-color-orange-8': 'var(--pm33-warning-800)',
    '--mantine-color-orange-9': 'var(--pm33-warning-900)',

    '--mantine-color-yellow-0': 'var(--pm33-warning-100)',
    '--mantine-color-yellow-1': 'var(--pm33-warning-200)',
    '--mantine-color-yellow-2': 'var(--pm33-warning-300)',
    '--mantine-color-yellow-3': 'var(--pm33-warning-400)',
    '--mantine-color-yellow-4': 'var(--pm33-warning)',
    '--mantine-color-yellow-5': 'var(--pm33-warning)',
    '--mantine-color-yellow-6': 'var(--pm33-warning)',
    '--mantine-color-yellow-7': 'var(--pm33-warning)',
    '--mantine-color-yellow-8': 'var(--pm33-warning-800)',
    '--mantine-color-yellow-9': 'var(--pm33-warning-900)',

    // Purple color scale - mapped to primary for consistency
    '--mantine-color-purple-0': 'var(--pm33-primary-100)',      // Darker for dark mode
    '--mantine-color-purple-1': 'var(--pm33-primary-200)',
    '--mantine-color-purple-2': 'var(--pm33-primary-300)',
    '--mantine-color-purple-3': 'var(--pm33-primary-400)',
    '--mantine-color-purple-4': 'var(--pm33-primary)',
    '--mantine-color-purple-5': 'var(--pm33-primary)',
    '--mantine-color-purple-6': 'var(--pm33-primary)',
    '--mantine-color-purple-7': 'var(--pm33-primary)',
    '--mantine-color-purple-8': 'var(--pm33-primary-800)',
    '--mantine-color-purple-9': 'var(--pm33-primary-900)',
  },
});

/**
 * PM33 Color System - Integrated with Mantine Theme
 * This bridges our PM33 color system with Mantine's color scheme management
 */
const PM33_COLORS = {
  light: {
    // Core brand colors
    primary: '#1e3a8a',
    secondary: '#0891b2',
    aiGlow: '#06b6d4',
    success: '#0891b2',
    warning: '#f59e0b',
    danger: '#dc2626',
    
    // Text colors
    textPrimary: '#1e293b',
    textSecondary: '#475569',
    textMuted: '#64748b',
    
    // Background colors
    bgPrimary: '#fafbfc',
    bgSecondary: '#f8fafc',
    bgTertiary: '#f1f5f9',
    bgElevated: '#ffffff',
    
    // Borders
    border: '#e2e8f0',
  },
  dark: {
    // Core brand colors
    primary: '#1e3a8a',
    secondary: '#0891b2',
    aiGlow: '#06b6d4',
    success: '#0891b2',
    warning: '#f59e0b',
    danger: '#dc2626',
    
    // Text colors
    textPrimary: '#ffffff',
    textSecondary: '#e2e8f0',
    textMuted: '#94a3b8',
    
    // Background colors
    bgPrimary: '#0f172a',
    bgSecondary: '#1e293b',
    bgTertiary: '#334155',
    bgElevated: '#475569',
    
    // Borders
    border: '#334155',
  },
  native: {
    // Gradient theme
    primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    secondary: 'linear-gradient(135deg, #764ba2 0%, #f093fb 100%)',
    aiGlow: 'linear-gradient(135deg, #00d2ff 0%, #3a7bd5 100%)',
    success: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
    warning: 'linear-gradient(135deg, #f2994a 0%, #f2c94c 100%)',
    danger: 'linear-gradient(135deg, #eb3349 0%, #f45c43 100%)',
    
    // Text colors
    textPrimary: '#1e293b',
    textSecondary: '#64748b',
    textMuted: '#9ca3af',
    
    // Background colors
    bgPrimary: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
    bgSecondary: 'rgba(255, 255, 255, 0.95)',
    bgTertiary: 'rgba(255, 255, 255, 0.8)',
    bgElevated: 'rgba(255, 255, 255, 0.9)',
    
    // Borders
    border: 'rgba(124, 58, 237, 0.2)',
  }
};

/**
 * Theme Bridge Component
 * Synchronizes Mantine's color scheme with PM33 CSS variables
 */
function ThemeBridge() {
  const { colorScheme } = useMantineColorScheme();
  
  useEffect(() => {
    const root = document.documentElement;
    
    // Map Mantine's light/dark to our PM33 colors
    // For native theme, we'll default to light colors with gradients
    const themeKey = colorScheme === 'dark' ? 'dark' : 'light';
    const colors = PM33_COLORS[themeKey];
    
    // Set PM33 CSS variables based on current Mantine color scheme
    Object.entries(colors).forEach(([key, value]) => {
      const kebabKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      root.style.setProperty(`--pm33-${kebabKey}`, value);
    });
    
    // Set theme class and data attributes for compatibility
    root.classList.remove('light', 'dark', 'native');
    root.classList.add(colorScheme);
    root.setAttribute('data-theme', colorScheme);
    
    // Apply to body as well
    document.body.className = document.body.className.replace(/\b(light|dark|native)\b/g, '').trim();
    document.body.classList.add(colorScheme);
    
  }, [colorScheme]);
  
  return null; // This component only handles side effects
}

type PM33Theme = 'light' | 'dark' | 'native';

interface PM33ThemeContextType {
  currentTheme: PM33Theme;
  setTheme: (theme: PM33Theme) => void;
  toggleTheme: () => void;
}

interface ThemedStylesType {
  getColors: () => Record<string, string>;
  getSurfaceStyles: () => Record<string, string>;
}

const PM33ThemeContext = createContext<PM33ThemeContextType | undefined>(undefined);
const ThemedStylesContext = createContext<ThemedStylesType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(PM33ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within PM33 theme context');
  }
  return context;
};

export const useThemedStyles = () => {
  const context = useContext(ThemedStylesContext);
  if (!context) {
    throw new Error('useThemedStyles must be used within PM33 theme context');
  }
  return context;
};

const theme = createTheme({
  /** PM33 Theme Integration - Official Mantine Approach */
  primaryColor: 'blue',
  
  // PM33 Typography System (matches globals.css)
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
  headings: {
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
    fontWeight: '600',
    sizes: {
      h1: { fontSize: '2.5rem', lineHeight: '1.2' },      // 40px - PM33 system
      h2: { fontSize: '2rem', lineHeight: '1.2' },        // 32px - PM33 system  
      h3: { fontSize: '1.5rem', lineHeight: '1.33' },     // 24px - PM33 system
      h4: { fontSize: '1.25rem', lineHeight: '1.4' },     // 20px - PM33 system
      h5: { fontSize: '1.125rem', lineHeight: '1.44' },   // 18px - PM33 system
      h6: { fontSize: '1rem', lineHeight: '1.5' },        // 16px - PM33 system
    }
  },
  
  // Minimal component overrides - let cssVariablesResolver handle colors
  components: {
    Card: {
      defaultProps: {
        radius: 'lg',
        shadow: 'md',
        padding: 'lg',
      },
      styles: {
        root: {
          transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          '&:hover': {
            transform: 'translateY(-2px)',
          }
        }
      }
    },
    
    Button: {
      defaultProps: {
        radius: 'md',
        size: 'md',
      },
      styles: {
        root: {
          transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          fontWeight: 500,
          '&:hover': {
            transform: 'translateY(-1px) scale(1.02)',
          }
        }
      }
    },
    
    Input: {
      defaultProps: {
        radius: 'md',
      }
    },
    
    Modal: {
      defaultProps: {
        radius: 'lg',
        shadow: 'xl',
        centered: true,
      }
    }
  }
});

interface MantineWrapperProps {
  children: React.ReactNode;
}

/**
 * PM33 Theme Provider Integration
 * Bridges PM33's 3-theme system (light/dark/native) with Mantine's light/dark system
 */
function PM33ThemeProvider({ children }: { children: React.ReactNode }) {
  const { setColorScheme } = useMantineColorScheme();
  const [currentTheme, setCurrentTheme] = useState<PM33Theme>('light');
  
  // Load theme from localStorage on mount with light mode default
  useEffect(() => {
    const savedTheme = localStorage.getItem('pm33-theme') as PM33Theme;
    if (savedTheme && ['light', 'dark', 'native'].includes(savedTheme)) {
      setCurrentTheme(savedTheme);
      // For native theme, we use light mode in Mantine but apply gradient CSS
      const mantineScheme = savedTheme === 'dark' ? 'dark' : 'light';
      setColorScheme(mantineScheme);
    } else {
      // Default to light mode (fixes default loading issue)
      setCurrentTheme('light');
      setColorScheme('light');
      // Don't save to localStorage until user explicitly chooses
    }
  }, [setColorScheme]);
  
  const setTheme = (theme: PM33Theme) => {
    setCurrentTheme(theme);
    localStorage.setItem('pm33-theme', theme);
    
    // Map PM33 theme to Mantine color scheme
    const mantineScheme = theme === 'dark' ? 'dark' : 'light';
    setColorScheme(mantineScheme);
    
    // For native theme, apply special styling
    if (theme === 'native') {
      const root = document.documentElement;
      const colors = PM33_COLORS.native;
      Object.entries(colors).forEach(([key, value]) => {
        const kebabKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
        root.style.setProperty(`--pm33-${kebabKey}`, value);
      });
      root.classList.add('native');
      root.setAttribute('data-theme', 'native');
    }
  };
  
  const toggleTheme = () => {
    const themes: PM33Theme[] = ['light', 'dark', 'native'];
    const currentIndex = themes.indexOf(currentTheme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    setTheme(nextTheme);
  };
  
  const getColors = () => PM33_COLORS[currentTheme];

  const getSurfaceStyles = () => ({
    glassCard: {
      background: `var(--pm33-glass)`,
      backdropFilter: 'blur(40px) saturate(150%)',
      border: `1px solid var(--pm33-glassBorder)`,
      borderRadius: '12px',
      boxShadow: '0 8px 32px rgba(31, 38, 135, 0.15)',
    },
    primaryButton: {
      background: `var(--pm33-primary)`,
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      padding: '12px 24px',
      fontWeight: '600',
      transition: 'all 0.3s ease',
    }
  });

  const contextValue: PM33ThemeContextType = {
    currentTheme,
    setTheme,
    toggleTheme,
  };

  const themedStylesValue: ThemedStylesType = {
    getColors,
    getSurfaceStyles,
  };
  
  return (
    <PM33ThemeContext.Provider value={contextValue}>
      <ThemedStylesContext.Provider value={themedStylesValue}>
        <ThemeBridge />
        {children}
      </ThemedStylesContext.Provider>
    </PM33ThemeContext.Provider>
  );
}

export default function MantineWrapper({ children }: MantineWrapperProps) {
  return (
    <MantineProvider 
      theme={theme} 
      defaultColorScheme="light"
      cssVariablesResolver={pm33CssVariablesResolver}
    >
      <PM33ThemeProvider>
        {children}
      </PM33ThemeProvider>
    </MantineProvider>
  );
}