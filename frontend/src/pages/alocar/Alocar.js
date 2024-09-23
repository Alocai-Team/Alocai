import React, { useState, useEffect } from 'react';
import Star from '../../assets/star.png';
import '../../styles/Alocar.css';

export default function Alocar() {
  const [universidade, setUniversidade] = useState('');
  const [predios, setPredios] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [filteredDepartamentos, setFilteredDepartamentos] = useState([]);
  const [salas, setSalas] = useState([]);
  const [selectedPredio, setSelectedPredio] = useState('');
  const [selectedDepartamento, setSelectedDepartamento] = useState('');
  const [filteredSalas, setFilteredSalas] = useState([]);
  const [isLoading, setIsLoading] = useState({ predios: true, salas: true, departamentos: true });
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [horaInicio, setHoraInicio] = useState('');
  const [horaFim, setHoraFim] = useState('');
  const [filteredPredios, setFilteredPredios] = useState([]);


  // Função para carregar os dados do backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const predioResponse = await fetch('http://localhost:8000/api/predios/');
        const departamentoResponse = await fetch('http://localhost:8000/api/departamentos/');
        const salaResponse = await fetch('http://localhost:8000/api/salas/');

        if (!predioResponse.ok || !departamentoResponse.ok || !salaResponse.ok) {
          throw new Error('Erro ao carregar dados');
        }

        const predioData = await predioResponse.json();
        const departamentoData = await departamentoResponse.json();
        const salaData = await salaResponse.json();

        setPredios(predioData);
        setDepartamentos(departamentoData);
        setSalas(salaData);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setIsLoading({ predios: false, salas: false, departamentos: false });
      }
    };

    fetchData();
  }, []);

  // Filtragem dos departamentos pela universidade selecionada
  useEffect(() => {
    if (universidade) {
      const departamentosFiltrados = departamentos.filter(departamento => 
        departamento.universidade === universidade
      );
      console.log('Departamentos filtrados:', departamentosFiltrados); // Verificação do filtro
      setFilteredDepartamentos(departamentosFiltrados);
    } else {
      setFilteredDepartamentos([]); 
    }
  }, [universidade, departamentos]);

  //FILTRAGEM DE PREDIOS POR DEPARTAMENTO 

  useEffect(() => {
    if (selectedDepartamento) {
      setIsLoading(prev => ({ ...prev, predios: true }));
      fetch(`http://localhost:8000/api/predios/departamentos/${selectedDepartamento}/`)
        .then(response => response.json())
        .then(data => {
          setFilteredPredios(data);
          setIsLoading(prev => ({ ...prev, predios: false }));
        })
        .catch(error => {
          console.error('Erro ao carregar prédios:', error);
          setIsLoading(prev => ({ ...prev, predios: false }));
        });
    }
  }, [selectedDepartamento]);

  // Filtragem das salas pelo prédio selecionado
  useEffect(() => {
    if (selectedPredio) {
      const salasFiltradas = salas.filter(sala => String(sala.id_predio) === String(selectedPredio));
      console.log('Salas filtradas:', salasFiltradas); // Verificação do filtro
      setFilteredSalas(salasFiltradas);
    } else {
      setFilteredSalas([]);
    }
  }, [selectedPredio, salas]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const agendamento = {
      universidade,
      departamento: selectedDepartamento,
      predio: selectedPredio,
      sala: e.target.sala.value,
      turno: e.target.turno.value,
      data_inicio: `${dataInicio}T${horaInicio}`,
      data_fim: `${dataFim}T${horaFim}`
    };

    try {
      const response = await fetch('http://localhost:8000/api/agendamentos/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(agendamento),
      });

      if (!response.ok) {
        throw new Error('Erro ao agendar');
      }

      console.log('Agendamento criado com sucesso!');
    } catch (error) {
      console.error('Erro ao criar agendamento:', error);
    }
  };

  return (
    <div className="mainContainer">
      <div className="pageTitleForm">
        <img src={Star} alt="" />
      </div>

      <div className="containerForm">
        <h2 style={{ color: '#003366', fontWeight: 'bold' }}>Qual sala você deseja alocar?</h2>
        <form className="formAlocar" onSubmit={handleSubmit}>
          {/* Seletor de universidade */}
          <label htmlFor="universidade">Universidade
            <select id="universidade" value={universidade} onChange={(e) => setUniversidade(e.target.value)}>
              <option value="">Selecione...</option>
              <option value="ufrpe">UFRPE</option>
              <option value="ufpe">UFPE</option>
            </select>
          </label>

          {/* Seletor de departamento */}
          <label htmlFor="departamento">Departamento
            <select id="departamento" value={selectedDepartamento} onChange={(e) => setSelectedDepartamento(e.target.value)}>
              <option value="">Selecione...</option>
              {!isLoading.departamentos ? (
                filteredDepartamentos.map(departamento => (
                  <option key={departamento.id} value={departamento.id}>
                    {departamento.nome}
                  </option>
                ))
              ) : (
                <option>Carregando departamentos...</option>
              )}
            </select>
          </label>

          {/* Seletor de prédio */}
          <label htmlFor="predio">Prédio
          <select id="predio" value={selectedPredio} onChange={e => setSelectedPredio(e.target.value)}>
              <option value="">Selecione...</option>
              {!isLoading.predios ? (
                filteredPredios.map(predio => (
                  <option key={predio.id} value={predio.id}>
                    {predio.nome}
                  </option>
                ))
              ) : (
                <option>Carregando prédios...</option>
              )}
            </select>
          </label>

          {/* Seletor de sala */}
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

          {/* Seletor de turno */}
          <label htmlFor="turno">Turno
            <select id="turno">
              <option value="">Selecione...</option>
              <option value="manha">Manhã</option>
              <option value="tarde">Tarde</option>
              <option value="noite">Noite</option>
            </select>
          </label>

          {/* Campos de data e hora */}
          <label htmlFor="dataInicio">Data de Início
            <input type="date" id="dataInicio" value={dataInicio} onChange={(e) => setDataInicio(e.target.value)} />
          </label>

          <label htmlFor="horaInicio">Hora de Início
            <input type="time" id="horaInicio" value={horaInicio} onChange={(e) => setHoraInicio(e.target.value)} />
          </label>

          <label htmlFor="dataFim">Data de Término
            <input type="date" id="dataFim" value={dataFim} onChange={(e) => setDataFim(e.target.value)} />
          </label>

          <label htmlFor="horaFim">Hora de Término
            <input type="time" id="horaFim" value={horaFim} onChange={(e) => setHoraFim(e.target.value)} />
          </label>

        </form>
        <button onClick={handleSubmit} className="button">Alocar!</button>
      </div>
      <h2 style={{color:'#003366',fontWeight:'bold',position:'relative', top:'1.5rem'}}>alocai</h2>
    </div>
  );
}
