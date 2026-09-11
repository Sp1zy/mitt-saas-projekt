export function toUserMetadata(profile) {
    return {
        full_name: profile.fullName,
        company_name: profile.companyName,
        website_url: profile.websiteUrl,
        company_size: profile.companySize,
        primary_need: profile.primaryNeed,
        plan_interest: profile.planInterest,
        project_summary: profile.projectSummary,
    };
}

export function getDisplayName(user) {
    return user.user_metadata?.full_name || user.email;
}

export function getCompanyName(user) {
    return user.user_metadata?.company_name || null;
}

export function getProjectSummary(user) {
    return user.user_metadata?.project_summary || '';
}
