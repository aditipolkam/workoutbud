export type AuthContextTypes = {
    user: string | null;
    authReady: boolean;
    isPending: boolean;
    error: string | null;
    registerStatus: boolean;
    login: () => void;
    logout: () => void;
  };


export type Activity ={
    name: string;
    description: string;
    days: string[];
    location: {
        coordinates:{lat: number, lng: number},
        address: string
    };
    timeSlots: string[]
}

export type NavLocationState = {
    loaded: boolean;
    coordinates?: { lat: string; lng: string };
    error?: { code: number; message: string };
  };

