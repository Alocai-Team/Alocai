import { useState, useEffect } from 'react';
import '../../styles/Calendario.css';

const Calendario = () => {
  const [departments, setDepartments] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [turns] = useState(['Manhã', 'Tarde', 'Noite']);
  const [scheduleData, setScheduleData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedBuilding, setSelectedBuilding] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('');
  const [selectedTurn, setSelectedTurn] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedWeek, setSelectedWeek] = useState('');

  useEffect(() => {
    // Fetching data from API
    fetch('http://localhost:8000/agendamentos/')
      .then(response => response.json())
      .then(data => {
        setScheduleData(data);
        setFilteredData(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    let filtered = scheduleData;

    // Filtering by department
    if (selectedDepartment) {
      filtered = filtered.filter(item => item.id_usuario.department === selectedDepartment);
    }

    // Filtering by building
    if (selectedBuilding) {
      filtered = filtered.filter(item => item.id_sala.building === selectedBuilding);
    }

    // Filtering by room
    if (selectedRoom) {
      filtered = filtered.filter(item => item.id_sala.id === selectedRoom);
    }

    // Filtering by turn
    if (selectedTurn) {
      filtered = filtered.filter(item => {
        const hour = new Date(item.hora_inicio).getHours();
        if (selectedTurn === 'Manhã') return hour >= 7 && hour < 12;
        if (selectedTurn === 'Tarde') return hour >= 14 && hour < 18;
        if (selectedTurn === 'Noite') return hour >= 18 && hour < 22;
        return false;
      });
    }

    // Filtering by month and year
    if (selectedMonth && selectedYear) {
      filtered = filtered.filter(item => {
        const date = new Date(item.data_inicio);
        return date.getMonth() + 1 === parseInt(selectedMonth) && date.getFullYear() === parseInt(selectedYear);
      });
    }

    // Filtering by week
    if (selectedWeek) {
      filtered = filtered.filter(item => {
        const date = new Date(item.data_inicio);
        const weekNumber = getWeek(date);
        return weekNumber === parseInt(selectedWeek);
      });
    }

    setFilteredData(filtered);
  }, [selectedDepartment, selectedBuilding, selectedRoom, selectedTurn, selectedMonth, selectedYear, selectedWeek, scheduleData]);

  // Helper function to calculate the week number
  const getWeek = (date) => {
    const start = new Date(date.getFullYear(), 0, 1);
    const diff = (date - start + ((start.getDay() + 1) * 86400000)) / 86400000;
    return Math.ceil(diff / 7);
  };

  const columns = [
    { title: 'Horário', dataIndex: 'hora_inicio', key: 'hora_inicio' },
    { title: 'Data', dataIndex: 'data_inicio', key: 'data_inicio' },
    { title: 'Sala', dataIndex: 'id_sala', key: 'id_sala' },
    { title: 'Turno', dataIndex: 'turno', key: 'turno' }
  ];

  // Verificação se todos os filtros foram selecionados
  const allFiltersSelected = selectedDepartment && selectedBuilding && selectedRoom && selectedTurn && selectedMonth && selectedYear && selectedWeek;

  return (
    <div className="container">
      <div className="filters-wrapper">
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
          <label className="filter-label">
            Mês:
            <input 
              type="number" 
              min="1" 
              max="12" 
              onChange={e => setSelectedMonth(e.target.value)} 
              value={selectedMonth} 
            />
          </label>
          <label className="filter-label">
            Ano:
            <input 
              type="number" 
              onChange={e => setSelectedYear(e.target.value)} 
              value={selectedYear} 
            />
          </label>
          <label className="filter-label">
            Semana:
            <input 
              type="number" 
              min="1" 
              max="53" 
              onChange={e => setSelectedWeek(e.target.value)} 
              value={selectedWeek} 
            />
          </label>
        </div>
      </div>

      <div className="table-wrapper">
        {allFiltersSelected ? (
          <table className="table agenda-shadow">
            <thead>
              <tr>
                {columns.map(col => (
                  <th key={col.key}>
                    {col.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {columns.map(col => (
                    <td key={col.key} className={col.key === 'hora_inicio' ? 'time-cell' : ''}>
                      {row[col.dataIndex]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Por favor, selecione todos os filtros para visualizar os agendamentos.</p>
        )}
      </div>
    </div>
  );
};

export default Calendario;
