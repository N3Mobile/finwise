import * as Constants from 'expo-constants';

export const Config = {
  API_URL: Constants.default.expoConfig?.hostUri
  ? 'http://' + Constants.default.expoConfig.hostUri.split(':').shift()?.concat(':3000') + '/'
  : 'finwise.n3.com',
};
