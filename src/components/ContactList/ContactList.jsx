import css from "./ContactList.module.css";
import Contact from "../Contact/Contact";

const ContactList = ({ contacts = [] }) => {
  if (!contacts.length) {
    return <p className={css.empty}>No contacts yet</p>;
  }

  return (
    <ul className={css.list}>
      {contacts.map((c) => (
        <li key={c.id} className={css.item}>
          <Contact contact={c} />
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
