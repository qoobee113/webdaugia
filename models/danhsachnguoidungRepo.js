/**
 * Created by MiM on 22/06/2017.
 */
var mustache = require('mustache'),
    q = require('q'),
    db = require('../fn/db');
exports.load = function() {
    var sql = 'select idUSER,tendangnhap,hoten,email,sodienthoai,diachi,chan from user';
    return db.load(sql);
}
