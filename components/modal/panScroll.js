import {Gesture, GestureDetector} from 'react-native-gesture-handler';

export const usePanScroll = (topAnimation, scrollMinSpeed, scrollMaxSpeed) => {

    const panScroll = Gesture.Pan()
        .onBegin((event) => {
        // reset context 
        context.value = topAnimation.value;

        })
        .onUpdate(event => {
        if (event.translationY < 0) {
            topAnimation.value = withSpring(openHeight, {
            damping: 100,
            stiffness: 400,
            });

            runOnJS(enableScrolling)(true)
            
        } else {
            runOnJS(enableScrolling)(false)
            // runOnJS(log)("event.translationY: ", event.translationY)
            //if condition here to make sure modal does not scroll if the scrollView was scrolled up before. 
            if(animatedScrollY.value <= 0) {

            // runOnJS(enableScrolling)(false)
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
        // runOnJS(enableScrolling)(true)
        // runOnJS(log)("event.translationY: ", event.translationY)
        // runOnJS(log)("animatedScrollY.value: ", animatedScrollY.value)
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


      return {panScroll};
  }