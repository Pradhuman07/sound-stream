import InnerLogo from './InnerLogo'
import ThemeToggle from './ThemeToggle'

const Header = () => {
    return (
        <header className="fixed inset-x-0 top-0 px-5 lg:px-0 py-2.5 md:py-4 shadow-lg z-10 rounded-b-2xl theme-bg-tertiary backdrop-blur-sm">
            <div className="flex items-center justify-between max-w-7xl mx-auto">

                <InnerLogo />

                <ThemeToggle />

            </div>

        </header>
    )
}

export default Header