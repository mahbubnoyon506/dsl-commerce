import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Admins.css';
import DashboardModalNewAdmin from './DashboardModalNewAdmin';
import swal from "sweetalert";
// import AdminPopUp from './AdminPopUp/AdminPopUp';
// import DeletePopUp from './DeletePopUp/DeletePopUp';

const Admins = () => {
  const [open, setOpen] = React.useState(false);
  const [allAdmin, setAllAdmin] = React.useState([]);
  const [modalShowNewAdmin, setModalShowNewAdmin] = useState(false);
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    axios.get('https://backend.dslcommerce.com/api/admin/')
      .then(res => {
        setAllAdmin(res.data);
        // console.log(res.data)
      })
  }, [open, refetch])


  const handleAdminDelete = (id) => {
    const confirmDelete = window.confirm('Are you sure, you want to delete this admin?')
    if (confirmDelete) {
      axios.delete(`https://backend.dslcommerce.com/api/admin/${id}`, {
        headers: {
          'authorization': `Bearer ${localStorage.getItem('admin')}`
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
            setAllAdmin(allAdmin.filter(admin => admin._id !== id))
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

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [openDelete, setOpenDelete] = React.useState(false);

  // const handleClickOpenDelete = () => {
  //   setOpenDelete(true);
  // };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };


  //   const Logout = () => {
  //     logOut();
  //     swal({
  //         // title: "S",
  //         text: "You have successfully logout.",
  //         icon: "success",
  //         button: "OK!",
  //         className: "modal_class_success",
  //     });
  // }

  console.log(allAdmin);

  return (
    <div className='adminBody'>
      <h5 className='text-white text-start'>ADMINS</h5>
      <div className='adminCard py-2'>
        <div className="adminBtnDiv text-end">
          <button onClick={() => setModalShowNewAdmin(true)} className='adminBtn'>NEW ADMIN</button>
        </div>
        <div className="tableNormal ">

          <Table className='text-white adminDataTable '>


            <thead>
              <tr>
                <th className='text-center'>Image</th>
                <th className='text-start'>Username</th>
                <th className='text-start adminHidden'>Email</th>
                <th className='text-start adminHidden'>Mobile</th>
                <th className='text-start'>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                allAdmin?.map(admin => (
                  <tr className='tableRow' key={admin._id}>
                    <td align='center'>
                      {admin?.avatar ? <img className='imgAdmin' src={admin?.avatar} alt="profilePic" /> : <img className='imgAdmin' src="https://backend.dslcommerce.com/assets/1660396587217.jpeg" alt="profilePic" />}
                    </td>

                    <td style={{ textTransform: 'lowercase' }} className='text-start'>{admin.username}</td>
                    <td className='text-start adminHidden'>{admin.email}</td>
                    <td className='text-start adminHidden'>{admin.phone}</td>
                    <td className='action'>
                      <div className="actionDiv text-start">
                        <Link to={`/admin/adminprofile/${admin._id}`}><button className="editBtn"><i className="fas fa-edit"></i></button></Link>
                        <button onClick={() => handleAdminDelete(admin._id)} className="deleteBtn"><i className="fas fa-trash"></i></button>
                      </div>
                    </td>
                  </tr>
                ))
              }


            </tbody>
          </Table>
        </div>
        {/* <AdminPopUp
          open={open}
          handleClose={handleClose}
        >
        </AdminPopUp>

        <DeletePopUp
          handleCloseDelete={handleCloseDelete}
          openDelete={openDelete}
        >

        </DeletePopUp> */}

        <DashboardModalNewAdmin
          show={modalShowNewAdmin}
          // setIsLoadingAdmin={setIsLoadingAdmin}
          // isLoadingAdmin={isLoadingAdmin}
          refetch={refetch}
          setRefetch={setRefetch}
          setModalShowNewAdmin={setModalShowNewAdmin}
          onHide={() => setModalShowNewAdmin(false)}
        // allAdmin={allAdmin}
        // setAllAdmin={setAllAdmin}
        />
      </div>
    </div>
  );
};

export default Admins;