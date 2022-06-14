import React, {useEffect} from 'react';
import style from './ShopPage.module.scss'
import ProductList from '../../components/Product/ProductList';
import Filter from '../../components/Filter/Filter';
import {useAppDispatch, useAppSelector} from '../../store/store';
import {thunkGetAllProducts} from '../../store/product/thunks';
import {useParams} from 'react-router-dom';

const ShopPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const {limit, page, sorting, serverCount} = useAppSelector(state => state.product)

  // const params = useParams<Record<'page' | 'limit' | 'sorting', string>>()

  // const {page, limit, sorting} = {...params, limit: +(params.limit || 10), page: +(params.page || 1)}

  useEffect(() => {
    dispatch(thunkGetAllProducts({page, limit, sorting}))
  }, [])

  return (
    <div>
      <Filter page={page} limit={limit} sorting={sorting} serverCount={serverCount}/>
      <ProductList/>
    </div>
  );
};

export default ShopPage;