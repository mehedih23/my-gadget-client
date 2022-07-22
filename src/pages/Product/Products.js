import React, { useEffect, useState } from 'react'
import Product from '../../components/Product';
// import { useQuery } from 'react-query'

const Products = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch('http://localhost:1111/allitems')
            .then(response => response.json())
            .then(data => setProducts(data))
    }, [])


    return (
        <div>
            <h3 className='text-3xl my-4 text-center text-accent'>Manage all Products</h3>
            <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-10'>
                {
                    products.map(product => <Product
                        key={product._id}
                        product={product}
                    ></Product>)
                }
            </div>
        </div>
    )
}

export default Products