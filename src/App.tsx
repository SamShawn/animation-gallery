import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* 预留更多路由扩展 */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;