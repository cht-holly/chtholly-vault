# Chtholly UI

**AI Agent-Friendly React TypeScript Template**

A comprehensive, production-ready React TypeScript template specifically designed for AI agents to rapidly build modern, responsive applications for any industry. Every component includes detailed documentation, adaptation patterns, and industry-specific examples.

Demo: https://ui.chtholly.co

## 🤖 Why AI Agent-Friendly?

- **Zero Configuration**: Ready to use immediately with modern tooling
- **Comprehensive Documentation**: Every component has detailed AI agent instructions
- **Industry-Agnostic**: Generic components that adapt to any business domain
- **Quick Reference**: `AI_AGENT_CONFIG.json` provides instant component overview
- **Adaptation Patterns**: Clear examples for common industry transformations
- **Type Safety**: Full TypeScript support with comprehensive interfaces

## 🚀 Features

- **Modern Stack**: React 18, TypeScript, Vite
- **UI Components**: 50+ shadcn/ui components with Radix UI primitives
- **Styling**: Tailwind CSS with responsive, mobile-first design
- **State Management**: Zustand for simple, scalable state
- **Animations**: Framer Motion for smooth interactions
- **Theme Support**: Light/Dark/System theme with persistence
- **Form Handling**: React Hook Form with Zod validation
- **Mobile Optimized**: Touch-friendly, responsive design
- **Agent Documentation**: Comprehensive guides and quick reference

## 🧠 AI Agent Capabilities

This template empowers AI agents to:

### 🔍 **Instant Component Discovery**
- `AI_AGENT_CONFIG.json` - Quick reference of all 50+ components
- Component location mapping and usage patterns
- Industry adaptation examples for each component

### 📚 **Comprehensive Documentation**
- Every component includes detailed agent instructions
- Clear adaptation patterns for different industries
- TypeScript interfaces with full type definitions
- Usage examples and best practices

### ⚡ **Rapid Development**
- Generic `BaseItem` and `BaseFlowData` types for any industry
- Pre-built responsive layouts and navigation
- Form handling with validation patterns
- State management patterns with Zustand

### 🎨 **Easy Customization**
- Theme system with CSS variables
- Tailwind CSS classes for rapid styling
- Component variants and customization props
- Brand-ready with logo and color scheme support

### 🏢 **Industry Templates**
- E-commerce: Product catalogs, shopping carts, checkout flows
- Healthcare: Patient portals, appointment booking, medical records
- Education: Course catalogs, enrollment, progress tracking
- SaaS: Feature showcases, subscription management, dashboards

## 🎯 Industry Adaptation Examples

This template is designed to be easily adapted for any industry:

### E-commerce
```tsx
// Adapt ItemGrid for products
<ItemGrid 
  items={products} 
  title="Featured Products"
  onItemSelect={openProductDetails}
  onFlowComplete={addToCart}
/>
```

### Healthcare
```tsx
// Adapt LoginForm for patient portal
<LoginForm 
  title="Patient Portal"
  description="Access your medical records securely"
  showSocialLogin={false}
  onSubmit={handlePatientLogin}
/>
```

### Education
```tsx
// Adapt ItemGrid for courses
<ItemGrid 
  items={courses} 
  title="Available Courses"
  onItemSelect={openCourseDetails}
  onFlowComplete={enrollInCourse}
/>
```

## Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── auth/              # Authentication components
│   │   └── LoginForm.tsx  # Generic login form
│   ├── features/          # Feature-specific components
│   │   ├── ItemGrid.tsx   # Responsive grid layout
│   │   └── wizard/        # Multi-step wizard flow
│   ├── layout/            # Layout components
│   │   ├── LandingPage.tsx # Hero section
│   │   ├── Logo.tsx       # Brand logo
│   │   ├── NavBar.tsx     # Navigation bar
│   │   ├── NavMenu.tsx    # Desktop navigation
│   │   └── UserNav.tsx    # User profile menu
│   ├── theme/             # Theme management
│   │   ├── provider.tsx   # Theme context
│   │   └── toggle.tsx     # Theme toggle button
│   └── ui/                # Reusable UI primitives
├── data/                  # Sample data and utilities
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
├── types/                 # TypeScript type definitions
└── App.tsx               # Main application component
```

## 📱 Mobile-First Design

Every component is built with mobile-first principles:

- **Responsive Grids**: Adapts from single column (mobile) to multi-column (desktop)
- **Touch Targets**: Minimum 44px touch targets for mobile usability
- **Flexible Typography**: Responsive text sizing with proper line heights
- **Gesture Support**: Swipe navigation and touch interactions
- **Performance**: Optimized for mobile networks and devices

## 🎨 Component Documentation

### Core Components

#### ItemGrid
A responsive grid layout for displaying items with selection and flow capabilities.

```tsx
<ItemGrid 
  items={sampleItems}
  title="Featured Items"
  onItemSelect={(item) => console.log('Selected:', item)}
  onFlowComplete={(item, flow) => console.log('Completed:', item, flow)}
/>
```

#### PersonalizationWizard
A multi-step wizard component for complex flows.

```tsx
<PersonalizationWizard
  item={selectedItem}
  onComplete={handleWizardComplete}
  onClose={handleWizardClose}
/>
```

#### LoginForm
A complete authentication form with social login support.

```tsx
<LoginForm 
  onSubmit={(email, password) => handleLogin(email, password)}
  onSocialLogin={(provider) => handleSocialLogin(provider)}
  showSocialLogin={true}
  showEmailLogin={true}
/>
```

### Layout Components

#### LandingPage
A hero section with call-to-action and feature highlights.

#### NavBar
A responsive navigation bar with mobile menu support.

#### Logo
A scalable brand logo component.

### Theme Components

#### ThemeProvider
Provides theme context to the entire application.

```tsx
<ThemeProvider defaultTheme="system" storageKey="your-app-theme">
  <App />
</ThemeProvider>
```

#### ThemeToggle
A button to toggle between light, dark, and system themes.

## For LLM Agents

This template is designed to be easily understood and adapted by LLM agents. Each component includes comprehensive documentation with:

- **Purpose and usage patterns**
- **Industry adaptation guidelines**
- **Mobile-first responsive behavior**
- **Accessibility requirements**
- **CSS classes to maintain**

See the `docs/` folder for detailed agent instructions.

## Design System

The template uses a consistent design system with:

- **Colors**: Purple/indigo gradient theme with CSS variables
- **Typography**: Responsive text scaling (mobile-first)
- **Spacing**: Consistent padding and margins
- **Components**: Reusable UI components with variants
- **Animations**: Smooth transitions and hover effects

## Mobile-First Approach

All components are designed mobile-first with:

- **Touch targets**: Minimum 44px for interactive elements
- **Responsive breakpoints**: sm (640px), lg (1024px)
- **Flexible layouts**: Grid and flex patterns that adapt
- **Performance**: Optimized for mobile networks

## Customization

### Colors
Modify CSS variables in `src/index.css`:
```css
:root {
  --primary: 221.2 83.2% 53.3%;
  --secondary: 210 40% 96.1%;
  /* ... */
}
```

### Components
Each component is documented with adaptation instructions for different industries:

- **E-commerce**: Product cards, shopping carts, checkout flows
- **Photography**: Gallery grids, booking forms, portfolio layouts
- **Social Media**: Post cards, user profiles, activity feeds

## License

MIT License - feel free to use this template for any project.

## Contributing

This template is designed to be stable and well-documented. Contributions should focus on:

- Improving agent documentation
- Adding new industry adaptation examples
- Enhancing mobile-first patterns
- Maintaining accessibility standards
