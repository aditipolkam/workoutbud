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
    uid:string | null,
    name: string;
    description: string;
    days: string[];
    location: {
        coordinates:{lat: number | null, lng: number | null},
        address: string
    };
    timeSlots: string[]
}

export type NavLocationState = {
    loaded: boolean;
    coordinates?: { lat: string | null; lng: string| null};
    error?: { code: number; message: string };
  };

