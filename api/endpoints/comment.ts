const COMMENT_ENDPOINTS = {
  getById: (id: number) => `/api/v1/comments/${id}`,
  update: (id: number) => `/api/v1/comments/${id}`,
  delete: (id: number) => `/api/v1/comments/${id}`,
  resetLikes: (id: number) => `/api/v1/comments/${id}/reset`,
  addLike: (commentId: number, userId: number) =>
    `/api/v1/comments/${commentId}/${userId}/like`,
  removeLike: (commentId: number, userId: number) =>
    `/api/v1/comments/${commentId}/${userId}/unlike`,
  reply: '/api/v1/comments/reply',
  create: '/api/v1/comments/create',
  getAll: '/api/v1/comments',
  getTopLevelComments: '/api/v1/comments/comments',
  getLikesCount: (id: number) => `/api/v1/comments/${id}/likes`,
  testHello: '/api/v1/comments/hello',
};

export default COMMENT_ENDPOINTS;
