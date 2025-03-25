import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Container } from '../componentIndex';
import { Button } from '@/components/ui/button';
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from '@/components/ui/navigation-menu';

function Header() {
    const navigate = useNavigate();
    const navItems = [
        { name: "Sorting Algorithms", path: "/sorting" },
        { name: "About", path: "/about" },
    ]
    return (
        <header className='py-3 shadow bg-white sticky top-0 z-30'>
            <Container>
                <nav className='flex'>
                    <div className='mr-4'>
                        LOGO
                    </div>
                    <NavigationMenu className={"flex mx-auto"}>
                        <NavigationMenuList>
                            {navItems.map((item) => (
                                <NavigationMenuItem>
                                    <Button asChild>
                                        <Link to={item.path}>{item.name}</Link>
                                    </Button>
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>
                </nav>
            </Container>
        </header>
    )
}

export default Header
