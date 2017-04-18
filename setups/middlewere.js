//middleware to get ip in request
var requestIp = require('request-ip');
var geoip = require('geoip-lite');
module.exports.ipMiddleware = function(req, res, next) {
    const clientIp = requestIp.getClientIp(req);
    var geo = geoip.lookup(clientIp);
    req.ipGeo={geo:geo,ip:clientIp};
    next();
};

/*
this middleware add  following information about geolocation in request
(example)
{
    geo:
        {
            range: [ 3200196608, 3200200703 ],
            country: 'AR',
            region: '05',
            city: 'Rio Cuarto',
            ll: [ -32.8417, -64.3 ],
            metro: 0,
            zip: 5800
        },
    ip: '190.191.45.133'
}

*/
