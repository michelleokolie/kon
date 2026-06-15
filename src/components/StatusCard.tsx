import { useTheme } from "@/src/theme/context";
import { LucideIcon } from "lucide-react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type StatusCardProps = {
  status: string;
  icon: LucideIcon;
  note?: string | null;
  onPress?: () => void;
};

export default function StatusCard({
  status,
  icon,
  note,
  onPress,
}: StatusCardProps) {
  const { colours } = useTheme();
  const styles = makeStyles(colours);
  const Icon = icon;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <View style={styles.iconWrapper}>
        <Icon size={18} color={colours.primary} />
      </View>
      <View style={styles.textWrapper}>
        <Text style={styles.status}>{status}</Text>
        {note ? <Text style={styles.note}>{note}</Text> : null}
      </View>
      <View style={styles.editHint}>
        <Text style={styles.editHintText}>tap to change</Text>
      </View>
    </TouchableOpacity>
  );
}

const makeStyles = (colours: any) =>
  StyleSheet.create({
    container: {
      backgroundColor: colours.card,
      borderRadius: 16,
      padding: 18,
      flexDirection: "row",
      alignItems: "center",
      gap: 14,
      marginHorizontal: 16,
      marginTop: 12,
      borderWidth: 1,
      borderColor: colours.surface,
    },
    iconWrapper: {
      width: 40,
      height: 40,
      borderRadius: 12,
      backgroundColor: colours.surface,
      alignItems: "center",
      justifyContent: "center",
    },
    textWrapper: {
      flex: 1,
      gap: 2,
    },
    status: {
      fontSize: 15,
      fontWeight: "500",
      color: colours.text,
      textTransform: "lowercase",
    },
    note: {
      fontSize: 12,
      color: colours.secondaryText,
    },
    editHint: {
      paddingHorizontal: 10,
      paddingVertical: 4,
      backgroundColor: colours.surface,
      borderRadius: 20,
    },
    editHintText: {
      fontSize: 11,
      color: colours.secondaryText,
    },
  });
