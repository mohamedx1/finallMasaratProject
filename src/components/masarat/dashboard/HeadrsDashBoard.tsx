import React from "react";
import userImage from "../../../images/userImage.jpg";
import { Input } from "../../ui/Input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { Button } from "../../ui/Button";
import { useAppSelector } from "../../../store/hooks";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
// import { Label } from "../../ui/label";
export default function HeadrsDashBoard({
  IsParent,
  getDahBoradData,
  setPassword,
  password,
  setIsError,
  isError,
  setIsOpen,
  isOpen,
  setIsparent,
}: any) {
  const { first_name, last_name, student_profile } = useAppSelector(
    (state) => state.userData
  );

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await getDahBoradData();
    setIsparent(true);
    setPassword("");
  };
  return (
    <div className='flex justify-between items-center mb-8'>
      <div className='flex items-center gap-3'>
        <div className='w-12 h-12 rounded-full overflow-hidden'>
          <img src={userImage} alt='user' className='w-full rounded-full  ' />
        </div>
        <div>
          <h1 className='font-semibold'>{first_name + " " + last_name}</h1>
          <p className='text-sm text-muted-foreground'>
            {student_profile.academic_year}
          </p>
        </div>
      </div>
      <div className='flex gap-2'>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild className='rtl'>
            <button
              // onClick={getDahBoradData}
              className={`px-4 py-2 text-sm rounded-md border ${
                IsParent ? "bg-primary-300 text-white" : "bg-white text-black"
              } transition-all`}
            >
              ولي امر
            </button>
          </DialogTrigger>
          <DialogContent
            className='sm:max-w-[425px] rtl:text-right bg-white'
            dir='rtl'
          >
            <form onSubmit={handleSubmit} className='space-y-4'>
              <DialogHeader className='rtl:text-right p-2'>
                <DialogTitle>نافذه ولي الامر</DialogTitle>
                <DialogDescription>كلمة المرور </DialogDescription>
              </DialogHeader>
              <div className='space-y-4'>
                <Input
                  id='password'
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='w-full pr-3'
                  placeholder='كلمة المرور'
                  required
                />
              </div>
              <DialogFooter>
                <div className='w-full'>
                  <Button
                    type='submit'
                    className='w-full bg-primary-300 text-white rounded-md'
                  >
                    إرسال
                  </Button>
                  <div
                    className={`text-center text-red-800  ${
                      isError ? "block" : "hidden"
                    }`}
                  >
                    كلمة المرور غير صحيحة، يرجى المحاولة مرة أخرى.
                  </div>
                </div>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        <button
          onClick={() => {
            setIsparent(false);
          }}
          className={`px-4 py-2 text-sm rounded-md  ${
            !IsParent ? "bg-primary-300 text-white" : "bg-white text-black"
          } transition-all`}
        >
          طالب
        </button>
      </div>
      <div>
        <button
          className='flex items-center'
          onClick={() => {
            navigate("/masarat/home");
          }}
        >
          العودة للدرس
          <ArrowLeft className='text-primary-300 ms-3' />
        </button>
      </div>
    </div>
  );
}
