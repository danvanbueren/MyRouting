import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const currentDir = path.dirname(fileURLToPath(import.meta.url));


const rootDir = path.resolve(currentDir, '../');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const packetId = req.params.packetId;
    const dest = path.join(rootDir,'private', packetId)

    fs.mkdirSync(dest, { recursive: true });
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
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

export const userUpload = multer({ storage: storage, fileFilter: fileFilter });