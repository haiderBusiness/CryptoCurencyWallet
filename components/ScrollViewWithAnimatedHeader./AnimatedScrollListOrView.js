import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";


import Animated, { Extrapolation, interpolate, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { interface_x_black } from '@assets/dummy/icons_pictures';
import useThemeColors from '@hooks/useThemeColors';
import { useResponsiveBothHeightWidth, useResponsiveHeight } from '@hooks/useResponsiveness';
import useLanguage from '@hooks/useLanguage';
import TopBarHeader2 from '@components/TopBarHeader/TopBarHeader2';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Search from "@components/search/Search";
import { interfaceFilterOutlineBlack } from "../../assets/dummy/icons_pictures";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useResponsiveFontSize, useResponsiveHorizontalSpace, useResponsiveVerticalSpace } from "../../hooks/useResponsiveness";




const {width, height} = Dimensions.get("window")

export default function AnimatedScrollListOrView({

    // TopBarHeader
    topBarHeaderHeight = useResponsiveHeight(55),

    //icons 
    leftImageSource1 = interfaceFilterOutlineBlack,
    leftImageSource2, 
    leftImageSource3, 
    rightImageSource1,
    rightImageSource2,
    rightImageSource3,

    //icons styles
    leftImage1Style = {size: useResponsiveBothHeightWidth(30)},
    leftImage2Style = {size: useResponsiveBothHeightWidth(30)},
    leftImage3Style = {size: useResponsiveBothHeightWidth(30)},
    rightImage1Style = {size: useResponsiveBothHeightWidth(30)},
    rightImage2Style = {size: useResponsiveBothHeightWidth(30)},
    rightImage3Style = {size: useResponsiveBothHeightWidth(30)},

    //icons on press
    onLeftImage1Press,
    onLeftImage2Press,
    onLeftImage3Press,
    onRightImage1Press,
    onRightImage2Press,
    onRightImage3Press,
    leftComponent,
    rightComponent,

    TobBarTitleComponent,
    topBarheaderBlur = true,
    topBarheaderBlurBackgroundOpacity = 0.8,
    topBarHeaderStyle,
    hightToShowTopBarHeaderWhenReached = useResponsiveHeight(36),
    topExtraSpace = 0,




    
    footerAbsoluteSpace, 
    headerAbsoluteSpace, 
    headerTitle = "Header Title",
    slug = "slug text here",
    removeBigTitle = false,
    viewType = "ScrollView", 
    composedGesture,
    children,

    // scrollview properties
    scrollComponentRef,
    animatedScrollYToForward,
    ...rest
}) {


   const insets = useSafeAreaInsets();


   const animatedScrollY = useSharedValue(0)

   const onScroll = (event) => {
      const scrollY = event.nativeEvent.contentOffset.y
      animatedScrollY.value = scrollY;
      if(animatedScrollYToForward) {
        animatedScrollYToForward.value = scrollY
      }

   }

   // const onScroll = (event) => {
   //    // headerScrollFunction(event)

   //    const scrollY = event.nativeEvent.contentOffset.y
   //    animatedScrollY.value = scrollY;
      
   //  }

const themeColors = useThemeColors()


  // Animated style to move the view based on scroll
  const animatedHeaderStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      animatedScrollY.value,
      [0, 200], // Input scroll range
      [0, -200], // Move header upwards by 200 when scrolled
      Extrapolation.CLAMP // Prevent moving the header further after reaching scroll limit
    );

    return {
      transform: [{ translateY }], // Apply translateY to move header
    };
  });




  const fakeLayout = { "height": 0, "width": 0, "x": 0, "y": 0 }
  const [bigTitleViewLayout, setBigTitleViewLayout] = useState(fakeLayout)

  const handleLayout = (event, setState) => {
    const { height, width, x, y } = event.nativeEvent.layout;
    setState({ height, width, x, y });
  };


  // the below caculations are for the space that will represent the bigTitle view height because bigTitle view is set to absolute
  const bigTitlePaddingTop = useResponsiveVerticalSpace(15) + topBarHeaderHeight;
  const bigTitlePaddingBottom = useResponsiveVerticalSpace(20)
  const bigTitleViewHeight =  bigTitleViewLayout.height 
  // + bigTitlePaddingTop + bigTitlePaddingBottom

 return (
   <View>

      <TopBarHeader2
      //icons
      leftImageSource1={leftImageSource1}
      leftImageSource2={leftImageSource2} 
      leftImageSource3={leftImageSource3} 
      rightImageSource1={rightImageSource1}
      rightImageSource2={rightImageSource2}
      rightImageSource3={rightImageSource3}
  
      //icons styles
      leftImage1Style={leftImage1Style}
      leftImage2Style={leftImage2Style}
      leftImage3Style={leftImage3Style}
      rightImage1Style={rightImage1Style}
      rightImage2Style={rightImage2Style}
      rightImage3Style={rightImage3Style}
  
      //icons on press
      onLeftImage1Press={onLeftImage1Press}
      onLeftImage2Press={onLeftImage2Press}
      onLeftImage3Press={onLeftImage3Press}
      onRightImage1Press={onRightImage1Press}
      onRightImage2Press={onRightImage2Press}
      onRightImage3Press={onRightImage3Press}
      leftComponent={leftComponent}
      rightComponent={rightComponent}
      title={headerTitle}
      titleComponent={TobBarTitleComponent}
      headerBlur={topBarheaderBlur}
      blurBackgroundOpacity={topBarheaderBlurBackgroundOpacity}
      style={topBarHeaderStyle}
      height={topBarHeaderHeight}
      animatedScrollY={animatedScrollY}
      hightToShowHeaderWhenReached={hightToShowTopBarHeaderWhenReached}
      topExtraSpace ={topExtraSpace}
      /> 


        <Animated.View
          onLayout={(event) => handleLayout(event, setBigTitleViewLayout)}
          style={[
            styles.header, 
            {
            paddingTop: bigTitlePaddingTop,
            paddingBottom: bigTitlePaddingBottom, 
            },
            animatedHeaderStyle
          ]}
          >
          <Text style={styles.bigTitle}>{headerTitle}</Text>
          {slug && <Text style={styles.slugText}>{slug}</Text>}

        </Animated.View>

        

        {viewType === "ScrollView" ? 
        <AnimatedScrollView
        footerAbsoluteSpace={footerAbsoluteSpace}
        headerAbsoluteSpace={!removeBigTitle && topBarHeaderHeight > 0 ?  bigTitleViewHeight : removeBigTitle && topBarHeaderHeight ? topBarHeaderHeight : 0} 
        scrollViewRef={scrollComponentRef}
        onScroll={onScroll}
        composedGesture={composedGesture}
        {...rest}
        >
          {children}

        </AnimatedScrollView>
        : 
        <AnimatedListView
        dataArray={[]}
        renderItem={() => <Text></Text>}
        onScroll={onScroll}
        listRef={scrollComponentRef}
        composedGesture={composedGesture}
        {...rest}
        />
        }
   </View>
 );
}




