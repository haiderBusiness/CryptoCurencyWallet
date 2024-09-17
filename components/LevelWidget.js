import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

import { btc, usdc, usdt, eth, arrowBackWhite } from "../assets/dummy/icons_pictures";
import useThemeColors from "../hooks/useThemeColors";
import CustomPressable from "./RNComponents/CustomPressable";
import viewStyleSample from "./RNComponents/viewStyleSample";
import {
  useResponsiveVerticalSpace,
  useResponsiveHorizontalSpace,
  useResponsiveFontSize,
  useResponsiveHeight,
  useResponsiveWidth,
  useResponsiveRadius,
  useResponsiveBothHeightWidth,
} from "../hooks/useResponsiveness";

export default function LevelWidget({
  title = "total balance",
  level,
  underLevelTitle = "unlimted trade volume",
  onPress,
  style = viewStyleSample,
}) {
  const receivedStyles = style.flex !== 1000 ? style : {};

  const themeColors = useThemeColors();

  backgroundColor = receivedStyles.backgroundColor
    ? receivedStyles.backgroundColor
    : "#ff7392";

  return (
    <CustomPressable
      onPress={onPress}
      style={{
        ...styles.container,
        ...receivedStyles,
        backgroundColor: backgroundColor,
      }}
    >
      <View style={styles.child}>
        <Text style={{ ...styles.balanceTitle, color: themeColors.white }}>
          {title}
        </Text>
        <Text style={{ ...styles.balance, color: themeColors.white }}>
          {level ? level : "no text"}
        </Text>

        <Text style={{ ...styles.underLevelText, color: themeColors.white }}>
          {underLevelTitle}
        </Text>
      </View>

      <View>
        <Image style={styles.arrowIcon} source={arrowBackWhite} />
      </View>
    </CustomPressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
    paddingHorizontal: useResponsiveHorizontalSpace(18),
    borderRadius: useResponsiveRadius(20),
    height: "auto",
    paddingVertical: useResponsiveVerticalSpace(18),
  },

  child: {},

  balanceTitle: {
    fontSize: useResponsiveFontSize(14),
    fontWeight: "bold",
    marginBottom: useResponsiveVerticalSpace(4),
    textTransform: "capitalize",
  },

  underLevelText: {
    fontSize: useResponsiveFontSize(14),
    fontWeight: "bold",
    marginTop: useResponsiveVerticalSpace(4),
    textTransform: "capitalize",
  },
  balance: {
    fontSize: useResponsiveFontSize(30),
    fontWeight: "700",
  },

  iconsView: {
    flexDirection: "row",
    marginTop: useResponsiveVerticalSpace(8),
  },

  imageView: {
    width: useResponsiveBothHeightWidth(35),
    height: useResponsiveBothHeightWidth(35),
    marginRight: useResponsiveHorizontalSpace(9),
    borderRadius: useResponsiveRadius(20),
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    width: useResponsiveBothHeightWidth(30),
    height: useResponsiveBothHeightWidth(30),
  },

  arrowIcon: {
    width: useResponsiveBothHeightWidth(30),
    height: useResponsiveBothHeightWidth(30),
    marginRight: useResponsiveHorizontalSpace(-8),
    transform: [{ rotate: "180deg" }],
  },
});
