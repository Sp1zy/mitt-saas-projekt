import { isRequestEditable } from '../../data/requestStatus.js';
import { formatDate } from '../../data/formatDate.js';
import { StatusBadge } from './StatusBadge.jsx';
import { RequestForm } from './RequestForm.jsx';

const ROW_ACTION_CLASS_NAME = 'text-xs font-semibold transition-colors';

function RequestMeta({ request }) {
    const sprintLabel = request.sprintEndsOn ? `Sprint ends ${formatDate(request.sprintEndsOn)}` : 'Waiting for next sprint';
    const engineerLabel = request.assignedEngineer ?? 'Unassigned';
    return (
        <p className="text-xs text-slate-500 mt-1.5 flex flex-wrap gap-x-2">
            <span>Added {formatDate(request.createdAt)}</span>
            <span>·</span>
            <span>{engineerLabel}</span>
            <span>·</span>
            <span>{sprintLabel}</span>
        </p>
    );
}

function RowActions({ onEdit, onRemove }) {
    return (
        <span className="flex items-center gap-3">
            <button type="button" onClick={onEdit} className={`${ROW_ACTION_CLASS_NAME} text-violet-400 hover:text-violet-300`}>
                Edit
            </button>
            <button type="button" onClick={onRemove} className={`${ROW_ACTION_CLASS_NAME} text-slate-500 hover:text-red-400`}>
                Remove
            </button>
        </span>
    );
}

function RequestRow({ request, isEditing, onStartEdit, onCancelEdit, onSaveEdit, onRemove }) {
    if (isEditing) {
        return (
            <li className="py-4 border-b border-slate-800 last:border-b-0">
                <RequestForm
                    idPrefix={`edit-${request.id}`}
                    initialValues={{ title: request.title, details: request.details }}
                    submitLabel="Save Changes"
                    onSubmit={(changes) => onSaveEdit(request.id, changes)}
                    onCancel={onCancelEdit}
                />
            </li>
        );
    }

    return (
        <li className="flex flex-wrap items-center justify-between gap-3 py-4 border-b border-slate-800 last:border-b-0">
            <div className="min-w-0">
                <p className="font-semibold text-white truncate">{request.title}</p>
                {request.details && <p className="text-sm text-slate-400 mt-1 line-clamp-2">{request.details}</p>}
                <RequestMeta request={request} />
            </div>
            <div className="flex items-center gap-4">
                {isRequestEditable(request) && (
                    <RowActions onEdit={() => onStartEdit(request.id)} onRemove={() => onRemove(request)} />
                )}
                <StatusBadge status={request.status} />
            </div>
        </li>
    );
}

export function RequestList({ requests, emptyMessage, editingRequestId, onStartEdit, onCancelEdit, onSaveEdit, onRemove }) {
    if (requests.length === 0) {
        return (
            <p className="text-slate-500 text-sm py-10 text-center rounded-xl border border-dashed border-slate-800">
                {emptyMessage}
            </p>
        );
    }

    return (
        <ul>
            {requests.map((request) => (
                <RequestRow
                    key={request.id}
                    request={request}
                    isEditing={request.id === editingRequestId}
                    onStartEdit={onStartEdit}
                    onCancelEdit={onCancelEdit}
                    onSaveEdit={onSaveEdit}
                    onRemove={onRemove}
                />
            ))}
        </ul>
    );
}
