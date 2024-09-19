import React, {useRef, useEffect, useState,memo, PureComponent, Component} from "react";
import {View, Pressable, ViewStyle, Text, Dimensions } from "react-native"
import { BlurView } from "expo-blur";
import Animated, { Easing, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

import useThemeColors from "../../hooks/useThemeColors.js"
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


const {width, height} = Dimensions.get("window")
// const height = SIZES.height;
// const width = SIZES.width;






const HEADER_HEIGHT_NARROWED = useResponsiveHeight(77);

class ModalComponent extends Component {

    constructor(props){
        super(props);
        this.state = {
            showModal:false,
            showSmallWidget: true , 
            spaceBetweenContent: HEADER_HEIGHT_NARROWED, 
            onSpacePress: null, 
            Content: null,
            parentStyle: null,
            contentStyle: null,
            spaceStyle: null,
            zIndex: 100,
            animationType: "slide",
            animationTime: 300,
            update: props.update,
            borderTopRightRadius: props.borderTopRightRadius,
            borderTopLeftRadius: props.borderTopLeftRadius,
            }
    }


    //REVIEW  CHECK IF RECEIVED PROPS FROM PARENTS ARE DIFFREANT THEN RETURN TRUE
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        // now child component won't ever re-render
        if (nextProps.update !== this.state.update) {
            return true;
        } else if (nextProps.showModal !== this.state.showModal) {
            return true;
        }
        else {
            return false;
        }
      }


      //REVIEW  UPDATE STATE IF SHOULD-COMPONENT-UPDATE RETUREND TRUE VALUE
      componentDidUpdate() {


            this.setState({
                showModal: this.props.showModal,
                showSmallWidget: this.props.showSmallWidget, 
                spaceBetweenContent: this.props.spaceBetweenContent >= 0 ? this.props.spaceBetweenContent : HEADER_HEIGHT_NARROWED, 
                onSpacePress: this.props.onSpacePress, 
                Content: this.props.Content,
                parentStyle: this.props.parentStyle,
                contentStyle: this.props.contentStyle,
                spaceStyle: this.props.spaceStyle,
                zIndex: this.props.zIndex ? this.props.zIndex : 100,
                animationType: this.props.animationType,
                animationTime: this.props.animationTime,
                update: this.props.update,
                borderTopRightRadius: this.props.borderTopRightRadius,
                borderTopLeftRadius: this.props.borderTopLeftRadius,
                })
        }


render() {

  
        return(
            <Modal 
                showModal= {this.state.showModal}
                showSmallWidget= {this.state.showSmallWidget} 
                spaceBetweenContent= {this.state.spaceBetweenContent} 
                onSpacePress= {this.state.onSpacePress} 
                Content={this.state.Content}
                parentStyle={this.state.parentStyle}
                contentStyle={this.state.contentStyle}
                spaceStyle={this.state.spaceStyle}
                zIndex={this.state.zIndex}
                animationType={this.state.animationType}
                animationTime={this.state.animationTime}
                borderTopRightRadius= {this.state.borderTopRightRadius}
                borderTopLeftRadius= {this.state.borderTopLeftRadius}            
                />
        )
    };
};



