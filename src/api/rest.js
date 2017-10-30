import axios from 'axios';

export default function rest(config) {
  clearTimeout(window.cspSessionTimer);
  window.cspSessionTimerReset();

  return axios(config);
}
