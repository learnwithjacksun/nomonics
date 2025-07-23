 
 
 const toJSONPlugin = (schema) => {
    schema.set("toJSON", {
      transform(_doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      
      },
    });
  };

  export default toJSONPlugin;