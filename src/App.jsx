import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './shared/components/NavBar';
import Footer from './shared/components/Footer';
import HomePage from './features/homePage/components/HomePage';
import AdminButton from './features/cms/components/AdminButton';
import CMSProvider from './features/cms/components/CMSProvider';
import AdminPage from './features/cms/components/AdminPage';
import CategoryView from './features/gallery/components/CategoryView';
import Contact from './features/contact/components/Contact';
import './App.css';

function App() {
  return (
    <CMSProvider>
      <Router>
        <div className="min-h-screen flex flex-col w-full">
          <NavBar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/gallery/:categorySlug" element={<CategoryView />} />
              <Route path="/contact" element={<Contact/>} />
            </Routes>
          </main>
          <Footer />
          <AdminButton />
        </div>
      </Router>
    </CMSProvider>
  );
}

export default App;