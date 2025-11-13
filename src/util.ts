import path from 'node:path';
import fs from "node:fs";
import os from "os";
import { type Wallpaper } from './wallpaper-setter';

/**
 * File types supported by awww (previously swww)
 * https://codeberg.org/LGFae/awww#features
 */
const SUPPORTED_FILE_TYPES = [
  "avif",
  "jpeg",
  "jpg",
  "png",
  "gif",
  "pnm",
  "tga",
  "tiff",
  "webp",
  "bmp",
  "ff",
  "svg"
];

/**
 * Replaces the tilde with the home directory.
 * @param filepath The path to replace the tilde with
 * @returns The path with the tilde expanded
 */
function expandHome(filepath: string) {
  if (filepath.startsWith("~")) {
    return path.join(os.homedir(), filepath.slice(1));
  }
  return filepath;
}

/**
 * Returns a list of all wallpapers from a directory.
 * @param dir The directory to look for the wallpapers
 * @param recursiveSearch Search for wallpapers recursively
 */
export function getWallpaperList(dir: string, recursiveSearch = false): Wallpaper[] {
  const convertedDir = path.resolve(expandHome(dir));
  try {
    return fs.readdirSync(convertedDir, { recursive: recursiveSearch, withFileTypes: true })
      .filter(entry => entry.isFile())
      .filter(entry => {
        const extension = entry.name.split(".")[entry.name.split(".").length - 1];
        return SUPPORTED_FILE_TYPES.includes(extension)
      })
      .map(entry => {
        return {
          path: path.join(entry.parentPath, entry.name),
          name: entry.name,
          title: path.join(entry.parentPath.split(convertedDir)[1], entry.name),
          parentDir: entry.parentPath
        }
      });
  }
  catch (err) {
    console.log(err);
  }
  return [];
}