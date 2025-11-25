# Wedding Services Platform - Design System

## 🎨 Color Palette

### Primary Colors (Romantic Rose)
- **Primary 50**: `#fdf2f8` - Very light pink (backgrounds)
- **Primary 100**: `#fce7f3` - Light pink
- **Primary 200**: `#fbcfe8` - Soft pink
- **Primary 300**: `#f9a8d4` - Medium pink
- **Primary 400**: `#f472b6` - Bright pink
- **Primary 500**: `#ec4899` - **Main Brand Color** (buttons, links, accents)
- **Primary 600**: `#db2777` - Dark pink (hover states)
- **Primary 700**: `#be185d` - Deeper pink
- **Primary 800**: `#9f1239` - Dark rose
- **Primary 900**: `#831843` - Deep rose

### Accent Colors (Elegant Gold)
- **Gold 500**: `#f59e0b` - **Main Gold** (premium features, highlights)
- **Gold 400**: `#fbbf24` - Light gold
- **Gold 600**: `#d97706` - Dark gold (hover)

### Neutral Colors
- **Cream**: Soft beige tones for backgrounds
- **Gray Scale**: Standard grays for text and borders
- **White**: Pure white for cards and clean backgrounds

### Usage Guidelines
- **Primary Rose**: Use for primary actions, brand elements, and key highlights
- **Gold**: Use sparingly for premium features, special offers, and luxury elements
- **Cream/Beige**: Use for warm, elegant backgrounds
- **Gray**: Use for text, borders, and subtle elements

## 📝 Typography

### Font Families

#### Display Font (Headings)
- **Font**: Playfair Display (serif)
- **Usage**: Main headings (H1, H2), hero text, elegant statements
- **Weights**: 400 (regular), 700 (bold)
- **Example**: "Find Your Perfect Wedding Service"

#### Body Font (Content)
- **Font**: Inter (sans-serif)
- **Usage**: Body text, paragraphs, buttons, navigation
- **Weights**: 400 (regular), 500 (medium), 600 (semi-bold), 700 (bold)
- **Example**: Service descriptions, form labels, navigation items

#### Alternative Elegant Font
- **Font**: Cormorant Garamond (serif)
- **Usage**: Special occasions, quotes, elegant callouts
- **Weights**: 400, 500, 600

### Type Scale
- **H1**: 3rem (48px) - Hero headings
- **H2**: 2.25rem (36px) - Section headings
- **H3**: 1.875rem (30px) - Subsection headings
- **H4**: 1.5rem (24px) - Card titles
- **Body Large**: 1.125rem (18px) - Important content
- **Body**: 1rem (16px) - Standard content
- **Body Small**: 0.875rem (14px) - Secondary text
- **Caption**: 0.75rem (12px) - Labels, captions

## 🎯 Component Styles

### Buttons

#### Primary Button
```css
- Background: Primary 500 (#ec4899)
- Text: White
- Padding: 12px 24px
- Border Radius: 8px
- Font Weight: 600
- Hover: Primary 600, slight scale (1.02)
- Shadow: Soft shadow on hover
```

#### Secondary Button
```css
- Background: White/Cream
- Text: Primary 600
- Border: 2px solid Primary 300
- Padding: 12px 24px
- Border Radius: 8px
- Hover: Primary 50 background
```

#### Gold Accent Button
```css
- Background: Gold 500
- Text: White
- Usage: Premium features, special CTAs
```

### Cards

#### Service Card
```css
- Background: White
- Border Radius: 12px (elegant)
- Shadow: Soft shadow
- Padding: 24px
- Hover: Elevate shadow, slight scale
- Image: Rounded top corners, 16:9 aspect ratio
```

#### Feature Card
```css
- Background: Cream 50
- Border: 1px solid Cream 200
- Border Radius: 12px
- Padding: 32px
- Icon: Primary 500, size 48px
```

### Forms

#### Input Fields
```css
- Background: White
- Border: 1px solid Gray 300
- Border Radius: 8px
- Padding: 12px 16px
- Focus: Primary 500 border, soft shadow
- Placeholder: Gray 400
```

#### Select Dropdowns
```css
- Same as input fields
- Custom arrow icon in Primary 500
```

### Navigation

#### Navbar
```css
- Background: White (light mode) / Gray 800 (dark mode)
- Height: 72px
- Shadow: Subtle bottom shadow
- Sticky: Yes
- Logo: Primary 500 color
```

#### Navigation Links
```css
- Color: Gray 700
- Hover: Primary 500
- Active: Primary 600, underline
- Font Weight: 500
- Transition: Smooth color change
```

## 🎭 Iconography

### Icon Library
- **Font Awesome 6** (Free Solid, Regular, Brands)
- **Size Standards**: 16px (small), 20px (medium), 24px (large), 32px (xlarge), 48px (hero)

### Icon Usage
- **Navigation**: Home, Services, Profile, Dashboard
- **Actions**: Search, Filter, Book, Heart (wishlist), Share
- **Categories**: Venue, Camera, Makeup, Music, Decoration
- **Status**: Check (approved), Clock (pending), X (rejected)
- **Social**: Facebook, Instagram, Twitter, WhatsApp

### Icon Colors
- **Default**: Gray 600
- **Primary**: Primary 500
- **Success**: Green 600
- **Warning**: Gold 500
- **Error**: Red 600

## 📐 Spacing System

### Base Unit: 4px

- **xs**: 4px
- **sm**: 8px
- **md**: 16px
- **lg**: 24px
- **xl**: 32px
- **2xl**: 48px
- **3xl**: 64px
- **4xl**: 96px

## 🎪 Layout Patterns

### Container Widths
- **Mobile**: Full width (with 16px padding)
- **Tablet**: Max 768px
- **Desktop**: Max 1280px
- **Large Desktop**: Max 1536px

### Grid System
- **Mobile**: 1 column
- **Tablet**: 2 columns
- **Desktop**: 3-4 columns
- **Gap**: 24px (desktop), 16px (mobile)

## 🌙 Dark Mode

### Color Adaptations
- **Background**: Gray 900
- **Cards**: Gray 800
- **Text**: Gray 100
- **Borders**: Gray 700
- **Primary**: Lighter shades for better contrast

## ✨ Animation & Transitions

### Standard Transitions
- **Duration**: 200ms (fast), 300ms (standard), 500ms (slow)
- **Easing**: ease-in-out (standard), ease-out (entrance), ease-in (exit)

### Hover Effects
- **Scale**: 1.02 (subtle)
- **Shadow**: Elevate on hover
- **Color**: Smooth transition

### Loading States
- **Spinner**: Primary 500 color
- **Skeleton**: Gray 200 background, shimmer effect

## 🎨 Visual Hierarchy

### Importance Levels
1. **Hero/CTA**: Primary 500, large size, bold
2. **Headings**: Primary 700, medium size
3. **Body**: Gray 700, standard size
4. **Secondary**: Gray 500, smaller size

### Contrast Ratios
- **Text on White**: Minimum 4.5:1
- **Text on Primary**: White text
- **Interactive Elements**: Clear hover states

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: 1024px - 1280px
- **Large Desktop**: > 1280px

## 🎯 Accessibility

### Requirements
- **WCAG 2.1 AA** compliance
- **Keyboard Navigation**: All interactive elements
- **Focus States**: Clear, visible outlines
- **Alt Text**: All images
- **ARIA Labels**: Icon-only buttons
- **Color Contrast**: Minimum 4.5:1 for text

