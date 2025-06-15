import { create } from 'zustand';

// store/profileStore.js - Enhanced mock data
const MOCK_PROFILES = [
  {
    id: '1',
    name: 'Emma',
    age: 25,
    bio: 'Love hiking and photography. Always up for an adventure and discovering new places. Coffee enthusiast and weekend warrior who believes life is about collecting moments, not things.',
    distance: 2,
    photos: [
      'https://picsum.photos/400/600?random=1',
      'https://picsum.photos/400/600?random=11',
      'https://picsum.photos/400/600?random=21',
      'https://picsum.photos/400/600?random=31'
    ],
    interests: ['Photography', 'Hiking', 'Coffee', 'Travel', 'Music', 'Art'],
    height: '5\'6"',
    education: 'University of California, Berkeley',
    occupation: 'Graphic Designer'
  },
  {
    id: '2',
    name: 'Sophie',
    age: 28,
    bio: 'Yoga instructor and wellness coach. Passionate about mindfulness, healthy living, and helping others find their inner peace. Love sunrise yoga sessions and herbal tea.',
    distance: 5,
    photos: [
      'https://picsum.photos/400/600?random=2',
      'https://picsum.photos/400/600?random=12',
      'https://picsum.photos/400/600?random=22',
      'https://picsum.photos/400/600?random=32'
    ],
    interests: ['Yoga', 'Meditation', 'Healthy Living', 'Reading', 'Nature', 'Cooking'],
    height: '5\'4"',
    education: 'Yoga Alliance Certified',
    occupation: 'Yoga Instructor & Wellness Coach'
  },
  {
    id: '3',
    name: 'Isabella',
    age: 24,
    bio: 'Artist and world traveler with a passion for street art and local cultures. Currently working on a mural series inspired by my travels across Europe.',
    distance: 3,
    photos: [
      'https://picsum.photos/400/600?random=3',
      'https://picsum.photos/400/600?random=13',
      'https://picsum.photos/400/600?random=23',
      'https://picsum.photos/400/600?random=33'
    ],
    interests: ['Art', 'Travel', 'Street Art', 'Museums', 'Culture', 'Languages'],
    height: '5\'7"',
    education: 'Art Institute of Chicago',
    occupation: 'Freelance Artist'
  },
  {
    id: '4',
    name: 'Olivia',
    age: 26,
    bio: 'Chef and foodie enthusiast who loves experimenting with fusion cuisine. When I\'m not in the kitchen, you\'ll find me at farmers markets or trying new restaurants.',
    distance: 4,
    photos: [
      'https://picsum.photos/400/600?random=4',
      'https://picsum.photos/400/600?random=14',
      'https://picsum.photos/400/600?random=24',
      'https://picsum.photos/400/600?random=34'
    ],
    interests: ['Cooking', 'Food', 'Wine', 'Farmers Markets', 'Restaurants', 'Baking'],
    height: '5\'5"',
    education: 'Culinary Institute of America',
    occupation: 'Executive Chef'
  },
  {
    id: '5',
    name: 'Ava',
    age: 23,
    bio: 'Music lover and dancer who performs with a local contemporary dance company. Always have my headphones on and love discovering new artists and genres.',
    distance: 1,
    photos: [
      'https://picsum.photos/400/600?random=5',
      'https://picsum.photos/400/600?random=15',
      'https://picsum.photos/400/600?random=25',
      'https://picsum.photos/400/600?random=35'
    ],
    interests: ['Dance', 'Music', 'Concerts', 'Theater', 'Fitness', 'Creative Arts'],
    height: '5\'3"',
    education: 'Juilliard School',
    occupation: 'Professional Dancer'
  },
  {
    id: '6',
    name: 'Mia',
    age: 27,
    bio: 'Photographer and world traveler documenting stories from around the globe. Currently working on a photo series about urban wildlife in major cities.',
    distance: 6,
    photos: [
      'https://picsum.photos/400/600?random=6',
      'https://picsum.photos/400/600?random=16',
      'https://picsum.photos/400/600?random=26',
      'https://picsum.photos/400/600?random=36'
    ],
    interests: ['Photography', 'Travel', 'Wildlife', 'Documentary', 'Adventure', 'Storytelling'],
    height: '5\'8"',
    education: 'NYU Tisch School of Arts',
    occupation: 'Documentary Photographer'
  },
  {
    id: '7',
    name: 'Charlotte',
    age: 29,
    bio: 'Fitness trainer and nutrition coach helping people achieve their wellness goals. Love outdoor workouts, rock climbing, and meal prepping on Sundays.',
    distance: 3,
    photos: [
      'https://picsum.photos/400/600?random=7',
      'https://picsum.photos/400/600?random=17',
      'https://picsum.photos/400/600?random=27',
      'https://picsum.photos/400/600?random=37'
    ],
    interests: ['Fitness', 'Nutrition', 'Rock Climbing', 'Outdoor Activities', 'Health', 'Meal Prep'],
    height: '5\'6"',
    education: 'NASM Certified Personal Trainer',
    occupation: 'Fitness Trainer & Nutrition Coach'
  },
  {
    id: '8',
    name: 'Amelia',
    age: 24,
    bio: 'Software developer and gamer who loves building apps that make a difference. When not coding, I\'m probably playing indie games or attending tech meetups.',
    distance: 2,
    photos: [
      'https://picsum.photos/400/600?random=8',
      'https://picsum.photos/400/600?random=18',
      'https://picsum.photos/400/600?random=28',
      'https://picsum.photos/400/600?random=38'
    ],
    interests: ['Programming', 'Gaming', 'Technology', 'AI', 'Startups', 'Board Games'],
    height: '5\'4"',
    education: 'Stanford University - Computer Science',
    occupation: 'Full Stack Developer'
  },
  {
    id: '9',
    name: 'Luna',
    age: 26,
    bio: 'Marine biologist and ocean conservation advocate. Spend my days researching coral reefs and my weekends scuba diving or beach cleaning with local groups.',
    distance: 7,
    photos: [
      'https://picsum.photos/400/600?random=9',
      'https://picsum.photos/400/600?random=19',
      'https://picsum.photos/400/600?random=29',
      'https://picsum.photos/400/600?random=39'
    ],
    interests: ['Marine Biology', 'Scuba Diving', 'Conservation', 'Ocean', 'Research', 'Environment'],
    height: '5\'5"',
    education: 'UC San Diego - Marine Biology PhD',
    occupation: 'Marine Biologist'
  },
  {
    id: '10',
    name: 'Zoe',
    age: 25,
    bio: 'Marketing professional and bookworm who runs a book club and writes reviews on weekends. Always looking for the next great read and cozy coffee shop.',
    distance: 4,
    photos: [
      'https://picsum.photos/400/600?random=10',
      'https://picsum.photos/400/600?random=20',
      'https://picsum.photos/400/600?random=30',
      'https://picsum.photos/400/600?random=40'
    ],
    interests: ['Reading', 'Writing', 'Book Clubs', 'Literature', 'Coffee Shops', 'Marketing'],
    height: '5\'7"',
    education: 'Northwestern University - Marketing',
    occupation: 'Digital Marketing Manager'
  },
  {
    id: '11',
    name: 'Lily',
    age: 28,
    bio: 'Veterinarian and animal lover who volunteers at the local animal shelter on weekends. Have two rescue dogs and a cat who think they run the house.',
    distance: 5,
    photos: [
      'https://picsum.photos/400/600?random=41',
      'https://picsum.photos/400/600?random=42',
      'https://picsum.photos/400/600?random=43',
      'https://picsum.photos/400/600?random=44'
    ],
    interests: ['Animals', 'Veterinary Medicine', 'Volunteering', 'Dogs', 'Hiking', 'Animal Rescue'],
    height: '5\'6"',
    education: 'UC Davis School of Veterinary Medicine',
    occupation: 'Veterinarian'
  },
  {
    id: '12',
    name: 'Grace',
    age: 27,
    bio: 'Interior designer with a passion for sustainable living and upcycling furniture. Love thrift shopping, DIY projects, and creating beautiful spaces on a budget.',
    distance: 6,
    photos: [
      'https://picsum.photos/400/600?random=45',
      'https://picsum.photos/400/600?random=46',
      'https://picsum.photos/400/600?random=47',
      'https://picsum.photos/400/600?random=48'
    ],
    interests: ['Interior Design', 'Sustainability', 'DIY', 'Thrift Shopping', 'Upcycling', 'Home Decor'],
    height: '5\'8"',
    education: 'Parsons School of Design',
    occupation: 'Interior Designer'
  }
];
// Uncomment the following lines to use the original mock profiles
// const MOCK_PROFILES = [
//   {
//     id: '1',
//     name: 'Emma',
//     age: 25,
//     bio: 'Love hiking and photography',
//     distance: 2,
//     photos: ['https://picsum.photos/400/600?random=1']
//   },
//   {
//     id: '2',
//     name: 'Sophie',
//     age: 28,
//     bio: 'Yoga instructor and coffee lover',
//     distance: 5,
//     photos: ['https://picsum.photos/400/600?random=2']
//   },
//   {
//     id: '3',
//     name: 'Isabella',
//     age: 24,
//     bio: 'Artist and traveler',
//     distance: 3,
//     photos: ['https://picsum.photos/400/600?random=3']
//   },
//   {
//     id: '4',
//     name: 'Olivia',
//     age: 26,
//     bio: 'Chef and foodie enthusiast',
//     distance: 4,
//     photos: ['https://picsum.photos/400/600?random=4']
//   },
//   {
//     id: '5',
//     name: 'Ava',
//     age: 23,
//     bio: 'Music lover and dancer',
//     distance: 1,
//     photos: ['https://picsum.photos/400/600?random=5']
//   },
//   {
//     id: '6',
//     name: 'Mia',
//     age: 27,
//     bio: 'Photographer and world traveler',
//     distance: 6,
//     photos: ['https://picsum.photos/400/600?random=6']
//   },
//   {
//     id: '7',
//     name: 'Charlotte',
//     age: 29,
//     bio: 'Fitness trainer and nutrition coach',
//     distance: 3,
//     photos: ['https://picsum.photos/400/600?random=7']
//   },
//   {
//     id: '8',
//     name: 'Amelia',
//     age: 24,
//     bio: 'Software developer and gamer',
//     distance: 2,
//     photos: ['https://picsum.photos/400/600?random=8']
//   }
// ];

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
        swipeHistory: [...prevState.swipeHistory, {
          profileId: currentProfile.id,
          direction,
          timestamp: Date.now()
        }],
        currentIndex: prevState.currentIndex + 1
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
