import request from '../index';
import api from '../api';

const getUser = (params?: any) => request(api.getUser, params);
getUser.url = api.getUser.url;

export default getUser;
