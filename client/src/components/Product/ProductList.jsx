import React, {useContext} from 'react';
import {Context} from '../../index';
import ProductItem from './ProductItem';
import './Product.scss';

const ProductList = () => {
  const {product} = useContext(Context);

  return (
      <div className='products_list'>
        {product.products.map(product =>
            <ProductItem key={product.id_product} product={product}/>
        )}
      </div>
  );
};

export default ProductList;