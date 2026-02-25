import Map "mo:core/Map";
import List "mo:core/List";
import Text "mo:core/Text";
import Order "mo:core/Order";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import MixinStorage "blob-storage/Mixin";

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

  // Community Resource
  type CommunityResource = {
    resourceType : Text;
    name : Text;
    address : Text;
    phone : Text;
    website : ?Text;
  };

  module CommunityResource {
    public func compare(a : CommunityResource, b : CommunityResource) : Order.Order {
      Text.compare(a.name, b.name);
    };
  };

  // Educational Workshop
  type Workshop = {
    title : Text;
    description : Text;
    audience : Text;
    date : ?Text;
    location : ?Text;
  };

  module Workshop {
    public func compare(a : Workshop, b : Workshop) : Order.Order {
      Text.compare(a.title, b.title);
    };
  };

  // Persistent Data Structures
  let healthcareServices = Map.empty<Text, HealthcareService>();
  let insuranceTerms = Map.empty<Text, InsuranceTerm>();
  let assistancePrograms = Map.empty<Text, AssistanceProgram>();
  let communityResources = Map.empty<Text, CommunityResource>();
  let workshops = Map.empty<Text, Workshop>();

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

    // Community Resource
    let comHealthCenter : CommunityResource = {
      resourceType = "Community Health Center";
      name = "Leominster Community Medical Center";
      address = "123 Main Street, Leominster, MA";
      phone = "978-555-4567";
      website = ?"www.leominsterchc.org";
    };
    communityResources.add(comHealthCenter.name, comHealthCenter);

    // Workshop
    let healthNavWorkshop : Workshop = {
      title = "Navigating Health Insurance 101";
      description = "Learn the basics of health insurance, copays, deductibles, and coverage.";
      audience = "Open to all ages";
      date = ?"2024-06-15";
      location = ?"Leominster Public Library";
    };
    workshops.add(healthNavWorkshop.title, healthNavWorkshop);
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

  public query ({ caller }) func getWorkshops() : async [Workshop] {
    workshops.values().toArray().sort();
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
};
