import { create } from "zustand";
import DataService from "../store/services/data.service";
import CloudinaryService from "../store/services/cloudinary.service";

const useDataStore = create((set) => ({
  // Data
  support: [],
  agenda: [],
  botiga: [],
  membership: [],
  about: {},
  cover: [],
  collaborators: [],
  member_projects: [],

  // Loaders
  isManifestoLoading: false,
  isArtistLoading: false,
  isEventsLoading: false,
  isSubscriptionsLoading: false,
  isMemberProjectsLoading: false,
  isAboutLoading: false,
  isCoversLoading: false,
  isArtistsLoading: false,
  isGaleriaLoading: false,
  galleryImages: [],
  isGalleryAlbumLoading: false,
  galleryCovers: {},

  // Actions
  fetchSupport: () => {
    set({ isArtistLoading: true });
    return DataService.supportYourLocalsAll()
      .then((response) => {
        set({ support: response?.data, isArtistLoading: false });
      })
      .catch(() => {
        set({ isArtistLoading: false });
      });
  },

  fetchAgenda: () => {
    set({ isEventsLoading: true });
    return DataService.agendaAll()
      .then((response) => {
        set({ agenda: response?.data, isEventsLoading: false });
      })
      .catch(() => {
        set({ isEventsLoading: false });
      });
  },

  fetchBotiga: () => {
    set({ isArtistsLoading: true });
    return DataService.botigaAll()
      .then((response) => {
        set({ botiga: response?.data, isArtistsLoading: false });
      })
      .catch(() => {
        set({ isArtistsLoading: false });
      });
  },

  fetchMemberships: () => {
    set({ isSubscriptionsLoading: true });
    return DataService.membershipAll()
      .then((response) => {
        set({ membership: response?.data, isSubscriptionsLoading: false });
      })
      .catch(() => {
        set({ isSubscriptionsLoading: false });
      });
  },

  fetchAbout: () => {
    set({ isManifestoLoading: true });
    return DataService.getAbout()
      .then((response) => {
        set({ about: response?.data, isManifestoLoading: false });
      })
      .catch(() => {
        set({ isManifestoLoading: false });
      });
  },

  fetchCover: () => {
    set({ isCoversLoading: true });
    return DataService.getCover()
      .then((response) => {
        set({ cover: response?.data, isCoversLoading: false });
      })
      .catch(() => {
        set({ isCoversLoading: false });
      });
  },

  fetchCollaborators: () => {
    return DataService.getCollaborators().then((response) => {
      set({ collaborators: response?.data });
    });
  },

  fetchMemberProjects: () => {
    set({ isMemberProjectsLoading: true });
    return DataService.getMemberProjects()
      .then((response) => {
        set({ member_projects: response?.data, isMemberProjectsLoading: false });
      })
      .catch(() => {
        set({ isMemberProjectsLoading: false });
      });
  },

  setGaleriaLoading: (value) => set({ isGaleriaLoading: value }),

  fetchGalleryCover: (tag) => {
    return CloudinaryService.fetchImagesByTag(tag)
      .then((response) => {
        const first = response?.data?.resources?.[0];
        if (first) {
          set((state) => ({
            galleryCovers: {
              ...state.galleryCovers,
              [tag]: `${first.public_id}.${first.format}`,
            },
          }));
        }
      })
      .catch(() => {});
  },

  fetchGalleryImages: (tag) => {
    set({ isGalleryAlbumLoading: true, galleryImages: [] });
    return CloudinaryService.fetchImagesByTag(tag)
      .then((response) => {
        set({
          galleryImages: response?.data?.resources || [],
          isGalleryAlbumLoading: false,
        });
      })
      .catch(() => {
        set({ isGalleryAlbumLoading: false });
      });
  },
}));

export default useDataStore;
