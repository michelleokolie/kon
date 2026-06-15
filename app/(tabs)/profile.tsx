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

  const styles = createStyles(colours);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Text style={styles.text}>...</Text>
      ) : (
        <>
          <View style={styles.profileCircle}>
            <Text style={styles.profileInitial}>
              {username.charAt(0).toUpperCase()}
            </Text>
          </View>
          <Text style={styles.username}>{username}</Text>

          <TouchableOpacity
            onPress={() => supabase.auth.signOut()}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Sign out</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => toggleTheme()}
            style={styles.secondaryButton}
          >
            <Text style={styles.secondaryButtonText}>
              {isDark ? "Light Mode" : "Dark Mode"}
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const createStyles = (colours: ReturnType<typeof useTheme>["colours"]) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 28,
      backgroundColor: colours.background,
    },
    text: {
      color: colours.text,
    },
    profileCircle: {
      height: 96,
      width: 96,
      borderRadius: 48,
      backgroundColor: colours.primary,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 16,
    },
    profileInitial: {
      color: colours.card,
      fontSize: 38,
      fontWeight: "700",
    },
    username: {
      color: colours.text,
      fontSize: 22,
      fontWeight: "700",
      marginBottom: 32,
    },
    button: {
      width: "100%",
      backgroundColor: colours.primary,
      borderRadius: 12,
      paddingVertical: 15,
      alignItems: "center",
      marginBottom: 14,
    },
    buttonText: {
      color: colours.card,
      fontSize: 16,
      fontWeight: "600",
    },
    secondaryButton: {
      width: "100%",
      borderWidth: 1,
      borderColor: colours.surface,
      borderRadius: 12,
      paddingVertical: 15,
      alignItems: "center",
    },
    secondaryButtonText: {
      color: colours.text,
      fontSize: 16,
      fontWeight: "600",
    },
  });
