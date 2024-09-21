import { useState } from 'react';
import Star from '../../assets/star.png';
import '../../styles/Cadastro.css';

export default function CadastroDepartamento() {
  const [formData, setFormData] = useState({
    nome: '',           // Nome do departamento
    universidade: '',    // Universidade
    area: '',            // Área
    coordenador: ''      // Coordenador
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Previne o comportamento padrão de recarregar a página
    
    // Enviando os dados para o endpoint da API Django
    fetch('http://localhost:8000/api/departamentos/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData) // Envia os dados do estado como JSON
    })
    .then(response => response.json())
    .then(data => {
      alert('Departamento cadastrado com sucesso!');
      console.log(data);
    })
    .catch(error => {
      console.error('Houve um erro ao cadastrar o Departamento:', error);
      alert('Erro ao cadastrar o Departamento.');
    });

    // Resetar o formulário após o envio bem-sucedido
    setFormData({
      nome: '',
      universidade: '',
      area: '',
      coordenador: ''
    });
  };

  return (
    <div className="mainContainer">

      <div className='pageTitleForm'>
        <img src={Star} alt="" />
      </div>

      <div className="containerForm">   
        <h2 style={{color:'#003366',fontWeight:'bold'}}>Cadastro de Departamentos</h2>
        
        <form onSubmit={handleSubmit} className='formAlocar'>
          <label htmlFor="nome">Nome
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
            />
          </label>

          <label htmlFor="universidade">Universidade
            <select 
              name="universidade" 
              value={formData.universidade} 
              onChange={handleChange}
              required
            >
              <option value="">Selecione a Universidade</option>
              <option value="ufrpe">UFRPE</option>
              <option value="ufpe">UFPE</option>
            </select>
          </label>

          <label htmlFor="area">Área
            <select 
              name="area" 
              value={formData.area} 
              onChange={handleChange}
              required
            >
              <option value="">Selecione a Área</option>
              <option value="exatas">Ciências Exatas</option>
              <option value="humanas">Ciências Humanas</option>
              <option value="biologicas">Ciências Biológicas</option>
              <option value="sociais">Ciências Sociais Aplicadas</option>
              <option value="artes">Artes e Design</option>
              <option value="saude">Ciências da Saúde</option>
              <option value="letras">Letras</option>
              <option value="agrarias">Ciências Agrárias</option>
            </select>
          </label>

          <label htmlFor="coordenador">Coordenador do Departamento
            <input
              type="text"
              name="coordenador"
              value={formData.coordenador}
              onChange={handleChange}
              required
            />
          </label>
        </form>
        <button onClick={handleSubmit} className='button'>Salvar</button>
      </div>
      
      <h2 style={{color:'#003366',fontWeight:'bold',position:'relative', top:'1.5rem'}}>alocai</h2>
    </div>
  );
}
