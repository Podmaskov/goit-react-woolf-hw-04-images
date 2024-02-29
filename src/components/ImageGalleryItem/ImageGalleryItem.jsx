import React, { useState } from 'react';

import { Modal } from '../Modal/Modal';

import styles from './styles.module.css';

export const ImageGalleryItem = ({ smallImgSrc, largeImgSrc, tags }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <li
        className={styles['gallery-item']}
        onClick={() => setIsModalOpen(true)}
      >
        <img className={styles.image} src={smallImgSrc} alt={tags} />
      </li>
      {isModalOpen && (
        <Modal src={largeImgSrc} tags={tags} closeModal={closeModal} />
      )}
    </>
  );
};
