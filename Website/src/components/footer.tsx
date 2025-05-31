"use client";

import { Github, Linkedin, Twitter, Film } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";

export default function Footer() {
  const { theme } = useTheme();

  const socialLinks = [
    { href: "https://github.com/SimpleCyber", icon: Github, label: "GitHub" },
    {
      href: "https://linkedin.com/in/satyam-yada",
      icon: Linkedin,
      label: "LinkedIn",
    },
    { href: "https://x.com/Satyam_yadav_04", icon: Twitter, label: "Twitter" },
    {
      href: "https://leetcode.com/u/yadav-satyam",
      icon: "LC",
      label: "LeetCode",
    },
  ];

  return (
    <footer
      className="border-t"
      style={{
        backgroundColor: theme === "dark" ? "#151312" : "#f9fafb",
        borderColor: theme === "dark" ? "#221f3d" : "#e5e7eb",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #ac7ffe, #9333ea)",
                }}
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
            <p style={{ color: theme === "dark" ? "#9ca4ab" : "#6b7280" }}>
              Transform the way you discover and save movies with our React
              Native app featuring TMDB API integration.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3
              className="font-semibold font-poppins"
              style={{ color: theme === "dark" ? "#d6c7ff" : "#030014" }}
            >
              Quick Links
            </h3>
            <div className="flex flex-col space-y-2">
              <Link
                href="#features"
                className="transition-colors hover:text-purple-400"
                style={{ color: theme === "dark" ? "#9ca4ab" : "#6b7280" }}
              >
                Features
              </Link>
              <Link
                href="#tech"
                className="transition-colors hover:text-purple-400"
                style={{ color: theme === "dark" ? "#9ca4ab" : "#6b7280" }}
              >
                Tech Stack
              </Link>
              <Link
                href="#download"
                className="transition-colors hover:text-purple-400"
                style={{ color: theme === "dark" ? "#9ca4ab" : "#6b7280" }}
              >
                Download
              </Link>
            </div>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h3
              className="font-semibold font-poppins"
              style={{ color: theme === "dark" ? "#d6c7ff" : "#030014" }}
            >
              Connect with me
            </h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                  style={{
                    backgroundColor:
                      theme === "dark"
                        ? "rgba(34, 31, 61, 0.5)"
                        : "rgba(229, 231, 235, 0.5)",
                    color: theme === "dark" ? "#9ca4ab" : "#6b7280",
                  }}
                >
                  {typeof social.icon === "string" ? (
                    <span className="text-sm font-bold">{social.icon}</span>
                  ) : (
                    <social.icon className="w-5 h-5" />
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div
          className="border-t mt-8 pt-8 text-center"
          style={{ borderColor: theme === "dark" ? "#221f3d" : "#e5e7eb" }}
        >
          <p style={{ color: theme === "dark" ? "#9ca4ab" : "#6b7280" }}>
            © {new Date().getFullYear()} MovieApp. Built with ❤️ by{" "}
            <Link
              href="https://github.com/SimpleCyber"
              className="hover:underline"
              style={{ color: "#ac7ffe" }}
            >
              Satyam Yadav
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
