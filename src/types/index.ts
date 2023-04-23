export type AuthContextTypes = {
    user: string | null;
    authReady: boolean;
    isPending: boolean;
    error: string | null;
    registerStatus: boolean;
    login: () => void;
    logout: () => void;
  };


export type UserData ={
    displayName: string;
    address: string;
    gender: string;
    bio: string;
    activities: Activity[];
    timeSlots: string[];
}

export type Activity ={
    name: string;
    description: string;
    location: {
        coordinates:{lat: number, lng: number},
        address: string
    };
    time: Date
}

export type NavLocationState = {
    loaded: boolean;
    coordinates?: { lat: string; lng: string };
    error?: { code: number; message: string };
  };

