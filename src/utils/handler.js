export async function handle(state, action) {
  const { input } = action;
  if (input.type === 'createDiscussion') {
    state.discussions[input.discussion.id] = input.discussion;
  }
  if (input.type === 'addComment') {
    state.discussions[input.id].comments.push(input.comment);
  }
  return { state };
}
