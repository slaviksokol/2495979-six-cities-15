import React from 'react';

import './loader.css';

export function Loader(): React.JSX.Element {
  return (
    <div className="loader-wrap">
      <div className="loader"></div>
    </div>
  );
}
