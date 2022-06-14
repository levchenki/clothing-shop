import React, {useEffect} from 'react'
import style from './Product.module.scss'
import {useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../store/store';
import {thunkGetAllProducts} from '../../store/product/thunks';
import ProductItem from './ProductItem';

const ProductList: React.FC = () => {

  const {list} = useAppSelector(state => state.product)

  // useEffect(() => {
  //   dispatch(thunkGetAllProducts({page, limit, sorting}))
  // }, [])

  return (
    <div className={style.product_list}>
      {
        list.map(item =>
          <ProductItem id_product={item.id_product} name={item.name} price={item.price} brandName={item.brand_name}
                       categoryName={item.category_name} img={item.picture_url} key={item.id_product}/>)
      }
    </div>)
}

export default ProductList