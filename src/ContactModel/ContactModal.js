import { useEffect, useState } from "react"
import styles from "./styles.module.css"

export const ContactModal = ({ submit }) => {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')

    const [nameError, setNameError] = useState('')
    const [phoneError, setPhoneError] = useState('')
    const [emailError, setEmailError] = useState('')

    const [isValid, setIsValid] = useState(false)

    const [formDirty, setformDirty] = useState(false);
    useEffect(() => {
        if (!formDirty) {
            return;
        }
        setNameError('')
        setPhoneError('')
        setEmailError('')

        let _valid = (() => {
            if (!name) {
                setNameError('Name is required')
                return false
            }
            else if (!phone) {
                setPhoneError('Phone is required')
                return false
            }
            else if (!email) {
                setEmailError('Email is reuiqred')
                return false;
            }
            else if (!/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/.test(phone)) {
                setPhoneError('Please enter phone format correctly')
                return false
            }
            else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
                setEmailError('Please enter email format correctly')
                return false
            }
            else {
                return true;
            }
        })();

        setIsValid(_valid)
    }, [name, phone, email, formDirty])

    return (
        <div className={styles.main}>
            <form
                data-testid='contact-modal-form'
                onSubmit={e => {
                    e.preventDefault();
                    if (isValid) {
                        submit();
                    }
                }}>
                <div>
                    <input
                        required
                        value={name}
                        placeholder="Name"
                        onChange={e => {
                            setformDirty(true)
                            setName(e.target.value)
                        }}
                    />
                    {!!nameError && <div data-testid='error' className={styles.error}>{nameError}</div>}
                </div>
                <div>
                    <input
                        required
                        value={phone}
                        placeholder="Phone Number"
                        onChange={e => {
                            setformDirty(true)
                            setPhone(e.target.value)
                        }}
                    />
                    {!!phoneError && <div data-testid='error' className={styles.error}>{phoneError}</div>}
                </div>
                <div>
                    <input
                        required
                        value={email}
                        placeholder="Email Address"
                        onChange={e => {
                            setformDirty(true)
                            setEmail(e.target.value)
                        }}
                    />
                    {!!emailError && <div data-testid='error' className={styles.error}>{emailError}</div>}
                </div>
                <button disabled={!isValid}>Submit</button>
            </form>
        </div>
    )
}