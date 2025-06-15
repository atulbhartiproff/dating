import { create } from 'zustand';

const MOCK_PROFILES = [
  {
    id: '1',
    name: 'Emma',
    age: 25,
    bio: 'Love hiking and photography',
    distance: 2,
    photos: ['https://picsum.photos/400/600?random=1']
  },
  {
    id: '2',
    name: 'Sophie',
    age: 28,
    bio: 'Yoga instructor and coffee lover',
    distance: 5,
    photos: ['https://picsum.photos/400/600?random=2']
  },
  {
    id: '3',
    name: 'Isabella',
    age: 24,
    bio: 'Artist and traveler',
    distance: 3,
    photos: ['https://picsum.photos/400/600?random=3']
  },
  {
    id: '4',
    name: 'Olivia',
    age: 26,
    bio: 'Chef and foodie enthusiast',
    distance: 4,
    photos: ['https://picsum.photos/400/600?random=4']
  },
  {
    id: '5',
    name: 'Ava',
    age: 23,
    bio: 'Music lover and dancer',
    distance: 1,
    photos: ['https://picsum.photos/400/600?random=5']
  },
  {
    id: '6',
    name: 'Mia',
    age: 27,
    bio: 'Photographer and world traveler',
    distance: 6,
    photos: ['https://picsum.photos/400/600?random=6']
  },
  {
    id: '7',
    name: 'Charlotte',
    age: 29,
    bio: 'Fitness trainer and nutrition coach',
    distance: 3,
    photos: ['https://picsum.photos/400/600?random=7']
  },
  {
    id: '8',
    name: 'Amelia',
    age: 24,
    bio: 'Software developer and gamer',
    distance: 2,
    photos: ['https://picsum.photos/400/600?random=8']
  }
];

const useProfileStore = create((set, get) => ({
  profiles: [],
  currentIndex: 0,
  isLoading: false,
  swipeHistory: [],
  isInitialized: false,
  
  initializeProfiles: () => {
    if (!get().isInitialized) {
      set({ 
        profiles: [...MOCK_PROFILES], 
        currentIndex: 0,
        isInitialized: true 
      });
    }
  },
  
  resetProfiles: () => {
    set({ 
      profiles: [...MOCK_PROFILES], 
      currentIndex: 0,
      swipeHistory: []
    });
  },
  
  setProfiles: (profiles) => set({ profiles }),
  
  addProfiles: (newProfiles) => set((state) => ({
    profiles: [...state.profiles, ...newProfiles]
  })),
  
  swipeProfile: (direction) => {
    const state = get();
    const currentProfile = state.profiles[state.currentIndex];
    
    if (currentProfile) {
      set((prevState) => ({
        swipeHistory: [...prevState.swipeHistory, {
          profileId: currentProfile.id,
          direction,
          timestamp: Date.now()
        }],
        currentIndex: prevState.currentIndex + 1
      }));
      
      setTimeout(() => {
        get().sendSwipeToServer(currentProfile.id, direction);
        
        const updatedState = get();
        if (updatedState.profiles.length - updatedState.currentIndex <= 2) {
          get().fetchMoreProfiles();
        }
      }, 0);
    }
  },
  
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
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const additionalProfiles = [
        {
          id: `extra-${Date.now()}-1`,
          name: 'Luna',
          age: 26,
          bio: 'Artist and coffee enthusiast',
          distance: 4,
          photos: ['https://picsum.photos/400/600?random=20']
        },
        {
          id: `extra-${Date.now()}-2`,
          name: 'Zoe',
          age: 25,
          bio: 'Marketing professional and bookworm',
          distance: 7,
          photos: ['https://picsum.photos/400/600?random=21']
        },
        {
          id: `extra-${Date.now()}-3`,
          name: 'Lily',
          age: 28,
          bio: 'Veterinarian and animal lover',
          distance: 5,
          photos: ['https://picsum.photos/400/600?random=22']
        }
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
  }
}));

export default useProfileStore;
