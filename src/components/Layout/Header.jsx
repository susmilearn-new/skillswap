import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="border-b border-[#e7e3dd] bg-[#f8f7f3]">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <nav className="flex h-16 items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-[#24105c]"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#32106f] text-sm text-white">
              ⚡
            </span>

            <span className="text-xl font-bold">
              SkillSwap
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 lg:flex">
            <a
              href="/#how"
              className="text-sm font-medium text-[#5f5790] transition hover:text-[#32106f]"
            >
              How it works
            </a>

            <a
              href="/#categories"
              className="text-sm font-medium text-[#5f5790] transition hover:text-[#32106f]"
            >
              Categories
            </a>

            <a
              href="/#community"
              className="text-sm font-medium text-[#5f5790] transition hover:text-[#32106f]"
            >
              Community
            </a>
          </div>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-5 lg:flex">
            <Link
              to="/login"
              className="text-sm font-semibold text-[#24105c] hover:text-[#6d35d9]"
            >
              Log in
            </Link>

            <Link
              to="/register"
              className="rounded-full bg-[#32106f] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#45158d]"
            >
              Get started free
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-[#32106f] lg:hidden"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-t border-[#e7e3dd] py-5 lg:hidden">
            <div className="flex flex-col gap-4">

              <a
                href="/#how"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-[#5f5790]"
              >
                How it works
              </a>

              <a
                href="/#categories"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-[#5f5790]"
              >
                Categories
              </a>

              <a
                href="/#community"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-[#5f5790]"
              >
                Community
              </a>

              <div className="flex items-center gap-4 border-t border-[#e7e3dd] pt-4">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-semibold text-[#24105c]"
                >
                  Log in
                </Link>

                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-full bg-[#32106f] px-5 py-2 text-sm font-semibold text-white"
                >
                  Get started free
                </Link>
              </div>

            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;