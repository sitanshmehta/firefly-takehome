'use client';

import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { AlertTriangle, PlayCircle } from "lucide-react";

export const Navbar = () => (
  <div className="flex w-full items-center justify-between px-8 py-4 bg-white dark:bg-zinc-900 shadow-sm">
    <div className="flex items-center space-x-3">
      <div className="text-2xl font-bold text-gray-800 dark:text-gray-100 tracking-wider">
        ✶ Firefly Dashboard
      </div>
      <nav className="text-sm font-medium text-gray-600 dark:text-gray-400 ml-4">
        Operator View | Live Feed
      </nav>
    </div>

    <NavigationMenu>
      <NavigationMenuList className="flex items-center space-x-3">
        <NavigationMenuItem>
          <Button variant="outline" className="flex items-center space-x-2">
            <PlayCircle className="h-4 w-4" />
            Start Incident Simulation
          </Button>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Button variant="destructive" className="flex items-center space-x-2">
            <AlertTriangle className="h-4 w-4" />
            SOS
          </Button>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  </div>
);
