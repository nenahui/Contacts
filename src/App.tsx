import './styles/App.css';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { ContactForm } from './feautres/ContactForm/ContactForm';
import { Home } from './feautres/Home/Home';

export const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/new-contact' element={<ContactForm />} />
        <Route path='contact/:id/edit' element={<ContactForm />} />
      </Routes>
    </Layout>
  );
};
