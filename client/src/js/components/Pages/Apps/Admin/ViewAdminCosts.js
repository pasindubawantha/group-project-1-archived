import React from "react"
import { connect } from "react-redux"

@connect((store) => {
	return {//props
		url: store.url
	}
},)
export default class ViewAdminCosts extends React.Component {
	render() {
		return  (<h1>vewi admin costs</h1>)
	}
}