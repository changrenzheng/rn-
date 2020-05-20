import { Component } from 'react'
import { Text, View ,FlatList, Button,Image} from 'react-native'

import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator()
const SettingsStack = createStackNavigator()

export default class FlatDemo extends Component {

   
    render(){
      return(
        <NavigationContainer>
              <Stack.Navigator initialRouteName="Home">

                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="详情" component={Settings} />
              </Stack.Navigator>
          </NavigationContainer>
      )
    }
   
}



class Home extends React.Component {

  // _goSettings = () => {
  //   let params = { screen: "Wifi", params: { uname: "约翰" } }
  //   this.props.navigation.navigate("Settings", params)
  // }
  // render() {
  //   return (
  //     <View>
  //       <Text style={{ fontSize: 22, color: 'red' }}>Home!!!</Text>
  //       <Button onPress={this._goSettings} title="go settings" />
  //     </View>
  //   )

  // }
  constructor(props){
    super(props)
    this.url="http://www.cjlly.com:3050/record"
    this.max=4
    this.state={data:[],albums:[]}
}
  componentDidMount(){
    fetch(this.url,{method:"GET"})
    .then(resp=>resp.json())
    .then(albums=>{
        console.log(albums)
        this.setState({albums:albums})
    })
}
_del=id=>{
    
    //fetch(this.url+"/"+id,{method:"DELETE"})
    //.then(resp=>resp.json())
    //.then(obj=>{
        let data=this.state.albums.splice(0)
        let index=data.findIndex(album=>album.id===id)
        console.log(index,id)
        data.splice(index,1)
        this.setState({albums:data})
    //})

   
}
_goMusic=name=>{
    let data = this.state.albums
     let index=data.findIndex(album=>album.name===name)
       console.log(index,name)
       data = data[index]
       console.log(data)
       //     this.setState({data:index})
  // })

    let params = { name:data.name,singer:data.singer,img:data.img}

    this.props.navigation.navigate("详情", params)
  
}
_renderItem=({item})=>{
    return (
        <View style={{height:80,justifyContent:"space-between",flexDirection:'row'}}>
            
            <Image style={{width:80,height:80}} source={{uri:item.img}} onPress={()=>this._goMusic(item.name)}/>
            <Text onPress={()=>this._goMusic(item.name)} style={{fontSize:15}}>{item.name}</Text>
            <Button 
            onPress={()=>this._del(item.id)}
             title="删除"/>
        </View>
    )
}
_ItemSeparatorComponent=()=>{
    return <View style={{height:1}}></View>
}

_refresh=()=>{
    let d=Math.floor(Math.random()*100+100)
    let data=this.state.data.splice(0)
    data.unshift(d)
    this.setState({data:data})
}
_reachEnd=()=>{
    let data=this.state.data.splice(0)
    data.push(++this.max)
    this.setState({data:data})
}
render() {
    return (
        <View>
            <FlatList
                ListEmptyComponent={<Text>加载中</Text>}
                keyExtractor={({item,index})=>index}
                ItemSeparatorComponent={this._ItemSeparatorComponent}
                data={this.state.albums} 
                renderItem={this._renderItem}
                refreshing={false}
                onRefresh={this._refresh}
                onEndReached={this._reachEnd}
                onEndReachedThreshold={0.2}
            />
            
        </View>
    )
}
}

class Settings extends React.Component {
  render() {
    return (
      <View>
        <Image style={{width:150,height:150,resizeMode:'center'}} source={{uri:this.props.route.params.img}}/>
        <Text style={{fontSize:30,textAlign:'center'}}>歌曲名称：{this.props.route.params.name}</Text>
        <Text style={{fontSize:20,textAlign:'center'}}>歌手：{this.props.route.params.singer}</Text>
      </View>
    )
  }
}