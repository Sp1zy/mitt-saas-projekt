import { Modal } from '../Modal.jsx';
import { RequestForm } from './RequestForm.jsx';
import { FormErrorBanner } from '../FormErrorBanner.jsx';

export function NewRequestModal({ isOpen, title, initialValues, errorMessage, onSubmit, onClose }) {
    return (
        <Modal isOpen={isOpen} titleId="new-request-modal-title" onClose={onClose}>
            <p className="text-xs font-semibold uppercase tracking-widest text-violet-400">Up next</p>
            <h2 id="new-request-modal-title" className="text-2xl font-black tracking-tight text-white mt-2 pr-10">{title}</h2>
            <p className="text-sm text-slate-400 mt-2 mb-8">
                Tell us what you need. It goes to the bottom of Up next, and you can drag it higher any time.
            </p>
            <div className="mb-5">
                <FormErrorBanner message={errorMessage} />
            </div>
            <RequestForm idPrefix="new-request" initialValues={initialValues} submitLabel="Add to queue" onSubmit={onSubmit} onCancel={onClose} />
        </Modal>
    );
}
