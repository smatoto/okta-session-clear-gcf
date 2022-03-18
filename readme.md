# Okta Sample Callback for Clearing Session

This function is a sample implementation of the following Okta processes:

- [Retrieve a session cookie through the OpenID Connect authorization endpoint](https://developer.okta.com/docs/guides/session-cookie/main/#retrieve-a-session-cookie-through-the-openid-connect-authorization-endpoint)
- [Clear current User sessions](https://developer.okta.com/docs/reference/api/users/#clear-current-user-sessions)

## Pre-deployment Requirements

### Firebase configuration

The following are required to be prepared prior to deployment and will be set as [environment configurations in Firebase](https://firebase.google.com/docs/functions/config-env#set_environment_configuration_with_the).

- **NODE_ENV** - The node environment: 'prod' | 'staging' | 'dev'
- **PROJECT_ID** - The GCP or Firebase project ID
- **REGION** - The GCP region where the GCF will be deployed (i.e. asia-southeast1)
- **BASE_URL** - The [Okta org / base url](https://developer.okta.com/docs/concepts/okta-organizations/#org-urls) (i.e. https://companyname.oktapreview.com)

## Build Setup

```bash
# install dependencies
$ npm install

# Configure Firebase project, select the project and follow the prompt afterwards
$ firebase use --add

# Set environment configuration with the Firebase CLI
$ firebase functions:config:set --project $PROJECT_ID app.env=$NODE_ENV app.region=$REGION app.okta_base_url=$BASE_URL

# build for production and launch server
$ firebase deploy --only functions
```

## Okta configuration

The following must be configured in Okta to prevent any issues with the API calls.

- Add the GCF trigger URL into the Okta app's sign-in redirect URIs (see Resolution Step #2 on [this guide](https://support.okta.com/help/s/article/The-redirect-uri-parameter-must-be-an-absolute-URI?language=en_US))
- Add the GCF trigger base URL (i.e. https://asia-southeast1-functionname.cloudfunctions.net/) into the Okta tenant's [Trusted Origin config](https://help.okta.com/en-us/Content/Topics/Security/API-trusted-origins.htm#:~:text=Click%20Add%20Origin.,using%20the%20Okta%20session%20cookie.)
