import JsonP from 'jsonp'
import resolve from 'resolve'
export default class Axios{
    static jsonp(options){
        return new Promise((resolve,reject)=>{
            JsonP(options.url,{
                param:'callback'
            },function (err,response){
                //to-do
            })
        })
    }
}