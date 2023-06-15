import './App.css';
import axios from 'axios'

//Tokens autenticación
axios.defaults.xsrfCookieName = 'crsftoken';
axios.defaults.xsrfHeaderName = 'X-CSRDToken';
axios.defaults.withCredentials = true;



function App() {
  return (
    <div className="App">
          Learn React
    </div>
  );
}

export default App;
