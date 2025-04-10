import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const TubelightLoader = () => {
  const [isOn, setIsOn] = useState(false);
  const [flickerOpacity, setFlickerOpacity] = useState(0.3);

  useEffect(() => {
    const flickerTimings = [100, 200, 150, 80, 250, 50, 300, 500]; 
    let flickerIndex = 0;

    const flickerSequence = () => {
      if (flickerIndex < flickerTimings.length) {
        setFlickerOpacity(Math.random() * 0.4 + 0.2);
        setTimeout(flickerSequence, flickerTimings[flickerIndex]);
        flickerIndex++;
      } else {
        setIsOn(true);
      }
    };

    setTimeout(flickerSequence, 300);

    return () => clearTimeout(flickerSequence);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0a0a0a]">
      {/* Tubelight */}
      <motion.div
        className="w-[500px] h-[45px] rounded-full relative overflow-hidden"
        animate={{
          opacity: isOn ? 1 : flickerOpacity,
          background: isOn
            ? "linear-gradient(90deg, #e0f7ff, #ffffff, #e0f7ff)"
            : "linear-gradient(90deg, #a5b7c4, #d3e1ea, #a5b7c4)",
          boxShadow: isOn
            ? "0px 0px 180px rgba(180, 245, 255, 1), 0px 0px 250px rgba(180, 245, 255, 0.9)"
            : `0px 0px ${Math.random() * 40 + 20}px rgba(180, 245, 255, 0.6)`,
        }}
        transition={{
          duration: isOn ? 1.5 : 0.08,
          ease: "easeInOut",
        }}
      >
        {/* Light Reflection */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, rgba(180, 245, 255, 0.3) 50%, rgba(10,10,10,0) 100%)",
          }}
          animate={{
            opacity: isOn ? 0.7 : 0.3,
          }}
          transition={{
            duration: 0.8,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Glowing Ambient Light */}
      <motion.div
        className="absolute w-[600px] h-[200px] rounded-full bg-[#00ffff] blur-[100px] opacity-30"
        animate={{
          opacity: isOn ? 0.8 : flickerOpacity * 0.5,
        }}
        transition={{
          duration: 1.5,
          ease: "easeInOut",
        }}
      ></motion.div>

      {/* Loading Text */}
      <motion.p
        className="mt-8 text-xl font-medium text-[#cfeeff]"
        animate={{
          opacity: isOn ? 1 : flickerOpacity,
          color: isOn ? "#ffffff" : "#a5b7c4",
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {isOn ? "System Ready!" : "Powering up..."}
      </motion.p>
    </div>
  );
};

export default TubelightLoader;
