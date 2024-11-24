import React, { useState } from "react";
import { Button } from "../ui/Button";
import { Checkbox } from "../ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";

export default function ArabicTermsModal() {
  const [isChecked, setIsChecked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleCheckboxChange = (checked: boolean) => {
    setIsChecked(checked);
    if (checked) {
      setIsOpen(true);
    }
  };

  return (
    <div className='flex items-center space-x-2'>
      <Checkbox
        id='terms'
        checked={isChecked}
        onCheckedChange={handleCheckboxChange}
        className='me-3'
      />
      <label
        htmlFor='terms'
        className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
      >
        أوافق على الشروط والأحكام
      </label>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className='sm:max-w-[600px] bg-white'>
          <DialogHeader className=' '>
            <DialogTitle className='text-right'>الشروط والأحكام</DialogTitle>
            <DialogDescription className='text-right'>
              يرجى قراءة الشروط والأحكام بعناية
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className='h-[200px] w-full rounded-md border p-4 bg-white text-right'>
            <h3 className='text-lg font-semibold'>١. مقدمة</h3>
            <p className='mt-2'>
              مرحبًا بك في موقعنا. باستخدامك لهذا الموقع، فإنك توافق على
              الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق على أي جزء من هذه
              الشروط، فيرجى عدم استخدام موقعنا.
            </p>
            <h3 className='mt-4 text-lg font-semibold'>٢. استخدام الموقع</h3>
            <p className='mt-2'>
              أنت مسؤول عن ضمان أن جميع الأشخاص الذين يصلون إلى موقعنا من خلال
              اتصال الإنترنت الخاص بك على دراية بهذه الشروط والأحكام وأنهم
              يمتثلون لها.
            </p>
            <h3 className='mt-4 text-lg font-semibold'>
              ٣. التغييرات في الموقع
            </h3>
            <p className='mt-2'>
              نحتفظ بالحق في تحديث موقعنا وتغيير المحتوى في أي وقت دون إشعار. لن
              نكون مسؤولين إذا كان موقعنا غير متاح في أي وقت أو لأي فترة لأي سبب
              من الأسباب.
            </p>
            <h3 className='mt-4 text-lg font-semibold'>
              ٤. حقوق الملكية الفكرية
            </h3>
            <p className='mt-2'>
              نحن مالكو أو المرخص لنا لجميع حقوق الملكية الفكرية في موقعنا وفي
              المواد المنشورة عليه. هذه الأعمال محمية بموجب قوانين ومعاهدات حقوق
              النشر في جميع أنحاء العالم.
            </p>
          </ScrollArea>
          <DialogFooter>
            <Button
              className='bg-primary-300 text-white'
              onClick={() => setIsOpen(false)}
            >
              أوافق
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
