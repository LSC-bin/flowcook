export type Difficulty = 'beginner' | 'intermediate' | 'advanced'

export interface RecipeTool {
  name: string
  url?: string
  required: boolean
}

export interface RecipeStep {
  title: string
  content: string
  code?: { language: string; content: string }
}

export interface RecipeFile {
  filename: string
  type: string
  content?: string
}

export interface Recipe {
  slug: string
  title: string
  description: string
  category: 'Marketing' | 'Development' | 'Productivity' | 'Data' | 'Communication' | 'Other'
  difficulty: Difficulty
  estimatedMinutes: number
  tools: RecipeTool[]
  steps: RecipeStep[]
  files: RecipeFile[]
  tags: string[]
  author: string
  sourceUrl?: string // original source / inspiration link
  verified: boolean // ran end-to-end before publishing
  createdAt: string
  updatedAt: string
}

export const DIFFICULTY_LABEL: Record<Difficulty, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
}

export const DIFFICULTY_COLOR: Record<Difficulty, string> = {
  beginner: 'bg-emerald-500',
  intermediate: 'bg-orange-500',
  advanced: 'bg-red-500',
}

export const CATEGORIES = ['Marketing', 'Development', 'Productivity', 'Data', 'Communication', 'Other'] as const
