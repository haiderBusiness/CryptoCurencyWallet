import {Dimensions, StyleSheet, View} from 'react-native';
import React, {
  forwardRef,
  useImperativeHandle,
  useCallback,
  ReactNode,
  useState,
} from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import BackDrop from './BackDrop';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import useThemeColors from '../../hooks/useThemeColors';

import { BlurView } from 'expo-blur';


const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

const BottomSheet = forwardRef(
  ({snapTo, children, backgroundColor, backDropColor, show}, ref) => {

    const [showModal, setShowModal] = useState(show)

    const inset = useSafeAreaInsets();
    const {height} = Dimensions.get('screen');
    const percentage = parseFloat(snapTo.replace('%', '')) / 100;
    const closeHeight = height;
    const openHeight = height - height * percentage;

    const topAnimation = useSharedValue(show ? openHeight : closeHeight);

    const parentOpacity = useSharedValue(show ? 1 : 0)


    const context = useSharedValue(0);


    const hideModalTotaly = () => {
      setShowModal(false)
    }

    const expand = (() => {
      'worklet';

      console.log("reached here")
      setShowModal(true)
      parentOpacity.value = withTiming(1);
      topAnimation.value = withTiming(openHeight);

    }, [openHeight, topAnimation]);

    const close = useCallback(() => {
      'worklet';
      parentOpacity.value = withTiming(0,{duration: 300});
      topAnimation.value = withTiming(closeHeight, {duration: 300}, finshed => {
        if(finshed) {
                //REVIEW--> HIDE MODAL WHEN ANIMATION FINISHES 
                runOnJS(hideModalTotaly)();
            }
          });
    }, [closeHeight, topAnimation]);

    useImperativeHandle(
      ref,
      () => ({
        expand,
        close,
      }),
      [expand, close],
    );

    const doSomeAfter = (duration) => {
      setTimeout(() => {
        hideModalTotaly()
      }, duration)
    }
    const animationStyle = useAnimatedStyle(() => {
      const top = topAnimation.value;
      return {
        top,
      };
    });

    const pan = Gesture.Pan()
      .onBegin(() => {
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
      .onEnd(() => {
        if (topAnimation.value > openHeight + 50) {

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
      });




    const themColors = useThemeColors()

    const animatedParentStyle = useAnimatedStyle(() => {
      return{
        opacity: parentOpacity.value
      }
    });

console.log("showModal: ", showModal)
console.log("parentOpacity.value: ", parentOpacity.value)
console.log("topAnimation.value: ", topAnimation.value)
if(showModal) 
  // console.log("animatedParentStyle", animatedParentStyle)
      return (
        <Animated.View
        style={[
         animatedParentStyle,
          {
        backgroundColor: "red", 
        position: "absolute",
        zIndex: 100,
        height: "100%", 
        width: "100%"
        }]}>
          {/* <BackDrop
            topAnimation={topAnimation}
            backDropColor={backDropColor}
            closeHeight={closeHeight}
            openHeight={openHeight}
            close={close}
          /> */}

          <AnimatedBlurView 
          tint="dark"
          intensity={100}
          style={[
          animatedParentStyle,
            {
          position: "absolute",
          zIndex: 0,
          height: "100%", 
          width: "100%"
          }]}
          />


          <GestureDetector gesture={pan}>
            <Animated.View
              style={[
                styles.container,
                animationStyle,
                {
                  backgroundColor: backgroundColor,
                  paddingBottom: inset.bottom,
                },
              ]}>
              <View style={styles.lineContainer}>
                <View style={styles.line} />
              </View>
              {children}
            </Animated.View>
          </GestureDetector>
        </Animated.View>
      );
    }

);



const parentComponent = ({children}) => {

  return (
    <AnimatedBlurView
    tint="dark"
    intensity={100}
    style={[animatedParentStyle, {
    backgroundColor: themColors.transparentBlack5, 
    position: "absolute",
    zIndex: 100,
    height: "100%", 
    width: "100%"
    }]}> 
    
    </AnimatedBlurView>
  )
}

export default BottomSheet;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  lineContainer: {
    marginVertical: 10,
    alignItems: 'center',
  },
  line: {
    width: 50,
    height: 4,
    backgroundColor: 'black',
    borderRadius: 20,
  },
});