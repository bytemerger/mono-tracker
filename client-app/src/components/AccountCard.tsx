import refresh from "../assets/refresh.svg";
import { Account } from "../types/AccountType";

interface props {
  account: Account;
  unlink: (id: string) => void;
  reAuth(id: string): void;
}
function AccountCard({ account, unlink, reAuth }: props) {
  return (
    account.accountNumber ?
    <div className="shadow-xl overflow-hidden border-l-2 border-r-2 border-t-2 border-gray-100 w-80">
      <div className="bg-[#fafafa]">
        <div className="p-5">
          <div className="flex justify-between mb-5">
            <div className="text-sm text-gray-800">{account.name}</div>
            <div className="inline-block text-gray-800 relative group">
              {!account.reAuth ? (
                <div>
                  <svg
                    width="20"
                    height="25"
                    viewBox="0 0 20 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19.5375 2.06109C19.3923 1.94358 19.2226 1.86012 19.0409 1.81684C18.8592 1.77356 18.6701 1.77157 18.4875 1.81101C17.1518 2.09103 15.7729 2.0946 14.4358 1.82149C13.0987 1.54839 11.8316 1.0044 10.7125 0.223014C10.5033 0.0778094 10.2547 0 10 0C9.74534 0 9.49675 0.0778094 9.2875 0.223014C8.16845 1.0044 6.90135 1.54839 5.56421 1.82149C4.22708 2.0946 2.84821 2.09103 1.51251 1.81101C1.32993 1.77157 1.14084 1.77356 0.959132 1.81684C0.777427 1.86012 0.607726 1.94358 0.462507 2.06109C0.317481 2.17877 0.200658 2.32747 0.120623 2.49625C0.0405868 2.66502 -0.000627737 2.84959 7.22685e-06 3.03639V12.3518C-0.00110407 14.1446 0.425973 15.9116 1.24567 17.5059C2.06538 19.1001 3.25398 20.4754 4.7125 21.5172L9.275 24.7682C9.4867 24.919 9.74012 25 10 25C10.2599 25 10.5133 24.919 10.725 24.7682L15.2875 21.5172C16.746 20.4754 17.9346 19.1001 18.7543 17.5059C19.574 15.9116 20.0011 14.1446 20 12.3518V3.03639C20.0006 2.84959 19.9594 2.66502 19.8794 2.49625C19.7993 2.32747 19.6825 2.17877 19.5375 2.06109ZM17.5 12.3518C17.501 13.7457 17.1691 15.1196 16.5321 16.3593C15.895 17.599 14.9712 18.6686 13.8375 19.479L10 22.2174L6.1625 19.479C5.0288 18.6686 4.10499 17.599 3.46794 16.3593C2.8309 15.1196 2.49905 13.7457 2.50001 12.3518V4.47434C5.12054 4.69871 7.74505 4.0905 10 2.7363C12.2549 4.0905 14.8795 4.69871 17.5 4.47434V12.3518ZM11.925 9.48841L8.5625 12.8645L7.45 11.7391C7.21462 11.5037 6.89538 11.3714 6.5625 11.3714C6.22963 11.3714 5.91038 11.5037 5.675 11.7391C5.43962 11.9746 5.30739 12.2939 5.30739 12.6269C5.30739 12.9599 5.43962 13.2792 5.675 13.5147L7.675 15.5153C7.79121 15.6325 7.92946 15.7255 8.08178 15.789C8.23411 15.8525 8.39749 15.8852 8.5625 15.8852C8.72752 15.8852 8.8909 15.8525 9.04322 15.789C9.19555 15.7255 9.3338 15.6325 9.45 15.5153L13.75 11.2515C13.9854 11.016 14.1176 10.6967 14.1176 10.3637C14.1176 10.0307 13.9854 9.71136 13.75 9.47591C13.5146 9.24046 13.1954 9.10818 12.8625 9.10818C12.5296 9.10818 12.2104 9.24046 11.975 9.47591L11.925 9.48841Z"
                      fill="#000000"
                    />
                  </svg>
                </div>
              ) : (
                <div>
                  <img src={refresh} />
                  <span className="text-xs">Re-auth</span>
                </div>
              )}
            </div>
          </div>
          <div className="text-2xl font-semibold mb-4 text-gray-800">
            ₦{parseInt(account.balance)/100}
          </div>
        </div>
      </div>
      <div className="flex justify-around p-3 bg-gray-50">
        <div>
          <div className="small-text text-gray-400">Account number</div>
          <div className="text-xs text-gray-800">**** ** {account.accountNumber.slice(-6)}</div>
        </div>
        <div>
          <div className="small-text text-gray-500">Type</div>
          <div className="text-xs text-gray-800">{account.type.substring(0, 3)}</div>
        </div>
        <div>
          <div className="small-text text-gray-500">Curr</div>
          <div className="text-xs text-gray-800">{account.currency}</div>
        </div>
        <div className="w-12 self-center">
          <button className="p-1 rounded-md bg-red-500 text-white/70" onClick={() =>{ 
            if (window.confirm('Unlink Account '+ account.accountNumber)){
                unlink(account._id)
            }
            }}>
            Unlink
          </button>
        </div>
      </div>
    </div>:
    // account is still processing
    <div className="shadow-xl overflow-hidden border-l-2 border-r-2 border-t-2 border-gray-100 w-80">
      <div className="bg-[#fafafa]">
        <div className="p-5">
          <div className="flex justify-between mb-5">
            <div className="text-sm text-gray-800">{account._id}</div>
            <div className="inline-block text-gray-800 relative group">
              {!account.reAuth ? (
                <div>
                  <svg
                    width="20"
                    height="25"
                    viewBox="0 0 20 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19.5375 2.06109C19.3923 1.94358 19.2226 1.86012 19.0409 1.81684C18.8592 1.77356 18.6701 1.77157 18.4875 1.81101C17.1518 2.09103 15.7729 2.0946 14.4358 1.82149C13.0987 1.54839 11.8316 1.0044 10.7125 0.223014C10.5033 0.0778094 10.2547 0 10 0C9.74534 0 9.49675 0.0778094 9.2875 0.223014C8.16845 1.0044 6.90135 1.54839 5.56421 1.82149C4.22708 2.0946 2.84821 2.09103 1.51251 1.81101C1.32993 1.77157 1.14084 1.77356 0.959132 1.81684C0.777427 1.86012 0.607726 1.94358 0.462507 2.06109C0.317481 2.17877 0.200658 2.32747 0.120623 2.49625C0.0405868 2.66502 -0.000627737 2.84959 7.22685e-06 3.03639V12.3518C-0.00110407 14.1446 0.425973 15.9116 1.24567 17.5059C2.06538 19.1001 3.25398 20.4754 4.7125 21.5172L9.275 24.7682C9.4867 24.919 9.74012 25 10 25C10.2599 25 10.5133 24.919 10.725 24.7682L15.2875 21.5172C16.746 20.4754 17.9346 19.1001 18.7543 17.5059C19.574 15.9116 20.0011 14.1446 20 12.3518V3.03639C20.0006 2.84959 19.9594 2.66502 19.8794 2.49625C19.7993 2.32747 19.6825 2.17877 19.5375 2.06109ZM17.5 12.3518C17.501 13.7457 17.1691 15.1196 16.5321 16.3593C15.895 17.599 14.9712 18.6686 13.8375 19.479L10 22.2174L6.1625 19.479C5.0288 18.6686 4.10499 17.599 3.46794 16.3593C2.8309 15.1196 2.49905 13.7457 2.50001 12.3518V4.47434C5.12054 4.69871 7.74505 4.0905 10 2.7363C12.2549 4.0905 14.8795 4.69871 17.5 4.47434V12.3518ZM11.925 9.48841L8.5625 12.8645L7.45 11.7391C7.21462 11.5037 6.89538 11.3714 6.5625 11.3714C6.22963 11.3714 5.91038 11.5037 5.675 11.7391C5.43962 11.9746 5.30739 12.2939 5.30739 12.6269C5.30739 12.9599 5.43962 13.2792 5.675 13.5147L7.675 15.5153C7.79121 15.6325 7.92946 15.7255 8.08178 15.789C8.23411 15.8525 8.39749 15.8852 8.5625 15.8852C8.72752 15.8852 8.8909 15.8525 9.04322 15.789C9.19555 15.7255 9.3338 15.6325 9.45 15.5153L13.75 11.2515C13.9854 11.016 14.1176 10.6967 14.1176 10.3637C14.1176 10.0307 13.9854 9.71136 13.75 9.47591C13.5146 9.24046 13.1954 9.10818 12.8625 9.10818C12.5296 9.10818 12.2104 9.24046 11.975 9.47591L11.925 9.48841Z"
                      fill="#000000"
                    />
                  </svg>
                </div>
              ) : (
                <div>
                  <img src={refresh} />
                  <span className="text-xs">Re-auth</span>
                </div>
              )}
            </div>
          </div>
          <div className="text-2xl font-semibold mb-4 text-gray-800">
            processing ....
          </div>
        </div>
      </div>
      <div className="flex justify-around p-3 bg-gray-50">
        <div>
          <div className="small-text text-gray-400">Account number</div>
          <div className="text-xs text-gray-800">**** ** ****</div>
        </div>
        <div>
          <div className="small-text text-gray-500">Type</div>
          <div className="text-xs text-gray-800">***</div>
        </div>
        <div>
          <div className="small-text text-gray-500">Curr</div>
          <div className="text-xs text-gray-800">****</div>
        </div>
      </div>
    </div>
  );
}
export default AccountCard;
