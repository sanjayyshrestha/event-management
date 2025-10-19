import Link from 'next/link';

const navLinks = [
  { name: 'Users', href: '/dashboard/users', icon: '🏠' },
  { name: 'Applied Jobs', href: '/dashboard/applied-jobs', icon: '📄' },
  { name: 'Favorite Jobs', href: '/dashboard/favorite-jobs', icon: '⭐' },
  { name: 'Job Alert', href: '/dashboard/job-alert', icon: '🔔', badge: 9 },
  { name: 'Settings', href: '/dashboard/settings', icon: '⚙️' },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-md flex flex-col">
      <div className="p-4 text-xl font-bold">Candidate Dashboard</div>
      <nav className="flex-1 px-2 space-y-1">
        {navLinks.map((link) => (
          <Link key={link.name} href={link.href}>
            <div className="flex items-center p-2 rounded hover:bg-gray-100">
              <span className="mr-2">{link.icon}</span>
              {link.name}
              {link.badge && <span className="ml-auto bg-blue-500 text-white px-2 rounded">{link.badge}</span>}
            </div>
          </Link>
        ))}
      </nav>
      <button className="m-4 p-2 bg-red-500 text-white rounded">Logout</button>
    </aside>
  );
}
