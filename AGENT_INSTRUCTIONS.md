# AGENT INSTRUCTION GUIDE

## Template Overview

This React TypeScript template has been designed specifically for AI agents to easily adapt for any industry. Every component includes comprehensive documentation, usage examples, and adaptation patterns.

## Core Design Principles

### 1. Mobile-First Responsive Design
- All components start with mobile design and scale up
- Touch targets are minimum 44px for mobile usability
- Flexible typography with proper line heights
- Gesture support for touch interactions

### 2. Industry-Agnostic Architecture
- Generic naming conventions (BaseItem, BaseFlowData)
- Modular component structure
- Extensible type system
- Configurable props for customization

### 3. Agent-Friendly Documentation
- Each component has detailed adaptation instructions
- Industry-specific usage examples provided
- Clear patterns for modification
- TypeScript interfaces for type safety

## Component Adaptation Patterns

### ItemGrid Component
**Purpose**: Display collections of items in a responsive grid
**Location**: `src/components/features/ItemGrid.tsx`

**Industry Adaptations**:
```tsx
// E-commerce: Products
<ItemGrid 
  items={products} 
  title="Featured Products"
  onItemSelect={openProductDetails}
  onFlowComplete={addToCart}
/>

// Healthcare: Services
<ItemGrid 
  items={medicalServices} 
  title="Available Services"
  onItemSelect={openServiceDetails}
  onFlowComplete={bookAppointment}
/>

// Education: Courses
<ItemGrid 
  items={courses} 
  title="Available Courses"
  onItemSelect={openCourseDetails}
  onFlowComplete={enrollInCourse}
/>
```

### PersonalizationWizard Component
**Purpose**: Multi-step flow for complex processes
**Location**: `src/components/features/wizard/PersonalizationWizard.tsx`

**Step Components**:
- `GoalStep`: Initial goal/objective selection
- `ContextStep`: Context gathering and preferences
- `CustomizationStep`: Customization options
- `PreferencesStep`: User preferences and settings
- `ReviewStep`: Final review and confirmation

**Industry Adaptations**:
```tsx
// E-commerce Checkout
const checkoutSteps = [
  { title: "Cart Review", component: CartStep },
  { title: "Shipping", component: ShippingStep },
  { title: "Payment", component: PaymentStep },
  { title: "Confirmation", component: ConfirmationStep }
];

// Healthcare Booking
const bookingSteps = [
  { title: "Service Selection", component: ServiceStep },
  { title: "Provider Selection", component: ProviderStep },
  { title: "Schedule", component: ScheduleStep },
  { title: "Insurance", component: InsuranceStep },
  { title: "Confirmation", component: ConfirmationStep }
];
```

### LoginForm Component
**Purpose**: Authentication with social and email options
**Location**: `src/components/auth/LoginForm.tsx`

**Customization Options**:
- Social login providers (Apple, Google, etc.)
- Email/password authentication
- Form validation and error handling
- Custom styling and branding

**Industry Adaptations**:
```tsx
// Healthcare Portal
<LoginForm 
  title="Patient Portal"
  description="Access your medical records securely"
  showSocialLogin={false}
  onSubmit={handlePatientLogin}
/>

// B2B SaaS
<LoginForm 
  title="Welcome Back"
  description="Sign in to your dashboard"
  showSocialLogin={true}
  onSubmit={handleBusinessLogin}
/>
```

## Type System Adaptation

### Base Types
**Location**: `src/types/base.ts`

The template uses generic base types that can be extended:

```typescript
interface BaseItem {
  id: string;
  name: string;
  description: string;
  category: string;
  coreThemes: string[];
  isPopular?: boolean;
  isFeatured?: boolean;
}

interface BaseFlowData {
  goals: string[];
  context: string;
  customizations: {
    style: string;
    approach: string;
    timeframe: string;
    intensity: number;
  };
}
```

**Industry Extensions**:
```typescript
// E-commerce
interface Product extends BaseItem {
  price: number;
  currency: string;
  inStock: boolean;
  images: string[];
  reviews: Review[];
}

// Healthcare
interface MedicalService extends BaseItem {
  duration: number;
  providerTypes: string[];
  insuranceAccepted: string[];
  prerequisites: string[];
}
```

