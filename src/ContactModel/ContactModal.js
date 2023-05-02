import { useEffect, useState } from "react"
import styles from "./styles.module.css"

export const ContactModal = ({ cancel, submit }) => {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')

    const [nameError, setNameError] = useState('')
    const [phoneError, setPhoneError] = useState('')
    const [emailError, setEmailError] = useState('')

    const [isValid, setIsValid] = useState(false)

    const [nameDirty, setNameDirty] = useState(false);
    const [emailDirty, setEmailDirty] = useState(false);
    const [phoneDirty, setPhoneDirty] = useState(false);


    useEffect(() => {

        setNameError('')
        setPhoneError('')
        setEmailError('')

        let _valid = (() => {
            if (!name) {
                return false
            }
            else if (!phone) {
                return false
            }
            else if (!email) {
                return false;
            }
            else if (!/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/.test(phone)) {
                return false
            }
            else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
                return false
            }
            else {
                return true;
            }
        })();

        if (nameDirty && !name) {
            setNameError('Name is required')
        }
        else if (phoneDirty && !phone) {
            setPhoneError('Phone is required')
        }
        else if (emailDirty && !email) {
            setEmailError('Email is reuiqred')
        }
        else if (phoneDirty && !/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/.test(phone)) {
            setPhoneError('Please enter phone format correctly')
        }
        else if (emailDirty && !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            setEmailError('Please enter email format correctly')
        }
        setIsValid(_valid)
    }, [name, phone, email, nameDirty, emailDirty, phoneDirty])

    return (
        <div className={styles.main}>
            <form
                data-testid='contact-modal-form'
                onSubmit={e => {
                    e.preventDefault();
                    if (isValid) {
                        submit({ name, email, phone });
                    }
                }}>
                <div>
                    <input
                        required
                        value={name}
                        placeholder="Name"
                        onChange={e => {
                            setNameDirty(true)
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
                            setPhoneDirty(true)
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
                            setEmailDirty(true)
                            setEmail(e.target.value)
                        }}
                    />
                    {!!emailError && <div data-testid='error' className={styles.error}>{emailError}</div>}
                </div>
                <button disabled={!isValid}>Submit</button>
                <button type="button" onClick={cancel}>Cancel</button>
            </form>
        </div>
    )
}