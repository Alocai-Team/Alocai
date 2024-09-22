import React, { useState, useEffect } from 'react';
import Star from '../../assets/star.png';
import '../../styles/Alocar.css';

export default function Alocar() {
  const [universidade, setUniversidade] = useState('');
  const [predios, setPredios] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [salas, setSalas] = useState([]);
  const [selectedPredio, setSelectedPredio] = useState('');
  const [selectedDepartamento, setSelectedDepartamento] = useState('');
  const [selectedSala, setSelectedSala] = useState('');
  const [selectedTurno, setSelectedTurno] = useState('');

  const [isLoading, setIsLoading] = useState({ predios: true, salas: true, departamentos: true });
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [horaInicio, setHoraInicio] = useState('');
  const [horaFim, setHoraFim] = useState('');

  const [filteredDepartamentos, setFilteredDepartamentos] = useState([]);
  const [filteredPredios, setFilteredPredios] = useState([]);
  const [filteredSalas, setFilteredSalas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const predioResponse = await fetch('http://localhost:8000/api/predios/');
        const departamentoResponse = await fetch('http://localhost:8000/api/departamentos/');
        const salaResponse = await fetch('http://localhost:8000/api/salas/');

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

  useEffect(() => {
    if (universidade) {
      const filtrados = departamentos.filter(departamento => departamento.universidade === universidade);
      setFilteredDepartamentos(filtrados);
    } else {
      setFilteredDepartamentos('');
    }
  }, [universidade, departamentos]);

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

  useEffect(() => {
    if (selectedPredio) {
      setIsLoading(prev => ({ ...prev, salas: true })); // Mostra que está carregando as salas
      fetch(`http://localhost:8000/api/salas/?predio=${selectedPredio}`)
        .then(response => response.json())
        .then(data => {
          setFilteredSalas(data); // Atualiza as salas filtradas com base no prédio
          setIsLoading(prev => ({ ...prev, salas: false })); // Termina o loading
        })
        .catch(error => {
          console.error('Erro ao carregar salas:', error);
          setIsLoading(prev => ({ ...prev, salas: false })); // Termina o loading em caso de erro
        });
    } else {
      setFilteredSalas([]); // Limpa as salas se nenhum prédio for selecionado
    }
  }, [selectedPredio]);


 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!selectedDepartamento || !selectedPredio || !selectedSala || !selectedTurno || !dataInicio || !dataFim || !horaInicio || !horaFim) {
    alert('Por favor, preencha todos os campos obrigatórios.');
    return;
  }

  const agendamento = {
    universidade,  // Valor do select de universidade
    departamento: selectedDepartamento,  // ID do departamento selecionado
    predio: selectedPredio,  // ID do prédio selecionado
    sala: selectedSala,  // ID da sala selecionada
    turno: selectedTurno,  // Valor do turno selecionado
    datahora_inicio: `${dataInicio}T${horaInicio}`,  // Data e hora de início no formato correto
    datahora_fim: `${dataFim}T${horaFim}`,  // Data e hora de término no formato correto
    // Se necessário, inclua também o status ou outros campos aqui
  };

  try {
    const response = await fetch('http://localhost:8000/api/solicitacoes/', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(agendamento),  // Converte o objeto agendamento para JSON
    });

    if (!response.ok) {
      throw new Error('Erro ao enviar agendamento.');
    }

    const data = await response.json();
    console.log('Agendamento criado com sucesso:', data);
    // Você pode adicionar um redirecionamento ou uma mensagem de sucesso aqui

  } catch (error) {
    console.error('Erro ao enviar agendamento:', error);
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
          <label htmlFor="universidade">Universidade
            <select id="universidade" value={universidade} onChange={(e) => setUniversidade(e.target.value)}>
              <option value="">Selecione...</option>
              <option value="ufrpe">UFRPE</option>
              <option value="ufpe">UFPE</option>
            </select>
          </label>
          <label htmlFor="departamento">Departamento
            <select id="departamento" value={selectedDepartamento} onChange={e => setSelectedDepartamento(e.target.value)}>
              <option value="">Selecione o Departamento...</option>
              {!isLoading.departamentos ? (
                filteredDepartamentos.length > 0 ? (
                  filteredDepartamentos.map(departamento => (
                    <option key={departamento.id} value={departamento.id}>
                      {departamento.nome}
                    </option>
                  ))
                ) : (
                  <option value="">Nenhum departamento encontrado</option>
                )
              ) : (
                <option>Carregando departamentos...</option>
              )}
            </select>
          </label>
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
          <label htmlFor="sala">Sala
            <select 
              id="sala" 
              value={selectedSala} 
              onChange={(e) => setSelectedSala(e.target.value)} 
              disabled={!selectedPredio || isLoading.salas}  // Desativa o select se o prédio não estiver selecionado ou se estiver carregando
            >
              <option value="">Selecione a Sala...</option>
              {!isLoading.salas ? (
                filteredSalas.length > 0 ? (
                  filteredSalas.map(sala => (
                    <option key={sala.id} value={sala.id}>
                      {sala.numero}
                    </option>
                  ))
                ) : (
                  <option value="">Nenhuma sala encontrada</option>
                )
              ) : (
                <option>Carregando salas...</option>
              )}
            </select>
          </label>
          <label htmlFor="turno">Turno
            <select id="turno" value={selectedTurno} onChange={e => setSelectedTurno(e.target.value)}>
              <option value="">Selecione...</option>
              <option value="manha">Manhã</option>
              <option value="tarde">Tarde</option>
              <option value="noite">Noite</option>
            </select>
          </label>
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
