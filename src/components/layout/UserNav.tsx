/**
 * AGENT INSTRUCTION: User Navigation Component
 * 
 * This is a generic user navigation dropdown component for authenticated users.
 * 
 * TO ADAPT FOR YOUR INDUSTRY:
 * 1. Customize the menu items to match your app's functionality
 * 2. Update user information display (name, email, avatar)
 * 3. Adjust menu actions based on your user workflow
 * 4. Add industry-specific shortcuts and actions
 * 
 * COMMON MENU ITEMS BY INDUSTRY:
 * 
 * E-commerce:
 * - Profile, Orders, Wishlist, Payment Methods, Addresses, Returns
 * 
 * Photography:
 * - Profile, Portfolio, Bookings, Clients, Gallery, Pricing
 * 
 * Finance:
 * - Profile, Portfolio, Watchlist, Transactions, Reports, Settings
 * 
 * Health/Fitness:
 * - Profile, Workouts, Nutrition, Progress, Goals, Community
 * 
 * Education:
 * - Profile, Courses, Progress, Certificates, Assignments, Forums
 * 
 * RESPONSIVE DESIGN:
 * - Compact avatar button
 * - Dropdown menu with proper spacing
 * - Keyboard navigation support
 */

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface UserNavProps {
  userName?: string;
  userEmail?: string;
  userAvatar?: string;
  userInitials?: string;
  onLogout?: () => void;
}

export function UserNav({ 
  userName = "John Doe",
  userEmail = "john@example.com",
  userAvatar = "",
  userInitials = "JD",
  onLogout
}: UserNavProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={userAvatar} alt={userName} />
            <AvatarFallback>{userInitials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{userName}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {userEmail}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Dashboard
            <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Help & Support
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onLogout}>
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
