export const blockStyleMapper = (entity) => {
  console.log(entity)
  const type = entity.get('type').toLowerCase();
  console.log(type);
  switch (type) {
    case "text":
      return {
        element: "span",
        attributes: {
          class: "text"
        }
      }
    case "title":
      return {
        element: "h1",
        attributes: {
          class: "text",
        }
      }
    case "bullet":
      return {
        element: "li",
        attributes: {
          class: "text",
        }
      }
  }
};
