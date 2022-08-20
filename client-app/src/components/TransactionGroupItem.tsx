function TransactionGroupItem() {
  return (
    <div className="text-[#273240]">
      <div className="flex justify-between text-lg tracking-[0.67px]">
        <div className="font-bold">Food and Drinks</div>
        <div>1.378.200</div>
      </div>
      <div className="mt-3">
        <div className="relative pt-1">
          <div className="overflow-hidden h-1 text-xs flex rounded bg-[#ECEFF5]">
            <div
              style={{ width: "40%" }}
              className="shadow-none flex flex-col text-center whitespace-nowrap justify-center bg-[#FFB1B1]"
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default TransactionGroupItem;
