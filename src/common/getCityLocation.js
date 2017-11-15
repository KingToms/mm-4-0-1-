import "./geolocation.min" // 引入腾讯前端定位组件的js
let flag = false;
/* 获取当前定位的城市（粗略定位） */
function geoLocation (){
  if(!flag){
    let geolocation = new qq.maps.Geolocation("525BZ-YED3G-LVMQM-I4SUN-QKSX7-S6FEX", "myapp");
    let options = {timeout: 8000};
    geolocation.getLocation(showPosition, showErr, options);
  }else{
    console.log(111,JSON.parse(localStorage.getItem("current_city")));
    return JSON.parse(localStorage.getItem("current_city"));
  }
};
function showPosition(position){
  console.log(111);
  let city_name = position.city ? position.city : "广州市";
  let city_id = position.adcode ? position.adcode : "440100";
  city_id = city_id.toString().substring(0,4) + "00"; // 确保获取的是城市ID，而不是区ID.
  let cityObj = {"city_name":city_name,"city_id":city_id};
  localStorage.setItem("current_city", JSON.stringify(cityObj)); // localStore存储当前城市及ID
  flag= true;
  geoLocation ()
};
function showErr(){
  let cityObj = {"city_name": "广州市","city_id": "440100"};
  localStorage.setItem("current_city", JSON.stringify(cityObj))
  alert("定位失败！请在首页重新选择城市");
};

export default {
  geoLocation: geoLocation,
}