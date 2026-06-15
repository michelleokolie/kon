import { useTheme } from "@/src/theme/context";
import { useEffect, useState } from "react";
import {
  Keyboard,
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
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const { colours } = useTheme();
  const styles = makeStyles(colours);

  const handleClose = () => {
    setSelectedStatus("");
    setNoteInput("");
    onClose();
  };

  const handleSave = () => {
    if (!selectedStatus) return;
    onSave(selectedStatus, noteInput);
    setSelectedStatus("");
    setNoteInput("");
  };

  useEffect(() => {
    const show = Keyboard.addListener("keyboardWillShow", (e) => {
      setKeyboardHeight(e.endCoordinates.height);
    });
    const hide = Keyboard.addListener("keyboardWillHide", () => {
      setKeyboardHeight(0);
    });
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  return (
    <Modal
      visible={visible}
      onRequestClose={handleClose}
      transparent
      animationType="slide"
    >
      <View style={styles.backdrop}>
        <View style={[styles.sheet, { paddingBottom: keyboardHeight + 24 }]}>
          <View style={styles.handle} />

          <Text style={styles.sheetTitle}>how are you right now?</Text>

          <View style={styles.optionsGrid}>
            {STATUS_OPTIONS.map((option) => {
              const Icon = option.icon;
              const isSelected = selectedStatus === option.value;
              return (
                <TouchableOpacity
                  key={option.value}
                  onPress={() => setSelectedStatus(option.value)}
                  style={[
                    styles.optionButton,
                    isSelected && styles.optionButtonSelected,
                  ]}
                  activeOpacity={0.75}
                >
                  <Icon
                    size={20}
                    color={isSelected ? "#fff" : colours.primary}
                  />
                  <Text
                    style={[
                      styles.optionLabel,
                      isSelected && styles.optionLabelSelected,
                    ]}
                  >
                    {option.label.toLowerCase()}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {selectedStatus ? (
            <View style={styles.noteSection}>
              <Text style={styles.noteLabel}>add a note (optional)</Text>
              <TextInput
                value={noteInput}
                onChangeText={setNoteInput}
                style={styles.noteInput}
                placeholder="e.g. at the library until 6"
                placeholderTextColor={colours.secondaryText}
                maxLength={60}
              />
            </View>
          ) : null}

          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleClose}
              activeOpacity={0.7}
            >
              <Text style={styles.cancelText}>cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.saveButton,
                !selectedStatus && styles.saveButtonDisabled,
              ]}
              onPress={handleSave}
              activeOpacity={0.85}
              disabled={!selectedStatus}
            >
              <Text style={styles.saveText}>save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const makeStyles = (colours: any) =>
  StyleSheet.create({
    backdrop: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.3)",
      justifyContent: "flex-end",
    },
    sheet: {
      backgroundColor: colours.card,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      padding: 24,
      paddingBottom: 40,
      gap: 20,
    },
    handle: {
      width: 36,
      height: 4,
      borderRadius: 2,
      backgroundColor: colours.surface,
      alignSelf: "center",
      marginBottom: 4,
    },
    sheetTitle: {
      fontSize: 16,
      fontWeight: "500",
      color: colours.text,
      letterSpacing: 0.2,
    },
    optionsGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 10,
    },
    optionButton: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      paddingHorizontal: 14,
      paddingVertical: 10,
      borderRadius: 12,
      backgroundColor: colours.surface,
      borderWidth: 1,
      borderColor: "transparent",
    },
    optionButtonSelected: {
      backgroundColor: colours.primary,
      borderColor: colours.primary,
    },
    optionLabel: {
      fontSize: 13,
      color: colours.text,
      fontWeight: "500",
    },
    optionLabelSelected: {
      color: "#fff",
    },
    noteSection: {
      gap: 8,
    },
    noteLabel: {
      fontSize: 12,
      color: colours.secondaryText,
      letterSpacing: 0.3,
    },
    noteInput: {
      backgroundColor: colours.surface,
      borderRadius: 12,
      padding: 14,
      fontSize: 14,
      color: colours.text,
    },
    actions: {
      flexDirection: "row",
      gap: 10,
      marginTop: 4,
    },
    cancelButton: {
      flex: 1,
      padding: 14,
      borderRadius: 12,
      backgroundColor: colours.surface,
      alignItems: "center",
    },
    cancelText: {
      fontSize: 14,
      color: colours.secondaryText,
      fontWeight: "500",
    },
    saveButton: {
      flex: 2,
      padding: 14,
      borderRadius: 12,
      backgroundColor: colours.primary,
      alignItems: "center",
    },
    saveButtonDisabled: {
      opacity: 0.4,
    },
    saveText: {
      fontSize: 14,
      color: "#fff",
      fontWeight: "500",
    },
  });
