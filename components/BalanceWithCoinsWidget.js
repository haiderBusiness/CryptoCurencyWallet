import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

import { btc, usdc, usdt, eth, arrowBackWhite } from "../assets/dummy/icons_pictures";
import useThemeColors from "../hooks/useThemeColors";
import CustomPressable from "./RNComponents/CustomPressable";
import viewStyleSample from "./RNComponents/viewStyleSample";
import {
  useResponsiveFontSize,
  useResponsiveHeight,
  useResponsiveRadius,
  useResponsiveVerticalSpace,
  useResponsiveHorizontalSpace,
  useResponsiveWidth,
} from "../hooks/useResponsiveness";

export default function BalanceWithCoinsWidget({
  title = "total balance",
  balance,
  onPress,
  style = viewStyleSample,
}) {
  const themeColors = useThemeColors();

  const receivedStyles = style.flex !== 1000 ? style : {};

  //TODO: balance currancy

  backgroundColor = receivedStyles.backgroundColor
    ? receivedStyles.backgroundColor
    : "#786d43";

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
          {balance ? balance : "no balance"}
        </Text>
        <View style={styles.iconsView}>
          <View
            style={{ ...styles.imageView, backgroundColor: themeColors.white }}
          >
            <Image style={styles.image} source={btc} />
          </View>
          <View
            style={{ ...styles.imageView, backgroundColor: themeColors.white }}
          >
            <Image style={styles.image} source={eth} />
          </View>
          <View
            style={{ ...styles.imageView, backgroundColor: themeColors.white }}
          >
            <Image style={styles.image} source={usdt} />
          </View>
          <View
            style={{ ...styles.imageView, backgroundColor: themeColors.white }}
          >
            <Image style={styles.image} source={usdc} />
          </View>
        </View>
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
  balance: {
    fontSize: useResponsiveFontSize(30),
    fontWeight: "700",
  },

  iconsView: {
    flexDirection: "row",
    marginTop: useResponsiveVerticalSpace(8),
  },

  imageView: {
    width: useResponsiveWidth(35),
    height: useResponsiveHeight(35),
    marginRight: useResponsiveHorizontalSpace(9),
    borderRadius: useResponsiveRadius(20),
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    width: useResponsiveWidth(30),
    height: useResponsiveHeight(30),
  },

  arrowIcon: {
    width: useResponsiveWidth(30),
    height: useResponsiveHeight(30),
    marginRight: useResponsiveHorizontalSpace(-8),
    transform: [{ rotate: "180deg" }],
  },
});
