interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
  readonly NODE_ENV: string;
  readonly NG_APP_AUTH0_DOMAIN: string;
  readonly NG_APP_AUTH0_CLIENT_ID: string;
  readonly NG_APP_AUTH0_SCOPE: string;
  readonly NG_APP_AUTH0_AUDIENCE: string;
}
