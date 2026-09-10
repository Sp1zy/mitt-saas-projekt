import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../auth/AuthProvider.jsx';
import { getDisplayName, getProjectSummary } from '../auth/userMetadata.js';
import { STRIPE_PORTAL_URL } from '../constants.js';
import { useRequests } from '../data/useRequests.js';
import { isRequestEditable } from '../data/requestStatus.js';
import { sortByPosition } from '../data/queueOrdering.js';
import { SAMPLE_SUBSCRIPTION } from '../data/sampleSubscription.js';
import { SiteHeader } from '../components/SiteHeader.jsx';
import { FormErrorBanner } from '../components/FormErrorBanner.jsx';
import { Spinner } from '../components/Spinner.jsx';
import { PRIMARY_BUTTON_CLASS_NAME } from '../components/formStyles.js';
import { AccountMenu } from '../components/dashboard/AccountMenu.jsx';
import { PlanLine } from '../components/dashboard/PlanLine.jsx';
import { Board } from '../components/dashboard/Board.jsx';
import { NewRequestModal } from '../components/dashboard/NewRequestModal.jsx';
import { RequestModal } from '../components/dashboard/RequestModal.jsx';

const PANEL = {
    NEW_REQUEST: 'new-request',
    REQUEST: 'request',
};

function PlusIcon() {
    return (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
            <path d="M12 5v14M5 12h14" />
        </svg>
    );
}

function LoadingBoard() {
    return (
        <div className="flex items-center justify-center gap-3 py-24 text-slate-500 text-sm">
            <span className="text-violet-500">
                <Spinner label="Loading requests" />
            </span>
            Loading your requests...
        </div>
    );
}

export function DashboardPage() {
    const { user, signOut } = useAuth();
    const navigate = useNavigate();
    const [subscription, setSubscription] = useState(SAMPLE_SUBSCRIPTION);
    const [activePanel, setActivePanel] = useState(null);
    const { requests, isLoading, errorMessage, addRequest, editRequest, removeRequest, reorderRequest, setUrgent } =
        useRequests(user.id);

    const isFirstRequest = !isLoading && requests.length === 0;
    const firstName = getDisplayName(user).split(' ')[0];
    const openRequest = activePanel?.kind === PANEL.REQUEST ? requests.find((request) => request.id === activePanel.requestId) : null;
    const isPanelOpen = activePanel !== null;
    const topQueuedRequest = sortByPosition(requests.filter(isRequestEditable))[0] ?? null;

    const closePanel = useCallback(() => setActivePanel(null), []);
    const openNewRequest = () => setActivePanel({ kind: PANEL.NEW_REQUEST });
    const openRequestModal = (requestId) => setActivePanel({ kind: PANEL.REQUEST, requestId });

    const handleLogout = async () => {
        await signOut();
        navigate('/', { replace: true });
    };

    const togglePause = () => {
        setSubscription({ ...subscription, isPaused: !subscription.isPaused });
    };

    const submitNewRequest = async (values) => {
        const isSaved = await addRequest(values);
        if (isSaved) closePanel();
        return isSaved;
    };

    const confirmRemove = async (request) => {
        const isConfirmed = window.confirm(`Remove "${request.title}"? This cannot be undone.`);
        if (!isConfirmed) return;
        const isRemoved = await removeRequest(request.id);
        if (isRemoved && openRequest?.id === request.id) closePanel();
    };

    const moveToTop = (requestId) => reorderRequest(requestId, 0);

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-violet-500 selection:text-white">
            <SiteHeader>
                <button type="button" onClick={openNewRequest} className={`${PRIMARY_BUTTON_CLASS_NAME} inline-flex items-center gap-2 px-4 py-2.5 shadow-lg shadow-indigo-600/20`}>
                    <PlusIcon />
                    New request
                </button>
                <AccountMenu user={user} onSignOut={handleLogout} />
            </SiteHeader>

            <main className="max-w-7xl mx-auto px-6 pt-10 pb-24 flex flex-col gap-8">
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-black tracking-tight text-white">Hi {firstName}, here are your requests.</h1>
                        <p className="text-slate-400 mt-2 max-w-2xl">
                            Add what you need to <span className="text-white font-semibold">Up next</span>. We build one request at a time, starting from the top. Drag cards to change the order.
                        </p>
                    </div>
                    <PlanLine subscription={subscription} portalUrl={STRIPE_PORTAL_URL} onTogglePause={togglePause} />
                </div>

                {!isPanelOpen && <FormErrorBanner message={errorMessage} />}

                {isLoading ? (
                    <LoadingBoard />
                ) : (
                    <Board
                        requests={requests}
                        onOpenRequest={openRequestModal}
                        onReorder={reorderRequest}
                        onOpenNewRequest={openNewRequest}
                    />
                )}
            </main>

            <NewRequestModal
                isOpen={activePanel?.kind === PANEL.NEW_REQUEST}
                title={isFirstRequest ? 'Your first request' : 'New request'}
                initialValues={{ title: '', details: isFirstRequest ? getProjectSummary(user) : '' }}
                errorMessage={errorMessage}
                onSubmit={submitNewRequest}
                onClose={closePanel}
            />
            {openRequest && (
                <RequestModal
                    key={openRequest.id}
                    request={openRequest}
                    isAtTop={topQueuedRequest?.id === openRequest.id}
                    errorMessage={errorMessage}
                    onSaveEdit={editRequest}
                    onToggleUrgent={setUrgent}
                    onMoveToTop={moveToTop}
                    onRemove={confirmRemove}
                    onClose={closePanel}
                />
            )}
        </div>
    );
}
