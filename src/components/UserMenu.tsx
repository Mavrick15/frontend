import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogOut, UserCircle, FileText, Sparkles } from "lucide-react";
import useAuth from '@/hooks/useAuth';
import { motion } from 'framer-motion';

const USER_MENU_CONSTANTS = {
  LOGIN_BUTTON_TEXT: "Se connecter",
  SIGNUP_BUTTON_TEXT: "S'inscrire",
  PROFILE_LABEL: "Profile",
  INVOICES_TEXT: "Mes Factures",
  LOGOUT_BUTTON_TEXT: "Déconnexion",
  DEFAULT_INITIALS: "UT", // User Type or Unknown User
};

const UserMenu = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLoginClick = () => navigate('/login');
  const handleSignupClick = () => navigate('/signup');
  const handleInvoicesClick = () => navigate('/invoices');
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getUserInitials = () => {
    if (user?.name) {
      const nameParts = user.name.split(' ').filter(Boolean);
      if (nameParts.length === 1) {
        return nameParts[0].substring(0, 2).toUpperCase();
      }
      if (nameParts.length > 1) {
        return (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase();
      }
    }
    return user?.email?.substring(0, 2).toUpperCase() || USER_MENU_CONSTANTS.DEFAULT_INITIALS;
  };

  if (!isAuthenticated) {
    return (
      <motion.div
        className="flex items-center gap-3"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="ghost"
            className="text-sm font-semibold text-gray-700 hover:text-gray-900 bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-300 px-5 py-2.5 rounded-xl border border-gray-200/50 shadow-sm hover:shadow-md"
            onClick={handleLoginClick}
          >
            {USER_MENU_CONSTANTS.LOGIN_BUTTON_TEXT}
          </Button>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="default"
            className="text-sm font-bold bg-gradient-to-br from-gray-900 via-gray-800 to-black hover:from-gray-800 hover:to-gray-700 text-white rounded-xl px-6 py-2.5 shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out border border-gray-700/50"
            onClick={handleSignupClick}
          >
            {USER_MENU_CONSTANTS.SIGNUP_BUTTON_TEXT}
          </Button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="relative h-10 w-10 rounded-full cursor-pointer transition-all duration-300 hover:ring-2 hover:ring-gray-900/50 hover:ring-offset-2 hover:ring-offset-white shadow-lg hover:shadow-xl"
        >
          <Avatar className="h-10 w-10 border-2 border-gray-900/20 shadow-lg">
            <AvatarFallback className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white font-bold text-base flex items-center justify-center">
              {getUserInitials()}
            </AvatarFallback>
          </Avatar>
        </motion.div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-72 p-0 shadow-2xl rounded-2xl bg-white/95 backdrop-blur-md border border-gray-200/50 animate-in slide-in-from-top-2 fade-in-0 duration-300 ease-out overflow-hidden"
        align="end"
        forceMount
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <DropdownMenuLabel className="px-4 py-4 text-xl font-bold text-white bg-gradient-to-br from-gray-900 via-gray-800 to-black border-b border-gray-700/50 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}></div>
            <div className="relative z-10 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-white" />
              {USER_MENU_CONSTANTS.PROFILE_LABEL}
            </div>
          </DropdownMenuLabel>
          <div className="p-2">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <DropdownMenuItem className="flex items-center gap-3 px-4 py-3 text-gray-800 cursor-default text-base bg-gray-50/50 rounded-xl mb-2">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center shadow-lg">
                  <UserCircle className="h-5 w-5 text-white" />
                </div>
                <span className="truncate font-semibold">{user?.email}</span>
              </DropdownMenuItem>
            </motion.div>
            <DropdownMenuSeparator className="bg-gray-200/50 my-2" />
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <DropdownMenuItem
                className="flex cursor-pointer items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50/80 backdrop-blur-sm focus:bg-gray-50 rounded-xl transition-all duration-300 hover:shadow-md hover:-translate-x-1 group"
                onClick={handleInvoicesClick}
              >
                <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <FileText className="h-5 w-5 text-white" />
                </div>
                <span className="font-semibold">{USER_MENU_CONSTANTS.INVOICES_TEXT}</span>
              </DropdownMenuItem>
            </motion.div>
            <DropdownMenuSeparator className="bg-gray-200/50 my-2" />
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <DropdownMenuItem
                className="flex cursor-pointer items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50/80 backdrop-blur-sm focus:bg-red-50 focus:text-red-700 rounded-xl transition-all duration-300 hover:shadow-md hover:-translate-x-1 group"
                onClick={handleLogout}
              >
                <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <LogOut className="h-5 w-5 text-white" />
                </div>
                <span className="font-semibold">{USER_MENU_CONSTANTS.LOGOUT_BUTTON_TEXT}</span>
              </DropdownMenuItem>
            </motion.div>
          </div>
        </motion.div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
