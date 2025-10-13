import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Leilen Mateo Photography</h3>
            <p className="text-gray-300">
              Capturing life's beautiful moments through professional photography.
            </p>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Editorial Photography</li>
              <li>Portfolio Sessions</li>
              <li>Event Photography</li>
              <li>Product Photography</li>
            </ul>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4">Contact</h4>
            <p className="text-gray-300 mb-2">hello@leilenmateo.com</p>
            <p className="text-gray-300">+1234567890</p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-300">
          <p>&copy; 2024 Leilen Mateo Photography. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
