import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import cat_hand_up from "../assets/dummy/profile_pictures/cat_hand_up.jpg";
import finland_flag from "../assets/dummy/profile_pictures/finland.png";
import {
  useResponsiveFontSize,
  useResponsiveHeight,
  useResponsiveRadius,
  useResponsiveVerticalSpace,
  useResponsiveHorizontalSpace,
  useResponsiveWidth,
  useResponsiveBothHeightWidth
} from "../hooks/useResponsiveness";

export default function PhotoWidget(props) {
  const profileImageSource = props.imageUrl
    ? { uri: props.imageUrl }
    : cat_hand_up;

  const flagImageSource = props.flagUrl ? { uri: props.flagUrl } : finland_flag;
  return (
    <View style={styles.container}>
      <View style={styles.child}>
        {/* image and text container */}
        <View style={styles.imageTextContainer}>
          <View style={styles.profileImageView}>
            <Image
              style={styles.profileImage}
              source={profileImageSource}
            ></Image>
          </View>

          {/* text container */}
          <View style={styles.textContainer}>
            <Text style={styles.title}>
              {props.name ? props.name : "John Adam"}
            </Text>
            <Text style={styles.status}>
              {props.status ? props.status : "Fast is my second name"}
            </Text>
          </View>
        </View>

        <Image style={styles.flagImage} source={flagImageSource}></Image>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
    justifyContent: "center",
    // backgroundColor: "red",
  },

  child: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingBottom: useResponsiveVerticalSpace(10),
  },

  profileImageView: {
    shadowOffset: { width: -1, height: 1 },
    shadowColor: "rgba(0,0,0,0.5)",
    shadowOpacity: 0.35,
    shadowRadius: useResponsiveRadius(7),
    elevation: 10,

    // backgroundColor: "red",
    height: useResponsiveBothHeightWidth(60),
    width: useResponsiveBothHeightWidth(60),
    borderRadius: useResponsiveRadius(30),
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "red",
  },

  profileImage: {
    width: useResponsiveBothHeightWidth(55),
    height: useResponsiveBothHeightWidth(55),
    borderRadius: useResponsiveRadius(50),
    borderWidth: 1.5,
    borderColor: "white",
  },
  flagImage: {
    width: useResponsiveBothHeightWidth(30),
    height: useResponsiveBothHeightWidth(30),
  },

  imageTextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  textContainer: {
    flexDirection: "column",
    marginLeft: useResponsiveHorizontalSpace(10),
  },

  title: {
    fontSize: useResponsiveFontSize(16),
    fontWeight: "600",
  },
  status: {
    marginTop: useResponsiveVerticalSpace(2.5),
    fontSize: useResponsiveFontSize(14),
  },
});
