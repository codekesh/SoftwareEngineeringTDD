import { ContactModal } from "ContactModel";
import styles from './styles.module.css'
import { useEffect, useState } from "react";

export const App = () => {
  const [contacts, setContacts] = useState();
  const [addingContact, setAddingContact] = useState(false)
  
  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');

    if (!storedContacts) {
      localStorage.setItem('contacts', JSON.stringify([]));
      setContacts([]);
    } else {
      setContacts(JSON.parse(storedContacts));
    }
  }, []);

  return (
    <div className={styles.main}>
      {addingContact && (
        <ContactModal cancel={() =>
          setAddingContact(false)}
          submit={c => {
            const newContacts=[...contacts, c]
            localStorage.setItem('contacts', JSON.stringify(newContacts))
            setAddingContact(false)
          }} />
      )}

      <button
        data-testid="add-contact-btn"
        onClick={() => setAddingContact(true)}
      >
        Add Contact
      </button>
    </div>
  );
}