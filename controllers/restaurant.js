var crypto = require('crypto')
var Restaurant = require('../models/restaurant')
// Register restaurant account.
var registerRestaurant = function(req, res, next) {
    // Valid the form data.
    if (!req.body.manager_number
        || !req.body.password
        || !req.body.restaurant_name) {
        console.log('[Error] wrong post format.')
        return res.status(400).json({
            errcode: 400,
            errmsg: '[Error] wrong post format.'
        })
    }

    // Get md5(password)
    var md5 = crypto.createHash('md5')
    var password = md5.update(req.body.password).digest('hex')

    Restaurant.create(req.body.manager_number, password, req.body.restaurant_name)
    .then(function(result) {
        let restaurant = result[0]
        return res.status(201).json({
            code: 201,
            msg: '[Success] Created',
            data: restaurant
        })
    })
    .catch(function(err) {
        if (err) {
	    console.log(err)
            console.log('[Error] Duplicate number.')
            return res.status(403).json({
                errcode: 403,
                errmsg: '[Error] Duplicate number.',
		        errdata: err
	        })
        }
    })
}

// Get restaurant account.
var getRestaurant = function(req, res, next) {
    // Valid the form data.
    var restaurant_id
    if (req.session.restaurant_id === undefined) {
        req.query.restaurant_id = Number(req.query.restaurant_id)
        if (!req.query.restaurant_id) {
            return res.status(400).json({
                errcode: 400, 
                errmsg: '[Error] wrong get format. Find no \'restaurant_id\'.'
            })
        }
        else restaurant_id = req.query.restaurant_id
    }
    else restaurant_id = req.session.restaurant_id


    Restaurant.get(restaurant_id)
    .then(function(result) {
        if (result[0] === undefined) {
            return res.status(403).json({
                errcode: 403,
                errmsg: '[Error] The restaurant is not exist.'
            })
        }
        else {
            var restaurant = result[0]
            return res.status(200).json({
                code: 200,
                msg: '[Success] Get restaurant successfully',
                data: restaurant
            })
        }
    })
    .catch(function(err) {
        if (err) {
            console.log(err)
            return res.status(500).json({
                errcode: 500,
                errmsg: '[Error] Internal Server Error. Database error.',
                errdata: err
            })
        }
    })

}

// 更新桌子数目
var updateDesk = function(req, res, next) {
    req.body.desk_number = Number(req.body.desk_number)
    // 校验update format
    if (!req.body.desk_number) {
        console.log('[Error] wrong post format.')
        return res.status(400).json({
            errcode: 400,
            errmsg: '[Error] wrong post format.'
        })
    }

    // 更新
    Restaurant.update_desk(req.body.desk_number, req.session.restaurant_id)
    .then(function(result) {
        return res.status(200).json({
            code: 200,
            msg: 'Update desk_number successfully!',
            data: result
        })
    })
    .catch(function(err) {
        if (err) {
            console.log(err)
            return res.status(500).json({
                errcode: 500,
                errmsg: '[Error] Internal Server Error. Database error.',
                errdata: err
            })
        }
    })
}
// 更新餐厅账户信息
var updateRestaurant = function(req, res, next) {
    // 校验update format
    if (!req.body.restaurant_name || !req.body.description || !req.body.restaurant_number) {
        console.log('[Error] wrong post format.')
        return res.status(400).json({
            errcode: 400,
            errmsg: '[Error] wrong post format.'
        })
    }
    var image_url = ''
    if (req.file) {
	// image_url = 'http://zhidan.site:8080/'+req.file.filename
	    image_url = 'img/'+req.file.filename

    }

    Restaurant.update(req.body.restaurant_name, req.body.description, req.body.restaurant_number, req.session.restaurant_id, image_url)
    .then(function(result) {
	req.body.image_url = image_url
        return res.status(200).json({
            code: 200,
            msg: 'Update restaurant successfully!',
            data: req.body
        })
    })
    .catch(function(err) {
        if (err) {
            console.log(err)
            return res.status(500).json({
                errcode: 500,
                errmsg: '[Error] Internal Server Error. Database error.',
                errdata: err
            })
        }
    })
}

module.exports = {
    registerRestaurant: registerRestaurant,
    getRestaurant: getRestaurant,
    updateDesk: updateDesk,
    updateRestaurant: updateRestaurant
}
