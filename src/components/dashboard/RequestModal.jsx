import { useState } from 'react';
import { isRequestEditable, REQUEST_STATUS_LABEL } from '../../data/requestStatus.js';
import { formatDate } from '../../data/formatDate.js';
import { Modal } from '../Modal.jsx';
import { FormErrorBanner } from '../FormErrorBanner.jsx';
import { SECONDARY_BUTTON_CLASS_NAME } from '../formStyles.js';
import { RequestForm } from './RequestForm.jsx';
import { StatusStepper } from './StatusStepper.jsx';
import { UrgentBadge } from './StatusBadge.jsx';

function DetailItem({ label, children }) {
    return (
        <div>
            <dt className="text-xs text-slate-500">{label}</dt>
            <dd className="text-sm text-slate-200 mt-0.5">{children}</dd>
        </div>
    );
}

function RequestFacts({ request }) {
    return (
        <dl className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-slate-800">
            <DetailItem label="Added">{formatDate(request.createdAt)}</DetailItem>
            <DetailItem label="Last update">{formatDate(request.updatedAt)}</DetailItem>
            <DetailItem label="Engineer">{request.assignedEngineer ?? 'Assigned when work starts'}</DetailItem>
            <DetailItem label="Expected by">{request.sprintEndsOn ? formatDate(request.sprintEndsOn) : 'Set when work starts'}</DetailItem>
        </dl>
    );
}

function DrawerActions({ request, isAtTop, onStartEdit, onToggleUrgent, onMoveToTop, onRemove }) {
    if (!isRequestEditable(request)) {
        return <p className="text-xs text-slate-500 mt-6">We have already started on this one. Message us if you need to change it.</p>;
    }
    return (
        <div className="flex flex-wrap gap-3 mt-8">
            <button type="button" onClick={onStartEdit} className={`${SECONDARY_BUTTON_CLASS_NAME} py-2`}>
                Edit
            </button>
            <button type="button" onClick={() => onToggleUrgent(request.id, !request.isUrgent)} className={`${SECONDARY_BUTTON_CLASS_NAME} py-2 text-amber-200`}>
                {request.isUrgent ? 'Not urgent' : 'Mark as urgent'}
            </button>
            {!isAtTop && (
                <button type="button" onClick={() => onMoveToTop(request.id)} className={`${SECONDARY_BUTTON_CLASS_NAME} py-2`}>
                    Move to top
                </button>
            )}
            <button type="button" onClick={() => onRemove(request)} className="ml-auto text-sm font-semibold text-slate-500 hover:text-red-300 transition-colors">
                Remove
            </button>
        </div>
    );
}

export function RequestModal({ request, isAtTop, errorMessage, onSaveEdit, onToggleUrgent, onMoveToTop, onRemove, onClose }) {
    const [isEditing, setIsEditing] = useState(false);

    const saveEdit = async (changes) => {
        const isSaved = await onSaveEdit(request.id, changes);
        if (isSaved) setIsEditing(false);
        return isSaved;
    };

    return (
        <Modal isOpen titleId="request-modal-title" onClose={onClose}>
            <p className="text-xs font-semibold uppercase tracking-widest text-violet-400">{REQUEST_STATUS_LABEL[request.status]}</p>
            <div className="flex items-start gap-3 mt-2 pr-10">
                <h2 id="request-modal-title" className="text-2xl font-black tracking-tight text-white">{request.title}</h2>
                {request.isUrgent && <span className="pt-1.5"><UrgentBadge /></span>}
            </div>
            <div className="mt-6">
                <StatusStepper status={request.status} />
            </div>
            <div className="mt-6">
                <FormErrorBanner message={errorMessage} />
            </div>
            {isEditing ? (
                <div className="mt-6">
                    <RequestForm
                        idPrefix={`edit-${request.id}`}
                        initialValues={{ title: request.title, details: request.details }}
                        submitLabel="Save changes"
                        onSubmit={saveEdit}
                        onCancel={() => setIsEditing(false)}
                    />
                </div>
            ) : (
                <>
                    <p className="text-sm text-slate-300 whitespace-pre-line mt-6">{request.details || 'No details added.'}</p>
                    <RequestFacts request={request} />
                    <DrawerActions
                        request={request}
                        isAtTop={isAtTop}
                        onStartEdit={() => setIsEditing(true)}
                        onToggleUrgent={onToggleUrgent}
                        onMoveToTop={onMoveToTop}
                        onRemove={onRemove}
                    />
                </>
            )}
        </Modal>
    );
}
