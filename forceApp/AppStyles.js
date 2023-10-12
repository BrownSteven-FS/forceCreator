import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  largeHeading: {
    fontSize: 80,
    fontWeight: "800",
  },
  listContainer: {
    height: 200,
  },
  listing: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  figure: {
    marginRight: 16,
  },
  image: {
    width: 36,
    height: 36,
    marginBottom: 8,
  },
  caption: {
    fontSize: 12,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
  },
  details: {
    marginTop: 8,
  },
  actions: {
    position: "absolute",
    top: 16,
    right: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  h1: {
    fontSize: 32,
    fontWeight: "bold",
  },
  h2: {
    fontSize: 28,
    fontWeight: "bold",
  },
  h3: {
    fontSize: 24,
    fontWeight: "bold",
  },
  h4: {
    fontSize: 20,
    fontWeight: "bold",
  },
  h5: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
