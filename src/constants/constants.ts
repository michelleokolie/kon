// Using icons for a more unified look over emojis.
import {
  BookOpen,
  Briefcase,
  Circle,
  Clock,
  Gamepad2,
  MinusCircle,
  MoveRight,
  Plane,
} from "lucide-react-native";

export const STATUS_OPTIONS = [
  { label: "Free", value: "free", icon: Circle, color: "#22c55e" },
  { label: "Gaming", value: "gaming", icon: Gamepad2, color: "#a855f7" },
  { label: "Busy", value: "busy", icon: BookOpen, color: "#eab308" },
  {
    label: "Do Not Disturb",
    value: "dnd",
    icon: MinusCircle,
    color: "#ef4444",
  },

  { label: "Working", value: "working", icon: Briefcase, color: "#3b82f6" },
  { label: "Away", value: "away", icon: Clock, color: "#6b7280" },
  { label: "Traveling", value: "traveling", icon: Plane, color: "#06b6d4" },
  { label: "Out", value: "out", icon: MoveRight, color: "#f97316" },
] as const;
