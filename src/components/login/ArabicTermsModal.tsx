import React, { useState } from "react";
import { Button } from "../ui/Button";
import { Checkbox } from "../ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import { useAppDispatch } from "../../store/hooks";
import { changeRools } from "../../store/modalCollaps/ModalCollapseSlice";

export default function ArabicTermsModal() {
  const Getrols = localStorage.getItem("rols");
  const rols = JSON.parse(Getrols);

  const [isChecked, setIsChecked] = useState(rols);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  //   const { rols } = useAppSelector((state) => state.togegleModal);

  const handleCheckboxChange = (checked: boolean) => {
    setIsChecked(checked);

    if (checked) {
      dispatch(changeRools(true));
    } else {
      dispatch(changeRools(false));
    }
  };

  return (
    <div className='flex items-center space-x-2'>
      <Checkbox
        id='terms'
        checked={isChecked}
        onCheckedChange={handleCheckboxChange}
        required
        className='me-3'
      />
      <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 '>
        أوافق على
        <span
          className='cursor-pointer text-primary-300 underline'
          onClick={() => {
            setIsOpen(true);
          }}
        >
          {" "}
          سياسة الإستخدام وخصوصية البيانات
        </span>
      </label>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className='sm:max-w-[900px] bg-white'>
          <DialogHeader className=' '>
            <DialogTitle className='text-right'>
              سياسة الإستخدام وخصوصية البيانات
            </DialogTitle>
            <DialogDescription className='text-right'>
              يرجى قراءة سياسة الإستخدام وخصوصية البيانات
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className='h-[500px] w-full rounded-md border p-4 bg-white text-right'>
            <h3 className='text-lg font-semibold'>:١. مقدمة</h3>
            <p className='mt-2'>
              ترحب منصة "مسارات التعلم الذكي" بك، وتوفر لك خدماتها وفقًا للشروط
              والأحكام التالية. يرجى قراءة هذه السياسة بعناية قبل استخدام
              المنصة.
            </p>
            <h3 className='text-lg font-semibold'>:٢. قبول الشروط</h3>

            <p className='mt-2'>
              أنت مسؤول عن ضمان أن جميع الأشخاص الذين يصلون إلى موقعنا من
              خلالباستخدامك للمنصة، فإنك توافق على الالتزام بسياسة الاستخدام هذه
              وكافة القوانين واللوائح المعمول بها.
            </p>
            <h3 className='text-lg font-semibold'>:٣. حساب المستخدم</h3>
            <p className='mt-2'>
              التسجيل: قد يُطلب منك إنشاء حساب وتقديم معلومات دقيقة وكاملة.
            </p>
            <p className='mt-2'>
              أمان الحساب: أنت مسؤول عن الحفاظ على سرية معلومات حسابك وكلمة
              المرور.
            </p>
            <p className='mt-2'>
              الإخطار: يجب عليك إخطارنا فورًا بأي استخدام غير مصرح به لحسابك
            </p>
            <h3 className='text-lg font-semibold'>:٤. استخدام المنصة</h3>
            <p className='mt-2'>
              الاستخدام القانوني: توافق على استخدام المنصة لأغراض قانونية
              ومشروعة فقط.
            </p>
            <p className='mt-2'>
              الامتناع عن الأنشطة المحظورة: تشمل، على سبيل المثال لا الحصر، نشر
              محتوى ضار، مضايقة الآخرين، محاولة اختراق المنصة، أو انتهاك حقوق
              الملكية الفكرية.
            </p>
            <p className='mt-2'>
              التفاعل الاجتماعي: يجب عليك الالتزام بآداب السلوك عند المشاركة في
              المنتديات والمجتمعات الافتراضية.
            </p>
            <h3 className='text-lg font-semibold'>:٥. حقوق الملكية الفكرية</h3>
            <p className='mt-2'>
              جميع المحتويات والمواد المتاحة على المنصة، بما في ذلك النصوص،
              الرسومات، الشعارات، والصور، هي ملك لمنصة "مسارات التعلم الذكي" أو
              مرخصة لها، ومحمية بموجب قوانين حقوق النشر والعلامات التجارية.
            </p>
            <p className='mt-2'>
              لا يجوز لك إعادة إنتاج أو توزيع أو تعديل أي جزء من المحتوى دون
              الحصول على إذن خطي مسبق.
            </p>
            <h3 className='text-lg font-semibold'>
              :٦. المحتوى الذي ينشئه المستخدم
            </h3>
            <p className='mt-2'>
              الترخيص: بمنحك المحتوى إلى المنصة، تمنحنا حقًا غير حصري، عالمي،
              خالي من حقوق الملكية لاستخدام وتعديل وعرض هذا المحتوى.
            </p>
            <p className='mt-2'>
              المسؤولية: أنت مسؤول عن المحتوى الذي تنشره، وتتعهد بعدم نشر محتوى
              غير قانوني أو مسيء.
            </p>

            <h3 className='text-lg font-semibold'>:٧. التعديلات على الخدمة</h3>
            <p className='mt-2'>
              نحتفظ بالحق في تعديل أو إيقاف المنصة أو أي جزء منها في أي وقت دون
              إشعار مسبق.
            </p>
            <p className='mt-2'>
              لن نكون مسؤولين تجاهك أو تجاه أي طرف ثالث عن أي تعديل أو تعليق أو
              إيقاف للخدمة.
            </p>

            <h3 className='text-lg font-semibold'>:٨. إنهاء الاستخدام</h3>
            <p className='mt-2'>
              يمكننا إنهاء أو تعليق وصولك إلى المنصة فورًا دون إشعار، إذا انتهكت
              هذه السياسة أو القوانين المعمول بها.
            </p>
            <p className='mt-2'>
              بعد الإنهاء، ستظل الشروط التي يجب بطبيعتها أن تستمر بعد الإنهاء
              سارية
            </p>
            <h3 className='text-lg font-semibold'>:٩. إخلاء المسؤولية</h3>
            <p className='mt-2'>
              يتم توفير المنصة "كما هي" دون أي ضمانات من أي نوع. لا نضمن دقة أو
              اكتمال المحتوى أو أن الخدمة ستكون خالية من الأخطاء أو الانقطاعات.
            </p>
            <p className='mt-2'>
              لا نتحمل أي مسؤولية عن أي خسائر أو أضرار ناتجة عن استخدامك للمنصة.
            </p>
            <h3 className='text-lg font-semibold'>:١٠. تحديد المسؤولية</h3>
            <p className='mt-2'>
              لن نكون مسؤولين عن أي أضرار مباشرة أو غير مباشرة تنشأ عن استخدامك
              للمنصة، بما في ذلك فقدان البيانات أو الأرباح.
            </p>

            <h3 className='text-lg font-semibold'>:١١. جمع المعلومات</h3>
            <p className='mt-2'>
              لمعلومات الشخصية: قد نقوم بجمع معلومات شخصية مثل الاسم، البريد
              الإلكتروني، رقم الهاتف، العمر، المستوى التعليمي، وغيرها من
              المعلومات اللازمة لتقديم خدماتنا.
            </p>
            <p className='mt-2'>
              بيانات الأداء: نجمع بيانات حول أداء المتعلم، مثل النتائج، الأنشطة،
              والتقدم التعليمي، لتحسين تجربة التعلم التكيفي.
            </p>
            <p className='mt-2'>
              البيانات التقنية: قد نجمع معلومات حول الجهاز المستخدم، عنوان IP،
              ونوع المتصفح، لأغراض تحسين المنصة.
            </p>
            <h3 className='text-lg font-semibold'>:١٢. استخدام المعلومات</h3>
            <p className='mt-2'>
              تحسين تجربة التعلم: نستخدم البيانات لتخصيص المحتوى التعليمي وفقًا
              لاحتياجاتك وأسلوب تعلمك.
            </p>
            <p className='mt-2'>
              التواصل: قد نستخدم معلومات الاتصال لإرسال تحديثات، إشعارات، وعروض
              خاصة.
            </p>
            <p className='mt-2'>
              الأمان والتحقق: لضمان أمن حسابك والتحقق من هويتك عند الضرورة.
            </p>

            <h3 className='text-lg font-semibold'>:١٣. مشاركة المعلومات</h3>
            <p className='mt-2'>
              الأطراف الثالثة: لا نقوم ببيع أو تأجير معلوماتك الشخصية لأطراف
              ثالثة. قد نشارك بعض البيانات مع شركائنا التعليميين لتحسين المحتوى
              والخدمات، وذلك بعد الحصول على موافقتك أو بما يتوافق مع القوانين
              المعمول بها.
            </p>
            <p className='mt-2'>
              المتطلبات القانونية: قد نكشف عن المعلومات إذا طُلب منا ذلك بموجب
              القانون أو بأمر من المحكمة.
            </p>

            <h3 className='text-lg font-semibold'>:١٤. أمن المعلومات</h3>
            <p className='mt-2'>
              نستخدم إجراءات أمنية وتقنية لحماية معلوماتك من الوصول غير المصرح
              به، الاستخدام، أو الكشف.
            </p>
            <p className='mt-2'>
              يتم تشفير البيانات الحساسة وتخزينها في خوادم آمنة.
            </p>

            <h3 className='mt-4 text-lg font-semibold'>
              <h3 className='text-lg font-semibold'>
                :١٥. ملفات تعريف الارتباط (Cookies)
              </h3>
            </h3>
            <p className='mt-2'>
              نستخدم ملفات تعريف الارتباط لتحسين وظائف المنصة وتخصيص تجربتك.
            </p>
            <p className='mt-2'>
              يمكنك تعديل إعدادات المتصفح لرفض ملفات تعريف الارتباط، ولكن قد
              يؤثر ذلك على بعض ميزات المنصة
            </p>

            <h3 className='text-lg font-semibold'>:١٦. حقوق المستخدم</h3>
            <p className='mt-2'>
              تحسين تجربة التعلم: نستخدم البيانات لتخصيص المحتوى التعليمي وفقًا
              لاحتياجاتك وأسلوب تعلمك.الوصول والتصحيح: يمكنك الوصول إلى معلوماتك
              الشخصية وتحديثها في أي وقت.
            </p>
            <p className='mt-2'>
              إلغاء الاشتراك: لديك الحق في إلغاء الاشتراك من الرسائل الترويجية
              أو حذف حسابك.
            </p>
            <p className='mt-2'>
              الاعتراض: يمكنك الاعتراض على معالجة بياناتك الشخصية لأسباب مشروعة.
            </p>
            <h3 className='text-lg font-semibold'>
              :١٧. الخدمات الخاصة بذوي الاحتياجات الخاصة
            </h3>
            <p className='mt-2'>
              نلتزم بتوفير بيئة تعليمية شاملة ومناسبة للجميع، ونضمن سرية
              المعلومات المتعلقة بالاحتياجات الخاصة للمستخدمين.
            </p>

            <h3 className='text-lg font-semibold'>
              :١٨. التغييرات على السياسة
            </h3>
            <p className='mt-2'>
              قد نقوم بتحديث سياسة الخصوصية من وقت لآخر. سيتم إشعارك بأي تغييرات
              مهمة.
            </p>
            <h3 className='mt-4 text-lg font-semibold'> :الاتصال بنا</h3>
            <p className='mt-2'>
              إذا كان لديك أي استفسارات أو مخاوف بشأن سياسة الخصوصية، يرجى
              التواصل معنا عبر
            </p>
            <a
              href='mailto:hallo@msaratedu.com'
              className='text-primary-300 underline'
            >
              hallo@msaratedu.com
            </a>
          </ScrollArea>
          <DialogFooter>
            <Button
              className='bg-primary-300 text-white'
              onClick={() => {
                setIsOpen(false);
              }}
            >
              العودة
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
