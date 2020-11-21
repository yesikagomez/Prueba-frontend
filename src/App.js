import Routes from './Routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import BarNav from './components/BarNav';

function App() {
  return (
    <div>
      <BarNav/>
      <Routes className="justify"/>
    </div>
  );
}

export default App;
