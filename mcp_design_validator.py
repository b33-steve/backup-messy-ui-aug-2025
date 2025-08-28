#!/usr/bin/env python3
"""
MCP Design Validator
Validates theme switching and design consistency for PM33
"""

import re
import os
from pathlib import Path

def validate_theme_switching():
    """Validate that theme switching is properly implemented"""
    print("🎨 MCP Design Validator - Theme Switching Analysis")
    print("=" * 60)
    
    # Check if CSS variables are properly defined
    globals_css_path = Path("app/globals.css")
    if not globals_css_path.exists():
        print("❌ globals.css not found")
        return False
        
    with open(globals_css_path, 'r') as f:
        css_content = f.read()
    
    # Validate dark mode CSS variables exist
    dark_mode_patterns = [
        r'\.dark\s*{',
        r'--marketing-bg-primary:',
        r'--color-text-primary:',
        r'@media.*prefers-color-scheme.*dark'
    ]
    
    print("🔍 Checking CSS Variable Definitions:")
    for pattern in dark_mode_patterns:
        if re.search(pattern, css_content):
            print(f"✅ Found: {pattern}")
        else:
            print(f"❌ Missing: {pattern}")
    
    # Check theme provider implementation
    provider_path = Path("components/shared/MantineProvider.tsx")
    if provider_path.exists():
        with open(provider_path, 'r') as f:
            provider_content = f.read()
            
        print("\n🔧 Theme Provider Analysis:")
        if 'setTheme' in provider_content and 'currentTheme' in provider_content:
            print("✅ Theme provider has state management")
        else:
            print("❌ Theme provider missing state management")
            
        if 'localStorage' in provider_content:
            print("✅ Theme persistence implemented")
        else:
            print("❌ Theme persistence missing")
    
    return True

def validate_demo_cards():
    """Validate that demo cards use theme-aware CSS variables"""
    print("\n🃏 Demo Cards Theme Analysis:")
    print("-" * 40)
    
    homepage_path = Path("app/page.tsx")
    if not homepage_path.exists():
        print("❌ Homepage not found")
        return False
        
    with open(homepage_path, 'r') as f:
        homepage_content = f.read()
    
    # Check for hardcoded white backgrounds (problematic)
    hardcoded_white = re.findall(r'backgroundColor:\s*["\']var\(--mantine-color-white\)["\']', homepage_content)
    if hardcoded_white:
        print(f"❌ Found {len(hardcoded_white)} hardcoded white backgrounds")
        for match in hardcoded_white:
            print(f"   {match}")
    else:
        print("✅ No hardcoded white backgrounds found")
    
    # Check for proper theme-aware variables
    theme_aware_vars = [
        r'--marketing-bg-primary',
        r'--color-text-primary',
        r'--color-bg-primary'
    ]
    
    print("\n🎯 Theme-Aware Variables Usage:")
    for var in theme_aware_vars:
        matches = re.findall(rf'var\({var}\)', homepage_content)
        if matches:
            print(f"✅ {var}: {len(matches)} uses")
        else:
            print(f"⚠️  {var}: Not used")
            
    # Check for Mantine theme-aware props
    mantine_theme_props = [
        r'bg="var\(--mantine-color-default\)"',
        r'c="var\(--mantine-color-text\)"'
    ]
    
    print("\n🔧 Mantine Theme Props Usage:")
    for prop in mantine_theme_props:
        matches = re.findall(prop, homepage_content)
        if matches:
            print(f"✅ {prop}: {len(matches)} uses")
        else:
            print(f"⚠️  {prop}: Not used")
    
    return True

def validate_component_consistency():
    """Check that components use consistent theme patterns"""
    print("\n🧩 Component Theme Consistency:")
    print("-" * 40)
    
    # Check navigation component
    nav_path = Path("components/marketing/IsolatedMarketingNavigation.tsx")
    if nav_path.exists():
        with open(nav_path, 'r') as f:
            nav_content = f.read()
            
        if 'currentTheme ===' in nav_content:
            print("✅ Navigation has theme-aware styling")
        else:
            print("❌ Navigation missing theme awareness")
    
    return True

def validate_blue_text_contrast():
    """Check for blue text readability issues"""
    print("\n🔵 Blue Text Contrast Analysis:")
    print("-" * 40)
    
    homepage_path = Path("app/page.tsx")
    if not homepage_path.exists():
        print("❌ Homepage not found")
        return False
        
    with open(homepage_path, 'r') as f:
        homepage_content = f.read()
    
    # Check for potentially problematic blue colors
    blue_color_patterns = [
        r'c="indigo\.6"',
        r'c="blue\.6"',
        r'c="cyan\.6"', 
        r'color="indigo"',
        r'color="blue"',
        r'color="cyan"',
        r'--mantine-color-indigo-6',
        r'--mantine-color-blue-6'
    ]
    
    blue_issues_found = 0
    print("🔍 Scanning for hard-to-read blue text:")
    
    for pattern in blue_color_patterns:
        matches = re.findall(pattern, homepage_content)
        if matches:
            blue_issues_found += len(matches)
            print(f"⚠️  {pattern}: {len(matches)} uses - MAY BE TOO DARK")
    
    if blue_issues_found == 0:
        print("✅ No problematic dark blue text found")
    else:
        print(f"\n💡 RECOMMENDATION: Replace {blue_issues_found} instances with lighter blue shades:")
        print("   • indigo.6 → indigo.4 or indigo.3")
        print("   • blue.6 → blue.4 or blue.3") 
        print("   • cyan.6 → cyan.4 or cyan.3")
    
    return blue_issues_found == 0

def generate_recommendations():
    """Generate design improvement recommendations"""
    print("\n📋 Design Recommendations:")
    print("-" * 40)
    
    recommendations = [
        "✅ Use CSS variables instead of hardcoded colors",
        "✅ Test theme switching in both light and dark modes", 
        "✅ Ensure sufficient contrast ratios (WCAG 2.1 AA)",
        "✅ Use lighter blue shades for better text readability",
        "✅ Validate theme persistence across page reloads",
        "✅ Check component consistency in both themes"
    ]
    
    for rec in recommendations:
        print(rec)

def main():
    """Main validation function"""
    print("🚀 Starting MCP Design Validation...")
    
    os.chdir("/Users/ssaper/Desktop/my-projects/pm33-claude-execution/app/frontend")
    
    validate_theme_switching()
    validate_demo_cards()
    validate_component_consistency()
    validate_blue_text_contrast()
    generate_recommendations()
    
    print("\n" + "=" * 60)
    print("🎯 MCP Design Validation Complete!")
    print("🔗 Check localhost:3001 to test theme switching manually")

if __name__ == "__main__":
    main()