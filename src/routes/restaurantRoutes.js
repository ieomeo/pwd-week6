const router = require('express').Router();
const c = require('../controllers/restaurantController');

router.get('/', c.list);
router.get('/popular', c.popular);   // /:id 보다 먼저!
router.get('/:id', c.get);
router.post('/', c.create);
router.put('/:id', c.update);
router.delete('/:id', c.remove);

module.exports = router;
