import StatusCard from "@/src/components/StatusCard";
import StatusPickerModal from "@/src/components/StatusPickerModal";
import { STATUS_OPTIONS } from "@/src/constants/constants";
import { supabase } from "@/src/lib/supabase";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function Page() {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentStatus, setCurrentStatus] = useState("free");
  const [currentNote, setCurrentNote] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setUser(user);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, []);

  const handleSave = async (status: string, note: string) => {
    // Updates the state of status and note
    setCurrentStatus(status);
    setCurrentNote(note);

    // Closes the modal
    handleClose();

    // Sends to supabase
    const { data, error } = await supabase.from("statuses").upsert(
      {
        user_id: user?.id,
        content: status,
        note: note,
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
      {
        onConflict: "user_id",
      },
    );

    if (error) console.log("Supabase error:", error);
  };

  const handleClose = () => {
    setModalVisible(false);
  };

  const currentOption =
    STATUS_OPTIONS.find((o) => o.value === currentStatus) ?? STATUS_OPTIONS[0];

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <StatusCard
        status={currentStatus}
        note={currentNote}
        icon={currentOption.icon}
      />
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text>Set Status</Text>
      </TouchableOpacity>
      <StatusPickerModal
        visible={modalVisible}
        onSave={handleSave}
        onClose={handleClose}
      />
    </View>
  );
}
