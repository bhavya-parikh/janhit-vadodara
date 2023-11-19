import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Steps } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

export const MyComplaints = () => {
  const { complaintId, issueDescription } = useParams();
  const [complaints, setComplaints] = useState([]);


  // The empty dependency array ensures that this effect runs once when the component mounts
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
      case 'Complaint registered':
        return 'Complaint registered.';
      case 'Pending':
        return 'Application Is Pending.';
      case 'Progress':
        return 'Working Under Progress.';
      case 'Completed':
        return 'Complaint solved.';
      case 'Disposed':
        return 'Your Application Is Disposed.';
      default:
        return '';
    }
  };
  const items1 = [
    {
      title: 'Complaint registered'
    },
    {
      title: 'Pending',
      // description: 'Application Is Pending',
    },
    {
      title: 'Progress',
      // description: 'Working Under Progress',
    },
    {
      title: 'Disposed',
      // description: 'Your Application Is Disposed.',
      // icon: <SmileOutlined />,
    },
  ];
  const items = [
    {
      title: 'Complaint registered'
    },
    {
      title: 'Pending',
      // description: 'Application Is Pending',
    },
    {
      title: 'Progress',
      // description: 'Working Under Progress',
    },
    {
      title: 'Completed',
      description: 'Complaint solved.',
      icon: <SmileOutlined />,
    },
  ];
  

  return (
    // axios
    //   .post("fecth",{}, trackingInfo)
    //   .then((res) => {
    //     // Handle the response, you can set it in state for display
    //     setResponse(res.data);
    //   })
    //   .catch((err) => {
    //     // Handle errors, you can set it in state for display
    //     console.error(err);
    //   });
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
                  className="block text-gray-600 text-lg font-semibold mb-2"
                  htmlFor="issueDescription"
                >
                  Issue Description:
                </label>
                <p className="text-gray-800 w-full">
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
            {complaint.complaintStatus === "Disposed" ? (
              <>
              <Steps current={3} status="error" labelPlacement="vertical" items={items1} />
              <p className="text-gray-600 text-xl font-bold mb-2 mt-5 text-center">
               {getStatusDescription(complaint.complaintStatus)}
                </p>
                </>
              
            ) : (
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
          </div>
        ))
      )}
    </div>
  );
};