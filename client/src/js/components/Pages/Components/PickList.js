import React from "react"
import { connect } from "react-redux"
import { updateListAll, updateListShow, updateListSelected, updateListID } from "../../../actions/stateActions"
import { find, deleteElement, findNull} from "./arrayOpps"
import ButtonLink from "./ButtonLink"

//import $ from "jquery"

@connect((store) => {
	return {
		url: store.url,
		list: store.state.list
	}
},)
export default class PickCustomer extends React.Component {
	constructor(props){
		super()
		this.state = {searched:""}
	}
	componentWillMount(){
		console.log("mounted")
		this.props.dispatch(updateListAll(this.props.listAll))
		this.props.dispatch(updateListShow(this.props.listAll))
		this.props.dispatch(updateListSelected([null]))
		this.props.dispatch(updateListID(this.props.viewID))
	}

	onChangeCheckBox(e){
		if(e.target.checked){
			var {selected, all, show} = this.props.list
			var index1 = find(all, this.props.fields.id, e.target.id)
			var index2 = find(show, this.props.fields.id, e.target.id)
			var nullIndex = findNull(selected)
			if(nullIndex == -1){
				selected.push(all[index1])
			}else{
				selected[nullIndex] = all[index1]
			}
			delete all[index1]
			delete show[index2]
			this.props.dispatch(updateListAll(all))
			this.props.dispatch(updateListShow(show))
			this.props.dispatch(updateListSelected(selected))
			
		}else{
			var { selected, all } = this.props.list
			var index = find(selected, this.props.fields.id, e.target.id)
			var nullIndex = findNull(all)
			if(nullIndex == -1){
				all.push(selected[index])
			}else{
				all[nullIndex] = selected[index]
			}
			delete selected[index]
			this.props.dispatch(updateListAll(all))
			this.props.dispatch(updateListSelected(selected))
			var e = {target: {value: this.state.searched }}
			this.onChangeSearch(e)
		}
		
	}
	onChangeSearch(e){
		this.state.searched = e.target.value
		if(this.state.searched  == null){
			var searchfor = ""
		}else{
			var searchfor = this.state.searched 
		}
		if(searchfor == ""){
			this.props.dispatch(updateListShow(this.props.list.all))
		}else{
			var showList = []
			var strings = searchfor.toLowerCase()
			strings = strings.split(" ")
			var found = false
			for(var i in this.props.list.all){
				found = false
				var listItem = this.props.list.all[i]
				for(var j in this.props.fields.search){
					var field = this.props.fields.search[j]
					for(var n in strings)
						if(listItem[field].includes(strings[n]) && strings[n] != ""){
							showList.push(listItem)
							break
							found =true
						}
					if(found){
						found = false
						break
					}
				}
			}
			this.props.dispatch(updateListShow(showList))
		}
		this.forceUpdate()
	}
	
	confirm(){

	}

	render(){

			return (
			<div>
				<form class="form-inline">
				  <div class="form-group">
				    	<input onChange={this.onChangeSearch.bind(this)} type="text" class="form-control" id="exampleInputAmount" placeholder="Search"/>
				  		<ButtonLink url={this.props.url.concat({name:'asd ', viewID:'asdsd'})} name="PickProject" onClick={this.confirm.bind(this)}/>
				  </div>
				</form>

				<row>
				<h4>{this.props.headers.selected}</h4>
					<ul class="list-group">
					{this.props.list.selected.map(function(item){
						if(item != null){ return(
						<li key={item[this.props.fields.key]}> 
							<label>
						 	<input id={item[this.props.fields.id]} onChange={this.onChangeCheckBox.bind(this)} type="checkbox" checked="true"/>
							{this.props.fields.label.map(label => <span key={label + item[label]}> {item[label]} </span>)}
							</label>
						</li>)}}, this)}
					</ul>
				</row>

				<row>
				<h4>{this.props.headers.show}</h4>
				<ul class="list-group">
					{this.props.list.show.map(function(item){

						if(item != null){ return(
						<li key={item[this.props.fields.key]}> 
							<label>
						 	<input id={item[this.props.fields.id]} onChange={this.onChangeCheckBox.bind(this)} type="checkbox"/>
							{this.props.fields.label.map(label => <span key={label + item[label]}> {item[label]} </span>)}
							</label>
						</li>)}}, this)}
					</ul>
				</row>
			</div>)
	}
}