import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import Layout from '@/components/Layout';
import LessonCard from '@/components/LessonCard';
import useProgress from '@/hooks/useProgress';
import { lessons, levels, subjects } from '@/data/curriculum';

export default function NotesPage() {
    const [params, setParams] = useSearchParams();
    const { progress } = useProgress();
    const q = params.get('q') || '';
    const materia = params.get('materia') || '';
    const nivel = params.get('nivel') || '';

    const setParam = (key, value) => {
        const next = new URLSearchParams(params);
        if (value) next.set(key, value);
        else next.delete(key);
        setParams(next, { replace: true });
    };

    const results = useMemo(() => {
        const term = q.trim().toLowerCase();
        return lessons.filter((l) => {
            if (materia && l.subject !== materia) return false;
            if (nivel && l.level !== nivel) return false;
            if (!term) return true;
            return [l.title, l.summary, ...l.tags].join(' ').toLowerCase().includes(term);
        });
    }, [q, materia, nivel]);

    return (
        <Layout>
            <Helmet>
                <title>Apuntes por materia y nivel · nabla-phi.org</title>
                <meta name="description" content="Busca y filtra apuntes de física, química y matemáticas por materia, nivel académico y dificultad, de Bachillerato a doctorado." />
            </Helmet>

            <div className="border-b border-border bg-secondary/50">
                <div className="mx-auto max-w-[72rem] px-5 py-14">
                    <h1 className="display text-4xl font-black tracking-tight sm:text-5xl">Catálogo de apuntes</h1>
                    <p className="mt-3 max-w-2xl text-muted-foreground">
                        Filtra por materia y nivel o busca directamente el tema que necesitas. Cada apunte incluye ideas clave y ejercicios asociados.
                    </p>

                    <label className="mt-8 flex items-center gap-3 rounded-full border border-border bg-card px-5 py-3">
                        <Search className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                        <span className="sr-only">Buscar apuntes</span>
                        <input
                            value={q}
                            onChange={(e) => setParam('q', e.target.value)}
                            placeholder="Ecuaciones de Maxwell, pH, autovalores..."
                            className="w-full bg-transparent text-base outline-none placeholder:text-muted-foreground"
                        />
                    </label>

                    <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="mono text-xs font-bold uppercase text-muted-foreground">Materia</span>
                            <FilterChip active={!materia} onClick={() => setParam('materia', '')}>Todas</FilterChip>
                            {subjects.map((s) => (
                                <FilterChip key={s.id} active={materia === s.id} onClick={() => setParam('materia', s.id)} color={s.color}>
                                    {s.name}
                                </FilterChip>
                            ))}
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="mono text-xs font-bold uppercase text-muted-foreground">Nivel</span>
                            <FilterChip active={!nivel} onClick={() => setParam('nivel', '')}>Todos</FilterChip>
                            {levels.map((l) => (
                                <FilterChip key={l.id} active={nivel === l.id} onClick={() => setParam('nivel', l.id)}>{l.short}</FilterChip>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-[72rem] px-5 py-14">
                <p className="mono mb-6 text-sm text-muted-foreground">{results.length} tema{results.length === 1 ? '' : 's'} encontrado{results.length === 1 ? '' : 's'}</p>
                {results.length === 0 ? (
                    <div className="rounded-[1.4rem] border border-dashed border-border bg-card p-12 text-center">
                        <p className="display text-xl font-bold">Sin resultados</p>
                        <p className="mt-2 text-sm text-muted-foreground">Prueba con otra palabra clave o quita algún filtro.</p>
                    </div>
                ) : (
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {results.map((lesson) => (
                            <LessonCard key={lesson.slug} lesson={lesson} done={progress.lessons.includes(lesson.slug)} />
                        ))}
                    </div>
                )}
            </div>
        </Layout>
    );
}

function FilterChip({ active, onClick, children, color }) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-pressed={active}
            className={`min-h-[40px] rounded-full border px-4 text-sm font-extrabold transition-colors ${
                active ? 'border-transparent bg-foreground text-background' : 'border-border bg-card hover:bg-muted'
            }`}
            style={active && color ? { background: color, color: '#fff' } : undefined}
        >
            {children}
        </button>
    );
}
