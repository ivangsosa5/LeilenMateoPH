import React from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';

const ExpandButton = ({ onClick, expanded }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const handleClick = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    
    if (expanded) {
      newSearchParams.delete('view');
    } else {
      newSearchParams.set('view', 'expanded');
    }
    
    const newUrl = `${location.pathname}${newSearchParams.toString() ? `?${newSearchParams.toString()}` : ''}`;
    navigate(newUrl);
    
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      data-testid="expand-button"
      onClick={handleClick}
      aria-expanded={expanded}
      aria-label={expanded ? 'Collapse gallery view' : 'Expand gallery view'}
      tabIndex={0}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
    >
      {expanded ? 'Collapse' : 'Expand'}
    </button>
  );
};

export default ExpandButton;


