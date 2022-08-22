interface props {
  narration: string;
  date: string;
  type: "debit" | "credit";
  amount: string;
  detailed?: boolean
}
function TransactionElement({ narration, date, type, amount, detailed = false }: props) {
  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-4">
        {type === "debit" ? (
          <div className="h-12 w-12 bg-orange-400 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              width="20"
              height="20"
            >
              <path
                d="M31.71 1.71 30.29.29 2 28.59V16H0v15a1 1 0 0 0 1 1h16v-2H3.41z"
                data-name="6-Arrow Down"
              />
            </svg>{" "}
          </div>
        ) : (
          <div className="h-12 w-12 bg-blue-400 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
              <path d="M7 7h8.586L5.293 17.293l1.414 1.414L17 8.414V17h2V5H7v2z" />
            </svg>
          </div>
        )}
        <div className="flex flex-col gap-3">
          <div className="font-bold text-[17px] leading-4 tracking-[0.37px] text-[#273240]">
            {detailed ? narration.substring(0,50) : narration.substring(0, 20) + "...."}
          </div>
          <div className="text-base leading-4 tracking-[.57px] text-[#404852] opacity-50">
            {date}• {type}
          </div>
        </div>
      </div>
      <div className="font-bold text-[17px] leading-4 tracking-[0.37px] text-[#273240]">
        {type === "debit" ? "-" : "+"}₦{parseInt(amount) / 100}
      </div>
    </div>
  );
}
export default TransactionElement;
