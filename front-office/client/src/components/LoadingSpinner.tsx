import React from 'react';
import '../assets/css/LoadingSpinner.css';

export const LoadingSPinner1: React.FC = () => (
  <div className="spinner-container">
    <div className="loader-wrapper">
      <div className="loader">
        <div className="loader loader-inner"></div>
      </div>
    </div>
  </div>
);

export const LoadingSPinner2: React.FC = () => (
  <div className="spinner-container">
    <div className="loading">
      <span />
      <span />
      <span />
      <span />
      <span />
    </div>
  </div>
);

const LoadingSpinner: React.FC = () => (
  <div className="spinner-container">
    <div className="spinner"></div>
  </div>
);

export default LoadingSpinner;
