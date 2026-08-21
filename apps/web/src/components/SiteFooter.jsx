import React from 'react';
import { Link } from 'react-router-dom';
import { subjects, levels } from '@/data/curriculum';

export default function SiteFooter() {
    return (
        <footer className="mt-24 border-t border-border bg-card">
            <div className="mx-auto grid max-w-[72rem] gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                    <p className="display text-lg font-bold">nabla-phi.org</p>
                    <p className="mt-2 max-w-xs text-sm text-muted-foreground">
                        Apuntes y ejercicios de física, química y matemáticas para estudiantes de toda España, desde la ESO y Bachillerato hasta la investigación.
                    </p>
                </div>
                <div>
                    <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-muted-foreground">Materias</p>
                    <ul className="mt-3 space-y-2 text-sm">
                        {subjects.map((s) => (
                            <li key={s.id}>
                                <Link className="font-semibold hover:text-primary" to={`/apuntes?materia=${s.id}`}>{s.name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-muted-foreground">Niveles</p>
                    <ul className="mt-3 space-y-2 text-sm">
                        {levels.map((l) => (
                            <li key={l.id}>
                                <Link className="font-semibold hover:text-primary" to={`/apuntes?nivel=${l.id}`}>{l.name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-muted-foreground">Contacto</p>
                    <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                        <li><a className="font-semibold text-foreground hover:text-primary" href="mailto:hola@nabla-phi.org">hola@nabla-phi.org</a></li>
                        <li>Comunidad docente abierta</li>
                        <li><Link className="font-semibold text-foreground hover:text-primary" to="/recursos">Zona de estudio</Link></li>
                    </ul>
                </div>
            </div>
            <div className="border-t border-border px-5 py-5 text-center text-xs text-muted-foreground">
                © {new Date().getFullYear()} nabla-phi.org · Material educativo
            </div>
        </footer>
    );
}
