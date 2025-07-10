import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogOut, UserCircle } from "lucide-react";
import useAuth from '@/hooks/useAuth';
import { motion } from 'framer-motion';

// Constantes pour les textes du composant UserMenu
const USER_MENU_TEXT_CONSTANTS = {
  LOGIN_BUTTON: "Se connecter",
  SIGNUP_BUTTON: "S'inscrire",
  PROFILE_LABEL: "Profile",
  LOGOUT_BUTTON: "Déconnexion",
  DEFAULT_INITIALS: "UT", // User Type or Unknown User
};

const UserMenu = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  // If user is not authenticated, show login/signup buttons
  if (!isAuthenticated) {
    return (
      <motion.div
        className="flex items-center gap-3"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Button
          variant="ghost"
          className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors duration-300 px-4 py-2"
          onClick={() => navigate('/login')}
        >
          {USER_MENU_TEXT_CONSTANTS.LOGIN_BUTTON}
        </Button>
        <Button
          variant="default"
          className="text-sm font-semibold bg-gray-900 hover:bg-gray-700 text-white rounded-full px-5 py-2.5 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out"
          onClick={() => navigate('/signup')}
        >
          {USER_MENU_TEXT_CONSTANTS.SIGNUP_BUTTON}
        </Button>
      </motion.div>
    );
  }

  // Function to get user initials for the AvatarFallback
  const getInitials = () => {
    if (user?.name) {
      const nameParts = user.name.split(' ').filter(Boolean);
      if (nameParts.length > 1) {
        return (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase();
      }
      return nameParts[0][0].toUpperCase();
    }
    return user?.email?.substring(0, 2).toUpperCase() || USER_MENU_TEXT_CONSTANTS.DEFAULT_INITIALS;
  };

  // Handle user logout
  const handleLogout = () => {
    logout();
    navigate('/'); // Redirect to home page after logout
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.div
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="relative h-10 w-10 rounded-full cursor-pointer transition-all duration-200 hover:ring-2 hover:ring-gray-700 hover:ring-offset-2 hover:ring-offset-white"
        >
          <Avatar className="h-10 w-10 border border-gray-200 shadow-md">
            <AvatarFallback className="bg-gradient-to-br from-gray-700 to-gray-900 text-white font-semibold text-lg flex items-center justify-center">
              {getInitials()}
            </AvatarFallback>
          </Avatar>
        </motion.div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-64 p-3 shadow-xl rounded-xl bg-white border border-gray-100 animate-in slide-in-from-top-1 fade-in-0 duration-200 ease-out"
        align="end"
        forceMount
      >
        <DropdownMenuLabel className="px-2 py-2 text-xl font-bold text-gray-900 border-b border-gray-100 mb-2">
          {USER_MENU_TEXT_CONSTANTS.PROFILE_LABEL}
        </DropdownMenuLabel>
        <DropdownMenuItem className="flex items-center gap-3 px-3 py-2 text-gray-800 cursor-default text-base">
          <UserCircle className="h-5 w-5 text-gray-500" />
          <span className="truncate">{user?.email}</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-gray-200 my-2" />
        <DropdownMenuItem
          className="flex cursor-pointer items-center gap-3 px-3 py-2 text-red-600 hover:bg-red-50 focus:bg-red-50 focus:text-red-700 rounded-lg transition-colors duration-200 mt-2"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5 text-red-600" />
          <span>{USER_MENU_TEXT_CONSTANTS.LOGOUT_BUTTON}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
