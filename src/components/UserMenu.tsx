import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogOut, UserCircle, Settings, BookOpen } from "lucide-react";
import useAuth from '@/hooks/useAuth';
import { motion } from 'framer-motion';

const USER_MENU_TEXT_CONSTANTS = {
  LOGIN_BUTTON: "Se connecter",
  PROFILE_BUTTON: "Profil",
  SETTINGS_BUTTON: "Paramètres",
  MY_COURSES_BUTTON: "Mes Cours",
  LOGOUT_BUTTON: "Déconnexion",
  DEFAULT_INITIALS: "UT",
};

const UserMenu = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return (
      <motion.div
        className="flex items-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <Button
          variant="default"
          className="text-base font-semibold bg-gray-700 hover:bg-gray-600 text-white rounded-full px-6 py-3 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out flex items-center gap-2 border border-gray-600"
          onClick={() => navigate('/zetoulog')}
        >
          <UserCircle className="h-6 w-6" />
          {USER_MENU_TEXT_CONSTANTS.LOGIN_BUTTON}
        </Button>
      </motion.div>
    );
  }

  const getInitials = () => {
    if (user?.username) {
      return user.username.substring(0, 2).toUpperCase();
    }
    if (user?.name) {
      const nameParts = user.name.split(' ').filter(Boolean);
      if (nameParts.length > 1) {
        return (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase();
      }
      return nameParts[0][0].toUpperCase();
    }
    return user?.email?.substring(0, 2).toUpperCase() || USER_MENU_TEXT_CONSTANTS.DEFAULT_INITIALS;
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.div
          whileHover={{ scale: 1.05, boxShadow: "0 0 0 4px rgba(0, 0, 0, 0.3)" }}
          whileTap={{ scale: 0.98 }}
          className="relative h-11 w-11 rounded-full cursor-pointer transition-all duration-200"
        >
          <Avatar className="h-11 w-11 border-2 border-transparent shadow-md transition-all duration-200 group-hover:border-gray-400">
            <AvatarFallback className="bg-gray-800 text-white font-bold text-xl flex items-center justify-center rounded-full">
              {getInitials()}
            </AvatarFallback>
          </Avatar>
        </motion.div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-64 p-2 shadow-2xl rounded-lg bg-gray-800 border border-gray-700 animate-in slide-in-from-top-8 fade-in-0 duration-400 ease-out text-white"
        align="end"
        forceMount
      >
        <DropdownMenuItem
          className="flex items-center gap-3 px-3 py-2 text-gray-200 cursor-pointer text-base hover:bg-gray-700 focus:bg-gray-700 focus:text-white rounded-md transition-colors duration-150"
          onClick={() => navigate('/profile')}
        >
          <UserCircle className="h-5 w-5 text-gray-400" />
          <span>{USER_MENU_TEXT_CONSTANTS.PROFILE_BUTTON}</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          className="flex cursor-pointer items-center gap-3 px-3 py-2 text-gray-200 hover:bg-gray-700 focus:bg-gray-700 focus:text-white rounded-md transition-colors duration-200"
          onClick={() => navigate('/settings')}
        >
          <Settings className="h-5 w-5 text-gray-400" />
          <span>{USER_MENU_TEXT_CONSTANTS.SETTINGS_BUTTON}</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          className="flex cursor-pointer items-center gap-3 px-3 py-2 text-gray-200 hover:bg-gray-700 focus:bg-gray-700 focus:text-white rounded-md transition-colors duration-200"
          onClick={() => navigate('/my-courses')}
        >
          <BookOpen className="h-5 w-5 text-gray-400" />
          <span>{USER_MENU_TEXT_CONSTANTS.MY_COURSES_BUTTON}</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-gray-600 my-2" />

        <DropdownMenuItem
          className="flex cursor-pointer items-center gap-3 px-3 py-2 text-red-400 hover:bg-red-700 focus:bg-red-700 focus:text-white rounded-md transition-colors duration-200"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5 text-red-400" />
          <span>{USER_MENU_TEXT_CONSTANTS.LOGOUT_BUTTON}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
