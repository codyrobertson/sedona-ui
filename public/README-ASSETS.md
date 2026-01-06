# SEO Assets - Conversion Notes

This directory contains placeholder SEO assets for Sedona UI.

## SVG to PNG Conversion Required

The following SVG files need to be converted to PNG format for full browser compatibility:

### favicon.svg -> favicon.ico
Convert to ICO format (32x32) for legacy browser support:
```bash
# Using ImageMagick
convert favicon.svg -resize 32x32 favicon.ico

# Or use an online converter like realfavicongenerator.net
```

### icon.svg -> icon.png
Convert to PNG (192x192) for PWA manifest:
```bash
# Using ImageMagick
convert icon.svg -resize 192x192 icon.png

# Or using librsvg
rsvg-convert -w 192 -h 192 icon.svg > icon.png
```

### og-image.svg -> og-image.png
Convert to PNG (1200x630) for Open Graph social sharing:
```bash
# Using ImageMagick
convert og-image.svg og-image.png

# Or using librsvg
rsvg-convert -w 1200 -h 630 og-image.svg > og-image.png
```

### apple-icon.svg -> apple-icon.png
Convert to PNG (180x180) for Apple touch icon:
```bash
# Using ImageMagick
convert apple-icon.svg -resize 180x180 apple-icon.png
```

## Quick Conversion Script

If you have ImageMagick installed:
```bash
cd public
convert favicon.svg -resize 32x32 favicon.ico
convert icon.svg -resize 192x192 icon.png
convert og-image.svg og-image.png
convert apple-icon.svg -resize 180x180 apple-icon.png
```

## Online Tools
- https://realfavicongenerator.net - Generate all favicon variants
- https://cloudconvert.com/svg-to-png - SVG to PNG conversion
