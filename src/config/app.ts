import * as functions from 'firebase-functions';

// Get env variables
const { env, host, region, okta_base_url } = functions.config().app;
const { projectId } = JSON.parse(process.env.FIREBASE_CONFIG!);

const appConfig = {
  env,
  host,
  region,
  projectId,
  okta_base_url,
};
export default appConfig;
