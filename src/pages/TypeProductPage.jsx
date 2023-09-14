import React from 'react'
import NavbarComponents from '../components/NavbarComponents'
import CardComponents from '../components/CardComponents'
import Pagination from 'react-bootstrap/Pagination'

const TypeProductPage = () => {
    return (
        <div>
            <NavbarComponents />
            <CardComponents />
            <div>
                <Pagination>
                    <Pagination.First />
                    <Pagination.Prev />
                    <Pagination.Item>{1}</Pagination.Item>
                    <Pagination.Ellipsis />

                    <Pagination.Item>{10}</Pagination.Item>
                    <Pagination.Item>{11}</Pagination.Item>
                    <Pagination.Item active>{12}</Pagination.Item>
                    <Pagination.Item>{13}</Pagination.Item>
                    <Pagination.Item disabled>{14}</Pagination.Item>

                    <Pagination.Ellipsis />
                    <Pagination.Item>{20}</Pagination.Item>
                    <Pagination.Next />
                    <Pagination.Last />
                </Pagination>
            </div>
        </div>
    )
}

export default TypeProductPage