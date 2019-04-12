const functions = require("./functions");

describe("functions", () => {
  describe("updateCategories", () => {
    it("returns array length of 2 if the category doesnt exist", () => {
      const stateCategories = ["music", "education"];
      const category = "music";
      expect(
        functions.updateCategories(stateCategories, category)
      ).toHaveLength(1);
    }),
      it("returns an array with the correct output", () => {
        const stateCategories = ["gaming", "comedy", "sports"];
        const category = "education";
        expect(functions.updateCategories(stateCategories, category)).toEqual([
          "gaming",
          "comedy",
          "sports",
          "education"
        ]);
      });
  });
});