export default function Modal(
    {
    showModal, 
    showSmallWidget = true, 
    spaceBetweenContent = HEADER_HEIGHT_NARROWED, 
    onSpacePress = () => {}, 
    Content,
    parentStyle,
    contentStyle,
    spaceStyle,
    zIndex = 100,
    animationType = "slide",
    animationTime = 300,
    borderTopRightRadius= useResponsiveWidth(20),
    borderTopLeftRadius= useResponsiveWidth(20),
    }
    ) {



        // console.log("showModal", showModal)
        const themColors = useThemeColors()

        
    // console.log("showModal below: ", showModal)

    const hiddenModalValue = height - spaceBetweenContent
    const animateModal =  useSharedValue(showModal ? 0 : hiddenModalValue);
    const animateModalOpacity = useSharedValue(showModal ? 1 : 0)

  // the passed value should be "show" | "hide" | "animateHide"
  const [showModalValue, setShowModalValue] =
  useState(showModal ? "show" : "hide");

  const handleSpacePress = () => {
        setShowModalValue("animateHide")
        onSpacePress()
  }



  const [renders, setRenders] = useState(1);

  useEffect(() => {
  if(renders > 1 && showModal) {
    setShowModalValue("show")
  } else if(renders > 1 && !showModal) {
    setShowModalValue("animateHide")
  }
  setRenders(renders + 1)
  }, [showModal])

  useEffect(() => {


    // slide
    const hideModalTotaly = () => {
        setShowModalValue("hide");
        
    }

    if(animationType === "slide") {


        if(showModalValue === "show") {
            //REVIEW--> SHOW PARENT WHEN ANIMATION FINISHES 
            animateModalOpacity.value = withTiming(1,{duration: animationTime,},);
            
            //REVIEW--> SHOW CHILD AFTER ABOVE ANIMATION FINISHES
            animateModal.value = withTiming(0,{duration: animationTime,},);

  

            
        } else if (showModalValue === "animateHide") {
            //REVIEW--> HIDE CHILD VIEW ANIMAION 
                //REVIEW--> HIDE PARENT VIEW ANIMAION WHEN ABOVE ANIMATION FINISHES
                animateModalOpacity.value = withTiming(0,{duration: animationTime,},);

            animateModal.value = withTiming(hiddenModalValue,{duration: animationTime,},finshed => {
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
                animateModalOpacity.value = withTiming(1,{duration: animationTime,},);

                //REVIEW--> SHOW CHILD VIEW WHEN ABOVE ANIMATION FINISHES
                animateModal.value = withTiming(1)


        } else if (showModalValue === "animateHide") {
                //REVIEW--> HIDE PARENT VIEW ANIMAION WHEN ABOVE ANIMATION FINISHES
                animateModalOpacity.value = withTiming(0,{duration: animationTime,},);

                //REVIEW--> HIDE CHILD ANIMAION 
                animateModal.value = withTiming(0,{duration: animationTime,},finshed => {
                if(finshed) {
                        //REVIEW--> HIDE MODAL WHEN ANIMATION FINISHES 
                        runOnJS(hideModalTotaly)();
                    }
                });
            };
            
    }

    
    else if (animationType === "none") {
        if(showModalValue === "show") {
            animateModalOpacity.value = 1;
            animateModalOpacity.value = 1;
            } 
            else if (showModalValue === "animateHide") {
                animateModalOpacity.value = 0; 
                animateModal.value = hiddenModalValue;
                setShowModalValue("hide");

            };
    }
  },[showModalValue]);


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




    // const pan = Gesture.Pan()
    //   .onBegin(() => {
    //     context.value = topAnimation.value;
    //   })
    //   .onUpdate(event => {
    //     if (event.translationY < 0) {
    //       topAnimation.value = withSpring(openHeight, {
    //         damping: 100,
    //         stiffness: 400,
    //       });
    //     } else {
    //       topAnimation.value = withSpring(context.value + event.translationY, {
    //         damping: 100,
    //         stiffness: 400,
    //       });
    //     }
    //   })
    //   .onEnd(() => {
    //     if (topAnimation.value > openHeight + 50) {
    //       topAnimation.value = withSpring(closeHeight, {
    //         damping: 100,
    //         stiffness: 400,
    //       });
    //     } else {
    //       topAnimation.value = withSpring(openHeight, {
    //         damping: 100,
    //         stiffness: 400,
    //       });
    //     }
    //   });
    



if(showModalValue !== "hide")
    return(
        // parent 
        <AnimatedBlurView
            tint="dark"
            intensity={100}
            style={[animatedParentStyle,parentStyle ? parentStyle : {
            backgroundColor: themColors.transparentBlack5, 
            position: "absolute",
            zIndex: zIndex,
            }]}>

            {/* Space above content */}
            <Pressable onPress={handleSpacePress} style={spaceStyle ? spaceStyle :{
                height: spaceBetweenContent, 
                width: width,
                backgroundColor: "red",
                opacity: 0,
                }}/>


                

                {/* Content view */}
                <Animated.View 
                style={[animatedChildStyle,contentStyle ? contentStyle : {
                    backgroundColor: themColors.primaryBackgroundColor,
                    height: height - spaceBetweenContent,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderTopRightRadius: borderTopRightRadius,
                    borderTopLeftRadius: borderTopRightRadius,
                    overflow: 'hidden',
                    }]}>

                    {showSmallWidget && <View style={{
                    position: "absolute",
                    zIndex: 2,
                    top: useResponsiveVerticalSpace(10),
                    alignItems: "center",
                    justifyContent: "center",
                    width: useResponsiveWidth(40), 
                    height: useResponsiveHeight(3), 
                    borderRadius: useResponsiveRadius(20),
                    backgroundColor: themColors.text,
                    opacity: 0.3,
                    }}/>}

                        {/* Modal content */}
                        {Content ? <Content/> : 
                        <View 
                        style={{
                            height:height, width: width, 
                            backgroundColor: themColors.primary,
                            alignItems: "center",
                            justifyContent: "center"
                            }}>
                            <Text style={{
                                color: themColors.white, 
                                fontSize: useResponsiveFontSize(30),
                                fontWeight: "bold",
                                }}>
                                    No Modal Content
                            </Text>
                        </View>}

                </Animated.View>
        </AnimatedBlurView>
    )
}