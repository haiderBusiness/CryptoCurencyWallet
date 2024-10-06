import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import TradeFilter from './TradeFilter';
import Animated, { useDerivedValue, useSharedValue } from 'react-native-reanimated';
import { interface_x_black } from '../../../assets/dummy/icons_pictures';
import useThemeColors from '../../../hooks/useThemeColors';
import { useResponsiveBothHeightWidth, useResponsiveHeight } from '../../../hooks/useResponsiveness';
import useLanguage from '../../../hooks/useLanguage';
import TopBarHeader2 from '../../TopBarHeader/TopBarHeader2';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AnimatedScrollListOrView from '@components/ScrollViewWithAnimatedHeader./AnimatedScrollListOrView';

export default function MarketPlaceFilters({scrollToSearchScreen, footerAbsoluteSpace, HeaderAbsoluteSpace, animatedScrollYToForward, scrollComponentRef, composedGesture }) {


   const insets = useSafeAreaInsets();
   const topBarHeaderHeight = useResponsiveHeight(55)


   // const animatedScrollY = useSharedValue(0)

   // const onScroll = (event) => {
   //    const scrollY = event.nativeEvent.contentOffset.y
   //    animatedScrollY.value = scrollY;
   //    animatedScrollYToForward.value = scrollY
   // }

   // const onScroll = (event) => {
   //    // headerScrollFunction(event)

   //    const scrollY = event.nativeEvent.contentOffset.y
   //    animatedScrollY.value = scrollY;
      
   //  }




const themeColors = useThemeColors()
 return (
   <View>


      <AnimatedScrollListOrView
         leftImageSource1={interface_x_black}
         leftImage1Style={{
            backgroundColor: themeColors.background3,
            size: useResponsiveBothHeightWidth(30)
         }}
         onLeftImage1Press={() => {}}
         topBarHeaderStyle={{
            backgroundColor: themeColors.background3
         }}
         headerTitle={useLanguage("MarketPlace Filters")}
         slug={useLanguage("Disply offers based on your filters")}
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
         <TradeFilter scrollToSearchScreen={scrollToSearchScreen}/>
      </AnimatedScrollListOrView>
   </View>
 );
}



const styles = StyleSheet.create({
 container: {
  width: '100%',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  },
});