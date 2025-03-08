import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  authScreen: {
    backgroundColor: "white",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: Dimensions.get("window").width * 0.05,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  authOptions: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 10,
  }
});
