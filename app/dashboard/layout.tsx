import Sidebar from '@/components/Sidebar'
import DashboardHeader from '@/components/DashboardHeader'
import DashboardFooter from '@/components/DashboardFooter'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader />
      <div className="flex flex-1">
        <Sidebar>{children}</Sidebar>
      </div>
      <DashboardFooter />
    </div>
  )
}
