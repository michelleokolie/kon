import { Tabs } from "expo-router";
import { Home, User } from "lucide-react-native";
import { useTheme } from "../../src/theme/context";

export default function TabLayout() {
  const { colours } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        // active / inactive colors are passed into each tabBarIcon's `color`
        tabBarActiveTintColor: colours.primary,
        tabBarInactiveTintColor: colours.secondaryText,
        tabBarStyle: {
          backgroundColor: colours.card,
          borderTopColor: colours.surface,
          borderTopWidth: 1,
          height: 64,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}
