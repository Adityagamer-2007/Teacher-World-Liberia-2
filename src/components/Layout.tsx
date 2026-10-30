import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Menu, X, ArrowUp } from 'lucide-react'
import { EMAIL, MOTTO, OFFICES, PHONES } from '../data'

const NAV: [string, string][] = [['/', 'Home'], ['/about', 'About Us'], ['/programs', 'Programs & Services'], ['/impact', 'Our Impact'], ['/team', 'Our Team'], ['/gallery', 'Gallery'], ['/contact', 'Contact Us']]
const TITLES: Record<string, string> = { '/get-involved': 'Get Involved', ...Object.fromEntries(NAV) }

export default function Layout() {
  const [open, setOpen] = useState(false)
  const [top, setTop] = useState(false)
  const { pathname } = useLocation()
  useEffect(() => { setOpen(false); window.scrollTo(0, 0); document.title = `${TITLES[pathname] ?? 'Teacher World Liberia'} | Teacher World Liberia` }, [pathname])
  useEffect(() => { const f = () => setTop(window.scrollY > 600); window.addEventListener('scroll', f, { passive: true }); return () => window.removeEventListener('scroll', f) }, [])
  return (<>
    <header className="hdr"><div className="wrap nav">
      <Link to="/" className="logo" aria-label="Teacher World Liberia — home"><img src="/images/logo.png" alt="Teacher World Liberia logo" width="372" height="113" /></Link>
      <button className="menu" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      <nav aria-label="Main" className={open ? 'open' : ''}>
        {NAV.map(([to, l]) => <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => (isActive ? 'on' : '')}>{l}</NavLink>)}
        <Link to="/get-involved" className="cta">Get Involved</Link>
      </nav></div></header>
    <motion.main key={pathname} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}><Outlet /></motion.main>
    <footer className="ftr"><div className="wrap grid g4">
      <div><img className="flogo" src="/images/logo.png" alt="Teacher World Liberia logo" width="372" height="113" loading="lazy" /><p><i>{MOTTO}</i></p><p>Teacher professional development, educational consultancy and support for children and communities in Liberia.</p></div>
      <div><h3>Pages</h3>{NAV.map(([to, l]) => <Link key={to} to={to}>{l}</Link>)}<Link to="/get-involved">Get Involved</Link></div>
      <div><h3>Programs</h3><Link to="/programs">Training</Link><Link to="/programs">Educational Consultancy</Link><Link to="/programs">Charity &amp; Health</Link></div>
      <div><h3>Contact</h3>{PHONES.map(p => <a key={p} href={`tel:${p}`}>{p}</a>)}<a href={`mailto:${EMAIL}`}>{EMAIL}</a>{OFFICES.map(o => <p key={o.label} className="faddr"><b>{o.label}:</b> {o.address}</p>)}</div></div>
      <div className="wrap" style={{ marginTop: 28 }}>© {new Date().getFullYear()} Teacher World Liberia. All rights reserved.</div></footer>
    {top && <button className="totop" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><ArrowUp /></button>}
  </>)
}
