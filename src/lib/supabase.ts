import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

// We are pulling the env variables here
const supabaseURL = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

// This is our supabase client
export const supabase = createClient(supabaseURL!, supabaseKey!, {
  auth: {
    storage: AsyncStorage,
    // We are using React Native so this prevents looking for browser sessions and crashing
    detectSessionInUrl: false,
  },
});
