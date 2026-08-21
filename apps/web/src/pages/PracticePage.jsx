import React, { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import Layout from '@/components/Layout';
import Quiz from '@/components/Quiz';
import useProgress from '@/hooks/useProgress';
import { levels, questions, subjects } from '@/data/curriculum';

export default function PracticePage() {
    const [materia, setMateria] = useState('');
    const [nivel, setNivel] = useState('');
    const { progress, recordAnswer, reset } = useProgress();

    const items = useMemo(
        () => questions.filter((q) => (!materia || q.subject === materia) && (!nivel || q.level === nivel)),
        [materia, nivel],
    );

    const answered = Object.keys(progress.answered).length;
    const correct = Object.values(progress.answered).filter(Boolean).length;
    const pct = answered ? Math.round((correct / answered) * 100) : 0;

    return (
        <Layout>
            <Helmet>
                <title>Ejercicios y cuestionarios interactivos · nabla-phi.org</title>
                <meta name="description" content="Practica física, química y matemáticas con cuestionarios interactivos, dificultad graduada, corrección inmediata e indicadores de progreso." />
            </Helmet>

            <div className="border-b border-border bg-secondary/50">
                <div className="mx-auto max-w-[72rem] px-5 py-14">
                    <h1 className="display text-4xl font-black tracking-tight sm:text-5xl">Practicar</h1>
                    <p className="mt-3 max-w-2xl text-muted-foreground">Elige materia y nivel; cada respuesta se corrige al instante y se explica el razonamiento.</p>
                </div>
            </div>

            <div className="mx-auto grid max-w-[72rem] gap-8 px-5 py-14 lg:grid-cols-[1fr_18rem]">
                <div>
                    <div className="mb-6 flex flex-wrap gap-2">
                        <Chip active={!materia} onClick={() => setMateria('')}>Todas las materias</Chip>
                        {subjects.map((s) => (
                            <Chip key={s.id} active={materia === s.id} onClick={() => setMateria(s.id)}>{s.name}</Chip>
                        ))}
                    </div>
                    <div className="mb-8 flex flex-wrap gap-2">
                        <Chip active={!nivel} onClick={() => setNivel('')}>Todos los niveles</Chip>
                        {levels.map((l) => (
                            <Chip key={l.id} active={nivel === l.id} onClick={() => setNivel(l.id)}>{l.name}</Chip>
                        ))}
                    </div>
                    <Quiz items={items} onAnswer={recordAnswer} />
                </div>

                <aside className="h-fit rounded-[1.4rem] border border-border bg-card p-6">
                    <h2 className="text-sm font-extrabold uppercase tracking-[0.16em] text-muted-foreground">Tu progreso</h2>
                    <p className="display mt-3 text-4xl font-black text-primary">{pct}%</p>
                    <p className="mt-1 text-sm text-muted-foreground">{correct} aciertos de {answered} preguntas respondidas.</p>
                    <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
                        <div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
                    </div>
                    <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                        Temas marcados como estudiados: {progress.lessons.length}. El progreso se guarda solo en este navegador.
                    </p>
                    <button type="button" onClick={reset} className="mt-5 min-h-[44px] w-full rounded-full border border-border text-sm font-extrabold hover:bg-muted active:scale-[0.98]">
                        Reiniciar progreso
                    </button>
                </aside>
            </div>
        </Layout>
    );
}

function Chip({ active, onClick, children }) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-pressed={active}
            className={`min-h-[40px] rounded-full border px-4 text-sm font-extrabold transition-colors ${
                active ? 'border-transparent bg-foreground text-background' : 'border-border bg-card hover:bg-muted'
            }`}
        >
            {children}
        </button>
    );
}
