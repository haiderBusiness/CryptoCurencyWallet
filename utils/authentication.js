import * as LocalAuthentication from "expo-local-authentication";

export const authenticate = async () => {
  const hasHardware = await LocalAuthentication.hasHardwareAsync();
  const isEnrolled = await LocalAuthentication.isEnrolledAsync();

  if (hasHardware && isEnrolled) {
    const result = await LocalAuthentication.authenticateAsync();
    if (result.success) {
      console.log("Authenticated successfully");
    } else {
      console.log("Authentication failed");
    }
  } else {
    console.log("Biometric authentication not available/enrolled");
  }
};
