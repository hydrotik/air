import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import { useTheme } from '@hydrotik/theme-provider';
import { Button, Separator } from '@hydrotik/design-system';
import { Sun, Moon, Github } from 'lucide-react';
import { HomePage, SinkPage, DashboardPage, EcommercePage } from './pages';
import * as s from './App.css';

function cx(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

export default function App() {
  const { theme, setTheme } = useTheme();

  return (
    <div className={s.page}>
      {/* ─── Navbar ──────────────────────────────────────────────── */}
      <header className={s.navbar}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <NavLink to="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '15px', fontWeight: 700, letterSpacing: '-0.01em' }}>
              hydrotik
            </span>
            <span style={{ fontSize: '12px', opacity: 0.4, fontWeight: 500 }}>/&nbsp;design system</span>
          </NavLink>

          <Separator orientation="vertical" style={{ height: '20px' }} />

          <nav className={s.navLinks}>
            <NavLink
              to="/"
              end
              className={({ isActive }) => cx(s.navLink, isActive && s.navLinkActive)}
            >
              Home
            </NavLink>
            <NavLink
              to="/sink"
              className={({ isActive }) => cx(s.navLink, isActive && s.navLinkActive)}
            >
              Components
            </NavLink>
            <NavLink
              to="/dashboard"
              className={({ isActive }) => cx(s.navLink, isActive && s.navLinkActive)}
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/ecommerce"
              className={({ isActive }) => cx(s.navLink, isActive && s.navLinkActive)}
            >
              E-Commerce
            </NavLink>
          </nav>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => window.open('https://github.com/hydrotik/hydrotik', '_blank')}
            aria-label="GitHub"
          >
            <Github size={15} />
          </Button>
        </div>
      </header>

      {/* ─── Routes ─────────────────────────────────────────────── */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sink" element={<SinkPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/ecommerce" element={<EcommercePage />} />
      </Routes>
    </div>
  );
}
