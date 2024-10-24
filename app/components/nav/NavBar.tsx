"use client";

import { useState } from "react";
import Link from "next/link";
import { Redressed } from "next/font/google";
import { Menu, Search, ShoppingCart, User } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { useCart } from "@/hooks/useCart";  // Import the useCart hook

const redressed = Redressed({ subsets: ["latin"], weight: ["400"] });

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");  // State for search input
  const { cartTotalQty } = useCart();  // Get the cart quantity from the context
  const router = useRouter();  // Use Next.js router for search navigation

  // Handle search functionality
  const handleSearch = () => {
    if (searchTerm.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div className="sticky top-0 w-full bg-white z-30 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between gap-3 md:gap-0">
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4">
                  <SheetClose asChild>
                    <Link href="/" className="flex items-center gap-2 px-2">
                      <ShoppingCart className="h-5 w-5" />
                      <span className="text-sm font-medium">My Cart</span>
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="/" className="flex items-center gap-2 px-2">
                      <User className="h-5 w-5" />
                      <span className="text-sm font-medium">My Account</span>
                    </Link>
                  </SheetClose>
                  <div className="px-2">
                    <span className="text-sm text-muted-foreground">
                      Need Help?
                    </span>
                    <span className="block text-sm font-medium">0726526375</span>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>

            <Link
              href="/"
              className={`${redressed.className} text-xl md:text-2xl text-green-600 font-bold`}
            >
              Vincent Otieno
            </Link>

            <div className="hidden md:flex items-center flex-1 mx-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="mr-2">
                    All Categories
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Category 1</DropdownMenuItem>
                  <DropdownMenuItem>Category 2</DropdownMenuItem>
                  <DropdownMenuItem>Category 3</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <div className="flex-1 relative">
                <Input
                  type="text"
                  placeholder="Search for products"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}  // Update searchTerm state
                  className="w-full pr-10"
                />
                <Button
                  size="sm"
                  className="absolute right-1 top-1/2 -translate-y-1/2"
                  onClick={handleSearch}  // Trigger search when button is clicked
                >
                  <Search className="h-4 w-4" />
                  <span className="sr-only">Search</span>
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-4 md:gap-6">
              <div className="hidden md:flex flex-col items-end">
                <span className="text-sm text-foreground">Need Help?</span>
                <span className="text-sm font-bold">0797398004</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="hidden md:flex items-center gap-2"
              >
                <User className="h-5 w-5" />
                <div className="flex flex-col items-start">
                  <span className="text-xs text-muted-foreground">
                    My Account
                  </span>
                  <span className="text-sm font-medium">Login</span>
                </div>
              </Button>
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">Shopping Cart</span>
                {/* Update cart badge with the dynamic cartTotalQty */}
                <div className="absolute -top-2 -right-2 h-4 w-4 rounded-full bg-green-600 text-xs text-white flex items-center justify-center">
                  {cartTotalQty}  {/* Display the cart total quantity */}
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="md:hidden py-2 px-4 bg-gray-100">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search for products"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}  // Update searchTerm state
            className="w-full pr-10"
          />
          <Button
            size="sm"
            className="absolute right-1 top-1/2 -translate-y-1/2"
            onClick={handleSearch}  // Trigger search when button is clicked
          >
            <Search className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
