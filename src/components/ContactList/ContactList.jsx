import Contact from "../Contact/Contact";
import { useDispatch, useSelector } from "react-redux";
import {
  selectContacts,
  selectError,
  selectLoading,
} from "../../redux/contactsSlice";
import { selectNameFilter } from "../../redux/filtersSlice";
import style from "./ContactList.module.css";
import { deleteContact } from "../../redux/contactsOps";

const ContactList = () => {
  const contacts = useSelector(selectContacts);
  const filters = useSelector(selectNameFilter);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const visibleContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().trim().includes(filters.toLowerCase().trim())
  );
  const dispatch = useDispatch();

  return (
    <ul className={style.contactList}>
      {loading && <h2>Loading...</h2>}
      {error && <h2>{error}</h2>}
      {visibleContacts.map((contact) => {
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
