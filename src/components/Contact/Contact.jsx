import css from './Contact.module.css'
import { FaUser } from 'react-icons/fa'
import { FaPhoneAlt } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import {deleteContact, updateContact} from '../../redux/contacts/operations'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { CiEdit } from 'react-icons/ci'
import Modal from '../Modal/Modal';


const Contact = ({contact}) => {
    const {id, name, number} = contact;
    const [isOpen, setIsOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName]= useState(name);
    const [editedNumber, setEditedNumber] = useState(number);
    const dispatch = useDispatch();


    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    const removeContact = () => {
      dispatch(deleteContact(id))
        .unwrap()
        .then(() => {
          toast.success('Contact deleted successfully');
          handleClose();
      });
    };
    
    const handleEditToggle = () => setIsEditing((prev) => !prev);
    const handleSave = () => {
      dispatch(updateContact({ contactId: id, updatedContact: { name: editedName, number: editedNumber } }))
        .unwrap()
        .then(() => {
          toast.success('Contact updated successfully');
          setIsEditing(false);
        })
    };
    return (
      <div className={css.box}>
        <ul className={css.list}>
          <li className={css.item}>
            <FaUser className={css.icon} />
            {isEditing ? (
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className={css.input}
                autoFocus
            />
            ) : (
              <p className={css.text}>{name}</p>
            )}
          </li>
          <li className={css.item}>
            <FaPhoneAlt className={css.icon} />
            {isEditing ? (
              <input
                type="text"
                value={editedNumber}
                onChange={(e) => setEditedNumber(e.target.value)}
                className={css.input}
                autoFocus
              />
            ) : (
              <p className={css.text}>{number}</p>
            )}
          </li>
        </ul>
        <div className={css.buttons}>
          {isEditing ? (
            <>
            <button type='button' className={css.btn} onClick={handleSave}>Save</button>
            <button type='button' className={css.btn} onClick={handleEditToggle}>Cancel</button>
            </>
          ) : (
            <>
             <button type='button' className={css.btn} onClick={handleOpen}>Delete</button>
             <button type='button' className={css.btn} onClick={handleEditToggle}>Edit <CiEdit/></button>
            </>
          )}
        </div>
        {isOpen && <Modal onClose={handleClose} onDelete={removeContact} />}
      </div>
    );
  }
  
  export default Contact;