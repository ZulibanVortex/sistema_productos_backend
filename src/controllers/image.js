const multer = require('multer');
const sharp = require('sharp');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename:  (req, file, cb) => {
        const ext = file.originalname.split('.').pop();
        cb(null, `${Date.now()}.${ext}`);
    }
});

const upload = multer({ storage });

module.exports = upload
exports.uploadImage =  (req, res) => {
    res.status(200).json({
        ok: true,
        data: 'imagen subida'
    });
}
