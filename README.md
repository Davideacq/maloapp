# MaloHR - Mental Health Platform

## Overview
MaloHR is a comprehensive mental health platform built with React Native and Expo, designed to provide psychological wellness services for employees in corporate environments.

## Features
- **User Dashboard**: Personal wellness tracking and session management
- **Psychologist Portal**: Patient management, session notes, and profile management
- **Admin Panel**: Platform management and analytics
- **Session Booking**: Integrated appointment scheduling
- **Onboarding**: Personalized wellness assessment
- **Guides & Resources**: Educational content library
- **Consistent Navigation**: Unified breadcrumb system across all user areas

## Technology Stack
- **Frontend**: React Native with Expo
- **Routing**: Expo Router (file-based routing)
- **Typography**: Onest font family (Medium, SemiBold, Bold)
- **Styling**: StyleSheet.create() with consistent design system
- **Icons**: Ionicons
- **State Management**: React hooks (useState, useEffect)

## Design System

### Typography
- **Primary Font**: Onest Medium (500) for all body text
- **Headings**: Onest SemiBold (600) for H1 and H2
- **Variants**: Onest Regular (400) and Onest Bold (700) for special cases

### Color Palette
- **Primary**: Orange-500 (#f97316) with Orange-600 (#ea580c) on hover
- **Secondary**: Teal-600 (#0d9488) with Teal-700 (#0f766e) on hover
- **Tertiary**: Gray-100 (#f3f4f6) with Gray-200 (#e5e7eb) on hover
- **UI Blue**: #3b82f6 (for info and links)
- **Status Colors**: Success (#10b981), Warning (#f59e0b), Error (#ef4444)
- **Background**: Beige-50 (#fefce8) - default background color

### Button Variants
- **Default**: Orange-500 background, white text (primary actions)
- **Secondary**: Teal-600 background, white text (secondary actions)
- **Tertiary**: Gray-100 background, gray-700 text (neutral actions)
- **Destructive**: Red-500 background, white text (dangerous actions)
- **Outline**: Transparent background, gray border (subtle actions)
- **Ghost**: Transparent background, gray text (minimal actions)
- **Link**: Transparent background, orange text with underline

### IconButton Component
- **All Button Variants**: Supports same color variants as regular buttons
- **Sizes**: Small (32x32), Default (40x40), Large (48x48)
- **Custom Disabled States**: Use `disabledVariant` to change appearance when disabled
- **Example**: `<IconButton icon="heart" variant="default" disabled disabledVariant="tertiary" />`

### Navigation System
- **Breadcrumb Component**: Consistent navigation across all user areas
- **Header Navigation**: Unified header with logo, calendar, notifications, and avatar
- **Back Navigation**: Consistent back button behavior with breadcrumb integration

## Project Structure
```
app/
├── index.tsx                 # Landing page (redirects to login)
├── login/                    # Login page (main entry point)
├── home.tsx                  # Home with navigation cards
├── register/                 # User registration
├── styleguide/              # Complete UI components showcase
├── admin/                   # Admin dashboard and management
├── psychologist/            # Psychologist portal
│   ├── dashboard/           # Psychologist dashboard
│   ├── calendar/            # Session calendar
│   ├── patients/            # Patient management
│   ├── notes/               # Session notes
│   ├── guides/              # Educational content
│   └── profile/             # Psychologist profile page
└── user/                    # User dashboard and features
    ├── dashboard/           # User dashboard
    ├── sessions/            # Session management
    ├── guides/              # Educational content
    ├── booking/             # Session booking
    ├── payment/             # Payment management
    ├── profile/             # User profile
    └── onboarding/          # User onboarding

src/
├── components/
│   ├── typography.tsx       # Typography components (H1-H4, Body, Label)
│   ├── button.tsx          # Button component with all variants
│   ├── icon-button.tsx     # Icon-only buttons with color variants
│   ├── breadcrumb.tsx      # Breadcrumb navigation component
│   ├── card.tsx            # Card containers
│   ├── input.tsx           # Form inputs
│   ├── badge.tsx           # Status indicators
│   ├── skeleton.tsx        # Loading placeholders
│   ├── textarea.tsx        # Multi-line text input
│   ├── dialog.tsx          # Modal dialogs
│   ├── tooltip.tsx         # Tooltip components
│   ├── switch.tsx          # Toggle switches
│   ├── slider.tsx          # Range sliders
│   ├── radio-group.tsx     # Radio button groups
│   ├── checkbox.tsx        # Checkbox components
│   ├── accordion.tsx       # Collapsible sections
│   ├── carousel.tsx        # Image carousels
│   ├── avatar.tsx          # User avatars
│   ├── notification-menu.tsx # Notification dropdown
│   ├── image-card-carousel.tsx # Image card carousel
│   └── image-card-overlay.tsx # Image with overlay
└── hooks/
    ├── use-fonts.tsx       # Font loading management
    ├── use-typography.tsx  # Typography hook with Onest fonts
    ├── use-mobile.tsx      # Mobile detection hook
    ├── use-screen-size.tsx # Screen size detection
    └── use-toast.ts        # Toast notification hook
```

## Recent Implementations

### Breadcrumb Navigation System
- **Unified Component**: Created reusable `Breadcrumb` component in `src/components/breadcrumb.tsx`
- **Consistent Styling**: All breadcrumbs use the same design pattern with chevron separators
- **User Area Integration**: Applied to all user pages:
  - `/user/sessions` - "Home > Le Mie Sessioni"
  - `/user/guides/[id]` - "Home > Guide > [Guide Title]"
  - `/user/profile` - "Home > Profilo"
  - `/user/booking` - "Home > Prenota Sessione"
  - `/user/payment/[packageId]` - "Home > Pagamento"
- **Psychologist Area Integration**: Applied to all psychologist pages:
  - `/psychologist/calendar` - "Home > Calendario"
  - `/psychologist/patients` - "Home > Pazienti"
  - `/psychologist/notes` - "Home > Note"
  - `/psychologist/guides` - "Home > Guide"

### Psychologist Profile Page
- **New Route**: `/psychologist/profile` with comprehensive profile management
- **Professional Information**: Editable fields for name, specialization, bio, and contact details
- **Session Statistics**: Visual stats showing total sessions, average rating, and completion rate
- **Recent Sessions**: List of recent patient sessions with status indicators
- **Consistent Navigation**: Uses same header navigation as user dashboard

### Header Navigation Standardization
- **Unified Design**: All user and psychologist areas now use consistent header navigation
- **Components**: Malo logo, calendar button, notifications with badge, and avatar with initials
- **Responsive**: Adapts to different screen sizes and orientations
- **Interactive**: All buttons support hover, focus, and pressed states

### UI Component Enhancements
- **Enhanced Button System**: All buttons support hover, focused, pressed, and disabled states
- **Typography Consistency**: H1 uses Made Tommy Soft Extrabold, H2 uses Made Tommy Soft Bold with Onest Bold fallback
- **Background Standardization**: Default background color set to beige-50 across the app
- **Component Documentation**: All new components added to styleguide for consistency

## Development

### Prerequisites
- Node.js (Latest LTS)
- Expo CLI
- iOS Simulator or Android Emulator

### Getting Started
1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npx expo start -c
   ```

3. Open the app:
   - **iOS**: Press `i` to open in iOS Simulator
   - **Android**: Press `a` to open in Android Emulator
   - **Web**: Press `w` to open in browser
   - **Device**: Scan QR code with Expo Go app

### Available Scripts
- `npm run start` - Start Expo development server
- `npx expo start -c` - Start with cleared cache
- `npx expo upgrade` - Update Expo SDK

## Esecuzione del Progetto su Diversi Dispositivi

### iOS (macOS)
1. Assicurati di avere un Mac con Xcode installato.
2. Installa Expo CLI se non già presente:
   ```bash
   npm install -g expo-cli
   ```
3. Avvia il server di sviluppo:
   ```bash
   npx expo start -c
   ```
4. Premi `i` nella console per aprire l'app nell'iOS Simulator, oppure scansiona il QR code con l'app Expo Go su un dispositivo iOS reale.

### Windows
1. Installa Node.js (ultima LTS) e Git Bash o un terminale compatibile.
2. Installa Expo CLI:
   ```bash
   npm install -g expo-cli
   ```
3. Avvia il server di sviluppo:
   ```bash
   npx expo start -c
   ```
4. Premi `a` nella console per aprire l'app nell'Android Emulator (devi avere Android Studio e un emulatore configurato), oppure scansiona il QR code con Expo Go su un dispositivo Android reale.
5. Per lo sviluppo web, premi `w` per aprire l'app nel browser.

### Linux
1. Installa Node.js (ultima LTS) e Git.
2. Installa Expo CLI:
   ```bash
   npm install -g expo-cli
   ```
3. Avvia il server di sviluppo:
   ```bash
   npx expo start -c
   ```
4. Premi `a` per Android Emulator (se configurato), oppure scansiona il QR code con Expo Go su un dispositivo Android reale.
5. Per lo sviluppo web, premi `w` per aprire l'app nel browser.

> **Nota:** Su Windows e Linux non è possibile avviare l'iOS Simulator. Per testare su iOS, usa un dispositivo reale con Expo Go oppure un Mac.

---

## Collaborazione e Gestione dei Branch

1. **Clona la repository:**
   ```bash
   git clone <URL_REPO>
   cd maloapp
   ```
2. **Crea un nuovo branch per le tue modifiche:**
   ```bash
   git checkout -b nome-tuo-branch
   ```
3. **Effettua le modifiche e committa:**
   ```bash
   git add .
   git commit -m "Descrizione delle modifiche"
   ```
4. **Pusha il branch remoto:**
   ```bash
   git push origin nome-tuo-branch
   ```
5. **Apri una Pull Request** su GitHub per richiedere la revisione e l'unione delle modifiche su `main`.

> **Consigli:**
> - Mantieni il branch `main` sempre aggiornato (`git pull origin main`).
> - Lavora sempre su branch separati per ogni feature o fix.
> - Risolvi eventuali conflitti prima di aprire la Pull Request.

## UI Components

Visit `/styleguide` in the app to see all available components organized in tabs:
- **Typography**: Complete Onest font system
- **Components**: Buttons, badges, cards, skeletons, breadcrumbs
- **Forms**: Inputs, textareas, selections, switches
- **Feedback**: Alerts, status indicators, lists, tooltips
- **Colors**: Complete color palette
- **Navigation**: Breadcrumb examples and navigation patterns

## Architecture
- **File-based Routing**: Using Expo Router for navigation
- **Component-based**: Modular, reusable UI components
- **Typography System**: Consistent font usage with Onest and Made Tommy Soft
- **Responsive Design**: Adapts to different screen sizes
- **Performance Optimized**: Efficient rendering and state management
- **Consistent Navigation**: Unified breadcrumb and header system

## Routing Structure
- **Landing Page** (`/`): Auto-redirects to login (1 second delay)
- **Login Page** (`/login`): Main entry point for web app users
- **Home Page** (`/home`): Navigation hub with role-based access cards
- **Role-based Routes**: 
  - `/admin/*` - Admin dashboard and management
  - `/psychologist/*` - Psychologist portal with profile management
  - `/user/*` - User dashboard and features
- **Utility Pages**: `/register`, `/forgot-password`, `/styleguide`

## Navigation Patterns

### Breadcrumb Navigation
- **Consistent Structure**: "Home > [Section] > [Subsection]"
- **Visual Design**: Gray text with orange chevron separators
- **Interactive**: Clickable breadcrumb items for navigation
- **Responsive**: Adapts to screen size and content length

### Header Navigation
- **Logo**: Malo branding on the left
- **Actions**: Calendar, notifications (with badge), and avatar on the right
- **Consistent**: Same layout across all user and psychologist areas
- **Accessible**: Proper focus states and screen reader support

## Contributing
1. Follow the established design system
2. Use TypeScript for type safety
3. Implement proper error handling
4. Test on both iOS and Android
5. Maintain component documentation in styleguide
6. Ensure consistent navigation patterns
7. Add new components to the styleguide for discovery

## Platform Features
- **Multi-role Support**: Admin, Psychologist, User with role-specific interfaces
- **Session Management**: Booking, tracking, notes, and analytics
- **Content Management**: Guides and educational resources
- **Profile Management**: Comprehensive user and psychologist profiles
- **Analytics**: Usage tracking and insights
- **Mobile-first**: Optimized for mobile devices
- **Consistent UX**: Unified navigation and design patterns across all areas

## Recent Updates
- **Breadcrumb System**: Unified navigation across all user areas
- **Psychologist Profile**: Complete profile management interface
- **Header Standardization**: Consistent navigation headers
- **UI Enhancements**: Improved button states and typography
- **Component Library**: Expanded styleguide with new components


#################