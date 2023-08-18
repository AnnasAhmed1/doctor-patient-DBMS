import React, { useEffect, useState } from "react";
import instance from "../../config/axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import ButtonComp from "../../components/buttonComp";
// import { Modal } from "antd";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import InputComp from "../../components/inputComp";
import { useNavigate } from "react-router-dom";

const DoctorHome = () => {
  const [appointment, setAppointment] = useState([]);
  // const [bills, setBills] = useState([]);
  const [pescription, setPescription] = useState([]);
  // const [doctors, setDoctors] = useState([]);
  const [active, setٓActive] = useState("Appointments");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const updateStatus = async (appointmentId, status) => {
    console.log(appointmentId);
    try {
      await instance
        .post("/api/doctor/change-appointment-status", {
          appointmentId,
          status,
        })
        .then((res) => {
          if (res.data.success) {
            console.log(res.data);
            getAppointments();
          } else {
            console.log(res.data, "error");
            toast.error(
              `${res.data.message ? res.data.message : "something went wrong"}`,
              1000
            );
          }
        });
    } catch (error) {
      toast.error("something went wrong", 1000);
      console.log(error);
    }
  };

  const handleStatus = (status, appointmentId, amount) => {
    if (status) {
      updateStatus(appointmentId, "approved");
      getDoctorInfo(doctorId, appointmentId);
    } else {
      updateStatus(appointmentId, "rejected");
    }
  };
  // let userId = "";

  // console.log(userId); // get from coockies

  const getAppointments = async () => {
    console.log(doctorId);
    try {
      await instance
        .post("/api/doctor/get-appointments-by-doctor-id", {
          doctorId,
        })
        .then((res) => {
          if (res.data.success) {
            // toast.success("LoggedIn Successfully");
            // Cookies.set({ appointmentsId: res?.data?._id });
            console.log(res.data.data);
            setAppointment(res?.data?.data);
          } else {
            console.log(res.data, "error");
            toast.error(
              `${res.data.message ? res.data.message : "something went wrong"}`,
              1000
            );
          }
        });
    } catch (error) {
      toast.error("something went wrong", 1000);
      console.log(error);
    }
  };
  // const getBills = () => {};
  const getPescription = () => {};
  // const getDoctors = async () => {
  //   try {
  //     await instance.get("/api/doctor/get-all-approved-doctors").then((res) => {
  //       if (res.data.success) {
  //         // toast.success("LoggedIn Successfully");
  //         // Cookies.set({ doctorId: res.data._id });
  //         console.log(res.data.data);
  //         setDoctors(res?.data?.data);
  //       } else {
  //         console.log(res.data, "error");
  //         toast.error(
  //           `${res.data.message ? res.data.message : "something went wrong"}`,
  //           1000
  //         );
  //       }
  //     });
  //   } catch (error) {
  //     toast.error("something went wrong", 1000);
  //   }
  // };
  // const chkAppointmentAvailiblity = async (doctorId, date, time) => {
  //   try {
  //     await instance
  //       .post("/api/doctor/check-booking-avilability", {
  //         doctorId,
  //         date,
  //         time,
  //       })
  //       .then((res) => {
  //         if (res.data.success) {
  //           setOpen(false);
  //           console.log(res.data.data);
  //           bookAppointment(userId, doctorId, date, time);
  //         } else {
  //           console.log(res.data, "error");
  //           toast.error(
  //             `${
  //               res.data.message
  //                 ? res.data.message
  //                 : "Appointment not availible"
  //             }`,
  //             1000
  //           );
  //         }
  //       });
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("something went wrong111", 1000);
  //   }
  // };
  // const bookAppointment = async (userId, doctorId, date, time) => {
  //   console.log(userId);
  //   try {
  //     await instance
  //       .post("/api/doctor/book-appointment", {
  //         userId,
  //         doctorId,
  //         date,
  //         time,
  //       })
  //       .then((res) => {
  //         if (res.data.success) {
  //           toast.success("Appointment booked waiting for doctors approval");
  //           console.log(res.data.data);
  //           getAppointments();
  //         } else {
  //           console.log(res.data, "error");
  //           toast.error(
  //             `${res.data.message ? res.data.message : "something went wrong"}`,
  //             1000
  //           );
  //         }
  //       });
  //   } catch (error) {
  //     toast.error("something went wrong", 1000);
  //     console.log(error);
  //   }
  // };

  const appointmentsHeads = [
    "User Name",
    "Date",
    "Time",
    "Status",
    "Accept/Reject",
  ];
  // const doctorsHeads = [
  //   "Doctor Name",
  //   "Time",
  //   "Fees",
  //   "Specialization",
  //   "Book Appointment",
  // ];
  // const billsHeads = ["Doctor Name", "Date", "Time", "Book Appointment"];
  const pescriptionHeads = ["User Name", "Date", "Time", "Book Appointment"];
  const generateBill = async (appointmentId, amount) => {
    try {
      await instance
        .post("/api/bill/generate-bill", {
          appointmentId,
          amount,
        })
        .then((res) => {
          if (res.data.success) {
            // toast.success("LoggedIn Successfully");
            // Cookies.set({ appointmentsId: res?.data?._id });
            console.log(res.data.data);
            // setAppointment(res?.data?.data);
          } else {
            console.log(res.data, "error");
            toast.error(
              `${res.data.message ? res.data.message : "something went wrong"}`,
              1000
            );
          }
        });
    } catch (error) {
      toast.error("something went wrong", 1000);
      console.log(error);
    }
  };
  const getDoctorInfo = async (doctorId, appointmentId) => {
    try {
      await instance
        .post("/api/doctor/get-doctor-info-by-doctor-id", {
          doctorId,
        })
        .then((res) => {
          if (res.data.success) {
            // toast.success("LoggedIn Successfully");
            // Cookies.set({ appointmentsId: res?.data?._id });
            console.log(res.data.data);
            generateBill(appointmentId, res.data?.data?.amount);

            // setAppointment(res?.data?.data);
          } else {
            console.log(res.data, "error");
            toast.error(
              `${res.data.message ? res.data.message : "something went wrong"}`,
              1000
            );
          }
        });
    } catch (error) {
      toast.error("something went wrong", 1000);
      console.log(error);
    }
  };

  // const getUserId = async () => {
  // };
  const doctorId = Cookies.get("doctorId");

  useEffect(() => {
    // getUserId();
    if (active === "Appointments") {
      getAppointments();
      // } else if (active === "Bills") {
      //   getBills();
      // } else if (active === "Doctors") {
      //   getDoctors();
    } else {
      getPescription();
    }
  }, [active]);

  const handleDashboard = (active) => {
    setٓActive(active);
  };
  const navigate = useNavigate();
  const logout = () => {
    Cookies.remove("doctorId");
    navigate("/start");
  };

  return (
    <>
      <main>
        <section className="flex h-screen overflow-hidden">
          <div className="flex-[2] bg-[#242B2E] text-white">
            <h1 className="px-4 py-12 text-3xl font-bold">Dashboard</h1>
            <p
              onClick={() => {
                handleDashboard("Appointments");
              }}
              className={`p-4 cursor-pointer hover:bg-[#394144] ${
                active === "Appointments" ? "bg-[#394144]" : null
              } border-b border-t `}
            >
              Appointments
            </p>
            {/* <p
              onClick={() => {
                handleDashboard("Doctors");
              }}
              className={`p-4 cursor-pointer hover:bg-[#394144] ${
                active === "Doctors" ? "bg-[#394144]" : null
              } border-b `}
            >
              Doctors
            </p>
            <p
              onClick={() => {
                handleDashboard("Bills");
              }}
              className={`p-4 cursor-pointer hover:bg-[#394144] ${
                active === "Bills" ? "bg-[#394144]" : null
              } border-b `}
            >
              Bills
            </p> */}
            <p
              onClick={() => {
                handleDashboard("Pescription");
              }}
              className={`p-4 cursor-pointer hover:bg-[#394144] ${
                active === "Pescription" ? "bg-[#394144]" : null
              } border-b `}
            >
              Pescription
            </p>
            <p
              onClick={logout}
              className="p-4 cursor-pointer hover:bg-[#394144] border-b "
            >
              Log out
            </p>
          </div>

          <div className="flex-[6] h-screen overflow-scroll px-12">
            <h1 className="px-4 py-12 text-3xl border-b mb-12 font-bold">
              {active}
            </h1>
            <table className="mx-4/ w-full border">
              <thead className="border">
                <tr>
                  {active === "Appointments"
                    ? appointmentsHeads.map((head, index) => {
                        return (
                          <th key={index} className="border py-1">
                            {head}
                          </th>
                        );
                      })
                    : // : active === "Doctors"
                    // ? doctorsHeads.map((head, index) => {
                    //     return (
                    //       <th key={index} className="border py-1">
                    //         {head}
                    //       </th>
                    //     );
                    //   })
                    // : active === "Bills"
                    // ? billsHeads.map((head, index) => {
                    //     return (
                    //       <th key={index} className="border py-1">
                    //         {head}
                    //       </th>
                    //     );
                    //   })
                    active === "Pescription"
                    ? pescriptionHeads.map((head, index) => {
                        return (
                          <th key={index} className="border py-1">
                            {head}
                          </th>
                        );
                      })
                    : null}
                </tr>
              </thead>
              <tbody>
                {active === "Appointments" ? (
                  appointment?.length == 0 ? (
                    <>
                      <p className="text-center pt-4 w-full">
                        No appointment found
                      </p>
                    </>
                  ) : (
                    appointment?.map((appointment, index) => {
                      return (
                        <tr key={index}>
                          <td className="border px-3 py-4 text-xl">
                            {appointment.userId}
                          </td>
                          <td className="border px-3 py-4 text-xl">
                            {appointment.date}
                          </td>
                          <td className="border px-3 py-4 text-xl">
                            {appointment.time}
                          </td>
                          <td className="border px-3 py-4 text-xl">
                            {appointment.status}
                          </td>
                          <td className="border px-3 py-4 text-xl">
                            <ButtonComp
                              text={"accept"}
                              onClick={() => {
                                handleStatus(true, appointment._id);
                              }}
                            />
                            <ButtonComp
                              text={"reject"}
                              onClick={() => {
                                handleStatus(
                                  false,
                                  appointment._id,
                                  appointment.doctorId
                                );
                              }}
                            />
                          </td>
                        </tr>
                      );
                    })
                  )
                ) : // : active === "Doctors"
                // ? doctors?.map((doctor, index) => {
                //     return (
                //       <tr key={index}>
                //         <td className="border px-3 py-4 text-xl">
                //           {doctor.name}
                //         </td>
                //         <td className="border px-3 py-4 text-xl">
                //           {doctor.timings[0] + " - " + doctor.timings[1]}
                //         </td>
                //         <td className="border px-3 py-4 text-xl">
                //           {doctor.feePerCunsultation}
                //         </td>
                //         <td className="border px-3 py-4 text-xl">
                //           {doctor.specialization}
                //         </td>
                //         <td className="border px-3 py-4 text-xl">
                //           <ButtonComp
                //             text={"book"}
                //             classname="mt-0"
                //             onClick={() => {
                //               handleOpen();
                //             }}
                //           />
                //           <Modal
                //             open={open}
                //             onClose={handleClose}
                //             aria-labelledby="modal-modal-title"
                //             aria-describedby="modal-modal-description"
                //             className="flex justify-center items-center"
                //           >
                //             <form
                //               action=""
                //               onSubmit={(e) => {
                //                 e.preventDefault();
                //                 chkAppointmentAvailiblity(
                //                   doctor._id,
                //                   appointmentDate,
                //                   appointmentTime
                //                 );
                //               }}
                //               className="w-[400px] min-h-[300px] flex/ flex-col justify-center items-center gap-2. py-4 rounded-lg bg-white shadow-lg w-[400px]/ bg-white px-4 mt-4/ flex/ flex-col gap-3"
                //             >
                //               <h1 className=" text-center font-bold text-3xl border-b pb-2">
                //                 Book Appointment
                //               </h1>
                //               <InputComp
                //                 id="Date"
                //                 placeholder="write date in dd/mm/yyyy format"
                //                 setState={setAppointmentDate}
                //               />
                //               <InputComp
                //                 id="Time"
                //                 placeholder={`write time between ${doctor?.timings[0]} - ${doctor?.timings[1]}`}
                //                 setState={setAppointmentTime}
                //                 type="number"
                //               />
                //               <ButtonComp
                //                 classname="mt-14"
                //                 text={"Book"}
                //                 type="submit"
                //               />
                //             </form>
                //           </Modal>
                //         </td>
                //       </tr>
                //     );
                //   })
                null}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </>
  );
};

export default DoctorHome;
