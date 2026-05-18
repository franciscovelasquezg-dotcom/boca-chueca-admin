import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { nanoid } from '../utils/nanoid'
import { useTaskStore } from './taskStore'
import type { Idea, IdeaSource } from '../types/hub'

interface IdeaStore {
  ideas: Idea[]
  addIdea: (text: string, source?: IdeaSource) => void
  convertToTask: (ideaId: string) => void
  removeIdea: (id: string) => void
}

export const useIdeaStore = create<IdeaStore>()(
  persist(
    (set, get) => ({
      ideas: [],

      addIdea: (text, source = 'cliente') => {
        const idea: Idea = {
          id: nanoid(),
          text,
          source,
          converted: false,
          created_at: new Date().toISOString(),
        }
        set((s) => ({ ideas: [idea, ...s.ideas] }))
      },

      convertToTask: (ideaId) => {
        const idea = get().ideas.find((i) => i.id === ideaId)
        if (!idea || idea.converted) return

        const task = useTaskStore.getState().addTask({
          title: idea.text,
          type: 'user_feedback',
          priority: 'medium',
          tags: ['idea-cliente', idea.source],
        })

        set((s) => ({
          ideas: s.ideas.map((i) =>
            i.id === ideaId ? { ...i, converted: true, task_id: task.id } : i
          ),
        }))
      },

      removeIdea: (id) =>
        set((s) => ({ ideas: s.ideas.filter((i) => i.id !== id) })),
    }),
    { name: 'boca-ideas' }
  )
)
