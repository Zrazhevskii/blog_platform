// import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import PageNotFound from './pages/PageNotFound/index';
import Layout from './components/Layout/index';

function App() {
    // const [count, setCount] = useState(0);

    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="*" element={<PageNotFound />} />
            </Route>
        </Routes>
    );
}

export default App;
