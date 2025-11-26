import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
    return (
        <header className="bg-white shadow">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <div className="text-2xl font-bold">
                    <Link href="/">The Hampstead Design Journal</Link>
                </div>
                <nav>
                    <ul className="flex space-x-4">
                        <li>
                            <Link href="/articles">Articles</Link>
                        </li>
                        <li>
                            <Link href="/categories/architecture">Architecture</Link>
                        </li>
                        <li>
                            <Link href="/categories/interiors">Interiors</Link>
                        </li>
                        <li>
                            <Link href="/categories/living">Living</Link>
                        </li>
                        <li>
                            <Link href="/about">About</Link>
                        </li>
                        <li>
                            <Link href="/contact">Contact</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;