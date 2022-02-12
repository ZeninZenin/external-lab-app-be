import { ConfigService } from '@nestjs/config';

export interface Configuration {
  port: number;
  mongoDbUser: string;
  mongoDbPass: string;
  mongoDbClusterUrl: string;
  mongoDbBaseName: string;
  githubOauthClientSecret: string;
  githubOauthClientId: string;
}

export default (): Configuration => ({
  port: 3000,
  mongoDbUser: process.env.MONGO_DB_USER,
  mongoDbPass: process.env.MONGO_DB_PASS,
  mongoDbClusterUrl: process.env.MONGO_DB_CLUSTER_URL,
  mongoDbBaseName: process.env.MONGO_DB_BASE_NAME,
  githubOauthClientId: process.env.GITHUB_OAUTH_CLIENT_ID,
  githubOauthClientSecret: process.env.GITHUB_OAUTH_CLIENT_SECRET,
});

export class AppConfigService extends ConfigService<
  Record<keyof Configuration, string>
> {}
