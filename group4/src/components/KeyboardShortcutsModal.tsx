import React from 'react';
import { X, Keyboard } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const KeyboardShortcutsModal: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const shortcuts = [
    { key: '→ / Space / PgDn', action: 'Advance to next slide' },
    { key: '← / PgUp', action: 'Return to previous slide' },
    { key: 'F / F5', action: 'Toggle Fullscreen Slide Show mode' },
    { key: 'N', action: 'Open Dual-Screen Presenter Console' },
    { key: 'L', action: 'Toggle Red Glowing Laser Pointer' },
    { key: 'G', action: 'Open Slide Grid Index / Sorter' },
    { key: 'B', action: 'Blackout Screen (Capture room attention)' },
    { key: 'E', action: 'Open Slide Deck Content Editor' },
    { key: 'Esc', action: 'Exit Fullscreen / Dismiss active modal' },
    { key: '?', action: 'Open this Keyboard Shortcuts cheat sheet' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-6 font-sans">
      <div className="bg-stone-900 border border-stone-800 rounded-2xl w-full max-w-lg p-6 shadow-2xl space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-stone-800">
          <div className="flex items-center gap-2">
            <Keyboard className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-bold text-white">Presentation Keyboard Shortcuts</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
          {shortcuts.map((sc, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-2.5 rounded-lg bg-stone-950/70 border border-stone-800 text-xs"
            >
              <span className="text-stone-300">{sc.action}</span>
              <kbd className="px-2 py-1 bg-stone-800 border border-stone-700 rounded font-mono font-semibold text-amber-400">
                {sc.key}
              </kbd>
            </div>
          ))}
        </div>

        <div className="pt-3 border-t border-stone-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold rounded-lg text-xs transition-colors cursor-pointer"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
