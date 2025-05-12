import axios from '@/api/axiosInstance';
import COMMENT_ENDPOINTS from '../api/endpoints/comment';

export const getCommentById = (id: number) => {
  return axios.get(COMMENT_ENDPOINTS.getById(id));
};

export const updateComment = (id: number, data: any) => {
  return axios.put(COMMENT_ENDPOINTS.update(id), data);
};

export const deleteComment = (id: number) => {
  return axios.delete(COMMENT_ENDPOINTS.delete(id));
};

export const resetLikes = (id: number) => {
  return axios.post(COMMENT_ENDPOINTS.resetLikes(id));
};

export const addLike = (commentId: number, userId: number) => {
  return axios.post(COMMENT_ENDPOINTS.addLike(commentId, userId));
};

export const removeLike = (commentId: number, userId: number) => {
  return axios.post(COMMENT_ENDPOINTS.removeLike(commentId, userId));
};

export const replyToComment = (data: any) => {
  return axios.post(COMMENT_ENDPOINTS.reply, data);
};

export const createComment = (data: any) => {
  return axios.post(COMMENT_ENDPOINTS.create, data);
};

export const getAllComments = () => {
  return axios.get(COMMENT_ENDPOINTS.getAll);
};

export const getTopLevelComments = () => {
  return axios.get(COMMENT_ENDPOINTS.getTopLevelComments);
};

export const getLikesCount = (id: number) => {
  return axios.get(COMMENT_ENDPOINTS.getLikesCount(id));
};

export const testHello = () => {
  return axios.get(COMMENT_ENDPOINTS.testHello);
};
