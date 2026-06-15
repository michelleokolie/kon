import StatusCard from "@/src/components/StatusCard";
import StatusPickerModal from "@/src/components/StatusPickerModal";
import { STATUS_OPTIONS } from "@/src/constants/constants";
import { supabase } from "@/src/lib/supabase";
import { useTheme } from "@/src/theme/context";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function HomePage() {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentStatus, setCurrentStatus] = useState("free");
  const [currentNote, setCurrentNote] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { colours } = useTheme();
  const styles = makeStyles(colours);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setUser(user);

        const { data, error } = await supabase
          .from("statuses")
          .select("*")
          .eq("user_id", user?.id)
          .single();

        if (data && !error) {
          setCurrentStatus(data.content);
          setCurrentNote(data.note);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleSave = async (status: string, note: string) => {
    setCurrentStatus(status);
    setCurrentNote(note);
    setModalVisible(false);

    const { error } = await supabase.from("statuses").upsert(
      {
        user_id: user?.id,
        content: status,
        note: note,
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
      { onConflict: "user_id" },
    );
    if (error) console.log("Supabase error:", error);
  };

  const currentOption =
    STATUS_OPTIONS.find((o) => o.value === currentStatus) ?? STATUS_OPTIONS[0];

  const feedItems: any[] = [];

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.wordmark}>kon</Text>
      </View>

      <StatusCard
        status={currentStatus}
        note={currentNote}
        icon={currentOption.icon}
        onPress={() => setModalVisible(true)}
        isLoading={isLoading}
      />

      <FlatList
        data={feedItems}
        keyExtractor={(item) => item.id}
        renderItem={() => null}
        contentContainerStyle={styles.feed}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>no friends yet</Text>
            <Text style={styles.emptySubtitle}>
              add friends to see their status here
            </Text>
          </View>
        }
      />

      <StatusPickerModal
        visible={modalVisible}
        onSave={handleSave}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
}

const makeStyles = (colours: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colours.background,
    },
    topBar: {
      paddingHorizontal: 20,
      paddingTop: 16,
      paddingBottom: 8,
    },
    wordmark: {
      fontSize: 24,
      fontWeight: "300",
      color: colours.primary,
      letterSpacing: 5,
    },
    feed: {
      padding: 16,
      paddingTop: 20,
    },
    emptyState: {
      alignItems: "center",
      paddingTop: 64,
      gap: 8,
    },
    emptyTitle: {
      fontSize: 15,
      fontWeight: "500",
      color: colours.text,
    },
    emptySubtitle: {
      fontSize: 13,
      color: colours.secondaryText,
      textAlign: "center",
      lineHeight: 20,
    },
  });
