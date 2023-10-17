// Package modules
import UniversalCookie from 'universal-cookie';

// Local modules
import { api } from './api'; // eslint-disable-line import/no-cycle

let authServiceInstance = null;

// Exports
export class AuthService {
  constructor() {
    this.cookies = new UniversalCookie();
    this.authToken = this.cookies.get('token') || null;
    this.authenticatedUser = null;
  }

  static getAuthServiceInstance() {
    if (!authServiceInstance) {
      authServiceInstance = new AuthService();
    }

    return authServiceInstance;
  }

  setQueryClient(newQueryClient) {
    this.queryClient = newQueryClient;
  }

  /**
   * @param {string} username
   * @param {string} password
   * @param {function} [onSuccess] - An optional async function that will be awaited
   * after a successfull login, but before updating the token/redirecting
   */
  async login(username, password, userType, onSuccess) {
    const { access_token } = await api.auth.login(username, password, userType);
    if (onSuccess) {
      await onSuccess();
    }
    const { data } = await api.auth.me(access_token);
    this._updateAuth(access_token, { ...data });
  }

  _updateAuth(token, user) {
    this.cookies.set('token', token, { path: '/' });
    this.authToken = token;

    this.authenticatedUser = user;
    if (this.notifyOnUserUpdate) {
      this.notifyOnUserUpdate(this.authenticatedUser);
    }
  }

  async logout() {
    try {
      await api.auth.logout();
    } catch (e) {
      console.log("👉 async logout()", e, "👈")
    }

    // Remove token/user even if the logout API call failed.
    this.queryClient?.clear();
    this.cookies.remove('token', { path: '/' });
    this.authToken = null;
    this.authenticatedUser = null;
    this.notifyOnUserUpdate(null);
  }

  // Determine whether or not we have both an auth token and an authenticated user.
  // If we have an auth token but not a user entity, try to fetch the user.
  async isLoggedIn() {
    // Update the token with the latest cookie token.
    const latestToken = this.cookies.get('token') || null;
    if (this.authToken !== latestToken) {
      this.authToken = latestToken;
      this.authenticatedUser = null; // Refetched below.
    }

    if (this.authToken === null) {
      return false;
    }

    if (!this.authenticatedUser) {
      try {
        const { data } = await api.auth.me(this.authToken);
        this.authenticatedUser = data;
      } catch (e) {
        this.authToken = null;
        this.authenticatedUser = null;
      }

      if (this.notifyOnUserUpdate) {
        this.notifyOnUserUpdate(this.authenticatedUser);
      }
    }

    return !!this.authenticatedUser;
  }

  // eslint-disable-next-line class-methods-use-this
  // async forgotPassword(email, onSuccess) {
  //   const data = await api.auth.forgotPassword(email);
  //   if (onSuccess) {
  //     await onSuccess(data);
  //   }
  //   return data;
  // }
  //
  // // eslint-disable-next-line class-methods-use-this
  // async resetPassword(newPassword, resetToken, onSuccess) {
  //   const data = await api.auth.resetPassword(newPassword, resetToken);
  //   if (onSuccess) {
  //     await onSuccess(data);
  //   }
  //   return data;
  // }

  // The callback will be called when the authenticated user is updated.
  subscribe(callback) {
    this.notifyOnUserUpdate = callback;
  }

  getAuthenticatedUser() {
    return this.authenticatedUser;
  }

  setAuthenticatedUser(user) {
    this.authenticatedUser = user;
  }

  withAuthHeader(headers = {}) {
    return {
      ...headers,
      Authorization: `Bearer ${this.authToken}`
    };
  }
}
