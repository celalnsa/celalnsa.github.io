/**
 * Created with JetBrains WebStorm.
 * User: High
 * Date: 05/06/14
 * Time: 02:29
 * To change this template use File | Settings | File Templates.
 */
var High = High || {};
High.print = function (obj, strNewLine) {
    if (typeof strNewLine !== 'string') {
        strNewLine = "\n";
    }
    var text = "";
    var count = 0;
    if (obj.constructor === Date) {
        text += obj.toLocaleDateString();
    }
    else if (typeof obj === 'object') {
        for (var i in obj) {
            if (typeof obj[i] === 'object') {
                if (obj[i].constructor === Date) {
                    text += (count > 0 ? strNewLine : "") + i + ":" + obj[i].toLocaleDateString();
                    count++;
                }
                else if (obj[i].constructor === Array) {
                    text += (count > 0 ? strNewLine : "") + i + ":[" + strNewLine + High.print(obj[i], strNewLine) + "]";
                    count++;
                } else {
                    text += (count > 0 ? strNewLine : "") + i + ":{" + strNewLine + High.print(obj[i], strNewLine) + "}";
                    count++;
                }
            } else {
                text += (count > 0 ? strNewLine : "") + i + ":" + obj[i];
                count++;
            }
        }
    } else {
        text += obj;
    }
    return text;
};

High.positionOption = {
    enableHighAccuracy: true,
    maximumAge: 1000,
    timeout: 45000
};

High.infoWindow1 = new BMap.InfoWindow("这是我们寝室的位置");

High.successGetPosition = function (position) {
    alert("成功！\n"+position.coords.longitude+","+position.coords.latitude);
    // 百度地图API功能
    var map = new BMap.Map("render-target");            // 创建Map实例
    //var point = new BMap.Point(116.404,39.915);
    var point = new BMap.Point(position.coords.longitude, position.coords.latitude);    // 创建点坐标
    map.centerAndZoom(point,15);                     // 初始化地图,设置中心点坐标和地图级别。
    map.addControl(new BMap.ZoomControl());          //添加地图缩放控件
    var marker1 = new BMap.Marker(point);  // 创建标注
    map.addOverlay(marker1);              // 将标注添加到地图中
    marker1.addEventListener("click", function(){this.openInfoWindow(High.infoWindow1);});
    //$("#render-target").text(new High.DD2DMS(position.coords.latitude, 'lat').toString(1) + "," + new High.DD2DMS(position.coords.longitude, 'long').toString(1));
};
High.errorGetPosition = function (error) {
    switch (error.code){
        case error.PERMISSION_DENIED:
            alert("失败！\n未获得访问位置信息的许可！");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("失败！\n位置信息不可用！");
            break;
        case error.TIMEOUT:
            alert("失败！\n获取位置信息超时！");
            break;
        default :
            alert("失败！\n不明原因！");
            break;
    }
    //$("#render-target").html(High.print(error,"<br>"));
};
$(function () {
    $("#hiding-trigger").click(function () {
        if (window.navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(High.successGetPosition, High.errorGetPosition, High.positionOption);
        } else {
            alert("说了不兼容！");
        }
    });
});