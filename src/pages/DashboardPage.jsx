import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../auth/AuthProvider.jsx';
import { getDisplayName, getCompanyName, getProjectSummary } from '../auth/userMetadata.js';
import { STRIPE_PORTAL_URL } from '../constants.js';
import { REQUEST_STATUS } from '../data/requestStatus.js';
import { useRequests } from '../data/useRequests.js';
import { toActivityEntries } from '../data/requestActivity.js';
import { SAMPLE_SUBSCRIPTION } from '../data/sampleSubscription.js';
import { SiteHeader } from '../components/SiteHeader.jsx';
import { FormErrorBanner } from '../components/FormErrorBanner.jsx';
import { Spinner } from '../components/Spinner.jsx';
import { PRIMARY_BUTTON_CLASS_NAME, SECONDARY_BUTTON_CLASS_NAME } from '../components/formStyles.js';
import { PlanSummaryCard } from '../components/dashboard/PlanSummaryCard.jsx';
import { RequestStats } from '../components/dashboard/RequestStats.jsx';
import { RequestList } from '../components/dashboard/RequestList.jsx';
import { RequestForm } from '../components/dashboard/RequestForm.jsx';
import { ActivityFeed } from '../components/dashboard/ActivityFeed.jsx';

function SectionCard({ title, children }) {
    return (
        <section className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-violet-400 mb-5">{title}</h2>
            {children}
        </section>
    );
}

function LoadingRequests() {
    return (
        <div className="flex items-center justify-center gap-3 py-10 text-slate-500 text-sm">
            <span className="text-violet-500">
                <Spinner label="Loading requests" />
            </span>
            Loading your requests...
        </div>
    );
}

function DashboardHeading({ user }) {
    const companyName = getCompanyName(user);
    return (
        <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-400 text-xs font-semibold mb-6">
                <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse"></span>
                {companyName ?? 'Client Dashboard'}
            </div>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white leading-[1.15]">
                Your sprint{' '}
                <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">
                    desk.
                </span>
            </h1>
            <p className="text-slate-400 text-lg mt-3">Signed in as {getDisplayName(user)}</p>
        </div>
    );
}

export function DashboardPage() {
    const { user, signOut } = useAuth();
    const navigate = useNavigate();
    const [subscription, setSubscription] = useState(SAMPLE_SUBSCRIPTION);
    const [editingRequestId, setEditingRequestId] = useState(null);
    const { requests, isLoading, errorMessage, addRequest, editRequest, removeRequest } = useRequests(user.id);

    const activeRequests = requests.filter((request) => request.status !== REQUEST_STATUS.DONE);
    const deliveredRequests = requests.filter((request) => request.status === REQUEST_STATUS.DONE);
    const activityEntries = toActivityEntries(requests);
    const isFirstRequest = !isLoading && requests.length === 0;
    const newRequestInitialValues = { title: '', details: isFirstRequest ? getProjectSummary(user) : '' };

    const handleLogout = async () => {
        await signOut();
        navigate('/', { replace: true });
    };

    const togglePause = () => {
        setSubscription({ ...subscription, isPaused: !subscription.isPaused });
    };

    const saveEdit = async (requestId, changes) => {
        const isSaved = await editRequest(requestId, changes);
        if (isSaved) setEditingRequestId(null);
        return isSaved;
    };

    const confirmRemove = (request) => {
        const isConfirmed = window.confirm(`Remove "${request.title}" from the queue?`);
        if (isConfirmed) removeRequest(request.id);
    };

    const listHandlers = {
        editingRequestId,
        onStartEdit: setEditingRequestId,
        onCancelEdit: () => setEditingRequestId(null),
        onSaveEdit: saveEdit,
        onRemove: confirmRemove,
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-violet-500 selection:text-white">
            <SiteHeader>
                <a href={STRIPE_PORTAL_URL} target="_blank" rel="noreferrer" className={`${SECONDARY_BUTTON_CLASS_NAME} hidden sm:inline-block`}>
                    Stripe Billing
                </a>
                <button onClick={handleLogout} className={`${PRIMARY_BUTTON_CLASS_NAME} px-5 py-2.5 shadow-lg shadow-indigo-600/20`}>
                    Log Out
                </button>
            </SiteHeader>

            <main className="max-w-7xl mx-auto px-6 pt-16 pb-24">
                <DashboardHeading user={user} />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 flex flex-col gap-6">
                        <RequestStats requests={requests} />
                        <FormErrorBanner message={errorMessage} />

                        <SectionCard title="Active Requests">
                            {isLoading ? (
                                <LoadingRequests />
                            ) : (
                                <RequestList
                                    requests={activeRequests}
                                    emptyMessage="Nothing in the queue yet. Submit your first request below."
                                    {...listHandlers}
                                />
                            )}
                        </SectionCard>

                        <SectionCard title={isFirstRequest ? 'Your First Request' : 'New Request'}>
                            {!isLoading && (
                                <RequestForm
                                    idPrefix="new-request"
                                    initialValues={newRequestInitialValues}
                                    submitLabel="Add to Queue"
                                    onSubmit={addRequest}
                                />
                            )}
                        </SectionCard>

                        {deliveredRequests.length > 0 && (
                            <SectionCard title="Delivered">
                                <RequestList requests={deliveredRequests} {...listHandlers} />
                            </SectionCard>
                        )}
                    </div>

                    <div className="flex flex-col gap-6">
                        <PlanSummaryCard subscription={subscription} portalUrl={STRIPE_PORTAL_URL} onTogglePause={togglePause} />
                        <SectionCard title="Recent Activity">
                            {activityEntries.length > 0 ? (
                                <ActivityFeed activityEntries={activityEntries} />
                            ) : (
                                <p className="text-sm text-slate-500">Activity shows up here once you add a request.</p>
                            )}
                        </SectionCard>
                    </div>
                </div>
            </main>
        </div>
    );
}
