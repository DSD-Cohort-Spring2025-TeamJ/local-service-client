import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  "./plumbing3.png",
  "./plumbing4.png",
  "./plumbing6.png",
  "./plumbing7.png",
  "./plumbing8.png",
];

const variants = {
  initial: (direction) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 },
    },
  },
  exit: (direction) => ({
    x: direction > 0 ? -1000 : 1000,
    opacity: 0,
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 },
    },
  }),
};

const Gallery = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      nextStep();
    }, 10000);
    return () => clearTimeout(timer);
  }, [index]);

  const nextStep = () => {
    setDirection(1);
    setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevStep = () => {
    setDirection(-1);
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="relative w-full max-w-[800px] aspect-[4/3] mx-auto overflow-hidden rounded-lg shadow-lg">
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={images[index]}
          src={images[index]}
          alt="slides of course material"
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          custom={direction}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </AnimatePresence>
      <button
        className="hover:cursor-pointer absolute top-1/2 left-4 -translate-y-1/2 bg-white/70 p-2 rounded-full hover:bg-white transition"
        onClick={prevStep}
      >
        <ChevronLeft size={24} />
      </button>
      <button
        className="hover:cursor-pointer absolute top-1/2 right-4 -translate-y-1/2 bg-white/70 p-2 rounded-full hover:bg-white transition"
        onClick={nextStep}
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

export default Gallery;
