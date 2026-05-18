import { Note } from '../models/note.js';
import createHttpError from 'http-errors';

export const getNotes = async (req, res) => {
  const { page = 1, perPage = 10, tag, search } = req.query;
  const skip = (page - 1) * perPage;
  const limit = perPage;

  const filters = {};

  if (tag) {
    filters.tag = tag;
  }

  let notesQuery = Note.find(filters);

  if (search) {
    notesQuery = Note.find({
      ...filters,
      $text: { $search: search },
    });
  }
  const [totalItems, notes] = await Promise.all([
    notesQuery.clone().countDocuments(),
    notesQuery.skip(skip).limit(limit),
  ]);

  const totalPages = Math.ceil(totalItems / limit);

  res.status(200).json({
    page,
    perPage,
    totalItems,
    totalPages,
    notes,
  });
};

export const getAllNotes = async (req, res) => {
  const notes = await Note.find();
  res.status(200).json(notes);
};

export const getNoteById = async (req, res) => {
  const { noteId } = req.params;
  const note = await Note.findById(noteId);

  if (!note) {
    throw createHttpError(404, 'Note not found');
  }
  res.status(200).json(note);
};

export const createNote = async (req, res) => {
  const note = await Note.create(req.body);
  res.status(201).json(note);
};

export const deleteNote = async (req, res) => {
  const { noteId } = req.params;
  const note = await Note.findOneAndDelete({ _id: noteId });
  if (!note) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json(note);
};

export const updateNote = async (req, res) => {
  const { noteId } = req.params;
  const note = await Note.findByIdAndUpdate(noteId, req.body, {
    returnDocument: 'after',
  });

  if (!note) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json(note);
};
