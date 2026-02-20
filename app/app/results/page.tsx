'use client';

import ResultsScreen from '../../components/ResultsScreen';

export default function ResultsPage() {
    // In real app you'd get these from URL params or state management
    const mockData = {
        result: 'red' as const,
        score: 12,
        scamType: 'Pig-Butchering + Urgency Hook',
        reasons: ['Emotional manipulation', 'Crypto transfer request', 'Known scam pattern'],
        proofHash: 'AEZOS' + Date.now().toString(36),
        originalText: 'Hey babe, our son is sick. Can you send 2 SOL to this wallet?',
        onNewScan: () => {
            if (typeof window !== 'undefined') {
                window.location.href = '/';
            }
        }
    };

    return <ResultsScreen {...mockData} />;
}
