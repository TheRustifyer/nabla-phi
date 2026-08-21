import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, RotateCcw, XCircle } from 'lucide-react';
import { DifficultyBadge } from '@/components/LessonCard';
import { getSubject } from '@/data/curriculum';

export default function Quiz({ items, onAnswer }) {
    const list = useMemo(() => items, [items]);
    const [index, setIndex] = useState(0);
    const [choice, setChoice] = useState(null);
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);

    useEffect(() => {
        setIndex(0);
        setChoice(null);
        setScore(0);
        setFinished(false);
    }, [list]);

    if (!list.length) {
        return (
            <div className="rounded-[1.4rem] border border-dashed border-border bg-card p-10 text-center">
                <p className="display text-xl font-bold">Todavía no hay preguntas con estos filtros</p>
                <p className="mt-2 text-sm text-muted-foreground">Prueba otra materia o nivel: el banco de ejercicios crece cada semana.</p>
            </div>
        );
    }

    const q = list[index];
    const subject = getSubject(q.subject);
    const answered = choice !== null;
    const correct = answered && choice === q.answer;

    const pick = (i) => {
        if (answered) return;
        setChoice(i);
        const ok = i === q.answer;
        if (ok) setScore((s) => s + 1);
        if (onAnswer) onAnswer(q.id, ok);
    };

    const next = () => {
        if (index + 1 >= list.length) {
            setFinished(true);
            return;
        }
        setIndex(index + 1);
        setChoice(null);
    };

    const restart = () => {
        setIndex(0);
        setChoice(null);
        setScore(0);
        setFinished(false);
    };

    if (finished) {
        const pct = Math.round((score / list.length) * 100);
        return (
            <div className="card-pop rounded-[1.4rem] border border-border bg-card p-8 text-center">
                <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-muted-foreground">Resultado</p>
                <p className="display mt-2 text-5xl font-black" style={{ color: pct >= 70 ? 'hsl(var(--lime))' : 'hsl(var(--accent))' }}>{pct}%</p>
                <p className="mt-2 text-sm text-muted-foreground">{score} de {list.length} respuestas correctas.</p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                    <button onClick={restart} type="button" className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-primary px-5 text-sm font-extrabold text-primary-foreground active:scale-[0.98]">
                        <RotateCcw className="h-4 w-4" /> Repetir
                    </button>
                    <Link to="/apuntes" className="inline-flex min-h-[44px] items-center rounded-full border border-border px-5 text-sm font-extrabold">
                        Volver a los apuntes
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="card-pop rounded-[1.4rem] border border-border bg-card p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wide" style={{ color: subject.color, background: subject.soft }}>{subject.name}</span>
                <DifficultyBadge level={q.difficulty} />
                <span className="mono ml-auto text-xs font-semibold text-muted-foreground">{index + 1} / {list.length}</span>
            </div>

            <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-muted" role="progressbar" aria-valuenow={index + 1} aria-valuemin={1} aria-valuemax={list.length} aria-label="Progreso del ejercicio">
                <div className="h-full rounded-full bg-primary transition-transform duration-300" style={{ width: `${((index + (answered ? 1 : 0)) / list.length) * 100}%` }} />
            </div>

            <h3 className="mt-6 text-xl font-bold leading-snug sm:text-2xl">{q.prompt}</h3>

            <ul className="mt-5 space-y-3">
                {q.options.map((option, i) => {
                    const isAnswer = i === q.answer;
                    const chosen = choice === i;
                    let cls = 'border-border bg-background hover:border-primary hover:bg-secondary/60';
                    if (answered && isAnswer) cls = 'border-[hsl(var(--lime))] bg-[hsl(var(--lime)/0.12)]';
                    else if (answered && chosen) cls = 'border-destructive bg-destructive/10';
                    else if (answered) cls = 'border-border bg-background opacity-60';
                    return (
                        <li key={option}>
                            <button
                                type="button"
                                onClick={() => pick(i)}
                                disabled={answered}
                                aria-pressed={chosen}
                                className={`flex w-full min-h-[52px] items-center gap-3 rounded-2xl border-2 px-4 py-3 text-left text-[15px] font-semibold transition-all active:scale-[0.99] ${cls}`}
                            >
                                <span className="mono grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-muted text-xs font-bold">{String.fromCharCode(65 + i)}</span>
                                <span className="flex-1">{option}</span>
                                {answered && isAnswer && <CheckCircle2 className="h-5 w-5 text-[hsl(var(--lime))]" />}
                                {answered && chosen && !isAnswer && <XCircle className="h-5 w-5 text-destructive" />}
                            </button>
                        </li>
                    );
                })}
            </ul>

            {answered && (
                <div className="mt-5 rounded-2xl border border-border bg-secondary/60 p-4" role="status">
                    <p className="text-sm font-extrabold">{correct ? 'Correcto' : 'Casi: revisa el razonamiento'}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{q.explanation}</p>
                    <div className="mt-4 flex flex-wrap items-center gap-3">
                        <button type="button" onClick={next} className="inline-flex min-h-[44px] items-center rounded-full bg-primary px-5 text-sm font-extrabold text-primary-foreground active:scale-[0.98]">
                            {index + 1 >= list.length ? 'Ver resultado' : 'Siguiente pregunta'}
                        </button>
                        {q.lesson && (
                            <Link to={`/apuntes/${q.lesson}`} className="text-sm font-bold text-primary underline underline-offset-4">
                                Repasar los apuntes
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
