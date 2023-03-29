import dotenv from 'dotenv';

dotenv.config();

export default {
  isDev: () => process.env.NODE_ENV === 'development',
  isProd: () => process.env.NODE_ENV === 'production',
  restrictToServer: () => {
    if (typeof window !== 'undefined') {
      throw new Error('This module is restricted to server-side!');
    }
  },
};
