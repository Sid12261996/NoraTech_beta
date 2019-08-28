const mongo = require('mongoose'),
    schema = mongo.Schema
;

const webHooks = new schema({
    _id: schema.Types.ObjectId,
    payload: {type: schema.Types.Object},
    event: {type: schema.Types.String},
    timeStamp: {type: schema.Types.String},
    createdAt: {type: schema.Types.Date},
    account_id: {type: schema.Types.String}
});

module.exports = mongo.model('webhooks', webHooks);
