import React, { useState } from 'react';
import type { Post } from '../types';
import { MessageSquare } from 'lucide-react';

interface PostListProps {
  posts: Post[];
  onAddComment: (postId: string, content: string) => Promise<void>;
}

export default function PostList({ posts, onAddComment }: PostListProps) {
  const [commentContent, setCommentContent] = useState<{ [key: string]: string }>({});
  const [loadingComments, setLoadingComments] = useState<{ [key: string]: boolean }>({});

  const handleAddComment = async (postId: string) => {
    const content = commentContent[postId];
    if (!content) return;

    setLoadingComments((prev) => ({ ...prev, [postId]: true }));
    try {
      await onAddComment(postId, content);
      setCommentContent((prev) => ({ ...prev, [postId]: '' }));
    } finally {
      setLoadingComments((prev) => ({ ...prev, [postId]: false }));
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <article key={post.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
          {post.image_url && (
            <img
              src={post.image_url}
              alt={post.title}
              className="w-full h-48 object-cover"
            />
          )}
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {post.title}
            </h2>
            <p className="text-gray-600 mb-4">{post.content}</p>
            
            <div className="border-t pt-4 mt-4">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Comments</h3>
              <div className="space-y-2">
                {post.comments.map((comment) => (
                  <div key={comment.id} className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                    {comment.content}
                  </div>
                ))}
              </div>
              
              <div className="mt-3 flex gap-2">
                <input
                  type="text"
                  value={commentContent[post.id] || ''}
                  onChange={(e) => setCommentContent((prev) => ({
                    ...prev,
                    [post.id]: e.target.value
                  }))}
                  placeholder="Add a comment..."
                  className="flex-1 min-w-0 rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                />
                <button
                  onClick={() => handleAddComment(post.id)}
                  disabled={loadingComments[post.id] || !commentContent[post.id]}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50"
                >
                  <MessageSquare className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}