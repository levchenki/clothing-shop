import React, {useEffect, useState} from 'react'
import {TBrand} from '../../types';
import {api} from '../../API/api';
import style from './ModalWindow.module.scss';

const BrandsModalWindow: React.FC = () => {
  const [editId, setEditId] = useState<number | undefined>();
  const [isAdd, setIsAdd] = useState(false);
  const [brands, setBrands] = useState<TBrand[]>();
  const [brandObject, setBrandObject] = useState<TBrand>();
  const [newName, setNewName] = useState('');
  const [newCountry, setNewCountry] = useState('');
  const [newDate, setNewDate] = useState<string | Date>();


  // post
  const addItem = () => {
    if (!newDate) return;
    const formData = new FormData()
    formData.append('name', newName)
    formData.append('country', newCountry)
    formData.append('year_of_creation', newDate.toString())

    api.brand.addOne(formData).then(()=>{
      api.brand.getAll().then(({data}) => setBrands(data))
      alert('Бренд успешно добавлен!')
    })
  }
  // delete
  const removeItem = (id: number) => {
    api.brand.removeOne(id).then(() => {
      api.brand.getAll().then(({data}) => setBrands(data))
      alert('Данные удалены!')
    })
  }
  // put
  const updateItem = (id: number | undefined) => {
    const formData = new FormData()
    if (!editId) return;
    if (!brandObject) return;
    formData.append('id_brand', editId.toString())
    formData.append('name', brandObject.name)
    formData.append('country', brandObject.country)
    formData.append('year_of_creation', brandObject.year_of_creation.toString())

    api.brand.updateOne(formData).then(() => {
      api.brand.getAll().then(({data})=>setBrands(data))
      alert('Данные изменены!')
    })
    setEditId(undefined)
  }

  useEffect(() => {
    api.brand.getAll().then(({data}) => setBrands(data))
  }, [])

  if (editId && brandObject) {
    return (
      <div className={style.edit_data}>
        <input type='text' value={brandObject.name}
               onChange={event => setBrandObject({...brandObject, name: event.currentTarget.value})}/>
        <input type='text' value={brandObject.country}
               onChange={event => setBrandObject({...brandObject, country: event.currentTarget.value})}/>
        <input type='date'
               onChange={event => setBrandObject({...brandObject, year_of_creation: event.currentTarget.value})}/>
        <button onClick={() => updateItem(editId)}>Сохранить</button>
        <button onClick={() => setEditId(undefined)}>Отмена</button>
      </div>
    )
  } else if (isAdd) {
    return (
      <div className={style.edit_data}>
        <input type='text' value={newName}
               onChange={event => setNewName(event.currentTarget.value)}/>
        <input type='text' value={newCountry}
               onChange={event => setNewCountry(event.currentTarget.value)}/>
        <input type='date'
               onChange={event => setNewDate(event.currentTarget.value)}/>
        <button onClick={() => addItem()}>Сохранить</button>
        <button onClick={() => setIsAdd(false)}>Отмена</button>
      </div>
    )
  } else {
    return (
      <>
        <ul>
          {
            brands?.map(brand =>
              <li key={brand.id_brand}>
              <span style={{fontWeight: 'bold'}}>
                {brand.name},&nbsp;
              </span>
                {brand.country},&nbsp;
                {brand.year_of_creation.toString()},&nbsp;
                <span className={style.edit_item}
                      onClick={() => {
                        setEditId(brand.id_brand)
                        api.brand.getOne(brand.id_brand).then(({data}) => setBrandObject(data as unknown as TBrand))
                        console.log(brandObject)
                      }}>edit</span>&nbsp;
                <span className={style.remove_item}
                      onClick={() => removeItem(brand.id_brand)}>&times;</span>
              </li>)
          }
        </ul>
        <button className={style.add_item} onClick={() => {
          setIsAdd(true)
        }}>Добавить
        </button>
      </>
    )
  }
}

export default BrandsModalWindow