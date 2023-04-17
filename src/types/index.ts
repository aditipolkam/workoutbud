interface User {
   // id: number;
    displayName: string;
    email: string;
    token: string;
}

interface UserProfile {
    nickname: string;
    gender: string;
    description: string;
    activities: string[];
    timeSlots: string[];
}

export type { User, UserProfile };