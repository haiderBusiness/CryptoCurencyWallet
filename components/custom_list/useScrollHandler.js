import {useRef, useCallback, useState, useEffect} from "react"
import { useResponsiveHeight } from "../../hooks/useResponsiveness";

import Animated, { useSharedValue, withTiming } from "react-native-reanimated";

import debounce from 'lodash/debounce';



// export default function useScrollController (listRef) {
//   const [scrollingEnabled, setScrollingEnabled] = useState(true);
//   const lastScrollOffset = useRef(0);
//   const lastScrollTime = useRef(Date.now());
//   const animationFrameId = useRef(null);

//   const checkScrollSpeed = () => {
//     const currentTime = Date.now();
//     const currentOffset = listRef.current?.contentOffset?.y || 0;
//     const offsetDifference = Math.abs(currentOffset - lastScrollOffset.current);
//     const timeDifference = (currentTime - lastScrollTime.current) / 1000;

//     const speed = Math.min(Math.max(offsetDifference / (timeDifference || 1), 0), 10000);

//     // Disable or enable scrolling based on speed
//     if (speed >= 4000 && scrollingEnabled) {
//       setScrollingEnabled(false);
//     } else if (speed <= 2000 && !scrollingEnabled) {
//       setScrollingEnabled(true);
//     }

//     // Update refs for the next calculation
//     lastScrollOffset.current = currentOffset;
//     lastScrollTime.current = currentTime;

//     // Continue monitoring
//     animationFrameId.current = requestAnimationFrame(checkScrollSpeed);
//   };

//   useEffect(() => {
//     // Start the monitoring loop
//     animationFrameId.current = requestAnimationFrame(checkScrollSpeed);

//     // Clean up on unmount
//     return () => {
//       if (animationFrameId.current) {
//         cancelAnimationFrame(animationFrameId.current);
//       }
//     };
//   }, []);

//   return scrollingEnabled;
// };







export const useScrollHandler = (listRef, scrollMinSpeed, scrollMaxSpeed) => {

  const [scrolling, setScrolling] = useState(true)

  const topHeaderOpacity = useSharedValue(0);

  const fadeInTopHeader = () => {
    topHeaderOpacity.value = withTiming(1, 500);
  };

  const fadeOutTopHeader = () => {
    topHeaderOpacity.value = withTiming(0, 500);
  };



    const lastScrollOffset = useRef(0); // Store the previous scroll offset
    const lastScrollTime = useRef(Date.now()); // Store the previous scroll timestamp
  
    const debounceTimeout = useRef(null);

    const animationFrameId = useRef(null);

    const scrollResetTimeout = useRef(null);

    const requestId = useRef(null);



    
// console.log("here is called")


    const enableFlatListScrolling = (listRef) => {
      if (listRef.current) {
   
        listRef.current.setNativeProps({ scrollEnabled: true }); // Enable scrolling
        // console.log("scrolling enabled")
      }
    }

    const disableFlatListScrolling = (listRef) => {
      if (listRef.current) {
        console.log("scrolling enabled")
        listRef.current.setNativeProps({ scrollEnabled: false }); // Enable scrolling
      }
    }


      // Debounced function to handle scroll end
  const handleScrollEnd = useCallback(
    debounce(() => {

        setScrolling(true); // Re-enable scrolling if it was disabled
    }, 50), // Adjust the debounce delay as needed
    []
  );


    const onScroll = useCallback((event) => {

      // Cancel any previous requestAnimationFrame
      if (requestId.current) {
        cancelAnimationFrame(requestId.current);
      }


      const currentOffset = event.nativeEvent.contentOffset.y; // Get current scroll offset
      // console.log(event.nativeEvent.contentOffset)

      //TODO check requestAnimationFrame performance
      // requestId.current = requestAnimationFrame(() => {



        // fade animation regarding top header
        if (currentOffset >= useResponsiveHeight(38)) {
          fadeInTopHeader();
        } else {
          topHeaderOpacity.value = 0;
          fadeOutTopHeader();
        }



        // > Reducing scrolling speed by disabiling scroll on specpfic speed and re-anabling scrolling again on a specific speed <

        const currentTime = Date.now(); // Get current timestamp
    
        const offsetDifference = Math.abs(currentOffset - lastScrollOffset.current); // Calculate offset difference
        const timeDifference = (currentTime - lastScrollTime.current) / 1000; // Calculate time difference in seconds
    

    
        const speed = Math.min(Math.max(offsetDifference / (timeDifference || 1), 0), 10000);
    
        // Update refs for the next calculation
        lastScrollOffset.current = currentOffset;
        lastScrollTime.current = currentTime;


        // Trigger the debounced scroll end detection
        handleScrollEnd();
  
  
       // Clear previous debounce timeout
        // if (debounceTimeout.current) {
        //   clearTimeout(debounceTimeout.current);
        // }
  
        // Debounce the state update
        // debounceTimeout.current = setTimeout(() => {
          if (speed >= scrollMaxSpeed && scrolling === true) {
            
            setScrolling(false);
            // disableFlatListScrolling(listRef) // bad approach <

            // setTimeout(() => {
            //   if(!scrolling) {
            //     setScrolling(true);
            //   }
            // }, 100); // Adjust the delay as needed

          } else if (speed <= scrollMinSpeed) {
            //console.log("speed else: ", speed)
            setScrolling(true);
            // enableFlatListScrolling(listRef) bad approach
          }

          // console.log("speed: ", speed)
        // }, 0); // Adjust debounce duration as necessary // 

      // });
        
    }, [scrolling]);

    return {onScroll, scrolling, topHeaderOpacity};
}