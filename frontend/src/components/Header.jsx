import { useState } from 'react'
import InnerLogo from './InnerLogo'
import ThemeToggle from './ThemeToggle'
import PWAInstallModal from './PWAInstallModal'
import { usePWAInstall } from '../hooks/usePWAInstall'

const Header = () => {
    const [showInstallModal, setShowInstallModal] = useState(false);
    const { isInstallable, isInstalled, install } = usePWAInstall();

    const handleInstallClick = async () => {
        const result = await install();
        if (result.outcome === 'not-available') {
            setShowInstallModal(true);
        }
    };

    return (
        <header className="fixed inset-x-0 top-0 px-5 lg:px-0 py-2.5 md:py-4 shadow-lg z-10 rounded-b-2xl theme-bg-secondary backdrop-blur-sm">
            <div className="flex items-center justify-between max-w-7xl mx-auto">

                <InnerLogo />

                <div className="flex items-center gap-3">
                    {/* PWA Install Button */}
                    {isInstallable && !isInstalled && (
                        <button
                            onClick={handleInstallClick}
                            className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg text-sm font-medium hover:from-purple-600 hover:to-blue-600 transition-all duration-200 shadow-sm"
                            title="Install SoundStream"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                <polyline points="7,10 12,15 17,10"/>
                                <line x1="12" y1="15" x2="12" y2="3"/>
                            </svg>
                            Install
                        </button>
                    )}

                    <ThemeToggle />
                </div>

            </div>

            {/* Install Modal */}
            <PWAInstallModal 
                isOpen={showInstallModal} 
                onClose={() => setShowInstallModal(false)} 
            />
        </header>
    )
}

export default Header