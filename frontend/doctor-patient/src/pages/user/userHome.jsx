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

const UserHome = () => {
  const [appointment, setAppointment] = useState([]);
  const [bills, setBills] = useState([]);
  const [pescription, setPescription] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [active, setٓActive] = useState("Appointments");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");

  const [activeDoctor, setActiveDoctor] = useState("");

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  // let userId = "";

  // console.log(userId); // get from coockies

  const getAppointments = async () => {
    try {
      await instance
        .post("/api/user/get-appointments-by-user-id", {
          userId,
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
    }
  };

  const getSingleBill=async()=>{
    try {
      await instance
        .post("/api/bill/get-bill-by-appointment-id", {
          userId,
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
    }
  }

  const getBills = () => {
    appointment?.map((appointment,index)=>{

    })
  };
  const getPescription = () => {};
  const getDoctors = async () => {
    try {
      await instance.get("/api/user/get-all-approved-doctors").then((res) => {
        if (res.data.success) {
          // toast.success("LoggedIn Successfully");
          // Cookies.set({ doctorId: res.data._id });
          console.log(res.data.data);
          setDoctors(res?.data?.data);
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
    }
  };
  const chkAppointmentAvailiblity = async (doctorId, date, time) => {
    try {
      await instance
        .post("/api/user/check-booking-avilability", {
          doctorId,
          date,
          time,
        })
        .then((res) => {
          if (res.data.success) {
            setOpen(false);
            console.log(res.data.data);
            bookAppointment(userId, doctorId, date, time);
          } else {
            console.log(res.data, "error");
            toast.error(
              `${
                res.data.message
                  ? res.data.message
                  : "Appointment not availible"
              }`,
              1000
            );
          }
        });
    } catch (error) {
      console.log(error);
      toast.error("something went wrong111", 1000);
    }
  };
  const bookAppointment = async (userId, doctorId, date, time) => {
    console.log(userId);
    try {
      await instance
        .post("/api/user/book-appointment", {
          userId,
          doctorId,
          date,
          time,
        })
        .then((res) => {
          if (res.data.success) {
            toast.success("Appointment booked waiting for doctors approval");
            console.log(res.data.data);
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

  const appointmentsHeads = [
    "Doctor Name",
    "Date",
    "Time",
    "Status",
    "Bill Status",
  ];
  const doctorsHeads = [
    "Doctor Name",
    "Time",
    "Fees",
    "Specialization",
    "Book Appointment",
  ];
  const billsHeads = ["Doctor Name", "Date", "Amount", "Status", "Pay Bill"];
  const pescriptionHeads = ["Doctor Name", "Date", "Time", "Book Appointment"];

  // const getUserId = async () => {
  // };
  const userId = Cookies.get("userId");
  const navigate = useNavigate();
  const logout = () => {
    Cookies.remove("userId");
    navigate("/start");
  };

  useEffect(() => {
    // getUserId();
    if (active === "Appointments") {
      getAppointments();
    } else if (active === "Bills") {
      getBills();
    } else if (active === "Doctors") {
      getDoctors();
    } else {
      getPescription();
    }
  }, [active]);

  const handleDashboard = (active) => {
    setٓActive(active);
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
            <p
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
            </p>
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
                    : active === "Doctors"
                    ? doctorsHeads.map((head, index) => {
                        return (
                          <th key={index} className="border py-1">
                            {head}
                          </th>
                        );
                      })
                    : active === "Bills"
                    ? billsHeads.map((head, index) => {
                        return (
                          <th key={index} className="border py-1">
                            {head}
                          </th>
                        );
                      })
                    : active === "Pescription"
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
                {active === "Appointments"
                  ? appointment?.map((appointment, index) => {
                      return (
                        <tr key={index}>
                          <td className="border px-3 py-4 text-xl">
                            {appointment.doctorId}
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
                            {appointment.bill}
                          </td>
                        </tr>
                      );
                    })
                  : active === "Doctors"
                  ? doctors?.map((doctor, index) => {
                      return (
                        <tr key={index}>
                          <td className="border px-3 py-4 text-xl">
                            {doctor.name}
                          </td>
                          <td className="border px-3 py-4 text-xl">
                            {doctor.timings[0] + " - " + doctor.timings[1]}
                          </td>
                          <td className="border px-3 py-4 text-xl">
                            {doctor.feePerCunsultation}
                          </td>
                          <td className="border px-3 py-4 text-xl">
                            {doctor.specialization}
                          </td>
                          <td className="border px-3 py-4 text-xl">
                            <ButtonComp
                              text={"book"}
                              classname="mt-0"
                              onClick={() => {
                                handleOpen();
                                setActiveDoctor(doctor._id);
                              }}
                            />
                            <Modal
                              open={open}
                              onClose={handleClose}
                              aria-labelledby="modal-modal-title"
                              aria-describedby="modal-modal-description"
                              className="flex justify-center items-center"
                            >
                              <form
                                action=""
                                onSubmit={(e) => {
                                  e.preventDefault();
                                  chkAppointmentAvailiblity(
                                    activeDoctor,
                                    appointmentDate,
                                    appointmentTime
                                  );
                                }}
                                className="w-[400px] min-h-[300px] flex/ flex-col justify-center items-center gap-2. py-4 rounded-lg bg-white shadow-lg w-[400px]/ bg-white px-4 mt-4/ flex/ flex-col gap-3"
                              >
                                <h1 className=" text-center font-bold text-3xl border-b pb-2">
                                  Book Appointment
                                </h1>
                                <InputComp
                                  id="Date"
                                  placeholder="write date in dd/mm/yyyy format"
                                  setState={setAppointmentDate}
                                />
                                <InputComp
                                  id="Time"
                                  placeholder={`write time between ${doctor?.timings[0]} - ${doctor?.timings[1]}`}
                                  setState={setAppointmentTime}
                                  type="number"
                                />
                                <ButtonComp
                                  classname="mt-14"
                                  text={"Book"}
                                  type="submit"
                                />
                              </form>
                            </Modal>
                          </td>
                        </tr>
                      );
                    })
                  : active === "Bills"
                  ? bills?.map((bill, index) => {
                      return (
                        <tr key={index}>
                          <td className="border px-3 py-4 text-xl">
                            {bill.appointmentId}
                          </td>
                          <td className="border px-3 py-4 text-xl">
                            {bill.date}
                          </td>
                          <td className="border px-3 py-4 text-xl">
                            {bill.amount}
                          </td>
                          <td className="border px-3 py-4 text-xl">
                            {bill.status}
                          </td>
                          <td className="border px-3 py-4 text-xl">
                            <ButtonComp
                              text={"Pay Bill"}
                              classname="mt-0"
                              onClick={() => {

                                // handleOpen();
                                // setActiveDoctor(doctor._id);
                              }}
                            />
                          </td>
                        </tr>
                      );
                    })
                  : null}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </>
  );
};

export default UserHome;
