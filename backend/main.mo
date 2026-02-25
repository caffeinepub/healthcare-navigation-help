import Map "mo:core/Map";
import Text "mo:core/Text";
import Order "mo:core/Order";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Float "mo:core/Float";
import MixinStorage "blob-storage/Mixin";
import Migration "migration";

(with migration = Migration.run)
actor {
  include MixinStorage();

  // Healthcare Services
  type HealthcareService = {
    category : Text;
    name : Text;
    description : Text;
    contactInfo : ?Text;
  };

  module HealthcareService {
    public func compare(a : HealthcareService, b : HealthcareService) : Order.Order {
      Text.compare(a.name, b.name);
    };
  };

  // Insurance Terms
  type InsuranceTerm = {
    term : Text;
    definition : Text;
  };

  module InsuranceTerm {
    public func compare(a : InsuranceTerm, b : InsuranceTerm) : Order.Order {
      Text.compare(a.term, b.term);
    };
  };

  // Financial Assistance Program
  type AssistanceProgram = {
    name : Text;
    description : Text;
    eligibility : Text;
    contactInfo : Text;
  };

  module AssistanceProgram {
    public func compare(a : AssistanceProgram, b : AssistanceProgram) : Order.Order {
      Text.compare(a.name, b.name);
    };
  };

  // Community Resource with Zip Code and Coordinates
  type CommunityResource = {
    resourceType : Text;
    name : Text;
    address : Text;
    phone : Text;
    website : ?Text;
    zipCode : Text;
    lat : ?Float;
    lng : ?Float;
  };

  module CommunityResource {
    public func compare(a : CommunityResource, b : CommunityResource) : Order.Order {
      Text.compare(a.name, b.name);
    };
  };

  // Persistent Data Structures
  let healthcareServices = Map.empty<Text, HealthcareService>();
  let insuranceTerms = Map.empty<Text, InsuranceTerm>();
  let assistancePrograms = Map.empty<Text, AssistanceProgram>();
  let communityResources = Map.empty<Text, CommunityResource>();

  // Initialize data
  public shared ({ caller }) func initializeData() : async () {
    // Healthcare Services
    let urgentCare : HealthcareService = {
      category = "Urgent Care";
      name = "Leominster Urgent Care Center";
      description = "Walk-in urgent care services for non-life-threatening conditions.";
      contactInfo = ?"978-555-1234";
    };
    healthcareServices.add(urgentCare.name, urgentCare);

    // Insurance Term
    let deductible : InsuranceTerm = {
      term = "Deductible";
      definition = "The amount you pay for covered health services before your insurance starts to pay.";
    };
    insuranceTerms.add(deductible.term, deductible);

    // Assistance Program
    let massHealth : AssistanceProgram = {
      name = "MassHealth";
      description = "Massachusetts' Medicaid program providing health coverage for eligible residents.";
      eligibility = "Based on income, family size, and specific criteria.";
      contactInfo = "800-555-9876";
    };
    assistancePrograms.add(massHealth.name, massHealth);

    // Community Resource with Zip Code and Coordinates
    let comHealthCenter : CommunityResource = {
      resourceType = "Community Health Center";
      name = "Leominster Community Medical Center";
      address = "123 Main Street, Leominster, MA";
      phone = "978-555-4567";
      website = ?"www.leominsterchc.org";
      zipCode = "01453";
      lat = ?42.5251;
      lng = ?(-71.7598);
    };
    communityResources.add(comHealthCenter.name, comHealthCenter);
  };

  // Query Functions
  public query ({ caller }) func getHealthcareServices() : async [HealthcareService] {
    healthcareServices.values().toArray().sort();
  };

  public query ({ caller }) func getInsuranceTerms() : async [InsuranceTerm] {
    insuranceTerms.values().toArray().sort();
  };

  public query ({ caller }) func getAssistancePrograms() : async [AssistanceProgram] {
    assistancePrograms.values().toArray().sort();
  };

  public query ({ caller }) func getCommunityResources() : async [CommunityResource] {
    communityResources.values().toArray().sort();
  };

  public query ({ caller }) func searchInsuranceTerm(term : Text) : async InsuranceTerm {
    switch (insuranceTerms.get(term)) {
      case (null) { Runtime.trap("Term not found") };
      case (?definition) { definition };
    };
  };

  public query ({ caller }) func getResourcesByType(resourceType : Text) : async [CommunityResource] {
    communityResources.values().filter(
      func(resource) { resource.resourceType == resourceType }
    ).toArray().sort();
  };

  // New function to get resources by zip code
  public query ({ caller }) func getResourcesByZipCode(zipCode : Text) : async [CommunityResource] {
    communityResources.values().filter(
      func(resource) { resource.zipCode == zipCode }
    ).toArray().sort();
  };
};
