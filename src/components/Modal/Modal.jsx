import React, { useEffect } from 'react';

import styles from './styles.module.css';

export const Modal = ({ src, tags, closeModal }) => {
  useEffect(() => {
    const closeModalByEsc = event => {
      if (event.code === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', closeModalByEsc);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', closeModalByEsc);
      document.body.style.overflow = 'auto';
    };
  }, [closeModal]);

  const handlerCloseModal = event => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className={styles.overlay} onClick={handlerCloseModal}>
      <div className={styles.modal}>
        <img src={src} alt={tags} />
      </div>
    </div>
  );
};
