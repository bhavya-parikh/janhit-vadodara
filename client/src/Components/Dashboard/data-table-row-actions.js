import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";
import axios from "axios";
import { Button } from "../../@/components/ui/button";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../../@/components/ui/dropdown-menu";

import { labels } from "./data";
import { toast, ToastContainer } from "react-toastify";

function DataTableRowActions({ row }) {
  const task = row.original;
  const taskId = row.original._id;
  const [selectedFile, setSelectedFile] = useState(null);
  const [isPopupVisible, setPopupVisibility] = useState(false);
  const statusHandler = (selectedStatus) => {
    axios
      .post("http://localhost:5000/api/updateComplaintStatus", {
        complaintId: taskId,
        newStatus: selectedStatus,
      })
      .then((response) => {
        toast.success("Status Updated Successfully!");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = () => {
    if (!selectedFile) {
      toast.error("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("complaintId", taskId);
    formData.append("image", selectedFile);

    axios
      .post("http://localhost:5000/api/services/complaint/addimage", formData)
      .then((response) => {
        toast.success("Image Uploaded Successfully!");
        setPopupVisibility(false);
      })
      .catch((error) => {
        toast.error("Error uploading image, Try Again!", error);
      });
  };
  return (
    <DropdownMenu>
      <ToastContainer />
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="text-black flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem onClick={() => setPopupVisibility(true)}>
          Upload Image
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Status</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup value={task.label}>
              {labels.map((label) => (
                <DropdownMenuRadioItem
                  key={label.value}
                  value={label.value}
                  onClick={() => statusHandler(label.value)}
                >
                  {label.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
      {isPopupVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-md">
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleFileUpload}>Upload</button>
          </div>
        </div>
      )}
    </DropdownMenu>
  );
}

export { DataTableRowActions };
