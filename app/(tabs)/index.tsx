import { STATUS_OPTIONS } from "@/src/constants/constants";
import { supabase } from "@/src/lib/supabase";
import { useTheme } from "@/src/theme/context";
import { Users } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Page() {
  const { colours } = useTheme();
  const [username, setUsername] = useState("");
  const [activeStatus, setActiveStatus] = useState<string>("free");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setUsername(user?.user_metadata?.username ?? "");
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, []);

  const selected = STATUS_OPTIONS.find((s) => s.value === activeStatus);
  const styles = createStyles(colours);

  return (
    <ScrollView
      style={styles.flex}
      contentContainerStyle={styles.scroll}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.greeting}>
          {username ? `Hey, ${username}` : "Welcome back"}
        </Text>
        <Text style={styles.subtitle}>What are you up to right now?</Text>
      </View>

      {/* Current status summary */}
      {selected && (
        <View style={styles.statusCard}>
          <View
            style={[styles.statusIcon, { backgroundColor: selected.color + "22" }]}
          >
            <selected.icon size={22} color={selected.color} />
          </View>
          <View style={styles.flexShrink}>
            <Text style={styles.statusLabelSmall}>Your status</Text>
            <Text style={styles.statusLabelLarge}>{selected.label}</Text>
          </View>
        </View>
      )}

      {/* Status picker */}
      <Text style={styles.sectionTitle}>Set your status</Text>
      <View style={styles.statusGrid}>
        {STATUS_OPTIONS.map((option) => {
          const isActive = option.value === activeStatus;
          return (
            <Pressable
              key={option.value}
              onPress={() => setActiveStatus(option.value)}
              style={({ pressed }) => [
                styles.statusChip,
                isActive && {
                  borderColor: option.color,
                  backgroundColor: option.color + "18",
                },
                pressed && styles.pressed,
              ]}
            >
              <option.icon
                size={18}
                color={isActive ? option.color : colours.secondaryText}
              />
              <Text
                style={[
                  styles.statusChipText,
                  isActive && { color: colours.text, fontWeight: "700" },
                ]}
              >
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* Friends feed */}
      <Text style={styles.sectionTitle}>Friends&apos; activity</Text>
      <View style={styles.emptyState}>
        <View style={styles.emptyIcon}>
          <Users size={26} color={colours.primary} />
        </View>
        <Text style={styles.emptyTitle}>No updates yet</Text>
        <Text style={styles.emptyText}>
          When your friends share a status, it&apos;ll show up here.
        </Text>
      </View>
    </ScrollView>
  );
}

const createStyles = (colours: ReturnType<typeof useTheme>["colours"]) =>
  StyleSheet.create({
    flex: { flex: 1, backgroundColor: colours.background },
    scroll: {
      paddingHorizontal: 20,
      paddingTop: 16,
      paddingBottom: 40,
    },
    header: { marginBottom: 24 },
    greeting: {
      fontSize: 28,
      fontWeight: "700",
      color: colours.text,
      marginBottom: 4,
    },
    subtitle: {
      fontSize: 15,
      color: colours.secondaryText,
    },
    statusCard: {
      flexDirection: "row",
      alignItems: "center",
      gap: 14,
      backgroundColor: colours.card,
      borderWidth: 1,
      borderColor: colours.border,
      borderRadius: 18,
      padding: 16,
      marginBottom: 28,
    },
    statusIcon: {
      width: 48,
      height: 48,
      borderRadius: 24,
      alignItems: "center",
      justifyContent: "center",
    },
    flexShrink: { flexShrink: 1 },
    statusLabelSmall: {
      fontSize: 12,
      fontWeight: "600",
      color: colours.secondaryText,
      textTransform: "uppercase",
      letterSpacing: 0.5,
      marginBottom: 2,
    },
    statusLabelLarge: {
      fontSize: 18,
      fontWeight: "700",
      color: colours.text,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: "700",
      color: colours.text,
      marginBottom: 14,
    },
    statusGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 10,
      marginBottom: 32,
    },
    statusChip: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      paddingHorizontal: 14,
      paddingVertical: 10,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: colours.border,
      backgroundColor: colours.card,
    },
    statusChipText: {
      fontSize: 14,
      color: colours.secondaryText,
    },
    pressed: { opacity: 0.7 },
    emptyState: {
      alignItems: "center",
      backgroundColor: colours.card,
      borderWidth: 1,
      borderColor: colours.border,
      borderRadius: 18,
      paddingVertical: 36,
      paddingHorizontal: 24,
    },
    emptyIcon: {
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: colours.surface,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 14,
    },
    emptyTitle: {
      fontSize: 16,
      fontWeight: "700",
      color: colours.text,
      marginBottom: 6,
    },
    emptyText: {
      fontSize: 14,
      lineHeight: 20,
      color: colours.secondaryText,
      textAlign: "center",
    },
  });
