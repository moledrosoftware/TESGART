'use client';

import {cn} from '@/lib/utils';
import { Container } from './container';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { ArrowRight, ArrowRightCircle, ShoppingCart, User2Icon } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface Props{
    className?: string;
}


export const Header: React.FC<Props> = ({ className }) => {
    const [header, setHeader] = useState(false);
    const pathName = usePathname();
  
    useEffect(() => {
      const handleScroll = () => {
        window.scrollY > 50 ? setHeader(true) : setHeader(false);
      };
  
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
    return (
        <header className={cn('fixed top-0 left-0 right-0 h-32 z-50 bg-white shadow-md border-b ', className)}>
            {/* border bottom and shadow for slight elevation effect */}
            <Container className="flex items-center justify-between py-8">
                {/* centering div and pressing to the edges (prijimat k krayam) padding by y=8 (4*8=32px) */}

                {/* The left side */}
                <div className="flex items-center gap-4">
                    <div className="flex flex-col items-center"> {/* Container for logo and text */}
                        <Image src="/logo.png" alt="Logo" width={150} height={150} />
                        <div className="text-center mt-2"> {/* Text below the logo */}
                            <h1 className="text-lg font-bold text-foreground">ACROBAT INNOVATIONS</h1>
                        </div>
                    </div>
                </div>

                <nav>
                    <ul className="flex gap-10 px-8">
                        <li>
                            <a href="/" className="text-lg font-medium hover:text-blue-500">Ana Sayfa</a>
                        </li>
                        <li>
                            <a href="/about-us" className="text-lg font-medium hover:text-primary" id="about-section">Hakkımızda</a>
                        </li>
                        <li>
                            <a href="/products" className="text-lg font-medium hover:text-primary">Kataloğumuz</a>
                        </li>
                        <li>
                            <a href="/contact-us" className="text-lg font-medium hover:text-primary">İletişim</a>
                        </li>
                    </ul>
                </nav>

              

            </Container>
        </header>
    );
};
//cn — это функция, которая объединяет имена классов.
 


 