import { useState } from 'react';
import { registerService } from '../services/userServices';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
export default function RegisterPage() {
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        username: '',
        usermail: '',
        userpass1: '',
        userpass2: '',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    function handleFormChange(e) {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    }
    async function handleSubmit(e) {
        e.preventDefault();
        if (formValues.userpass1 !== formValues.userpass2) {
            setError('Las Contraseñas no coinciden');
            error && toast.error(error, {
                position: 'top-center',
                autoclosse: 2000,
                hideProgressBar: true,
                theme: 'colored',
            });
            return;
        }
        try {
            await registerService({
                user_name: formValues.username,
                user_email: formValues.usermail,
                user_password: formValues.userpass1,
            });
            toast.success('Usuario registrado', {
                position: 'top-center',
                hideProgressBar: true,
                autoclosse: 2000,
                theme: 'light',
            });
            navigate('/login');
        } catch (error) {
            console.error
            setError(error.message);
            error && toast.error(error.message, {
                position: 'top-center',
                hideProgressBar: true,
                autoclosse: 2000,
                theme: 'colored',
            });
        }
    }
    return (
        <div className="centrado">
            <section className="register">
                <h2>Registro de Usuario</h2>
                <form className="form-log" onSubmit={handleSubmit}>
                    <fieldset className="fieldSet1">
                        <label className="label-log" htmlFor="username">
                            Usuario{' '}
                        </label>
                        <input
                            className="input-log"
                            id="username"
                            type="text"
                            name="username"
                            onChange={handleFormChange}
                            value={formValues.username}
                        />
                    </fieldset>

                    <fieldset className="fieldSet1">
                        <label className="label-log" htmlFor="usermail">
                            Email{' '}
                        </label>
                        <input
                            className="input-log"
                            id="usermail"
                            type="email"
                            name="usermail"
                            onChange={handleFormChange}
                            value={formValues.usermail}
                        />
                    </fieldset>

                    <fieldset className="fieldSet1">
                        <label className="label-log" htmlFor="userpass1">
                            Contraseña{' '}
                        </label>
                        <input
                            className="input-log"
                            id="userpass1"
                            type="password"
                            name="userpass1"
                            onChange={handleFormChange}
                            value={formValues.userpass1}
                        />
                    </fieldset>

                    <fieldset className="fieldSet1">
                        <label className="label-log" htmlFor="userpass2">
                            Repite contraseña{' '}
                        </label>
                        <input
                            className="input-log"
                            id="userpass2"
                            type="password"
                            name="userpass2"
                            onChange={handleFormChange}
                            value={formValues.userpass2}
                        />
                    </fieldset>
                    <button className="btn_log-form">Acceder</button>
                </form>
            </section>
        </div>
    );
}
