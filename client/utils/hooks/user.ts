import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import api from '../axios';

export const useMe = () =>
  useQuery({
    queryKey: ['me'],
    queryFn: () => api.get('/user/me').then(res => res.data),
  });

export const useMyPosts = () =>
  useInfiniteQuery({
    queryKey: ['my-posts'],
    queryFn: ({ pageParam }) =>
      api.get(`/user/posts?cursor=${pageParam ?? ''}`).then(res => res.data),
    initialPageParam: '',
    getNextPageParam: lastPage => lastPage?.nextCursor,
  });

export const useMyReplies = () =>
  useInfiniteQuery({
    queryKey: ['my-replies'],
    queryFn: ({ pageParam }) =>
      api.get(`/user/replies?cursor=${pageParam ?? ''}`).then(res => res.data),
    initialPageParam: '',
    getNextPageParam: lastPage => lastPage?.nextCursor,
  });

export const useUpvotedPosts = () =>
  useInfiniteQuery({
    queryKey: ['upvoted-posts'],
    queryFn: ({ pageParam }) =>
      api.get(`/user/upvoted?cursor=${pageParam ?? ''}`).then(res => res.data),
    initialPageParam: '',
    getNextPageParam: lastPage => lastPage?.nextCursor,
  });

export const useDownvotedPosts = () =>
  useInfiniteQuery({
    queryKey: ['downvoted-posts'],
    queryFn: ({ pageParam }) =>
      api.get(`/user/downvoted?cursor=${pageParam ?? ''}`).then(res => res.data),
    initialPageParam: '',
    getNextPageParam: lastPage => lastPage?.nextCursor,
  });
