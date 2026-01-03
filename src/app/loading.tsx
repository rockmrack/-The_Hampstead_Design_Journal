'use client';

import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-hampstead-white dark:bg-hampstead-black">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="text-center"
      >
        {/* Elegant spinner */}
        <div className="relative w-16 h-16 mx-auto mb-8">
          {/* Outer ring */}
          <motion.div
            className="absolute inset-0 border-2 border-hampstead-grey/30 dark:border-white/10 rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          />
          {/* Spinning arc */}
          <motion.div
            className="absolute inset-0 border-2 border-transparent border-t-hampstead-black dark:border-t-white rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
          {/* Center dot */}
          <motion.div
            className="absolute inset-0 m-auto w-2 h-2 bg-hampstead-black dark:bg-white rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        {/* Loading text with stagger animation */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-2"
        >
          <p className="text-hampstead-charcoal dark:text-white/70 uppercase tracking-[0.25em] text-xs font-medium">
            Loading
          </p>
          <div className="flex items-center justify-center gap-1">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="w-1.5 h-1.5 bg-hampstead-charcoal/40 dark:bg-white/40 rounded-full"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
