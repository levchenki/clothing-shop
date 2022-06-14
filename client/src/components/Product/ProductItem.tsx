import React from 'react'
import {TProductItem} from '../../types';
import style from './Product.module.scss'
import {useNavigate} from 'react-router-dom';
import {PRODUCT_ROUTE} from '../../routes/routes';

const ProductItem: React.FC<TProductItem> = ({id_product, name, price, img, brandName, categoryName}) => {
  const BASE_URL = 'http://localhost:5000/'
  const navigate = useNavigate()

  return (
    <div className={style.product_item} onClick={() => navigate(`${PRODUCT_ROUTE}/${id_product}`)}>
      <img width={1600} height={1600} src={`${BASE_URL}/${img}`} alt='smth pic'/>
      <div>
        <p>{name}<span>{price}$</span></p>
        <div>
          <p>{brandName}</p>
          <p>{categoryName}</p>
        </div>
      </div>
    </div>)
}

export default ProductItem