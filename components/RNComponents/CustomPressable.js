import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import viewStyleSample from "./viewStyleSample";

const darkenHexColor = (hex, percent) => {
  const num = parseInt(hex.slice(1), 16);
  const r = (num >> 16) - percent;
  const g = ((num >> 8) & 0x00ff) - percent;
  const b = (num & 0x0000ff) - percent;

  return `#${(
    0x1000000 +
    (r < 0 ? 0 : r) * 0x10000 +
    (g < 0 ? 0 : g) * 0x100 +
    (b < 0 ? 0 : b)
  )
    .toString(16)
    .slice(1)}`;
};

export default function CustomPressable({
  children,
  style = viewStyleSample,
  onPress = () => {console.log("test: ", this.name)},
}) {
  const styles = style.flex !== 1000 ? style : {};

  const backgroundColorAfterPress = styles.backgroundColor ?  darkenHexColor(styles.backgroundColor, 15) : null;


  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles,
        pressed
          ? { backgroundColor: backgroundColorAfterPress }
          : { backgroundColor: styles.backgroundColor },
      ]}
    >
      
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
