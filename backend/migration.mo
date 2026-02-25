import Map "mo:core/Map";
import Text "mo:core/Text";
import Float "mo:core/Float";

module {
  type OldCommunityResource = {
    resourceType : Text;
    name : Text;
    address : Text;
    phone : Text;
    website : ?Text;
    zipCode : Text;
  };

  type OldActor = {
    healthcareServices : Map.Map<Text, { category : Text; name : Text; description : Text; contactInfo : ?Text }>;
    insuranceTerms : Map.Map<Text, { term : Text; definition : Text }>;
    assistancePrograms : Map.Map<Text, { name : Text; description : Text; eligibility : Text; contactInfo : Text }>;
    communityResources : Map.Map<Text, OldCommunityResource>;
  };

  type NewCommunityResource = {
    resourceType : Text;
    name : Text;
    address : Text;
    phone : Text;
    website : ?Text;
    zipCode : Text;
    lat : ?Float;
    lng : ?Float;
  };

  type NewActor = {
    healthcareServices : Map.Map<Text, { category : Text; name : Text; description : Text; contactInfo : ?Text }>;
    insuranceTerms : Map.Map<Text, { term : Text; definition : Text }>;
    assistancePrograms : Map.Map<Text, { name : Text; description : Text; eligibility : Text; contactInfo : Text }>;
    communityResources : Map.Map<Text, NewCommunityResource>;
  };

  public func run(old : OldActor) : NewActor {
    let newCommunityResources = old.communityResources.map<Text, OldCommunityResource, NewCommunityResource>(
      func(_key, oldResource) {
        {
          oldResource with
          lat = null;
          lng = null;
        };
      }
    );
    {
      old with
      communityResources = newCommunityResources;
    };
  };
};
