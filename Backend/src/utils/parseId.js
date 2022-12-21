export const parseId = (id) => {
  id = parseInt(id);
  return Number.isNaN(id) ? new Error('Parse ID!') :id;
};
