import Sidebar from "@/components/portal/Sidebar";
import TopBar from "@/components/portal/TopBar";
import { ProgressProvider } from "@/lib/ProgressContext";
import { StateProvider } from "@/lib/StateContext";

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProgressProvider>
      <StateProvider>
        <div className="min-h-screen bg-bg">
          <Sidebar />
          <div className="ml-20">
            <TopBar />
            <main className="p-8">
              <div className="max-w-[850px] mx-auto">{children}</div>
            </main>
          </div>
        </div>
      </StateProvider>
    </ProgressProvider>
  );
}
