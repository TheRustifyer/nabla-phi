import React from 'react';
import { Link } from 'react-router-dom';
import { Check, Clock } from 'lucide-react';
import { difficulties, getLevel, getSubject } from '@/data/curriculum';

export function DifficultyBadge({ level }) {
    const d = difficulties[level];
    return (
        <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wide" style={{ color: d.color, background: `${d.color}1a` }}>
            <span className="flex gap-0.5" aria-hidden="true">
                {[1, 2, 3, 4].map((i) => (
                    <span key={i} className="h-1.5 w-1.5 rounded-full" style={{ background: i <= level ? d.color : `${d.color}40` }} />
                ))}
            </span>
            {d.label}
        </span>
    );
}

export default function LessonCard({ lesson, done = false }) {
    const subject = getSubject(lesson.subject);
    const level = getLevel(lesson.level);
    return (
        <Link
            to={`/apuntes/${lesson.slug}`}
            className="card-pop group flex h-full flex-col rounded-[1.4rem] border border-border bg-card p-5 transition-transform duration-200 hover:-translate-y-1"
        >
            <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wide" style={{ color: subject.color, background: subject.soft }}>
                    {subject.name}
                </span>
                <span className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wide text-muted-foreground">{level.name}</span>
                {done && (
                    <span className="ml-auto inline-flex items-center gap-1 text-[11px] font-extrabold uppercase text-[hsl(var(--lime))]">
                        <Check className="h-3.5 w-3.5" /> Hecho
                    </span>
                )}
            </div>
            <h3 className="mt-3 text-lg font-bold leading-snug group-hover:text-primary">{lesson.title}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{lesson.summary}</p>
            <div className="mt-4 flex items-center justify-between border-t border-border pt-3.5">
                <DifficultyBadge level={lesson.difficulty} />
                <span className="mono inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" /> {lesson.minutes} min
                </span>
            </div>
        </Link>
    );
}
