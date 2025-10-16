# Truth or Dare Persian Game Website

## Overview
A modern, beautiful Persian (Farsi) Truth or Dare game website with SMS OTP verification for Iranian users. The site guides users through phone verification before directing them to download the Android app.

## Purpose
Online multiplayer Truth or Dare game platform for Iranian players with team play, voice chat, and video call capabilities.

## Current State
✅ Complete MVP implementation with:
- Beautiful Persian landing page with RTL support
- Phone number input with Iranian mobile validation (09xxxxxxxxx)
- SMS OTP verification flow using s.api.ir API
- Download page for Android app
- Fully responsive design optimized for mobile

## Project Architecture

### Frontend (React + TypeScript)
- **Pages**:
  - `/` - Landing page with hero, features, how-to-play sections
  - `/phone` - Phone number input page
  - `/verify?mobile=09xxxxxxxxx` - OTP verification page
  - `/download` - Android app download page
  - 404 page

- **Design**:
  - RTL (Right-to-Left) layout for Persian text
  - Vazirmatn font from Google Fonts
  - Primary color: Vibrant pink-red (340 85% 55%)
  - Secondary color: Purple (280 70% 60%)
  - Dark mode by default with gradient backgrounds
  - Fully responsive mobile-first design

### Backend (Express + TypeScript)
- **API Endpoints**:
  - `POST /api/send-otp` - Sends OTP code via SMS
    - Validates Iranian mobile format (09xxxxxxxxx)
    - Rate limiting: 3 attempts per 5 minutes per number
    - Generates 4-digit OTP code
    - Integrates with s.api.ir SMS API
  
  - `POST /api/verify-otp` - Verifies OTP code
    - Validates code format (4 digits)
    - Max 5 verification attempts per session
    - 2-minute expiration window
    - Auto-deletes session on success/failure

- **Storage**: In-memory OTP session management with auto-cleanup

### Data Schema
- **OTP Session**: mobile, code, createdAt, expiresAt, attempts
- **Validation**: Zod schemas for type-safe request validation

## Environment Variables
- `SMS_API_TOKEN` - Bearer token for s.api.ir SMS API (already configured in Replit Secrets)

## Technical Stack
- React 18 with Wouter for routing
- TanStack Query for data fetching
- Shadcn UI components with Tailwind CSS
- Express.js backend
- TypeScript throughout
- Vite for development and building

## User Flow
1. User lands on homepage and clicks "شروع بازی" (Start Game)
2. Enters Iranian mobile number (09xxxxxxxxx format)
3. Receives 4-digit OTP code via SMS
4. Enters code on verification page
5. Upon successful verification, redirected to download page
6. Downloads Android app to continue playing

## Navigation Structure
- Landing → Phone Input → OTP Verify → Download
- All pages have RTL layout
- Progress indicator shows user's position in flow

## Recent Changes (October 16, 2025)
- Complete MVP implementation
- Generated game-themed hero image and app mockup
- Implemented all frontend pages with Persian localization
- Built backend OTP system with s.api.ir integration
- Added rate limiting and security measures
- Configured RTL support and Vazirmatn font

## Design Guidelines
See `design_guidelines.md` for comprehensive design specifications including:
- Color palette and typography rules
- Component usage guidelines
- Layout and spacing system
- RTL/Persian considerations
- Mobile optimization standards
