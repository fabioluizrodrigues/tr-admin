import { Truck } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
    return (
        <div className="navbar bg-neutral-200">
            <div className="container">
                <div className="flex-1">
                    <Link href='/'><Truck color='blue' /></Link>
                </div>
                <div className="flex-none">
                    <Link href='/pessoa' className='btn btn-ghost'>Pessoas</Link>
                    <Link href='/veiculo' className='btn btn-ghost'>Veículos</Link>
                    <Link href='/conta' className='btn btn-ghost'>Contas</Link>
                </div>
            </div>
        </div>
    )
}

export default Navbar