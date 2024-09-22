import { useState } from 'react';
import Star from '../../assets/star.png';
import registerMan from '../../assets/man1.png';
import '../../styles/Registro.css';

export default function Registro() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        re_password: ''
    });

    const HomemCadastroImg = {
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
        if (formData.password !== formData.re_password) {
            alert("As senhas não conferem!");
            return;
        }

        try {
            const response = await fetch('http://localhost:8000/api/users1/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    re_password: formData.re_password
                }),
            });

            if (!response.ok) {
                throw new Error('Erro ao cadastrar usuário');
            }

            alert("Usuário cadastrado com sucesso!");
            // Redirecionar ou fazer outra ação
        } catch (error) {
            console.error("Erro ao cadastrar usuário", error);
            alert("Erro ao cadastrar usuário. Tente novamente.");
        }
    };

    return (
        <div className="containerCadastro">
            <div className='pageTitleCadastro'>
                <h2 style={{ color: '#003366', fontWeight: 'bold' }}>Cadastro</h2>
                <img src={Star} alt="" />
            </div>
            <div className="form-containerCadastro">
                <img src={registerMan} style={HomemCadastroImg} alt="" />
                <div className="infoCadastro">
                    <h2>Vamos iniciar uma</h2>
                    <h2 style={{ color: '#003366', fontWeight: 'bold' }}>experiência.</h2>
                </div>
                <form className='form' onSubmit={handleSubmit}>
                    <label htmlFor="name">Nome</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />

                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />

                    <label htmlFor="password">Senha</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />

                    <label htmlFor="re_password">Confirme sua senha</label>
                    <input
                        type="password"
                        id="re_password"
                        name="re_password"
                        value={formData.re_password}
                        onChange={handleChange}
                    />

                    <div className="btn-containerCadastro">
                        <button type='submit' className='btn'>Cadastrar-se</button>
                        <p>Já possui conta? <span style={{ color: '#003366', fontWeight: 'bold', cursor: 'pointer' }}>Entrar</span></p>
                    </div>
                </form>
            </div>
            <h2 style={{ color: '#003366', fontWeight: 'bold', position: 'relative', top: '1.5rem' }}>alocai</h2>
        </div>
    );
}