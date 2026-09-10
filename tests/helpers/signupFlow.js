import { screen } from '@testing-library/react';

export const VALID_ACCOUNT = {
    email: 'jane@acme.com',
    password: 'hunter2secret',
};

export const VALID_COMPANY = {
    fullName: 'Jane Doe',
    companyName: 'Acme Inc.',
    websiteUrl: 'acme.com',
    companySize: '2-10',
    primaryNeed: 'new_product',
    planInterest: 'monthly_pro',
    projectSummary: 'Ship a billing portal.',
};

export async function completeAccountStep(user) {
    await user.type(screen.getByLabelText('Email'), VALID_ACCOUNT.email);
    await user.type(screen.getByLabelText('Password'), VALID_ACCOUNT.password);
    await user.type(screen.getByLabelText('Confirm password'), VALID_ACCOUNT.password);
    await user.click(screen.getByRole('button', { name: 'Continue' }));
}

export async function completeCompanyStep(user) {
    await user.type(screen.getByLabelText('Your name'), `  ${VALID_COMPANY.fullName}  `);
    await user.type(screen.getByLabelText('Company'), VALID_COMPANY.companyName);
    await user.type(screen.getByLabelText('Website'), VALID_COMPANY.websiteUrl);
    await user.selectOptions(screen.getByLabelText('Company size'), VALID_COMPANY.companySize);
    await user.selectOptions(screen.getByLabelText('Plan'), VALID_COMPANY.planInterest);
    await user.selectOptions(screen.getByLabelText('What do you need help with?'), VALID_COMPANY.primaryNeed);
    await user.type(screen.getByLabelText('First thing to ship'), VALID_COMPANY.projectSummary);
    await user.click(screen.getByRole('button', { name: 'Create Account' }));
}
