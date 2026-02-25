import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Workshop {
    title: string;
    date?: string;
    description: string;
    audience: string;
    location?: string;
}
export interface CommunityResource {
    name: string;
    website?: string;
    resourceType: string;
    address: string;
    phone: string;
}
export interface InsuranceTerm {
    term: string;
    definition: string;
}
export interface AssistanceProgram {
    contactInfo: string;
    name: string;
    description: string;
    eligibility: string;
}
export interface HealthcareService {
    contactInfo?: string;
    name: string;
    description: string;
    category: string;
}
export interface backendInterface {
    getAssistancePrograms(): Promise<Array<AssistanceProgram>>;
    getCommunityResources(): Promise<Array<CommunityResource>>;
    getHealthcareServices(): Promise<Array<HealthcareService>>;
    getInsuranceTerms(): Promise<Array<InsuranceTerm>>;
    getResourcesByType(resourceType: string): Promise<Array<CommunityResource>>;
    getWorkshops(): Promise<Array<Workshop>>;
    initializeData(): Promise<void>;
    searchInsuranceTerm(term: string): Promise<InsuranceTerm>;
}
