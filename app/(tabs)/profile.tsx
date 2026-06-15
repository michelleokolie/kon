import { supabase } from "@/src/lib/supabase";
import { useTheme } from "@/src/theme/context";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ProfilePage() {
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { colours, toggleTheme, isDark } = useTheme();
  const styles = makeStyles(colours);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setUsername(user?.user_metadata.username ?? "");
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={styles.muted}>...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarLetter}>
            {username.charAt(0).toUpperCase()}
          </Text>
        </View>
        <Text style={styles.username}>{username}</Text>
      </View>

      <View style={styles.section}>
        <TouchableOpacity
          style={styles.row}
          onPress={toggleTheme}
          activeOpacity={0.7}
        >
          <Text style={styles.rowLabel}>appearance</Text>
          <Text style={styles.rowValue}>{isDark ? "dark" : "light"}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <TouchableOpacity
          style={[styles.row, styles.dangerRow]}
          onPress={() => supabase.auth.signOut()}
          activeOpacity={0.7}
        >
          <Text style={styles.dangerText}>sign out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const makeStyles = (colours: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colours.background,
      paddingHorizontal: 20,
      paddingTop: 24,
    },
    centered: {
      justifyContent: "center",
      alignItems: "center",
    },
    header: {
      alignItems: "center",
      paddingVertical: 32,
      gap: 12,
    },
    avatar: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: colours.primary,
      alignItems: "center",
      justifyContent: "center",
    },
    avatarLetter: {
      fontSize: 28,
      fontWeight: "500",
      color: "#fff",
    },
    username: {
      fontSize: 20,
      fontWeight: "500",
      color: colours.text,
      letterSpacing: 0.3,
    },
    section: {
      backgroundColor: colours.card,
      borderRadius: 16,
      marginBottom: 12,
      overflow: "hidden",
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: colours.surface,
    },
    rowLabel: {
      fontSize: 14,
      color: colours.text,
    },
    rowValue: {
      fontSize: 14,
      color: colours.secondaryText,
    },
    dangerRow: {
      borderBottomWidth: 0,
    },
    dangerText: {
      fontSize: 14,
      color: colours.accent,
    },
    muted: {
      color: colours.secondaryText,
    },
  });
