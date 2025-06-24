import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useUserStore = create(
  persist(
    (set) => ({
      user: {
        fullName: null,
        email: null,
        phone: null,
        linkedIn: null,
        skills: null,
        summary: null,
      },
      isCalled: false,
      setisCalled: (val) => set({ isCalled: val }),
      setUser: (newUser) =>
        set((state) => ({
          user: {
            ...state.user,
            ...newUser,
          },
        })),
    }),
    {
      name: 'is-called-storage', // key in localStorage
      partialize: (state) => ({ isCalled: state.isCalled }), // ONLY persist isCalled
    }
  )
);
