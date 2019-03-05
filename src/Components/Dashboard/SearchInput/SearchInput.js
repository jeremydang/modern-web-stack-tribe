import React from 'react';
import styles from './SearchInput.module.css';

const SearchInput = onInputChange => {
  return (
    <div className={styles['section-search-box-wrapper']}>
      <input
        className={styles['search-input']}
        type="text"
        placeholder="Search"
        onChange={() => onInputChange}
      />
      <span className={styles['search-icon']} title="Search orders icon">
        Search orders icon
      </span>
    </div>
  );
};

export default SearchInput;
