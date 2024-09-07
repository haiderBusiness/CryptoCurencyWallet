import Order from "../components/order/Order";

import React, {memo} from "react"

const TestItem = ({ item, index }) => {

    // console.log("index: ", index)

    return(

      <>


          {/* {index === 1 && item === "listHeader" && listHeader &&
            <ListHeader />
          } */}


        <Order
        
        />
            
      </>
    );
  }


  export default memo(TestItem);