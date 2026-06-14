import { supabase } from "@/src/lib/supabase";
import { useTheme } from "@/src/theme/context";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ProfilePage() {
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const { colours, toggleTheme, isDark } = useTheme();

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

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colours.background,
    },
    profileCircle: {
      height: 72,
      width: 72,
      borderRadius: 36,
      backgroundColor: colours.primary,
      alignItems: "center",
      justifyContent: "center",
    },
    text: {
      color: colours.text,
    },
  });

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Text>...</Text>
      ) : (
        <>
          <View style={styles.profileCircle}>
            <Text>{username.charAt(0).toUpperCase()}</Text>
          </View>
          <Text style={styles.text}>{username}</Text>
          <TouchableOpacity onPress={() => supabase.auth.signOut()}>
            <Text style={styles.text}>Sign out</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => toggleTheme()}>
            <Text style={styles.text}>Change Theme</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}
