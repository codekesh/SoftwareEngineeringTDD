import { useEffect, useState } from "react"
import styles from "./styles.module.css"

export const ContactModal = () => {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')

    const [nameError, setNameError] = useState('')
    const [phoneError, setPhoneError] = useState('')
    const [emailError, setEmailError] = useState('')


    const [isVaild, setIsValid] = useState(false)

    useEffect((submit) => {
        let _valid = (() => {
            setNameError('')
            setPhoneError('')
            setEmailError('')
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
    }, [name, phone, email])

    return (
        <div className={styles.main}>
            <form onSubmit={e => {
                e.preventDefault();
                if (isValid) {
                    submit();
                } else {

                }
            }}>
                <div>
                    <input
                        required
                        value={name}
                        placeholder="Name"
                        onChange={e => setName(e.target.value)}
                    />
                    {!!nameError && <div data-testid='error' className={styles.error}>{nameError}</div>}
                </div>
                <div>
                    <input
                        required
                        value={phone}
                        placeholder="Phone Number"
                        onChange={e => setPhone(e.target.value)}
                    />
                    {!!phoneError && <div data-testid='error' className={styles.error}>{phoneError}</div>}
                </div>
                <div>
                    <input
                        required
                        value={email}
                        placeholder="Email Address"
                        onChange={e => setEmail(e.target.value)}
                    />
                    {!!emailError && <div data-testid='error' className={styles.error}>{emailError}</div>}
                </div>
                <button disabled={!isVaild}>Submit</button>
            </form>
        </div>
    )
}