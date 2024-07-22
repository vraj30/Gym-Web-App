import axios from 'axios';
import React, { useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';

const Contact = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const sendMail = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await axios.post(
                "http://localhost:8080/send/mail",
                {
                    name,
                    email,
                    message,
                },
                {
                    withCredentials: true,
                    headers: { "Content-Type": "application/json" },
                }
            );
            setName("");
            setEmail("");
            setMessage("");
            toast.success(data.message);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            if (error.response && error.response.data) {
                toast.error(error.response.data.message);
            } else {
                toast.error("An error occurred. Please try again.");
            }
        }
    };

    return (
        <section className="contact">
            <form onSubmit={sendMail}>
                <h1>DROP YOUR QUERIES!</h1>
                <div>
                    <label>Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    <label>Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Message</label>
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                </div>

                <button
                    type='submit'
                    disabled={loading}
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "15px"
                    }}>
                    {loading && <ClipLoader size={20} color="white" />}
                    Send Message
                </button>
            </form>
        </section>
    );
};

export default Contact;
