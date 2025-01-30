"use client";

import { motion } from "framer-motion";

export default function F1Button({ text = "WELCOME", suffix = "F1", onClick }) {
  return (
    <motion.button
      className="font-orbitron italic font-extrabold group flex items-center bg-transparent hover:bg-transparent transition-colors relative"
      onClick={onClick}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.97 }}
    >
      {/* Add borders only to bottom and left */}
      <motion.div
        className="absolute top-0 left-0 w-[0.5px] h-full bg-black/80"
        initial={{ height: 0 }}
        animate={{ height: "100%" }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />

      {/* Bottom Border Animation */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-[1px] bg-black/80"
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 0.5, ease: "easeInOut", delay: 0.5 }}
      />

      <span className="px-2 py-1 font-bold tracking-wider text-black/90">
        {text}
      </span>
      <div className="bg-black text-white text-sm px-2 py-1.5 font-bold tracking-wider">
        {suffix}
      </div>
    </motion.button>
  );
}
