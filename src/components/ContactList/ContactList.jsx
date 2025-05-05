import { useSelector } from 'react-redux';
import { selectFilteredContacts } from '../../redux/selectors';
import css from './ContactList.module.css';
import Contact from '../Contact/Contact';

const ContactList = () => {
  const contacts = useSelector(selectFilteredContacts);

  return (
    <ul className={css.list}>
      {contacts.map(contact => (
        <Contact key={contact.id} contact={contact} />
      ))}
    </ul>
  );
};

export default ContactList;
