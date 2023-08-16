import './App.css';
import Background from './components/Background/Background';
import Container from './components/Container/Container'
function App() {
  return (
    <div id='parent-background'>
      <div id='background'>
        <Background />
        <Container/>
      </div>
    </div>
  );
}

export default App;
