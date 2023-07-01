import { useEffect } from 'react';
import './Modal.scss';
import PropTypes from 'prop-types';

export const Modal = ({ isHidden, dataFormModal, closeModal }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleCloseModal);

    return () => window.removeEventListener('keydown', handleCloseModal);
  });

  const handleCloseModal = ({ code, currentTarget, target }) => {
    if (currentTarget === target) {
      closeModal();
    } else if (code === 'Escape') {
      closeModal();
    }
  };

  return (
    <>
      {isHidden && (
        <div className="overlay" onClick={handleCloseModal}>
          <div className="modal">
            <img src={dataFormModal.url} alt={dataFormModal.tags} />
          </div>
        </div>
      )}
    </>
  );
};

Modal.propTypes = {
  isHidden: PropTypes.bool.isRequired,
  dataFormModal: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired,
};
