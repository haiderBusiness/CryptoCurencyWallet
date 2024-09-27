import { Image, View } from "react-native"
import { useResponsiveHorizontalSpace } from "../../hooks/useResponsiveness"
import CustomPressable from "../RNComponents/CustomPressable"

export default function LeftIcons ({
    styles,
    BACKGROUND_COLOR, 
    leftImageSource3,
    leftImageSource2,
    leftImageSource1,
    leftImage3Style,
    leftImage2Style,
    leftImage1Style,
    onLeftImage3Press,
    onLeftImage2Press,
    onLeftImage1Press,
}) {
    return(
      <>
        <View style={{flexDirection: "row"}}>
          {leftImageSource3 && <CustomPressable
          style={{
            ...styles.iconView, 
            backgroundColor: BACKGROUND_COLOR,
            marginLeft: useResponsiveHorizontalSpace(14),
            ...leftImage3Style
          }} 
          onPress={onLeftImage3Press}
          >
          <Image source={leftImageSource3} style={[styles.icon, {width: leftImage3Style.size, height: leftImage3Style.size}]}/>
          </CustomPressable>}

          {leftImageSource2 && 
            <CustomPressable 
              style={{
                ...styles.iconView, 
                backgroundColor: BACKGROUND_COLOR,
                marginLeft: useResponsiveHorizontalSpace(14),
                ...leftImage2Style
              }} 
              onPress={onLeftImage2Press}
              >
                <Image source={leftImageSource2} style={[styles.icon, {width: leftImage2Style.size, height: leftImage2Style.size}]}/>
            </CustomPressable>
            }


          {leftImageSource1 && 
            <CustomPressable 
              style={{
                ...styles.iconView, 
                backgroundColor: BACKGROUND_COLOR,
                marginLeft: useResponsiveHorizontalSpace(14),
                ...leftImage1Style,
                
              }}  
              onPress={onLeftImage1Press}
              >
                <Image source={leftImageSource1} style={[styles.icon, {width: leftImage1Style.size, height: leftImage1Style.size}]}/>
              </CustomPressable>
            }
        </View>
 

          {/* {!leftImageSource1 && !leftImageSource2 && !leftImageSource3 &&
            <View style={{width: 10, height: 10}}/>
          } */}

        </>
    )
  }