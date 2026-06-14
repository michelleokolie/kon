// This is a component that will hold a modal where the user can pick their current status
import { useTheme } from "@/src/theme/context";
import { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { STATUS_OPTIONS } from "../constants/constants";

type StatusPickerModalProps = {
  visible: boolean;
  onSave: (status: string, note: string) => void;
  onClose: () => void;
};

export default function StatusPickerModal({
  visible,
  onSave,
  onClose,
}: StatusPickerModalProps) {
  const [selectedStatus, setSelectedStatus] = useState("");
  const [noteInput, setNoteInput] = useState("");
  const { colours } = useTheme();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colours.card,
    },
    input: {
      width: "80%",
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 8,
      padding: 12,
      marginBottom: 12,
    },
    text: {
      color: colours.text,
    },
  });

  const handleClose = () => {
    setSelectedStatus("");
    setNoteInput("");
    onClose();
  };

  return (
    <Modal visible={visible} onRequestClose={handleClose}>
      <View style={styles.container}>
        {STATUS_OPTIONS.map((option) => (
          <TouchableOpacity
            key={option.value}
            onPress={() => setSelectedStatus(option.value)}
            style={{
              backgroundColor:
                selectedStatus === option.value
                  ? colours.primary
                  : colours.surface,
            }}
          >
            <Text>{option.label}</Text>
          </TouchableOpacity>
        ))}
        {selectedStatus && (
          <>
            <Text style={styles.text}>Enter a note:</Text>
            <TextInput
              value={noteInput}
              onChangeText={(text) => setNoteInput(text)}
              style={styles.input}
            />
          </>
        )}
        <TouchableOpacity onPress={() => onSave(selectedStatus, noteInput)}>
          <Text style={styles.text}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleClose()}>
          <Text style={styles.text}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
