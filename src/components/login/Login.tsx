import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import logo from "../../images/logo.svg";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../ui/use-toast";
import { Toaster } from "../ui/toaster";
import { CircleAlert, Eye, EyeOff } from "lucide-react";
import ArabicTermsModal from "./ArabicTermsModal";

export default function Login() {
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [show, setShow] = useState(false);
  const { toast } = useToast();
  //   const [, setUserName] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login();
  };

  async function login() {
    try {
      const response = await axios.post<any>(
        "http://127.0.0.1:8000/users/login/",
        {
          username: userName,
          password: password,
        }
      );
      console.log(response);
      if (response.status === 200) {
        localStorage.setItem("token", response.data.access);
        localStorage.setItem("fTime", response.data.first_time_login);
        setUserName("");
        setPassword("");
        navigate("/masarat/OnBording");
      }
    } catch (err) {
      toast({
        title: "فشل تسجيل الدخول",
        description: "كلمة المرور او اسم المستحدم غير صحيح ",
        icon: <CircleAlert className='text-red-500' />,
      });
      return <>لديك مشكلة في الإنترنت</>;
    }
  }

  return (
    <div className='min-h-screen w-full bg-white flex items-center justify-center p-4 relative overflow-hidden'>
      {/* Decorative Elements */}
      <div className='absolute top-0 right-0 w-32 h-32 bg-primary-300 opacity-10 rotate-45 transform translate-x-16 -translate-y-8' />
      <div className='absolute bottom-0 left-0 w-64 h-64 bg-primary-300 rounded-full opacity-10 transform -translate-x-32 translate-y-32' />
      <div className='absolute top-8 left-8 w-4 h-4 bg-secondary-300 rounded-full' />

      <div className='w-full max-w-md space-y-8 relative'>
        {/* Logo */}
        <div className='text-center'>
          <div className='mx-auto  w-40 h-10rounded-lg flex items-center justify-center'>
            <img src={logo} alt='logo' className='w-full' />
          </div>
        </div>

        {/* Form */}
        <form
          className='space-y-6 text-right'
          dir='rtl'
          onSubmit={handleSubmit}
        >
          <div className='space-y-2'>
            <h1 className='text-2xl font-bold text-center text-gray-700'>
              تسجيل الدخول
            </h1>
            <p className='text-sm text-gray-500 text-center'>
              ابدأ رحلتك التعليمية - سجل الدخول للمتابعة
            </p>
          </div>

          <div className='space-y-4'>
            <div className='space-y-2'>
              <Input
                className='text-right'
                dir='rtl'
                placeholder='اسم المستخدم'
                type='text'
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className='space-y-2 relative'>
              <div
                className='absolute left-2 top-1/2 -translate-y-1/2 cursor-pointer'
                onClick={() => setShow(!show)}
              >
                {show ? (
                  <EyeOff className='size-5' />
                ) : (
                  <Eye className='size-5' />
                )}
              </div>
              <Input
                className='text-right'
                dir='rtl'
                placeholder='كلمة المرور'
                type={show ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <ArabicTermsModal />
          <Button
            className='w-full bg-primary-300 hover:bg-[#6D28D9] text-white '
            onClick={handleSubmit}
          >
            تسجيل الدخول
          </Button>
        </form>
        <Toaster />
      </div>
    </div>
  );
}
