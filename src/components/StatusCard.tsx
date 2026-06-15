import { useTheme } from "@/src/theme/context";
import { LucideIcon } from "lucide-react-native";
import { useEffect, useRef } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type StatusCardProps = {
  status: string;
  icon: LucideIcon;
  note?: string | null;
  onPress?: () => void;
  isLoading?: boolean;
};

export default function StatusCard({
  status,
  icon,
  note,
  onPress,
  isLoading = false,
}: StatusCardProps) {
  const { colours } = useTheme();
  const styles = makeStyles(colours);
  const Icon = icon;

  const fadeAnim = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    if (isLoading) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(fadeAnim, {
            toValue: 0.9,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim, {
            toValue: 0.4,
            duration: 800,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    } else {
      fadeAnim.stopAnimation();
      fadeAnim.setValue(1);
    }
  }, [isLoading]);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      disabled={isLoading}
      activeOpacity={0.85}
    >
      {isLoading ? (
        <Animated.View style={[styles.row, { opacity: fadeAnim }]}>
          <View
            style={[
              styles.iconWrapper,
              { backgroundColor: colours.skeletonBlock },
            ]}
          />
          <View style={styles.textWrapper}>
            <View
              style={[
                styles.skeletonBar,
                { width: "40%", backgroundColor: colours.skeletonBlock },
              ]}
            />
            <View
              style={[
                styles.skeletonBar,
                { width: "65%", backgroundColor: colours.skeletonBlock },
              ]}
            />
          </View>
          <View
            style={[
              styles.editHint,
              { backgroundColor: colours.skeletonBlock },
            ]}
          >
            <Text style={[styles.editHintText, { color: "transparent" }]}>
              tap to change
            </Text>
          </View>
        </Animated.View>
      ) : (
        <View style={styles.row}>
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
        </View>
      )}
    </TouchableOpacity>
  );
}

const makeStyles = (colours: any) =>
  StyleSheet.create({
    container: {
      backgroundColor: colours.card,
      borderRadius: 16,
      padding: 18,
      marginHorizontal: 16,
      marginTop: 12,
      borderWidth: 1,
      borderColor: colours.surface,
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      gap: 14,
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
      gap: 6,
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
    skeletonBar: {
      height: 10,
      borderRadius: 6,
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
