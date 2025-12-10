import Sidebar from '@/components/Sidebar'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <Sidebar>{children}</Sidebar>
}
