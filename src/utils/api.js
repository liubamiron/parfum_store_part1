// Local modules
import ApiError from '../components/error/ApiError';
import { BLOG_TYPES, HOST } from './constants';
import { AuthService } from './authService';

export const api = {};

api.auth = {
  async login (username, password) {
    const formData = new FormData();

    formData.append('username', username);
    formData.append('password', password);

    const res = await fetch(`${HOST}/login/`, {
      method: 'POST',
      body: formData
    });

    const body = await res.json();

    if (res.status !== 200) {
      throw new ApiError(body);
    }

    return body;
  },
  async logout () {
    const res = await fetch(`${HOST}/logout/`, {
      method: 'GET',
      headers: AuthService.getAuthServiceInstance().withAuthHeader()
    });

    const body = await res.json();

    if (res.status !== 200) {
      throw new ApiError(body);
    }

    return body;
  },
  async me (token) {
    const headers = token
      ? { Authorization: `Bearer ${token}` }
      : AuthService.getAuthServiceInstance().withAuthHeader();

    const user = await fetch(`${HOST}/cabinet/me/`, { headers });

    const body = await user.json();

    if (user.status !== 200) {
      throw new ApiError(body);
    }

    return body;
  },
};


api.partner = {
  async getList () {
    const res = await fetch(`${HOST}/users/partner-registration/`, {
      method: 'GET',
      headers: AuthService.getAuthServiceInstance().withAuthHeader(),
    });

    const body = await res.json();

    if (res.status !== 200) {
      throw new ApiError(body);
    }

    return body.data;
  },
};

