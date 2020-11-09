import React from 'react'
import { Card, Form } from 'antd'
import axios from '../../axios/index'
import BaseForm from '../../components/BaseForm'
import mapboxgl, { Marker } from 'mapbox-gl'
import '../map/bikeMap.css'
export default class Order extends React.Component{

    state = {
        bikeInfo:{}
    }

    map = {}

    // 表单封装，通过构建表单对象，在BaseForm中进行统一渲染
    formList = [
        {
            type: 'City'
        }, {
            type: 'Time_search'
        }, {
            type: 'SELECT',
            label: 'Order Status',
            field: 'order_status',
            placeholder: 'All',
            initialValue: '0',
            width: 500,
            list: [{id: '0', name: 'All'}, {id: '1', name: 'In process'}, {id: '3', name: 'End route'}]
        }
    ]

    params = {
        page:1
    }

    // 列表请求
    requestList = ()=>{
        axios.ajax({
            url:'/backup',
            data:{
                params:this.params
            }
        }).then((res)=>{
            if(res){
                this.setState({
                    total_count:res.result.total_count
                },()=>{
                    
                })
                this.renderMap(res.result);
            }
        })
    }

    // 查询表单
    handleFilterSubmit = (filterParams) => {
        this.params = filterParams;
        this.requestList();
    };

    componentDidMount(){
        this.requestList();
    }

    // 渲染地图
    renderMap = (res) => {
        let list = res.route_list;
        //添加起始图标
        var geojson = {
            type: 'FeatureCollection',
            features: [{
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [-74.023733, 40.745183]
              },
              properties: {
                title: 'Bike loaction',
                description: 'Howe Center Lot'
              }
            },
            {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [-74.027554, 40.734979]
              },
              properties: {
                title: 'Bike loaction',
                description: 'Hoboken Terminal'
              }
            },
            {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [-74.033787, 40.741748]
              },
              properties: {
                title: 'Bike loaction',
                description: 'Hoboken University Medical Center'
              }
            },            {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [-74.042781,40.741527]
              },
              properties: {
                title: 'Bike loaction',
                description: '2nd Street Light Rail Staion'
              }
            },
            {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [-74.033811, 40.727030]
              },
              properties: {
                title: 'Bike loaction',
                description: 'Newport Path Station'
              }
            },
            {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [-74.042737,40.719553]
              },
              properties: {
                title: 'Bike loaction',
                description: 'Grove Street Path Station'
              }
            },
            {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [-74.052860, 40.719185]
              },
              properties: {
                title: 'Bike loaction',
                description: '99 Ranch Market'
              }
            },
            {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [-74.035943,40.732875]
              },
              properties: {
                title: 'Bike loaction',
                description: 'Target'
              }
            }]
          };

        mapboxgl.accessToken = 'pk.eyJ1IjoiamFja3NvbG8iLCJhIjoiY2toNnBwMXRjMDBubTJycGQyZ3FrbHhnYiJ9.ncXh5O5Yi17CBF2cFKn3iA';
        var map = new mapboxgl.Map({
            container:'map',
            center: [-74.027554, 40.734979],
            style: 'mapbox://styles/jacksolo/ckh6qmrra040d19qe44v4wi6w',
            zoom: 13
        });

        geojson.features.forEach(function(marker) {

            // create a HTML element for each feature
            var el = document.createElement('div');
            el.className = 'marker';
          
            // make a marker for each feature and add to the map
            new mapboxgl.Marker(el)
                .setLngLat(marker.geometry.coordinates)
                .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
                .setHTML('<h3>' + marker.properties.title + '</h3><p>' + marker.properties.description + '</p>'))
                .addTo(map);
          });
        /*
        var marker = new mapboxgl.Marker()
                .setLngLat([-74.024827,40.745500])
                .addTo(this.map);
        */
        
        // 行驶路线
        map.on('load', function () {
          map.addSource('route', {
              'type': 'geojson',
              'data': {
                  'type': 'Feature',
                  'properties': {},
                  'geometry': {
                      'type': 'LineString',
                      'coordinates': [
                          [-74.042737,40.719553],
                          [-74.035943,40.732875]
                      ]
                  }
              }
          });
          map.addLayer({
              'id': 'route',
              'type': 'line',
              'source': 'route',
              'layout': {
                  'line-join': 'round',
                  'line-cap': 'round'
              },
              'paint': {
                  'line-color': '#088',
                  'line-width': 8
              }
          });
      });


        // 服务区路线
        map.on('load', function () {
          map.addSource('maine', {
              'type': 'geojson',
              'data': {
                  'type': 'Feature',
                  'geometry': {
                      'type': 'Polygon',
                      'coordinates': [
                          [
                            [-74.010777, 40.777223],//port imperial
                            [-74.031356, 40.787589],//tonnelle ave station
                            [-74.082462, 40.725370],//lincoln park
                            [-74.033762, 40.712222]//exchange place
                          ]
                      ]
                  }
              }
          });
          map.addLayer({
              'id': 'maine',
              'type': 'fill',
              'source': 'maine',
              'layout': {},
              'paint': {
                  'fill-color': '#048',
                  'fill-opacity': 0.4
              }
          });
      });
  

        // 添加地图中的自行车

        
        // 添加地图控件
     
    };





    render(){
        return (
            <div>
                <Card>
                    <BaseForm formList={this.formList} filterSubmit={this.handleFilterSubmit}/>
                </Card>
                <Card style={{marginTop:10}}>
                    <div>Total numeber of bikes: {this.state.total_count}</div>
                    <div id="map" style={{height:500,width: 1400, marginTop:100}}></div>
                </Card>
            </div>
        );
    }
}
