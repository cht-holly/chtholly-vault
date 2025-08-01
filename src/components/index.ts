// Main component exports for easy importing
export { ItemGrid } from './features/ItemGrid';
export { PersonalizationWizard } from './features/wizard/PersonalizationWizard';
export { PhotoGrid } from './features/gallery/PhotoGrid';
export { PhotoHero } from './features/gallery/PhotoHero';
export { LoginForm } from './auth/LoginForm';
export { LandingPage } from './layout/LandingPage';
export { NavBar } from './layout/NavBar';
export { Logo } from './layout/Logo';
export { NavMenu } from './layout/NavMenu';
export { UserNav } from './layout/UserNav';
export { Footer } from './layout/Footer';
export { ThemeProvider, useTheme } from './theme/provider';
export { MultiThemeProvider, useMultiTheme } from './theme/multi-provider';
export { ThemeToggle } from './theme/toggle';

// UI component re-exports
export { Button } from './ui/button';
export { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
export { Badge } from './ui/badge';
export { Input } from './ui/input';
export { Label } from './ui/label';
export { Progress } from './ui/progress';
export { Textarea } from './ui/textarea';
export { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
export { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
export { 
  NavigationMenu, 
  NavigationMenuContent, 
  NavigationMenuItem, 
  NavigationMenuLink, 
  NavigationMenuList, 
  NavigationMenuTrigger 
} from './ui/navigation-menu';
export { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from './ui/dropdown-menu';
