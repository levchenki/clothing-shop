import React, {useEffect, useState} from 'react'
import {useAppDispatch, useAppSelector} from '../../store/store';
import {thunkGetAllProducts} from '../../store/product/thunks';
import Filter from '../Filter/Filter';
import {api} from '../../API/api';
import style from './ModalWindow.module.scss'
import {TBrand, TCategory, TGetOneProduct} from '../../types';

const ProductsModalWindow: React.FC = () => {
  const [isAdd, setIsAdd] = useState(false);
  const [editID, setEditId] = useState<number | undefined>();
  const [brands, setBrands] = useState<TBrand[]>();
  const [categories, setCategories] = useState<TCategory[]>();

  const [productObject, setProductObject] = useState<TGetOneProduct>();

  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState<number>(0);
  const [newBrandId, setNewBrandId] = useState(1);
  const [newCategoryId, setNewCategoryId] = useState(1);

  const [file, setFile] = useState<File>();

  const dispatch = useAppDispatch();
  const {list, page, limit, serverCount, sorting} = useAppSelector(state => state.product)

  // TODO: Что-то сделать с этим...
  // const commitData = () => {
  //   const formData = new FormData()
  //   if (!editID) return;
  //   if (!productObject) return;
  //   if (!file) return;
  //   formData.append('id_product', editID.toString())
  //   formData.append('name', productObject.name)
  //   formData.append('price', productObject.price.toString())
  //   formData.append('picture_url', file)
  //   formData.append('id_brand', productObject.id_brand.toString())
  //   formData.append('id_category', productObject.id_category.toString())
  //
  //   return formData
  // }

  // post
  const addItem = () => {
    const formData = new FormData()
    if (!file) return;
    formData.append('name', newName)
    formData.append('price', newPrice.toString())
    formData.append('picture_url', file)
    formData.append('id_brand', newBrandId.toString())
    formData.append('id_category', newCategoryId.toString())

    api.product.addOne(formData).then(() => {
      dispatch(thunkGetAllProducts({page, limit, sorting}))
      alert('Товар успешно добавлен!')
    })
    setIsAdd(false);
  }

  // delete
  const removeItem = (id: number) => {
    api.product.removeOne(id).then(() => {
      dispatch(thunkGetAllProducts({page, limit, sorting}))
      alert('Данные удалены!')
    })
  }

  // put
  const updateItem = (id: number | undefined) => {
    setEditId(id)
    const formData = new FormData()
    if (!editID) return;
    if (!productObject) return;
    if (!file) return;
    formData.append('id_product', editID.toString())
    formData.append('name', productObject.name)
    formData.append('price', productObject.price.toString())
    formData.append('picture_url', file)
    formData.append('id_brand', productObject.id_brand.toString())
    formData.append('id_category', productObject.id_category.toString())
    if (!formData) return;
    api.product.updateOne(formData).then(() => {
      dispatch(thunkGetAllProducts({page, limit, sorting}))
      alert('Данные изменены')
    })
    setEditId(undefined)
  }

  useEffect(() => {
    dispatch(thunkGetAllProducts({page, limit, sorting}))
    api.brand.getAll().then(({data}) => setBrands(data))
    api.category.getAll().then(({data}) => setCategories(data))
  }, [])

  if (editID && productObject) {
    return (
      <div className={style.edit_data}>
        <input type='text' value={productObject.name}
               onChange={event => setProductObject({...productObject, name: event.currentTarget.value})}/>
        <input type='number' value={productObject.price}
               onChange={event => setProductObject({...productObject, price: +event.currentTarget.value})}/>
        <input type='file' onChange={event => {
          if (!event.currentTarget.files) return
          setFile(event.currentTarget.files[0])
        }}/>
        <label htmlFor='brands'>Бренд</label>
        <select name='brands' value={productObject.id_brand}
                onChange={event => setProductObject({...productObject, id_brand: +event.currentTarget.value})}>
          {
            brands && brands.map(brand =>
              <option key={brand.id_brand} value={brand.id_brand}>{brand.name}</option>)
          }
        </select>
        <label htmlFor='categories'>Категория</label>
        <select name='categories' value={productObject.id_category} onChange={event => setProductObject({
          ...productObject,
          id_category: +event.currentTarget.value
        })}>
          {
            categories && categories.map(category =>
              <option key={category.id_category} value={category.id_category}>{category.name}</option>)
          }
        </select>
        <button onClick={() => updateItem(editID)}>Сохранить</button>
        <button onClick={() => setEditId(undefined)}>Отмена</button>
      </div>
    )
  } else if (isAdd) {
    return (
      <div className={style.edit_data}>
        <input type='text' value={newName}
               onChange={event => setNewName(event.currentTarget.value)}/>
        <input type='number' value={newPrice}
               onChange={event => setNewPrice(+event.currentTarget.value)}/>
        <input type='file' onChange={event => {
          if (!event.currentTarget.files) return
          setFile(event.currentTarget.files[0])
        }}/>
        <label htmlFor='brands'>Бренд</label>
        <select name='brands' value={newBrandId}
                onChange={event => setNewBrandId(+event.currentTarget.value)}>
          {
            brands && brands.map(brand =>
              <option key={brand.id_brand} value={brand.id_brand}>{brand.name}</option>)
          }
        </select>
        <label htmlFor='categories'>Категория</label>
        <select name='categories' value={newCategoryId}
                onChange={event => setNewCategoryId(+event.currentTarget.value)}>
          {
            categories && categories.map(category =>
              <option key={category.id_category} value={category.id_category}>{category.name}</option>)
          }
        </select>
        <button onClick={() => addItem()}>Добавить</button>
        <button onClick={() => setIsAdd(false)}>Отмена</button>
      </div>
    )
  } else {
    return (
      <>
        <Filter page={page} limit={limit} serverCount={serverCount} sorting={sorting}/>
        <ul>
          {list.map(product =>
            <li key={product.id_product}>
            <span style={{fontWeight: 'bold'}}>
              {product.name},&nbsp;
            </span>
              {product.price}$,&nbsp;
              {product.brand_name},&nbsp;
              {product.category_name}&nbsp;&nbsp;&nbsp;
              <span className={style.edit_item}
                    onClick={() => {
                      setEditId(product.id_product)
                      api.product.getOne(product.id_product).then(({data}) => setProductObject(data.query as unknown as TGetOneProduct))
                    }}>edit</span>&nbsp;
              <span className={style.remove_item}
                    onClick={() => removeItem(product.id_product)}>&times;</span>
            </li>)}
        </ul>
        <button className={style.add_item} onClick={() => {
          setIsAdd(true)
        }}>Добавить
        </button>
      </>
    )
  }
}

export default ProductsModalWindow