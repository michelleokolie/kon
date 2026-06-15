import { supabase } from "@/src/lib/supabase";
import { useTheme } from "@/src/theme/context";
import { LogOut, Moon, Sun } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function ProfilePage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const { colours, toggleTheme, isDark } = useTheme();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setUsername(user?.user_metadata?.username ?? "");
        setEmail(user?.email ?? "");
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  const styles = createStyles(colours);

  if (isLoading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator color={colours.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerArea}>
        <View style={styles.profileCircle}>
          <Text style={styles.profileInitial}>
            {username.charAt(0).toUpperCase() || "?"}
          </Text>
        </View>
        <Text style={styles.username}>{username || "Your profile"}</Text>
        {!!email && <Text style={styles.email}>{email}</Text>}
      </View>

      <View style={styles.section}>
        <Pressable
          onPress={toggleTheme}
          style={({ pressed }) => [styles.row, pressed && styles.pressed]}
        >
          <View style={styles.rowIcon}>
            {isDark ? (
              <Sun size={20} color={colours.primary} />
            ) : (
              <Moon size={20} color={colours.primary} />
            )}
          </View>
          <View style={styles.rowTextWrap}>
            <Text style={styles.rowTitle}>Appearance</Text>
            <Text style={styles.rowSubtitle}>
              {isDark ? "Dark mode" : "Light mode"}
            </Text>
          </View>
        </Pressable>
      </View>

      <Pressable
        onPress={() => supabase.auth.signOut()}
        style={({ pressed }) => [styles.signOut, pressed && styles.pressed]}
      >
        <LogOut size={18} color={colours.error} />
        <Text style={styles.signOutText}>Sign out</Text>
      </Pressable>
    </View>
  );
}

const createStyles = (colours: ReturnType<typeof useTheme>["colours"]) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colours.background,
      paddingHorizontal: 20,
      paddingTop: 32,
    },
    center: { justifyContent: "center", alignItems: "center" },
    headerArea: {
      alignItems: "center",
      marginBottom: 36,
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
      color: colours.onPrimary,
      fontSize: 38,
      fontWeight: "700",
    },
    username: {
      fontSize: 24,
      fontWeight: "700",
      color: colours.text,
      marginBottom: 4,
    },
    email: {
      fontSize: 14,
      color: colours.secondaryText,
    },
    section: {
      backgroundColor: colours.card,
      borderWidth: 1,
      borderColor: colours.border,
      borderRadius: 18,
      overflow: "hidden",
      marginBottom: 24,
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      gap: 14,
      paddingHorizontal: 16,
      paddingVertical: 16,
    },
    rowIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colours.surface,
      alignItems: "center",
      justifyContent: "center",
    },
    rowTextWrap: { flex: 1 },
    rowTitle: {
      fontSize: 16,
      fontWeight: "600",
      color: colours.text,
      marginBottom: 2,
    },
    rowSubtitle: {
      fontSize: 13,
      color: colours.secondaryText,
    },
    signOut: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      borderWidth: 1,
      borderColor: colours.border,
      borderRadius: 14,
      paddingVertical: 15,
    },
    signOutText: {
      fontSize: 15,
      fontWeight: "700",
      color: colours.error,
    },
    pressed: { opacity: 0.7 },
  });
