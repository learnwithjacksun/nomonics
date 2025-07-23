 const autoPopulateUser = (schema) => {
  function autopopulate(next) {
    this.populate("creator", "id firstName lastName email");
    next();
  }

  schema.pre("find", autopopulate);
  schema.pre("findOne", autopopulate);
  schema.pre("findOneAndUpdate", autopopulate);
};

export default autoPopulateUser
