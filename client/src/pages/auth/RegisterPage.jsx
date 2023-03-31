import React, { useState } from 'react'
import { Form, Input, Button, Carousel, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import AuthCarousel from '../../components/auth/AuthCarousel'

const RegisterPage = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const onFinish = async (values) => {
    setLoading(true)
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(values),
      })
      if (res.status === 201) {
        message.success("Register successfully!")
        navigate("/login")
      }
      setLoading(false)
    } catch (error) {
      message.error('Something went wrong!')
      setLoading(false)
    }
  }

  return (
    <div className="h-screen">
      <div className="flex justify-between h-full">
        <div className="xl:px-20 px-10 w-full flex flex-col h-full justify-center relative">
          <h1 className="text-center text-5xl font-bold mb-2">LOGO</h1>
          <Form
            layout="vertical"
            name="register"
            onFinish={onFinish}
          >
            <Form.Item
              label="Username"
              name={"username"}
              rules={[
                {
                  required: true,
                  message: "Username is required!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="E-mail"
              name={"email"}
              rules={[
                {
                  required: true,
                  message: "E-mail is required!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name={"password"}
              rules={[
                {
                  required: true,
                  message: "Password is required!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="Password Again"
              name={"passwordAgain"}
              dependencies={["password"]}
              rules={[
                {
                  required: true,
                  message: "Password Again is required!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("The two passwords that you entered do not match!")
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                size="large"
                loading={loading}
              >
                Register
              </Button>
            </Form.Item>
          </Form>
          <div className="flex justify-center absolute left-0 bottom-10 w-full">
            Do you have an account?&nbsp;
            <Link to="/login" className="text-blue-600">
              Sign in now
            </Link>
          </div>
        </div>
        <div className="xl:w-4/6 lg:w-3/5 md:2-1/2 md:flex sm:hidden bg-[#6c63ff] h-full">
          <div className='w-full h-full flex items-center'>
            <div className='w-full'>
              <Carousel
                className='!h-full px-6'
                autoplay
              >
                <AuthCarousel
                  imgSrc='images/responsive.svg'
                  title='Responsive'
                  description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam'
                />
                <AuthCarousel
                  imgSrc='images/statistic.svg'
                  title='Statistics'
                  description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam'
                />
                <AuthCarousel
                  imgSrc='images/customer.svg'
                  title='Customer Satisfaction'
                  description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam'
                />
                <AuthCarousel
                  imgSrc='images/admin.svg'
                  title='Manager Panel'
                  description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam'
                />
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage