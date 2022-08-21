import NotificationModal from "./NotificationModal";


interface props {
  children: React.ReactNode;
}
function DefaultLayout({ children }: props) {
  return (
    <div className="relative font-DuplicateSans">
        {children}
        <NotificationModal />
    </div>
  );
}
export default DefaultLayout;
