'use client';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

const ImpressSection = ({ onClose }) => {
  const modalRef = useRef(null);

  // Schließe Modal bei Klick außerhalb
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  // Schließe Modal bei ESC-Taste
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const scrollAnimation = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
    exit: {
      opacity: 0,
      y: 50,
      transition: {
        duration: 0.4,
        ease: 'easeIn',
      },
    },
  };

  return (
    <motion.section
      id="impress"
      className="fixed inset-0 bg-[#0a1120]/95 backdrop-blur-lg z-50 flex items-center justify-center py-20"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={scrollAnimation}
    >
      <motion.div
        ref={modalRef}
        variants={scrollAnimation}
        className="max-w-4xl mx-auto px-4 relative bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-xl p-8 shadow-lg shadow-[#60a5fa]/10"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-[#60a5fa] transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <motion.h2
          variants={scrollAnimation}
          className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-[#60a5fa] to-[#3b82f6] bg-clip-text text-transparent"
        >
          Impressum
        </motion.h2>
        <div className="space-y-4 text-gray-300">
          <p>
            <strong>Name:</strong> Jan Feller<br />
            <strong>Anschrift:</strong> Königstraße 36<br />
            <strong>Stadt:</strong> 32584 Löhne<br />
            <strong>Land:</strong> Deutschland
          </p>
          <p>
            <strong>Kontakt:</strong><br />
            E-Mail: <a href="mailto:contact@shease.de" className="text-[#60a5fa] hover:underline">
              contact@shease.de
            </a>
          </p>
          <p>
            <strong>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:</strong><br />
            Jan Feller<br />
            Königstraße 36<br />
            32584 Löhne
          </p>
          <p>
            <strong>Haftungshinweis:</strong><br />
            Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte
            externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber
            verantwortlich.
          </p>
          <p>
            <strong>Streitbeilegung:</strong><br />
            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
            <a
              href="https://ec.europa.eu/consumers/odr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#60a5fa] hover:underline"
            >
              https://ec.europa.eu/consumers/odr
            </a>
            . Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
            Verbraucherschlichtungsstelle teilzunehmen.
          </p>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default ImpressSection;