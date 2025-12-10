import Link from 'next/link'
import { Mail, Phone, MapPin } from 'lucide-react'

export default function DashboardFooter() {
  return (
    <footer className="bg-white border-t border-slate-200 mt-auto">
      <div className="px-4 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <div className="text-sm text-slate-600">
            © {new Date().getFullYear()} AScript Healthcare. All rights reserved.
          </div>

          {/* Links */}
          <div className="flex items-center gap-4 lg:gap-6">
            <Link href="/privacy" className="text-xs lg:text-sm text-slate-600 hover:text-blue-600 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs lg:text-sm text-slate-600 hover:text-blue-600 transition-colors">
              Terms of Service
            </Link>
            <Link href="/support" className="text-xs lg:text-sm text-slate-600 hover:text-blue-600 transition-colors">
              Support
            </Link>
          </div>

          {/* Contact */}
          <div className="hidden md:flex items-center gap-4 text-sm text-slate-600">
            <a href="mailto:support@ascript.health" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
              <Mail size={16} />
              support@ascript.health
            </a>
            <a href="tel:+1234567890" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
              <Phone size={16} />
              (123) 456-7890
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
