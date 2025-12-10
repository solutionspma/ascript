import Sidebar from '@/components/Sidebar'
import DashboardHeader from '@/components/DashboardHeader'
import DashboardFooter from '@/components/DashboardFooter'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <DashboardHeader />
      <Sidebar>{children}</Sidebar>
      <DashboardFooter />
    </>
  )
}
