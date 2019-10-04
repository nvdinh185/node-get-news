const router = require('express').Router();

const postHandler = require('../../utils/post-handler');

const handlers = require('../../handlers/news/news-handler');

router.post('/get-news'
    , postHandler.jsonProcess
    , handlers.getNewsList
);

router.get('/get-file/*'
    , handlers.getMediaFile
);

module.exports = router;