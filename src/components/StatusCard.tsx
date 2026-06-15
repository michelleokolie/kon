import { useTheme } from "@/src/theme/context";
import { LucideIcon } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";
import { StatusValue } from "../constants/constants";

// Should probably have a status type
type StatusCardProps = {
  status: StatusValue;
  icon: LucideIcon;
  note?: string;
};
// All this does is show current status
export default function StatusCard({ status, icon, note }: StatusCardProps) {
  const { colours } = useTheme();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colours.card,
      flexDirection: "row",
      alignItems: "center",
      padding: 16,
      borderRadius: 12,
    },
    text: {
      color: colours.text,
    },
    subContainer: {},
  });

  const Icon = icon;

  return (
    <View style={styles.container}>
      <Icon size={20} color={colours.text} />
      <View style={styles.subContainer}>
        <Text style={styles.text}>{status}</Text>
        {note && <Text style={styles.text}>{note}</Text>}
      </View>
    </View>
  );
}
