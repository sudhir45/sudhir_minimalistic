#!/usr/bin/env python3
"""
Validate essays.json before generating RSS feed.
This script checks for:
- Valid JSON syntax
- Required fields in each entry
- No duplicate slugs
"""

import json
import sys

def validate_essays_json():
    """Validate essays.json file."""
    try:
        # Read and parse JSON
        with open('essays.json', 'r', encoding='utf-8') as f:
            essays = json.load(f)
        
        # Check if it's a list
        if not isinstance(essays, list):
            print("❌ ERROR: essays.json must contain a JSON array")
            return False
        
        # Required fields
        required_fields = ['slug', 'title', 'date', 'file', 'description']
        slugs = set()
        
        # Validate each essay
        for i, essay in enumerate(essays):
            # Check required fields
            for field in required_fields:
                if field not in essay:
                    print(f"❌ ERROR: Essay at index {i} is missing required field: {field}")
                    return False
            
            # Check for duplicate slugs
            slug = essay['slug']
            if slug in slugs:
                print(f"❌ ERROR: Duplicate slug found: {slug}")
                return False
            slugs.add(slug)
            
            # Validate externalUrl if present
            if 'externalUrl' in essay:
                if not essay['externalUrl'].startswith('http'):
                    print(f"❌ ERROR: Invalid externalUrl in essay '{slug}': {essay['externalUrl']}")
                    return False
        
        print(f"✅ SUCCESS: essays.json is valid ({len(essays)} essays)")
        return True
        
    except json.JSONDecodeError as e:
        print(f"❌ ERROR: Invalid JSON syntax in essays.json")
        print(f"   {str(e)}")
        return False
    except FileNotFoundError:
        print("❌ ERROR: essays.json file not found")
        return False
    except Exception as e:
        print(f"❌ ERROR: {str(e)}")
        return False

if __name__ == '__main__':
    if validate_essays_json():
        sys.exit(0)
    else:
        sys.exit(1)
