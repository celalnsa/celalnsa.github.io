/**
 * Created with JetBrains WebStorm.
 * User: High
 * Date: 05/06/14
 * Time: 03:52
 * To change this template use File | Settings | File Templates.
 */
var High = High || {};
High.DD2DMS = function (degree, lat_long) {
    this.sign = (degree < 0) ? -1 : 1;
    degree = Math.abs(degree);
    this.degree = parseInt(degree);
    degree = (degree - this.degree) * 60;
    this.minute = parseInt(degree);
    degree = (degree - this.minute) * 60;
    this.second = Math.round(degree * 1000000) / 1000000;
    this.direction = (lat_long == 'lat') ? ((this.sign > 0) ? 'N' : 'S') : ((this.sign > 0) ? 'E' : 'W');
    this.toString = function (dir) {
        if (isNaN(dir)) {
            return (this.degree * this.sign) + "\u00b0" + this.minute + "'" + this.second + '"';
        } else {
            return this.degree + "\u00b0" + this.minute + "'" + this.second + '" ' + this.direction;
        }
    }
}

High.DMS2DD = function (degree, minute, second, direction) {
    if (direction) {
        this.direction = direction.toUpperCase();
        if (this.direction == 'W' || this.direction == 'S') {
            this.sign = -1;
        } else if (this.direction == 'E' || this.direction == 'N') {
            this.sign = 1;
        } else {
            this.direction = '';
        }
        this.degree = Math.round((Math.abs(degree) + minute / 60 + second / 3600) * 1000000) / 1000000;
        this.toString = function (dir) {
            if (isNaN(dir) || this.direction == '') {
                return (this.degree * this.sign) + "\u00b0";
            } else {
                return this.degree + "\u00b0" + ' ' + this.direction;
            }
        }
    }
}