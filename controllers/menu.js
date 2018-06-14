var Category = require('../models/category')
var Dish = require('../models/dish')
// 创建分类
var createCategory = function(req, res, next) {
    // 校验请求格式
    if (!req.body.category_name) {
        console.log('[Error] wrong post format.')
        return res.status(400).json({
            errcode: 400, 
            errmsg: '[Error] wrong post format.'
        })
    }
    // 创建
    Category.create(req.session.restaurant_id, req.body.category_name)
    .then(function(result) {
        res.status(201).send({
            code: 201,
            msg: '[Success] Created',
            data: result[0]
        })
    })
    .catch(function(err) {
        res.status(500).send({
            errcode: 500,
            errmsg: '[Error] Created fail.',
            errdata: err
        })
    })
}

// 创建菜品
var createDish = function(req, res, next) {
    // 校验请求格式
    req.body.price=Number(req.body.price)
    if (!req.body.dish_name
        || !req.body.price
        || req.body.flavor === undefined
        || req.body.description === undefined
        || !req.body.category_id) {
        console.log('[Error] wrong post format.')
        return res.status(400).json({
            errcode: 400, 
            errmsg: '[Success] wrong post format.'
        })
    }

    // 创建
    Dish.create(req.body.dish_name, req.body.price, req.body.flavor, req.body.description,
            req.body.category_id, req.session.restaurant_id)
        .then(function(result) {
            res.status(201).send({
                code: 201,
                msg: '[Success] Created',
                data: result[0]
            })
        })
        .catch(function(err) {
            res.status(500).send({
                errcode: 500,
                errmsg: '[Error] Created fail.',
                errdata: err
            })
        })
}

// 获取菜单
var getMenu = function(req, res, next) {
    // 校验
    var restaurant_id
    if (req.session.restaurant_id === undefined) {
        req.query.number = Number(req.query.number)
        if (!req.query.number) {
            return res.status(400).json({
                errcode: 400, 
                errmsg: '[Error] wrong get format. Find no \'number\'.'
            })
        }
        else restaurant_id = req.query.restaurant_id
    }
    else restaurant_id = req.session.restaurant_id

    // 查询
    Category.get(restaurant_id)
    .then(function(categories) {
        for (var index = 0; index < categories.length; index++) {
            categories[index].dishes = []
        }
        return categories
    })
    .then(function(categories) {
        return Dish.get(restaurant_id)
        .then(function(dishes) {
            // 记录 category_id 对应index
            var cmap = {}
            for (var index = 0; index < categories.length; index++) {
                cmap[categories[index].category_id] = index
                categories[index].dishes = []
            }
            // 填补categories中单品
            for (var index = 0; index < dishes.length; index++) {
                var c_index = cmap[dishes[index].category_id]
                categories[c_index].dishes.push(dishes[index])
            }
            return res.status(200).json({
                code: 200,
                msg: '[Success] Get menu successfully',
                data: categories
            })
        })
    })
    .catch(function(err) {
        res.status(500).send({
            errcode: 500,
            errmsg: '[Error] Created fail.',
            errdata: err
        })
    })
}


module.exports = {
    createCategory: createCategory,
    createDish: createDish,
    getMenu: getMenu
}