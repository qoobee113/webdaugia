"use strict";
var express = require('express'),
    handlebars = require('express-handlebars'),
    handlebars_sections = require('express-handlebars-sections'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    path = require('path'),
    wnumb = require('wnumb'),
    handle404 = require('./middle-wares/handle-404'),
    handleLayout=require('./middle-wares/handleLayout'),
    index= require('./controllers/indexController'),
    quanlinguoidung=require('./controllers/danhsachnguoidungController'),
    yeucau=require('./controllers/yeucauController'),
    timkiem = require('./controllers/timkiemController'),
    danhsachdanhmuc=require('./controllers/quanlydanhmucController'),
    sanpham = require('./controllers/sanphamController'),
    dangbanController = require('./controllers/dangbanController'),
    taikhoan=require('./controllers/taikhoanController'),
    quanlisanphamtaikhoan = require('./controllers/quanlisanphamcanhanController');
    var a = require('./controllers/kiemtrasanpham');

var request = require('request');
var session = require('express-session');
// var fileStore = require('session-file-store')(session);
var MySQLStore = require('express-mysql-session')(session);

var app = express();

app.use(morgan('dev'));
app.use(session({
    secret: 'Z7X7gXzoKBT8h18jwXBEP4T0kJ8=',
    resave: false,
    saveUninitialized: true,
    // store: new fileStore()
    store: new MySQLStore({
        host: 'ef4c05ef-58ef-4171-8e55-a8e2010d7ed3.mysql.sequelizer.com',
        port: 3306,
        user: 'pnovjrrhhanugqaa',
        password: 'XKB4PoPSv35J85REyZakVwuyfdaNsjX7eqThyxtuYYBBUetvraxwMXoApdXKnbyk',
        database: 'dbef4c05ef58ef41718e55a8e2010d7ed3',
        createDatabaseTable: true,
        schema: {
            tableName: 'sessions',
            columnNames: {
                session_id: 'session_id',
                expires: 'expires',
                data: 'data'
            }
        }
    }),
}));
app.engine('hbs', handlebars({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: 'views/_layouts/',
    helpers: {
        section: handlebars_sections(),
        number_format: function (n) {
            var nf = wnumb({
                thousand: ','
            });
            return nf.to(n) + " VNĐ";
        },
        number_format1: function (n) {
            var nf = wnumb({
                thousand: ','
            });
            return nf.to(n) + " Đ";
        }
    }
}));
app.set('view engine', 'hbs');

app.use(express.static(
    path.resolve(__dirname, 'public')
));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(handleLayout);
app.use('/', index);
app.use('/quanliuser',quanlinguoidung);
app.use('/quanliyeucau',yeucau);
app.use('/quanlidanhmuc',danhsachdanhmuc);
app.use('/timkiem', timkiem);
app.use('/sanphamloai1', sanpham);
app.use('/taikhoan',taikhoan);
app.use('/dangban',dangbanController);
app.use('/quanlisanphamtaikhoan',quanlisanphamtaikhoan);

app.use(handle404);

app.listen(process.env.PORT || 3000,function () {
    console.log('Sever Is Running');
   // a.KiemTraSanPham();
});

module.exports = app;