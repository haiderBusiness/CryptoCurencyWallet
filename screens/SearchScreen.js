import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";


import Animated, { useSharedValue } from 'react-native-reanimated';
import { interface_x_black } from '@assets/dummy/icons_pictures';
import useThemeColors from '@hooks/useThemeColors';
import { useResponsiveBothHeightWidth, useResponsiveHeight } from '@hooks/useResponsiveness';
import useLanguage from '@hooks/useLanguage';
import TopBarHeader2 from '@components/TopBarHeader/TopBarHeader2';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Search from "@components/search/Search";
import { arrow_back_black } from "@assets/dummy/icons_pictures";
import AnimatedScrollListOrView from '@components/ScrollViewWithAnimatedHeader./AnimatedScrollListOrView';




const {width, height} = Dimensions.get("window")

export default function SearchScreen({
  scrollToSearchScreen, 
  footerAbsoluteSpace, 
  headerAbsoluteSpace, 
  animatedScrollYToForward, 
  scrollViewRef,
  route, 
  navigation, 
  focusSearchInput = true, 
  goBack,
  backgroundColor = null,
  viewType = "ScrollView", 
  bounces = true, 
  headerTitle,
  headerSlug,
  scrollComponentRef,
  composedGesture,
}) {


   const insets = useSafeAreaInsets();
   const topBarHeaderHeight = useResponsiveHeight(55)

 
   const onCancel = () => {
     if(navigation) {
       navigation.goBack()
     } else if (goBack) {
       goBack()
     }
   }


   const animatedScrollY = useSharedValue(0)
   

   // const onScroll = (event) => {
   //    // headerScrollFunction(event)

   //    const scrollY = event.nativeEvent.contentOffset.y
   //    animatedScrollY.value = scrollY;
      
   //  }

const themeColors = useThemeColors()

 return (
  <View>


  <AnimatedScrollListOrView
     leftImageSource1={arrow_back_black}
     leftImage1Style={{
        backgroundColor: themeColors.background3,
        size: useResponsiveBothHeightWidth(30)
     }}
     onLeftImage1Press={() => onCancel()}
     topBarHeaderStyle={{
        backgroundColor: themeColors.background3
     }}
     title={useLanguage(headerTitle)}
     slug={null}
     // backgroundOpacity={topHeaderOpacity}
     disableTopSafeAreaInsets={true}
     // headerLayout={(layout) => setTopBarHeaderLayout(layout)}
     topBarheaderBlur={true}
     topBarheaderBlurBackgroundOpacity={0.6}
     topBarHeaderHeight={topBarHeaderHeight}
     // animatedScrollY={animatedScrollY}
     hightToShowTopBarHeaderWhenReached={useResponsiveBothHeightWidth(45)}
     footerAbsoluteSpace={footerAbsoluteSpace}
     scrollComponentRef={scrollComponentRef ? scrollComponentRef : null}
     animatedScrollYToForward={animatedScrollYToForward}
     composedGesture={composedGesture}
  >
     {/* <TradeFilter/> */}
     <View style={styles.container}>
     <Search focusSearchInput={false} onCancel={onCancel}/>
     </View>

  </AnimatedScrollListOrView>
</View>
 );
}



const styles = StyleSheet.create({
 container: {
  width: width,
  height: height,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: "red"
  },
})