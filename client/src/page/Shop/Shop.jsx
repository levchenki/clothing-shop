import React, {useContext, useEffect} from 'react';
import style from './Shop.module.scss';
import Search from '../../components/Search/Search';
import {Context} from '../../index';
import {observer} from 'mobx-react-lite';
import ProductList from '../../components/Product/ProductList';
import {getBrands, getCategories, getProducts} from '../../http/productAPI';

const Shop = observer(() => {
  const {product} = useContext(Context)

  useEffect(() => {
    getCategories().then(data => product.setCategories(data))
    getBrands().then(data => product.setBrands(data))
    getProducts().then(data => product.setProducts(data.query))
  }, [])

  return (
      <>
        <div className={style.shop_header}>
          <label htmlFor='brand'>Бренд: </label>
          <select name='brand'>
            <option value={0}>Все бренды</option>
            {product.brands.map(brand =>
                <option value={brand.id_brand}
                        key={brand.id_brand}
                        onClick={() => product.setSelectedBrand(brand)}
                >{brand.name}</option>)}
          </select>

          <label htmlFor='category'>Категория: </label>
          <select name='category'>
            <option value={0}
                    onClick={() => product.setSelectedCategory({})}
            >Все категории
            </option>
            {product.categories.map(category =>
                <option value={category.id_category}
                        key={category.id_category}
                        onClick={() => product.setSelectedCategory(category)}
                >{category.name}</option>)}
          </select>
          <Search/>
        </div>
        <ProductList/>
      </>
  );
});

export default Shop;