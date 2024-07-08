import React from "react";
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
import { ClipboardList } from "lucide-react";
import { useUserContext } from "./userProvider";

function Header() {
  const { user, logout } = useUserContext(); // Get user and logout from context
  

  return (
    <header className="bg-white/5 px-4 flex justify-between items-center h-14">
      <div className="flex justify-between items-center space-x-16">
        <div>
          <Link className="text-primary uppercase font-bold text-xl" to="/">
            <div className="flex justify-between items-center gap-1">
              <ClipboardList />
              <p>Tasks..</p>
            </div>
          </Link>
        </div>
        <nav>
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
          <div>Loading...</div> // Show a loading indicator while fetching user data
        ) : user ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className="h-8 w-8">
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
    </header>
  );
}

export default Header;
