import {commentsSlice} from './comments.ts';
import {StatusLoading} from '../../const.ts';
import {fetchCommentsAction, postCommentAction} from '../thunks/comments.ts';
import {makeFakeComment} from '../../utils/mocks.ts';

describe('Comments Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      statusLoading: StatusLoading.None,
      statusAddingComment: StatusLoading.None,
    };

    const result = commentsSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      statusLoading: StatusLoading.None,
      statusAddingComment: StatusLoading.None,
    };

    const result = commentsSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set "Loading" with "fetchCommentsAction.pending" action', () => {
    const initialState = {
      statusLoading: StatusLoading.None,
      statusAddingComment: StatusLoading.None,
    };
    const expectedState = {
      statusLoading: StatusLoading.Loading,
      statusAddingComment: StatusLoading.None,
    };

    const result = commentsSlice.reducer(initialState, fetchCommentsAction.pending('id', ''));

    expect(result).toEqual(expectedState);
  });

  it('should set "Success" with "fetchCommentsAction.fulfilled" action', () => {
    const comments = [makeFakeComment()];
    const initialState = {
      statusLoading: StatusLoading.Loading,
      statusAddingComment: StatusLoading.None,
    };
    const expectedState = {
      comments,
      statusLoading: StatusLoading.Success,
      statusAddingComment: StatusLoading.None,
    };

    const result = commentsSlice.reducer(initialState, fetchCommentsAction.fulfilled(comments, 'id', ''));

    expect(result).toEqual(expectedState);
  });

  it('should set "Failed" with "fetchCommentsAction.rejected" action', () => {
    const initialState = {
      statusLoading: StatusLoading.Loading,
      statusAddingComment: StatusLoading.None,
    };
    const expectedState = {
      statusLoading: StatusLoading.Failed,
      statusAddingComment: StatusLoading.None,
    };

    const result = commentsSlice.reducer(initialState, fetchCommentsAction.rejected(null, 'id', ''));

    expect(result).toEqual(expectedState);
  });

  it('should set "Loading" with "postCommentAction.pending" action', () => {
    const initialState = {
      statusLoading: StatusLoading.None,
      statusAddingComment: StatusLoading.None,
    };
    const expectedState = {
      statusLoading: StatusLoading.None,
      statusAddingComment: StatusLoading.Loading,
    };

    const result = commentsSlice.reducer(initialState, postCommentAction.pending('id', {
      offerId: 'offerId',
      commentData: {comment: 'test', rating: 5}
    }));

    expect(result).toEqual(expectedState);
  });

  it('should set "Success" with "postCommentAction.fulfilled" action', () => {
    const comment = makeFakeComment();
    const initialState = {
      statusLoading: StatusLoading.None,
      statusAddingComment: StatusLoading.Loading,
    };
    const expectedState = {
      comments: [comment],
      statusLoading: StatusLoading.None,
      statusAddingComment: StatusLoading.Success,
    };

    const result = commentsSlice.reducer(initialState, postCommentAction.fulfilled(comment, 'id', {
      offerId: 'offerId',
      commentData: {comment: 'test', rating: 5}
    }));

    expect(result).toEqual(expectedState);
  });

  it('should set "Failed" with "postCommentAction.rejected" action', () => {
    const initialState = {
      statusLoading: StatusLoading.None,
      statusAddingComment: StatusLoading.Loading,
    };
    const expectedState = {
      statusLoading: StatusLoading.None,
      statusAddingComment: StatusLoading.Failed,
    };

    const result = commentsSlice.reducer(initialState, postCommentAction.rejected(null, 'offerId', {
      offerId: 'offerId',
      commentData: {comment: 'test', rating: 5}
    }));

    expect(result).toEqual(expectedState);
  });
});
