"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, Moon, Sun, Film, Github, Linkedin, Twitter, X } from "lucide-react"
import { useTheme } from "next-themes"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  const navLinks = [
    { href: "#features", label: "Features" },
    { href: "#tech", label: "Tech Stack" },
    { href: "#download", label: "Download" },
  ]

  const socialLinks = [
    { href: "https://github.com/SimpleCyber", icon: Github },
    { href: "https://linkedin.com/in/satyam-yada", icon: Linkedin },
    { href: "https://x.com/Satyam_yadav_04", icon: Twitter },
  ]

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 border-b"
      style={{
        backgroundColor: theme === "dark" ? "#030014" : "#ffffff",
        borderColor: theme === "dark" ? "#221f3d" : "#e5e7eb",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
              style={{ background: "linear-gradient(135deg, #ac7ffe, #9333ea)" }}
            >
              <Film className="w-6 h-6 text-white" />
            </div>
            <span
              className="font-bold text-xl font-poppins"
              style={{ color: theme === "dark" ? "#d6c7ff" : "#030014" }}
            >
              MovieApp
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-medium transition-colors duration-300 hover:text-purple-400"
                style={{ color: theme === "dark" ? "#9ca4ab" : "#6b7280" }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Social & Theme */}
          <div className="hidden md:flex items-center space-x-4">
            {socialLinks.map((social, index) => (
              <Link
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 transition-colors duration-300 hover:text-purple-400"
                style={{ color: theme === "dark" ? "#9ca4ab" : "#6b7280" }}
              >
                <social.icon className="w-5 h-5" />
              </Link>
            ))}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 transition-colors duration-300 hover:text-purple-400"
              style={{ color: theme === "dark" ? "#9ca4ab" : "#6b7280" }}
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <Link
              href="#download"
              className="px-4 py-2 rounded-lg font-medium transition-colors duration-300"
              style={{ backgroundColor: "#ac7ffe", color: "white" }}
            >
              Get App
            </Link>
          </div>

          {/* Mobile Controls */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 transition-colors duration-300"
              style={{ color: theme === "dark" ? "#9ca4ab" : "#6b7280" }}
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 transition-colors duration-300"
              style={{ color: theme === "dark" ? "#9ca4ab" : "#6b7280" }}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="fixed inset-0 top-16 z-50">
              <div
                className="fixed inset-0"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                onClick={() => setIsMenuOpen(false)}
              />
              <div
                className="fixed right-0 top-0 h-full w-[300px] p-6 border-l"
                style={{
                  backgroundColor: theme === "dark" ? "#030014" : "#ffffff",
                  borderColor: theme === "dark" ? "#221f3d" : "#e5e7eb",
                }}
              >
                <div className="flex flex-col space-y-6">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="text-lg font-medium transition-colors hover:text-purple-400"
                      style={{ color: theme === "dark" ? "#9ca4ab" : "#6b7280" }}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="border-t pt-6" style={{ borderColor: theme === "dark" ? "#221f3d" : "#e5e7eb" }}>
                    <div className="flex space-x-4 mb-6">
                      {socialLinks.map((social, index) => (
                        <Link
                          key={index}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 transition-colors hover:text-purple-400"
                          style={{ color: theme === "dark" ? "#9ca4ab" : "#6b7280" }}
                        >
                          <social.icon className="w-5 h-5" />
                        </Link>
                      ))}
                    </div>
                    <Link
                      href="#download"
                      onClick={() => setIsMenuOpen(false)}
                      className="block w-full text-center py-3 rounded-lg font-medium transition-colors"
                      style={{ backgroundColor: "#ac7ffe", color: "white" }}
                    >
                      Get App
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
