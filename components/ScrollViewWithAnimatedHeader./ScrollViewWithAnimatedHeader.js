import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  useColorScheme,
  ScrollView,
  // Animated,
  Dimensions,
} from "react-native";
import { Colors } from "../../constants/Colors";
import useThemeColors from "../../hooks/useThemeColors";
import PhotoWidget from "../PhotoWidget";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import HeaderWBT from "../HeaderWBT";
import TopBarHeader from "../TopBarHeader";
import Animated, { useAnimatedScrollHandler, useSharedValue, withTiming } from "react-native-reanimated";
import {
  useResponsiveHeight,
  useResponsiveHorizontalSpace,
  useResponsiveRadius,
  useResponsiveVerticalSpace,
} from "../../hooks/useResponsiveness";

import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import viewStyleSample from "../RNComponents/viewStyleSample";
import TopBarHeader2 from "../TopBarHeader/TopBarHeader2";

export default function ScrollViewWithAnimatedHeader({
  children,
  navigation,
  headerTitle,
  leftComponent,
  rightComponent,
  leftImageSource1,
  leftImageSource2, 
  leftImageSource3, 
  rightImageSource1,
  rightImageSource2,
  rightImageSource3,
  title,
  titleComponent,
  onLeftImage1Press,
  onLeftImage2Press,
  onLeftImage3Press,
  onRightImage1Press,
  onRightImage2Press,
  onRightImage3Press,
  includeSafeAreaSpace = true,
  style = viewStyleSample,
}) {
  const receivedStyles = style.flex !== 1000 ? style : {};

  const scrollViewRef = useRef(null)

  const scroll = useSharedValue(0)

  const tabBarHeight = useBottomTabBarHeight();

  const themeColors = useThemeColors();

  const topHeaderOpacity = useSharedValue(0);

  const { width, height } = Dimensions.get("window");

  const backgroundColor = receivedStyles.backgroundColor
    ? receivedStyles.backgroundColor
    : themeColors.background;

  const borderBottomStartRadius = receivedStyles.borderBottomStartRadius
    ? borderBottomStartRadius
    : useResponsiveRadius(30);
  const borderBottomEndRadius = receivedStyles.borderBottomEndRadius
    ? borderBottomEndRadius
    : useResponsiveRadius(30);

  // console.log("tabBarheight: ", tabBarHeight);
  // const topHeaderOpacity = useRef(new Animated.Value(1)).current;

  // r

  const fadeInTopHeader = () => {
    topHeaderOpacity.value = withTiming(1, 500);
  };

  const fadeOutTopHeader = () => {
    topHeaderOpacity.value = withTiming(0, 500);
  };

  const scrollFunction = (event) => {
    const scrollingValue = event.nativeEvent.contentOffset.y;
    scroll.value = scrollingValue

    if (scrollingValue >= useResponsiveHeight(34)) {
      fadeInTopHeader();
    } else {
      topHeaderOpacity.value = 0;
      fadeOutTopHeader();
    }
  };

  // const scrollFunction = useAnimatedScrollHandler((event) => {
  //   scroll.value = event.nativeEvent.contentOffset.y; // Update shared value without re-rendering
  // });

  const [topBarHeaderLayout, setTopBarHeaderLayout] = useState()



  const windowHeightMinusNavigation = height - useResponsiveHeight(175);

  const inset = useSafeAreaInsets();

  const topBarHeaderHeight = useResponsiveHeight(47.2)
  return (
    // <SafeAreaView>
      <>
      {/* <View 
      // style={{ opacity: topHeaderOpacity }}
      >
        <TopBarHeader 
          leftComponent={leftComponent}
          rightComponent={rightComponent}
          leftImageSource1={leftImageSource1}
          leftImageSource2={leftImageSource2} 
          leftImageSource3={leftImageSource3} 
          rightImageSource1={rightImageSource1}
          rightImageSource2={rightImageSource2}
          rightImageSource3={rightImageSource3}
          titleComponent={titleComponent}
          onLeftImage1Press={onLeftImage1Press}
          onLeftImage2Press={onLeftImage2Press}
          onLeftImage3Press={onLeftImage3Press}
          onRightImage1Press={onRightImage1Press}
          onRightImage2Press={onRightImage2Press}
          onRightImage3Press={onRightImage3Press}
          title={headerTitle}
          titleAndBackgroundAnimationValue={topHeaderOpacity}
        />
      </View> */}

        <TopBarHeader2 
          // leftComponent={headerLeftComponent}
          // rightComponent={headerRightComponent}
          // leftImageSource1={headerLeftImageSource1}
          // leftImageSource2={headerLeftImageSource2} 
          // leftImageSource3={headerLeftImageSource3} 
          // rightImageSource1={headerRightImageSource1}
          // rightImageSource2={headerRightImageSource2}
          // rightImageSource3={headerRightImageSource3}
          // titleComponent={headerTitleComponent}
          // onLeftImage1Press={headerOnLeftImage1Press}
          // onLeftImage2Press={headerOnLeftImage2Press}
          // onLeftImage3Press={headerOnLeftImage3Press}
          // onRightImage1Press={headerOnRightImage1Press}
          // onRightImage2Press={headerOnRightImage2Press}
          // onRightImage3Press={headerOnRightImage3Press}
          leftImageSource1={null}
          title={headerTitle}
          // backgroundOpacity={topHeaderOpacity}
          // onSecondTabAnimation={sellingTopHeaderOpacity}
          // titleAndBackgroundAnimationValue={isBuyingList ? buyingTopHeaderOpacity : sellingTopHeaderOpacity}
          headerLayout={(layout) => setTopBarHeaderLayout(layout)}
          // style={headerStyle}
          headerBlur={true}
          style={{backgroundColor: themeColors.background}}
          height={topBarHeaderHeight}
          scroll={scroll}
          scrollViewRef={scrollViewRef}
          animatedScrollY={scroll}
          topExtraSpace={includeSafeAreaSpace ? inset.top : 0}
          // AdditionalComponent={TabsSlider}
          // onSelectedTabChange={() => {}}
          // topTabsResultSpeed={"fast"}
        /> 

        <View />

      

      <ScrollView
        ref={scrollViewRef}
        style={{
          ...receivedStyles,
          height: windowHeightMinusNavigation,
          backgroundColor: backgroundColor,
          paddingTop: topBarHeaderLayout && topBarHeaderLayout.height ? topBarHeaderLayout.height : 0,
          borderBottomStartRadius: borderBottomStartRadius,
          borderBottomEndRadius: borderBottomEndRadius,
        }}
        onScroll={scrollFunction}
      >
          {/* TopBarHeader sapce */}
          {<View style={{width: "100%", height:topBarHeaderHeight + inset.top,}}/>}
        <HeaderWBT
          navigation={navigation}
          title={headerTitle}
          paddingTop={useResponsiveVerticalSpace(5)}
        />
        {children}
      </ScrollView>
      </>
    // </SafeAreaView>
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
    paddingHorizontal: useResponsiveHorizontalSpace(18),
  },

  text: {
    color: "white",
  },
});
