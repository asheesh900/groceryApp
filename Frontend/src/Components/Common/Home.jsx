import React, { Component } from 'react'
import { connect } from 'react-redux'
import {addCategory} from '../../Redux/Categories/Action'
import {getCategories} from '../../Redux/Categories/Action'
import {getProducts, addProduct, filterProduct, sortProducts} from '../../Redux/Products/Action'

class Home extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             category: "",
             product_name: "",
             price: "",
             category_id: "",
             products: []

        }
    }

    componentDidMount =async() => {
        const url = "http://127.0.0.1:5000/"
        await this.props.getProducts(url)

        const categoryUrl =  "http://127.0.0.1:5000/add/category"
        this.props.getCategories(categoryUrl)
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    } 

    createCategory = async (e) => {
        e.preventDefault()
        let category = {
            category: this.state.category
        }

        const url = "http://127.0.0.1:5000/add/category"

        await this.props.addCategory(url, category)

        const categoryUrl =  "http://127.0.0.1:5000/add/category"
        this.props.getCategories(categoryUrl)
    }

    addProduct = async (e) => {
        e.preventDefault()
        let productDetails = {
            product_name: this.state.product_name,
            price: this.state.price,
            category: this.state.category
        }

        const url = "http://127.0.0.1:5000/add/product"
        await this.props.addProduct(url, productDetails)

        const url2 = "http://127.0.0.1:5000/"
        this.props.getProducts(url2)
    }

    filterOnCategory = async (e) => {
        e.preventDefault()
        const url = `http://127.0.0.1:5000/product/filter?category=${e.target.value}` 
        await this.props.filterProduct(url)
    }

    sortProducts = (e) => {
        e.preventDefault()
        const url = `http://127.0.0.1:5000/product/sort?sort_basis=${e.target.value}`  
        this.props.sortProducts(url)
    }

    
    render() {
        let count = 1
        console.log(this.props.data)
        return (
            this.props.ifData ?
            (
                <div className="container-fluid text-center">
                    <h1 className = "m-4 display-4">Grocery Store</h1>
                    <div className="row">
                        <div className="col">
                            <h1>Add Category</h1>
                            <input onChange = {this.handleChange} name = "category" className="form-control mb-2" type="text" placeholder="Enter category name"></input>
                            <button onClick = {this.createCategory} type="button" className="btn btn-primary btn-lg btn-block">Create Category</button>
                        </div>
                        <div className="col">
                            <h1>Add Product</h1>
                            <input onChange = {this.handleChange} name = "product_name" className="form-control mb-2" type="text" placeholder="Enter Product Name"></input>
                            <input onChange = {this.handleChange} name = "price" className="form-control mb-2" type="number" placeholder="Enter Price"></input>
                            <select onChange = {this.handleChange} name = "category" id="categoryId" className="form-control mb-2">
                                <option >Choose Category</option>
                                {
                                    this.props.categories && this.props.categories.map(ele => {
                                        return <option value = {ele.category}>{ele.category} </option>
                                    })
                                }
                            </select>
                            <button onClick = {this.addProduct} type="button" className="btn btn-primary btn-lg btn-block">Add Product</button>
                        </div>
                        <div className="col">
                            <h1>Filter</h1>
                            <select onChange = {this.filterOnCategory} id="categoryId" className="form-control mb-2">
                                <option >Choose Category</option>
                                {
                                    this.props.categories && this.props.categories.map(ele => {
                                        return <option value = {ele.category}>{ele.category} </option>
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div className="container mt-4">
                        <h1>Available Products</h1>
                        <table className="table table-dark">
                            <thead>
                                <tr>
                                <th scope="col">#</th>
                                <th scope="col">Product Name</th>
                                <th scope="col">Price
                                <button value = "asc" onClick = {this.sortProducts} className = "m-1">ASC</button>
                                <button value = "desc" onClick = {this.sortProducts} className = "m-1">DESC</button></th>
                                <th scope="col">Category</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.props.data.products && this.props.data.products.map(ele => {
                                        return (
                                            <tr key = {ele.id}>
                                                <th scope="row">{count++}</th>
                                                <td>{ele.product_name}</td>
                                                <td>{ele.price}</td>
                                                <td>{ele.category}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>

                </div>
            ) :
            (
                <div className="container-fluid text-center">
                    <h1>Grocery Store</h1>
                    <div className="container">
                        <h1>Data is yet to come</h1>
                    </div>

                </div>
            )
        )
    }
}

const mapStateToProps = (state) => ({
    data: state.productsReducer.data,
    ifData: state.productsReducer.ifData,
    categories: state.categoryReducer.categories,
    state: state
    
})

const mapDispatchToProps = (dispatch) => ({
    getProducts: (payloadUrl) => 
    dispatch(getProducts(payloadUrl)),

    addCategory: (url, payload) => 
    dispatch(addCategory(url, payload)),

    getCategories: (categoryUrl) => 
    dispatch(getCategories(categoryUrl)),

    addProduct: (url, payload) => 
    dispatch(addProduct(url, payload)),

    filterProduct: (url) => 
    dispatch(filterProduct(url)),

    sortProducts: (url) => 
    dispatch(sortProducts(url))
})

export default connect (mapStateToProps, mapDispatchToProps) (Home)

