import {createSlice} from '@reduxjs/toolkit';

import {TComment} from '../../types';
import {State} from '../state';
import {MAX_COMMENTS, StatusLoading} from '../../const';
import {fetchCommentsAction, postCommentAction} from '../thunks/comments';
import {getSortedComments} from '../../utils/func';

type TCommentsState = {
  comments?: TComment[];
  statusLoading: StatusLoading;
  statusAddingComment: StatusLoading;
}

const initialState: TCommentsState = {
  statusLoading: StatusLoading.None,
  statusAddingComment: StatusLoading.None,
};

const commentsSlice = createSlice({
  extraReducers: (builder) =>
    builder
      .addCase(fetchCommentsAction.pending, (state) => {
        state.statusLoading = StatusLoading.Loading;
      })
      .addCase(fetchCommentsAction.fulfilled, (state, action) => {
        state.statusLoading = StatusLoading.Success;
        state.comments = action.payload;
      })
      .addCase(fetchCommentsAction.rejected, (state) => {
        state.statusLoading = StatusLoading.Failed;
      })
      .addCase(postCommentAction.pending, (state) => {
        state.statusAddingComment = StatusLoading.Loading;
      })
      .addCase(postCommentAction.fulfilled, (state, action) => {
        if (action.payload) {
          if (!state.comments) {
            state.comments = [];
          }
          state.comments.push(action.payload);
        }
        state.statusAddingComment = StatusLoading.Success;
      })
      .addCase(postCommentAction.rejected, (state) => {
        state.statusAddingComment = StatusLoading.Failed;
      }),
  initialState,
  name: 'comments',
  reducers: {},
});

const commentsActions = {...commentsSlice.actions, fetchCommentsAction, postCommentAction};
const commentsSelectors = {
  selectComments: (state: State) => {
    let comments = state[commentsSlice.name].comments ?? [];
    if (comments.length) {
      comments = getSortedComments(comments).slice(0, MAX_COMMENTS);
    }
    return comments;
  },
  selectStatusAddingComment: (state: State) => state[commentsSlice.name].statusAddingComment ?? [],
};

export {commentsSlice, commentsActions, commentsSelectors};
