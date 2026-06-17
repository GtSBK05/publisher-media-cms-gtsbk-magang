import DashboardLayout
from "@/components/layout/DashboardLayout";

import WikiSettingsGuard
from "@/components/auth/WikiSettingsGuard";

export default function WikiSettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WikiSettingsGuard>
      <DashboardLayout
        title="Wiki Settings"
        subtitle="Content Archive Publisher"
      >
        {children}
      </DashboardLayout>
    </WikiSettingsGuard>
  );
}