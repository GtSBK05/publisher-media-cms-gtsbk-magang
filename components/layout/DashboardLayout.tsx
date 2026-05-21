import Sidebar from "./Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main
      className="
        min-h-screen
        bg-[#0b0b12]
        text-white
        flex
      "
    >
      <Sidebar />

      <section className="flex-1 p-8">
        {children}
      </section>
    </main>
  );
}