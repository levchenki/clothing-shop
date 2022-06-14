import React, {useEffect, useState} from 'react'
import style from './Filter.module.scss'
import {TBrand, TCategory, TSorting} from '../../types';
import {useAppDispatch} from '../../store/store';
import {thunkGetAllProducts} from '../../store/product/thunks';
import {api} from '../../API/api';
import {logDOM} from '@testing-library/react';

type TFilter = {
  page: number,
  limit: number,
  serverCount: number,
  sorting: TSorting
}

const Filter: React.FC<TFilter> = ({page, limit, sorting, serverCount}) => {
  const [brands, setBrands] = useState<TBrand[]>();
  const [categories, setCategories] = useState<TCategory[]>();

  const dispatch = useAppDispatch();
  const lastPage = Math.ceil(serverCount / limit)

  const filterHandler = ({page: p, limit: l, sorting: s}: Partial<TFilter>) => {
    p ??= page
    l ??= limit
    s ??= sorting
    p < 1 && (p = 1)
    p > lastPage && (p = lastPage)
    dispatch(thunkGetAllProducts({page: p, limit: l, sorting: s}))
  }

  useEffect(() => {
    api.category.getAll().then(({data}) => setCategories(data))
    api.brand.getAll().then(({data}) => setBrands(data))
  }, [])

  return (<div className={style.filter}>
    <div>
      <select>
        {brands?.map(brand =>
          <option key={brand.id_brand} value={brand.id_brand}>{brand.name}</option>)}
      </select>
      <select>
        {categories?.map(category =>
          <option key={category.id_category} value={category.id_category}>{category.name}</option>)}
      </select> &nbsp;
      <label htmlFor='sorting'>Сортировка&nbsp;</label>
      <select name='sorting' onChange={(event) => filterHandler({sorting: event.currentTarget.value as TSorting})}>
        <option value='name'>По названию</option>
        <option value='brand'>По бренду</option>
        <option value='category'>По категории</option>
      </select>
    </div>

    <div>
      Страница:&nbsp;
      {
        <input style={{width: '2rem'}} type='number' value={page}
               onChange={event => filterHandler({page: +event.currentTarget.value})}/>
      }
      из&nbsp;
      {lastPage}
    </div>

  </div>)
}

export default Filter