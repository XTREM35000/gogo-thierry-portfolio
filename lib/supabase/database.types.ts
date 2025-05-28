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
      profile: {
        Row: {
          id: string
          name: string
          title: string
          email: string | null
          phone: string | null
          github: string | null
          photo_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          title: string
          email?: string | null
          phone?: string | null
          github?: string | null
          photo_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          title?: string
          email?: string | null
          phone?: string | null
          github?: string | null
          photo_url?: string | null
          created_at?: string
        }
      }
      experiences: {
        Row: {
          id: string
          title: string
          company: string
          period: string
          description: string
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          company: string
          period: string
          description: string
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          company?: string
          period?: string
          description?: string
          created_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          title: string
          description: string
          tags: string[] | null
          screenshot_url: string | null
          github_url: string | null
          live_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          tags?: string[] | null
          screenshot_url?: string | null
          github_url?: string | null
          live_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          tags?: string[] | null
          screenshot_url?: string | null
          github_url?: string | null
          live_url?: string | null
          created_at?: string
        }
      }
      skills: {
        Row: {
          id: string
          category: string
          items: string[]
          created_at: string
        }
        Insert: {
          id?: string
          category: string
          items: string[]
          created_at?: string
        }
        Update: {
          id?: string
          category?: string
          items?: string[]
          created_at?: string
        }
      }
      contacts: {
        Row: {
          id: string
          name: string
          email: string
          subject: string
          message: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          subject: string
          message: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          subject?: string
          message?: string
          created_at?: string
        }
      }
    }
  }
}