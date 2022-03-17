import axios from 'axios';
import app from '../config/app';

// Get app config
const { region, okta_base_url, projectId } = app;

/**
 * Clear current User sessions
 * @param sessionCookie
 */
export const clear = async (sessionCookie: string) => {
  const url = `${okta_base_url}/api/v1/users/me/lifecycle/delete_sessions`;

  // Set request config
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Cookie: `sid=${sessionCookie}`,
      Origin: `https://${region}-${projectId}.cloudfunctions.net`,
    },
    withCredentials: true,
  };

  // Send clear request
  const { status, statusText } = await axios.post(
    url,
    {
      keepCurrent: true,
    },
    config,
  );
  return { status, statusText };
};
