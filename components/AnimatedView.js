import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import Animated, { Easing, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import useThemeColors from '../hooks/useThemeColors';

const {width, height} = Dimensions.get("window")
export default function AnimatedView({
    children, 
    animationType = "slide", 
    animationDuration = 300, 
    show, 
    useDisplayStyle,
    ...props
}) {



// console.log("show", show)
const themColors = useThemeColors()


// console.log("show below: ", show)

const hiddenModalValue = height 
const animateModal =  useSharedValue(show ? 1 : 0);
const animateModalOpacity = useSharedValue(show ? 1 : 0)

// the passed value should be "show" | "hide" | "animateHide"
const [showThisComponent, setShowThisComponent] =
useState(show ? "show" : "hide");

const handleSpacePress = () => {
    setShowThisComponent("animateHide")
    onSpacePress()
}



const [renders, setRenders] = useState(1);

useEffect(() => {
if(renders > 1 && show) {
setShowThisComponent("show")
} else if(renders > 1 && !show) {
setShowThisComponent("animateHide")
}
setRenders(renders + 1)
}, [show])

useEffect(() => {


// slide
const hideModalTotaly = () => {
    setShowThisComponent("hide");
}

if(animationType === "slide") {


    if(showThisComponent === "show") {
        //REVIEW--> SHOW PARENT WHEN ANIMATION FINISHES 
        animateModalOpacity.value = withTiming(1,{duration: animationDuration,},);
        
        //REVIEW--> SHOW CHILD AFTER ABOVE ANIMATION FINISHES
        animateModal.value = withTiming(0,{duration: animationDuration,},);



        
    } else if (showThisComponent === "animateHide") {
        //REVIEW--> HIDE CHILD VIEW ANIMAION 
            //REVIEW--> HIDE PARENT VIEW ANIMAION WHEN ABOVE ANIMATION FINISHES
            animateModalOpacity.value = withTiming(0,{duration: animationDuration,},);

        animateModal.value = withTiming(hiddenModalValue,{duration: animationDuration,},finshed => {
            if(finshed) {
                    //REVIEW--> HIDE MODAL WHEN ANIMATION FINISHES 
                    runOnJS(hideModalTotaly)();
            }
        });

        
    };
} 
else if(animationType === "fade") {
    if(showThisComponent === "show") {
            //REVIEW--> SHOW ANIMATION OF PARENT VIEW
            animateModalOpacity.value = withTiming(1,{duration: animationDuration,},);

            //REVIEW--> SHOW CHILD VIEW WHEN ABOVE ANIMATION FINISHES
            animateModal.value = withTiming(1)


    } else if (showThisComponent === "animateHide") {
            //REVIEW--> HIDE PARENT VIEW ANIMAION WHEN ABOVE ANIMATION FINISHES
            animateModalOpacity.value = withTiming(0,{duration: animationDuration,},);

            //REVIEW--> HIDE CHILD ANIMAION 
            animateModal.value = withTiming(0,{duration: animationDuration,},finshed => {
            if(finshed) {
                    //REVIEW--> HIDE MODAL WHEN ANIMATION FINISHES 
                    runOnJS(hideModalTotaly)();
                }
            });
        };
        
}
else if (animationType === "none") {
    if(showThisComponent === "show") {
        animateModalOpacity.value = 1;
        animateModalOpacity.value = 1;
        } 
        else if (showThisComponent === "animateHide") {
            animateModalOpacity.value = 0; 
            animateModal.value = hiddenModalValue;
            setShowThisComponent("hide");

        };
}
},[showThisComponent]);


const animatedParentStyle = useAnimatedStyle(() => {
    return{
        opacity: animateModalOpacity.value
    }
});

const animatedChildStyle = useAnimatedStyle(() => {
    if(animationType === "fade") {
        return{
            opacity: animateModal.value,
            transform: [{translateY:0}],
        }
    } else if(animationType === "slide") {
        return {
            transform: [{translateY: animateModal.value}],
        }
    }
    
});



// if(!useDisplayStyle && showThisComponent !== "hide") {
//     return (
//         <Animated.View
//          style={[animatedChildStyle]}
//          {...props}
//          >
//           {children}
//         </Animated.View>
//        );
// } else if (useDisplayStyle) {

//     // console.log("showThisComponent",showThisComponent)
//     return (
//         <Animated.View
//          pointerEvents={showThisComponent !== "hide" ? "auto" : "none"}
//          style={[animatedChildStyle]}
//          {...props}
//          >
//           {children}
//         </Animated.View>
//        );
// }


return(
    <Animated.View
    // style={}
    >
        {children}
    </Animated.View>
)
}



const styles = StyleSheet.create({
 container: {
  width: '100%',
  height: '100%',
  },
});