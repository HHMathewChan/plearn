import NavigationBar from "./NavigationBar";

type ProtectedLayoutProps = {
  children: React.ReactNode;
};

const ProtectedLayout: React.FC<ProtectedLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationBar />
      <main className="p-6">
        {children}
      </main>
    </div>
  );
};

export default ProtectedLayout;