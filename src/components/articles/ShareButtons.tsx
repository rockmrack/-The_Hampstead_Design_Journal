'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Twitter, Linkedin, Link2, Check, Mail, Facebook, Share2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ShareButtonsProps {
  title: string;
  url: string;
  variant?: 'horizontal' | 'vertical';
  showLabel?: boolean;
}

export default function ShareButtons({
  title,
  url,
  variant = 'horizontal',
  showLabel = true,
}: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);
  const fullUrl = typeof window !== 'undefined' ? `${window.location.origin}${url}` : url;

  const shareLinks = [
    {
      name: 'Twitter',
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(fullUrl)}`,
      color: 'hover:bg-[#1DA1F2] hover:text-white',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(fullUrl)}&title=${encodeURIComponent(title)}`,
      color: 'hover:bg-[#0A66C2] hover:text-white',
    },
    {
      name: 'Facebook',
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`,
      color: 'hover:bg-[#1877F2] hover:text-white',
    },
    {
      name: 'Email',
      icon: Mail,
      href: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Check out this article: ${fullUrl}`)}`,
      color: 'hover:bg-hampstead-black hover:text-white dark:hover:bg-white dark:hover:text-hampstead-black',
    },
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url: fullUrl,
        });
      } catch (err) {
        // User cancelled or error
      }
    }
  };

  const isVertical = variant === 'vertical';

  return (
    <div className={cn('space-y-3', isVertical && 'text-center')}>
      {showLabel && (
        <h4 className="text-xs font-bold uppercase tracking-widest text-hampstead-charcoal/60 dark:text-white/50">
          Share
        </h4>
      )}
      <div className={cn(
        'flex items-center gap-2',
        isVertical ? 'flex-col' : 'flex-row flex-wrap'
      )}>
        {/* Native share button (mobile) */}
        {typeof window !== 'undefined' && 'share' in navigator && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNativeShare}
            className="p-2.5 rounded-full bg-hampstead-grey/50 dark:bg-white/10 text-hampstead-charcoal dark:text-white hover:bg-hampstead-black hover:text-white dark:hover:bg-white dark:hover:text-hampstead-black transition-colors lg:hidden"
            aria-label="Share"
          >
            <Share2 className="w-4 h-4" />
          </motion.button>
        )}

        {/* Share links */}
        {shareLinks.map((link, index) => (
          <motion.a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onMouseEnter={() => setShowTooltip(link.name)}
            onMouseLeave={() => setShowTooltip(null)}
            className={cn(
              'relative p-2.5 rounded-full bg-hampstead-grey/50 dark:bg-white/10 text-hampstead-charcoal dark:text-white transition-all duration-200',
              link.color,
              'hidden lg:flex'
            )}
            aria-label={`Share on ${link.name}`}
          >
            <link.icon className="w-4 h-4" />

            {/* Tooltip */}
            <AnimatePresence>
              {showTooltip === link.name && (
                <motion.span
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-hampstead-black dark:bg-white text-white dark:text-hampstead-black rounded whitespace-nowrap"
                >
                  {link.name}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.a>
        ))}

        {/* Copy link button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={copyToClipboard}
          onMouseEnter={() => setShowTooltip('copy')}
          onMouseLeave={() => setShowTooltip(null)}
          className={cn(
            'relative p-2.5 rounded-full transition-all duration-200',
            copied
              ? 'bg-green-500 text-white'
              : 'bg-hampstead-grey/50 dark:bg-white/10 text-hampstead-charcoal dark:text-white hover:bg-hampstead-black hover:text-white dark:hover:bg-white dark:hover:text-hampstead-black'
          )}
          aria-label="Copy link"
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={copied ? 'check' : 'link'}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.15 }}
            >
              {copied ? <Check className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
            </motion.span>
          </AnimatePresence>

          {/* Tooltip */}
          <AnimatePresence>
            {showTooltip === 'copy' && !copied && (
              <motion.span
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-hampstead-black dark:bg-white text-white dark:text-hampstead-black rounded whitespace-nowrap"
              >
                Copy link
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  );
}

