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

export const LoadingArtcile: React.FC<{ idx: number }> = ({ idx }) => (
  <div
    key={idx}
    className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-100 animate-pulse flex flex-col"
    style={{ minHeight: 320 }}
  >
    <div className="bg-gray-200 w-full h-48" />
    <div className="p-4 flex-1 flex flex-col justify-between">
      <div>
        <div className="h-6 w-3/4 bg-gray-200 rounded mb-4" />
        <div className="flex gap-2 mb-3">
          <div className="h-5 w-20 bg-gray-100 rounded-full" />
          <div className="h-5 w-16 bg-gray-100 rounded-full" />
          <div className="h-5 w-12 bg-gray-100 rounded-full" />
        </div>
      </div>
      <div className="h-6 w-1/3 bg-gray-200 rounded mt-4" />
    </div>
  </div>
)

const LoadingSpinner: React.FC = () => (
  <div className="spinner-container">
    <div className="spinner"></div>
  </div>
);

export default LoadingSpinner;
