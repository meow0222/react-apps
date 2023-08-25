import ContactForm from './components/ContactForm';
import Calendar from './components/Calendar';
import Header from './components/Header';
import Navbar from './components/Navbar';
import TodoContainer from './components/TodoContainer';
import './App.css';


const App = () => {
  return(
    <div>
      <Navbar />
      <Header />
      <TodoContainer />
      <Calendar />
      CONTACT FORM
      <ContactForm/>
    </div>
  );
};

export default App;