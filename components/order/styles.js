import { StyleSheet, Platform} from "react-native";

import {
  useResponsiveFontSize,
  useResponsiveHeight,
  useResponsiveHorizontalSpace,
  useResponsiveRadius,
  useResponsiveVerticalSpace,
  useResponsiveWidth,
} from "../../hooks/useResponsiveness.js";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    // backgroundColor: "red",
    height: 230,
  },
  child: {},

  //HEADER
  userView: {
    flexDirection: "row",
    justifyContent: "flex-start",
    // backgroundColor: "red",
  },

  userImageView: {
    shadowOffset: { width: -1, height: 1 },
    shadowColor: "rgba(0,0,0,0.3)",
    shadowOpacity: 0.35,
    shadowRadius: useResponsiveRadius(7),
    elevation: 10,

    // backgroundColor: "red",
    height: useResponsiveHeight(55),
    width: useResponsiveWidth(55),
    borderRadius: useResponsiveRadius(30),
    justifyContent: "center",
    alignItems: "center",
    marginRight: useResponsiveHorizontalSpace(9),

    // backgroundColor: "red",
  },

  userImage: {
    width: useResponsiveWidth(50),
    height: useResponsiveHeight(50),
    borderRadius: useResponsiveRadius(50),
    borderWidth: 1.5,
    borderColor: "white",
  },

  userFirstLastName: {
    fontSize: useResponsiveFontSize(16),
    fontWeight: "600",
    textTransform: "capitalize",
    marginRight: useResponsiveHorizontalSpace(14),

  },











  
  //ORDER
  orderView: {
    backgroundColor: "red",
    paddingLeft: useResponsiveHorizontalSpace(14),
    paddingRight: useResponsiveHorizontalSpace(14),
    paddingTop: useResponsiveHorizontalSpace(18),
    paddingBottom: useResponsiveHorizontalSpace(18),
    marginTop: useResponsiveVerticalSpace(8),
    shadowOffset: { width: -1, height: 1 },
    shadowColor: Platform.OS === "android" ? "rgba(0,0,0,0.1)" : "rgba(0,0,0,1)",
    shadowOpacity: 0.05,
    shadowRadius: useResponsiveRadius(7),
    elevation: 3,


    borderColor: "rgba(0,0,0,0.1)",
    borderWidth: useResponsiveWidth(0.19),
    borderRadius: useResponsiveRadius(15)
  },



  orderFirstRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  buyingTextAndCoinView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

  },

  buySellText: {
    fontSize: useResponsiveFontSize(15),
    fontWeight: "600",
    textTransform: "capitalize",
    marginRight: useResponsiveHorizontalSpace(14),
  },

  coin: {
    width: useResponsiveWidth(25),
    height: useResponsiveHeight(25),
    marginRight: useResponsiveHorizontalSpace(14),
  },

  createdAt: {
    fontSize: useResponsiveFontSize(13),
    opacity: 0.7,
    // marginTop: useResponsiveVerticalSpace(3),
  },












  // Middle
  paymentMethod: {
    textTransform: "capitalize",
    fontSize: useResponsiveFontSize(13),
    fontWeight: "500",
    marginTop: useResponsiveVerticalSpace(14),
  },







  //LastPart 
  exchangeView: {
     marginTop: useResponsiveHorizontalSpace(10),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  payingDetailsView: {
    marginTop: useResponsiveVerticalSpace(5),
  },
  youPay:{
    textAlign: "left",
    marginBottom: useResponsiveHorizontalSpace(5),
    marginRight: useResponsiveHorizontalSpace(5),
  },
  amountPaid: {
    
  },


  exchangeIcon: {
    width: useResponsiveWidth(25),
    height: useResponsiveHeight(25)
  },


  receivingDetailsView: {

  },
  youRceive: {
    // backgroundColor: "red",
    textAlign: "left",
    marginRight: useResponsiveHorizontalSpace(5),
  },

  amountReceived: {

  },


  orderStatus: {
    paddingTop: useResponsiveVerticalSpace(5),
    paddingBottom: useResponsiveVerticalSpace(5),
    paddingHorizontal: useResponsiveHorizontalSpace(10),
    borderRadius: useResponsiveRadius(6),
    borderWidth: useResponsiveWidth(1)
  },

  orderStatusText: {
    fontSize: useResponsiveFontSize(13),
    textTransform: "capitalize",
    fontWeight: "600",
  },




});

export default styles;
