import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Star from '../../assets/star.png';
import WomanLogin from '../../assets/woman.png';
import '../../styles/Login.css';

export default function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate(); // Hook para redirecionamento

    const WomanLoginImg = {
        position: 'relative',
        top: '5rem',
        height: '30rem'
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8000/api/users1/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                }),
            });

            if (!response.ok) {
                throw new Error('Erro ao fazer login');
            }

            const data = await response.json();

            // Armazenar tokens JWT no localStorage ou em cookies
            localStorage.setItem('accessToken', data.access);
            localStorage.setItem('refreshToken', data.refresh);
            localStorage.setItem('isAdmin', data.is_staff); // Salve o valor de is_staff
            localStorage.setItem('userId', data.user_id);


            alert("Login realizado com sucesso!");
            console.log("isAdmin armazenado:", localStorage.getItem('isAdmin')); // Deve mostrar 'true' ou 'false'

            // Redirecionar após login bem-sucedido
            navigate('/Alocar');
        } catch (error) {
            console.error("Erro ao fazer login", error);
            alert("Erro ao fazer login. Verifique suas credenciais e tente novamente.");
        }
    };

    return (
        <div className="containerLogin">
            <div className='pageTitleLogin'>
                <h2 style={{ color: '#003366', fontWeight: 'bold' }}>Login</h2>
                <img src={Star} alt="" />
            </div>
            <div className="form-containerLogin">
                <img src={WomanLogin} style={WomanLoginImg} alt="" />
                <div className="info">
                    <h2>Seja</h2>
                    <h2 style={{ color: '#003366', fontWeight: 'bold' }}>Bem-Vindo</h2>
                </div>

                <form className='form' onSubmit={handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />

                    <label htmlFor="password">Senha</label>
                    <div className='password-container'>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="btn-containerLogin">
                        <button type="submit" className='btn'>Entrar</button>
                        <p>Ainda não possui conta? <span style={{ color: '#003366', fontWeight: 'bold', cursor: 'pointer' }}>Cadastrar</span></p>
                    </div>
                </form>
            </div>

            <h2 style={{ color: '#003366', fontWeight: 'bold', position: 'relative', top: '1.5rem' }}>alocai</h2>
        </div>
    );
}