import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import logo from "../../images/logo.svg";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../ui/use-toast";
import { Toaster } from "../ui/toaster";
import { CircleAlert, Eye, EyeOff, UserRoundCheck } from "lucide-react";
import ArabicTermsModal from "./ArabicTermsModal";
import { useAppSelector } from "../../store/hooks";
import { BASE_API_URL } from "../../config";
export default function Login() {
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [show, setShow] = useState(false);
  const { toast } = useToast();
  const { rols } = useAppSelector((state) => state.togegleModal);
  //   const [, setUserName] = useState("");
  const [errors, setErrors]: any = useState({});
  localStorage.setItem("rols", String(rols));

  const validate = () => {
    const validationErrors: any = {};
    if (!userName.trim()) {
      validationErrors.userName = "من فضلك ادخل اسم المستخدم";
    }
    if (!password.trim()) {
      validationErrors.password = "من فضلك ادخل كلمة المرور";
    }
    return validationErrors;
  };

  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      await login();
    } else {
      // console.log("Validation failed", validationErrors);
    }
  };

  async function login() {
    try {
      const response = await axios.post<any>(`${BASE_API_URL}/users/login/`, {
        username: userName,
        password: password,
      });
      if (response.status === 200) {
        localStorage.setItem("token", response.data.access);
        localStorage.setItem("fTime", response.data.first_time_login);

        setUserName("");
        setPassword("");
        toast({
          title: "تم تسجيل الدخول بنجاح",
          description: "اهلا بك في منصة مسارات للتعلم الزكي  ",
          icon: <UserRoundCheck className='text-green-500' />,
        });
        const ft = localStorage.getItem("fTime");
        console.log(ft);
        if (ft === "true") {
          setTimeout(() => {
            navigate("/masarat/OnBording");
          }, 2000);
        } else {
          setTimeout(() => {
            navigate("/masarat/home");
          }, 2000);
        }
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
                required
                onChange={(e) => {
                  setUserName(e.target.value);
                  setErrors({});
                }}
              />
              {errors.userName && (
                <p className='text-red-500 text-sm'>{errors.userName}</p>
              )}
            </div>

            <div className='space-y-2 relative'>
              <div
                className='absolute left-2 top-1/2 -translate-y-1/2 cursor-pointer'
                onClick={() => setShow(!show)}
              >
                {show ? (
                  <Eye className='size-5' />
                ) : (
                  <EyeOff className='size-5' />
                )}
              </div>
              <Input
                className='text-right'
                dir='rtl'
                placeholder='كلمة المرور'
                type={show ? "text" : "password"}
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors({});
                }}
              />
              {errors.password && (
                <p className='text-red-500 text-sm'>{errors.password}</p>
              )}
            </div>
          </div>
          <ArabicTermsModal />
          <Button
            className='w-full bg-primary-300 hover:bg-[#6D28D9] text-white '
            onClick={handleSubmit}
            disabled={!JSON.parse(rols)}
          >
            تسجيل الدخول
          </Button>
        </form>
        <Toaster />
      </div>
    </div>
  );
}
