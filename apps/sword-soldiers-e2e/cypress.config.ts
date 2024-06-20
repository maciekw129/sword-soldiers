import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';

import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      webServerCommands: {
        default: 'nx run sword-soldiers:serve:development',
        production: 'nx run sword-soldiers:serve:production',
      },
      ciWebServerCommand: 'nx run sword-soldiers:serve-static',
    }),
    baseUrl: 'http://localhost:4200',
  },
});
