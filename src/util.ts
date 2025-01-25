import { dirname, join } from "node:path";
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Constructs the full path for a given filename by joining it with the current directory path.
 *
 * @param filename - The name of the file for which the full path is to be constructed.
 * @returns The full path of the file as a string.
 */
export const getFullPathForFile = (filename: string) => join(__dirname, filename);
