const config = {
  development: {
    apiBaseUrl: 'http://localhost:8080'
  },
  staging: {
    apiBaseUrl: 'https://stg-api.example.com'
  },
  production: {
    apiBaseUrl: 'https://api.example.com'
  }
};

const env = import.meta.env.MODE || 'development';
const currentConfig = config[env];

export default currentConfig;