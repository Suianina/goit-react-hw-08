import css from './Contact.module.css';
import { FaUser } from 'react-icons/fa';
import { FaPhoneAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contactsOps';

const Contact = ({ contact }) => {
  const { id, name, number } = contact;
  const dispatch = useDispatch();

  const removeContact = () => dispatch(deleteContact(id));

  return (
    <div className={css.box}>
      <ul className={css.list}>
        <li className={css.item}>
          <FaUser className={css.icon} />
          <p className={css.text}>{name}</p>
        </li>
        <li className={css.item}>
          <FaPhoneAlt className={css.icon} />
          <p className={css.text}>{number}</p>
        </li>
      </ul>
      <button type='button' className={css.btn} onClick={removeContact}>Delete</button>
    </div>
  );
}

export default Contact;