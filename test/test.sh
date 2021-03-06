ROOT_URL="http://127.0.0.1:3000"
COOKIE_FILE="cookie.txt"

echo "Test API on $ROOT_URL"

# curl -X POST --header 'Content-Type: application/x-www-form-urlencoded' --header 'Accept: application/json' -d 'number=111&password=1111' 'http://127.0.0.1:3000/session'
# curl -X POST  -d 'number=13128809301&password=123456' 'http://127.0.0.1:3000/session' -D cookie.txt
# curl -b cookie.txt http://:3000/restaurant/desk -d desk_number=10 -X PUT

echo "----- Session API -----"
SES="$ROOT_URL/session"

# POST /session
echo "POST $SES"
curl $SES -X POST  -d 'manager_number=13128809303&password=123456' -D $COOKIE_FILE
echo $'\n'

# GET /session
echo "POST $SES"
curl $SES -X GET -b $COOKIE_FILE
echo $'\n'

# DELETE /session
# echo "DELETE $SES"
# curl $SES -
# echo $'\n\n'


echo "----- Restaurant API -----"
RES="$ROOT_URL/restaurant"
RES_DES="$ROOT_URL/restaurant/desk"

# POST /restaurant  create restaurant
echo "POST $RES"
curl $RES -X POST -d 'manager_number=13128809303&password=123456&restaurant_name=hahaha'
echo $'\n'

# GET /restaurant  get restaurant
echo "GET $RES"
curl $RES -X GET -b $COOKIE_FILE
echo $'\n'

# PUT /restaurant/desk
echo "PUT $RES_DES"
curl $RES_DES -X PUT -d 'desk_number=10' -b $COOKIE_FILE
echo $'\n\n'

# PUT /restaurant/ update zhanghu
echo "PUT $RES"
curl $RES -X PUT -d 'restaurant_name=newhaha&description=testupdate&restaurant_number=99' -b $COOKIE_FILE
echo $'\n\n'

echo "----- Menu API -----"
MEN="$ROOT_URL/menu"
CAT="$ROOT_URL/menu/category"
DIS="$ROOT_URL/menu/dish"

# POST /menu/dish 创建分类
echo "POST $CAT"
curl $CAT -X POST -d 'category_name=主食' -b $COOKIE_FILE
echo $'\n'

# PUT /menu/category 更新分类名
echo "PUT $CAT"
curl $CAT -X PUT -d 'category_name=吃屎&category_id=1' -b $COOKIE_FILE
echo $'\n\n'

# GET /menu 创建菜品
echo "GET $DIS"
curl $DIS -X POST -d 'dish_name=东坡肉&price=10.3&flavor=辣&description=主厨推荐&category_id=1' -b $COOKIE_FILE
echo $'\n'

# PUT /menu/dish 更新菜品
echo "PUT $DIS"
curl $DIS -X PUT -d 'dish_name=屎&price=9999&flavor=hot&description=fresh&category_id=1' -b $COOKIE_FILE
echo $'\n\n'

# POST /menu/category 获取菜单
echo "POST $MEN"
curl $MEN -X GET -b $COOKIE_FILE
echo $'\n\n'




echo "----- Order API -----"
ORD="$ROOT_URL/order"

# POST /order
echo "POST $ORD"
curl $ORD -X POST -H "Content-Type: application/json" -d '{"restaurant_id":3, "total_price": 334, "dish_number":1, "desk_id": 1, "tableware":"是", "dish_list":[{"dish_id":1}]}'
echo $'\n'

# GET /order
echo "GET $ORD"
curl "$ORD?date=2018-06-21" -X GET -b $COOKIE_FILE
echo $'\n'

# PUT /order
echo "PUT $ORD" 
curl $ORD -X PUT -H "Content-Type: application/json" -b $COOKIE_FILE -d '{"order_list": [{"order_id": 1}, {"order_id": 2}, {"order_id": 3}, {"order_id": 4}, {"order_id": 4}]}'
echo $'\n\n'


echo "----statistics API-----"
SID="$ROOT_URL/statistics"
SIDDAY="$ROOT_URL/statistics/day"
SIDWEEKEND="$ROOT_URL/statistics/weekend"
SIDMONTH="$ROOT_URL/statistics/month"
SIDYEAR="$ROOT_URL/statistics/year"
SIDHOUR="$ROOT_URL/statistics/hour"
# 获取饭店营业总额
echo "GET $SID"
curl "$SID?restaurant_id=3" -X GET  -b $COOKIE_FILE
echo $'\n\n'

# 按天获取饭店营业额
echo "GET &SIDDAY"
curl "$SIDDAY?restaurant_id=3&date=2018-06-27" -X GET -b $COOKIE_FILE
echo $'\n\n'

# 按周获取饭店营业额
echo "GET &SIDDAY"
curl "$SIDWEEKEND?restaurant_id=3&date=2018-06-27" -X GET -b $COOKIE_FILE
echo $'\n\n'

# 按月获取饭店营业额
echo "GET &SIDDAY"
curl "$SIDMONTH?restaurant_id=3&date=2018-06-27" -X GET -b $COOKIE_FILE
echo $'\n\n'

# 按年获取饭店营业额
echo "GET &SIDDAY"
curl "$SIDYEAR?restaurant_id=3&date=2018-06-27" -X GET -b $COOKIE_FILE
echo $'\n\n'


# 按小时获取饭店营业额
echo "GET &SIDDAY"
curl "$SIDHOUR?restaurant_id=3&date=2018-06-27" -X GET -b $COOKIE_FILE
echo $'\n\n'