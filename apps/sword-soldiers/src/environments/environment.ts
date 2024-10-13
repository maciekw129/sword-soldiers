import { Environment } from './environment.model';

export const environment: Environment = {
  authConfig: {
    domain: import.meta.env.NG_APP_AUTH0_DOMAIN,
    clientId: import.meta.env.NG_APP_AUTH0_CLIENT_ID,
    authorizationParams: {
      redirect_uri: 'http://localhost:4200/',
      audience: import.meta.env.NG_APP_AUTH0_AUDIENCE,
      scope: import.meta.env.NG_APP_AUTH0_SCOPE,
    },
    httpInterceptor: {
      allowedList: [
        {
          uri: '*',
          tokenOptions: {
            authorizationParams: {
              audience: import.meta.env.NG_APP_AUTH0_AUDIENCE,
              scope: import.meta.env.NG_APP_AUTH0_SCOPE,
            },
          },
        },
      ],
    },
  },
};
