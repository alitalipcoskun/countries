
import './App.css';
import 'primereact/resources/themes/fluent-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import Table from './Components/Table/Table';
import { TableContext } from './Components/Context/TableContext';
import { useContext, useEffect } from 'react';

import { Panel } from 'primereact/panel';





function App() {
  const context = useContext(TableContext);
  const { keys, data, fetchData } = context;

  useEffect(() => {
    fetchData();

  }, [fetchData])


  const display_data = [];
  for (let i = 0; i < data.length; ++i) {
    if (data[i]['isActive'] === 1) {
      display_data.push(data[i]);
    }
  }

  return (

    <div className="App">
        <Panel header = "Countries">
          <Table data={display_data} keys={keys}></Table>
        </Panel>
    </div>

  );
}

export default App;
