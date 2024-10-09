import { cn } from '@/lib/utils';
import React from 'react';
import { Container } from './container';
import Image from 'next/image';
import { Facebook, Instagram, Linkedin, MapPinIcon, Twitter } from "lucide-react"

interface Props{
    className?: string;
}

export const Footer: React.FC<Props> = ({ className }) => {
    return (
        <footer className={cn('bg-primary border-t border-border py-10', className)}>
            <Container className="flex flex-col items-center md:flex-row justify-between gap-6">
                
                {/* Footer Logo and Text */}
                <div className="flex flex-col items-start gap-3">
                    <Image src="/image.png" alt="Logo" width={200} height={200} />
                    <p className="text-lg font-bold text-foreground">ACROBAT INOVATIONS</p>
                </div>

                {/* Footer Navigation */}
                <nav className="flex justify-center w-full md:w-auto">
                    <ul className="flex flex-col md:flex-row items-center gap-5 md:gap-12">
                        <li><a href="/" className="text-foreground font-bold hover:text-muted">Ana Sayfa</a></li>
                        <li><a href="/about-us" className="text-foreground font-bold hover:text-muted">Hakkımızda</a></li>
                        <li><a href="/products" className="text-foreground font-bold hover:text-muted">Kataloğumuz</a></li>
                        <li><a href="/contact-us" className="text-foreground font-bold hover:text-muted">İletişim</a></li>
                    </ul>
                </nav>

                {/* Contact Information */}
                <div className="flex flex-col items-start md:items-end">
                    {/* <p className="text-sm text-muted flex items-center">
                   <MapPinIcon size={16} className="mr-1"/>
                    1234 Street Name, City, Country</p> */}
                    <p className="text-sm text-muted">Email: info@sivaspeyzaj.net</p>
                    <p className="text-sm text-muted">Phone: +90 539 929 51 00</p>
                    
                    {/* Social Media Links */}
                    <div className="flex gap-4 mt-4">
                        <a href="https://facebook.com" aria-label="Facebook">
                            <Facebook size={24} className="text-foreground hover:text-muted-foreground" />
                        </a>
                        <a href="https://twitter.com" aria-label="Twitter">
                            <Twitter size={24} className="text-foreground hover:text-muted-foreground" />
                        </a>
                        <a href="https://instagram.com" aria-label="Instagram">
                            <Instagram size={24} className="text-foreground hover:text-muted-foreground" />
                        </a>
                        <a href="https://linkedin.com" aria-label="LinkedIn">
                            <Linkedin size={24} className="text-foreground hover:text-muted-foreground" />
                        </a>
                    </div>
                </div>
            </Container>

            {/* Horizontal Line */}
            <hr className="border-t border-border my-4 w-full" />

            {/* Copyright */}
            <div className="text-center">
                <p className="text-sm text-muted">© {new Date().getFullYear()} Acrobat Innovation Technologies. All rights reserved.</p>
            </div>
        </footer>
    );
};