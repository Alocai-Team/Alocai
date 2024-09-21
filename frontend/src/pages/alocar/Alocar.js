import React, { useState, useEffect } from 'react';
import Star from '../../assets/star.png';
import '../../styles/Alocar.css';

export default function Alocar() {
  const [universidade, setUniversidade] = useState('');
  const [predios, setPredios] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [salas, setSalas] = useState([]);
  const [selectedPredio, setSelectedPredio] = useState('');
  const [filteredSalas, setFilteredSalas] = useState([]);
  const [isLoading, setIsLoading] = useState({ predios: true, salas: true, departamentos: true });

  useEffect(() => {
    // Fetch prédios
    fetch('http://localhost:8000/api/predios/')
      .then(response => response.json())
      .then(data => {
        setPredios(data);
        setIsLoading(prev => ({ ...prev, predios: false }));
      })
      .catch(error => console.error('Erro ao carregar prédios:', error));

    // Fetch departamentos
    fetch('http://localhost:8000/api/departamentos/')
      .then(response => response.json())
      .then(data => {
        setDepartamentos(data);
        setIsLoading(prev => ({ ...prev, departamentos: false }));
      })
      .catch(error => console.error('Erro ao carregar departamentos:', error));

    // Fetch salas
    fetch('http://localhost:8000/api/salas/')
      .then(response => response.json())
      .then(data => {
        setSalas(data);
        setIsLoading(prev => ({ ...prev, salas: false }));
      })
      .catch(error => console.error('Erro ao carregar salas:', error));
  }, []);

  const handleUniversidadeChange = (e) => {
    setUniversidade(e.target.value);
  };

  const handlePredioChange = (e) => {
    const predioId = e.target.value;
    setSelectedPredio(predioId);

    // Filtra as salas baseadas no prédio selecionado
    const filtered = salas.filter(sala => sala.id_predio === parseInt(predioId));
    setFilteredSalas(filtered);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica de envio de dados
    console.log('Form submitted');
  };

  return (
    <div className="mainContainer">
      <div className="pageTitleForm">
        <img src={Star} alt="" />
      </div>

      <div className="containerForm">
        <h2 style={{ color: '#003366', fontWeight: 'bold' }}>Qual sala você deseja alocar?</h2>
        <form className="formAlocar" onSubmit={handleSubmit}>
          <label htmlFor="universidade">Universidade
            <select id="universidade" value={universidade} onChange={handleUniversidadeChange}>
              <option value="">Selecione...</option>
              <option value="UFRPE">UFRPE</option>
              <option value="UFPE">UFPE</option>
            </select>
          </label>

          <label htmlFor="predio">Prédio
            <select id="predio" value={selectedPredio} onChange={handlePredioChange}>
              <option value="">Selecione...</option>
              {!isLoading.predios ? (
                predios.map(predio => (
                  <option key={predio.id} value={predio.id}>
                    {predio.nome}
                  </option>
                ))
              ) : (
                <option>Carregando prédios...</option>
              )}
            </select>
          </label>

          <label htmlFor="departamento">Departamento
            <select id="departamento">
              <option value="">Selecione...</option>
              {!isLoading.departamentos ? (
                departamentos.map(departamento => (
                  <option key={departamento.id} value={departamento.id}>
                    {departamento.nome}
                  </option>
                ))
              ) : (
                <option>Carregando departamentos...</option>
              )}
            </select>
          </label>

          <label htmlFor="sala">Sala
            <select id="sala">
              <option value="">Selecione...</option>
              {!isLoading.salas ? (
                filteredSalas.map(sala => (
                  <option key={sala.id} value={sala.id}>
                    {sala.numero}
                  </option>
                ))
              ) : (
                <option>Carregando salas...</option>
              )}
            </select>
          </label>

          <label htmlFor="turno">Turno
            <select id="turno">
              <option value="">Selecione...</option>
              <option value="manha">Manhã</option>
              <option value="tarde">Tarde</option>
              <option value="noite">Noite</option>
            </select>
          </label>

          <label htmlFor="data">Data
            <input type="date" id="data" />
          </label>

        </form>
        <button type="submit" className="button">Alocar!</button>
      </div>
    </div>
  );
}
