import React, {useEffect, useState, memo} from "react";
import { View, Text, StyleSheet, Image, Platform } from "react-native";
import { useResponsiveFontSize, useResponsiveHeight, useResponsiveHorizontalSpace, useResponsiveRadius, useResponsiveVerticalSpace, useResponsiveWidth } from "@hooks/useResponsiveness";
import { interfaceFilterOutlineBlack, interfaceAddDocumentOutlineBlack, interfaceHistoryOutlineBlack, interfaceShieldTrustGreen } from "@assets/dummy/icons_pictures";
import useThemeColors from "@hooks/useThemeColors"

import CustomPressable from "@RNComponents/CustomPressable"

import Animated from "react-native-reanimated";

import { BlurView } from 'expo-blur';

import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

const defaultIconHeight = useResponsiveHeight(30)
const defaultContentBottomMargin = useResponsiveHorizontalSpace(8)

const ListTopBarHeader = ({
  navigation,
  leftComponent,
  rightComponent,
  leftImageSource1 = interfaceFilterOutlineBlack,
  leftImageSource2, 
  leftImageSource3, 
  rightImageSource1,
  rightImageSource2,
  rightImageSource3,
  title,
  titleComponent,
  onLeftImage1Click,
  onLeftImage2Click,
  onLeftImage3Click,
  onRightImage1Click,
  onRightImage2Click,
  onRightImage3Click,
  titleAndBackgroundAnimationValue,
  backgroundColor,
  headerLayout,
  headerBlur = true,
  style,

}) => {


  const LeftComponent = leftComponent
  const RightComponent = rightComponent
  const TitleComponent = titleComponent
  const insets = useSafeAreaInsets();
  //console.log("instest.top", insets.top)

  let leftImagesCount = leftImageSource1 ? 1 : 0
  leftImagesCount = leftImageSource2 ? leftImagesCount + 1 : leftImagesCount
  leftImagesCount = leftImageSource3 ? leftImagesCount + 1 : leftImagesCount

  let rightImagesCount = rightImageSource1 ? 1 : 0
  rightImagesCount = rightImageSource2 ? rightImagesCount + 1 : rightImagesCount
  rightImagesCount = rightImageSource3 ? rightImagesCount + 1 : rightImagesCount





  const themeColors = useThemeColors()

  // otherImagesMarginLeft = leftImageSource1 ? 


  const BACKGROUND_COLOR = style &&  style.flex !== 1000 ?  style.backgroundColor : themeColors.background

  const LeftIcons = ({}) => {

    return(
      <>
        <View style={{flexDirection: "row"}}>
          {leftImageSource3 && <CustomPressable
          style={{
            ...styles.iconView, 
            backgroundColor: BACKGROUND_COLOR,
            marginLeft: useResponsiveHorizontalSpace(14),
          }} 
          onPress={onLeftImage3Click}
          >
          <Image source={leftImageSource3} style={styles.icon}/>
          </CustomPressable>}

          {leftImageSource2 && 
            <CustomPressable 
              style={{
                ...styles.iconView, 
                backgroundColor: BACKGROUND_COLOR,
                marginLeft: useResponsiveHorizontalSpace(14),
              }} 
              onPress={onLeftImage2Click}
              >
                <Image source={leftImageSource2} style={styles.icon}/>
            </CustomPressable>
            }


          {leftImageSource1 && 
            <CustomPressable 
              style={{
                ...styles.iconView, 
                backgroundColor: BACKGROUND_COLOR,
                marginLeft: useResponsiveHorizontalSpace(14),
              }}  
              onPress={onLeftImage1Click}
              >
                <Image source={leftImageSource1} style={styles.icon}/>
              </CustomPressable>
            }
        </View>
 

          {/* {!leftImageSource1 && !leftImageSource2 && !leftImageSource3 &&
            <View style={{width: 10, height: 10}}/>
          } */}

        </>
    )
  }

  const RightIcons = ({}) => {

    return(
      <>
       <View style={{flexDirection: "row"}}>
        {rightImageSource3 && <CustomPressable 
        style={{
          ...styles.iconView, 
          backgroundColor: BACKGROUND_COLOR,
          marginLeft: useResponsiveHorizontalSpace(14),
        }} 
        onPress={onRightImage3Click}
        >
        <Image source={rightImageSource3} style={styles.icon}/>
        </CustomPressable>}

        {rightImageSource2 && 
          <CustomPressable 
            style={{
              ...styles.iconView, 
              backgroundColor: BACKGROUND_COLOR,
              marginLeft: useResponsiveHorizontalSpace(14),
            }} 
            onPress={onRightImage2Click}
            >
              <Image source={rightImageSource2} style={styles.icon}/>
            </CustomPressable>
          }


        {rightImageSource1 && 
          <CustomPressable 
            style={{
              ...styles.iconView, 
              backgroundColor: BACKGROUND_COLOR,
              marginLeft: useResponsiveHorizontalSpace(14),
            }} 
            onPress={onRightImage1Click}
            >
              <Image source={rightImageSource1} style={styles.icon}/>
            </CustomPressable>
          }
                  {/* end space */}
        <View style={{marginRight: useResponsiveHorizontalSpace(14), backgroundColor: "red"}}/>
        </View>

          {/* {!rightImageSource1 && !rightImageSource2 && !rightImageSource3 &&
            <View style={{width: 10, height: 10}}/>
          } */}

        </>
    )
  }


  const [layout, setLayout] = useState(null);

  const handleLayout = (event) => {
    const { height, width, x, y } = event.nativeEvent.layout;
    setLayout({ height, width, x, y });
    if (__DEV__) {
      console.log("layout here from topheader")
     }
    // headerLayout(event)
 
  };

  useEffect(() => {
    if(layout) {
      headerLayout(layout)
    }
    
  }, [layout])


  const noIcons = !LeftComponent && leftImagesCount < 1 && rightImagesCount < 1

  const contentHeight = defaultIconHeight + defaultContentBottomMargin 

  // const topSafeArea = Platform.OS === "android" ? insets.top : insets.top * 2.01

  const topSafeArea = insets.top

  


  // const MARGINTOP = noIcons ? 0 : topSafeArea 
  const MARGINTOP = topSafeArea 
  //  const PADDINGTOP = noIcons ? 0 : topSafeArea - contentHeight




  return (
    <View onLayout={handleLayout}   style={styles.container}>

            {layout && headerBlur && 
            <BlurView 
              intensity={100}
              style={{
                width: layout.width, 
                height: layout.height , 
                position: "absolute",
                top: 0,
                zIndex: 0,
                // paddingTop: insets.top * 1.3,
                // backgroundColor: backgroundColor,
                // opacity: titleAndBackgroundAnimationValue
                // backgroundColor: "white"
                }}/>}

              {layout && 
              <View 
              style={{
                width: layout.width, 
                height: layout.height , 
                position: "absolute",
                top: 0,
                zIndex: 0,
                backgroundColor: BACKGROUND_COLOR,
                opacity: 0.5
                // paddingTop: insets.top * 1.3,
                // backgroundColor: backgroundColor,
                // opacity: titleAndBackgroundAnimationValue
                // backgroundColor: "white"
                }}/>}

              
      <View style={{
        ...styles.topHeader, 
        marginTop: MARGINTOP, 
        }}>

 

       {!LeftComponent ? <LeftIcons/> : <LeftComponent/>}

       
        {noIcons && <View style={{width: "100%", minHeight: defaultIconHeight, opacity: 0}}/>}



        {!TitleComponent &&
                    <Animated.View pointerEvents="box-none" 
                    style={{...styles.titleView, 
                      opacity: titleAndBackgroundAnimationValue
                    }}
                    >
                      <Text style={styles.title}>
                        {title ? title : "Title"}
                      </Text>
                    </Animated.View>
        }

       

        {!RightComponent ? <RightIcons/> : <RightComponent/>}


        {/* {<View style={{width: 10, height: 10}}/>} */}
      </View>

        {/* bottom line/border */}
      <Animated.View style={{width: "100%", height: useResponsiveHeight(0.5),opacity: titleAndBackgroundAnimationValue}}>
        <View style={{width: "100%", height: useResponsiveHeight(0.5), backgroundColor: themeColors.text, opacity:0.1}}/>
      </Animated.View>

    </View>
  );
}