const AnimatedListView = ({
    listRef, 
    dataArray, 
    renderItem, 
    onScroll,
    composedGesture,
    ...rest
    
}) => {

      const panScroll = Gesture.Pan()

      const enableBounces = (val = false) => {
        if(scrollViewRef && scrollViewRef.current) {
          scrollViewRef.current.setNativeProps({ 
            bounces: val 
          });;

        }
      }

      const enableScrolling = (val = false) => {

        if(scrollViewRef && scrollViewRef.current) {
          scrollViewRef.current.setNativeProps({ 
            scrollEnabled: val, 
            // bounces: val 
          });;
        }

      }


      const onScrollFunc = (event) => {
        onScroll(event)

        const scrollY = event.nativeEvent.contentOffset.y
        // console.log("scorllValue: ", scrollY)

        if (scrollY >= 250) {
          enableBounces(true)
        }
      }


    const keyExtractor = (item, index) => index.toString();
    return(
      <FlashList
      contentContainerStyle={{paddingTop: headerLayout && headerLayout.height ? headerLayout.height : 0,}}
      ref={listRef}
      data={dataArray}
      renderItem={renderItem}
      // ListHeaderComponent={FlatListHeader}
      estimatedItemSize={230}
      onScroll={onScroll}
      stickyHeaderIndices={showStickyHeader}
      keyExtractor={keyExtractor}
      scrollEventThrottle={16}
      {...rest}
      />
    )
  }
  
  
const AnimatedScrollView = ({
    scrollViewRef, 
    children, 
    footerAbsoluteSpace, 
    headerAbsoluteSpace,
    onScroll,
    composedGesture,
    ...rest
    }) => {


      const panScroll = Gesture.Pan()

      const enableBounces = (val = false) => {
        if(scrollViewRef && scrollViewRef.current) {
          scrollViewRef.current.setNativeProps({ 
            bounces: val 
          });;

        }
      }

      const enableScrolling = (val = false) => {

        if(scrollViewRef && scrollViewRef.current) {
          scrollViewRef.current.setNativeProps({ 
            scrollEnabled: val, 
            // bounces: val 
          });;
        }

      }


      const onScrollFunc = (event) => {
        onScroll(event)

        const scrollY = event.nativeEvent.contentOffset.y
        // console.log("scorllValue: ", scrollY)

        if (scrollY >= 250) {
          enableBounces(true)
        }
      }

    // console.log("composedGesture.current: ",composedGesture  ? composedGesture.current : "composedGesture is null")

      // useEffect(() => {
      //   if(composedGesture && composedGesture.current) { 
      //     console.log("composedGesture.current: ", composedGesture.current)
      //   }


      // }, [composedGesture && composedGesture.current])


    return(

      <GestureDetector
      gesture={composedGesture && composedGesture.current ? composedGesture.current : panScroll}
      >
          <Animated.ScrollView
          ref={scrollViewRef}
          onScroll={onScrollFunc}
          scrollEventThrottle={16}
          // bounces={bounces}
          {...rest}
          >
          
              {/* TopBarHeader sapce */}
              {headerAbsoluteSpace > 0 && <View style={{width: "100%", height: headerAbsoluteSpace }}/>}
          
              {children}
          
              {footerAbsoluteSpace && <View style={{width: "100%", height:footerAbsoluteSpace}}/>}
        
          </Animated.ScrollView>
        </GestureDetector>
    )

}


const styles = StyleSheet.create({
 container: {
  width: '100%',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  },
  header: {
    width: "100%",
    paddingTop: useResponsiveVerticalSpace(15),
    paddingBottom: useResponsiveVerticalSpace(20),
    paddingHorizontal: useResponsiveHorizontalSpace(18),
    alignItems: "flex-start",
    justifyContent: "flex-end",
    // backgroundColor: "red",
    position: "absolute"
    
  },

  bigTitle: {
    fontSize: useResponsiveFontSize(34),
    fontWeight: "bold",
  },

  slugText: {
    marginTop: useResponsiveVerticalSpace(5),
    fontSize: useResponsiveFontSize(14),
    opacity: 0.6
    // fontWeight: "bold",
  },
})