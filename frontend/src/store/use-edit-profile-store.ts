import { create } from "zustand";

interface EditProfileModalState {
  close: () => void;
  isOpen: boolean;
  open: () => void;
}

export const useEditProfileStore = create<EditProfileModalState>((set) => ({
  close: () => set({ isOpen: false }),
  isOpen: false,
  open: () => set({ isOpen: true }),
}));
