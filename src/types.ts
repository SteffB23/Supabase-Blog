export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          created_at: string
          username: string
          full_name: string | null
          avatar_url: string | null
        }
        Insert: {
          id: string
          created_at?: string
          username: string
          full_name?: string | null
          avatar_url?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          username?: string
          full_name?: string | null
          avatar_url?: string | null
        }
      }
      posts: {
        Row: {
          id: string
          created_at: string
          title: string
          content: string
          image_url: string | null
          author_id: string
        }
        Insert: {
          id?: string
          created_at?: string
          title: string
          content: string
          image_url?: string | null
          author_id: string
        }
        Update: {
          id?: string
          created_at?: string
          title?: string
          content?: string
          image_url?: string | null
          author_id?: string
        }
      }
      comments: {
        Row: {
          id: string
          created_at: string
          content: string
          post_id: string
          author_id: string
        }
        Insert: {
          id?: string
          created_at?: string
          content: string
          post_id: string
          author_id: string
        }
        Update: {
          id?: string
          created_at?: string
          content?: string
          post_id?: string
          author_id?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}