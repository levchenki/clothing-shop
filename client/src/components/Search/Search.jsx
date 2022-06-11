import React from 'react';
import style from './Search.module.scss';

const Search = () => {
  return (
      <div className={style.search}>
        <input type='text' name='' id='' placeholder={'Поиск'}/>
        <button>Поиск</button>
      </div>
  );
};

export default Search;