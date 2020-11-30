import React from "react";
import { Card } from "antd";
import axios from "../../axios";
import mapboxgl, { Marker } from "mapbox-gl";
import "../order/bikeMap.css";
import "./detail.less";
import Axios from "axios";
export default class Order extends React.Component {
  state = {};

  componentDidMount() {
    let orderId = this.props.match.params.orderId;
    if (orderId) {
      this.getDetailInfo(orderId);
    }
  }

  getDetailInfo = async (orderId) => {
    await Axios.get(`http://localhost:3001/orders/${orderId}`).then((res) => {
      this.setState({
        orderInfo: res.data,
      });
      this.renderMap(res.data.routeList);
    });
  };

  renderMap = (routeList) => {
    let list = routeList;
    //添加起始图标
    var geojson = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [-74.023733, 40.745183],
          },
          properties: {
            title: "Bike loaction",
            description: "Howe Center Lot",
          },
        },
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [-74.027554, 40.734979],
          },
          properties: {
            title: "Bike loaction",
            description: "Hoboken Terminal",
          },
        },
      ],
    };

    mapboxgl.accessToken =
      "pk.eyJ1IjoiamFja3NvbG8iLCJhIjoiY2toNnBwMXRjMDBubTJycGQyZ3FrbHhnYiJ9.ncXh5O5Yi17CBF2cFKn3iA";
    var map = new mapboxgl.Map({
      container: "orderDetailMap",
      center: [-74.023733, 40.745183],
      style: "mapbox://styles/jacksolo/ckh6qmrra040d19qe44v4wi6w",
      zoom: 13,
    });

    var start = document.createElement("div");
    start.className = "start_marker";

    var end = document.createElement("div");
    end.className = "end_marker";

    new mapboxgl.Marker(start)
      .setLngLat(list[0])
      .setPopup(
        new mapboxgl.Popup({ offset: 25 }) // add popups
          .setHTML("<h3>" + "start position" + "</h3>")
      )
      .addTo(map);

    new mapboxgl.Marker(end)
      .setLngLat(list[list.length - 1])
      .setPopup(
        new mapboxgl.Popup({ offset: 25 }) // add popups
          .setHTML("<h3>" + "end position" + "</h3>")
      )
      .addTo(map);

    /*
        var marker = new mapboxgl.Marker()
                .setLngLat([-74.024827,40.745500])
                .addTo(this.map);
        */

    // 行驶路线
    map.on("load", function () {
      map.addSource("route", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: list,
          },
        },
      });
      map.addLayer({
        id: "route",
        type: "line",
        source: "route",
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#088",
          "line-width": 8,
        },
      });
    });

    // 服务区路线
    map.on("load", function () {
      map.addSource("maine", {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [-74.010777, 40.777223], //port imperial
                [-74.031356, 40.787589], //tonnelle ave station
                [-74.082462, 40.72537], //lincoln park
                [-74.033762, 40.712222], //exchange place
              ],
            ],
          },
        },
      });
      map.addLayer({
        id: "maine",
        type: "fill",
        source: "maine",
        layout: {},
        paint: {
          "fill-color": "#048",
          "fill-opacity": 0.4,
        },
      });
    });

    // 添加地图中的自行车

    // 添加地图控件
  };

  /*renderMap = (result)=>{

        this.map = new window.BMap.Map('orderDetailMap');
        // this.map.centerAndZoom('北京',11);
        // 添加地图控件
        this.addMapControl();
        // 调用路线图绘制方法
        this.drawBikeRoute(result.position_list);
        // 调用服务区绘制方法
        this.drwaServiceArea(result.area);
    }

    // 添加地图控件
    addMapControl = ()=>{
        let map = this.map;
        map.addControl(new window.BMap.ScaleControl({ anchor: window.BMAP_ANCHOR_TOP_RIGHT}));
        map.addControl(new window.BMap.NavigationControl({ anchor: window.BMAP_ANCHOR_TOP_RIGHT }));
    }

    // 绘制用户的行驶路线
    drawBikeRoute = (positionList)=>{
        let map = this.map;
        let startPoint = '';
        let endPoint = '';
        if (positionList.length>0){
            let first = positionList[0];
            let last = positionList[positionList.length-1];
            startPoint = new window.BMap.Point(first.lon,first.lat);
            let startIcon = new window.BMap.Icon('/assets/start_point.png',new window.BMap.Size(36,42),{
                imageSize:new window.BMap.Size(36,42),
                anchor: new window.BMap.Size(18, 42)
            })

            let startMarker = new window.BMap.Marker(startPoint, { icon: startIcon});
            this.map.addOverlay(startMarker);

            endPoint = new window.BMap.Point(last.lon, last.lat);
            let endIcon = new window.BMap.Icon('/assets/end_point.png', new window.BMap.Size(36, 42), {
                imageSize: new window.BMap.Size(36, 42),
                anchor: new window.BMap.Size(18, 42)
            })
            let endMarker = new window.BMap.Marker(endPoint, { icon: endIcon });
            this.map.addOverlay(endMarker);

            // 连接路线图
            let trackPoint = [];
            for(let i=0;i<positionList.length;i++){
                let point = positionList[i];
                trackPoint.push(new window.BMap.Point(point.lon, point.lat));
            }

            let polyline = new window.BMap.Polyline(trackPoint,{
                strokeColor:'#1869AD',
                strokeWeight:3,
                strokeOpacity:1
            })
            this.map.addOverlay(polyline);
            this.map.centerAndZoom(endPoint, 11);
        }
        
    }

    // 绘制服务区
    drwaServiceArea = (positionList)=>{
        // 连接路线图
        let trackPoint = [];
        for (let i = 0; i < positionList.length; i++) {
            let point = positionList[i];
            trackPoint.push(new window.BMap.Point(point.lon, point.lat));
        }
        // 绘制服务区
        let polygon = new window.BMap.Polygon(trackPoint, {
            strokeColor: '#CE0000',
            strokeWeight: 4,
            strokeOpacity: 1,
            fillColor: '#ff8605',
            fillOpacity:0.4
        })
        this.map.addOverlay(polygon);

    }

    render(){
        const info = this.state.orderInfo || {};
        return (
            <div>
                <Card>
                    <div id="orderDetailMap" className="order-map"></div>
                    <div className="detail-items">
                        <div className="item-title">基础信息</div>
                        <ul className="detail-form">
                            <li>
                                <div className="detail-form-left">用车模式</div>
                                <div className="detail-form-content">{info.mode == 1 ?'服务区':'停车点'}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">订单编号</div>
                                <div className="detail-form-content">{info.order_sn}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">车辆编号</div>
                                <div className="detail-form-content">{info.bike_sn}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">用户姓名</div>
                                <div className="detail-form-content">{info.user_name}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">手机号码</div>
                                <div className="detail-form-content">{info.mobile}</div>
                            </li>
                        </ul>
                    </div>
                    <div className="detail-items">
                        <div className="item-title">行驶轨迹</div>
                        <ul className="detail-form">
                            <li>
                                <div className="detail-form-left">行程起点</div>
                                <div className="detail-form-content">{info.start_location}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">行程终点</div>
                                <div className="detail-form-content">{info.end_location}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">行驶里程</div>
                                <div className="detail-form-content">{info.distance/1000}公里</div>
                            </li>
                        </ul>
                    </div>
                </Card>
            </div>
        );
    }
}

    } */

  render() {
    const info = this.state.orderInfo || {};
    return (
      <div style={{ width: "100%" }}>
        <Card>
          <div id="orderDetailMap" className="order-map"></div>
          <div className="detail-items">
            <div className="item-title">Order Info</div>
            <ul className="detail-form">
              <li>
                <div className="detail-form-left">Usage Mode</div>
                <div className="detail-form-content">
                  {info.mode == 1
                    ? "Designated Parking Zone"
                    : "No Parking Zone"}
                </div>
              </li>
              <li>
                <div className="detail-form-left">Order Number</div>
                <div className="detail-form-content">{info.order_sn}</div>
              </li>
              <li>
                <div className="detail-form-left">Bike Number</div>
                <div className="detail-form-content">{info.bike_sn}</div>
              </li>
              <li>
                <div className="detail-form-left">User Name</div>
                <div className="detail-form-content">{info.user_name}</div>
              </li>
              <li>
                <div className="detail-form-left">Phone Number</div>
                <div className="detail-form-content">{info.mobile}</div>
              </li>
            </ul>
          </div>
          <div className="detail-items">
            <div className="item-title">Route</div>
            <ul className="detail-form">
              <li>
                <div className="detail-form-left">Start Time</div>
                <div className="detail-form-content">{info.start_time}</div>
              </li>
              <li>
                <div className="detail-form-left">End Time</div>
                <div className="detail-form-content">{info.end_time}</div>
              </li>
              <li>
                <div className="detail-form-left">Distance</div>
                <div className="detail-form-content">{info.distance}Mile</div>
              </li>
            </ul>
          </div>
        </Card>
      </div>
    );
  }
}
