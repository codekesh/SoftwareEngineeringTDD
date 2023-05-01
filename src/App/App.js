import { ContactModal } from "ContactModel";
export const App = () => {
  return (
    <ContactModal onSubmit={()=>console.log('Submit!')}/>
  );
}