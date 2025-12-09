import Sidebar from '@/components/Sidebar'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // TEMP: Auth disabled for testing
  // const session = await getServerSession(authOptions)
  // if (!session) {
  //   redirect('/login')
  // }

  return <Sidebar>{children}</Sidebar>
}
