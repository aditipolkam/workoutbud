interface User {
   // id: number;
   avatar: string;
    displayName: string;
    email: string;
    token: string;
}

interface UserProfile {
    avatar: string;
    nickname: string;
    address: string;
    gender: string;
    description: string;
    activities: string[];
    timeSlots: string[];
}

export type { User, UserProfile };