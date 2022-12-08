import { Table } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import Pagination from "../../../Components/Pagination/Pagination";

const Subscribers = () => {
  const { emailPerPage } = useParams();

  const [open, setOpen] = useState(false);
  const [allEmail, setALlEmail] = useState([]);
  const [refetch, setRefetch] = useState(false);

  //****************************** Pagination Start ******************************/
  const navigate = useNavigate()
  const [getPage, setPage] = useState(1);
  const [show, setShow] = useState(10);
  const [lastPage, setLastPage] = useState(0);
  const [sliceEmails, setSliceEmails] = useState([]);
  // console.log(sliceProducts)

  useEffect(() => {
    const lastPage = Math.ceil(allEmail?.length / show);
    setLastPage(lastPage);
  }, [allEmail, show]);


  useEffect(() => {
    if (emailPerPage) {
      const page = parseInt(emailPerPage)
      const getSlicingCategory = allEmail.slice(
        (page - 1) * show,
        page * show
      );
      setSliceEmails([...getSlicingCategory]);
      setPage(parseInt(page));
    }
    else {
      const getSlicingProduct = allEmail.slice(0, show);
      setSliceEmails([...getSlicingProduct]);
    }

  }, [allEmail, show, emailPerPage]);

  const pageHandle = (jump) => {
    navigate(`/admin/all-subscribers/${jump}`);
    setPage(parseInt(jump));
  };

  //****************************** Pagination End ******************************/

  useEffect(() => {
    axios.get("https://backend.dslcommerce.com/api/subscribe/").then((res) => {
      // console.log(res.data.result)
      setALlEmail(res.data.result);
    });
  }, [refetch]);


  //****************************** Delete ******************************/
  const deleteWarning = (email) => {
    swal({
      title: "Are you sure to delete ",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        handleDelete(email?.email);
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };

  const handleDelete = async (email) => {
    // console.log(email);
    try {
      const response = await axios.delete(
        "https://backend.dslcommerce.com/api/subscribe/" + email
      );
      if (response.status === 200) {
        swal({
          // title: "Success",
          text: response.data.message,
          icon: "success",
          button: "OK!",
          className: "modal_class_success",
        });
        setALlEmail(allEmail.filter((email) => email.email !== email));
        setRefetch(true)
      }
    } catch (error) {
      // console.log("error");
    }
  };



  return (
    <div className="productBody">
      <div className="d-flex flex-column flex-lg-row mb-3 justify-content-lg-between align-items-center">
        <h5 className="text-white text-start text-uppercase">Subscribers</h5>

      </div>

      <div className="productCard py-2">
        <div className="tableNormal ">
          <Table className="text-white productDataTable ">
            <thead>
              <tr>
                <th className="text-left">Index</th>
                <th className="text-left">Email</th>
                <th className="text-left ">Send mail</th>
                <th className="text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {sliceEmails?.map((email, index) => (
                <tr className="tableRow" key={index}>
                  <td className="text-left text-capitalize">
                    {index + 1}
                  </td>
                  <td className="text-left "
                    style={{ textTransform: 'lowercase' }}>
                    {email.email}
                  </td>

                  <td className="text-left text-capitalize ">
                    <button className="btn btn-sm text-white btn-primary">Send Email</button>
                  </td>
                  <td className="action">
                    <div className="actionDiv text-left">
                      <button
                        onClick={() => deleteWarning(email)}
                        className="deleteBtn text-white"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>


      {/*************************** Pagination ************************************/}
      <div className="">
        {sliceEmails?.length ?
          (
            <Pagination
              lastPage={lastPage}
              page={getPage}
              pageHandle={pageHandle}
            />
          )
          :
          (<></>)
        }
      </div>


    </div>
  );
};

export default Subscribers;
