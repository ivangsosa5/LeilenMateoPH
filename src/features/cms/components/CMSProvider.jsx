import React, { useEffect } from 'react';
import CMS from 'netlify-cms-app';

const CMSProvider = ({ children }) => {
  useEffect(() => {
    // Initialize Netlify CMS
    if (typeof window !== 'undefined') {
      CMS.init({
        config: {
          load_config_file: true,
        },
      });
    }
  }, []);

  return <>{children}</>;
};

export default CMSProvider;
