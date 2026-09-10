import { toUserMetadata, getDisplayName, getCompanyName, getProjectSummary } from './userMetadata.js';

describe('toUserMetadata', () => {
    it('maps the profile to snake_case Supabase metadata', () => {
        const metadata = toUserMetadata({
            fullName: 'Jane Doe',
            companyName: 'Acme Inc.',
            websiteUrl: 'acme.com',
            companySize: '2-10',
            primaryNeed: 'new_product',
            planInterest: 'monthly_pro',
            projectSummary: 'Ship a billing portal.',
        });

        expect(metadata).toEqual({
            full_name: 'Jane Doe',
            company_name: 'Acme Inc.',
            website_url: 'acme.com',
            company_size: '2-10',
            primary_need: 'new_product',
            plan_interest: 'monthly_pro',
            project_summary: 'Ship a billing portal.',
        });
    });
});

describe('user metadata readers', () => {
    const userWithProfile = {
        email: 'jane@acme.com',
        user_metadata: { full_name: 'Jane Doe', company_name: 'Acme Inc.', project_summary: 'Ship a billing portal.' },
    };
    const userWithoutProfile = { email: 'jane@acme.com', user_metadata: {} };

    it('prefers the full name and falls back to the email', () => {
        expect(getDisplayName(userWithProfile)).toBe('Jane Doe');
        expect(getDisplayName(userWithoutProfile)).toBe('jane@acme.com');
    });

    it('returns null company and empty summary when absent', () => {
        expect(getCompanyName(userWithProfile)).toBe('Acme Inc.');
        expect(getCompanyName(userWithoutProfile)).toBeNull();
        expect(getProjectSummary(userWithProfile)).toBe('Ship a billing portal.');
        expect(getProjectSummary(userWithoutProfile)).toBe('');
    });
});
