import { ContactModal } from "ContactModel";
export const App = () => {
  return (
    <ContactModal submit={() => alert('Submitted')} />
  );
}