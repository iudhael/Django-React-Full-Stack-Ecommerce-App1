import React from 'react'
import './NavbarFooter.css'
import { FaSquareFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaSquareWhatsapp } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";


export default function Footer() {
  return (
    <>
        <footer className="mt-5 ">


            <div className="text-white">
                


                <div className=" d-flex justify-content-between border-top-footer2 px-3 py-4 ">
                    <div className=" mt-auto mb-auto col-md-3">
                        LOGO
                    </div>

                    <div className="mt-auto mb-auto col-md-4 text-center">
                        2023 ECOMMERCE | copywriting
                    </div>

                    <div className="d-flex col-md-3  pt-2 justify-content-end">
                        <div className="">
                            <a href="https://wa.me/+22997393267" target="_blank" className="text-end">
                                <h5>
                                    <i className="text-white h4"><FaSquareWhatsapp /></i>
                                </h5>
                            </a>
                        </div>
                        <div className="px-2">
                            <a href="https://wa.me/+22997393267" target="_blank">
                                <h5>
                                    <i className="text-white h4"><FaInstagram /></i>
                                </h5>
                            </a>
                        </div>
                        <div className="px-2">
                            <a href="https://wa.me/+22997393267" target="_blank">
                            <h5>
                                <i className="text-white h4"><FaSquareFacebook /></i>
                            </h5>
                            </a>
                        </div>
                        <div>
                            <a href="mailto:adikpetoiudhael@gmailcom" target="_blank">
                            <h5>
                                <i className="text-white h4"><IoMdMail /></i>
                            </h5>
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </footer>
    </>
  )
}
