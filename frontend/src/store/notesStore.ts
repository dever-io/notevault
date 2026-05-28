import { create } from "zustand";

import type { Note } from "../types";

interface NotesState {
  notes: Note[];
  searchQuery: string;
  loading: boolean;
  error: string | null;
  setNotes: (notes: Note[]) => void;
  upsertNote: (note: Note) => void;
  removeNote: (id: string) => void;
  setSearchQuery: (q: string) => void;
  setLoading: (b: boolean) => void;
  setError: (e: string | null) => void;
}

export const useNotesStore = create<NotesState>((set) => ({
  notes: [],
  searchQuery: "",
  loading: false,
  error: null,
  setNotes: (notes) => set({ notes }),
  upsertNote: (note) =>
    set((s) => {
      const i = s.notes.findIndex((n) => n.id === note.id);
      if (i === -1) return { notes: [note, ...s.notes] };
      const next = s.notes.slice();
      next[i] = note;
      return { notes: next };
    }),
  removeNote: (id) => set((s) => ({ notes: s.notes.filter((n) => n.id !== id) })),
  setSearchQuery: (q) => set({ searchQuery: q }),
  setLoading: (b) => set({ loading: b }),
  setError: (e) => set({ error: e }),
}));
