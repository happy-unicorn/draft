export const blockStyleMapper = (entity) => {
  const type = entity.get('type').toLowerCase();
  console.log(type);
  switch (type) {
    case "unstyled":
      return {
        attributes: {
          class: "text"
        }
      }
  }
};