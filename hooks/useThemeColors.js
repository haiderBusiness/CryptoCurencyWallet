import React from "react";
import { useColorScheme } from "react-native";
import { Colors } from "../constants/Colors";

export default function useThemeColors() {
  const theme = useColorScheme();

  if (theme === "light") {
    return Colors.light;
  } else {
    return Colors.dark;
  }
}
