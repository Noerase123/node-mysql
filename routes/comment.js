var express = require('express');
var router = express.Router();
const commentController = require('../controllers/commentController')

router.get('/', commentController.selectAll);

router.get('/:id', commentController.selectById);

router.post('/', commentController.addComment);

router.put('/:id', commentController.updateComment);

router.delete('/:id', commentController.deleteComment);

module.exports = router
