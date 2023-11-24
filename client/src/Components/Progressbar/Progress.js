import React from "react";
import { Steps } from "antd";
import {
  LoadingOutlined,
  SmileOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Progress, Space } from "antd";
import "./Progress.css";
const description = "This is a description.";
const items = [
  {
    title: "Complaint Registration",
    description,
  },
  {
    title: "Investigation",
    description,
  },
  {
    title: "Approval",
    description,
  },
  {
    title: "Implementation In Process",
    description,
  },
  {
    title: "Verification and Quality Check",
    description,
  },
  {
    title: "Finish",
    description,
    icon: <SmileOutlined />,
  },
];

const Progressbar = () => (
  <div id="kik">
    <Steps
      current={3}
      percent={60}
      labelPlacement="vertical"
      items={items}
      status="process"
    />
  </div>
);

export default Progressbar;
