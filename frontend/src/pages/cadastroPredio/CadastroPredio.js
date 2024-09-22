import React, { useState, useEffect } from 'react';
import Star from '../../assets/star.png';
import '../../styles/Cadastro.css';

export default function CadastroPredio() {
  const [formData, setFormData] = useState({
    nome: '',
    cep: '',
    rua: '',
    numero: '',
    departamentos: []  // Armazena os IDs dos departamentos selecionados
  });

  const [departments, setDepartments] = useState([]); 
  const [selectedDepartment, setSelectedDepartment] = useState(''); // Para armazenar a seleção atual
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8000/api/departamentos/')
      .then(response => response.json())
      .then(data => {
        setDepartments(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Erro ao carregar os departamentos:', error);
        setIsLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleDepartmentSelect = (e) => {
    setSelectedDepartment(e.target.value); // Armazena a seleção temporária
  };

  const handleAddDepartment = () => {
    if (selectedDepartment && !formData.departamentos.includes(selectedDepartment)) {
      setFormData({
        ...formData,
        departamentos: [...formData.departamentos, selectedDepartment]  // Adiciona ao array
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    fetch('http://localhost:8000/api/predios/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
      alert('Prédio cadastrado com sucesso!');
      console.log(data);
    })
    .catch(error => {
      console.error('Houve um erro ao cadastrar o prédio:', error);
      alert('Erro ao cadastrar o prédio.');
    });
  };

  return (
    <div className="mainContainer">
      <div className='pageTitleForm'>
        <img src={Star} alt="" />
      </div>

      <div className="containerForm">   
        <h2 style={{color:'#003366',fontWeight:'bold'}}>Cadastro de Prédios</h2>

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

          <label htmlFor="departamentos">Departamentos
            <select
              name="departamentos"
              value={selectedDepartment}
              onChange={handleDepartmentSelect}
            >
              <option value="">Selecione um departamento</option>
              {!isLoading ? (
                departments.map(department => (
                  <option key={department.id} value={department.id}>
                    {department.nome}
                  </option>
                ))
              ) : (
                <option>Carregando departamentos...</option>
              )}
            </select>
          </label>

          <label htmlFor="rua">Logradouro
            <input
              type="text"
              name="rua"
              value={formData.rua}
              onChange={handleChange}
              required
            />
          </label>

          <label for="botao"> Adicionar Departamento
            
            <button type="button" name='botao' onClick={handleAddDepartment}>
                Add
            </button>
          </label>

          <label htmlFor="cep">CEP
            <input
              type="text"
              name="cep"
              value={formData.cep}
              onChange={handleChange}
              required
            />
          </label>

          <label htmlFor="numero">Número
            <input
              type="text"
              name="numero"
              value={formData.numero}
              onChange={handleChange}
              placeholder="Opcional"
            />
          </label>
        </form>
        <button onClick={handleSubmit} name='sub' className='button'>Salvar</button>
      </div>
      <h2 style={{color:'#003366',fontWeight:'bold',position:'relative', top:'1.5rem'}}>alocai</h2>

    </div>
  );
}
