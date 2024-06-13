import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getUserImagePath = (userName) => {
    const imagePath = path.join(__dirname, "..", "public", "imgs", `${userName}Usuario.png`);
    
    if (fs.existsSync(imagePath)) {
        return `imgs/${userName}Usuario.png`;
    }

    return "imgs/image-profile.svg";
};
