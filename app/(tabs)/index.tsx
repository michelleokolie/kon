import { useTheme } from "@/src/theme/context";
import { StyleSheet, Text, View } from "react-native";

export default function Page() {
  const { colours } = useTheme();
  const styles = createStyles(colours);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Placeholder</Text>
    </View>
  );
}

const createStyles = (colours: ReturnType<typeof useTheme>["colours"]) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colours.background,
    },
    text: {
      fontSize: 16,
      color: colours.text,
    },
  });
