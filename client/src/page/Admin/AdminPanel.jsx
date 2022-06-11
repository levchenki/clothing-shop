import React, {useState} from 'react';
import style from './AdminPanel.module.scss';
import CreateProductWindow from '../../components/ModalWindow/CreateProductWindow';


// TODO: Сделать что-то....
const AdminPanel = () => {
  const [isCreateProduct, setIsCreateProduct] = useState(false);
  return (<div className={style.admin_panel}>
        <div>
          <h2>
            Категории
          </h2>
          <button className={'category_change'}>Изменить</button>
          <button className={'category_add'}>Добавить</button>
          <button className={`category_delete ${style.button_delete}`}>Удалить</button>
        </div>
        <div>
          <h2>
            Бренды
          </h2>
          <button className={'brand_change'}>Изменить</button>
          <button className={'brand_add'}>Добавить</button>
          <button className={`brand_delete ${style.button_delete}`}>Удалить</button>
        </div>
        <div>
          <h2>
            Товары
          </h2>
          <button className={'product_change'}>Изменить</button>
          <button onClick={() => setIsCreateProduct(!isCreateProduct)}
                  className={'product_add'}>{!isCreateProduct ? 'Добавить' : 'Отмена'}</button>
          <button className={`product_delete ${style.button_delete}`}>Удалить</button>

        </div>
        {
            isCreateProduct && <CreateProductWindow/>
        }
      </div>
  );
};

export default AdminPanel;