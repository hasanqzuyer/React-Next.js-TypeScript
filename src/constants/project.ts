const Project = {
  name: 'Brotherhood House',
  version: '1.0.0',
  app: {
    // environment: 'production',
    // environment: 'staging',
    environment: 'development',

    baseUrl: 'http://localhost:8080',
    baseProdUrl: 'https://app.brotherhoodhouse.com',
    baseStageUrl: 'https://app.staging.brotherhoodhouse.com',
  },
  apis: {
    // Production
    // v1: 'https://api.brotherhoodhouse.com',
    // Staging
    // v1: 'https://api.staging.brotherhoodhouse.com',
    // Local/Dev
    v1: 'http://localhost:3000',
  },
  title: {
    prefix: '',
    sufix: ' | Brotherhood House',
  },
};

export default Project;
