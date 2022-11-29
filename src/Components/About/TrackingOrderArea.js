import React from 'react';
import trackOrder from "../../assets/img/logoDSL.jpeg";

const TrackingOrderArea = () => {
    return (
        <section className="track-order-area ptb-50">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="track-order-image">
                            <img src={trackOrder} alt="image" />
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <div className="track-order-content">
                            <h2>Order Tracking</h2>
                            <p>
                                Will be updated soon!
                            </p>

                            <form>
                                <div className="form-group">
                                    <label className="float-start">Order ID</label>
                                    <input type="text" className="form-control" />
                                </div>

                                <div className="form-group">
                                    <label className="float-start">Billing Email</label>
                                    <input type="email" className="form-control text-lowercase" />
                                </div>
                                <div className="form-group">
                                    <label className="float-start">Wallet Address</label>
                                    <input type="text" className="form-control" />
                                </div>

                                <button type="submit" className="default-btn">
                                    Track Order
                                    <span></span>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TrackingOrderArea;