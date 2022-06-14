import React, {useState} from 'react';
import style from './AdminPanelPage.module.scss'
import ModalWindow from '../../components/ModalWindow/ModalWindow';


const AdminPanelPage = () => {
  const [isShowModal, setIsShowModal] = useState(false);


  return (
    <div className={style.admin_panel}>
      <div>
        <h2>Товары</h2>
        <button onClick={() => setIsShowModal(!isShowModal)}>Клик</button>
      </div>
      <div>
        <h2>Категории</h2>
      </div>
      <div>
        <h2>Бренды</h2>
      </div>
      <div>
        <h2>Сотрудники</h2>
      </div>
      {
        isShowModal && <ModalWindow closeHandler={setIsShowModal.bind(null, false)}>
            123123
          </ModalWindow>
      }
    </div>
  );
};

export default AdminPanelPage;