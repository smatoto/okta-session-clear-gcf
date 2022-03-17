/**
 * Get session cookie
 * @param {string} cookie
 * @returns {Promise<object>}
 */
export const get = async (cookie: string): Promise<string> => {
  const cookies: any = cookie.split(';').reduce((res: any, item: any) => {
    const [name, value] = item.trim().split('=');
    return { ...res, [name]: value };
  }, {});
  return cookies.sid;
};
