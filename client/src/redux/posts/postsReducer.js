import postsTypes from './postsTypes';

const INITIAL_STATE = {
  fetching: false,
  error: false,
  data: {},
  replyComment: undefined
};

const postsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case postsTypes.ADD_POSTS: {
      const posts = {};
      action.payload.map(post => (posts[post._id] = post));
      return { ...state, data: { ...state.data, ...posts } };
    }

    case postsTypes.FETCH_POST_COMMENTS_START: {
      return { ...state, fetching: true, error: false };
    }

    case postsTypes.FETCH_POST_COMMENTS_SUCCESS: {
      const { postId, comments } = action.payload;
      const post = JSON.parse(JSON.stringify(state.data[postId]));
      post.comments = comments;
      return {
        ...state,
        fetching: false,
        error: false,
        data: { ...state.data, [postId]: post }
      };
    }

    case postsTypes.FETCH_POST_COMMENTS_FAILURE: {
      return { ...state, fetching: false, error: action.payload };
    }

    case postsTypes.LIKE_POST: {
      const { postId, response } = action.payload;
      const post = JSON.parse(JSON.stringify(state.data[postId]));
      post.likes = response.likes;
      post.likesCount = response.likesCount;
      return {
        ...state,
        data: {
          ...state.data,
          [postId]: post
        }
      };
    }

    case postsTypes.ADD_COMMENT: {
      const { postId, comment } = action.payload;
      const post = JSON.parse(JSON.stringify(state.data[postId]));
      post.comments.push(comment);
      post.commentsCount++;
      return {
        ...state,
        data: {
          ...state.data,
          [postId]: post
        }
      };
    }

    case postsTypes.SET_COMMENT_REPLIES: {
      const { postId, commentId, comments } = action.payload;
      const post = JSON.parse(JSON.stringify(state.data[postId]));
      const commentIndex = post.comments.findIndex(
        comment => comment._id === commentId
      );
      post.comments[commentIndex].replies = comments;
      return { ...state, data: { ...state.data, [postId]: post } };
    }

    case postsTypes.ADD_COMMENT_REPLY: {
      const { postId, commentId, comment } = action.payload;
      const post = JSON.parse(JSON.stringify(state.data[postId]));
      const commentIndex = post.comments.findIndex(
        comment => comment._id === commentId
      );
      const postComment = post.comments[commentIndex];
      post.commentsCount++;
      postComment.commentsCount++;

      postComment.replies
        ? postComment.replies.push(comment)
        : (postComment.replies = [comment]);
      return { ...state, data: { ...state.data, [postId]: post } };
    }

    case postsTypes.SET_REPLY_COMMENT: {
      const { commentId, username, toggleComments } = action.payload;
      return {
        ...state,
        replyComment: { commentId, username, toggleComments }
      };
    }

    case postsTypes.CLEAR_REPLY_COMMENT: {
      return { ...state, replyComment: undefined };
    }

    case postsTypes.TOGGLE_SHOW_COMMENTS: {
      const { postId, commentId } = action.payload;
      const post = JSON.parse(JSON.stringify(state.data[postId]));
      const commentIndex = post.comments.findIndex(
        comment => comment._id === commentId
      );
      const comment = post.comments[commentIndex];

      if (comment.hasOwnProperty('toggleComments')) {
        comment.toggleComments = !comment.toggleComments;
      } else {
        comment.toggleComments = true;
      }
      return {
        ...state,
        data: { ...state.data, [postId]: post }
      };
    }

    default: {
      return state;
    }
  }
};

export default postsReducer;