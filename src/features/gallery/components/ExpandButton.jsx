import React from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';

const ExpandButton = ({ onClick, expanded}) => {
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
      className="group px-4 py-2"
    >
      <span className="inline-block transition-transform duration-200 ease-out group-hover:scale-115">
        {expanded ?
        <svg className='-rotate-45' xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="20" height="20" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev/svgjs"><g width="100%" height="100%" transform="matrix(1,0,0,1,0,0)"><path d="M23.994,23.287L1.707,1H14V0H1.5C.673,0,0,.673,0,1.5V14H1V1.707L23.287,23.994l.707-.707Z" fill="#000000" fill-opacity="1" data-original-color="#000000ff" stroke="none" stroke-opacity="1"/></g></svg> : <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="20" height="20"><path d="M9.854,14.854L1.707,23h6.293v1H1.5c-.827,0-1.5-.673-1.5-1.5v-6.5H1v6.293L9.146,14.146l.707,.707ZM22.5,0h-6.5V1h6.293L14.146,9.146l.707,.707L23,1.707v6.293h1V1.5c0-.827-.673-1.5-1.5-1.5Z"/></svg>}
      </span>
    </button>
  );
};

export default ExpandButton;


