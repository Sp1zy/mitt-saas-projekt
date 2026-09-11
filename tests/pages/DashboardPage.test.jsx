import { render, screen, within, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router';
import { DashboardPage } from '../../src/pages/DashboardPage.jsx';
import { listRequests, createRequest, updateRequest, deleteRequest } from '../../src/data/requestsRepository.js';
import { makeRequest, installStatefulUpdateMock } from '../helpers/requests.js';

const mockAuth = vi.hoisted(() => ({
    user: {
        id: 'user-1',
        email: 'jane@acme.com',
        user_metadata: { full_name: 'Jane Doe', company_name: 'Acme Inc.', project_summary: 'Ship a billing portal.' },
    },
    signOut: vi.fn().mockResolvedValue(undefined),
}));

vi.mock('../../src/auth/AuthProvider.jsx', () => ({
    useAuth: () => mockAuth,
}));

vi.mock('../../src/data/requestsRepository.js', () => ({
    listRequests: vi.fn(),
    createRequest: vi.fn(),
    updateRequest: vi.fn(),
    deleteRequest: vi.fn(),
}));

function renderDashboard() {
    render(
        <MemoryRouter initialEntries={['/dashboard']}>
            <Routes>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/" element={<p>Landing page</p>} />
            </Routes>
        </MemoryRouter>,
    );
    return userEvent.setup();
}

async function renderLoadedDashboard(requests) {
    listRequests.mockResolvedValue(requests);
    const user = renderDashboard();
    await screen.findByRole('heading', { name: /^up next/i });
    return user;
}

function getLane(name) {
    return screen.getByRole('heading', { name: new RegExp(`^${name}`, 'i') }).closest('section');
}

function laneCards(name) {
    return [...getLane(name).querySelectorAll('article, li > button')];
}

function laneTitles(name) {
    return laneCards(name).map((card) => card.textContent);
}

function cardButtonNamed(title) {
    const startsWithTitle = (name) => new RegExp(`^\\d*\\s*${title}`).test(name.trim());
    return screen.getByRole('button', { name: startsWithTitle });
}

async function openCard(user, title) {
    await user.click(cardButtonNamed(title));
    return screen.getByRole('dialog', { name: title });
}

beforeEach(() => {
    vi.clearAllMocks();
});

describe('DashboardPage shell', () => {
    it('shows a spinner while loading, then the company, plan line and lanes with counts', async () => {
        listRequests.mockResolvedValue([
            makeRequest({ status: 'queued' }),
            makeRequest({ status: 'in_progress' }),
            makeRequest({ status: 'in_review' }),
            makeRequest({ status: 'done' }),
            makeRequest({ status: 'done' }),
        ]);
        renderDashboard();
        expect(screen.getByRole('status', { name: 'Loading requests' })).toBeInTheDocument();

        await screen.findByRole('heading', { name: /^up next/i });
        expect(screen.getByRole('heading', { name: 'Hi Jane, here are your requests.' })).toBeInTheDocument();
        expect(screen.getByLabelText('Plan')).toHaveTextContent('Monthly Standard');
        expect(screen.getByRole('heading', { name: /^being built/i })).toHaveTextContent('1');
        expect(screen.getByRole('heading', { name: /^ready for review/i })).toHaveTextContent('1');
        expect(screen.getByRole('heading', { name: /^up next/i })).toHaveTextContent('1');
        expect(screen.getByRole('heading', { name: /^done/i })).toHaveTextContent('2');
    });

    it('shows the load error banner', async () => {
        listRequests.mockRejectedValue(new Error('relation "public.requests" does not exist'));
        renderDashboard();
        expect(await screen.findByRole('alert')).toHaveTextContent('relation "public.requests" does not exist');
    });

    it('signs out from the account menu and returns to the landing page', async () => {
        const user = await renderLoadedDashboard([]);
        await user.click(screen.getByText('Jane Doe'));
        await user.click(screen.getByRole('button', { name: 'Log out' }));
        expect(mockAuth.signOut).toHaveBeenCalled();
        expect(await screen.findByText('Landing page')).toBeInTheDocument();
    });
});

describe('DashboardPage board', () => {
    it('places requests in the right lanes with queued items in pull order', async () => {
        await renderLoadedDashboard([
            makeRequest({ title: 'Third queued', position: 2 }),
            makeRequest({ title: 'Building one', status: 'in_progress', assignedEngineer: 'Zainab J.', sprintEndsOn: '2026-09-12' }),
            makeRequest({ title: 'First queued', position: 0 }),
            makeRequest({ title: 'Shipped one', status: 'done' }),
        ]);

        expect(laneTitles('being built')).toEqual([expect.stringContaining('Building one')]);
        expect(laneTitles('up next')).toEqual([expect.stringContaining('First queued'), expect.stringContaining('Third queued')]);
        expect(laneTitles('done')).toEqual([expect.stringContaining('Shipped one')]);
        expect(laneTitles('ready for review')).toEqual([]);

        const nowLane = getLane('being built');
        expect(within(nowLane).getByText('Built by Zainab J. · due Sep 12, 2026')).toBeInTheDocument();
        expect(within(nowLane).getByLabelText('Status: Being built')).toBeInTheDocument();
        expect(within(getLane('up next')).getAllByRole('button')).toHaveLength(3);
    });

    it('shows one first-request action on an empty board', async () => {
        await renderLoadedDashboard([]);
        expect(screen.getByRole('button', { name: '+ Add your first request' })).toBeInTheDocument();
        expect(screen.getByText(/nothing being built yet/i)).toBeInTheDocument();
        expect(screen.getByText('Finished work ends up here.')).toBeInTheDocument();
    });

    it('reorders by dragging a card onto another', async () => {
        const first = makeRequest({ title: 'First queued', position: 0 });
        const second = makeRequest({ title: 'Second queued', position: 1 });
        const third = makeRequest({ title: 'Third queued', position: 2 });
        installStatefulUpdateMock(updateRequest, [first, second, third]);
        await renderLoadedDashboard([first, second, third]);

        const firstItem = cardButtonNamed('First queued').closest('li');
        const thirdItem = cardButtonNamed('Third queued').closest('li');
        fireEvent.dragStart(firstItem);
        fireEvent.dragOver(thirdItem, { clientY: 0 });
        fireEvent.drop(thirdItem);

        await screen.findByRole('button', { name: (name) => /^1\s*Second queued/.test(name.trim()) });
        expect(laneTitles('up next')).toEqual([
            expect.stringContaining('Second queued'),
            expect.stringContaining('Third queued'),
            expect.stringContaining('First queued'),
        ]);
    });

});

describe('DashboardPage request modal', () => {
    it('opens a card into a modal with details, facts and actions', async () => {
        const user = await renderLoadedDashboard([
            makeRequest({ title: 'Queued one', details: 'Some details', createdAt: '2026-09-03T10:00:00.000Z' }),
        ]);

        const modal = await openCard(user, 'Queued one');
        expect(within(modal).getByText('Some details')).toBeInTheDocument();
        expect(within(modal).getByText('Sep 3, 2026')).toBeInTheDocument();
        expect(within(modal).getByLabelText('Status: Up next')).toBeInTheDocument();
        expect(within(modal).getByRole('button', { name: 'Edit' })).toBeInTheDocument();
        expect(within(modal).getByRole('button', { name: 'Mark as urgent' })).toBeInTheDocument();
        expect(within(modal).getByRole('button', { name: 'Remove' })).toBeInTheDocument();

        await user.keyboard('{Escape}');
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('is read-only for requests already in a sprint', async () => {
        const user = await renderLoadedDashboard([makeRequest({ title: 'Building one', status: 'in_progress' })]);
        const modal = await openCard(user, 'Building one');
        expect(within(modal).getByText(/already started on this one/i)).toBeInTheDocument();
        expect(within(modal).queryByRole('button', { name: 'Edit' })).not.toBeInTheDocument();
    });

    it('edits a queued request in the modal and saves the change', async () => {
        const queued = makeRequest({ title: 'Old title', details: 'Old details' });
        installStatefulUpdateMock(updateRequest, [queued]);
        const user = await renderLoadedDashboard([queued]);

        const modal = await openCard(user, 'Old title');
        await user.click(within(modal).getByRole('button', { name: 'Edit' }));
        const titleInput = within(modal).getByDisplayValue('Old title');
        await user.clear(titleInput);
        await user.type(titleInput, 'New title');
        await user.click(within(modal).getByRole('button', { name: 'Save changes' }));

        expect(updateRequest).toHaveBeenCalledWith(queued.id, { title: 'New title', details: 'Old details' });
        expect(await screen.findByRole('dialog', { name: 'New title' })).toBeInTheDocument();
        expect(within(screen.getByRole('dialog')).queryByRole('button', { name: 'Save changes' })).not.toBeInTheDocument();
        expect(laneTitles('up next')).toEqual([expect.stringContaining('New title')]);
    });

    it('moves a request to the top from the modal', async () => {
        const first = makeRequest({ title: 'First queued', position: 0 });
        const second = makeRequest({ title: 'Second queued', position: 1 });
        installStatefulUpdateMock(updateRequest, [first, second]);
        const user = await renderLoadedDashboard([first, second]);

        const topModal = await openCard(user, 'First queued');
        expect(within(topModal).queryByRole('button', { name: 'Move to top' })).not.toBeInTheDocument();
        await user.keyboard('{Escape}');

        const modal = await openCard(user, 'Second queued');
        await user.click(within(modal).getByRole('button', { name: 'Move to top' }));

        expect(updateRequest).toHaveBeenCalledWith(second.id, { position: 0 });
        expect(updateRequest).toHaveBeenCalledWith(first.id, { position: 1 });
        expect(laneTitles('up next')).toEqual([expect.stringContaining('Second queued'), expect.stringContaining('First queued')]);
        expect(within(screen.getByRole('dialog')).queryByRole('button', { name: 'Move to top' })).not.toBeInTheDocument();
    });

    it('marks a request urgent from the modal and moves it to the top', async () => {
        const first = makeRequest({ title: 'First queued', position: 0 });
        const second = makeRequest({ title: 'Second queued', position: 1 });
        installStatefulUpdateMock(updateRequest, [first, second]);
        const user = await renderLoadedDashboard([first, second]);

        const modal = await openCard(user, 'Second queued');
        await user.click(within(modal).getByRole('button', { name: 'Mark as urgent' }));

        expect(updateRequest).toHaveBeenCalledWith(second.id, { isUrgent: true });
        expect(await within(modal).findByRole('button', { name: 'Not urgent' })).toBeInTheDocument();
        expect(laneTitles('up next')).toEqual([expect.stringContaining('Second queued'), expect.stringContaining('First queued')]);
        expect(within(getLane('up next')).getByText('Urgent')).toBeInTheDocument();
    });

    it('removes from the modal after confirmation and keeps it when declined', async () => {
        const queued = makeRequest({ title: 'Withdraw me' });
        deleteRequest.mockResolvedValue(undefined);
        const confirmSpy = vi.spyOn(window, 'confirm');
        const user = await renderLoadedDashboard([queued]);
        const modal = await openCard(user, 'Withdraw me');

        confirmSpy.mockReturnValueOnce(false);
        await user.click(within(modal).getByRole('button', { name: 'Remove' }));
        expect(deleteRequest).not.toHaveBeenCalled();
        expect(screen.getByRole('dialog')).toBeInTheDocument();

        confirmSpy.mockReturnValueOnce(true);
        await user.click(within(modal).getByRole('button', { name: 'Remove' }));
        expect(deleteRequest).toHaveBeenCalledWith(queued.id);
        expect(await screen.findByRole('button', { name: '+ Add your first request' })).toBeInTheDocument();
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        confirmSpy.mockRestore();
    });
});

describe('DashboardPage new request panel', () => {
    it('opens from the header, prefills the first request, adds it, and closes', async () => {
        const created = makeRequest({ title: 'Billing portal', details: 'Ship a billing portal.', position: 0 });
        createRequest.mockResolvedValue(created);
        const user = await renderLoadedDashboard([]);

        await user.click(screen.getByRole('button', { name: 'New request' }));
        const panel = screen.getByRole('dialog', { name: 'Your first request' });
        expect(within(panel).getByLabelText('Details')).toHaveValue('Ship a billing portal.');

        await user.type(within(panel).getByLabelText('Request'), 'Billing portal');
        await user.click(within(panel).getByRole('button', { name: 'Add to queue' }));

        expect(createRequest).toHaveBeenCalledWith({ userId: 'user-1', title: 'Billing portal', details: 'Ship a billing portal.', position: 0 });
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        expect(laneTitles('up next')).toEqual([expect.stringContaining('Billing portal')]);
    });

    it('opens from the lane button and closes on Escape', async () => {
        const user = await renderLoadedDashboard([makeRequest()]);
        await user.click(screen.getByRole('button', { name: '+ Add a request' }));
        expect(screen.getByRole('dialog', { name: 'New request' })).toBeInTheDocument();
        await user.keyboard('{Escape}');
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('rejects an empty title and shows a repository error inside the panel', async () => {
        createRequest.mockRejectedValue(new Error('new row violates row-level security policy'));
        const user = await renderLoadedDashboard([makeRequest({ title: 'Still here' })]);

        await user.click(screen.getByRole('button', { name: 'New request' }));
        const panel = screen.getByRole('dialog');
        await user.click(within(panel).getByRole('button', { name: 'Add to queue' }));
        expect(within(panel).getByText('Request title is required.')).toBeInTheDocument();
        expect(createRequest).not.toHaveBeenCalled();

        await user.type(within(panel).getByLabelText('Request'), 'Blocked');
        await user.click(within(panel).getByRole('button', { name: 'Add to queue' }));
        expect(await within(panel).findByRole('alert')).toHaveTextContent('row-level security');
        expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
});
