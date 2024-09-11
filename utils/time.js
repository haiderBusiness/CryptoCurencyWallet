// export const getLastSeen = (lastSeen) => {
//   const now = Date.now(); // Current timestamp in milliseconds
//   const lastSeenTime = new Date(lastSeen).getTime(); // Convert ISO string to milliseconds
//   const diff = now - lastSeenTime; // Difference in milliseconds

//   // Time units in milliseconds
//   const minute = 60 * 1000;
//   const hour = 60 * minute;
//   const day = 24 * hour;
//   const week = 7 * day;
//   const month = 30 * day;
//   const year = 12 * month;

  
//     if (diff < 3 * minute) {
//       return "Active now";
//     } else if (diff < hour) {
//       const minutes = Math.floor(diff / minute);
//       return `Seen ${minutes}m ago`;
//     } else if (diff < day) {
//       const hours = Math.floor(diff / hour);
//       return `Seen ${hours}h ago`;
//     } else if (diff < week) {
//       const days = Math.floor(diff / day);
//       return `${days}d ago`;
//     } else if (diff < month) {
//       const weeks = Math.floor(diff / week);
//       return `Seen ${weeks}w ago`;
//     } else if (diff < year) {
//       const months = Math.floor(diff / month);
//       return `Seen ${months}m ago`;
//     } else {
//       return "Seen long ago";
//     }
//   };



  
  // // Example usage
  // const LastSeen = 1721273325983;
  // console.log(getTimeDifference(LastSeen));
  

  export const getLastSeen = (lastSeen) => {
    const now = Date.now(); // Current timestamp in milliseconds
    const lastSeenTime = new Date(lastSeen).getTime(); // Convert ISO string to milliseconds
    const diff = now - lastSeenTime; // Difference in milliseconds


  
    // Time units in milliseconds
    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;
    const week = 7 * day;
    const month = 30 * day;
    const year = 12 * month;
  
    if (diff < 3 * minute) {
    return "Active now";
    } else if (diff < hour) {
    const minutes = Math.floor(diff / minute);
    return `Seen ${minutes}m ago`;
    } else if (diff < day) {
    const hours = Math.floor(diff / hour);
    return `Seen ${hours}h ago`;
    } else if (diff < week) {
    const days = Math.floor(diff / day);
    return `${days}d ago`;
    } else if (diff < month) {
    const weeks = Math.floor(diff / week);
    return `Seen ${weeks}w ago`;
    } else if (diff < year) {
    const months = Math.floor(diff / month);
    const weeks = Math.floor(diff / week);
    return `Seen ${weeks}w ago`;
    } else {
    return "Seen long ago";
    }
};




export const convertMinutes = (minutes) => {
  const minutesInHour = 60;
  const minutesInDay = 24 * minutesInHour;
  const minutesInWeek = 7 * minutesInDay;
  const minutesInMonth = 30 * minutesInDay; // Assuming 30 days in a month
  const minutesInYear = 12 * minutesInMonth; // 12 months in a year

  if (minutes < minutesInHour && minutes < 1) { 
    return `in seconds`;
  } else if (minutes < minutesInHour) {
    return `${minutes} minutes`;
  } else if (minutes < minutesInDay) {
    const hours = Math.floor(minutes / minutesInHour);
    return `${hours} hour${hours > 1 ? 's' : ''}`;
  } else if (minutes < minutesInWeek) {
    const days = Math.floor(minutes / minutesInDay);
    return `${days} day${days > 1 ? 's' : ''}`;
  } else if (minutes < minutesInMonth) {
    const weeks = Math.floor(minutes / minutesInWeek);
    return `${weeks} week${weeks > 1 ? 's' : ''}`;
  } else if (minutes < minutesInYear) {
    const months = Math.floor(minutes / minutesInMonth);
    return `${months} month${months > 1 ? 's' : ''}`;
  } else {
    const years = Math.floor(minutes / minutesInYear);
    return `${years} year${years > 1 ? 's' : ''}`;
  }
};
