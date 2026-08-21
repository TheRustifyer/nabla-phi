import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { FileText } from 'lucide-react';
import Layout from '@/components/Layout';
import { getLevel, getSubject, resources } from '@/data/curriculum';

export default function ResourcesPage() {
    return (
        <Layout>
            <Helmet>
                <title>Zona de estudio y recursos · nabla-phi.org</title>
                <meta name="description" content="Formularios, guías de método, prácticas de laboratorio y material de preparación de exámenes para física, química y matemáticas." />
            </Helmet>

            <div className="border-b border-border bg-secondary/50">
                <div className="mx-auto max-w-[72rem] px-5 py-14">
                    <h1 className="display text-4xl font-black tracking-tight sm:text-5xl">Zona de estudio</h1>
                    <p className="mt-3 max-w-2xl text-muted-foreground">
                        Material de apoyo para acompañar los apuntes: formularios, métodos de resolución, laboratorio y preparación de exámenes.
                    </p>
                </div>
            </div>

            <div className="mx-auto max-w-[72rem] px-5 py-14">
                <ul className="divide-y divide-border border-y border-border">
                    {resources.map((r) => {
                        const subject = getSubject(r.subject);
                        const level = getLevel(r.level);
                        return (
                            <li key={r.title} className="grid gap-3 py-6 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:gap-6">
                                <span className="grid h-11 w-11 place-items-center rounded-2xl" style={{ background: subject.soft, color: subject.color }}>
                                    <FileText className="h-5 w-5" />
                                </span>
                                <div>
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="mono text-[11px] font-bold uppercase tracking-wide" style={{ color: subject.color }}>{r.kind}</span>
                                        <span className="mono text-[11px] uppercase tracking-wide text-muted-foreground">{subject.name} · {level.name}</span>
                                    </div>
                                    <h2 className="mt-1 text-lg font-bold">{r.title}</h2>
                                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{r.description}</p>
                                </div>
                                <Link
                                    to={`/apuntes?materia=${r.subject}&nivel=${r.level}`}
                                    className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-border bg-card px-5 text-sm font-extrabold hover:bg-muted"
                                >
                                    Ver apuntes
                                </Link>
                            </li>
                        );
                    })}
                </ul>
                <p className="mt-10 rounded-[1.4rem] border border-dashed border-border p-6 text-sm text-muted-foreground">
                    Estamos ampliando la biblioteca con nuevos formularios y colecciones de problemas resueltos. Si echas algo en falta, escríbenos a
                    {' '}<a className="font-bold text-primary underline underline-offset-4" href="mailto:hola@nabla-phi.org">hola@nabla-phi.org</a>.
                </p>
            </div>
        </Layout>
    );
}
