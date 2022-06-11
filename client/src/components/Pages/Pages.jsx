import React, {useContext} from 'react';
import {observer} from 'mobx-react-lite';
import {Context} from '../../index';
import style from './Pages.module.scss'

const Pages = observer(() => {
  const product = useContext(Context);
  const pageCount = Math.ceil(product.totalCount / product.limit);
  let pages = [];

  for (let i = 0; i < pageCount; i++) {
    pages.push(i + 1);
  }

  return (
      <div className={style.pages}>
        {pages.map(page =>
            <span key={page}
                  className={product.page === page ? `${style.active}` : ''}
                  onClick={()=> product.setPage(page)}
            >{page} </span>)}
      </div>
  );
});

export default Pages;

