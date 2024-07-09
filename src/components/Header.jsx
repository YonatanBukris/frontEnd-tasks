import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { ClipboardList, Menu, X } from "lucide-react"; // Import Lucide icons
import { useUserContext } from "./userProvider";

function Header() {
  const { user, logout } = useUserContext(); // Get user and logout from context
  const [menuOpen, setMenuOpen] = useState(false); // State to manage menu visibility

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <header className="dark:bg-white/5 bg-black/5 px-4 flex justify-between items-center h-14 relative z-50">
        <div className="flex justify-between items-center space-x-16">
          <div>
            <Link className="text-primary uppercase font-bold text-xl" to="/">
              <div className="flex justify-between items-center gap-1">
                <ClipboardList />
                <p>Tasks..</p>
              </div>
            </Link>
          </div>
          <nav className="hidden md:block">
            <ul className="flex gap-6">
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <Link to="/task">Tasks</Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="flex items-center gap-1">
          {user === undefined ? (
            <Link to="/auth/login">Login</Link> 
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className="h-8 w-8 dark:bg-white/5 bg-slate-300">
                  <AvatarImage src={user.imgUrl} />
                  <AvatarFallback>
                    {user.firstName && user.firstName[0].toUpperCase()}
                    {user.lastName && user.lastName[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
                <DropdownMenuSeparator />
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button as={Link} to="/auth/login">
              Login
            </Button>
          )}
          <ModeToggle />
        </div>

        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {menuOpen ? <X className="text-2xl" /> : <Menu className="text-2xl" />}
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="block md:hidden bg-white dark:bg-black/90 w-full h-auto p-4 absolute top-14 left-0 z-40">
          <ul className="flex flex-col gap-6">
            <li>
              <Link to="/about" onClick={toggleMenu}>About</Link>
            </li>
            <li>
              <Link to="/contact" onClick={toggleMenu}>Contact</Link>
            </li>
            <li>
              <Link to="/task" onClick={toggleMenu}>Tasks</Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}

export default Header;
