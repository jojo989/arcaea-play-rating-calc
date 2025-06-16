import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.resolve('songs.db');

const db = new Database(dbPath);

export async function load() {
  try {
    const songs = db.prepare('SELECT rowid, song, artist, pst, prs, ftr, etr, byd, length, bpm FROM song_tb').all();
    return { songs };
  } catch (error) {
    console.error('Database error:', error);
    return { songs: [] };
  }
}


