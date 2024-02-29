import React, { useState, useEffect } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';

import { getImages } from '../api/pixabayApi';
import styles from './styles.module.css';
import 'react-toastify/dist/ReactToastify.min.css';

export const App = () => {
  const [images, setImages] = useState([]);
  const [totalHits, setTotalHits] = useState(0);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!query) return;
    const loadImages = async () => {
      try {
        const response = await getImages(query, page);
        const { images: newImages, totalHits } = response;
        if (newImages.length === 0) {
          toast.info('Unfortunately, there are no images on your request');
          return;
        }

        setImages(prevImages => [...prevImages, ...newImages]);
        setTotalHits(totalHits);
      } catch (error) {
        toast.error('Sorry, something went wrong. Try again');
      } finally {
        setIsLoading(false);
      }
    };
    loadImages();
  }, [query, page]);

  const handlerSearchSubmit = newQuery => {
    if (!newQuery || query === newQuery) return;
    setImages([]);
    setQuery(newQuery);
    setPage(1);
    setIsLoading(true);
  };

  const loadMoreImages = () => {
    setIsLoading(true);
    setPage(prevPage => prevPage + 1);
  };

  const renderLoadMoreBtn = () => {
    return (
      !!images.length &&
      images.length < totalHits &&
      !isLoading && <Button onClick={loadMoreImages} />
    );
  };

  return (
    <div className={styles.app}>
      <Searchbar onSubmit={handlerSearchSubmit} />
      <ImageGallery images={images} />
      <div className={styles['btn-wrap']}>
        <ThreeDots
          visible={isLoading}
          height="80"
          width="80"
          color="#ce3762"
          radius="9"
          ariaLabel="three-dots-loading"
        />
        {renderLoadMoreBtn()}
      </div>
      <ToastContainer />
    </div>
  );
};
