import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-[#e7e3dd] bg-[#f8f7f3]">
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
        <div className="flex flex-col items-center justify-between gap-5 md:flex-row">

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-[#24105c]"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#32106f] text-xs text-white">
              ⚡
            </span>

            <span className="font-bold">
              SkillSwap
            </span>
          </Link>

          {/* Copyright */}
          <p className="text-center text-xs text-[#77709b]">
            © 2026 SkillSwap. Built for curious humans.
          </p>

          {/* Links */}
          <div className="flex items-center gap-5 text-xs text-[#77709b]">
            <Link
              to="#"
              className="transition hover:text-[#32106f]"
            >
              Privacy
            </Link>

            <Link
              to="#"
              className="transition hover:text-[#32106f]"
            >
              Terms
            </Link>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;