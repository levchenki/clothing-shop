import React, {useEffect, useState} from 'react';
import style from './ProductPage.module.scss'
import {useParams} from 'react-router-dom';
import {TGetOneCountProduct} from '../../types';
import {api} from '../../API/api';

const ProductPage = () => {
  const id = +(useParams<{ id: string }>().id ?? 0)
  const [product, setProduct] = useState<TGetOneCountProduct>();
  const REACT_API_BASE_URL = 'http://localhost:5000'

  useEffect(() => {
    api.product.getOne(id).then(({data}) => setProduct(data));
  }, [])

  return (
    <div className={style.product_page}>
      {
        product && <>
            <div>
              <img width={500} height={500}
                   src={product.query.picture_url ? `${REACT_API_BASE_URL}/${product.query.picture_url}` : 'https://placekitten.com/g/600/600'}
                   alt='smth pic'/>
            </div>
            <div>
              <div>
                <h2>{product.query.name}</h2>
                <h3>{product.query.brand_name}</h3>
                <h3>{product.query.category_name}</h3>
                <h3>{product.query.price}$</h3>
              </div>
              <div>
                {
                  product.sizes.length
                  ? <>
                    Размеры:&nbsp;
                    {
                      product.sizes.map(item =>
                        <p>{item.size},{item.count}</p>)
                    }
                    </>
                  : 'Товара нет в наличии'
                }
              </div>
              <div>
                {
                //  TODO: Сделать изменение и удаление товаров
                }
                <button>Изменить</button>
                <button>Удалить</button>
              </div>
            </div>
          </>
      }
    </div>
  );
};

export default ProductPage;