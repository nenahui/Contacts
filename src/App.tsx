import './styles/App.css';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { Home } from './feautres/Home/Home';

export const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </Layout>
  );
};
