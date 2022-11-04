import React, { useState } from "react";
import { Button, Typography, Modal, Box, Backdrop } from "@mui/material";
import "./CategoryModal.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const CategoryModal = (props) => {
  const [categoryName, setCategoryName] = useState(props.category.name);
  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      style={{ width: "200px !important" }}
    >
      <Box sx={style}>
        <div className="text-start m-3">
          <Typography
            id="modal-modal-title"
            variant="h5"
            component="h4"
            // sx={{ my: "1rem" }}
          >
            Update Category
          </Typography>
        </div>

        <form
          id="contactForm"
          className="form"
          onSubmit={(e) =>
            props.handleSubmit(e, props.category._id, categoryName)
          }
        >
          <div className="col-lg-12 col-md-12">
            <div className="form-group">
              <input
                type="text"
                name="categoryName"
                id="categoryName"
                className="form-control"
                required
                data-error="Please enter category Name"
                placeholder="Category Name"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
              <div className="help-block with-errors"></div>
            </div>
          </div>
          <div className="row">
            <div className="col-6 text-center">
              <div>
                <button
                  type="submit"
                  className="default-btn p-1 m-2 p-md-2 m-md-0 border"
                  style={{ cursor: "pointer" }}
                >
                  UPDATE
                  <span></span>
                </button>
              </div>
            </div>
            <div className="col-6 text-center">
              <div>
                <button
                  type="button"
                  className="default-btn p-1 m-2 p-md-2 m-md-0 border"
                  style={{ cursor: "pointer" }}
                  onClick={props.handleClose}
                >
                  CANCEL
                  <span></span>
                </button>
              </div>
            </div>
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default CategoryModal;