## Layout System

### Navigation Structure
- **NavBar**: Main navigation with responsive menu
- **Logo**: Scalable brand logo component
- **NavMenu**: Desktop navigation menu
- **UserNav**: User profile and settings menu

### Page Layout
- **LandingPage**: Hero section with call-to-action
- **Layout**: Main layout wrapper with navigation
- **Responsive containers**: Mobile-first responsive design

## Theme System

### Theme Provider
**Location**: `src/components/theme/provider.tsx`

Provides light/dark/system theme management:
```tsx
<ThemeProvider defaultTheme="system" storageKey="your-app-theme">
  <App />
</ThemeProvider>
```

### Theme Toggle
**Location**: `src/components/theme/toggle.tsx`

Theme switching button with accessibility support.

## Data Layer

### Sample Data
**Location**: `src/data/sampleItems.ts`

Generic sample data with helper functions:
- `sampleItems`: Array of BaseItem objects
- `getCategoryInfo()`: Category styling and icons
- `getItemsByCategory()`: Filtering utilities

## Styling System

### Tailwind CSS
- Custom design tokens in `tailwind.config.js`
- Responsive breakpoints: `sm:`, `md:`, `lg:`, `xl:`
- Dark mode support with `dark:` prefix
- Custom color palette with CSS variables

### Component Styling
- shadcn/ui components with customizable variants
- Consistent spacing and typography
- Accessible color contrast
- Mobile-optimized touch targets

## Animation System

### Framer Motion
- Smooth page transitions
- Component animations
- Gesture support
- Performance optimized

### Animation Patterns
- Fade in/out for modals
- Slide transitions for navigation
- Smooth hover effects
- Loading states

## Development Workflow

### Status Updates Requirement
**IMPORTANT**: When working on this project, always update your progress before your context runs out by creating a status update file named `STATUS_UPDATE_vX.md` where X is incremented from the previous version. This ensures continuity and tracks development progress.

### Adding New Components
1. Create component in appropriate directory
2. Add comprehensive agent documentation
3. Include usage examples and industry adaptations
4. Ensure mobile-first responsive design
5. Add TypeScript interfaces and proper typing
6. Update status in `STATUS_UPDATE_vX.md`

### Adapting for Industries
1. Update type definitions in `src/types/`
2. Modify sample data in `src/data/`
3. Customize component props and callbacks
4. Update styling and branding
5. Add industry-specific features

### Testing and Validation
1. Test on mobile devices and various screen sizes
2. Verify accessibility with screen readers
3. Test theme switching functionality
4. Validate form inputs and error handling
5. Check performance on slower networks

## Best Practices

### Code Organization
- Group related components together
- Use index files for clean imports
- Keep components focused and single-purpose
- Implement proper error boundaries

### Performance
- Lazy load components where appropriate
- Optimize images and assets
- Use React.memo for expensive components
- Implement proper loading states

### Accessibility
- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Color contrast compliance

### TypeScript
- Strict type checking enabled
- Comprehensive interface definitions
- Proper generic types
- Runtime type validation with Zod

## Common Adaptation Scenarios

### 1. E-commerce Platform
- Replace BaseItem with Product interface
- Add shopping cart functionality
- Implement payment processing
- Add product search and filtering

### 2. Healthcare Platform
- Replace BaseItem with MedicalService interface
- Add appointment booking system
- Implement patient record management
- Add insurance verification

### 3. Education Platform
- Replace BaseItem with Course interface
- Add enrollment system
- Implement progress tracking
- Add assessment tools

### 4. Business SaaS
- Replace BaseItem with Feature interface
- Add subscription management
- Implement user onboarding
- Add analytics dashboard

## Support and Resources

### Documentation
- Component documentation in each file
- TypeScript interfaces for all props
- Usage examples and patterns
- Industry adaptation guides

### Tools and Libraries
- React Developer Tools
- TypeScript compiler
- Tailwind CSS IntelliSense
- Radix UI documentation

### Community
- shadcn/ui component library
- Tailwind CSS community
- React TypeScript patterns
- Accessibility guidelines

This template provides a solid foundation for rapid development while maintaining high quality, accessibility, and user experience standards across all industries.
