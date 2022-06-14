import React, {ReactNode} from 'react'
import style from './ModalWindow.module.scss'

type ModalWindowProps = {
  closeHandler: () => void,
  children: ReactNode
}

const ModalWindow: React.FC<ModalWindowProps> = ({closeHandler, children}) => {
  return (
    <div className={style.modal_bg} onClick={closeHandler}>
      <div className={style.modal_window} onClick={event => event.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

export default ModalWindow