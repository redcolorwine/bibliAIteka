import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/footer/Footer';
import Header from './components/header/header';
import AboutBook from './pages/aboutBook/AboutBook';
import Education from './pages/Education/Education';
import Fiction from './pages/Fiction/Fiction';
import Main from './pages/Main/Main';
import News from './pages/News/News';
import Search from './pages/Search/Search';

function App() {
  return (
    <div className="App">
      <div className="app-wrapper">
        <Header />
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/new' element={<News />} />
          <Route path='/fiction' element={<Fiction />} />
          <Route path='/education' element={<Education />} />
          <Route path='/search/:query' element={<Search />} />
          <Route path='/book/:id' element={<AboutBook />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;
