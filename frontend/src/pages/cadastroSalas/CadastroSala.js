import { useState, useEffect } from 'react';
import Star from '../../assets/star.png';

import '../../styles/Cadastro.css';

export default function CadastroSala() {
    const [formData, setFormData] = useState({
        numero: '',          
        descricao: '',    
        qtd_cadeiras: '',           
        andar: '',      
        id_predio: '',
        tipo: ''
    });
    
    const [predios, setPredios] = useState([]); // Estado para armazenar prédios

    useEffect(() => {
        // Fetch para obter os prédios
        fetch('http://localhost:8000/api/predios/')
            .then(response => response.json())
            .then(data => setPredios(data)) // Atualiza o estado com os prédios
            .catch(error => {
                console.error('Erro ao buscar prédios:', error);
                alert('Erro ao buscar prédios.');
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Se o campo for numérico, converta para número
        const newValue = (name === 'numero' || name === 'qtd_cadeiras' || name === 'andar') 
            ? parseInt(value) 
            : value;

        setFormData({
            ...formData,
            [name]: newValue
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost:8000/api/salas/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            alert('Sala cadastrada com sucesso!');
            console.log(data);
        })
        .catch(error => {
            console.error('Houve um erro ao cadastrar a Sala:', error);
            alert('Erro ao cadastrar a Sala.');
        });

        setFormData({
            numero: '',          
            descricao: '',    
            qtd_cadeiras: '',           
            andar: '',      
            id_predio: '',
            tipo: ''
        });
    };

    return (
        <div className="mainContainer">
            <div className='pageTitleForm'>
                <img src={Star} alt="" />
            </div>

            <div className="containerForm">   
                <h2 style={{color:'#003366',fontWeight:'bold'}}>Cadastro de Salas</h2>
                <form className='formAlocar' onSubmit={handleSubmit}>
                    <label htmlFor="numero">Número da Sala
                        <input 
                            type="number"  
                            name="numero"
                            value={formData.numero}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label htmlFor="qtd_cadeiras">Assentos Disponíveis
                        <input 
                            type="number"
                            name="qtd_cadeiras"
                            value={formData.qtd_cadeiras}
                            onChange={handleChange}    
                            required
                        />
                    </label>
                    <label htmlFor="andar">Andar
                        <input 
                            type="number"  
                            name="andar"
                            value={formData.andar}
                            onChange={handleChange}    
                            required
                        />
                    </label>
                    <label htmlFor="id_predio">Prédio
                        <select 
                            name="id_predio" 
                            value={formData.id_predio}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Selecione um Prédio</option>
                            {predios.map(predio => (
                                <option key={predio.id} value={predio.id}>
                                    {predio.nome}  {/* Supondo que você tenha um campo 'nome' em Predio */}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label htmlFor="tipo">Tipo da Sala
                        <select 
                            name="tipo" 
                            value={formData.tipo} 
                            onChange={handleChange} 
                            required
                        >
                            <option value="">Selecione o tipo de sala</option>
                            <option value="sala">Sala</option>
                            <option value="desenho">Sala de Desenho</option>
                            <option value="lab">Laboratório</option>
                            <option value="auditorio">Auditório</option>
                        </select>
                    </label>
                    <label htmlFor="descricao">Descrição da Sala
                        <input 
                            type="text"
                            name="descricao"
                            value={formData.descricao}
                            onChange={handleChange}    
                            required
                        />
                    </label>
                </form>
                <button onClick={handleSubmit} className='button'>Salvar</button>
            </div>
        </div>
    );
}
