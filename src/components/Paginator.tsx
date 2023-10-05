'use client'

import { FC } from 'react';

const MAX_ITEMS = 9;
const MAX_LEFT = (MAX_ITEMS - 1) / 2;

interface PaginatorProps {
    limit: number;
    total: number;
    offset: number;
    setOffSet: (value: number) => void;
}

const Paginator: FC<PaginatorProps> = ({ limit, total, offset, setOffSet }) => {

    const current = offset ? (offset / limit) + 1 : 1;
    const pages = Math.ceil(total / limit);
    const maxFirst = Math.max(pages - (MAX_ITEMS - 1), 1);
    const first = Math.min(
        Math.max(current - MAX_LEFT, 1),
        maxFirst
    );

    function onPageChange(page: number) {
        setOffSet((page - 1) * limit);
    }

    return (
        <ul className='flex flex-row gap-2 py-4'>
            <li>
                <button
                    className='btn btn-outline btn-xs'
                    onClick={() => onPageChange(current - 1)}
                    disabled={current === 1}
                >
                    Anterior
                </button>
            </li>
            {Array.from({ length: Math.min(MAX_ITEMS, pages) })
                .map((_, index) => index + first)
                .map((page) => (
                    <li key={page}>
                        <button
                            onClick={() => onPageChange(page)}
                            className={
                                page === current
                                    ? 'btn btn-xs bg-slate-500 text-white hover:none'
                                    : 'btn btn-outline btn-xs'
                            }
                            disabled={current === page}
                        >
                            {page}
                        </button>
                    </li>
                ))}
            <li>
                <button
                    className='btn btn-outline btn-xs'
                    onClick={() => onPageChange(current + 1)}
                    disabled={current === pages}
                >
                    Próximo
                </button>
            </li>
        </ul>
    )
}

export default Paginator