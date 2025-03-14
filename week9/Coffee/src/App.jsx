import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Bean from './components/Bean/Bean';
import  Drink from './components/Drink/Drink';
import './App.css';


function App() {
  // This is a JavaScript comment
  return (
    <>
      <Header />
      <h2>Welcome to magic bean!</h2>
      <div class="beans">
      <Bean title="Arabica" img="/Arabica.png"  />
      <Bean title="Robusta" img="/Robusta.png"  />

      </div>
      
      <Drink />
        
      <Footer />
    </>
  );
}

export default App;