export default ListTopBarHeader;




const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "flex-end",

    position: "absolute",
    zIndex: 10,
    backgroundColor: "rgba(0,0,0,0)",
    // opacity: 0.5,
   
    // backgroundColor: "red",
    // backgroundColor: "red"
  },

  topHeader: {
    // backgroundColor: "red",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    borderColor: "rgba(0,0,0,0.06)",
    paddingTop: useResponsiveVerticalSpace(8),
    paddingBottom: useResponsiveVerticalSpace(8),
    // borderBottomWidth: useResponsiveHeight(0.5),
    
    // paddingHorizontal: useResponsiveHorizontalSpace(10)
  },

  iconView: {
    width: useResponsiveWidth(30),
    height: useResponsiveHeight(30),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: useResponsiveRadius(30),

  },

  icon: {
    width: useResponsiveWidth(20),
    height: useResponsiveHeight(20)
  },

  titleView: {
    position: 'absolute', 
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0, 
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: useResponsiveVerticalSpace(10),
  },
  title: {
    fontSize: useResponsiveFontSize(17),
    fontWeight: "600",
    // backgroundColor: "blue",
    // marginBottom: 5,
  },



  
  bigTitleView: {
    paddingLeft: useResponsiveHorizontalSpace(18),
  },

  text: {
    color: "red",
  },

  bigTitle: {
    fontSize: useResponsiveFontSize(34),
    fontWeight: "bold",
  },

  


});
