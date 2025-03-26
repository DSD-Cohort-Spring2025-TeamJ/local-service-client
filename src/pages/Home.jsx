import React from "react";
import reviews from "/src/components/ReviewData.js";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import Button from "/src/components/Button.jsx";
import { FaUserShield, FaWrench } from "react-icons/fa";
import PropTypes from "prop-types";

export default function StickyHeader({ setOpen }) {
  const location = useLocation();

  return (
    <motion.header
      className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/70 shadow-md"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img
            src="/pragmaticplumberlogo.png"
            alt="Pragmatic Plumber"
            className="w-auto h-14"
          />
        </div>

        {location.pathname === "/" && ( //location.pathname !== "/admin"
          <div className="flex gap-4 items-center">
            <Button
              text="Book Online "
              className="hidden hover:cursor-pointer sm:flex bg-gradient-to-r from-green-500 to-green-400 text-green-950
              font-semibold px-6 py-2 rounded-full shadow hover:scale-105 transition"
              onClick={() => setOpen(true)}
            />

            <a
              href="/login"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-full shadow transition"
            >
              <FaUserShield className="mr-2" /> Admin
            </a>
          </div>
        )}
      </div>
    </motion.header>
  );
}

export function HeroSection({ setOpen }) {
  return (
    <section className="relative bg-gradient-to-br from-green-50 to-teal-100 py-28 flex flex-col items-center text-center">
      <motion.h2
        className="text-4xl sm:text-5xl z-10 font-extrabold text-green-700 mb-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        Professional Plumbing Done Right
      </motion.h2>
      <motion.p
        className="text-lg z-10 text-gray-600 mb-8 max-w-md"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        Trusted solutions for all your plumbing needs with reliability and care.
      </motion.p>
      <motion.button
        onClick={() => setOpen(true)}
        className="hover:cursor-pointer bg-gradient-to-r from-green-500 to-green-400 z-10 text-green-950 font-semibold flex items-center
        px-8 py-3 rounded-full shadow-xl hover:scale-105 transition"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <FaWrench className="mr-2" /> Book Your Appointment
      </motion.button>
      <img
        src="/plumbing6.png"
        alt="Plumber at work"
        className="hidden sm:flex absolute bottom-0 w-full object-cover opacity-20"
      />
    </section>
  );
}

export function TestimonialCarousel() {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(
      () => setIndex((prev) => (prev + 1) % reviews.length),
      4000
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center items-center py-10 bg-green-50">
      <div className="relative w-[350px] h-[160px] bg-white rounded-xl shadow-xl p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <p className="text-gray-700 mb-2">
              &quot;{reviews[index].text}&quot;
            </p>
            <p className="text-green-600 font-semibold">
              - {reviews[index].author}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

StickyHeader.propTypes = {
  setOpen: PropTypes.func.isRequired,
};

HeroSection.propTypes = {
  setOpen: PropTypes.func.isRequired,
};
