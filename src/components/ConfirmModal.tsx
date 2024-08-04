import React from 'react';
import Modal from 'react-modal';

interface ConfirmModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onConfirm: () => void;
  message: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen, onRequestClose, onConfirm, message }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="fixed inset-0 flex items-center justify-center"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      ariaHideApp={false}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">{message}</h2>
        <div className="flex justify-end space-x-4">
          <button onClick={onRequestClose} className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">Cancel</button>
          <button onClick={onConfirm} className="px-4 py-2 bg-gray-300 text-red-600 rounded hover:bg-red-600 hover:text-white ">Delete</button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
