export interface IKeycloakUser {
  exp: number;
  iat: number;
  jti: string;
  iss: string;
  aud: string[];
  sub: string;
  typ: string;
  azp: string;
  session_state: string;
  acr: string;
  'allowed-origins': string[];
  realm_access: RealmAccess;
  resource_access: ResourceAccess;
  scope: string;
  email_verified: boolean;
  nationalIdentity: string;
  birthDate: string;
  preferred_username: string;
  fhirResourceId: string[];
}

interface RealmAccess {
  roles: string[];
}

interface ResourceAccess {
  fhir: RealmAccess;
  ehealth4umobile: RealmAccess;
}
