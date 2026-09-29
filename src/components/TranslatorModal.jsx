import React from 'react';
import LanguageTranslatorPage from './LanguageTranslatorPage';

export default function TranslatorModal({ isOpen, onClose }) {
  if (!isOpen) return null;
  return <LanguageTranslatorPage isModal={true} onClose={onClose} />;
}
