import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from './pages/Main';
import GetRest from './components/getRest'
import PostRest from './components/postRest'
import PostSoa from './components/postSoa';
import GetSoa from './components/getSoa';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
    <Main></Main>
      <Routes>
        <Route path="getRest" element={<GetRest />} />
        <Route path="postRest" element={<PostRest />} />
        <Route path="getSoap" element={<GetSoa />} />
        <Route path="postSoap" element={<PostSoa />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
