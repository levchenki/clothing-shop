import React, {useState} from 'react';
import style from './AdminPanelPage.module.scss'
import ModalWindow from '../../components/ModalWindows/ModalWindow';
import ProductsModalWindow from '../../components/ModalWindows/ProductsModalWindow';
import CategoriesModalWindow from '../../components/ModalWindows/CategoriesModalWindow';
import BrandsModalWindow from '../../components/ModalWindows/BrandsModalWindow';
import EmployeeModalWindow from '../../components/ModalWindows/EmployeeModalWindow';


const AdminPanelPage = () => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(0);

  enum editing {
    product = 1,
    brand,
    category,
    employee
  }

  return (
    <div className={style.admin_panel}>
      <div>
        <h2>Товары</h2>
        <button onClick={() => {
          setIsEditing(editing.product)
          setIsShowModal(true)
        }}>Изменить</button>
      </div>
      <div>
        <h2>Бренды</h2>
        <button onClick={() => {
          setIsEditing(editing.brand)
          setIsShowModal(true)
        }}>Изменить</button>
      </div>
      <div>
        <h2>Категории</h2>
        <button onClick={() => {
          setIsEditing(editing.category)
          setIsShowModal(true)
        }}>Изменить</button>
      </div>
      <div>
        <h2>Сотрудники</h2>
        <button onClick={() => {
          setIsEditing(editing.employee)
          setIsShowModal(true)
        }}>Изменить</button>
      </div>
      {
        isShowModal && <ModalWindow closeHandler={setIsShowModal.bind(null, false)}>
          {
            isEditing === 1 && <ProductsModalWindow/>
          }
          {
            isEditing === 2 && <BrandsModalWindow/>
          }
          {
            isEditing === 3 && <CategoriesModalWindow/>
          }
          {
            isEditing === 4 && <EmployeeModalWindow/>
          }
          </ModalWindow>
      }
    </div>
  );
};

export default AdminPanelPage;