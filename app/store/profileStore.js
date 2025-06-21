import { create } from 'zustand';
import mockProfiles from '../Data/mockprofiles.json'; // Import mock profiles from JSON file

const useProfileStore = create((set, get) => ({
  profiles: [],
  currentIndex: 0,
  isLoading: false,
  swipeHistory: [],
  isInitialized: false,
  isModalOpen: false, // Track modal state

  // Set modal state
  setModalOpen: (isOpen) => set({ isModalOpen: isOpen }),

  // Enhanced swipe profile with safety checks
  swipeProfile: (direction) => {
    const state = get();

    // Prevent swipes while modal is open or during loading
    if (state.isModalOpen || state.isLoading) {
      console.log('Swipe blocked: modal open or loading');
      return;
    }

    const currentProfile = state.profiles[state.currentIndex];

    if (!currentProfile) {
      console.warn('No current profile available');
      return;
    }

    try {
      // Update state with error handling
      set((prevState) => ({
        swipeHistory: [
          ...prevState.swipeHistory,
          {
            profileId: currentProfile.id,
            direction,
            timestamp: Date.now(),
          },
        ],
        currentIndex: prevState.currentIndex + 1,
      }));

      // Handle async operations with delay to prevent race conditions
      setTimeout(() => {
        const updatedState = get();

        // Send swipe to server
        get().sendSwipeToServer(currentProfile.id, direction);

        // Check if we need more profiles
        if (updatedState.profiles.length - updatedState.currentIndex <= 2) {
          get().fetchMoreProfiles();
        }
      }, 100);
    } catch (error) {
      console.error('Error in swipeProfile:', error);
    }
  },

  initializeProfiles: () => {
    if (!get().isInitialized) {
      set({
        profiles: [...mockProfiles], // Load profiles from JSON file
        currentIndex: 0,
        isInitialized: true,
      });
    }
  },

  resetProfiles: () => {
    set({
      profiles: [...mockProfiles], // Reset profiles from JSON file
      currentIndex: 0,
      swipeHistory: [],
    });
  },

  setProfiles: (profiles) => set({ profiles }),

  addProfiles: (newProfiles) =>
    set((state) => ({
      profiles: [...state.profiles, ...newProfiles],
    })),

  sendSwipeToServer: async (profileId, direction) => {
    try {
      console.log(`Swipe sent: ${profileId} - ${direction}`);
      // Replace with actual API call when ready
      // await fetch('https://whatever-api.com/swipe', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ profileId, direction })
      // });
    } catch (error) {
      console.error('Failed to send swipe:', error);
    }
  },

  fetchMoreProfiles: async () => {
    if (get().isLoading) return;

    set({ isLoading: true });
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const additionalProfiles = [
        {
          id: `extra-${Date.now()}-1`,
          name: 'Luna',
          age: 26,
          bio: 'Artist and coffee enthusiast',
          distance: 4,
          photos: ['https://picsum.photos/400/600?random=20'],
        },
        {
          id: `extra-${Date.now()}-2`,
          name: 'Zoe',
          age: 25,
          bio: 'Marketing professional and bookworm',
          distance: 7,
          photos: ['https://picsum.photos/400/600?random=21'],
        },
        {
          id: `extra-${Date.now()}-3`,
          name: 'Lily',
          age: 28,
          bio: 'Veterinarian and animal lover',
          distance: 5,
          photos: ['https://picsum.photos/400/600?random=22'],
        },
      ];

      get().addProfiles(additionalProfiles);
      console.log('Added more profiles:', additionalProfiles.length);
    } catch (error) {
      console.error('Failed to fetch profiles:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  getCurrentProfile: () => {
    const state = get();
    return state.profiles[state.currentIndex];
  },

  getNextProfile: () => {
    const state = get();
    return state.profiles[state.currentIndex + 1];
  },

  hasMoreProfiles: () => {
    const state = get();
    return state.currentIndex < state.profiles.length;
  },
}));

export default useProfileStore;
