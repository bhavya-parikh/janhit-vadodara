import React from "react";
import { useParams } from "react-router-dom";

export const MyComplaints = () => {
  const { complaintId, issueDescription } = useParams();
  return (
    axios
      .post("fecth",{}, trackingInfo)
      .then((res) => {
        // Handle the response, you can set it in state for display
        setResponse(res.data);
      })
      .catch((err) => {
        // Handle errors, you can set it in state for display
        console.error(err);
      });
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6 ">My Complaints</h1>

      {/* Complaint Status Card */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Complaint Details</h2>

        {/* Complaint Information */}
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-4">
            <label
              className="block text-gray-600 text-sm font-bold mb-2"
              htmlFor="complaintID"
            >
              Complaint ID:
            </label>
            <span className="text-gray-800">123456</span>
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-600 text-sm font-bold mb-2"
              htmlFor="status"
            >
              Status:
            </label>
            <span className="text-green-600 font-semibold">Resolved</span>
          </div>
        </div>

        {/* Additional Complaint Details */}
        <div className="grid grid-cols-1 gap-4">
          <div className="mb-4">
            <label
              className="block text-gray-600 text-sm font-bold mb-2"
              htmlFor="issueDescription"
            >
              Issue Description:
            </label>
            <p className="text-gray-800 w-full">
              {issueDescription}Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Fusce dignissim auctor nibh eget fermentum. Fusce
              gravida gravida neque, eu mattis arcu vestibulum tincidunt.
              Maecenas consectetur leo lectus, non feugiat velit venenatis eget.
              Morbi nunc felis, consectetur ut ante sed, semper sollicitudin
              velit. Praesent eros diam, scelerisque at pretium vitae, aliquet
              sed arcu. Suspendisse in risus placerat, facilisis neque nec,
              dignissim massa. Orci varius natoque penatibus et magnis dis
              parturient montes, nascetur ridiculus mus. Donec ac ipsum laoreet,
              tincidunt felis vitae, dignissim ex. Cras at aliquet eros, ac
              dapibus elit. Nulla aliquet aliquam fermentum. Vestibulum lobortis
              lobortis augue, id malesuada urna malesuada ac. Etiam nisl nibh,
              sodales et urna eu, sollicitudin cursus purus. Integer et dolor
              odio. Sed rhoncus erat et efficitur viverra. Quisque nec tempus
              augue.
            </p>
          </div>
        </div>
        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
            View Status
          </button>
        </div>
      </div>
    </div>
  );
};
