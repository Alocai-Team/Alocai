import React, { useState, useEffect } from 'react';
import Star from '../../assets/star.png';
import '../../styles/Alocar.css';

export default function Alocar() {
  const [selectedUniversidade, setUniversidade] = useState('');
  const [predios, setPredios] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [salas, setSalas] = useState([]);
  const [selectedPredio, setSelectedPredio] = useState('');
  const [selectedDepartamento, setSelectedDepartamento] = useState('');
  const [selectedSala, setSelectedSala] = useState('');
  const [selectedTurno, setSelectedTurno] = useState('');
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [horaInicio, setHoraInicio] = useState('');
  const [horaFim, setHoraFim] = useState('');
  const [isLoading, setIsLoading] = useState({ predios: true, salas: true, departamentos: true });
  const [filteredDepartamentos, setFilteredDepartamentos] = useState([]);
  const [filteredPredios, setFilteredPredios] = useState([]);
  const [filteredSalas, setFilteredSalas] = useState([]);

  // Carrega prédios e salas
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

  // Filtra departamento com base na universidade
  useEffect(() => {
    if (selectedUniversidade) {
      const filtrados = departamentos.filter(departamento => departamento.universidade === selectedUniversidade);
      setFilteredDepartamentos(filtrados);
    } else {
      setFilteredDepartamentos([]);
    }
  }, [selectedUniversidade, departamentos]);

  // Filtra prédio com base nos departamentos
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
    } else {
      setFilteredPredios([]);
    }
  }, [selectedDepartamento]);

  // Filtra salas com base nos prédios
  useEffect(() => {
    if (selectedPredio) {
      setIsLoading(prev => ({ ...prev, salas: true }));
      fetch(`http://localhost:8000/api/salas/?predio=${selectedPredio}`)
        .then(response => response.json())
        .then(data => {
          setFilteredSalas(data);
          setIsLoading(prev => ({ ...prev, salas: false }));
        })
        .catch(error => {
          console.error('Erro ao carregar salas:', error);
          setIsLoading(prev => ({ ...prev, salas: false }));
        });
    } else {
      setFilteredSalas([]);
    }
  }, [selectedPredio]);

  // Envia o agendamento
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    /*if (!token) {
      alert('Você precisa estar logado.');
      return;
    }*/

    try {
      // Decodifica o token JWT para obter o user_id
      //const decodedToken = JSON.parse(atob(token.split('.')[1]));
      //const usuarioId = decodedToken.user_id;

      if (!selectedDepartamento || !selectedPredio || !selectedSala || !selectedTurno || !dataInicio || !dataFim || !horaInicio || !horaFim) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
      }
      const access_token = localStorage.getItem('access_token'); // Assumindo que o token está armazenado no localStorage
      const id_atual = localStorage.getItem('userId');
      const agendamento = {
        id_usuario: id_atual,
        universidade:selectedUniversidade.id,
        departamento: selectedDepartamento.id,
        predio: selectedPredio.id,
        sala: selectedSala.id,
        turno: selectedTurno,
        datahora_inicio: `${dataInicio}T${horaInicio}`,
        datahora_fim: `${dataFim}T${horaFim}`,
        status: 'Em análise', // Status inicial
      };

      const response = await fetch('http://localhost:8000/api/solicitacoes/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`,
        },
        body: JSON.stringify(agendamento),
      });

      if (!response.ok) {
        throw new Error('Erro ao enviar agendamento.');
      }

      const data = await response.json();
      console.log('Agendamento criado com sucesso:', data);
      // Aqui você pode adicionar uma mensagem de sucesso ou redirecionar o usuário
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
            <select id="universidade" value={selectedUniversidade} onChange={(e) => setUniversidade(e.target.value)}>
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
            <select id="sala" value={selectedSala} onChange={(e) => setSelectedSala(e.target.value)} disabled={!selectedPredio || isLoading.salas}>
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
          <label htmlFor="dataFim">Data de Fim
            <input type="date" id="dataFim" value={dataFim} onChange={(e) => setDataFim(e.target.value)} />
          </label>
          <label htmlFor="horaFim">Hora de Fim
            <input type="time" id="horaFim" value={horaFim} onChange={(e) => setHoraFim(e.target.value)} />
          </label>
        </form>
        <button onClick={handleSubmit} >Enviar</button>
      </div>
      <h2 style={{color:'#003366',fontWeight:'bold',position:'relative', top:'1.5rem'}}>alocai</h2>

    </div>
  );
}
