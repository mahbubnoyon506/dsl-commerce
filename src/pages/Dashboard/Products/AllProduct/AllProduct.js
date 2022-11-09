import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './AllProduct.css';
import { Button, Typography, Modal, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import swal from "sweetalert";
import Pagination from '../../../../Components/Pagination/Pagination';


const AllProduct = ({ page = 1 }) => {

  const [open, setOpen] = useState(false);
  const [allProduct, setAllProduct] = useState([]);
  const [refetch, setRefetch] = useState(false);

  // Pagination
  const [getPage, setPage] = useState(1);
  const [show, setShow] = useState(10);
  const [lastPage, setLastPage] = useState(0)

  const totalFiles = allProduct.length;
  useEffect(() => {
    const lastPage = Math.ceil(totalFiles / show); 
    setLastPage(lastPage)
  }, [])

  const pageHandle = (jump) => {
    setPage(jump)
  }



  useEffect(() => {
    axios.get('https://backend.dslcommerce.com/api/product/')
      .then(res => {
        console.log(res.data)
        setAllProduct(res.data);
      })
  }, [open, refetch])

  const handleProductDelete = (id) => {
    const confirmDelete = window.confirm('Are you sure, you want to delete this Product?')
    if (confirmDelete) {
      axios.delete(`https://backend.dslcommerce.com/api/product/${id}`, {
        headers: {
          'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      })
        .then(res => {
          if (res.status === 200) {
            // alert(res.data.message);
            swal({
              title: "Success",
              text: res.data.message,
              icon: "success",
              button: "OK!",
              className: "modal_class_success",
            });
            setAllProduct(allProduct.filter(product => product._id !== id))
          }
        })
        .catch(error => {
          // alert(error.response.data.message);
          swal({
            title: "Attention",
            text: error.response.data.message,
            icon: "warning",
            button: "OK!",
            className: "modal_class_success",
          });
        })
    }
  }

  return (
    <div className='productBody'>
      <div className="d-flex flex-column flex-lg-row mb-3 justify-content-lg-between align-items-center">
        <h5 className='text-white text-start text-uppercase'>All Products</h5>
        <button className='btn btn-primary text-uppercase '>
          <Link to='/admin/create-product' className='text-white'>add product</Link>
        </button>
      </div>

      <div className='productCard py-2'>
        <div className="tableNormal ">

          <Table className='text-white productDataTable '>
            <thead>
              <tr>
                <th className='text-left'>Image</th>
                <th className='text-left'>Name</th>
                <th className='text-left productHidden'>Price</th>
                <th className='text-left productHidden'>Type</th>
                <th className='text-left'>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                allProduct?.map(product => (
                  <tr className='tableRow' key={product?._id}>
                    <td align='left'> <img className='imgProduct' src={product?.product_images} alt="Product Img" /></td>
                    <td className='text-left text-capitalize'>{product.productName}</td>
                    <td className='text-left productHidden'>{product?.price}</td>
                    <td className='text-left text-capitalize productHidden'>{product?.type}</td>
                    <td className='action'>
                      <div className="actionDiv text-left">
                        <Link to={`/admin/editProduct/${product?._id}`}><button className="editBtn"><i className="fas fa-edit"></i></button></Link>
                        <button onClick={() => handleProductDelete(product?._id)} className="deleteBtn"><i className="fas fa-trash"></i></button>
                      </div>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </Table>
        </div>
      </div>
      <div className="">
        {allProduct?.length ?
          <>
            <Pagination
              lastPage={lastPage}
              page={getPage}
              pageHandle={pageHandle}
            />
          </>
          :
          <div>

          </div>
        }

      </div>
    </div>
  );
};

export default AllProduct;