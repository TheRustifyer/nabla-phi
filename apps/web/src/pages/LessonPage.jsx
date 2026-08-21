import React from 'react';
import { Helmet } from 'react-helmet';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Check, Clock } from 'lucide-react';
import Layout from '@/components/Layout';
import Quiz from '@/components/Quiz';
import { DifficultyBadge } from '@/components/LessonCard';
import useProgress from '@/hooks/useProgress';
import { getLesson, getLevel, getSubject, questions } from '@/data/curriculum';

export default function LessonPage() {
    const { slug } = useParams();
    const lesson = getLesson(slug);
    const { progress, toggleLesson, recordAnswer } = useProgress();

    if (!lesson) {
        return (
            <Layout>
                <Helmet>
                    <title>Apunte no encontrado · nabla-phi.org</title>
                    <meta name="description" content="El apunte solicitado no existe en el catálogo de nabla-phi.org." />
                </Helmet>
                <div className="mx-auto max-w-[56rem] px-5 py-24 text-center">
                    <h1 className="display text-3xl font-black">Ese apunte no existe</h1>
                    <Link to="/apuntes" className="mt-6 inline-flex min-h-[44px] items-center rounded-full bg-primary px-5 font-extrabold text-primary-foreground">Volver al catálogo</Link>
                </div>
            </Layout>
        );
    }

    const subject = getSubject(lesson.subject);
    const level = getLevel(lesson.level);
    const done = progress.lessons.includes(lesson.slug);
    const related = questions.filter((q) => q.lesson === lesson.slug);

    return (
        <Layout>
            <Helmet>
                <title>{`${lesson.title} · ${subject.name} ${level.name} · nabla-phi.org`}</title>
                <meta name="description" content={lesson.summary} />
            </Helmet>

            <article className="mx-auto max-w-[56rem] px-5 py-12">
                <Link to={`/apuntes?materia=${subject.id}`} className="inline-flex items-center gap-2 text-sm font-extrabold text-muted-foreground hover:text-primary">
                    <ArrowLeft className="h-4 w-4" /> {subject.name} · {level.name}
                </Link>

                <h1 className="mt-5 text-3xl font-black leading-tight tracking-tight sm:text-5xl">{lesson.title}</h1>
                <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{lesson.summary}</p>

                <div className="mt-6 flex flex-wrap items-center gap-3 border-y border-border py-4">
                    <DifficultyBadge level={lesson.difficulty} />
                    <span className="mono inline-flex items-center gap-1.5 text-xs text-muted-foreground"><Clock className="h-3.5 w-3.5" /> {lesson.minutes} min</span>
                    <button
                        type="button"
                        onClick={() => toggleLesson(lesson.slug)}
                        className={`ml-auto inline-flex min-h-[44px] items-center gap-2 rounded-full px-5 text-sm font-extrabold transition-colors active:scale-[0.98] ${
                            done ? 'bg-[hsl(var(--lime))] text-white' : 'border border-border bg-card hover:bg-muted'
                        }`}
                    >
                        <Check className="h-4 w-4" /> {done ? 'Tema completado' : 'Marcar como estudiado'}
                    </button>
                </div>

                {lesson.sections.map((section) => (
                    <section key={section.heading} className="mt-10">
                        <h2 className="text-2xl font-bold tracking-tight">{section.heading}</h2>
                        <p className="mt-3 text-[17px] leading-[1.75] text-foreground/85">{section.body}</p>
                        {section.formula && (
                            <p className="mono mt-5 overflow-x-auto rounded-2xl border border-border bg-secondary/60 px-5 py-4 text-center text-base font-semibold">
                                {section.formula}
                            </p>
                        )}
                    </section>
                ))}

                <aside className="mt-12 rounded-[1.4rem] border-2 border-primary/25 bg-primary/5 p-6">
                    <h2 className="text-lg font-extrabold uppercase tracking-wide">Ideas clave</h2>
                    <ul className="mt-4 space-y-3">
                        {lesson.keyPoints.map((point) => (
                            <li key={point} className="flex gap-3 text-[15px] leading-relaxed">
                                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                                {point}
                            </li>
                        ))}
                    </ul>
                </aside>

                <div className="mt-6 flex flex-wrap gap-2">
                    {lesson.tags.map((tag) => (
                        <span key={tag} className="mono rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">#{tag}</span>
                    ))}
                </div>

                {related.length > 0 && (
                    <section className="mt-16">
                        <h2 className="display text-2xl font-black tracking-tight">Comprueba que lo has entendido</h2>
                        <p className="mt-2 mb-6 text-sm text-muted-foreground">{related.length} pregunta{related.length === 1 ? '' : 's'} con corrección inmediata.</p>
                        <Quiz items={related} onAnswer={recordAnswer} />
                    </section>
                )}
            </article>
        </Layout>
    );
}
