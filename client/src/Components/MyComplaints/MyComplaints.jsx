import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Navigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Steps ,message} from 'antd';
import { SmileOutlined } from '@ant-design/icons';

export const MyComplaints = () => {
  const [loading, setLoading] = useState(true);
  const { complaintId, issueDescription } = useParams();
  const [complaints, setComplaints] = useState([]);
  const navigate = useNavigate();

  const updateComplaintStatus = (complaintId, newStatus) => {
    axios
      .post(
        `${process.env.REACT_APP_VERCEL_ENV_BASEURL}/api/updateComplaintStatus`,
        {
          complaintId,
          newStatus,
        }
      )
      .then((response) => {
        console.log("Status Updated Successfully!");
        message.success("Status Updated Successfully!");
  
        // Update local state to trigger re-render
        setComplaints((prevComplaints) =>
          prevComplaints.map((complaint) =>
            complaint._id === complaintId
              ? { ...complaint, complaintStatus: newStatus }
              : complaint
          )
        );
  
        setLoading(false);
      })
      .catch((err) => {
        message.error("Failed to update status!");
        setLoading(false);
      });
  };
  


  useEffect(() => { 
    axios
      .post(
        `${process.env.REACT_APP_VERCEL_ENV_BASEURL}/api/fetchComplaintsUser`,
        {},
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log(response);
        setComplaints(response.data);
      })
      .catch((error) => {
        toast(error.response.data.message);
      });
  }, []);

  const getStatusDescription = (status) => {
    switch (status) {
      case 'Complaint Registered':
        return 'Complaint Registered.';
      case 'Pending':
        return 'Your Application Is Pending. We Are Working On It.';
      case 'Progress':
        return 'Working Under Progress.';
      case 'Completed':
        return <p className="text-gray-600 text-xl font-bold mb-2 mt-5 text-center"style={{ color: 'green' }}>Your Complaint Has Been Solved. Thank You!</p>;
      case 'Disposed':
        return 'Your Application Has Been Disposed. If You Have Any Questions, Please Contact Us.';
      case 'Escalated':
        return 'Your Complain Is Escalated.'
      default:
        return '';
    }
  };
  const items2 = [
    {
      title: 'Complaint Registered'
    },
    {
      title: 'Complaint Escalated',
    },
    {
      title: 'Progress',
    },
    {
      title: 'Completed',
      icon: <SmileOutlined />,
    },
  ];
  
  const items1 = [
    {
      title: 'Complaint Registered'
    },
    {
      title: 'Pending',
    },
    {
      title: 'Progress',
    },
    {
      title: 'Disposed',
    },
  ];
  const items = [
    {
      title: 'Complaint Registered'
    },
    {
      title: 'Pending',
    },
    {
      title: 'Progress',
    },
    {
      title: 'Completed',
      icon: <SmileOutlined />,
    },
  ];
  

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6 text-black text-decoration-line: underline text-center">Complaints Details</h1>

      {complaints.length === 0 ? (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <p className="text-6xl font-bold text-gray-600">
            No complaints found.
          </p>
        </div>
      ) : (
        complaints.map((complaint, index) => (
          <div
            key={complaint._id}
            className="bg-white p-6 rounded-lg shadow-md mb-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="mb-4">
                <label
                  className="block text-gray-600 text-lg font-semibold mb-2"
                  htmlFor="complaintID"
                >
                  Complaint ID:
                </label>
                <span className="text-gray-800">{complaint._id}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="mb-4">
                <label
                  className="block text-gray-600 text-lg font-semibold mb-2 "
                  htmlFor="issueDescription"
                >
                  Issue Description:
                </label>
                <p className="text-gray-800 w-full break-all">
                  {complaint.complaintDescription}
                </p>
              </div>
            </div>

            <label
              className="block text-gray-600 text-lg font-semibold mb-2"
              htmlFor="status"
            >
              Status:
            </label>

            <>
            {complaint.complaintStatus === "Disposed" && (
              <>
                <Steps current={3} status="error" labelPlacement="vertical" items={items1} />
                <p className="text-gray-600 text-xl font-bold mb-2 mt-5 text-center" style={{ color: 'red' }}>
                  {getStatusDescription(complaint.complaintStatus)}
                </p>
              </>
            )}
            
            {complaint.complaintStatus === "Escalated" && (
              <>
                <Steps current={1} labelPlacement="vertical" items={items2} />
                <p className="text-gray-600 text-xl font-bold mb-2 mt-5 text-center">
                  {getStatusDescription(complaint.complaintStatus)}
                </p>
              </>
            )}

            {complaint.complaintStatus !== "Disposed" && complaint.complaintStatus !== "Escalated" && (
              <>
                <Steps
                  current={items.findIndex((item) => item.title === complaint.complaintStatus)}
                  labelPlacement="vertical"
                  items={items}
                />
                <p className="text-gray-600 text-xl font-bold mb-2 mt-5 text-center">
                  {getStatusDescription(complaint.complaintStatus)}
                </p>
              </>
            )}
          </>
          {(complaint.complaintStatus === "Completed" || complaint.complaintStatus === "Disposed") && (
                           <button
                           className="bg-blue-500 text-white py-2 px-4 rounded"
                           onClick={() => {
                             updateComplaintStatus(complaint._id, "Escalated");
                             axios
                               .post(
                                 `${process.env.REACT_APP_VERCEL_ENV_BASEURL}/api/fetchComplaintsUser`,
                                 {},
                                 {
                                   withCredentials: true,
                                 }
                               )
                               .then((response) => {
                                 setComplaints(response.data);
                               })
                               .catch((error) => {
                                 toast(error.response.data.message);
                               });
                           }}
                         >
                    Reopen
                  </button>
                )}
                 {complaint.complaintStatus === "Completed" && (
            <button
              className="bg-green-500 text-white py-2 px-4 rounded"
              onClick={() => {
                navigate("/Review");
              }}
            >
              Write Review
            </button>
          )}
          </div>
        ))
      )}
    </div>
  );
};