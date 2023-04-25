import { useEffect, useState } from "react"
import styles from "./styles.module.css"

export const ContactModal = (submit) => {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [isVaild, SetIsValid] = useState(false)

    useEffect(() => {
        SetIsValid(
            !!name &&
            !!phone &&
            !!email &&
            /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/.test(phone) &&
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)
        )
    }, [name, phone, email])

    return (
        <div className={styles.main}>
            <form onSubmit={submit}>
                <input
                    required
                    value={name}
                    placeholder="Name"
                    onChange={e => setName(e.target.value)}
                />

                <input
                    required
                    value={phone}
                    placeholder="Phone Number"
                    onChange={e => setPhone(e.target.value)}
                />

                <input
                    required
                    value={email}
                    placeholder="Email Address"
                    onChange={e => setEmail(e.target.value)}
                />
                <button disabled={!isVaild}>Submit</button>
            </form>
        </div>)
}