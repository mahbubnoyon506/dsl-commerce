import React, { useEffect, useState } from 'react';
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useNavigate, useParams } from 'react-router-dom';
import draftToHtml from "draftjs-to-html";
import htmlToDraft from 'html-to-draftjs';
import axios from 'axios';
import swal from 'sweetalert';

const UpdateProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  // console.log(id)
  const [productDetail, setProductDetail] = useState({})
  const [firstValue, setFirstValue] = useState(() => EditorState.createEmpty());
  const stepOne = draftToHtml(convertToRaw(firstValue.getCurrentContent()));


  useEffect(() => {
    if (id) {
      axios.get(`https://backend.dslcommerce.com/api/product/${id}`)
        .then(res => {
          // console.log(res.data.newData)
          setProductDetail(res.data.newData);
          const description = res.data.newData.description
          // console.log(description)
          const blocksFromHtml = htmlToDraft(description);
          const { contentBlocks, entityMap } = blocksFromHtml;
          const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
          setFirstValue(EditorState.createWithContent(contentState));
        })
    }
  }, [id])

  const onSubmitForm = async e => {
    e.preventDefault();
    const productName = e.target.productName.value;
    const img = e.target.img.files[0];
    const brand = e.target.brand.value;
    const color = e.target.color.value;
    const type = e.target.type.value;
    const price = e.target.price.value;
    const offeringProduct = e.target.offeringProduct.value;
    const availableProduct = e.target.availableProduct.value;
    const description = stepOne;


    // const productData = { productName, img, brand, price, color, type, offeringProduct, availableProduct, description }
    // console.log(productData)

    const formData = new FormData()
    formData.append('productName', productName)
    formData.append('img', img)
    formData.append('brand', brand)
    formData.append('color', color)
    formData.append('type', type)
    formData.append('price', price)
    formData.append('offeringProduct', offeringProduct)
    formData.append('availableProduct', availableProduct)
    formData.append('description', description)

    // console.log(...formData)

    axios.put(`https://backend.dslcommerce.com/api/product/${id}`, formData)
      .then(res => {
        if (res.status === 200) {
          // alert(res.data.message);
          swal({
            title: "Success",
            text: `${res.data.message}`,
            icon: "success",
            button: "OK!",
            className: "modal_class_success",
          });
          setProductDetail(res.data.newData);
          navigate("/admin/products");
        }
      })
      .catch(err => {
        swal({
          title: "Attention",
          text: `${err.response.data.message}`,
          icon: "warning",
          button: "OK!",
          className: "modal_class_success",
        });
      })


  }

  const cancel = () => {
    navigate("/admin/products");
  }


  return (

    <>
      <div className="container">
        <h4 className='text-white text-capitalize text-start py-2'> update product </h4>
        <div>
          <form id="contactForm" className="form" onSubmit={onSubmitForm}>
            <div className="row">

              <div className="mb-3 ms-1">

                <img src={productDetail?.product_images} width={200} height={180} className='d-flex justify-content-center' alt="" />
              </div>

              <div className="col-lg-12 col-md-12">
                <div className="form-group text-white">
                  <p className='mb-1 text-white'>Product Image</p>
                  <input
                    type="file"
                    name="img"
                    className="form-control bg-transparent"
                  />
                </div>
              </div>


              <div className="col-lg-12 col-md-12">
                <div className="form-group ">
                  <p className='mb-1 text-white '>Product Name</p>
                  <input
                    type="text"
                    name="productName"
                    className="form-control bg-transparent text-white "
                    defaultValue={productDetail?.productName}
                  />
                </div>
              </div>

              <div className="col-lg-12 col-md-12">
                <div className="form-group">
                  <p className='mb-1 text-white '>Brand </p>
                  <input
                    type="text"
                    name="brand"
                    className="form-control bg-transparent text-white "
                    defaultValue={productDetail?.brand}
                  />
                </div>
              </div>

              <div className="col-lg-12 col-md-12">
                <div className="form-group">
                  <p className='mb-1 text-white '>Color </p>
                  <input
                    type="text"
                    name="color"
                    className="form-control bg-transparent text-white "
                    defaultValue={productDetail?.color}
                  />
                </div>
              </div>

              <div className="col-lg-12 col-md-12">
                <div className="form-group">
                  <p className='mb-1 text-white '>Product Type </p>
                  <select
                    className="form-control list bg-transparent "
                    style={{ cursor: 'pointer' }}
                    name="type"
                  >
                    <option value={productDetail?.type} > {productDetail?.type} </option>
                    {/* <option value="cameras">Cameras</option>
                    <option value="electronics">Electronics</option>
                    <option value="audio">Audio</option>
                    <option value="computers">Computers</option>
                    <option value="accessories">Accessories</option>
                    <option value="laptop">Laptop</option>
                    <option value="watches">Watches</option>
                    <option value="mobile">Mobile</option>
                    <option value="headphone">Headphone</option> */}
                  </select>
                </div>
              </div>

              <div className="col-lg-12 col-md-12">
                <div className="form-group">
                  <p className='mb-1 text-white '>Price </p>
                  <input
                    type="number"
                    name="price"
                    className="form-control bg-transparent text-white "
                    defaultValue={productDetail?.price}
                  />
                </div>
              </div>

              <div className="col-lg-12 col-md-12">
                <div className="form-group">
                  <p className='mb-1 text-white '>Offering Product </p>
                  <input
                    type="text"
                    name="offeringProduct"
                    className="form-control bg-transparent text-white "
                    defaultValue={productDetail?.offeringProduct}
                  />
                </div>
              </div>

              <div className="col-lg-12 col-md-12">
                <div className="form-group">
                  <p className='mb-1 text-white '> Available Product</p>
                  <input
                    type="number"
                    name="availableProduct"
                    className="form-control bg-transparent text-white "
                    defaultValue={productDetail?.availableProduct}
                  />
                </div>
              </div>

              {/* Editor  */}
              <div className="col-lg-12 col-md-12">
                <p className='mb-1 text-white '>Product Description </p>
                <Editor
                  editorState={firstValue}
                  onEditorStateChange={setFirstValue}
                  required={true}
                  wrapperClassName="wrapper-class"
                  editorClassName="editor-class border mt-2 p-2 bg-transparent text-white"
                  toolbarClassName="toolbar-class text-black"
                  toolbar={{
                    image: {
                      urlEnabled: true,
                      uploadEnabled: true,
                      alignmentEnabled: true,
                      uploadCallback: undefined,
                      previewImage: true,
                      inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
                      alt: { present: false, mandatory: false },
                      defaultSize: {
                        height: 'auto',
                        width: 'auto',
                      },
                      fontSize: {
                        options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96],
                        className: undefined,
                        component: undefined,
                        dropdownClassName: undefined,
                      },
                      fontFamily: {
                        options: ['Arial', 'sans-serif', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman', 'Verdana'],
                        className: undefined,
                        component: undefined,
                        dropdownClassName: undefined,
                      },
                    },
                  }}
                />
              </div>

              <div className='d-flex justify-content-center align-items-center gap-3 mt-3 '>

                <div className="send-btn">
                  <button type="submit" className="default-btn text-uppercase" style={{ cursor: 'pointer' }}>
                    Update
                    <span></span>
                  </button>
                </div>

                <div className="send-btn">
                  <button type="submit" onClick={cancel} className="default-btn text-uppercase" style={{ cursor: 'pointer', background: 'red' }}>
                    Cancel
                    <span></span>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>



  );
};

export default UpdateProduct;