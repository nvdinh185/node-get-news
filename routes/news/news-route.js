const router = require('express').Router();

const postHandler = require('../../utils/post-handler');
const tokenHandler = require('../../utils/token-proxy');

const resourceHandler = require('../../handlers/news/news-handler');

let handlers = resourceHandler.ResourceHandler;

router.post('/get-news'
    , tokenHandler.getTokenNext
    , tokenHandler.verifyProxyTokenNext
    , postHandler.jsonProcess //lay du lieu req.json_data.friends/follows/publics/limit/offset
    , handlers.getNewsList //lay tin tuc tu req.user?, publics, follows, friends,
);

router.get('/get-file/*'
    //, tokenHandler.getToken
    //, tokenHandler.verifyProxyToken
    , handlers.getMediaFile
);

module.exports = router;