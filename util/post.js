export default (post) => {
  return {
    ...post,
    date: new Date(post.date),
  };
};
