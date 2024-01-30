const express = require('express');
const { download, fetchUrlData, listFilesInfo } = require('../../controllers/file.controller');
const {create, veiwAll, veiw, update, remove} = require('../../controllers/post.controller.js');
const router = new express.Router();
const auth = require('../../middleware/user.auth.middleware');

router.post('/download',auth,download);
router.get('/fetchData',auth, fetchUrlData);
router.get('/listfiles', auth, listFilesInfo);
router.post('/post/create',auth, create);
router.get('/post/viewAll', auth, veiwAll);
router.get('/post/view/:postId',auth, veiw);
router.put('/post/update/:postId',auth, update);
router.delete('/post/delete/:postId',auth, remove);
module.exports = router;