import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';



const currentDir = path.dirname(fileURLToPath(import.meta.url));


const rootDir = path.resolve(currentDir, '../');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const tempDir = path.join(rootDir, 'private', 'temp');

    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Ensure that only PDFs are uploaded
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed!'), false);
    }
  };

export const userUpload = multer({ storage: storage, fileFilter: fileFilter  });