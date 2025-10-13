import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './shared/components/NavBar';
import Footer from './shared/components/Footer';
import HomePage from './features/homePage/components/HomePage';
import AdminButton from './features/cms/components/AdminButton';
import CMSProvider from './features/cms/components/CMSProvider';
import './App.css';

function App() {
  return (
    <CMSProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <NavBar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              {/* Add more routes as needed */}
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