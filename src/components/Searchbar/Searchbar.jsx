import React, { useState } from 'react';

import styles from './styles.module.css';

export const Searchbar = ({ onSubmit }) => {
  const [value, setValue] = useState('');

  const handleQueryChange = event => {
    setValue(event.currentTarget.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(value);
    setValue('');
  };

  return (
    <header className={styles.searchbar}>
      <form className={styles['search-form']}>
        <button type="submit" className={styles.button} onClick={handleSubmit}>
          <span className={styles['button-label']}>Search</span>
        </button>

        <input
          className={styles['search-form-input']}
          value={value}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleQueryChange}
        />
      </form>
    </header>
  );
};
