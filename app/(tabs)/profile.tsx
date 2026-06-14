import { supabase } from "@/src/lib/supabase";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function ProfilePage() {
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setUsername(user?.user_metadata.username);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {isLoading ? (
        <Text>...</Text>
      ) : (
        <>
          <View
            style={{
              height: 72,
              width: 72,
              borderRadius: 36,
              backgroundColor: "lightblue",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text>{username.charAt(0).toUpperCase()}</Text>
          </View>
          <Text>{username}</Text>
          <TouchableOpacity onPress={() => supabase.auth.signOut()}>
            <Text>Sign out</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}
