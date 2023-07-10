import React from "react";
import { Button, Checkbox, Form, Input, message } from "antd";
import { https } from "../../service/config";
import { useDispatch } from "react-redux";
import { setLogin } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { localServ } from "../../service/localStoreService";
import Lottie from "lottie-react";
import bgAnimate from "./bg_animate.json";

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
export default function LoginPage() {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const onFinish = (values) => {
    https
      .post("/api/QuanLyNguoiDung/DangNhap", values)
      .then((res) => {
        console.log(res);
        message.success("Đăng nhập thàh công");
        // đẩy data lên redux => re render layout
        dispatch(setLogin(res.data.content));
        // lưu xuống localStorages =>  giữ trạng thái đăng nhập sau khi load trang
        localServ.setUser(res.data.content);
        setTimeout(() => {
          navigate("/");
        }, 2000);
        // redux

        // localStorage
      })
      .catch((err) => {
        message.error("Đăng nhập thất bại");
        console.log(err);
      });
  };
  return (
    <div className="bg-orange-500 h-screen flex items-center justify-center">
      <div className="container p-10 bg-white flex rounded">
        <div className="w-1/2 h-full">
          <Lottie animationData={bgAnimate} loop={true} />;
        </div>
        <div className="w-1/2 h-full">
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="taiKhoan"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="matKhau"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button
                className="bg-orange-500 hover:bg-white"
                htmlType="submit"
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
