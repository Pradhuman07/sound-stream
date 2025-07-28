import React, { useState } from 'react';

const SecurityPinModal = ({ isOpen, onClose, onConfirm }) => {
  const [pin, setPin] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm(pin);
    setPin('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-200 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Security Check</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Enter security pin"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="w-full p-3 bg-gray-100 rounded-md outline-none mb-4"
            required
          />
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 p-3 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 p-3 text-white bg-indigo-300 rounded-md hover:bg-gray-900"
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
