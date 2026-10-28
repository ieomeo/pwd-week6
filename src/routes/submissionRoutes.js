const router = require('express').Router();
const c = require('../controllers/submissionController');

router.get('/', c.list);
router.get('/:id', c.get);
router.post('/', c.create);
router.put('/:id', c.updateStatus);
router.delete('/:id', c.remove);

module.exports = router;
