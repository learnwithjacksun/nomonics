const toSlug = (value) => {
  return value.replace(/\s+/g, "").toLowerCase();
};

export default toSlug;