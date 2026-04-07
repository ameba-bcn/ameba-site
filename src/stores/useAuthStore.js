import { create } from "zustand";
import AuthService from "../store/services/auth.service";
import notificationToast from "../utils/utils";
import useProfileStore from "./useProfileStore";
import useCartStore from "./useCartStore";
import { safeLocalStorage } from "../utils/safeStorage";

const access = safeLocalStorage.getItem("access");
const refresh = safeLocalStorage.getItem("refresh");

const defaultUserData = {
  username: "",
  password: "",
  email: "",
  member: "",
  date_joined: "",
};

const defaultMemberData = {
  address: "",
  first_name: "",
  last_name: "",
  number: 0,
  phone_number: "",
  user: 0,
};

const useAuthStore = create((set) => ({
  isLoggedIn: !!access,
  user: access ? { access, refresh } : null,
  user_data: { ...defaultUserData },
  user_member_data: { ...defaultMemberData },

  register: (registerData) => {
    return AuthService.register(registerData).then(
      (response) => {
        set({ isLoggedIn: false });
        notificationToast(response.data.message, "success");
      },
      (error) => {
        const message = error.response?.data.email;
        set({ isLoggedIn: false });
        notificationToast(message, "error");
        return Promise.reject();
      },
    );
  },

  login: (username, password) => {
    return AuthService.login(username, password).then(
      (data) => {
        set({ isLoggedIn: true, user: data });
        useProfileStore.getState().setLoggedUser();
      },
      (error) => {
        const message = error.response?.data?.detail;
        set({ isLoggedIn: false, user: null });
        useProfileStore.getState().setGuestUser();
        notificationToast(message, "error");
        return Promise.reject();
      },
    );
  },

  validateLocalToken: (token) => {
    return AuthService.validateLocalToken(token).then(
      (response) => {
        set({ isLoggedIn: true, user: response.data });
      },
      (error) => {
        const message = error.response?.data?.detail;
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("cart_id");
        set({ isLoggedIn: false, user: null });
        return Promise.reject(message);
      },
    );
  },

  getUserData: () => {
    return AuthService.getUserData().then(
      (data) => {
        set({ user_data: data });
        return data;
      },
      (error) => {
        const message = error.response?.data?.detail;
        set({ user_data: { ...defaultUserData } });
        notificationToast(message, "error");
        return Promise.reject();
      },
    );
  },

  getMemberProfile: () => {
    return AuthService.getMemberProfile().then(
      (response) => {
        set({ user_member_data: response });
        if (response?.type === "Socio") {
          useProfileStore.getState().setMember();
        }
      },
      (error) => {
        const message = error.response?.data.detail;
        set({ user_member_data: {} });
        return Promise.reject(message);
      },
    );
  },

  updateMemberProfile: (
    identity_card,
    first_name,
    last_name,
    phone_number,
    username,
  ) => {
    return AuthService.updateMemberProfile(
      identity_card,
      first_name,
      last_name,
      phone_number,
      username,
    ).then(
      (response) => {
        set({ user_member_data: response });
        notificationToast("Update data member success", "success");
      },
      (error) => {
        const message = error.response?.data.detail;
        notificationToast(message, "error");
        return Promise.reject();
      },
    );
  },

  createMemberProfile: (identity_card, first_name, last_name, phone_number) => {
    return AuthService.createMemberProfile(
      identity_card,
      first_name,
      last_name,
      phone_number,
    ).then(
      (response) => {
        set({ user_member_data: response });
      },
      (error) => {
        const message = error.response?.data;
        notificationToast(JSON.stringify(message), "error");
        return Promise.reject();
      },
    );
  },

  validateEmail: (token) => {
    return AuthService.validateEmail(token).then(
      (data) => {
        if (data?.access) {
          set({ isLoggedIn: true, user: data });
          useProfileStore.getState().setLoggedUser();
        }
      },
      (error) => {
        const message = error.response?.data?.detail;
        notificationToast(JSON.stringify(message), "error");
        return Promise.reject();
      },
    );
  },

  passwordRecovery: (token, password) => {
    return AuthService.passwordRecovery(token, password).then(
      (response) => {
        const message = response.detail;
        notificationToast(message, "success");
      },
      (error) => {
        const message = error.response?.data?.detail;
        notificationToast(message, "error");
        return Promise.reject();
      },
    );
  },

  sendEmailPasswordRecovery: (email) => {
    return AuthService.sendEmailPasswordRecovery(email).then(
      (response) => {
        const message = response.detail;
        notificationToast(message, "success");
      },
      (error) => {
        const message = error.response?.data?.detail;
        notificationToast(message, "error");
        return Promise.reject();
      },
    );
  },

  logout: () => {
    AuthService.logout().then(
      () => {
        set({
          isLoggedIn: false,
          user: null,
          user_data: { ...defaultUserData },
        });
        useCartStore.getState().clearCart();
        useProfileStore.getState().setGuestUser();
      },
      (error) => {
        const message = error.response?.data;
        set({
          isLoggedIn: false,
          user: null,
          user_data: { ...defaultUserData },
        });
        useCartStore.getState().clearCart();
        useProfileStore.getState().setGuestUser();
        notificationToast(message, "error");
      },
    );
  },

  deleteUser: () => {
    return AuthService.deleteUser().then(
      () => {},
      (error) => {
        const message = error.response?.data?.detail;
        return Promise.reject(message);
      },
    );
  },
}));

export default useAuthStore;
