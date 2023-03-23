<script>
  import axios from "axios";
  import { onMount } from "svelte";
  import { functionId } from "./utils/functionId.js";
  import { v4 as uuid } from "uuid";

  $: state = {
    data: {
      discussions: {},
    },
  };

  onMount(async () => {
    state = await axios({
      method: "get",
      url: `https://${functionId}.exm.run`,
    });
  });

  async function handleSubmit(e) {
    const res = await axios({
      method: "post",
      url: `https://${functionId}.exm.run`,
      data: {
        type: "createDiscussion",
        discussion: {
          id: uuid(),
          author: e.target.author.value,
          topic: e.target.topic.value,
          comments: [],
        },
      },
    });

    state.data.discussions = res.data.data.execution.state.discussions;

    e.target.reset();
  }

  async function handleComment(e) {
    const res = await axios({
      method: "post",
      url: `https://${functionId}.exm.run`,
      data: {
        type: "addComment",
        id: e.target.text.id,
        comment: {
          author: e.target.author.value,
          text: e.target.text.value,
        },
      },
    });

    state.data.discussions = res.data.data.execution.state.discussions;

    e.target.reset();
  }
</script>

<header>
  <h1>Discussion Forum</h1>
</header>
<main>
  <form class="discussionForm" on:submit|preventDefault={handleSubmit}>
    <input type="text" name="author" placeholder="Your Alias" />
    <input
      type="text"
      name="topic"
      class="discussionInput"
      placeholder="Topic of Discussion"
    />
    <button type="submit">Create Discussion</button>
  </form>
  {#each Object.values(state.data.discussions) as discussion}
    <div class="discussion">
      <h4>{discussion.topic}</h4>
      <p>Submitted by <strong>{discussion.author}</strong></p>
      {#each Object.values(discussion.comments) as comment}
        <div class="comment">
          <strong>{comment.author}</strong>: {comment.text}
        </div>
      {/each}
      <form class="commentForm" on:submit|preventDefault={handleComment}>
        <input
          type="text"
          name="author"
          class="commentName"
          placeholder="Your Alias"
        />
        <input
          type="text"
          name="text"
          class="commentInput"
          id={discussion.id}
          placeholder="Add Comment"
        />
        <button type="submit" class="commentButton">Add Comment</button>
      </form>
    </div>
  {/each}
</main>
