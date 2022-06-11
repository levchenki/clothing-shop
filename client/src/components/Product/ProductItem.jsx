import React, {useContext} from 'react';
import './Product.scss';
import {useNavigate} from 'react-router';
import {PRODUCT_ROUTE} from '../../utils/consts';

const ProductItem = ({product}) => {
  const navigate = useNavigate()
  return (
      <div className={'product'} onClick={() => navigate(PRODUCT_ROUTE + '/' + product.id_product)}>
        <img width={1600} height={1600} src={process.env.REACT_APP_API_URL + product.picture_url} alt='picture'/>
        <div>
          <p className={'product_title'}>{product.name}</p>
          <p>{product.price}</p>
        </div>
      </div>
  );
};

export default ProductItem;