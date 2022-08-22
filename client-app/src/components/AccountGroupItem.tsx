function AccountGroupItem({
  name,
  balance,
  percentage,
}: {
  name: string;
  balance: string;
  percentage: number;
}) {
  return (
    <div className="text-[#273240]">
      <div className="flex justify-between text-lg tracking-[0.67px]">
        <div className="font-bold">{name}</div>

        <div>₦{parseInt(balance) / 100}</div>
      </div>
      <div className="mt-3">
        <div className="relative pt-1">
          <div className="overflow-hidden h-1 text-xs flex rounded bg-[#ECEFF5]">
            <div
              style={{ width: percentage.toString() + "%" }}
              className="shadow-none flex flex-col text-center whitespace-nowrap justify-center bg-[#FFB1B1]"
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AccountGroupItem;
