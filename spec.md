# AF Collection

## Current State
Full-stack e-commerce homepage for AF COLLECTION men's fashion brand. Uses green (#006039) with gold accents (Rolex-inspired). Has: sticky header, hero (suit bg image), categories (Clothes/Sunglasses/Watches/Caps), WatchCollection slider, Products grid, About section, Reviews, Contact CTA, Footer.

## Requested Changes (Diff)

### Add
- Faded "AF COLLECTION" watermark text on hero section background
- "Trending Collection" featured products section (watch + placeholder products: Classic Black Shirt ₹999, Slim Fit T-Shirt ₹599, Combo Style Pack ₹1,499, Plus the real watch)
- "Why Choose Us" section with 4 icons/points: Premium Quality, Affordable Prices, Fast Delivery, Easy WhatsApp Support
- Categories changed to: Shirts, T-Shirts, Watches, Combo Offers

### Modify
- Remove ALL gold accents. Color palette strictly: Dark Green #0B3D2E, Light Green #145A32, White #FFFFFF, Text Grey #CCCCCC
- Update all hardcoded green color values (#006039, #004a2b, #00875a) to new palette (#0B3D2E, #145A32)
- Hero overlay: dark green transparent 60%
- Hero: keep same suit background image, add large faded "AF COLLECTION" watermark behind text
- Trending Collection section placed after hero, before main Categories
- Reviews section: 3 short reviews (Amazing quality, Value for money, Fast delivery)
- Final CTA text: "Ready to Upgrade Your Style?"
- Footer: Instagram link added
- Buttons: rounded style (border-radius 25px)

### Remove
- All gold/amber color references
- Existing Contact section text (replace with CTA)

## Implementation Plan
1. Update index.css CSS variables and btn-green to new color palette (#0B3D2E, #145A32), remove gold. Add rounded buttons.
2. Update App.tsx:
   - All color references from #006039/#004a2b to #0B3D2E/#145A32
   - Hero: add large faded watermark "AF COLLECTION" absolutely positioned behind content
   - Add TrendingCollection section with 4 products grid (watch + 3 placeholders)
   - Update CATEGORIES to Shirts, T-Shirts, Watches, Combo Offers
   - Add WhyChooseUs section with 4 icons
   - Update Reviews with 3 short sample reviews
   - Update Contact/CTA section text
   - Footer: add Instagram link
   - Update button styling to rounded-full or radius-25px
