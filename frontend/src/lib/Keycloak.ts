import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'http://localhost:9080',
  realm: 'RealtorBGRealm',
  clientId: 'realtor-bg-client'
});

export default keycloak;