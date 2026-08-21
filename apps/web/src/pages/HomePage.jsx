import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Compass, Target } from 'lucide-react';
import Layout from '@/components/Layout';
import Reveal from '@/components/Reveal';
import CountUp from '@/components/CountUp';
import LessonCard from '@/components/LessonCard';
import { lessons, levels, subjects } from '@/data/curriculum';

const ticker = ['Cinemática', 'Enlace químico', 'Autovalores', 'Ecuaciones de Maxwell', 'Termodinámica', 'Series de Fourier', 'Equilibrio químico', 'Lagrangiano', 'Monte Carlo', 'Espectroscopia'];

export default function HomePage() {
    const featured = lessons.slice(0, 3);

    return (
        <Layout>
            <Helmet>
                <title>nabla-phi.org · Apuntes y ejercicios de Física, Química y Matemáticas</title>
                <meta
                    name="description"
                    content="Apuntes claros y ejercicios interactivos de física, química y matemáticas para estudiantes de España, desde Bachillerato hasta doctorado y posdoctorado."
                />
            </Helmet>

            <section className="relative overflow-hidden border-b border-border">
                <div className="grid-paper pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
                <div className="relative mx-auto grid max-w-[90rem] items-center gap-12 px-5 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
                    <div>
                        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-[0.16em] text-muted-foreground">
                            Ciencia para estudiantes de toda España
                        </span>
                        <h1 className="mt-6 text-[2.6rem] font-black leading-[1.03] tracking-tight sm:text-6xl">
                            Entender la física<br />
                            <span className="marker-underline">de verdad</span>, no memorizarla.
                        </h1>
                        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
                            Apuntes escritos con cuidado, diagramas elegantes y ejercicios con corrección inmediata. Física, química y
                            matemáticas desde 1.º de Bachillerato hasta la investigación posdoctoral.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <Link to="/apuntes" className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-primary px-6 text-base font-extrabold text-primary-foreground transition-transform hover:-translate-y-px active:scale-[0.98]">
                                Explorar apuntes <ArrowRight className="h-4 w-4" />
                            </Link>
                            <Link to="/practicar" className="inline-flex min-h-[48px] items-center rounded-full border-2 border-foreground px-6 text-base font-extrabold transition-transform hover:-translate-y-px active:scale-[0.98]">
                                Probar un ejercicio
                            </Link>
                        </div>
                        <dl className="mt-10 grid max-w-lg grid-cols-3 gap-6 border-t border-border pt-6">
                            <div>
                                <dd className="display text-3xl font-black text-primary"><CountUp value={lessons.length} suffix="" /></dd>
                                <dt className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Temas publicados</dt>
                            </div>
                            <div>
                                <dd className="display text-3xl font-black text-[hsl(var(--lime))]"><CountUp value={4} /></dd>
                                <dt className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Niveles</dt>
                            </div>
                            <div>
                                <dd className="display text-3xl font-black text-accent"><CountUp value={3} /></dd>
                                <dt className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Materias</dt>
                            </div>
                        </dl>
                    </div>

                    <Reveal y={28}>
                        <div className="relative">
                            <div className="absolute -left-4 -top-4 hidden h-24 w-24 rounded-3xl bg-[hsl(var(--sun))] sm:block" aria-hidden="true" />
                            <img
                                src="/ai-generated-students.png"
                                alt="Dos estudiantes resolviendo problemas de física juntos en una mesa luminosa"
                                className="relative w-full rounded-[1.8rem] border border-border object-cover shadow-[0_30px_60px_-40px_hsl(232_40%_20%/0.5)]"
                                loading="eager"
                            />
                            <div className="card-pop absolute -bottom-6 left-4 right-4 rounded-2xl border border-border bg-card p-4 sm:left-8 sm:right-auto sm:w-72">
                                <p className="mono text-xs text-muted-foreground">v = v₀ + a·t</p>
                                <p className="mt-1 text-sm font-bold">Cada fórmula, con la idea detrás explicada antes del cálculo.</p>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            <div className="overflow-hidden border-b border-border bg-foreground py-3 text-background">
                <div className="marquee-track flex w-max gap-8">
                    {[...ticker, ...ticker].map((word, i) => (
                        <span key={`${word}-${i}`} className="mono text-xs font-semibold uppercase tracking-[0.2em] opacity-90">
                            {word} <span className="text-[hsl(var(--sun))]">✦</span>
                        </span>
                    ))}
                </div>
            </div>

            <section className="mx-auto max-w-[72rem] px-5 py-20">
                <h2 className="display text-3xl font-black tracking-tight sm:text-4xl">Elige tu materia</h2>
                <p className="mt-3 max-w-xl text-muted-foreground">Cada materia se ramifica en cuatro niveles, del instituto al laboratorio.</p>
                <div className="mt-8 grid gap-5 sm:grid-cols-3">
                    {subjects.map((s, i) => (
                        <Reveal key={s.id} delay={i * 0.08}>
                            <Link
                                to={`/apuntes?materia=${s.id}`}
                                className="card-pop block h-full rounded-[1.4rem] border border-border bg-card p-6 transition-transform duration-200 hover:-translate-y-1"
                            >
                                <span className="grid h-11 w-11 place-items-center rounded-2xl" style={{ background: s.soft, color: s.color }}>
                                    <BookOpen className="h-5 w-5" />
                                </span>
                                <h3 className="mt-4 text-xl font-bold">{s.name}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.tagline}</p>
                                <p className="mono mt-4 text-xs font-semibold" style={{ color: s.color }}>
                                    {lessons.filter((l) => l.subject === s.id).length} temas
                                </p>
                            </Link>
                        </Reveal>
                    ))}
                </div>
            </section>

            <section className="border-y border-border bg-secondary/50">
                <div className="mx-auto max-w-[72rem] px-5 py-20">
                    <div className="flex flex-wrap items-end justify-between gap-4">
                        <h2 className="display text-3xl font-black tracking-tight sm:text-4xl">Recorrido por niveles</h2>
                        <Link to="/apuntes" className="text-sm font-extrabold text-primary underline underline-offset-4">Ver todo el catálogo</Link>
                    </div>
                    <ol className="mt-10 space-y-0 divide-y divide-border border-t border-border">
                        {levels.map((l, i) => (
                            <li key={l.id} className="grid gap-4 py-6 sm:grid-cols-[6rem_1fr_auto] sm:items-center">
                                <span className="mono text-sm font-bold text-primary">0{i + 1}</span>
                                <div>
                                    <h3 className="text-lg font-bold">{l.name}</h3>
                                    <p className="mt-1 text-sm text-muted-foreground">{l.description}</p>
                                </div>
                                <Link to={`/apuntes?nivel=${l.id}`} className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-border bg-card px-5 text-sm font-extrabold">
                                    Entrar <ArrowRight className="h-4 w-4" />
                                </Link>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            <section className="mx-auto max-w-[72rem] px-5 py-20">
                <h2 className="display text-3xl font-black tracking-tight sm:text-4xl">Empieza por aquí</h2>
                <div className="mt-8 grid gap-5 md:grid-cols-3">
                    {featured.map((lesson, i) => (
                        <Reveal key={lesson.slug} delay={i * 0.08}>
                            <LessonCard lesson={lesson} />
                        </Reveal>
                    ))}
                </div>
            </section>

            <section className="mx-auto max-w-[72rem] px-5 pb-24">
                <div className="grid items-center gap-10 rounded-[2rem] border border-border bg-card p-6 sm:p-10 lg:grid-cols-[1fr_0.85fr]">
                    <div>
                        <h2 className="display text-3xl font-black tracking-tight sm:text-4xl">Practica con corrección al instante</h2>
                        <p className="mt-4 text-muted-foreground">
                            Cada pregunta indica su nivel de dificultad y explica el razonamiento en cuanto respondes. El progreso se guarda en
                            tu navegador para que puedas retomar donde lo dejaste.
                        </p>
                        <ul className="mt-6 space-y-3 text-sm font-semibold">
                            <li className="flex items-center gap-3"><Target className="h-4 w-4 text-accent" /> Cuatro grados de dificultad, de iniciación a investigación</li>
                            <li className="flex items-center gap-3"><Compass className="h-4 w-4 text-primary" /> Filtros por materia y nivel académico</li>
                            <li className="flex items-center gap-3"><BookOpen className="h-4 w-4 text-[hsl(var(--lime))]" /> Enlace directo al apunte de cada pregunta</li>
                        </ul>
                        <Link to="/practicar" className="mt-8 inline-flex min-h-[48px] items-center gap-2 rounded-full bg-accent px-6 text-base font-extrabold text-accent-foreground active:scale-[0.98]">
                            Ir a los ejercicios <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                    <img
                        src="/chemistry-lab.png"
                        alt="Material de física y química: prisma, vaso de precipitados, regla y cuaderno con gráficas"
                        className="w-full rounded-[1.5rem] border border-border object-cover"
                        loading="lazy"
                    />
                </div>
            </section>
        </Layout>
    );
}
