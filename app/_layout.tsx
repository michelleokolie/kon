// This will be the most important file of them all
// Primary job is to check if a session exists and then route accordingly

// Things we need to do
// 1. Hold state of the current session
// 2. When component loads, ask Supabase is anyone logged in right now
// 3. Tell Supabase that if login state changes, let us know
// 4. Based on state, send to auth or tabs

import { supabase } from "@/src/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export default function RootLayout() {
  const [currentSession, setCurrentSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // This useEffect is for all the init. related to auth
  useEffect(() => {
    // 1. ask supabase for the current session and store it
    const init = async () => {
      // getSession returns obj. with keys data and error
      // docs say to consider getClaims or getUser, review that
      // 2. tell supabase to watch for auth changes and update our state when it does
      // 3. set isLoading to false when we're done
      const { data } = await supabase.auth.getSession();
      setCurrentSession(data.session);
      setIsLoading(false);
    };
    init();

    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event == "SIGNED_OUT") {
        setCurrentSession(null);
      } else {
        setCurrentSession(session);
      }
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  // This useEffect is for all nav related stuff for now
  useEffect(() => {}, []);
  return <></>;
}
