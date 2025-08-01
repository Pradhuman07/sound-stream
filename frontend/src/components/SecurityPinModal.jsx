import React, { useState, useEffect, useRef } from 'react';

const SecurityPinModal = ({ isOpen, onClose, onConfirm }) => {
  const [pin, setPin] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm(pin);
    setPin('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 modal-overlay-bg bg-opacity-50 dark:bg-opacity-70 flex items-center justify-center z-50">
      <div className="theme-bg-secondary p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
        <h2 className="text-xl font-semibold mb-4 theme-text-primary">Security Check</h2>
        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="password"
            placeholder="Enter security pin"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="w-full p-3 theme-bg-tertiary theme-text-primary placeholder-gray-500 rounded-md outline-none mb-4"
            required
          />
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 p-3 theme-text-secondary theme-bg-tertiary rounded-md hover:opacity-80"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 p-3 text-white bg-indigo-400 rounded-md hover:bg-indigo-500"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SecurityPinModal;
