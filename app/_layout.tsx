// This will be the most important file of them all
// Primary job is to check if a session exists and then route accordingly

// Things we need to do
// 1. Hold state of the current session
// 2. When component loads, ask Supabase is anyone logged in right now
// 3. Tell Supabase that if login state changes, let us know
// 4. Based on state, send to auth or tabs

import { useEffect, useState } from "react";
import { Slot, useRouter } from "expo-router";
import { supabase } from "../src/lib/supabase";
import { Session } from "@supabase/supabase-js";

export default function RootLayout() {
  const [currentSession, setCurrentSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {}, [currentSession]);

  return (
    <>
      <p>Test</p>
    </>
  );
}
