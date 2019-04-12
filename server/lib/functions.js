module.exports = {
  updateCategories: (arr, category) => {
    // Createroom.js 62-74
    if (arr.includes(category)) {
      let newArr = arr.filter(cat => cat !== category);
      let categories = newArr;
      return categories;
    } else {
      let categories = [...arr, category];
      return categories;
    }
  }
};
