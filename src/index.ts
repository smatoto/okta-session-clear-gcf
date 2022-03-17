import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import * as SessionService from './services/session.service';
import * as CookieScript from './scripts/cookie';
import app from './config/app';

// Get functions configuration
const { region } = app;

// Initialize firebase
admin.initializeApp();

// Set Cloud Functions runtime options
const runtimeOpts = {
  timeoutSeconds: 540,
};

/**
 * Exchange session token for session cookie and clear sessions
 * @param {any} req request data
 * @param {any} res response data
 * @returns {object} response
 */
export const clearSession = functions
  .runWith(runtimeOpts)
  .region(region)
  .https.onRequest(async (req: any, res: any) => {
    try {
      let sessionCookie, results;
      const { cookie } = req.headers;
      if (cookie) {
        sessionCookie = await CookieScript.get(cookie);
        results = await SessionService.clear(sessionCookie);
      }
      res.status(200).json({ sessionCookie, status: results?.status, statusText: results?.statusText });
    } catch (error) {
      const {
        response: { data, status },
      } = error as any;
      console.error({ status, data });
      res.status(400).json({ status, data });
    }
  });
