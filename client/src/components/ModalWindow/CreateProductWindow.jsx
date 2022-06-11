import React, {useContext, useEffect, useState} from 'react';
import './ModalWindow.scss'
import {observer} from 'mobx-react-lite';
import {Context} from '../../index';
import {
  createOneProduct,
  deleteOneProduct,
  getBrands,
  getCategories,
  getProducts,
  updateOneProduct
} from '../../http/productAPI';

const CreateProductWindow = observer(() => {
  const {product} = useContext(Context);

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [picture_url, setPicture_url] = useState(null);
  const [id_brand, setId_brand] = useState(1);
  const [id_category, setId_category] = useState(1);

  const selectFile = (event) => {
    setPicture_url(event.target.files[0])
  }



  const createProduct = () => {
    const formData = new FormData();
    formData.append('name', name)
    formData.append('price', `${price}`)
    formData.append('picture_url', picture_url)
    formData.append('id_brand', `${id_brand}`)
    formData.append('id_category', `${id_category}`)
    createOneProduct(formData)
  }

  useEffect(() => {
    getCategories().then(data => product.setCategories(data))
    getBrands().then(data => product.setBrands(data))
  }, [])


  return (
      <div className={'create_product'}>
        <input type='text' value={name} onChange={event => setName(event.target.value)}/>
        <input type='text' value={price} onChange={event => setPrice(+event.target.value)}/>
        <input type='file' onChange={selectFile}/>
        <div className={'selection'}>
          <label htmlFor='brand'>Бренд</label>
          <select name='brand'
                  value={id_brand}
                  onChange={event => setId_brand(event.target.value)}>
            {product.brands.map(brand =>
                <option value={brand.id_brand}
                        key={brand.id_brand}
                        onClick={() => product.setSelectedBrand(brand)}
                >{brand.name}</option>)}
          </select>
        </div>
        <div className={'selection'}>
          <label htmlFor='category'>Категория</label>
          <select name='category'
                  value={id_category}
                  onChange={event => setId_category(event.target.value)}>
            {product.categories.map(category =>
                <option value={category.id_category}
                        key={category.id_category}
                        onClick={() => product.setSelectedBrand(category)}
                >{category.name}</option>)}
          </select>
        </div>
        <button style={{backgroundColor: 'green', color: 'white', width: '10%'}}
                onClick={() => {
                  console.log(name);
                  console.log(price);
                  console.log('Тип price ' + typeof price);

                  console.log(picture_url)

                  console.log(id_brand);
                  console.log('Тип id_brand ' + typeof id_brand);
                  console.log(id_category);
                  console.log('Тип id_category ' + typeof id_category);

                  createProduct()
                }}>Ок
        </button>
      </div>
  );
});

export default CreateProductWindow;