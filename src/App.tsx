import React from 'react';
import { Pencil, LogOut } from 'lucide-react';
import { supabase } from './lib/supabase';
import { useAuth } from './hooks/useAuth';
import { usePosts } from './hooks/usePosts';
import Auth from './components/Auth';
import PostEditor from './components/PostEditor';
import PostList from './components/PostList';

export default function App() {
  const { user, loading: authLoading } = useAuth();
  const { posts, loading: postsLoading, createPost, addComment } = usePosts();

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Auth />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900 flex items-center">
              <Pencil className="w-5 h-5 mr-2" />
              Support Blog
            </h1>
            <button
              onClick={() => supabase.auth.signOut()}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              <LogOut className="w-4 h-4 mr-1" />
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="space-y-8">
          <section className="bg-white p-6 rounded-lg shadow-sm">
            <PostEditor onSave={async ({ title, content, imageUrl }) => {
              await createPost(title, content, imageUrl);
            }} />
          </section>

          <section>
            {postsLoading ? (
              <div className="text-center py-12">
                <div className="text-gray-500">Loading posts...</div>
              </div>
            ) : (
              <PostList
                posts={posts}
                onAddComment={addComment}
              />
            )}
          </section>
        </div>
      </main>
    </div>
  );
}