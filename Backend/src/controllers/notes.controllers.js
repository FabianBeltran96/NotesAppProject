import { db } from "../db.js";
import { parseId } from "../utils/parseId.js";

export const getNotes = async (req, res) => {
  try {
    const notes = await db.note.findMany();
    res.json(notes);
  } catch (error) {
    return res.status(500).json("Error: " + error.message);
  }
};

export const createNote = async (req, res) => {
  try {
    const { title, content, priority } = req.body;
    const newNote = await db.note.create({
      data: {
        title: title,
        content: content,
        priority: priority,
      },
    });
    res.send(newNote);
  } catch (error) {
    console.log(error);
  }
};

export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const idParsed = parseId(id);

    if (idParsed instanceof Error) res.status(400).json(idParsed.message);
    
    const noteUpdated = await db.note.update({
      where: { id: idParsed },
      data: {
        ...req.body,
      },
    });
    res.send(noteUpdated);
  } catch (error) {
    console.log(error);
  }
};

export const deleteNote = async (req, res) => {
  try {
    const deleteUser = await db.note.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.send(deleteUser);
  } catch (error) {
    console.log(error);
  }
};
