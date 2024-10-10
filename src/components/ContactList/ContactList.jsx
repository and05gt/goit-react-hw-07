import Contact from "../Contact/Contact";
import { useDispatch, useSelector } from "react-redux";
import {
  selectError,
  selectFilteredContacts,
  selectLoading,
} from "../../redux/contactsSlice";
import style from "./ContactList.module.css";
import { deleteContact } from "../../redux/contactsOps";

const ContactList = () => {
  const contacts = useSelector(selectFilteredContacts);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  return (
    <ul className={style.contactList}>
      {loading && <h2>Loading...</h2>}
      {error && <h2>{error}</h2>}
      {contacts.map((contact) => {
        return (
          <li className={style.listItem} key={contact.id}>
            <Contact
              name={contact.name}
              number={contact.number}
              onDelete={() => dispatch(deleteContact(contact.id))}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default ContactList;
