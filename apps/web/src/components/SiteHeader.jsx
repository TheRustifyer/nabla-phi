import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, Search, Sparkles, X } from 'lucide-react';

const nav = [
    { to: '/apuntes', label: 'Apuntes' },
    { to: '/practicar', label: 'Practicar' },
    { to: '/recursos', label: 'Recursos' },
];

export default function SiteHeader() {
    const [open, setOpen] = useState(false);
    const [term, setTerm] = useState('');
    const navigate = useNavigate();

    const submit = (event) => {
        event.preventDefault();
        navigate(`/apuntes?q=${encodeURIComponent(term.trim())}`);
        setOpen(false);
    };

    return (
        <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
            <div className="mx-auto flex max-w-[90rem] items-center gap-4 px-5 py-3.5">
                <Link to="/" className="flex items-center gap-2.5 shrink-0">
                    <span className="grid h-9 w-9 place-items-center rounded-2xl bg-primary text-primary-foreground">
                        <Sparkles className="h-5 w-5" strokeWidth={2.2} />
                    </span>
                    <span className="display text-lg font-bold leading-none tracking-tight">
                        nabla-phi
                        <span className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">.org</span>
                    </span>
                </Link>

                <nav className="ml-4 hidden items-center gap-1 md:flex">
                    {nav.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) =>
                                `rounded-full px-4 py-2 text-sm font-bold transition-colors ${
                                    isActive ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                }`
                            }
                        >
                            {item.label}
                        </NavLink>
                    ))}
                </nav>

                <form onSubmit={submit} role="search" className="ml-auto hidden w-64 items-center gap-2 rounded-full border border-border bg-card px-3.5 py-2 lg:flex">
                    <Search className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                    <input
                        value={term}
                        onChange={(e) => setTerm(e.target.value)}
                        aria-label="Buscar apuntes"
                        placeholder="Buscar tema, nivel..."
                        className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                    />
                </form>

                <Link
                    to="/practicar"
                    className="ml-auto hidden min-h-[44px] items-center rounded-full bg-accent px-5 text-sm font-extrabold text-accent-foreground transition-transform hover:-translate-y-px active:scale-[0.98] md:ml-0 md:inline-flex"
                >
                    Empezar a practicar
                </Link>

                <button
                    type="button"
                    onClick={() => setOpen((v) => !v)}
                    aria-expanded={open}
                    aria-label="Abrir menú"
                    className="ml-auto grid h-11 w-11 place-items-center rounded-2xl border border-border md:hidden"
                >
                    {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
            </div>

            {open && (
                <div className="border-t border-border bg-card px-5 py-4 md:hidden">
                    <form onSubmit={submit} role="search" className="mb-3 flex items-center gap-2 rounded-full border border-border px-4 py-2.5">
                        <Search className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                        <input
                            value={term}
                            onChange={(e) => setTerm(e.target.value)}
                            aria-label="Buscar apuntes"
                            placeholder="Buscar tema, nivel..."
                            className="w-full bg-transparent text-sm outline-none"
                        />
                    </form>
                    <div className="flex flex-col">
                        {nav.map((item) => (
                            <Link key={item.to} to={item.to} onClick={() => setOpen(false)} className="min-h-[44px] py-2.5 text-base font-bold">
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
}
