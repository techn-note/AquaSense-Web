import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/imgs/');
    },
    filename: function (req, file, cb) {
        const userName = req.session.user.name;
        const fileName = `${userName}Usuario.png`;
        cb(null, fileName);
    }
});

const upload = multer({ storage: storage });

export default upload;
