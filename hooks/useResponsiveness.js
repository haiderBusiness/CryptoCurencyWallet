import { Dimensions } from 'react-native';

const BASE_SIZES = [
  { device: 'iPhone 6/7/8', width: 375, height: 667 },
  { device: 'iPhone 6/7/8 Plus', width: 414, height: 736 },
  { device: 'iPhone X/XS', width: 375, height: 812 },
  { device: 'iPhone XR/XS Max', width: 414, height: 896 },
  { device: 'iPhone 12/13 Mini', width: 360, height: 780 },
  { device: 'iPhone 12/13/14 Pro Max', width: 430, height: 932 },
];

// Get current device screen dimensions
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Function to determine the closest baseline dimensions for a device
const getClosestBaseline = () => {
  // Find the baseline with the closest width to the current screen width
  return BASE_SIZES.reduce((closest, baseline) => {
    return Math.abs(baseline.width - SCREEN_WIDTH) < Math.abs(closest.width - SCREEN_WIDTH)
      ? baseline
      : closest;
  });
};

const BASELINE = getClosestBaseline();
const BASE_WIDTH = BASELINE.width;
const BASE_HEIGHT = BASELINE.height;

console.log(`Detected device baseline: ${BASELINE.device} (${BASE_WIDTH} x ${BASE_HEIGHT})`);

// Function to scale size based on width
export const scaleSize = (size) => (SCREEN_WIDTH / BASE_WIDTH) * size;

// Function to scale size based on height (for height-dependent components)
export const verticalScale = (size) => (SCREEN_HEIGHT / BASE_HEIGHT) * size;

// Function to normalize size (width-based scaling with a customizable factor)
export const moderateScale = (size, factor = 0.5) =>
  size + (scaleSize(size) - size) * factor;





export function useResponsiveBothHeightWidth(number) {
  //TODO:
  const deviceDimentions = "test";

  const value = number * 1

  if (deviceDimentions === "test") {
    return scaleSize(value);
  } else {
    return number;
  }
}



export function useResponsiveVerticalSpace(number) {
  //TODO:
  const deviceDimentions = "test";

  const value = number * 1

  if (deviceDimentions === "test") {
    return scaleSize(value);
  } else {
    return number;
  }
}

export function useResponsiveHorizontalSpace(number) {
  //TODO:
  const deviceDimentions = "test";
  const value = number * 1

  if (deviceDimentions === "test") {

    return scaleSize(value);
  } else {
    return number;
  }
}

export function useResponsiveFontSize(number) {
  //TODO:
  const deviceDimentions = "test";


  if (deviceDimentions === "test") {

    return moderateScale(number, -2);
  } else {
    return number;
  }
}

export function useResponsiveWidth(number) {
  //TODO:
  const deviceDimentions = "test";

  if (deviceDimentions === "test") {
    return scaleSize(number);
  } else {
    return number;
  }
}

export function useResponsiveHeight(number) {
  //TODO:
  const deviceDimentions = "test";

  const value = number * 0.8

  if (deviceDimentions === "test") {
    return verticalScale(value);
  } else {
    return number;
  }
}

export function useResponsiveRadius(number) {
  //TODO:
  const deviceDimentions = "test";

  if (deviceDimentions === "test") {
    return scaleSize(number);
  } else {
    return number;
  }
}
