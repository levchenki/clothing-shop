import React, {useEffect, useState} from 'react';
import style from './ProductPage.module.scss'
import {deleteOneProduct, getOneProduct, getProducts} from '../../http/productAPI';
import {useNavigate, useParams} from 'react-router';
import {observer} from 'mobx-react-lite';
import {PRODUCT_ROUTE, SHOP_ROUTE} from '../../utils/consts';
import UpdateProductWindow from '../../components/ModalWindow/UpdateProductWindow';

const ProductPage = observer(() => {
  const [product, setProduct] = useState({});
  const [isChanged, setIsChanged] = useState(false);

  const navigate = useNavigate();
  const {id} = useParams()

  useEffect(() => {
    console.log(id)
    getOneProduct(id).then(data => setProduct(data))
  }, [])

  const deleteProduct = () => {
    deleteOneProduct(id);
    navigate(PRODUCT_ROUTE);
  }

  return (
      <div className={style.product_page}>
        <img width={500} height={500} src={process.env.REACT_APP_API_URL + product.picture_url} alt='picture'/>
        <div>
          <h2>{product.name}</h2>
          <h3>{product.brand_name}</h3>
          <h3>{product.category_name}</h3>
          <h3>{product.price} $</h3>
          <div>
            <button>В корзину</button>
            <button onClick={()=>setIsChanged(!isChanged)}>{!isChanged ? 'Изменить' : 'Закрыть' }</button>
            <button className={style.button_delete} onClick={() => deleteProduct()}>Удалить</button>
          </div>

        </div>
        {
          isChanged && <UpdateProductWindow productData={product}/>
        }
      </div>
  );
});

export default ProductPage;