const viewStyleSample = {
  // Layout
  flex: 1000, // Flex grow factor
  flexDirection: "row", // Direction of the children layout ('row' or 'column')
  justifyContent: "center", // Aligns children along the main axis ('flex-start', 'center', 'space-between', etc.)
  alignItems: "center", // Aligns children along the cross axis ('flex-start', 'center', 'stretch', etc.)
  alignSelf: "flex-end", // Aligns a single child (overrides `alignItems`)
  alignContent: "space-between", // Aligns flex lines ('flex-start', 'center', etc.)
  flexWrap: "wrap", // Allows children to wrap ('wrap', 'nowrap')
  flexBasis: "auto", // Defines the initial size of a flex item
  flexGrow: 1, // Defines the ability to grow relative to other items
  flexShrink: 1, // Defines the ability to shrink relative to other items
  position: "absolute", // Positioning type ('relative', 'absolute')
  top: 10, // Offset from the top edge (when `position` is 'absolute')
  right: 10, // Offset from the right edge (when `position` is 'absolute')
  bottom: 10, // Offset from the bottom edge (when `position` is 'absolute')
  left: 10, // Offset from the left edge (when `position` is 'absolute')
  zIndex: 1, // Stacking order of the component

  // Size
  width: 100, // Width of the component
  height: 100, // Height of the component
  minWidth: 50, // Minimum width of the component
  maxWidth: 200, // Maximum width of the component
  minHeight: 50, // Minimum height of the component
  maxHeight: 200, // Maximum height of the component

  // Margin and Padding
  margin: 10, // Space outside the component
  marginTop: 20, // Space on the top side
  marginRight: 15, // Space on the right side
  marginBottom: 20, // Space on the bottom side
  marginLeft: 15, // Space on the left side
  padding: 15, // Space inside the component
  paddingTop: 20, // Space on the top side inside the component
  paddingRight: 15, // Space on the right side inside the component
  paddingBottom: 20, // Space on the bottom side inside the component
  paddingLeft: 15, // Space on the left side inside the component

  // Border
  borderWidth: 2, // Width of the border
  borderTopWidth: 1, // Width of the top border
  borderRightWidth: 1, // Width of the right border
  borderBottomWidth: 1, // Width of the bottom border
  borderLeftWidth: 1, // Width of the left border
  borderColor: "blue", // Color of the border
  borderTopColor: "red", // Color of the top border
  borderRightColor: "green", // Color of the right border
  borderBottomColor: "yellow", // Color of the bottom border
  borderLeftColor: "purple", // Color of the left border
  borderRadius: 10, // Radius of the component’s corners
  borderTopRightRadius: 5, // Radius for the top-right corner
  borderTopLeftRadius: 5, // Radius for the top-left corner
  borderBottomRightRadius: 5, // Radius for the bottom-right corner
  borderBottomLeftRadius: 5, // Radius for the bottom-left corner
  borderStyle: "solid", // Style of the border ('solid', 'dotted', 'dashed')

  // Background
  backgroundColor: "lightgrey", // Background color
  backgroundImage: "url(image.png)", // Background image (use ImageBackground component for actual images)
  backgroundSize: "cover", // Size of the background image
  backgroundPosition: "center", // Position of the background image
  backgroundRepeat: "no-repeat", // Repeat behavior of the background image

  // Overflow
  overflow: "hidden", // What happens to content that overflows the component’s bounds ('visible', 'hidden', 'scroll')

  // Shadow (iOS only)
  shadowColor: "black", // Color of the shadow
  shadowOffset: { width: 0, height: 2 }, // Offset of the shadow
  shadowOpacity: 0.3, // Opacity of the shadow
  shadowRadius: 5, // Blur radius of the shadow

  // Elevation (Android only)
  elevation: 10, // Shadow depth for Android
};

export default viewStyleSample;
