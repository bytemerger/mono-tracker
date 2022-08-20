function TransactionElement() {
  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 bg-slate-400 rounded-full"></div>
        <div className="flex flex-col gap-3">
          <div className="font-bold text-[17px] leading-4 tracking-[0.37px] text-[#273240]">
            Jumia Food
          </div>
          <div className="text-base leading-4 tracking-[.57px] text-[#404852] opacity-50">
            11-11-2021 • 10:12 am • Credit
          </div>
        </div>
      </div>
      <div className="font-bold text-[17px] leading-4 tracking-[0.37px] text-[#273240]">
        -10800
      </div>
    </div>
  );
}
export default TransactionElement;
