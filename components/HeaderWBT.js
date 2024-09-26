import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  useResponsiveFontSize,
  useResponsiveHorizontalSpace,
} from "../hooks/useResponsiveness";

export default function HeaderWBT({...props}) {

  const {title, route, navigation, paddingTop, style} = props
  return (
    <View
      style={{ ...styles.container, paddingTop, ...style }}
    >
      <View style={{ opacity: 0.2 }} />
      <Text style={styles.bigTitle}>{title ? title : "Title"}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingLeft: useResponsiveHorizontalSpace(18),

    alignItems: "flex-start",
    justifyContent: "flex-end",
  },

  text: {
    color: "red",
  },

  bigTitle: {
    fontSize: useResponsiveFontSize(34),
    fontWeight: "bold",
  },
});
