import css from './Modal.module.css'
import ReactDOM from 'react-dom';

const Modal = ({ onClose, onDelete }) => {
  const portalRoot = document.getElementById('portal-root');

  if (!portalRoot) {
    console.error('Portal root not found');

    return null;
  }

  return ReactDOM.createPortal (
    <div className={css.modal}>
      <button className={css.btnClose} onClick={onClose}>X</button>
      <div className={css.content}>
        <h3 className={css.modalTitle}>Delete contact?</h3>
        <div className={css.contentBox}>
          <button className={css.btn} type='button' onClick={onDelete}>Yes</button>
          <button className={css.btn} type='button' onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>,
    portalRoot,
  );
}

export default Modal;