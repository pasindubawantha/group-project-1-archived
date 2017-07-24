import React from "react"
import { connect } from "react-redux"
import ListItem from "./ListItem"
import { updateListAll, updateListShow, updateListID, updateListPicked } from "../../../actions/stateActions"

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
		this.props.dispatch(updateListAll(this.props.listAll.slice()))
		this.props.dispatch(updateListShow(this.props.listAll.slice()))
		this.props.dispatch(updateListID(this.props.listID))
		this.props.dispatch(updateListPicked(null))
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
				  </div>
				</form>

				<row>
					<h4>{this.props.headers.show}</h4>
					<div class="list-group">
						{this.props.list.show.map(
							function(item) {
								var { label, key, id } = this.props.fields
								if(item != null){ 
									return(<ListItem key={item[key]} id={id} item={item} heading={item[label[0]]} textFields={label.slice(1, label.length)} url={this.props.nextURL} />)
								}
							}, this)
						}
					</div>
				</row>
			</div>)
	}
}