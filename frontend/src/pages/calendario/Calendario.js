import { useState, useEffect } from 'react';
import '../../styles/Calendario.css';


const Calendario = () => {
  const [departments, setDepartments] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [turns] = useState(['Manhã', 'Tarde', 'Noite']);
  
  const [selectedDepartment, setSelectedDepartment] = useState(3); // Departamento de Computação por default
  const [selectedBuilding, setSelectedBuilding] = useState(3); // Prédio Ceagri 1 por default
  const [selectedRoom, setSelectedRoom] = useState(1); // Sala 101 por default
  const [selectedTurn, setSelectedTurn] = useState('');
  const [scheduleData, setScheduleData] = useState([]);
  const [scheduleTimes, setScheduleTimes] = useState([]);

  useEffect(() => {
    setDepartments([
      { id: 1, name: 'Departamento de Matemática' },
      { id: 2, name: 'Departamento de Física' },
      { id: 3, name: 'Departamento de Computação' }
    ]);
    setBuildings([
      { id: 1, name: 'Prédio A' },
      { id: 2, name: 'Prédio B' },
      { id: 3, name: 'Ceagri 1' }
    ]);
    setRooms([
      { id: 1, name: 'Sala 101' },
      { id: 2, name: 'Sala 102' },
      { id: 3, name: 'Sala 103' }
    ]);

    const turnTimes = {
      'Manhã': [
        '07:00 - 08:00',
        '08:00 - 09:00',
        '09:00 - 10:00',
        '10:00 - 11:00',
        '11:00 - 12:00',
        '12:00 - 13:00'
      ],
      'Tarde': [
        '14:00 - 15:00',
        '15:00 - 16:00',
        '16:00 - 17:00',
        '17:00 - 18:00'
      ],
      'Noite': [
        '18:00 - 19:00',
        '19:00 - 20:00',
        '20:00 - 21:00',
        '21:00 - 22:00'
      ]
    };

    // Exemplo de agenda com nome e uso da sala
    const exampleSchedules = {
      'Sala 101': {
        'Manhã': [
          { time: '07:00 - 08:00', mon: 'João - Reunião', tue: 'Maria - Aula', wed: 'Pedro - Pesquisa', thu: '', fri: 'Ana - Aula' },
          { time: '08:00 - 09:00', mon: 'Marcos - Reunião', tue: '', wed: 'Beatriz - Aula', thu: '', fri: '' }
        ],
        'Tarde': [
          { time: '14:00 - 15:00', mon: 'Lucas - Treinamento', tue: '', wed: 'Carla - Aula', thu: '', fri: 'Fernanda - Reunião' }
        ],
        'Noite': [
          { time: '18:00 - 19:00', mon: 'Renato - Aula', tue: '', wed: '', thu: 'Juliana - Reunião', fri: '' }
        ]
      },
      'Sala 102': {
        'Manhã': [
          { time: '07:00 - 08:00', mon: 'Paulo - Pesquisa', tue: '', wed: 'Matheus - Reunião', thu: 'Lucas - Aula', fri: '' },
          { time: '08:00 - 09:00', mon: '', tue: 'Bianca - Treinamento', wed: '', thu: 'Carlos - Reunião', fri: '' }
        ],
        'Tarde': [
          { time: '14:00 - 15:00', mon: '', tue: 'Débora - Aula', wed: '', thu: '', fri: 'Clara - Pesquisa' }
        ],
        'Noite': [
          { time: '18:00 - 19:00', mon: '', tue: '', wed: 'Rafael - Aula', thu: '', fri: 'Fernanda - Reunião' }
        ]
      },
      'Sala 103': {
        'Manhã': [
          { time: '07:00 - 08:00', mon: 'Ricardo - Reunião', tue: 'Camila - Pesquisa', wed: '', thu: '', fri: 'Carlos - Aula' },
          { time: '08:00 - 09:00', mon: 'Sofia - Treinamento', tue: '', wed: 'Renato - Aula', thu: '', fri: '' }
        ],
        'Tarde': [
          { time: '14:00 - 15:00', mon: 'Juliana - Pesquisa', tue: '', wed: 'Ana - Reunião', thu: '', fri: '' }
        ],
        'Noite': [
          { time: '18:00 - 19:00', mon: '', tue: 'Fábio - Aula', wed: '', thu: 'Roberta - Treinamento', fri: '' }
        ]
      }
    };

    if (selectedTurn && selectedRoom) {
      const selectedRoomName = rooms.find(room => room.id == selectedRoom)?.name || 'Sala 101';
      setScheduleTimes(turnTimes[selectedTurn]);
      setScheduleData(exampleSchedules[selectedRoomName][selectedTurn] || []);
    }
  }, [selectedTurn, selectedRoom]);

  const columns = [
    { title: 'Horário', dataIndex: 'time', key: 'time' },
    { title: 'Segunda-feira', dataIndex: 'mon', key: 'mon' },
    { title: 'Terça-feira', dataIndex: 'tue', key: 'tue' },
    { title: 'Quarta-feira', dataIndex: 'wed', key: 'wed' },
    { title: 'Quinta-feira', dataIndex: 'thu', key: 'thu' },
    { title: 'Sexta-feira', dataIndex: 'fri', key: 'fri' }
  ];

  const filledScheduleData = scheduleTimes.map(time => {
    const existing = scheduleData.find(item => item.time === time);
    return existing || { time, mon: '', tue: '', wed: '', thu: '', fri: '' };
  });

  return (
    <div className="container">
      <div className="filters-wrapper"> {/* Filtros separados */}
        <div className="filters">
          <label className="filter-label">
            Departamento:
            <select 
              className="filter-select"
              onChange={e => setSelectedDepartment(e.target.value)} 
              value={selectedDepartment}
            >
              <option value="">Selecione</option>
              {departments.map(dept => (
                <option key={dept.id} value={dept.id}>{dept.name}</option>
              ))}
            </select>
          </label>
          <label className="filter-label">
            Prédio:
            <select 
              className="filter-select"
              onChange={e => setSelectedBuilding(e.target.value)} 
              value={selectedBuilding}
            >
              <option value="">Selecione</option>
              {buildings.map(build => (
                <option key={build.id} value={build.id}>{build.name}</option>
              ))}
            </select>
          </label>
          <label className="filter-label">
            Sala:
            <select 
              className="filter-select"
              onChange={e => setSelectedRoom(e.target.value)} 
              value={selectedRoom}
            >
              <option value="">Selecione</option>
              {rooms.map(room => (
                <option key={room.id} value={room.id}>{room.name}</option>
              ))}
            </select>
          </label>
          <label className="filter-label">
            Turno:
            <select 
              className="filter-select"
              onChange={e => setSelectedTurn(e.target.value)} 
              value={selectedTurn}
            >
              <option value="">Selecione</option>
              {turns.map(turn => (
                <option key={turn} value={turn}>{turn}</option>
              ))}
            </select>
          </label>
        </div>
      </div>
      <div className="table-wrapper">
        <table className="table agenda-shadow">
          <thead>
            <tr>
              {columns.map(col => (
                <th 
                  key={col.key} 
                >
                  {col.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filledScheduleData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map(col => (
                  <td 
                    key={col.key} 
                    className={col.key === 'time' ? 'time-cell' : ''}
                  >
                    {row[col.dataIndex]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Calendario;
