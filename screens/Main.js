import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Colors } from "../constants/Colors";
import useThemeColors from "../hooks/useThemeColors";
import PhotoWidget from "../components/PhotoWidget";
import { SafeAreaView } from "react-native-safe-area-context";
import ScrollViewWithAnimatedHeader from "../components/ScrollViewWithAnimatedHeader./ScrollViewWithAnimatedHeader";
import BalanceWithCoinsWidget from "../components/BalanceWithCoinsWidget";
import LevelWidget from "../components/LevelWidget";

import {
  useResponsiveVerticalSpace,
  useResponsiveHorizontalSpace,
  useResponsiveFontSize,
} from "../hooks/useResponsiveness";
import Order from "../components/order/Order";

export default function Main({ navigation }) {
  const themeColors = useThemeColors();


  return (
    <ScrollViewWithAnimatedHeader headerTitle={"MarketPlace"}  style={{}} navigation={navigation}>
      <View style={styles.container}>
        <View
          style={{ ...styles.child, backgroundColor: themeColors.background }}
        >
          <View style={{ paddingHorizontal: useResponsiveHorizontalSpace(18),}}>

          <PhotoWidget />
          <BalanceWithCoinsWidget
            title="total balance"
            style={{ backgroundColor: themeColors.orange }}
            balance={"€3780.55"}
            onPress={() => {}}
          />
          <LevelWidget
            title="account status"
            level={"Level 3"}
            onPress={() => {}}
            tradeValume={"unlimited trade volume"}
            style={{
              backgroundColor: themeColors.green4,
              marginTop: useResponsiveVerticalSpace(16),
            }}
          />

          <Text style={styles.lastTrade}>{"last order"}</Text>

          </View>
         

          <Order
            order={null}
            style={{ 
              marginTop: useResponsiveVerticalSpace(16), backgroundColor: themeColors.background,
              paddingHorizontal: useResponsiveHorizontalSpace(18)
            }}
          />
        </View>
      </View>
    </ScrollViewWithAnimatedHeader>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: useResponsiveVerticalSpace(10),
  },

  child: {
    width: "100%",
    height: "100%",
   
  },

  lastTrade: {
    fontSize: useResponsiveFontSize(20),
    fontWeight: "700",
    textTransform: "capitalize",
    marginTop: useResponsiveVerticalSpace(30),
  },
});
