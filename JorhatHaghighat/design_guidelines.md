# Design Guidelines: Truth or Dare Persian Game Website

## Design Approach: Reference-Based Gaming Experience

**Primary References**: Inspired by Telegram gaming bots aesthetic, Discord's playful UI, and Instagram's engaging mobile-first design, combined with modern Persian web design patterns.

**Design Philosophy**: Create a vibrant, youthful gaming experience that feels both modern and culturally relevant to Iranian players. The design should evoke excitement, social connection, and playful energy while maintaining usability across the SMS verification flow.

## Core Design Elements

### A. Color Palette

**Primary Colors (Dark Mode - Default)**
- Background: 220 15% 12% (Deep navy-blue dark)
- Surface: 220 12% 18% (Elevated surfaces)
- Primary Brand: 340 85% 55% (Vibrant pink-red - playful and energetic)
- Secondary: 280 70% 60% (Purple accent - mystery/dare element)

**Light Mode Colors**
- Background: 220 20% 97%
- Surface: 0 0% 100%
- Primary: 340 85% 50%
- Secondary: 280 70% 55%

**Functional Colors**
- Success (OTP verified): 150 70% 50%
- Error: 0 85% 60%
- Text Primary Dark: 0 0% 95%
- Text Primary Light: 220 15% 15%
- Text Secondary Dark: 0 0% 70%

### B. Typography

**Font Families**
- Primary (Persian): 'Vazirmatn' from Google Fonts - modern Persian sans-serif
- Headings: Vazirmatn Bold (700)
- Body: Vazirmatn Regular (400)
- Numbers/OTP: Vazirmatn Medium (500) with tabular-nums

**Type Scale**
- Hero Headline: text-5xl md:text-7xl font-bold
- Section Headers: text-3xl md:text-4xl font-bold
- Feature Titles: text-xl md:text-2xl font-semibold
- Body Text: text-base md:text-lg
- Captions: text-sm

**RTL Support**: Direction rtl on all containers, proper Persian number display

### C. Layout System

**Spacing Primitives**: Consistent use of 4, 8, 12, 16, 24 Tailwind units
- Component padding: p-4, p-6, p-8
- Section spacing: py-16 md:py-24
- Card gaps: gap-6, gap-8
- Button padding: px-6 py-3, px-8 py-4 (large CTA)

**Grid System**
- Container: max-w-7xl mx-auto px-4
- Feature grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6
- Mobile-first breakpoints

### D. Component Library

**Landing Page Components**
1. **Hero Section** (80vh min-height)
   - Gradient overlay background (primary to secondary, 45deg)
   - Large game-themed illustration/image
   - Animated headline with Persian text
   - Feature badges: "بازی تیمی" "چت صوتی" "آنلاین"
   - Large CTA button: "شروع بازی" with glow effect

2. **Features Grid** (3 columns on desktop)
   - Card design: backdrop-blur, border-2 border-white/10
   - Icon + Title + Description
   - Hover: scale-105 transition, border glow
   - Icons: Team play, Voice chat, Online matching

3. **How to Play Section**
   - Numbered steps with visual indicators
   - Card-based layout with connecting lines
   - Playful illustrations

4. **Game Preview**
   - Screenshot carousel or mockup displays
   - Truth/Dare example cards with hover flip effect

**OTP Flow Components**
1. **Phone Input Card**
   - Centered card: max-w-md, backdrop-blur-lg
   - Iranian format validator visual (09xxxxxxxxx)
   - Large numeric input with Persian numbers
   - Submit button with loading state

2. **OTP Verification**
   - 4-digit code input boxes with auto-focus
   - Countdown timer display
   - Resend code link
   - Error/success states with smooth transitions

3. **Download Page**
   - App icon display
   - Android download button (primary CTA)
   - Feature highlights of the app
   - QR code for direct download

**Navigation**
- Sticky header: backdrop-blur-md, border-b border-white/10
- Logo (Persian wordmark)
- Minimal nav items (about, help, contact in Persian)
- Language toggle (if needed)

**Buttons**
- Primary CTA: bg-primary with gradient overlay, rounded-xl, shadow-lg shadow-primary/30
- Secondary: border-2 border-primary, backdrop-blur when on images
- Hover states: brightness-110, scale-105 transform
- Loading state: spinner animation

**Forms**
- Input fields: bg-white/5 dark, border-2 border-white/10
- Focus: border-primary, ring-4 ring-primary/20
- Persian placeholder text
- Validation icons and messages

### E. Visual Elements

**Images Strategy**
1. **Hero Image**: Large background - playful group of diverse young people enjoying a game, vibrant party atmosphere with bokeh lights
2. **Feature Icons**: Custom game-themed illustrations (truth symbol, dare symbol, team icon, microphone)
3. **How to Play**: Step-by-step visual walkthrough screenshots
4. **App Mockup**: Android phone mockup showing game interface

**Image Placement**
- Hero: Full-width background with gradient overlay
- Features: Icon illustrations above each card
- Steps: Left-right alternating image-text layout
- Download page: Centered phone mockup

**Animations** (Minimal, purposeful)
- Hero headline: Fade-up on load
- CTA button: Subtle pulse effect
- Card hover: Smooth scale transform
- OTP inputs: Number pop animation on entry
- Success: Checkmark animation

## Page-Specific Guidelines

### Landing Page (6 sections)
1. Hero with game branding
2. Features grid (3 cards)
3. How to Play (4 steps)
4. Social proof / testimonials
5. FAQ section
6. Footer with download CTA

### OTP Pages
- Minimal distraction, focused on task
- Progress indicator at top
- Clear error messaging in Persian
- Auto-advance on success

### Download Page
- Celebration feel (confetti background effect)
- Clear app benefits
- Large download button
- Alternative contact/support

**Critical Persian/RTL Considerations**
- All text flows right-to-left
- Icons and images mirror appropriately
- Phone numbers display in Persian numerals option
- Form labels positioned correctly for RTL
- Navigation order reversed

**Mobile Optimization**
- Touch-friendly buttons (min 48px height)
- Single column layouts on mobile
- Larger text for readability
- Simplified navigation drawer
- OTP inputs optimized for mobile keyboards

This design creates an exciting, culturally relevant gaming experience that guides users smoothly from discovery through verification to app download, with Persian language support throughout.