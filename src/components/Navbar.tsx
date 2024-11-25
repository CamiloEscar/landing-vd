"use client";

import {
  Menu,
  X,
  Tv,
  Wifi,
  Home,
  Users,
  CreditCard,
  MapPin,
  Phone,
  MessageCircle,
  HelpCircle,
  AlertTriangle,
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { Sun, Moon } from "lucide-react"; // Si estás usando lucide-react

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    // { name: "Inicio", icon: Home, href: "#home" },
    { name: "Planes", icon: Tv, href: "#plans" },
    { name: "Nosotros", icon: Users, href: "#about" },
    { name: "Cobertura", icon: MapPin, href: "#coverage" },
    { name: "Pago", icon: CreditCard, href: "#payment" },
    { name: "Preguntas", icon: HelpCircle, href: "#faq" },
    { name: "Reclamos", icon: AlertTriangle, href: "/reclamos" },
  ];

  const contactButtons = [
    {
      name: "Ventas",
      icon: MessageCircle,
      href: "https://wa.me/543442457061",
      variant: "success",
    },
    {
      name: "Soporte",
      icon: Phone,
      href: "https://wa.me/543442457060",
      variant: "destructive",
    },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white/80 backdrop-blur-lg shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center"
          >
            <div className="flex-shrink-0 flex items-center gap-x-3">
              <a href="/">
                <img
                  src="https://ss-static-01.esmsv.com/id/23061/galeriaimagenes/obtenerimagen/?width=104&height=80&id=sitio_logo&ultimaModificacion=2024-11-20+00%3A23%3A33"
                  alt="Logo"
                  className="h-12 w-auto"
                />
              </a>
              <div
                className={`font-bold transition-colors duration-300 ${
                  scrolled ? "text-gray-800" : "text-white"
                }`}
              >
                {/* <span className="text-xl">Video Digital</span>
                <div className="text-xs text-blue-500 font-medium">
                  Internet & Cable
                </div> */}
              </div>
            </div>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-x-1">
            {/* Navigation Items */}
            <div className="flex items-center space-x-1">
              {menuItems.map((item, index) => (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  key={item.name}
                >
                  {item.href.startsWith("/") ? (
                    <Link
                      to={item.href}
                      className={`flex items-center gap-x-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-white/10 ${
                        scrolled
                          ? "text-gray-700 hover:text-blue-600"
                          : "text-white hover:text-blue-400"
                      }`}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </Link>
                  ) : (
                    <a
                      href={item.href}
                      className={`flex items-center gap-x-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-white/10 ${
                        scrolled
                          ? "text-gray-700 hover:text-blue-600"
                          : "text-white hover:text-blue-400"
                      }`}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </a>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Contact Buttons */}
            <div className="flex items-center gap-x-2 ml-4">
              {contactButtons.map((button, index) => (
                <motion.a
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (menuItems.length + index) * 0.1 }}
                  key={button.name}
                  href={button.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-x-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    button.variant === "success"
                      ? "bg-green-500 hover:bg-green-600 text-white"
                      : "bg-red-500 hover:bg-red-600 text-white"
                  }`}
                >
                  <button.icon className="h-4 w-4" />
                  <span>{button.name}</span>
                </motion.a>
              ))}
            <Button
              onClick={toggleTheme}
              className="p-2 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-lg transition-colors duration-300 ${
                scrolled
                  ? "text-gray-600 hover:bg-gray-100"
                  : "text-white hover:bg-white/10"
              }`}
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden"
          >
            <div className="px-4 pt-2 pb-3 space-y-1 bg-white/80 backdrop-blur-lg shadow-lg">
              {menuItems.map((item) =>
                item.href.startsWith("/") ? (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="flex items-center gap-x-2 text-gray-600 hover:text-blue-600 hover:bg-white/50 px-4 py-3 rounded-lg text-base font-medium transition-all duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                ) : (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex items-center gap-x-2 text-gray-600 hover:text-blue-600 hover:bg-white/50 px-4 py-3 rounded-lg text-base font-medium transition-all duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </a>
                )
              )}

              {/* Mobile Contact Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                {contactButtons.map((button) => (
                  <a
                    key={button.name}
                    href={button.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center gap-x-2 px-4 py-3 rounded-lg text-sm font-medium text-white transition-all duration-300 ${
                      button.variant === "success"
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-red-500 hover:bg-red-600"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <button.icon className="h-4 w-4" />
                    <span>{button.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
