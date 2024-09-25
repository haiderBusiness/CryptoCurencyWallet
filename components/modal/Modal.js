import React, {useRef, useEffect, useState,memo, PureComponent, Component} from "react";
import {View, Pressable, ViewStyle, Text, Dimensions, StyleSheet } from "react-native"
import { BlurView } from "expo-blur";
import Animated, 
{ Easing, runOnJS, useAnimatedStyle, useSharedValue, withTiming ,
withSpring,
useAnimatedScrollHandler
} from "react-native-reanimated";

import useThemeColors from "../../hooks/useThemeColors"
import {
    useResponsiveFontSize,
    useResponsiveHeight,
    useResponsiveHorizontalSpace,
    useResponsiveRadius,
    useResponsiveVerticalSpace,
    useResponsiveWidth,
  } from "../../hooks/useResponsiveness.js";
const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BackDrop from "./BackDrop.js";


const {width, height} = Dimensions.get("window")
// const height = SIZES.height;
// const width = SIZES.width;






const HEADER_HEIGHT_NARROWED = useResponsiveHeight(77);

export default function Modal(
    {

    show,
    spaceBetweenContent = HEADER_HEIGHT_NARROWED, 
    onSpacePress = () => {}, 
    parentStyle,
    zIndex = 100,
    animationType = "slide",
    animationTime = 300,
    borderTopRightRadius= useResponsiveWidth(20),
    borderTopLeftRadius= useResponsiveWidth(20),
    onHide,
    children,
    

    snapTo = "50%", 
    backgroundColor, 
    backDropColor = "black", 
    showTopNotch = true, 

    //scrollView props 
    
    AdditionalComponent,
    additionalComponentHeight,
    ...rest
    }
    ) {



    // console.log("show", show)
    const themColors = useThemeColors()

    const BACKGROUND_COLOR = backgroundColor ? backgroundColor : themColors.background3
    const BACK_DROP_COLOR = backDropColor ? backDropColor : "#000000"

        
    // console.log("show below: ", show)

    const hiddenModalValue = height - spaceBetweenContent
    const animateModal =  useSharedValue(show ? 0 : hiddenModalValue);
    const parentOpacity = useSharedValue(show ? 1 : 0)
    const blurAnimation = useSharedValue(show ? 1 : 0)


    // const inset = useSafeAreaInsets();
    const inset = useSafeAreaInsets();
    const {height} = Dimensions.get('screen');
    const percentage = parseFloat(snapTo.replace('%', '')) / 100;
    const closeHeight = height;
    const openHeight = height - height * percentage;
    const hideModalValue = 10

    // console.log("openHeight", openHeight)
    // console.log("hideModalValue", hideModalValue)

    const topAnimation = useSharedValue(showModalValue !== "hide" ? openHeight : closeHeight);
    

    const context = useSharedValue(0);

    const scrollBegin = useSharedValue(0)
    const scrollY = useSharedValue(0)
  


 

  // the passed value should be "show" | "hide" | "animateHide"
  const [showModalValue, setShowModalValue] =
  useState(show ? "show" : "hide");


  const doSomeAfter = (duration) => {
    setTimeout(() => {
      hideModalTotaly()
    }, duration)
}


  const [renders, setRenders] = useState(1);

  useEffect(() => {
  if(renders > 1 && show) {
    setShowModalValue("show")
  } else if(renders > 1 && !show) {
    setShowModalValue("animateHide")
  }
  setRenders(renders + 1)
  }, [show])


  const hideModalTotaly = () => {
    setShowModalValue("hide");
    onHide(false)
  }

  const startAnimation = (showModalValue) => {
  if(animationType === "slide") {

      if(showModalValue === "show") {
          //REVIEW--> SHOW PARENT WHEN ANIMATION FINISHES 
          parentOpacity.value = withTiming(1,{duration: animationTime,},);

          blurAnimation.value = withTiming(1,{duration: animationTime,},);
          
          //REVIEW--> SHOW CHILD AFTER ABOVE ANIMATION FINISHES
          topAnimation.value = withTiming(openHeight,{duration: animationTime,},);
          
      } else if (showModalValue === "animateHide") {
          //REVIEW--> HIDE CHILD VIEW ANIMAION 
              //REVIEW--> HIDE PARENT VIEW ANIMAION WHEN ABOVE ANIMATION FINISHES
              parentOpacity.value = withTiming(0,{duration: animationTime,},);

              blurAnimation.value = withTiming(0,{duration: animationTime,},);

              topAnimation.value = withTiming(closeHeight,{duration: animationTime,},finshed => {
              if(finshed) {
                      //REVIEW--> HIDE MODAL WHEN ANIMATION FINISHES 
                      runOnJS(hideModalTotaly)();
              }
          });

          
      };
  } 
  else if(animationType === "fade") {
      if(showModalValue === "show") {
              //REVIEW--> SHOW ANIMATION OF PARENT VIEW
              parentOpacity.value = withTiming(1,{duration: animationTime,},);

              //REVIEW--> SHOW CHILD VIEW WHEN ABOVE ANIMATION FINISHES
              animateModal.value = withTiming(1)


      } else if (showModalValue === "animateHide") {
              //REVIEW--> HIDE PARENT VIEW ANIMAION WHEN ABOVE ANIMATION FINISHES
              parentOpacity.value = withTiming(0,{duration: animationTime,},);

              //REVIEW--> HIDE CHILD ANIMAION 
              topAnimation.value = withTiming(0,{duration: animationTime,},finshed => {
              if(finshed) {
                      //REVIEW--> HIDE MODAL WHEN ANIMATION FINISHES 
                      runOnJS(hideModalTotaly)();
                  }
              });
          };
          
  }
  else if (animationType === "none") {
      if(showModalValue === "show") {
          parentOpacity.value = 1;
          parentOpacity.value = 1;
          } 
          else if (showModalValue === "animateHide") {
              parentOpacity.value = 0; 
              animateModal.value = hiddenModalValue;
              setShowModalValue("hide");

          };
  }
  }

  useEffect(() => {
    // slide
    startAnimation(showModalValue)
  },[showModalValue]);





  


    const pan = Gesture.Pan()
    .onBegin(() => {
      // reset context 
      context.value = topAnimation.value;
    })
    .onUpdate(event => {
      if (event.translationY < 0) {
        topAnimation.value = withSpring(openHeight, {
          damping: 100,
          stiffness: 400,
        });
      } else {
        topAnimation.value = withSpring(context.value + event.translationY, {
          damping: 100,
          stiffness: 400,
        });
      }
    })
    .onEnd((event) => {
      if (topAnimation.value > openHeight) {

        const gestureSpeed = Math.abs(event.velocityY);

        // Example: Use gesture speed to decide some action
        if (gestureSpeed > 2000) {  // Adjust the speed threshold as needed

          //REVIEW --> DO SOMETHING AFTER A SPECEFIC TIME
          runOnJS(doSomeAfter)(250)
  
          parentOpacity.value = withTiming(0,{duration: 300,},);
          topAnimation.value = withSpring(closeHeight, {
            damping: 100,
            stiffness: 400,
          }, finshed => {
  
            // runOnJS(timer)();
            if(finshed) {
              //REVIEW--> DO SOMETHING WHEN ANIMATION FINISHES
            }
          });
        } else {
          topAnimation.value = withSpring(openHeight, {
            damping: 100,
            stiffness: 400,
          });
        }
      } else {
        topAnimation.value = withSpring(openHeight, {
          damping: 100,
          stiffness: 400,
        });
      }
    });

    console.log("re-render", )


    const animatedParentStyle = useAnimatedStyle(() => {
        return{
            opacity: parentOpacity.value
        }
    });

    const animationStyle = useAnimatedStyle(() => {
        const top = topAnimation.value;
        return {
          top,
        };
      });

      const blurViewAnimatedStyle = useAnimatedStyle(() => {
        return{
            opacity: blurAnimation.value
        }
      });



      const onScroll = useAnimatedScrollHandler({
        onBeginDrag: event => {
          scrollBegin.value = event.contentOffset.y;
        },

        onScroll: event => {
          scrollY.value = event.contentOffset.y;
        }
      })

    let panSavedUpScroll = useSharedValue(0)
    const [bounces, setBounces] = useState(true)
    const panScroll = Gesture.Pan()
      .onBegin((event) => {
        // reset context 
        context.value = topAnimation.value;
        console.log(event.translationY)
      })
      .onUpdate(event => {
        

        // update pan s

        // else if(event.translationY < 0 && panSavedUpScroll <= 0) {

        // } 


        if (event.translationY < 0) {
          topAnimation.value = withSpring(openHeight, {
            damping: 100,
            stiffness: 400,
          });

        } else {
         
          if(panSavedUpScroll.value >= 0) {
            topAnimation.value = withSpring(context.value + event.translationY, {
              damping: 100,
              stiffness: 400,
              });

            if(topAnimation.value > ((height * percentage) / 2)) {
              //REVIEW --> DO SOMETHING AFTER A SPECEFIC TIME
              runOnJS(doSomeAfter)(250)
      
              parentOpacity.value = withTiming(0,{duration: 300,},);
              topAnimation.value = withSpring(closeHeight, {
                damping: 100,
                stiffness: 400,
              });
            }
          } 



        }
      })
      .onEnd((event) => {
        panSavedUpScroll.value = event.translationY

        if (topAnimation.value > openHeight) {
  
          const gestureSpeed = Math.abs(event.velocityY);

          // Example: Use gesture speed to decide some action
          if (gestureSpeed > 2000) {  // Adjust the speed threshold as needed

            //REVIEW --> DO SOMETHING AFTER A SPECEFIC TIME
            runOnJS(doSomeAfter)(250)
    
            parentOpacity.value = withTiming(0,{duration: 300,},);

            topAnimation.value = withSpring(closeHeight, {
              damping: 100,
              stiffness: 400,
            }, finshed => {
    
              // runOnJS(timer)();
              if(finshed) {
                //REVIEW--> DO SOMETHING WHEN ANIMATION FINISHES
              }
            });
          } else {
            topAnimation.value = withSpring(openHeight, {
              damping: 100,
              stiffness: 400,
            });
          }


        } else {
          topAnimation.value = withSpring(openHeight, {
            damping: 100,
            stiffness: 400,
          });
        }
        });


      const scrollViewGesture = Gesture.Native()

      console.log("AdditionalComponent: ", AdditionalComponent.openHeight)

if(showModalValue !== "hide")
    return(
        // parent 
        <Animated.View
            tint="dark"
            intensity={100}
            style={[animatedParentStyle, 
              parentStyle ? parentStyle : {
              backgroundColor: "transparent", 
              position: "absolute",
              width: "100%",
              height: "100%",
              zIndex: zIndex,
            }]}
            >

            {/* Space above content */}
            {/* <Pressable 
            onPress={handleSpacePress} 
            style={spaceStyle ? spaceStyle :{
            height: spaceBetweenContent, 
            width: width,
            backgroundColor: "red",
            opacity: 1,
            }}/> */}


            <BackDrop
            topAnimation={topAnimation}
            backDropColor={BACK_DROP_COLOR}
            closeHeight={closeHeight}
            openHeight={openHeight}
            close={startAnimation}
            />


            {/* <AnimatedBlurView 
            tint="dark"
            intensity={100}
            style={[
            blurViewAnimatedStyle,
                {
            position: "absolute",
            zIndex: 0,
            height: "100%", 
            width: "100%"
                }]}
            /> */}

                


            {/* Content view */}
            <GestureDetector gesture={pan}>
                <Animated.View
                    style={[
                        styles.container,
                        animationStyle,
                        {
                        backgroundColor: BACKGROUND_COLOR,
                        // paddingBottom: inset.bottom,
                        },
                    ]}>
                    {showTopNotch && 
                    <View style={styles.lineContainer}>
                        <View style={styles.line} />
                    </View>}



                    <GestureDetector gesture={Gesture.Simultaneous(panScroll, scrollViewGesture)}>
                      <Animated.ScrollView
                      scrollEventThrottle={16}
                      bounces={bounces}
                      onScroll={onScroll}
                      {...rest}
                      >
                      {children}

                      <View style={{width: "100%", height: inset.bottom}}/>
                      {AdditionalComponent && <View style={{width: width, height:additionalComponentHeight}}/>}
                      </Animated.ScrollView>

                      
                    </GestureDetector>
                             
                    {AdditionalComponent}
        

                </Animated.View>
            </GestureDetector>
        </Animated.View>
    )
}



const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      backgroundColor: "red"
    },
    lineContainer: {
      marginVertical: 10,
      alignItems: 'center',
    },
    line: {
      width: 70,
      height: 4,
      backgroundColor: 'black',
      borderRadius: 20,
      opacity: 0.4
    },
  });