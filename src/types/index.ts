interface User {
   // id: number;
   avatar: string;
    displayName: string;
    email: string;
    token: string;
}

interface UserProfile {
    email: string;
    avatar: string;
    nickname: string;
    address: string;
    gender: string;
    description: string;
    activities: string[];
    timeSlots: string[];
}

interface LocationState{
    loaded: boolean;
    coordinates?: { lat: string; lng: string };
    error?: { code: number; message: string };
  };

export type { User, UserProfile, LocationState };