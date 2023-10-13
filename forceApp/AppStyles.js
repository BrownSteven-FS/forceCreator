import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  caption: {
    paddingVertical: 4,
    fontSize: 12,
    fontStyle: "italic",
  },
  figure: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  actions: {
    marginVertical: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 60,
  },

  input: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
  },
  inputContainer: {
    padding: 10,
  },
  form: {
    marginBottom: 130,
  },
  h1: {
    paddingVertical: 12,
    fontSize: 32,
    fontWeight: "bold",
  },
  h2: {
    textAlign: "center",
    paddingVertical: 12,
    fontSize: 28,
    fontWeight: "bold",
  },
  h3: {
    textAlign: "center",
    paddingVertical: 8,
    fontSize: 24,
    fontWeight: "bold",
  },
  h4: {
    textAlign: "center",
    paddingVertical: 8,
    fontSize: 20,
    fontWeight: "bold",
  },
  h5: {
    textAlign: "center",
    textTransform: "capitalize",
    fontSize: 16,
    fontWeight: "bold",
  },
});
