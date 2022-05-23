import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl from '!mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiYm1hZ2FyaW8iLCJhIjoiY2wzZXhoY3FhMDEyNTNkbXJsbGFub3c1byJ9.KWG39E60Y8oNVncmYhLIOw';

if(!navigator.geolocation) {
  alert('Geolocation is not supported!');
  throw new Error('Geolocation is not supported!');
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
