import { create } from "zustand";
import profileService from "../store/services/profile.services";
import notificationToast from "../utils/utils";

const useProfileStore = create((set) => ({
  user_profile: "",
  images: [],

  setGuestUser: () => set({ user_profile: "GUEST" }),
  setLoggedUser: () => set({ user_profile: "LOGGED" }),
  setMember: () => set({ user_profile: "MEMBER" }),

  addImage: (url) =>
    set((state) => ({ images: [...state.images, url] })),

  subscribeNewsletter: (email) => {
    return profileService.subscribeNewsletter(email).then(
      (response) => {
        const message = response?.data.detail;
        notificationToast(message, "success");
      },
      (error) => {
        const message = error.response?.data?.email;
        notificationToast(message, "error");
      }
    );
  },
}));

export default useProfileStore;
