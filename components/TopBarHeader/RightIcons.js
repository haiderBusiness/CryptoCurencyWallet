import { Image, View } from "react-native"
import { useResponsiveHorizontalSpace } from "../../hooks/useResponsiveness"
import CustomPressable from "../RNComponents/CustomPressable"

export default function RightIcons ({
    styles,
    BACKGROUND_COLOR, 
    rightImageSource3,
    rightImageSource2,
    rightImageSource1,
    rightImage3Style,
    rightImage2Style,
    rightImage1Style,
    onRightImage3Press,
    onRightImage2Press,
    onRightImage1Press,
}) {
    return(
      <>
        <View style={{flexDirection: "row"}}>
          {rightImageSource3 && <CustomPressable
          style={{
            ...styles.iconView, 
            backgroundColor: BACKGROUND_COLOR,
            marginRight: useResponsiveHorizontalSpace(14),
            ...rightImage3Style
          }} 
          onPress={onRightImage3Press}
          >
          <Image source={rightImageSource3} style={[styles.icon, {width: rightImage3Style.size, height: rightImage3Style.size}]}/>
          </CustomPressable>}

          {rightImageSource2 && 
            <CustomPressable 
              style={{
                ...styles.iconView, 
                backgroundColor: BACKGROUND_COLOR,
                marginRight: useResponsiveHorizontalSpace(14),
                ...rightImage2Style
              }} 
              onPress={onRightImage2Press}
              >
                <Image source={rightImageSource2} style={[styles.icon, {width: rightImage2Style.size, height: rightImage2Style.size}]}/>
            </CustomPressable>
            }


          {rightImageSource1 && 
            <CustomPressable 
              style={{
                ...styles.iconView, 
                backgroundColor: BACKGROUND_COLOR,
                marginRight: useResponsiveHorizontalSpace(14),
                ...rightImage1Style,
                
              }}  
              onPress={onRightImage1Press}
              >
                <Image source={rightImageSource1} style={[styles.icon, {width: rightImage1Style.size, height: rightImage1Style.size}]}/>
              </CustomPressable>
            }
        </View>
 

          {/* {!rightImageSource1 && !rightImageSource2 && !rightImageSource3 &&
            <View style={{width: 10, height: 10}}/>
          } */}

        </>
    )
  }