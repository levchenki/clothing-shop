import React, {useEffect, useState} from 'react'
import {TCategory} from '../../types';
import style from './ModalWindow.module.scss';
import {api} from '../../API/api';

const CategoriesModalWindow: React.FC = () => {
  const [editId, setEditId] = useState<number | undefined>();
  const [isAdd, setIsAdd] = useState(false);
  const [categories, setCategories] = useState<TCategory[]>();
  const [categoryObject, setCategoryObject] = useState<TCategory>();
  const [newName, setNewName] = useState('');

  // post
  const addItem = () => {
    const formData = new FormData()
    formData.append('name', newName)
    api.category.addOne(formData).then(() => {
      api.category.getAll().then(({data}) => setCategories(data))
      alert('Категория успешно добавлена!')
    })
    setIsAdd(false)
  }
  // delete
  const removeItem = (id: number) => {
    api.category.removeOne(id).then(() => {
      api.category.getAll().then(({data}) => setCategories(data))
      alert('Данные удалены!')
    })
  }
  //put
  const updateItem = (id: number) => {
    const formData = new FormData()
    if (!editId) return;
    if (!categoryObject) return;
    formData.append('id_category', editId.toString())
    formData.append('name', categoryObject.name.toString())
    api.category.updateOne(formData).then(() => {
      api.category.getAll().then(({data}) => setCategories(data))
      alert('Данные изменены!')
    })
    setEditId(undefined)
  }

  useEffect(() => {
    api.category.getAll().then(({data}) => setCategories(data))
  }, [])

  if (editId && categoryObject) {
    return (
      <div className={style.edit_data}>
        <input type='text' value={categoryObject.name}
               onChange={event => setCategoryObject({...categoryObject, name: event.currentTarget.value})}/>
        <button onClick={() => updateItem(editId)}>Сохранить</button>
        <button onClick={() => setEditId(undefined)}>Отмена</button>
      </div>
    )
  } else if (isAdd) {
    return (
      <div className={style.edit_data}>
        <input type='text' value={newName}
               onChange={event => setNewName(event.currentTarget.value)}/>
        <button onClick={() => addItem()}>Сохранить</button>
        <button onClick={() => setIsAdd(false)}>Отмена</button>
      </div>
    )
  } else {
    return (
      <>
        <ul>
          {
            categories?.map(category =>
              <li key={category.id_category}>
              <span style={{fontWeight: 'bold'}}>
                {category.name},&nbsp;
              </span>
                <span className={style.edit_item}
                      onClick={() => {
                        setEditId(category.id_category)
                        api.category.getOne(category.id_category).then(({data}) => setCategoryObject(data as unknown as TCategory))
                        console.log(category)
                      }}>edit
                </span>&nbsp;
                <span className={style.remove_item}
                      onClick={() => removeItem(category.id_category)}>&times;</span>
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


export default CategoriesModalWindow