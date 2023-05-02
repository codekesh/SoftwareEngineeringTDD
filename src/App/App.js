import { ContactModal } from "ContactModel";
import styles from './styles.module.css'
import { useState } from "react";

export const App = () => {
  const [addingContact, setAddingContact] = useState(false)
  return (
    <div className={styles.main}>
      {addingContact && (
        <ContactModal cancel={()=>
        setAddingContact(false)} 
        submit={() => alert('Submitted')} />
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